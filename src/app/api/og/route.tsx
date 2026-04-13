import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") === "en" ? "en" : "uk";
  const tagline =
    lang === "en" ? "From idea to company." : "Від ідеї до компанії.";

  const [avatarData, fontData] = await Promise.all([
    readFile(join(process.cwd(), "public", "avatar.png")),
    readFile(join(process.cwd(), "public", "fonts", "Zlam-Medium.otf")),
  ]);

  const avatarBase64 = `data:image/png;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          fontFamily: "Zlam",
        }}
      >
        <img
          src={avatarBase64}
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: "#111111",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Zlam",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
