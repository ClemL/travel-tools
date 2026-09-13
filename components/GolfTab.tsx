"use client";

import ActivityTab from "./ActivityTab";
import { GOLF } from "@/lib/activities";

export default function GolfTab() {
  return (
    <ActivityTab
      profiles={GOLF}
      lede="Where golf is worth your time on this trip, and where it is an expensive mistake. The answer is not the same in all three cities."
      verdict={{
        title: "Screen golf in Seoul, and skip the courses entirely",
        body:
          "Korean screen golf is a mainstream social activity on the scale of bowling in the US — two hours in a simulator bay with beer costs a fraction of a green fee, needs no booking infrastructure, and tells you more about the country. Real courses near Seoul are member-oriented, cost ₩150,000-350,000, and are effectively unbookable for a visitor. Hong Kong's Kau Sai Chau is the one realistic actual round on this trip. In Taipei, do not bother.",
      }}
    />
  );
}
