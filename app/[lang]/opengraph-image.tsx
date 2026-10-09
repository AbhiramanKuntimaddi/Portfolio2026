import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { OgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = site.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(
    <OgImage title={site.name} subtitle={site.jobTitle} />,
    { ...ogSize },
  );
}
