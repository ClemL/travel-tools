"use client";

import ActivityTab from "./ActivityTab";
import { CLIMBING } from "@/lib/activities";

export default function ClimbingTab() {
  return (
    <ActivityTab
      profiles={CLIMBING}
      lede="Indoor bouldering and rope climbing in all three cities, plus what the outdoor options are and why September is the wrong month for most of them."
      verdict={{
        title: "Seoul is the reason to pack climbing shoes",
        body:
          "Seoul has one of the densest gym scenes on earth and it is genuinely worth planning around. Taipei and Hong Kong both have good gyms but fewer of them. All three cities' outdoor crags — Bukhansan, Long Dong, Tung Lung Chau — are excellent and effectively out of season in September: hot, humid, and exposed to typhoons. Plan on gyms.",
      }}
    />
  );
}
