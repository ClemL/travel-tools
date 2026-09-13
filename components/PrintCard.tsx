"use client";

import { useCity } from "./CityProvider";
import { cityById, HOME } from "@/lib/cities";
import { essentialsFor } from "@/lib/essentials";
import { phrasesFor } from "@/lib/phrases";
import { EMERGENCY, POWER } from "@/lib/toolkit";
import { airportFor } from "@/lib/airport";

/**
 * A one-page card for the selected city, hidden on screen and laid out for
 * paper. Paper is the one thing that still works when the phone is dead, which
 * is the single failure mode the offline PWA cannot cover.
 */
export default function PrintCard() {
  const { city } = useCity();
  const c = cityById(city);
  const e = essentialsFor(city);
  const p = phrasesFor(city);
  const em = EMERGENCY.find((x) => x.city === city)!;
  const pw = POWER.find((x) => x.city === city)!;
  const air = airportFor(city);

  const transitCard = e.transit[0];
  const airportPick = air.options.find((o) => o.recommended) ?? air.options[0];
  const phrases = p.phrases.slice(0, 10);

  return (
    <div className="printcard" aria-hidden="true">
      <div className="pc-head">
        <h1>
          {c.flag} {c.name} — pocket card
        </h1>
        <span className="pc-sub">
          {c.country} · {c.currency} · {c.timezone.replace("_", " ")}
        </span>
      </div>

      <div className="pc-cols">
        <section className="pc-block pc-urgent">
          <h2>Emergency</h2>
          <p className="pc-big">
            {/* The source string carries a parenthetical that the label already says. */}
            Police <strong>{em.police}</strong> · Fire/ambulance{" "}
            <strong>{em.medical.split(" (")[0]}</strong>
          </p>
          <p>
            Tourist hotline <strong>{em.touristHotline}</strong> — {em.touristHotlineNote}
          </p>
          <p>{em.usMission}</p>
        </section>

        <section className="pc-block pc-write">
          <h2>Write before you go</h2>
          <p>
            Hotel (local script): <span className="pc-line" />
          </p>
          <p className="pc-line" />
          <p>
            Phone: <span className="pc-line" />
          </p>
          <p>
            Insurance / policy no.: <span className="pc-line" />
          </p>
        </section>

        <section className="pc-block">
          <h2>Money &amp; tipping</h2>
          <p>
            <strong>Tipping:</strong> {e.tipVerdict}
          </p>
          <p>
            <strong>Cash:</strong> {e.payments[0]?.value} — {e.payments[0]?.detail}
          </p>
          <p>
            <strong>Always</strong> decline dynamic currency conversion; pay in {c.currency}.
          </p>
        </section>

        <section className="pc-block">
          <h2>Transit &amp; power</h2>
          <p>
            <strong>{transitCard?.label}:</strong> {transitCard?.value}
          </p>
          <p>
            <strong>Power:</strong> {pw.voltage}, {pw.plugs}
            {pw.adapterNeeded ? " — adapter needed" : " — no adapter needed (same as US)"}
          </p>
          <p>
            <strong>{air.code} → {air.reference}:</strong> {airportPick.mode},{" "}
            {airportPick.minutes[0]}–{airportPick.minutes[1]} min, {c.currencySymbol}
            {airportPick.cost[0]}
            {airportPick.cost[1] !== airportPick.cost[0] ? `–${airportPick.cost[1]}` : ""}. Last service{" "}
            {airportPick.hours}.
          </p>
        </section>
      </div>

      <section className="pc-block pc-phrases">
        <h2>{p.language}</h2>
        <table>
          <tbody>
            {phrases.map((ph) => (
              <tr key={ph.en}>
                <td className="pc-en">{ph.en}</td>
                <td className="pc-local">{ph.local}</td>
                <td className="pc-roman">{ph.roman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="pc-foot">
        Home time zone: {HOME.name}. Compiled reference — confirm anything time-sensitive against an
        official source. Cut along the edge and fold once to fit a wallet.
      </p>
    </div>
  );
}
