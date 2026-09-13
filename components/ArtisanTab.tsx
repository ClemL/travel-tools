"use client";

import ShopsTab from "./ShopsTab";
import { ARTISAN } from "@/lib/shops";

export default function ArtisanTab() {
  return (
    <ShopsTab
      scenes={ARTISAN}
      districtHeading="Craft districts"
      lede="Working craft rather than souvenir shops: ceramics, leather, bamboo, textiles, lacquer and the trades still done by hand. Each city has a different strength, and in Hong Kong some of it is genuinely close to disappearing."
    />
  );
}
