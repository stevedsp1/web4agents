import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Web4Agents";
  const type = searchParams.get("type") ?? "default";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d9488",
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 16,
          }}
        >
          Web4Agents.org
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {type !== "default" && (
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "rgba(255,255,255,0.8)",
              marginTop: 16,
              textTransform: "capitalize",
            }}
          >
            {type}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
