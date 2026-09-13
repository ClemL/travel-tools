"use client";

import ActivityTab from "./ActivityTab";
import { WELLNESS } from "@/lib/activities";

export default function WellnessTab() {
  return (
    <ActivityTab
      profiles={WELLNESS}
      lede="Bathhouses, saunas and hot springs — and the etiquette that makes the difference between a good first visit and an embarrassing one."
      verdict={{
        title: "Jjimjilbang in Seoul, Beitou in Taipei",
        body:
          "A Korean jjimjilbang is a 24-hour bathhouse and social space for about ₩15,000, and it is one of the most distinctive things you can do in Seoul. Taipei's Beitou is a volcanic hot spring valley at the end of an MRT line — soaking in 40 °C water during a September downpour is better than it sounds. Hong Kong has no bathhouse culture, but cheap foot reflexology on every block is the right answer after a day on its hills.",
      }}
    />
  );
}
