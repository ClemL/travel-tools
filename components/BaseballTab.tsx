"use client";

import ActivityTab from "./ActivityTab";
import { SPECTATOR } from "@/lib/activities";

export default function BaseballTab() {
  return (
    <ActivityTab
      profiles={SPECTATOR}
      lede="Live sport as a cultural experience rather than a fixture list. September is the sharp end of the baseball season in both Korea and Taiwan, which is the best possible timing."
      verdict={{
        title: "A KBO game in Seoul is the best live sport in East Asia",
        body:
          "Organised cheer squads with a chant for every player, ₩10,000 tickets, and you are allowed to bring in your own fried chicken and beer. September is the playoff race, so the stakes are real and the stands are full. Taiwan's CPBL runs the same playbook at a smaller scale. Hong Kong has no league sport, but Wednesday night racing at Happy Valley costs HK$10 and is a genuinely great evening.",
      }}
    />
  );
}
