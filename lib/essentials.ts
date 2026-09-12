import type { CityId } from "./cities";

export type Confidence = "stable" | "verify";

export interface Fact {
  label: string;
  value: string;
  detail?: string;
  confidence?: Confidence;
}

export interface EssentialsProfile {
  city: CityId;
  /** The one-line answer to "do I tip?" */
  tipVerdict: string;
  tipping: Fact[];
  transit: Fact[];
  payments: Fact[];
  connectivity: Fact[];
  etiquette: string[];
  airport: Fact[];
  /** Things that will actually cost you money or time if you get them wrong. */
  gotchas: string[];
}

export const ESSENTIALS: EssentialsProfile[] = [
  {
    city: "taipei",
    tipVerdict: "No. Tipping is not practiced and is occasionally refused.",
    tipping: [
      {
        label: "Restaurants",
        value: "No tip",
        detail:
          "Mid-range and upscale restaurants add a 10% service charge (服務費) to the bill automatically. Nothing further is expected. Casual eateries, night-market stalls and noodle shops add nothing and expect nothing.",
      },
      {
        label: "Taxis",
        value: "No tip",
        detail: "Round up to the nearest NT$10 if you want, but drivers will hand back exact change.",
      },
      {
        label: "Hotels",
        value: "Optional, small",
        detail: "NT$50-100 per bag for a porter at an international hotel. Housekeeping: not expected.",
      },
      {
        label: "Bars / cafés",
        value: "No tip",
        detail: "Tip jars appear in a few third-wave coffee shops. Entirely optional.",
      },
      {
        label: "Guides & drivers",
        value: "Yes, if private",
        detail:
          "A private full-day guide or driver is the one genuine exception: NT$500-1,000 per day is a normal gesture.",
      },
    ],
    transit: [
      {
        label: "Get an EasyCard (悠遊卡)",
        value: "Yes — buy a physical one",
        detail:
          "NT$100 non-refundable card fee plus stored value. Sold at every MRT station info counter and at 7-Eleven / FamilyMart. Works on MRT, city buses, YouBike bike share, most convenience stores, and many taxis. iPass (一卡通) is the equivalent competitor and works nearly everywhere EasyCard does.",
      },
      {
        label: "Can I just tap my phone or credit card?",
        value: "Not reliably — bring the physical card",
        detail:
          "EasyCard's phone wallet support is tied to Taiwan-region devices and Taiwanese accounts, so a US-purchased Android or a US Apple ID generally cannot provision one. Contactless bank-card acceptance at MRT gates has been rolled out only partially. Treat the plastic EasyCard as the reliable path.",
        confidence: "verify",
      },
      {
        label: "MRT fares",
        value: "NT$20-65 per ride",
        detail:
          "EasyCard gives a 20% discount off the single-journey token price. Trains run roughly 06:00-24:00.",
      },
      {
        label: "Unlimited pass",
        value: "Usually not worth it",
        detail:
          "The Taipei Fun Pass and 24/48/72-hour MRT passes only pay off with heavy same-day use. Ordinary sightseeing rarely clears NT$150/day of fares.",
      },
      {
        label: "Bike share",
        value: "YouBike 2.0",
        detail:
          "Unlock with an EasyCard after a one-time registration that requires a local phone number — or use the app with a credit card. Taipei's riverside bike paths are excellent and flat.",
        confidence: "verify",
      },
      {
        label: "Ride-hailing",
        value: "Uber works",
        detail:
          "Uber operates in Taipei with your existing account and dispatches licensed taxis. Street taxis are cheap, plentiful and metered — flag fall around NT$85.",
      },
    ],
    payments: [
      {
        label: "Cash importance",
        value: "High",
        detail:
          "Night markets, small restaurants, temples, and family-run shops are cash-only. Carry NT$2,000-3,000 on you.",
      },
      {
        label: "Credit cards",
        value: "Chains, hotels, department stores",
        detail: "Visa and Mastercard are broadly accepted at larger merchants; Amex is patchier.",
      },
      {
        label: "ATMs",
        value: "7-Eleven and FamilyMart, 24/7",
        detail:
          "Convenience-store ATMs accept foreign cards and are the cheapest reliable way to get cash. Withdrawal fee around NT$100 plus your bank's charges.",
      },
      {
        label: "Mobile wallets",
        value: "Local only",
        detail: "LINE Pay and JKOPay dominate, but both require a Taiwanese bank account or phone number.",
      },
      {
        label: "Tax refund",
        value: "5% VAT refundable",
        detail:
          "Spend NT$2,000+ in one day at a single TRS-participating store, keep the receipt and your passport, and claim at the airport or an in-town e-kiosk.",
      },
    ],
    connectivity: [
      {
        label: "eSIM / SIM",
        value: "Airport SIM counters are excellent",
        detail:
          "Chunghwa Telecom, Taiwan Mobile and FarEasTone all have counters in TPE arrivals. Unlimited-data tourist SIMs run roughly NT$300 (3 days) to NT$1,000 (10 days). eSIM equivalents are available from Airalo/Ubigi if you prefer to arrive connected.",
      },
      {
        label: "Google Fi",
        value: "Check your plan tier",
        detail:
          "Fi's international data at no extra cost applies to Unlimited Plus; Simply Unlimited does not include Taiwan. Confirm before departure rather than at the gate.",
        confidence: "verify",
      },
      {
        label: "Wi-Fi",
        value: "Dense and free",
        detail: "Taipei Free public Wi-Fi covers MRT stations and public buildings; every café has Wi-Fi.",
      },
      {
        label: "Messaging",
        value: "LINE",
        detail: "LINE is the default for everything — restaurants, tour operators, and new acquaintances.",
      },
    ],
    etiquette: [
      "No eating or drinking anywhere inside the MRT system, including the platforms. This is enforced with fines and locals will tell you.",
      "Queue discipline at MRT doors and escalators is strict: stand right, walk left.",
      "Hand items — especially cards and money — with two hands in formal settings.",
      "Take a number tab at night-market stalls; do not hover over the cooking surface.",
      "Convenience stores are legitimate social infrastructure: seating, hot food, ATMs, package pickup, bill payment.",
      "Trash has no public bins by design. Carry your rubbish until you find a convenience store or your hotel.",
    ],
    airport: [
      {
        label: "TPE → Taipei Main Station",
        value: "MRT Airport Line, ~35 min express, NT$160",
        detail:
          "Purple express trains skip most stops; the blue commuter service takes ~50 min for the same fare. Runs roughly 06:00-23:00.",
      },
      {
        label: "Taxi",
        value: "NT$1,100-1,400, 40-55 min",
        detail: "Metered with a highway surcharge. Reasonable if you land late or travel with luggage.",
      },
      {
        label: "Songshan (TSA)",
        value: "In the city",
        detail: "Domestic and some regional flights land here — one MRT stop from Zhongshan, 15 minutes to downtown.",
      },
    ],
    gotchas: [
      "September is peak typhoon season: build one slack day into the itinerary and avoid booking the last flight out on your final day.",
      "Taiwan requires a free online Arrival Card before visa-exempt entry. Fill it in within three days of arrival.",
      "The MRT closes around midnight. Late nights in Ximending or Xinyi end in a taxi.",
      "Most museums and many restaurants close Mondays — the National Palace Museum is the notable exception.",
    ],
  },
  {
    city: "hongkong",
    tipVerdict: "Barely. A 10% service charge is already on the bill; small change on top is the norm.",
    tipping: [
      {
        label: "Restaurants",
        value: "10% service charge is standard",
        detail:
          "Sit-down restaurants add 10% automatically. Leaving the coin change is normal but optional; nobody expects an American-style top-up. Cha chaan tengs and dai pai dongs add no service charge and expect nothing.",
      },
      {
        label: "Taxis",
        value: "Round up",
        detail:
          "Round to the nearest dollar or let the driver keep small change. Note the HK$6-ish per-bag luggage surcharge is a real fare item, not a tip.",
      },
      {
        label: "Hotels",
        value: "HK$10-20 per bag",
        detail: "Porters and doormen at the larger hotels. Housekeeping: optional, HK$20-30 per night if you like.",
      },
      {
        label: "Bars",
        value: "Round up",
        detail: "Cocktail bars in Central and Soho add 10%; leaving the change is sufficient.",
      },
    ],
    transit: [
      {
        label: "Get an Octopus card",
        value: "Yes — still the best option",
        detail:
          "The Tourist Octopus costs around HK$39 (non-refundable) plus stored value; the standard on-loan Octopus is HK$50 refundable deposit plus value. Works on MTR, buses, trams, ferries, minibuses, convenience stores, supermarkets and most fast food.",
        confidence: "verify",
      },
      {
        label: "Can I just tap my credit card?",
        value: "On the MTR, yes",
        detail:
          "The MTR accepts contactless Visa, Mastercard, UnionPay and Amex directly at the gates for adult single fares, so a US contactless card does work. You lose Octopus-only fare rebates, and the card you tap in with must be the card you tap out with.",
      },
      {
        label: "Where a card still fails",
        value: "Ferries, minibuses, small shops",
        detail:
          "Green minibuses, the Star Ferry, wet markets and many small eateries take Octopus or cash but not foreign contactless. That is the argument for carrying an Octopus anyway.",
      },
      {
        label: "Octopus on your phone",
        value: "iPhone yes, most Android no",
        detail:
          "Octopus can be provisioned into Apple Wallet from the Octopus for Tourists app using an overseas card. Android support is limited to Samsung Pay and Huawei Pay in-market, so a OnePlus or Pixel will not work.",
        confidence: "verify",
      },
      {
        label: "Trams",
        value: "HK$3 flat, board at the rear",
        detail: "The 'ding ding' on Hong Kong Island is slow, cheap and the best sightseeing value in the city.",
      },
      {
        label: "Ride-hailing",
        value: "Uber operates, taxis are cheaper",
        detail:
          "Uber works but sits in a legal grey zone. Street taxis are colour-coded: red for urban, green for the New Territories, blue for Lantau. Many drivers speak limited English — have your destination in Chinese characters.",
      },
    ],
    payments: [
      {
        label: "Cash importance",
        value: "Medium",
        detail: "Octopus covers most small transactions. Keep HK$500 for markets, minibuses and old-school eateries.",
      },
      {
        label: "Credit cards",
        value: "Widely accepted",
        detail: "Restaurants, malls and hotels take foreign cards without issue. Some dim sum halls are still cash or Octopus only.",
      },
      {
        label: "ATMs",
        value: "Everywhere, low friction",
        detail: "HSBC and Hang Seng ATMs are ubiquitous and reliable with foreign cards.",
      },
      {
        label: "Mobile wallets",
        value: "AlipayHK / WeChat Pay HK",
        detail: "Local-account products. Apple Pay and Google Pay work at any terminal that takes contactless cards.",
      },
      {
        label: "Sales tax",
        value: "None",
        detail:
          "Hong Kong levies no VAT or sales tax, so the price on the tag is the price you pay and there is no refund process. This is why electronics and cosmetics shopping is a thing here.",
      },
    ],
    connectivity: [
      {
        label: "eSIM / SIM",
        value: "Trivially easy",
        detail:
          "Prepaid SIMs from 3HK, CSL and China Mobile HK are sold at 7-Eleven and Circle K for around HK$80-150 with generous data. eSIMs from Airalo or Nomad are equally cheap.",
      },
      {
        label: "Google Fi",
        value: "Check your plan tier",
        detail: "Same caveat as Taiwan: international data depends on which Fi plan you hold.",
        confidence: "verify",
      },
      {
        label: "Wi-Fi",
        value: "Excellent",
        detail: "Wi-Fi.HK is free across public venues, MTR stations and malls.",
      },
      {
        label: "VPN",
        value: "Not required",
        detail:
          "Hong Kong's internet remains open and Google, Meta and Western services work normally — unlike the mainland. Bring a VPN only if you plan a Shenzhen day trip.",
      },
    ],
    etiquette: [
      "Stand right on escalators — the Central-Mid-Levels escalator in particular is a commuter artery.",
      "At dim sum, tap two fingers on the table to thank someone pouring your tea. Leave the teapot lid ajar for a refill.",
      "Shared tables at cha chaan tengs are normal. Sitting down opposite a stranger is not rude; lingering after eating is.",
      "Do not stick chopsticks upright in rice.",
      "Octopus at the convenience store, cash at the market, card at the restaurant — reading the merchant correctly is the local skill.",
      "Escalator and MTR crowds move fast. Stopping to check your phone mid-flow will get you jostled.",
    ],
    airport: [
      {
        label: "HKG → Hong Kong Station",
        value: "Airport Express, 24 min, ~HK$115",
        detail:
          "Free shuttle buses connect Hong Kong and Kowloon stations to major hotels. Round-trip and group fares cut the cost meaningfully.",
        confidence: "verify",
      },
      {
        label: "Budget rail",
        value: "Tung Chung line via S1 bus",
        detail: "S1 bus to Tung Chung station, then the MTR. Roughly a third the price for maybe 20 extra minutes.",
      },
      {
        label: "Taxi",
        value: "HK$270-350 to Central, ~40 min",
        detail: "Red urban taxis. Tunnel tolls and luggage surcharges are added to the meter.",
      },
      {
        label: "In-town check-in",
        value: "Available at Hong Kong & Kowloon stations",
        detail: "Drop bags and get boarding passes in the city on your departure day, then sightsee unencumbered.",
        confidence: "verify",
      },
    ],
    gotchas: [
      "A T8 typhoon signal shuts the city and cancels flights en masse. September is the peak month — insure the trip and keep the final day flexible.",
      "Black rainstorm warnings cause flash flooding and are separate from typhoon signals.",
      "Octopus deposits are refunded at MTR customer service desks, but the tourist version's fee is not refundable — pick the right one on arrival.",
      "Hong Kong's indoor air conditioning is genuinely cold. Locals carry a layer in summer for this reason.",
    ],
  },
  {
    city: "seoul",
    tipVerdict: "No. Actively not a custom — tips are sometimes returned to you.",
    tipping: [
      {
        label: "Restaurants",
        value: "Never",
        detail:
          "No tipping, no service charge at ordinary restaurants. Leaving money on the table will usually produce someone chasing you down the street to return it.",
      },
      {
        label: "Taxis",
        value: "Never",
        detail: "Meter only. Drivers do not round up and will give exact change.",
      },
      {
        label: "Hotels",
        value: "Only at luxury properties",
        detail:
          "Five-star hotels and their restaurants add a 10% service charge plus 10% VAT. Nothing beyond that is expected, though a porter will accept ₩5,000-10,000.",
      },
      {
        label: "Guides",
        value: "The one exception",
        detail: "Private guides and drivers working with foreign tourists do expect a tip — ₩30,000-50,000 for a full day.",
      },
    ],
    transit: [
      {
        label: "Get a T-money card",
        value: "Yes — effectively mandatory",
        detail:
          "Buy at any CU, GS25, 7-Eleven or subway station machine for roughly ₩2,500-4,000, then top up with cash. Works on the subway, all buses, most taxis, and convenience stores. Transfers between subway and bus within 30 minutes are free, which matters a lot in Seoul.",
      },
      {
        label: "Can I just tap my credit card?",
        value: "No — this is the hard no of the three cities",
        detail:
          "Seoul subway gates do not accept foreign contactless credit cards. Open-loop payment pilots exist but do not cover foreign-issued cards. Apple Pay in Korea is limited and does not provision T-money for overseas devices. Buy the physical card at the airport convenience store on arrival.",
        confidence: "verify",
      },
      {
        label: "Climate Card short-term pass",
        value: "Worth checking",
        detail:
          "Seoul's 기후동행카드 offers unlimited subway and bus travel on short-term tourist passes (roughly 1, 2, 3, 5 and 7 days). If you are doing five or more rides a day it beats pay-as-you-go; note it does not cover travel outside the Seoul zone, including the airport line.",
        confidence: "verify",
      },
      {
        label: "Fares",
        value: "~₩1,400 base subway fare",
        detail: "Distance-based beyond 10 km. Seoul's subway is the most legible of the three systems: numbered lines, numbered stations, English signage throughout.",
      },
      {
        label: "Taxis",
        value: "Cheap, use Kakao T",
        detail:
          "Base fare around ₩4,800. Uber operates as Uber Taxi in partnership with local fleets, but Kakao T is what everyone actually uses. Late-night surcharges apply after midnight.",
        confidence: "verify",
      },
      {
        label: "Navigation",
        value: "Do not rely on Google Maps",
        detail:
          "Korean export restrictions on mapping data mean Google Maps has no usable walking or driving directions in Korea. Install Naver Map or KakaoMap before you land — this is the single highest-value app decision of the trip.",
      },
    ],
    payments: [
      {
        label: "Cash importance",
        value: "Low",
        detail:
          "Korea is the most card-friendly country of the three — street food stalls and market vendors often take cards. Carry ₩50,000-100,000 for traditional markets and temple stays.",
      },
      {
        label: "Credit cards",
        value: "Accepted almost everywhere",
        detail:
          "Foreign-issued Visa and Mastercard work at the vast majority of merchants. A minority of terminals reject foreign cards outright — have a backup card and some cash.",
      },
      {
        label: "ATMs",
        value: "Look for 'Global ATM'",
        detail:
          "Not every ATM takes foreign cards. Those in convenience stores marked Global / Global ATM, plus KEB Hana and Citibank machines, are reliable. Many close overnight.",
      },
      {
        label: "Mobile wallets",
        value: "Locked to residents",
        detail:
          "KakaoPay, Naver Pay and Samsung Pay in Korea all require a Korean bank account or resident registration number. Assume they are unavailable to you.",
      },
      {
        label: "Tax refund",
        value: "10% VAT, often instant",
        detail:
          "Spend ₩30,000+ at a Tax Free-marked store and many will deduct the refund at the register with your passport. Otherwise claim at the airport kiosks before check-in.",
        confidence: "verify",
      },
    ],
    connectivity: [
      {
        label: "eSIM / SIM",
        value: "Best-in-class networks",
        detail:
          "KT, SKT and LG U+ counters sit in ICN arrivals; tourist SIMs run roughly ₩27,000-50,000 for 5-10 days of unlimited data. Korean mobile data is fast and coverage is total, including deep subway tunnels.",
      },
      {
        label: "Google Fi",
        value: "Check your plan tier",
        detail: "Same caveat as the other two cities.",
        confidence: "verify",
      },
      {
        label: "Wi-Fi",
        value: "Ubiquitous and fast",
        detail: "Free public Wi-Fi across the subway, buses, cafés and public buildings.",
      },
      {
        label: "Translation",
        value: "Papago beats Google Translate",
        detail: "Naver's Papago handles Korean substantially better, including camera translation of menus.",
      },
    ],
    etiquette: [
      "Receive and give with two hands — money, cards, drinks, business cards. This matters more in Korea than in Taiwan or Hong Kong.",
      "When someone older pours you a drink, hold your glass with two hands. Pour for others, not yourself.",
      "Take shoes off at traditional restaurants with floor seating, guesthouses and any private home.",
      "Subway priority seats stay empty even on a packed train. Do not sit in them.",
      "Do not blow your nose at the table. Step away.",
      "Age structures interaction. Being asked your age early is not rude — it establishes which speech level to use.",
    ],
    airport: [
      {
        label: "ICN → Seoul Station",
        value: "AREX Express, 43 min, ~₩11,000",
        detail: "Reserved seating, direct, no stops. Departs roughly every 40 minutes.",
        confidence: "verify",
      },
      {
        label: "AREX all-stop",
        value: "~₩4,500, ~59 min",
        detail: "Same line, ordinary subway rolling stock, accepts T-money. The value pick unless you have heavy bags.",
        confidence: "verify",
      },
      {
        label: "Limousine bus",
        value: "₩17,000-18,000",
        detail: "Drops at major hotel clusters. Best option if your hotel is far from a subway hub; traffic-dependent.",
        confidence: "verify",
      },
      {
        label: "Taxi",
        value: "₩70,000-100,000, 60-90 min",
        detail: "Expensive by Korean standards. Justifiable only for late arrivals or groups.",
      },
      {
        label: "Gimpo (GMP)",
        value: "Much closer",
        detail: "Regional flights, including some from Taipei Songshan, land at Gimpo — 30 minutes to central Seoul by subway.",
      },
    ],
    gotchas: [
      "Chuseok falls in late September 2026. Expect closures, packed intercity transport, and a quieter-than-usual Seoul. Verify exact dates and plan around them.",
      "Google Maps is functionally broken for navigation in Korea. Install Naver Map or KakaoMap before departure.",
      "K-ETA and the electronic arrival card requirements for US passport holders have changed repeatedly. Confirm the current rule on the official site close to departure.",
      "Many restaurants have no English menu and no English-speaking staff outside tourist districts. Papago's camera mode solves this.",
    ],
  },
];

export function essentialsFor(city: CityId): EssentialsProfile {
  const found = ESSENTIALS.find((e) => e.city === city);
  if (!found) throw new Error(`No essentials profile for ${city}`);
  return found;
}
