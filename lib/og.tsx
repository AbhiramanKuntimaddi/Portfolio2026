import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#040811",
        backgroundImage:
          "radial-gradient(800px circle at 80% 20%, rgba(27,84,255,0.28), rgba(4,8,17,0))",
        color: "#dcdee2",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 24,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#1b54ff",
          fontWeight: 700,
        }}
      >
        // Portfolio
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            fontWeight: 500,
            color: "#1b54ff",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
          color: "rgba(220,222,226,0.55)",
          fontFamily: "monospace",
        }}
      >
        <span>{site.url.replace("https://", "")}</span>
        <span style={{ color: "#1b54ff" }}>{"</>"}</span>
      </div>
    </div>
  );
}
