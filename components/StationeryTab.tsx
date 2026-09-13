"use client";

import ShopsTab from "./ShopsTab";
import { STATIONERY } from "@/lib/shops";

export default function StationeryTab() {
  return (
    <ShopsTab
      scenes={STATIONERY}
      districtHeading="Where to browse"
      lede="Stationery is a serious retail category across all three cities and one of the most travel-efficient things to buy — paper weighs nothing and survives a suitcase. The quality and the character differ sharply by city."
    />
  );
}
