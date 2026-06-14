import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const NP_TTL = 12_000;

type NowPlaying = {
  isPlaying: boolean;
  configured?: boolean;
  title?: string;
  artist?: string;
  albumImage?: string;
  url?: string;
};

let tokenCache: { token: string; exp: number } | null = null;
let npCache: { data: NowPlaying; exp: number } | null = null;

async function getAccessToken(id: string, secret: string, refresh: string) {
  if (tokenCache && Date.now() < tokenCache.exp) return tokenCache.token;

  const basic = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!json.access_token) return null;

  tokenCache = {
    token: json.access_token,
    exp: Date.now() + ((json.expires_in ?? 3600) - 60) * 1000,
  };
  return json.access_token;
}

function json(data: NowPlaying) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=12, stale-while-revalidate=30",
    },
  });
}

export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!id || !secret || !refresh) {
    return json({ isPlaying: false, configured: false });
  }

  if (npCache && Date.now() < npCache.exp) return json(npCache.data);

  const finish = (data: NowPlaying) => {
    npCache = { data, exp: Date.now() + NP_TTL };
    return json(data);
  };

  try {
    const token = await getAccessToken(id, secret, refresh);
    if (!token) return finish({ isPlaying: false, configured: true });

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.status === 204 || res.status >= 400) {
      return finish({ isPlaying: false, configured: true });
    }

    const song = await res.json();
    if (!song?.item) return finish({ isPlaying: false, configured: true });

    return finish({
      isPlaying: song.is_playing as boolean,
      title: song.item.name as string,
      artist: (song.item.artists as { name: string }[])
        .map((a) => a.name)
        .join(", "),
      albumImage: song.item.album?.images?.[song.item.album.images.length - 1]
        ?.url as string | undefined,
      url: song.item.external_urls?.spotify as string | undefined,
    });
  } catch {
    return finish({ isPlaying: false, configured: true });
  }
}
