import type { CityId } from "./cities";

export interface Venue {
  name: string;
  local?: string;
  area: string;
  what: string;
  price?: string;
  /** Named venues open and close. Anything here should be checked on a map app first. */
  confidence: "verify";
}

export interface ActivityProfile {
  city: CityId;
  sceneRating: "World-class" | "Strong" | "Limited";
  summary: string;
  howToFind: { app: string; searchTerm: string; note: string };
  practical: { label: string; value: string; detail?: string }[];
  venues: Venue[];
  etiquette?: string[];
}

/* ------------------------------------------------------------------ */
/* Indoor climbing                                                     */
/* ------------------------------------------------------------------ */

export const CLIMBING: ActivityProfile[] = [
  {
    city: "seoul",
    sceneRating: "World-class",
    summary:
      "Seoul has one of the densest bouldering gym scenes on earth. Gyms are small, numerous, usually basement or upper-floor, and clustered near universities and Gangnam. Korean competition climbing is strong and it shows in the setting — expect powerful, coordination-heavy problems and a lot of volumes.",
    howToFind: {
      app: "Naver Map or KakaoMap",
      searchTerm: "클라이밍 (climbing) or 볼더링 (bouldering)",
      note:
        "Google Maps will not find most of them. Search in Korean on Naver, filter by distance, and check the posted hours — many gyms open at 13:00 and run to 23:00 on weekdays.",
    },
    practical: [
      {
        label: "Day pass",
        value: "₩20,000-27,000",
        detail: "Shoe rental typically ₩3,000-5,000 on top. Chalk is usually free or ₩1,000.",
      },
      {
        label: "Grading",
        value: "Color systems, gym-specific",
        detail:
          "Korean gyms grade by color, and the color order differs between gyms — there is no national standard. Ask at the desk for the order, or watch what people warm up on. Rough guide at many gyms: white/yellow easiest, then orange, green, blue, red, purple, grey, brown, black. Do not assume a V-scale mapping.",
      },
      {
        label: "Format",
        value: "Overwhelmingly bouldering",
        detail: "Rope gyms exist but are far less common. If you want lead or top rope, check before you travel across the city.",
      },
      {
        label: "Bring your own shoes",
        value: "Strongly recommended",
        detail:
          "Rental sizing above roughly US men's 11 is scarce. Climbing shoes pack small and this removes the problem entirely.",
      },
      {
        label: "Outdoor",
        value: "Bukhansan and Dobongsan",
        detail:
          "Real granite inside the city limits. Insubong on Bukhansan is a classic multi-pitch trad objective. In September it is hot and humid with typhoon remnant risk — plan on gyms and treat outdoor as a bonus if the last week turns dry.",
      },
    ],
    venues: [
      {
        name: "Son Suk Hee Climbing",
        local: "손스climbing",
        area: "Multiple branches",
        what: "One of the best-known chains in Seoul, founded by a competition climber. Good setting, busy evenings.",
        price: "~₩22,000 day pass",
        confidence: "verify",
      },
      {
        name: "V Climbing",
        area: "Multiple branches including Gangnam",
        what: "Large chain with consistent setting and English-capable staff at the bigger locations.",
        price: "~₩22,000 day pass",
        confidence: "verify",
      },
      {
        name: "Gangnam and Konkuk University clusters",
        area: "Gangnam, Konkuk Univ., Hongdae",
        what:
          "Rather than chasing one gym, go to a cluster — there are often several within a few subway stops, so a bad first choice costs ten minutes.",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Take your street shoes off at the entrance. Most gyms have a shoe rack and indoor slippers; walking onto the mats in outdoor shoes is a serious breach.",
      "Many gyms require socks with rental shoes. Bring a pair.",
      "Brushing holds after your attempt is expected.",
      "Korean gyms are social and crowded after 19:00. Going 13:00-17:00 on a weekday gets you an almost empty gym.",
      "A quick 안녕하세요 at the desk and 감사합니다 on the way out goes a long way.",
    ],
  },
  {
    city: "taipei",
    sceneRating: "Strong",
    summary:
      "A smaller but genuine scene, with several good bouldering gyms and a strong outdoor tradition. Taipei climbers are welcoming to visitors and English is more common in gyms than in the city generally.",
    howToFind: {
      app: "Google Maps works here",
      searchTerm: "攀岩館 (climbing gym) or 抱石 (bouldering)",
      note:
        "Unlike Seoul, Google Maps is reliable in Taiwan. Facebook is also where Taiwanese gyms post hours, closures and setting updates — more current than their websites.",
    },
    practical: [
      {
        label: "Day pass",
        value: "NT$400-550",
        detail: "Shoe rental around NT$100. Cheaper than Seoul or Hong Kong.",
      },
      {
        label: "Grading",
        value: "V-scale, generally",
        detail: "Most Taipei gyms use V-grades for bouldering and French sport grades on ropes, so it will read familiar.",
      },
      {
        label: "Air conditioning",
        value: "Check before you go",
        detail:
          "This matters more than usual. A poorly ventilated gym in September Taipei is genuinely unpleasant and skin does not hold. Ask or check recent reviews.",
      },
      {
        label: "Outdoor — Long Dong",
        value: "龍洞, about an hour from Taipei",
        detail:
          "Taiwan's premier crag: sandstone sea cliffs on the northeast coast with hundreds of sport and trad routes. Genuinely world-class setting. September is the wrong season — hot, humid, and exposed, with typhoon swell making the lower tiers dangerous. Plan it for a cool dry window or skip it.",
      },
    ],
    venues: [
      {
        name: "Stone Boulder",
        area: "Neihu / Zhongshan area",
        what: "Long-running bouldering gym, well regarded locally.",
        price: "~NT$450",
        confidence: "verify",
      },
      {
        name: "Red Rock Climbing",
        area: "Multiple locations",
        what: "Bouldering and some rope climbing depending on branch.",
        price: "~NT$450-500",
        confidence: "verify",
      },
      {
        name: "Long Dong (龍洞)",
        area: "Northeast coast, ~1 hour by car or bus",
        what:
          "Outdoor sea-cliff sport and trad climbing. Guides and gear rental available through Taipei gyms. Season is roughly October to April.",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Shoes off at the entrance, as in most of East Asia.",
      "Taiwanese gyms are relaxed and chatty. Asking for beta is welcomed.",
      "Bring a towel — you will sweat more than you expect, and holds get greasy fast in September.",
    ],
  },
  {
    city: "hongkong",
    sceneRating: "Strong",
    summary:
      "A compact scene built around a few large, well-equipped commercial gyms, plus serious outdoor sea-cliff climbing that is out of season in September. Hong Kong gyms are the most Western-feeling of the three — English throughout, card payment, familiar formats.",
    howToFind: {
      app: "Google Maps",
      searchTerm: "climbing gym / bouldering",
      note: "English search works fine. Most gyms have proper websites with current pricing and hours.",
    },
    practical: [
      {
        label: "Day pass",
        value: "HK$150-250",
        detail: "Shoe rental HK$40-60. The most expensive of the three cities.",
      },
      {
        label: "Grading",
        value: "V-scale and French",
        detail: "Standard international grading. No surprises.",
      },
      {
        label: "Format",
        value: "Bouldering plus some big rope walls",
        detail: "Hong Kong has a couple of genuinely large facilities with lead and top-rope, unlike Seoul's bouldering-only norm.",
      },
      {
        label: "Outdoor",
        value: "Tung Lung Chau, Lion Rock, Beacon Hill",
        detail:
          "Tung Lung Chau is an island sea cliff reached by ferry — excellent climbing, and completely impractical in September heat and typhoon season. Save it for winter.",
      },
    ],
    venues: [
      {
        name: "Just Climb",
        area: "Several locations including Kwun Tong and Cheung Sha Wan",
        what: "The main bouldering chain in Hong Kong. Modern setting, good facilities.",
        price: "~HK$180-220",
        confidence: "verify",
      },
      {
        name: "Verm City",
        area: "Kowloon Bay",
        what: "Large facility with substantial rope walls as well as bouldering.",
        price: "~HK$200-250",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Standard Western gym norms apply — this is the least culturally specific of the three.",
      "Gyms are in industrial buildings in Kowloon East and Sham Shui Po. The entrances are unmarked freight lobbies; follow the address, not the storefront.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Gaming                                                              */
/* ------------------------------------------------------------------ */

export const GAMING: ActivityProfile[] = [
  {
    city: "seoul",
    sceneRating: "World-class",
    summary:
      "Seoul is the global centre of competitive gaming culture. PC bangs are on nearly every block, arcades are alive and thriving, and professional esports is a mainstream spectator sport with purpose-built venues. If you have any interest in games, this is the most culturally distinctive thing you can do in Korea.",
    howToFind: {
      app: "Naver Map",
      searchTerm: "PC방 (PC bang), 오락실 (arcade), 보드게임카페 (board game café)",
      note: "Search in Korean. PC bangs are so common you will pass several without looking.",
    },
    practical: [
      {
        label: "PC bang rate",
        value: "₩1,000-2,500 per hour",
        detail:
          "High-end hardware, dual monitors, mechanical keyboards, and a food menu delivered to your seat. Open 24 hours. Genuinely one of the best value experiences in Korea.",
      },
      {
        label: "How to use one",
        value: "Pay at the kiosk, take a seat number",
        detail:
          "Most have a self-service kiosk near the door: pick a seat on the screen map, pay by card or cash, get a seat number and a login code. Some require an ID scan — foreigners can usually get a guest account from staff.",
      },
      {
        label: "Account restrictions",
        value: "Some Korean games require local ID",
        detail:
          "Korea's real-name verification system means a few domestic titles are hard to log into as a visitor. Steam, League of Legends and most international games work fine with your own account.",
        // Korea's shutdown/real-name rules have shifted; treat this as directional.
      },
      {
        label: "Arcades",
        value: "Rhythm and fighting games dominate",
        detail:
          "Pump It Up, DJMax, and a deep fighting-game scene. Arcades cluster in Hongdae, Gangnam and around Konkuk University. Bring ₩1,000 notes.",
      },
      {
        label: "Esports",
        value: "LCK at LoL Park, Jongno",
        detail:
          "The League of Legends Champions Korea league plays at a purpose-built venue in central Seoul. Tickets are sold online and go fast. Whether matches fall in your window depends on the 2026 schedule, which I cannot confirm — check the LCK site once your dates are fixed.",
      },
    ],
    venues: [
      {
        name: "LoL Park",
        local: "롤파크",
        area: "Jongno, Line 1 Jonggak",
        what:
          "Purpose-built esports arena for the LCK. Even outside match days there is a café and shop. Attending a live match is a genuinely distinctive Seoul experience.",
        confidence: "verify",
      },
      {
        name: "Hongdae arcade cluster",
        area: "Hongdae, Line 2 Hongik Univ.",
        what: "Multiple arcades within walking distance, busiest after 20:00. Strong rhythm-game presence.",
        confidence: "verify",
      },
      {
        name: "Board game cafés",
        local: "보드게임카페",
        area: "Hongdae, Gangnam, Konkuk Univ.",
        what:
          "Pay by the hour, hundreds of titles, staff who will teach rules. Korean-language editions dominate but English copies of major titles are common — ask. Roughly ₩6,000-10,000 per person for a few hours.",
        confidence: "verify",
      },
    ],
  },
  {
    city: "taipei",
    sceneRating: "Strong",
    summary:
      "Taipei's gaming culture centres on arcades, claw-machine parlors and a serious PC hardware retail scene. The claw machine phenomenon is genuinely distinctive — entire storefronts, unstaffed, open 24 hours, on ordinary residential streets.",
    howToFind: {
      app: "Google Maps",
      searchTerm: "電子遊樂場 (arcade), 夾娃娃機 (claw machine), 桌遊 (board games)",
      note: "Ximending is the densest concentration and needs no planning — just walk.",
    },
    practical: [
      {
        label: "Arcades",
        value: "Ximending and Xinyi",
        detail:
          "Multi-floor arcades with rhythm games, crane machines, and photo booths. Open late, air conditioned, and an excellent thunderstorm fallback.",
      },
      {
        label: "Claw machine stores",
        value: "Everywhere, NT$10-50 per play",
        detail:
          "A genuine Taiwanese phenomenon: unstaffed storefronts full of crane machines, open 24 hours. Prizes range from snacks to electronics. More interesting as a cultural observation than as a way to win anything.",
      },
      {
        label: "PC hardware",
        value: "Guang Hua Digital Plaza and Syntrend",
        detail:
          "Taiwan builds most of the world's PC components, and this is where you see it retail. Syntrend is the modern building next door with gaming floors and esports space.",
      },
      {
        label: "Board game cafés",
        value: "桌遊店, NT$150-300 for an afternoon",
        detail: "A strong scene, particularly around Gongguan and the university districts. Many carry English editions.",
      },
    ],
    venues: [
      {
        name: "Syntrend Creative Park",
        local: "三創生活園區",
        area: "Zhongzheng, next to Guang Hua",
        what: "Twelve floors of electronics, gaming hardware, arcade space and events. The single best stop for this interest in Taipei.",
        confidence: "verify",
      },
      {
        name: "Guang Hua Digital Plaza",
        local: "光華商場",
        area: "Zhongzheng",
        what: "Older component and peripheral market. Cheaper, denser, less polished than Syntrend.",
        confidence: "verify",
      },
      {
        name: "Ximending arcades",
        area: "Ximending",
        what: "Several multi-floor arcades within a few blocks of each other. Busiest in the evening.",
        confidence: "verify",
      },
    ],
  },
  {
    city: "hongkong",
    sceneRating: "Limited",
    summary:
      "Smaller than the other two, and more retail than participatory. Hong Kong's strength is buying games, consoles, figures and hobby goods rather than playing in public venues — the arcade scene has shrunk considerably.",
    howToFind: {
      app: "Google Maps",
      searchTerm: "Sino Centre, Golden Computer Arcade, board game café",
      note: "The interesting places are vertical malls, not street-level shops. Look for building names, not storefronts.",
    },
    practical: [
      {
        label: "Sino Centre",
        value: "Mong Kok",
        detail:
          "A famously chaotic vertical mall of anime, manga, figures, retro games and collectibles. The closest Hong Kong gets to Akihabara. Worth an hour even if you buy nothing.",
      },
      {
        label: "Golden Computer Arcade",
        value: "Sham Shui Po",
        detail: "Games, components and grey-market hardware at low prices. Crowded, cash-friendly, genuinely cheap.",
      },
      {
        label: "Board game cafés",
        value: "HK$60-120 per person",
        detail: "A modest but real scene, mostly in Mong Kok and Causeway Bay. English editions are common given the language situation.",
      },
      {
        label: "Arcades",
        value: "Declining",
        detail: "A handful remain in Mong Kok and inside larger malls. Do not plan a day around this.",
      },
    ],
    venues: [
      {
        name: "Sino Centre",
        local: "信和中心",
        area: "Mong Kok, Nathan Road",
        what: "Multi-floor hobby and collectibles mall. Retro games, figures, manga, doujinshi.",
        confidence: "verify",
      },
      {
        name: "Golden Computer Arcade",
        area: "Sham Shui Po",
        what: "Basement-level computer and games market. Combine with an Apliu Street and street-food afternoon.",
        confidence: "verify",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Golf                                                                */
/* ------------------------------------------------------------------ */

export const GOLF: ActivityProfile[] = [
  {
    city: "seoul",
    sceneRating: "World-class",
    summary:
      "Korea is one of the most golf-obsessed countries on earth, but the interesting thing for a visitor is not the courses — it is screen golf. 스크린골프 is a mainstream social activity on the scale of bowling in the US, found in basements and upper floors of ordinary buildings across every neighborhood, and it is the single most accessible way to experience Korean golf culture.",
    howToFind: {
      app: "Naver Map",
      searchTerm: "스크린골프 (screen golf), 골프연습장 (driving range)",
      note:
        "Golfzon is the dominant screen golf brand and its branded signage is easy to spot. Walk-ins are usually fine outside peak evening hours.",
    },
    practical: [
      {
        label: "Screen golf rate",
        value: "₩20,000-45,000 per hour per bay",
        detail:
          "Priced per bay, not per person, so it gets cheap with a group. A full 18 holes takes roughly two hours for two players. Clubs are provided; shoes usually are too.",
      },
      {
        label: "What it actually is",
        value: "High-end simulator bays",
        detail:
          "Real ball, real swing, into a screen, with genuinely good ball-tracking and course rendering. Most venues serve food and beer, which is central to the point of it.",
      },
      {
        label: "Driving ranges",
        value: "₩15,000-30,000",
        detail:
          "Multi-tier netted ranges, often on building rooftops, with automated tee-up machines that feed a new ball after each swing. Common and cheap.",
      },
      {
        label: "Real golf: expensive and hard to book",
        value: "₩150,000-350,000+ green fee",
        detail:
          "Courses near Seoul are member-oriented, weekend tee times are effectively unavailable to visitors, caddies are frequently mandatory, cart fees are separate, and rounds run five hours. Booking generally requires a Korean phone number or a hotel concierge. Not a realistic casual activity.",
        },
      {
        label: "Recommendation",
        value: "Do screen golf, skip the course",
        detail:
          "Two hours in a Golfzon bay with beer costs a fraction of a green fee, needs no booking infrastructure, and is far more culturally revealing. If you want to hit real balls, add a rooftop driving range.",
      },
    ],
    venues: [
      {
        name: "Golfzon screen golf",
        local: "골프존",
        area: "Every neighborhood — Gangnam, Hongdae, Jongno",
        what:
          "The dominant chain and the default choice. Some branches are franchise-operated with varying quality; a Naver Map rating above 4.3 is a reasonable filter.",
        price: "~₩25,000-40,000 per hour per bay",
        confidence: "verify",
      },
      {
        name: "Kakao VX screen golf",
        area: "Citywide",
        what: "The main competitor to Golfzon, with a different course library and physics model.",
        confidence: "verify",
      },
      {
        name: "Rooftop driving ranges",
        local: "골프연습장",
        area: "Across the city, often on building roofs",
        what: "Netted multi-tier ranges with automatic ball feeders. Walk-in friendly, hourly or by bucket.",
        confidence: "verify",
      },
    ],
  },
  {
    city: "hongkong",
    sceneRating: "Limited",
    summary:
      "Land scarcity makes golf a constrained luxury here, with one genuine exception: Kau Sai Chau, the territory's only true public course, sits on an island reached by dedicated ferry from Sai Kung. It is the one realistic round of golf on this itinerary.",
    howToFind: {
      app: "Direct booking online",
      searchTerm: "Kau Sai Chau Public Golf Course",
      note: "Book ahead online. Visitor tee times are limited and weekend slots go early.",
    },
    practical: [
      {
        label: "Kau Sai Chau",
        value: "Three courses, public access",
        detail:
          "Reached by a dedicated ferry from Sai Kung. Genuinely scenic — sea views on most holes. Club and shoe rental available on site, so you need not carry anything.",
      },
      {
        label: "Green fees",
        value: "Higher for non-residents",
        detail:
          "Visitors pay a premium over Hong Kong residents, and ferry and rental fees are added. Budget several hundred to over a thousand Hong Kong dollars all-in depending on course and day. Confirm current rates when booking.",
      },
      {
        label: "Private clubs",
        value: "Effectively closed",
        detail:
          "Hong Kong Golf Club at Fanling is the historic championship venue but visitor access is restricted and typically requires member sponsorship.",
      },
      {
        label: "Driving ranges",
        value: "Available but limited",
        detail: "A few ranges exist, including at Kau Sai Chau and in the New Territories. Not a casual neighborhood amenity as in Korea.",
      },
      {
        label: "September caveat",
        value: "Morning tee times only",
        detail:
          "Playing 18 holes at 87 °F and 78% humidity in the afternoon is genuinely unsafe. Take the earliest slot available and carry more water than you think you need.",
      },
    ],
    venues: [
      {
        name: "Kau Sai Chau Public Golf Course",
        area: "Island off Sai Kung, dedicated ferry",
        what:
          "Three 18-hole courses, the only public golf in Hong Kong. Rental clubs and shoes on site. Book online in advance.",
        confidence: "verify",
      },
    ],
  },
  {
    city: "taipei",
    sceneRating: "Limited",
    summary:
      "Golf exists in Taiwan but is not a major visitor activity and is not woven into daily life the way it is in Korea. Courses are mostly outside the city, caddies are customary, and September heat makes a full round punishing.",
    howToFind: {
      app: "Google Maps, or hotel concierge",
      searchTerm: "高爾夫球場 (golf course), 高爾夫練習場 (driving range)",
      note: "Booking is easier through a hotel than directly, and most courses expect advance arrangement.",
    },
    practical: [
      {
        label: "Green fees",
        value: "Roughly NT$2,000-5,000",
        detail: "Plus a caddie fee, which is customary and often effectively mandatory. Weekday rates are substantially lower.",
      },
      {
        label: "Location",
        value: "Outside Taipei",
        detail: "Most courses are 45-90 minutes out, in Linkou, Taoyuan or the hills. You will need a taxi or a car.",
      },
      {
        label: "Driving ranges",
        value: "NT$300-600",
        detail: "Netted ranges are available in and around the city and are the low-commitment option.",
      },
      {
        label: "September caveat",
        value: "The worst of the three for this",
        detail:
          "91 °F, 74% humidity, daily afternoon thunderstorms and typhoon risk. If golf is a priority on this trip, do it in Seoul.",
      },
    ],
    venues: [
      {
        name: "Driving ranges around Taipei",
        local: "高爾夫練習場",
        area: "Neihu, Beitou, Xindian",
        what: "The practical option for a short visit — hit a bucket in the evening when the heat drops.",
        confidence: "verify",
      },
    ],
  },
];

export function profileFor(set: ActivityProfile[], city: CityId): ActivityProfile {
  const found = set.find((p) => p.city === city);
  if (!found) throw new Error(`No activity profile for ${city}`);
  return found;
}

/** Cities ordered by how good the scene is, so the strongest option leads. */
export function rankedCities(set: ActivityProfile[]): CityId[] {
  const order = { "World-class": 0, Strong: 1, Limited: 2 } as const;
  return [...set].sort((a, b) => order[a.sceneRating] - order[b.sceneRating]).map((p) => p.city);
}
