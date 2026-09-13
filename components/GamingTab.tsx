"use client";

import ActivityTab from "./ActivityTab";
import { GAMING } from "@/lib/activities";

export default function GamingTab() {
  return (
    <ActivityTab
      profiles={GAMING}
      lede="PC bangs, arcades, board game cafés, esports and hobby retail. Gaming culture is one of the sharpest points of difference between these three cities."
      verdict={{
        title: "A PC bang in Seoul is the single most distinctive thing here",
        body:
          "Two dollars an hour for high-end hardware, food delivered to your seat, open 24 hours, on nearly every block. It is a genuine piece of Korean daily life rather than a tourist activity. Taipei's strength is arcades and hardware retail; Hong Kong's is buying things rather than playing them.",
      }}
    />
  );
}
