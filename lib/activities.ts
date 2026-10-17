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
  {
    city: "shenzhen",
    sceneRating: "Strong",
    summary:
      "Bouldering has boomed in mainland cities since the early 2020s, and Shenzhen — young, affluent and fitness-minded — has a dense spread of modern gyms, many inside malls and office complexes in Nanshan and Futian. Outdoor climbing nearby is minimal; Hong Kong's crags are the closest serious rock.",
    howToFind: {
      app: "Dianping (大众点评) or Amap",
      searchTerm: "攀岩 (climbing) · 抱石 (bouldering) · 攀岩馆 (climbing gym)",
      note:
        "Dianping lists gyms with photos, prices and recent reviews, and day passes are often cheaper when bought in-app. English search returns little; use the Chinese terms.",
    },
    practical: [
      {
        label: "Day pass",
        value: "¥80-150",
        detail: "Shoe rental ¥10-30. First-visit discounts on Dianping are common.",
      },
      {
        label: "Grading",
        value: "V-scale, sometimes colour circuits",
        detail: "Most commercial gyms use V grades or colour-coded circuits. Rope walls use French or YDS grades.",
      },
      {
        label: "Format",
        value: "Mostly bouldering",
        detail: "Mall and office-tower gyms are bouldering-focused. A few larger venues and sports centres have rope walls.",
      },
      {
        label: "Outdoor",
        value: "Minimal",
        detail:
          "Shenzhen's hills (Wutong Mountain, Maluan Mountain) are for hiking, not climbing. For real rock, cross to Hong Kong — and not in September.",
      },
    ],
    venues: [
      {
        name: "Bouldering gyms in Nanshan",
        local: "南山 抱石馆",
        area: "Nanshan tech district, Shekou",
        what: "The densest cluster, near the tech campuses and the expat neighbourhoods of Shekou. Easy to combine with Shenzhen Bay Park.",
        price: "~¥100-150",
        confidence: "verify",
      },
      {
        name: "Bouldering gyms in Futian malls",
        local: "福田 抱石馆",
        area: "Futian CBD",
        what: "Mall-based gyms near the Civic Center and Shopping Park stations — convenient on a Huaqiangbei day.",
        price: "~¥80-130",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Expect a short safety briefing and a waiver, usually in Chinese. Staff will walk you through it; translation apps cover the rest.",
      "Many gyms take only Alipay or WeChat Pay at the desk.",
      "Shoes off before the mats, as in the rest of East Asia.",
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
  {
    city: "shenzhen",
    sceneRating: "Strong",
    summary:
      "Home of Tencent, the world's largest games company, and of the hardware supply chain behind half the consoles and controllers on earth. The street-level scene is mall arcades, board game cafés, elaborate escape rooms and jubensha — murder-mystery role-play, a huge mainland trend that is mostly Mandarin-only.",
    howToFind: {
      app: "Dianping (大众点评)",
      searchTerm: "电玩城 (arcade) · 桌游 (board games) · 密室逃脱 (escape room) · 剧本杀 (jubensha)",
      note: "Every category is on Dianping with prices and photos. Book escape rooms and jubensha in advance; arcades and board game cafés are walk-in.",
    },
    practical: [
      {
        label: "Mall arcades",
        value: "¥50-100 for a token bundle",
        detail:
          "Large, bright arcades (电玩城) in most malls: rhythm games, racing cabinets, claw machines and ticket games. Tokens are bought with Alipay at a machine.",
      },
      {
        label: "Board game cafés",
        value: "¥30-60 per person",
        detail: "Priced by time or per session. Libraries are mostly Chinese editions, but plenty of games are language-independent.",
      },
      {
        label: "Escape rooms",
        value: "¥150-300 per person",
        detail:
          "Mainland escape rooms are theatrical, with live actors and horror themes. The puzzles often depend on reading Chinese — ask whether a room works for non-readers.",
      },
      {
        label: "Jubensha (剧本杀)",
        value: "¥100-250 per person, 4-6 hours",
        detail:
          "Scripted murder-mystery role-play with costumes and a game master — the defining Chinese tabletop trend of the last decade. Almost entirely in Mandarin, so only realistic with Chinese-speaking friends.",
      },
      {
        label: "Internet cafés",
        value: "Hard for foreigners",
        detail:
          "Internet cafés (网吧 / 网咖) must register customers by ID. Many cannot process a foreign passport and will turn you away.",
      },
    ],
    venues: [
      {
        name: "Huaqiangbei electronics markets",
        local: "华强北",
        area: "Futian",
        what: "Consoles, controllers, handheld emulators, keyboards and every accessory imaginable. Check the region and the warranty on anything substantial.",
        confidence: "verify",
      },
      {
        name: "Mall arcades",
        local: "电玩城",
        area: "Coco Park, MixC and other large malls",
        what: "The easiest walk-in gaming in the city. Busy after school and on weekends.",
        price: "¥50-100",
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
  {
    city: "shenzhen",
    sceneRating: "Strong",
    summary:
      "Shenzhen is home to Mission Hills, the largest golf facility in the world by number of courses, plus several well-kept clubs inside the city. A real round is genuinely bookable here — the obstacles are cost, mandatory caddies and September heat, not access.",
    howToFind: {
      app: "Hotel concierge or Trip.com",
      searchTerm: "高尔夫球场 (golf course) · 高尔夫练习场 (driving range) · 观澜湖 (Mission Hills)",
      note: "Mission Hills sells visitor tee times directly and through hotels. Booking through a concierge avoids Chinese-only booking forms.",
    },
    practical: [
      {
        label: "Mission Hills",
        value: "A dozen courses, visitor access",
        detail:
          "Spread across the Shenzhen–Dongguan border at Guanlan, with courses designed by famous players. The resort includes hotels and a spa, so it can be a whole day.",
      },
      {
        label: "Green fees",
        value: "Roughly ¥1,000-2,500",
        detail: "Weekdays are much cheaper than weekends. A caddie is mandatory and charged separately; cart fees may be extra.",
      },
      {
        label: "In-city clubs",
        value: "Shenzhen Golf Club, Futian",
        detail: "The city's oldest club, opened in 1985 and surrounded by the CBD. Visitor access is more limited than at Mission Hills.",
      },
      {
        label: "Driving ranges",
        value: "¥100-200 per bucket",
        detail: "Netted ranges are common and are the easy option on a short visit.",
      },
      {
        label: "September caveat",
        value: "First tee time of the day",
        detail: "Afternoon rounds at 31 °C and high humidity are punishing, and thunderstorms close courses. Book the earliest slot.",
      },
    ],
    venues: [
      {
        name: "Mission Hills Shenzhen",
        local: "观澜湖高尔夫球会",
        area: "Guanlan, Longhua district",
        what: "The flagship of the world's largest golf complex. Visitor tee times, rental clubs and caddies on site.",
        confidence: "verify",
      },
      {
        name: "Shenzhen Golf Club",
        local: "深圳高尔夫俱乐部",
        area: "Futian",
        what: "A mature city-centre course with skyline views. Check visitor policy before going.",
        confidence: "verify",
      },
      {
        name: "Driving ranges",
        local: "高尔夫练习场",
        area: "Nanshan, Futian, Bao'an",
        what: "Walk-in netted ranges, open into the evening when the heat drops.",
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

/**
 * Cities ordered by how good the scene is, so the strongest option leads.
 * `among` limits the ranking to the destinations switched on in Settings.
 */
export function rankedCities(set: ActivityProfile[], among?: CityId[]): CityId[] {
  const order = { "World-class": 0, Strong: 1, Limited: 2 } as const;
  return set
    .filter((p) => !among || among.includes(p.city))
    .sort((a, b) => order[a.sceneRating] - order[b.sceneRating])
    .map((p) => p.city);
}

/* ------------------------------------------------------------------ */
/* Spectator sport                                                     */
/* ------------------------------------------------------------------ */

export const SPECTATOR: ActivityProfile[] = [
  {
    city: "seoul",
    sceneRating: "World-class",
    summary:
      "Korean baseball is the best live sport experience in East Asia and nothing in American sport prepares you for it. Every team has a cheer squad with a leader on a platform, trumpets, and a distinct chant for each player that the entire stand sings on cue for nine innings. You are expected to join in.",
    howToFind: {
      app: "Interpark Global or the club's own site",
      searchTerm: "KBO 티켓 (KBO ticket) · 잠실야구장",
      note:
        "Tickets go on sale roughly a week ahead and weekend games sell out. Foreign-card checkout works on the English Interpark site; the Korean-only sites often do not.",
    },
    practical: [
      {
        label: "Season timing",
        value: "September is the playoff race",
        detail:
          "The KBO regular season runs to early October, so September games carry real stakes and the crowds are at their loudest. Postseason follows immediately after.",
      },
      {
        label: "Tickets",
        value: "₩8,000-30,000",
        detail:
          "Cheaper than almost any comparable sport. Outfield seats put you inside the cheer section, which is where the experience actually is — do not buy quiet seats behind home plate.",
      },
      {
        label: "Bring your own food",
        value: "Genuinely allowed",
        detail:
          "Korean stadiums let you bring in outside food and beer. Fried chicken delivered to your seat is normal. This is a core part of the ritual, not a loophole.",
      },
      {
        label: "Seoul teams",
        value: "LG Twins and Doosan Bears share Jamsil",
        detail:
          "Both play at Jamsil Baseball Stadium on subway line 2, so there is a game there most days. Kiwoom Heroes play at the domed Gocheok Sky Dome, which is the rain-proof option.",
      },
      {
        label: "Football",
        value: "K League, and it is quieter",
        detail: "FC Seoul play at the 2002 World Cup stadium. Good atmosphere, but baseball is the one to prioritise.",
      },
    ],
    venues: [
      {
        name: "Jamsil Baseball Stadium",
        local: "잠실야구장",
        area: "Line 2, Sports Complex station",
        what: "Home to both LG Twins and Doosan Bears. The biggest crowds and the loudest cheer squads in the league.",
        price: "₩8,000-30,000",
        confidence: "verify",
      },
      {
        name: "Gocheok Sky Dome",
        local: "고척스카이돔",
        area: "Line 1, Guil station",
        what: "Korea's only domed stadium, home of the Kiwoom Heroes. The fallback when a typhoon remnant is passing through.",
        price: "₩9,000-25,000",
        confidence: "verify",
      },
      {
        name: "Seoul World Cup Stadium",
        local: "서울월드컵경기장",
        area: "Line 6, World Cup Stadium station",
        what: "FC Seoul in the K League, in the stadium built for 2002.",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Follow the cheer leader on the platform — everyone stands and chants when their team bats, and sits when the other team does.",
      "Each player has his own chant. You will pick them up within an inning; nobody minds if you mangle it.",
      "Inflatable clapping sticks are handed out or sold cheaply. Use them.",
      "Bringing in your own beer and fried chicken is normal and expected.",
    ],
  },
  {
    city: "taipei",
    sceneRating: "Strong",
    summary:
      "Taiwanese baseball is the national sport and the CPBL shares Korea's organised-cheering culture, at a smaller scale and with cheerleading squads that have become famous in their own right. Crowds are smaller than Korea's but the noise per person is comparable.",
    howToFind: {
      app: "Tixcraft or the CPBL site",
      searchTerm: "中華職棒 (CPBL) · 職棒門票",
      note: "Tickets are easy to get outside big derbies, and often available at the gate on the day.",
    },
    practical: [
      {
        label: "Season timing",
        value: "September is the end of the regular season",
        detail: "The CPBL season runs into October with the Taiwan Series following. September games matter.",
      },
      {
        label: "Tickets",
        value: "NT$300-600",
        detail: "Cheap, and walk-up availability is usually fine for weekday games.",
      },
      {
        label: "Where",
        value: "Tianmu and Xinzhuang are the Taipei-area grounds",
        detail:
          "Taipei Dome opened recently and is the indoor option — worth checking for a fixture there if rain threatens.",
      },
      {
        label: "Cheerleading",
        value: "A genuine phenomenon",
        detail:
          "CPBL cheer squads have large followings of their own, and the between-innings performances are part of why people attend.",
      },
    ],
    venues: [
      {
        name: "Taipei Dome",
        local: "臺北大巨蛋",
        area: "Xinyi, MRT Sun Yat-Sen Memorial Hall",
        what: "The new domed stadium in central Taipei. Indoor, so typhoon-proof.",
        confidence: "verify",
      },
      {
        name: "Tianmu Baseball Stadium",
        local: "天母棒球場",
        area: "Shilin district",
        what: "An older open-air ground with a neighbourhood feel. Easy walk-up tickets.",
        confidence: "verify",
      },
    ],
    etiquette: [
      "As in Korea, cheering is organised and continuous while your team bats. Follow the section.",
      "Food and drink from outside are generally tolerated at the older grounds.",
    ],
  },
  {
    city: "hongkong",
    sceneRating: "Limited",
    summary:
      "No major league team sport, but Hong Kong has one genuinely world-class spectator event: horse racing at Happy Valley, run under floodlights in the middle of the city on Wednesday evenings.",
    howToFind: {
      app: "Hong Kong Jockey Club site",
      searchTerm: "Happy Valley racing · Sha Tin racecourse",
      note: "The season typically starts in September. Check the fixture list against your dates.",
    },
    practical: [
      {
        label: "Happy Valley, Wednesday nights",
        value: "HK$10 public enclosure",
        detail:
          "One of the cheapest great nights out anywhere. A floodlit track ringed by apartment towers, eight races, beer tents and a genuinely mixed crowd.",
      },
      {
        label: "Season timing",
        value: "Usually opens in September",
        detail: "The racing season runs September to July. If your dates are early in the month, check the opening fixture.",
      },
      {
        label: "Sha Tin",
        value: "Weekend afternoon racing",
        detail: "The bigger, more serious track in the New Territories. Happy Valley is the atmospheric one.",
      },
      {
        label: "Rugby Sevens",
        value: "Wrong season",
        detail: "Hong Kong's other great sporting event runs in spring, not September.",
      },
    ],
    venues: [
      {
        name: "Happy Valley Racecourse",
        local: "跑馬地馬場",
        area: "Happy Valley, tram or MTR Causeway Bay",
        what:
          "Wednesday evening floodlit racing in a natural amphitheatre of tower blocks. HK$10 gets you into the public enclosure.",
        price: "HK$10 public enclosure",
        confidence: "verify",
      },
    ],
    etiquette: [
      "The HK$10 public enclosure is the fun one. You do not need a members' badge or a jacket.",
      "Betting is in cash at windows; minimum stakes are small and nobody minds if you have no idea what you are doing.",
    ],
  },
  {
    city: "shenzhen",
    sceneRating: "Limited",
    summary:
      "No baseball and no legal horse racing on the mainland. The live option in September is Chinese Super League football — Shenzhen Peng City are the top-flight side — with basketball's CBA season starting in October. For a great night of sport, Happy Valley is an hour away across the border.",
    howToFind: {
      app: "Damai (大麦) or the club's WeChat account",
      searchTerm: "深圳新鹏城 (Shenzhen Peng City) · 中超 (Chinese Super League) · 门票 (tickets)",
      note: "Ticketing is real-name. Damai accepts passports for some events but not all; a Chinese-speaking friend or hotel concierge makes it much easier.",
    },
    practical: [
      {
        label: "Football (CSL)",
        value: "Season March–November",
        detail:
          "September is the business end of the season. Crowds are loud and organised, and tickets are cheap by European standards.",
      },
      {
        label: "Tickets",
        value: "Roughly ¥80-300",
        detail: "Real-name tickets tied to an ID. Bring the passport you booked with to the gate.",
      },
      {
        label: "Basketball (CBA)",
        value: "Starts in October",
        detail: "The Shenzhen Leopards play in the CBA. If your trip runs into October, check the opening fixtures.",
      },
      {
        label: "Horse racing",
        value: "Across the border",
        detail: "Gambling is illegal on the mainland. Happy Valley's Wednesday night racing in Hong Kong is the nearest — see Hong Kong.",
      },
    ],
    venues: [
      {
        name: "Shenzhen Peng City home matches",
        local: "深圳新鹏城",
        area: "Check the fixture for the current home stadium",
        what: "Chinese Super League football. Clubs have moved grounds in recent seasons, so confirm the venue on the ticket.",
        price: "¥80-300",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Security checks at the gate are thorough; bottles, lighters and power banks may be confiscated.",
      "Home ultras run organised chants all match. Sitting in a neutral section is perfectly normal.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Bathhouses, saunas and hot springs                                  */
/* ------------------------------------------------------------------ */

export const WELLNESS: ActivityProfile[] = [
  {
    city: "seoul",
    sceneRating: "World-class",
    summary:
      "The jjimjilbang is a Korean institution: a 24-hour bathhouse complex with gender-separated hot and cold pools, plus a mixed common area of heated clay rooms, ice rooms, sleeping halls, snack bars and televisions, all entered in issued shorts and t-shirt. It is family entertainment, not a spa, and it is cheap.",
    howToFind: {
      app: "Naver Map",
      searchTerm: "찜질방 (jjimjilbang) · 사우나 (sauna)",
      note: "Open 24 hours, so it is also a legitimate option if you land at an awkward hour or miss the last subway.",
    },
    practical: [
      {
        label: "Entry",
        value: "₩10,000-20,000",
        detail: "Often with a surcharge after midnight. You can stay overnight, which some travellers use as accommodation.",
      },
      {
        label: "How it works",
        value: "Shoes off, locker, wash, then soak",
        detail:
          "Leave shoes in a small locker at the door, get a key wristband and a uniform, change, shower thoroughly, then use the pools. The wristband tallies anything you buy inside; you settle on the way out.",
      },
      {
        label: "The bathing floor is nude",
        value: "Non-negotiable and gender-separated",
        detail:
          "Swimwear is not allowed in the pools. Nobody looks at you. The mixed jjimjilbang floor upstairs is where the issued shorts and t-shirt go on.",
      },
      {
        label: "Scrub",
        value: "₩25,000-40,000",
        detail:
          "The optional 세신 body scrub is vigorous, thorough and slightly alarming. A genuine cultural experience if you are not precious about it.",
      },
      {
        label: "Tattoos",
        value: "Check first",
        detail:
          "Some establishments still refuse visible tattoos. Larger, tourist-facing places are usually relaxed, but it is worth asking at the desk.",
      },
    ],
    venues: [
      {
        name: "Dragon Hill Spa",
        local: "드래곤힐스파",
        area: "Yongsan, Line 1",
        what: "A large, famously over-the-top complex that is used to foreign visitors. The easy first jjimjilbang.",
        price: "~₩15,000",
        confidence: "verify",
      },
      {
        name: "Siloam Sauna",
        local: "실로암사우나",
        area: "Near Seoul Station",
        what: "Well regarded, convenient for a late arrival or an early departure, and popular with locals.",
        price: "~₩12,000",
        confidence: "verify",
      },
      {
        name: "Neighbourhood sauna",
        local: "동네 사우나",
        area: "Everywhere",
        what:
          "Small local bathhouses cost less and feel more ordinary. Less spectacle, more of what the institution actually is day to day.",
        price: "₩8,000-12,000",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Wash thoroughly at a seated shower station before entering any pool. This is the rule that matters most.",
      "No swimwear, no towels, no phones on the bathing floor.",
      "Move between hot pool, cold plunge and rest. Do not sit in the hottest pool for twenty minutes.",
      "Voices stay low on the bathing floor; the mixed floor upstairs is where people talk and eat.",
    ],
  },
  {
    city: "taipei",
    sceneRating: "Strong",
    summary:
      "Beitou is a volcanic hot spring valley inside the city limits, reachable by MRT, developed under Japanese rule and still working. You can choose between grand hotel baths, a cheap municipal public bath, and private rooms rented by the hour.",
    howToFind: {
      app: "Google Maps",
      searchTerm: "溫泉 (hot spring) · 北投溫泉",
      note: "MRT to Xinbeitou, then walk. Wulai and Jiaoxi are the out-of-town alternatives.",
    },
    practical: [
      {
        label: "Public baths",
        value: "NT$40-150",
        detail:
          "The Beitou Public Hot Spring is the cheap, local, gender-separated option. Swim caps are sometimes required at the mixed-sex outdoor pools — check the rules at the gate.",
      },
      {
        label: "Private rooms",
        value: "NT$800-2,000 per hour",
        detail: "Hotels rent private tubs by the hour, which sidesteps the nudity question entirely if that matters to you.",
      },
      {
        label: "Water types",
        value: "White, green and iron sulphur",
        detail:
          "Beitou has three distinct spring types. The green sulphur water is the rare and famously acidic one; Thermal Valley is its source and is far too hot to enter.",
      },
      {
        label: "September logic",
        value: "Better than it sounds",
        detail:
          "Soaking in 40 °C water in 32 °C weather seems wrong, but it works — especially on a rainy afternoon, and especially in an outdoor pool once the sun is down.",
      },
    ],
    venues: [
      {
        name: "Beitou Public Hot Spring",
        local: "北投公共溫泉",
        area: "Xinbeitou, MRT",
        what: "Outdoor terraced pools of varying temperature at a municipal price. Bring a swimsuit and a cap.",
        price: "NT$40-60",
        confidence: "verify",
      },
      {
        name: "Hotel private baths",
        area: "Beitou",
        what: "Hourly private rooms at the spa hotels lining the valley. Book ahead at weekends.",
        price: "NT$800-2,000/hour",
        confidence: "verify",
      },
      {
        name: "Thermal Valley",
        local: "地熱谷",
        area: "Beitou",
        what: "The steaming, acidic source pool. To look at, not to enter. Free and a five-minute walk from the baths.",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Shower before entering, every time.",
      "Gender-separated indoor pools are nude; mixed outdoor pools require swimwear and sometimes a cap.",
      "Tattoo rules are generally relaxed compared with Japan, but the grander hotels may differ.",
    ],
  },
  {
    city: "hongkong",
    sceneRating: "Limited",
    summary:
      "No bathhouse culture to speak of. What Hong Kong does have is foot reflexology and massage on almost every block, at prices that make it an everyday purchase rather than a treat.",
    howToFind: {
      app: "Google Maps or OpenRice",
      searchTerm: "foot massage · 足浴 · 按摩",
      note: "Shopfronts are everywhere in Causeway Bay, Jordan and Mong Kok. Check recent reviews rather than walking into the first one.",
    },
    practical: [
      {
        label: "Foot reflexology",
        value: "HK$200-400 for 45-60 min",
        detail: "The standard restorative move after a day of Hong Kong's hills and stairs. No appointment needed.",
      },
      {
        label: "Full body massage",
        value: "HK$400-800",
        detail: "Widely available; quality varies enormously. Hotel spas cost several times more.",
      },
      {
        label: "Hotel spas",
        value: "HK$1,200+",
        detail: "Genuinely good, priced accordingly. Not the reason to come to Hong Kong.",
      },
    ],
    venues: [
      {
        name: "Neighbourhood reflexology shops",
        area: "Causeway Bay, Jordan, Mong Kok",
        what: "Dozens within a few blocks in each district. Walk-in, an hour, out again.",
        price: "HK$200-400",
        confidence: "verify",
      },
    ],
  },
  {
    city: "shenzhen",
    sceneRating: "Strong",
    summary:
      "Shenzhen's version of the jjimjilbang is the 24-hour bathhouse-spa complex (洗浴中心): pools, saunas, steam rooms, a buffet, sleeping halls and massage, all for one entry fee. Add foot massage (沐足) on every block at a fraction of Hong Kong prices, and it is no surprise Hong Kong residents cross the border at weekends specifically for this.",
    howToFind: {
      app: "Dianping (大众点评)",
      searchTerm: "洗浴中心 (bathhouse) · 沐足 / 足浴 (foot massage) · 汗蒸 (sweat room)",
      note: "Pick places with many recent reviews and clear package prices. Dianping deals are often cheaper than the walk-in price.",
    },
    practical: [
      {
        label: "Bathhouse-spa entry",
        value: "¥120-300",
        detail:
          "Usually includes pools and saunas, a buffet, issued clothing for the mixed lounge areas and access for 12 hours or more. Massage is extra.",
      },
      {
        label: "Foot massage",
        value: "¥100-200 for 60-90 min",
        detail: "The standard end to a long day, with tea and fruit included. Walk in, or book a package on Dianping.",
      },
      {
        label: "Hours",
        value: "Often 24 hours",
        detail: "Overnight stays in the sleeping halls are allowed and cheap — not a bad fallback if you miss the last border crossing.",
      },
    ],
    venues: [
      {
        name: "Bathhouse-spa complexes",
        local: "洗浴中心",
        area: "Futian, Luohu, Nanshan",
        what: "Large multi-floor complexes with pools, saunas, buffet, lounges and massage. Compare a few on Dianping before choosing.",
        price: "¥120-300",
        confidence: "verify",
      },
      {
        name: "Foot massage shops",
        local: "沐足",
        area: "Citywide; dense around Luohu and the Lo Wu border",
        what: "Dozens within walking distance in any commercial district. Prices are posted by package and duration.",
        price: "¥100-200",
        confidence: "verify",
      },
    ],
    etiquette: [
      "Gender-separated pools and saunas are nude; issued shorts and a t-shirt are worn in the mixed lounges, buffet and sleeping halls.",
      "Shower thoroughly before entering any pool.",
      "Upselling to a longer session (加钟) or extra treatments is routine. A clear 不用 (bú yòng) is enough.",
      "Stick to well-reviewed places on Dianping and agree the package price before you start.",
    ],
  },
];
