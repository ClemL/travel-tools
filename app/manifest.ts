import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Asia Trip Tools — Taipei, Hong Kong, Seoul",
    short_name: "Asia Trip",
    description:
      "Currency, weather, typhoon alerts, September climate and on-the-ground logistics for Taipei, Hong Kong and Seoul. Works offline.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f7f9",
    theme_color: "#1f4e79",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
