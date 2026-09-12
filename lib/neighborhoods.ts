import type { CityId } from "./cities";

export interface Neighborhood {
  name: string;
  local?: string;
  character: string;
  bestFor: string[];
  timeNeeded: string;
  station: string;
}

export interface DayPlan {
  title: string;
  areas: string[];
  shape: string;
  timing: string;
  note?: string;
}

export interface ClosureTrap {
  place: string;
  closed: string;
  severity: "trap" | "note";
  detail: string;
  confidence?: "verify";
}

export interface CityPlanner {
  city: CityId;
  geography: string;
  /** The single structural fact that determines how you should plan days here. */
  planningRule: string;
  neighborhoods: Neighborhood[];
  days: DayPlan[];
  closures: ClosureTrap[];
  rainPlan: string;
}

export const PLANNER: CityPlanner[] = [
  {
    city: "taipei",
    geography:
      "A compact basin ringed by mountains, with the MRT reaching almost everything worth seeing in under 40 minutes. Taipei is the easiest of the three to improvise in.",
    planningRule:
      "Plan around heat, not distance. Everything is close, but 91 °F at 74% humidity caps you at roughly four hours outdoors. Build days as: outdoor morning → indoor or air-conditioned afternoon (museum, café, department store) → night market after dark, when the city becomes pleasant.",
    neighborhoods: [
      {
        name: "Zhongshan & Dadaocheng",
        local: "中山 / 大稻埕",
        character:
          "Japanese-era architecture, Dihua Street's restored merchant shophouses, specialty coffee and independent design shops. The most atmospheric walking in the city.",
        bestFor: ["Coffee", "Architecture", "Dried goods markets", "Independent retail"],
        timeNeeded: "Half day",
        station: "MRT Zhongshan / Daqiaotou",
      },
      {
        name: "Wanhua",
        local: "萬華",
        character:
          "Taipei's oldest district. Longshan Temple is the city's most active place of worship, and Bopiliao is a preserved Qing-era street block. Gritty and genuine.",
        bestFor: ["Temples", "History", "Herb Alley", "Old-school snacks"],
        timeNeeded: "2-3 hours",
        station: "MRT Longshan Temple",
      },
      {
        name: "Ximending",
        local: "西門町",
        character:
          "Pedestrianized youth district — arcades, claw-machine parlors, street food, tattoo shops, cinema. Loud, young, and open late.",
        bestFor: ["Arcades", "Street food", "People watching", "Late nights"],
        timeNeeded: "2-3 hours, best after 19:00",
        station: "MRT Ximen",
      },
      {
        name: "Da'an & Yongkang Street",
        local: "大安 / 永康街",
        character:
          "The city's best eating and café district, anchored by Yongkang Street. Leafy, residential, university-adjacent. Da'an Forest Park is the city's central green space.",
        bestFor: ["Food", "Cafés", "Bookshops", "Beef noodle soup"],
        timeNeeded: "Half day",
        station: "MRT Dongmen / Da'an",
      },
      {
        name: "Xinyi",
        local: "信義",
        character:
          "Modern commercial core around Taipei 101 — malls, international restaurants, nightlife. Elephant Mountain, the classic skyline viewpoint, starts here.",
        bestFor: ["Taipei 101", "Elephant Mountain", "Shopping", "Bars"],
        timeNeeded: "Half day plus evening",
        station: "MRT Taipei 101 / Xiangshan",
      },
      {
        name: "Shilin",
        local: "士林",
        character:
          "Home to the National Palace Museum and Taipei's largest night market. Also the gateway to Yangmingshan National Park.",
        bestFor: ["National Palace Museum", "Night market", "Yangmingshan access"],
        timeNeeded: "Full day if combining museum and market",
        station: "MRT Shilin / Jiantan",
      },
      {
        name: "Beitou",
        local: "北投",
        character:
          "Volcanic hot spring valley inside the city limits, reachable by MRT. Public and private baths, Thermal Valley, and Japanese-era spa architecture.",
        bestFor: ["Hot springs", "Thermal Valley", "Quiet half-day"],
        timeNeeded: "Half day",
        station: "MRT Xinbeitou",
      },
      {
        name: "Maokong",
        local: "貓空",
        character:
          "Tea-growing hills above the zoo, reached by gondola. Tea houses with city views; best in the late afternoon into evening.",
        bestFor: ["Tea houses", "Views", "Zhinan Temple"],
        timeNeeded: "Half day, late afternoon",
        station: "MRT Taipei Zoo, then gondola",
      },
      {
        name: "Songshan",
        local: "松山",
        character:
          "Raohe Night Market — narrower, older and better-food-per-square-meter than Shilin — plus Songshan Cultural and Creative Park in a converted tobacco factory.",
        bestFor: ["Raohe Night Market", "Design", "Ciyou Temple"],
        timeNeeded: "Evening",
        station: "MRT Songshan",
      },
    ],
    days: [
      {
        title: "Old Taipei",
        areas: ["Wanhua", "Ximending"],
        shape:
          "Longshan Temple at opening → Herb Alley → Bopiliao historic block → lunch → walk north into Ximending as the heat peaks and the arcades are air-conditioned → stay for dinner.",
        timing: "Start 08:30. Temple is most active early morning.",
        note: "Two adjacent MRT stops. Almost no transit time, which is what makes it work in September heat.",
      },
      {
        title: "Museum and market",
        areas: ["Shilin"],
        shape:
          "National Palace Museum for three hours in air conditioning → Shilin Night Market from 18:00.",
        timing: "Museum 10:00-13:00, then a gap, then market after dark.",
        note: "There is a long dead stretch between the two. Fill it with Beitou hot springs — it's on the same MRT line.",
      },
      {
        title: "Skyline day",
        areas: ["Xinyi", "Songshan"],
        shape:
          "Indoor afternoon in the Xinyi malls → Elephant Mountain 90 minutes before sunset → Taipei 101 lit up from the trail → MRT to Raohe Night Market for dinner.",
        timing: "Elephant Mountain climb takes 20-30 minutes and is genuinely steep. Sunset around 18:05 mid-September.",
        note: "The single best-value evening in Taipei. Bring a towel — you will be soaked after the climb.",
      },
      {
        title: "Coffee and shophouses",
        areas: ["Zhongshan & Dadaocheng"],
        shape:
          "Dihua Street from the north end → tea and dried-goods shops → café stops → Ningxia Night Market in the evening.",
        timing: "Late morning start. Many Dihua shops close by 18:00.",
      },
      {
        title: "Hills and tea",
        areas: ["Maokong"],
        shape: "Gondola up in the late afternoon → Zhinan Temple → tea house at dusk → gondola down.",
        timing: "Go after 15:00. The gondola queue is worst at midday and the view is best at dusk.",
        note: "Gondola closes Mondays for maintenance. Check before committing the afternoon.",
      },
    ],
    closures: [
      {
        place: "National Palace Museum",
        closed: "Mondays",
        severity: "trap",
        detail:
          "The museum's closing day has changed more than once in recent years. Confirm on the day you plan to go — building a whole day around it and finding it shut is the classic Taipei mistake.",
        confidence: "verify",
      },
      {
        place: "Most city museums and galleries",
        closed: "Mondays",
        severity: "trap",
        detail:
          "Taipei Fine Arts Museum, the Museum of Contemporary Art and most municipal venues close Mondays. Plan Monday as a market, temple, hot spring or hiking day.",
      },
      {
        place: "Maokong Gondola",
        closed: "Mondays (maintenance)",
        severity: "note",
        detail: "Maintenance closures are frequent and also occur in high wind. Check the same morning.",
        confidence: "verify",
      },
      {
        place: "Night markets",
        closed: "Never, effectively",
        severity: "note",
        detail:
          "Individual stalls take irregular days off, but no market closes wholesale. This is your reliable fallback for any day that falls apart.",
      },
      {
        place: "Everything, on a typhoon day",
        closed: "When a land warning is declared",
        severity: "trap",
        detail:
          "A declared typhoon day closes offices, schools, shops, museums and the above-ground MRT. Nothing is open and nothing is refundable. This is the real September closure risk.",
      },
    ],
    rainPlan:
      "Afternoon thunderstorms hit most days between 14:00 and 17:00. Reliable indoor blocks: National Palace Museum, the Xinyi department stores, Eslite Spectrum bookstores, Songshan Cultural Park, Beitou hot springs, and the Ximending arcades. A hot spring in a rainstorm is genuinely pleasant.",
  },
  {
    city: "hongkong",
    geography:
      "Three zones: Hong Kong Island (steep, dense, financial and nightlife), Kowloon across the harbour (markets, museums, street life), and the New Territories and outlying islands (hiking, beaches, villages). The harbour crossing is fast — MTR under it, Star Ferry across it.",
    planningRule:
      "Plan vertically, not just horizontally. Hong Kong Island is built on a slope, and the difference between Central at sea level and Mid-Levels is 100 metres of climbing in 88% humidity. Use the escalators, the Peak Tram and the MTR for elevation, and walk the flat parts. Also: stay on one side of the harbour per day where you can — crossing is quick but the walking at each end adds up.",
    neighborhoods: [
      {
        name: "Central & Soho",
        character:
          "The financial core, plus the bar and restaurant district climbing the hill above it. Tai Kwun (the restored former Central Police Station) and PMQ are the two anchor cultural sites, both free.",
        bestFor: ["Tai Kwun", "PMQ", "Bars", "Mid-Levels Escalator"],
        timeNeeded: "Full day with Sheung Wan",
        station: "MTR Central / Hong Kong",
      },
      {
        name: "Sheung Wan",
        character:
          "Immediately west of Central and far more atmospheric: dried seafood and herbal medicine shops, antique dealers on Hollywood Road, Man Mo Temple, and the city's best independent coffee.",
        bestFor: ["Man Mo Temple", "Antiques", "Coffee", "Dried seafood street"],
        timeNeeded: "Half day",
        station: "MTR Sheung Wan",
      },
      {
        name: "Wan Chai & Causeway Bay",
        character:
          "Wan Chai is old tenements, wet markets and the Blue House next to glass towers. Causeway Bay is dense shopping and the Noon Day Gun.",
        bestFor: ["Wet markets", "Shopping", "Local restaurants", "Victoria Park"],
        timeNeeded: "Half day",
        station: "MTR Wan Chai / Causeway Bay",
      },
      {
        name: "Tsim Sha Tsui",
        character:
          "Kowloon's waterfront: the museum cluster, the Avenue of Stars promenade, and the best skyline view in the city — which is of Hong Kong Island, so you want to be here, not there.",
        bestFor: ["Skyline views", "Museums", "Star Ferry", "Symphony of Lights"],
        timeNeeded: "Half day plus evening",
        station: "MTR Tsim Sha Tsui / East TST",
      },
      {
        name: "Mong Kok",
        character:
          "The densest urban area on earth by some measures. Stacked street markets — flowers, goldfish, sneakers, ladies' market — and Sino Centre for games, anime and figures.",
        bestFor: ["Street markets", "Sino Centre", "Street food", "Neon"],
        timeNeeded: "Half day, best from late afternoon",
        station: "MTR Mong Kok / Prince Edward",
      },
      {
        name: "Sham Shui Po",
        character:
          "Working-class Kowloon and the city's most interesting eating. Fabric and electronics markets, Golden Computer Arcade, and a serious wave of new cafés and design studios.",
        bestFor: ["Cheap eats", "Electronics", "Fabric market", "Apliu Street"],
        timeNeeded: "Half day",
        station: "MTR Sham Shui Po",
      },
      {
        name: "The Peak",
        character:
          "Victoria Peak. The tram is the experience; the Peak Circle Walk is the payoff and is flat, shaded and free — far better than the paid viewing deck.",
        bestFor: ["Views", "Peak Circle Walk"],
        timeNeeded: "Half day",
        station: "Peak Tram from Garden Road, or bus 15",
      },
      {
        name: "Lantau Island",
        character:
          "Big Buddha and Po Lin Monastery at Ngong Ping, reached by cable car, plus Tai O — a stilt-house fishing village that feels a century removed from the city.",
        bestFor: ["Big Buddha", "Tai O", "Cable car", "Hiking"],
        timeNeeded: "Full day",
        station: "MTR Tung Chung, then Ngong Ping 360",
      },
      {
        name: "Sai Kung",
        character:
          "New Territories fishing town with seafood restaurants, boat trips to beaches, and access to the Hong Kong Geopark's hexagonal rock columns.",
        bestFor: ["Seafood", "Beaches", "Boat trips", "Hiking"],
        timeNeeded: "Full day",
        station: "MTR Diamond Hill, then bus 92",
      },
    ],
    days: [
      {
        title: "Island walking day",
        areas: ["Sheung Wan", "Central & Soho"],
        shape:
          "Man Mo Temple → Hollywood Road antiques → PMQ → Tai Kwun → ride the Mid-Levels Escalator up → dinner and drinks in Soho.",
        timing: "Start 09:30. The escalator runs downhill until 10:00 for commuters, then uphill all day.",
        note: "Almost entirely walkable and largely shaded or indoors. The best hot-day option on the island.",
      },
      {
        title: "Kowloon harbourfront",
        areas: ["Tsim Sha Tsui"],
        shape:
          "Museum in the afternoon air conditioning → Avenue of Stars at dusk → Symphony of Lights at 20:00 → Star Ferry back to Central in the dark.",
        timing: "Symphony of Lights runs nightly at 20:00 and takes ten minutes.",
        note: "The Star Ferry crossing at night costs a few dollars and is the best value experience in Hong Kong.",
      },
      {
        title: "Market crawl",
        areas: ["Sham Shui Po", "Mong Kok"],
        shape:
          "Sham Shui Po for lunch and Apliu Street → MTR two stops → Mong Kok markets as they wake up in the late afternoon → street food dinner.",
        timing: "Start after 13:00. Mong Kok's markets are dead in the morning and peak after 18:00.",
      },
      {
        title: "Peak and south",
        areas: ["The Peak"],
        shape: "Peak Tram up early → Peak Circle Walk (about an hour, flat) → bus or tram down → afternoon in Central.",
        timing:
          "Be at the tram before 09:30 or after 19:00. Midday queues routinely exceed an hour and there is no shade.",
      },
      {
        title: "Lantau full day",
        areas: ["Lantau Island"],
        shape: "Cable car to Ngong Ping → Big Buddha and monastery → bus to Tai O → stilt village → return by late afternoon.",
        timing: "Leave by 09:00. The cable car closes for maintenance some weekdays and shuts entirely in high wind.",
        note: "The single most weather-sensitive day in the itinerary. Do not schedule it on a day with wind warnings.",
      },
    ],
    closures: [
      {
        place: "Hong Kong Museum of Art, Science Museum, Museum of History",
        closed: "Thursdays",
        severity: "trap",
        detail:
          "This is the Hong Kong trap and it catches almost everyone: the major public museums close on THURSDAY, not Monday. Visitors arriving from anywhere else in the world assume Monday and lose a day.",
        confidence: "verify",
      },
      {
        place: "Hong Kong Space Museum",
        closed: "Tuesdays",
        severity: "note",
        detail: "Different day again from the other museums in the same cluster. Check individually.",
        confidence: "verify",
      },
      {
        place: "Ngong Ping 360 cable car",
        closed: "Scheduled maintenance days, plus any high wind",
        severity: "trap",
        detail:
          "Maintenance closures are published in advance but easy to miss, and the cable car suspends service in strong wind with no notice. There is a bus alternative, but it is a long, winding ride.",
      },
      {
        place: "Everything, at Typhoon Signal 8",
        closed: "Immediately, city-wide",
        severity: "trap",
        detail:
          "At T8 most businesses close, buses and ferries stop, and only underground MTR sections run. Attractions do not reopen until hours after the signal is lowered. In September you should expect at least a T1 or T3 during a two-week trip.",
      },
      {
        place: "Restaurants around Mid-Autumn Festival",
        closed: "Variable, 25-26 September 2026",
        severity: "note",
        detail: "Family-run restaurants close for the festival. Chains and hotel restaurants stay open.",
      },
    ],
    rainPlan:
      "Hong Kong is the best-equipped of the three for rain — you can cross much of Central, Admiralty and TST through connected footbridges, malls and MTR passages without going outside. Fallbacks: the museum cluster in TST, Tai Kwun, K11 Musea, the IFC and Pacific Place malls, and a long dim sum lunch. Under a Black rainstorm warning, stay indoors entirely.",
  },
  {
    city: "seoul",
    geography:
      "The Han River splits the city. North of it is historic Seoul — palaces, hanok districts, Jongno. South is Gangnam, built from the 1970s onward: wider, newer, more corporate. Subway lines 1-9 plus the Bundang lines reach everything, and transfers are free within 30 minutes.",
    planningRule:
      "Group by river side and by subway line, and put your walking in the second half of September if you can choose. Seoul rewards long walking days more than the other two cities because the weather permits it — 15-20k steps is normal here and miserable in Taipei. Late September is the best walking weather of the Korean year.",
    neighborhoods: [
      {
        name: "Jongno & Bukchon",
        local: "종로 / 북촌",
        character:
          "Historic core. Gyeongbokgung and Changdeokgung palaces, Bukchon Hanok Village's traditional houses, Insadong's craft shops, and Ikseon-dong's converted hanok alleys full of cafés.",
        bestFor: ["Palaces", "Hanok villages", "Traditional crafts", "Ikseon-dong cafés"],
        timeNeeded: "Full day",
        station: "Line 3 Anguk / Gyeongbokgung",
      },
      {
        name: "Euljiro & Jung-gu",
        local: "을지로",
        character:
          "A printing and hardware district that became the city's most interesting nightlife by accident — bars hidden above machine shops, reachable only by unmarked stairwells. Gritty and very Seoul.",
        bestFor: ["Retro bars", "Hidden restaurants", "Gwangjang Market"],
        timeNeeded: "Evening",
        station: "Line 2 Euljiro 3-ga",
      },
      {
        name: "Myeongdong",
        local: "명동",
        character:
          "Cosmetics and shopping district with an aggressive street food scene. Heavily touristed and priced accordingly, but the skincare shopping is genuinely the best in the world.",
        bestFor: ["Cosmetics", "Street food", "Namsan access"],
        timeNeeded: "2-3 hours",
        station: "Line 4 Myeongdong",
      },
      {
        name: "Hongdae & Yeonnam",
        local: "홍대 / 연남동",
        character:
          "University district: live music, buskers, bars, cheap food, all-night everything. Yeonnam-dong next door is quieter, café-dense, built along a converted railway line turned linear park.",
        bestFor: ["Nightlife", "Live music", "Cafés", "Cheap eats"],
        timeNeeded: "Evening into night",
        station: "Line 2 Hongik Univ.",
      },
      {
        name: "Seongsu",
        local: "성수동",
        character:
          "Former shoe-factory district converted into Seoul's design and café centre. Flagship concept stores, roasteries in warehouses, and pop-ups. The most fashionable neighborhood in the city right now.",
        bestFor: ["Cafés", "Concept stores", "Design", "Han River access"],
        timeNeeded: "Half day",
        station: "Line 2 Seongsu",
      },
      {
        name: "Itaewon & Hannam",
        local: "이태원 / 한남동",
        character:
          "International district. Hannam-dong immediately east is upscale and quieter, and holds the Leeum Museum of Art — the best private art collection in Korea.",
        bestFor: ["Leeum Museum", "International food", "Bars", "Namsan views"],
        timeNeeded: "Half day plus evening",
        station: "Line 6 Itaewon / Hangangjin",
      },
      {
        name: "Gangnam & Apgujeong",
        local: "강남 / 압구정",
        character:
          "Wide boulevards, luxury retail, COEX with its Starfield Library, and Bongeunsa temple sitting incongruously across the road from a convention centre. Apgujeong and Garosu-gil are the fashion strips.",
        bestFor: ["COEX", "Bongeunsa", "Luxury shopping", "Screen golf"],
        timeNeeded: "Half day",
        station: "Line 2 Gangnam / Samseong",
      },
      {
        name: "Dongdaemun",
        local: "동대문",
        character:
          "Zaha Hadid's DDP building plus wholesale fashion markets that run through the night. Genuinely a 2 a.m. shopping district.",
        bestFor: ["DDP", "Night shopping", "Fashion wholesale"],
        timeNeeded: "Evening or very late",
        station: "Lines 2/4/5 Dongdaemun History & Culture Park",
      },
      {
        name: "Yeouido & the Han River parks",
        local: "여의도",
        character:
          "Financial island with the best riverside park access. Bike rental, convenience-store dinners on the grass, and the Seoul ritual of chimaek — fried chicken and beer — by the water.",
        bestFor: ["River parks", "Cycling", "Sunset", "Picnics"],
        timeNeeded: "Evening",
        station: "Line 5 Yeouinaru",
      },
      {
        name: "Bukhansan",
        local: "북한산",
        character:
          "A genuine granite mountain national park inside the city limits, reachable by subway and bus. Korea's hiking culture is serious and the trails are busy and social.",
        bestFor: ["Hiking", "Granite peaks", "Autumn air"],
        timeNeeded: "Full day",
        station: "Line 3 Gupabal, then bus",
      },
    ],
    days: [
      {
        title: "Palaces and hanok",
        areas: ["Jongno & Bukchon"],
        shape:
          "Gyeongbokgung at opening for the changing of the guard → Bukchon Hanok Village → lunch in Insadong → Changdeokgung's Secret Garden in the afternoon → Ikseon-dong for coffee and dinner.",
        timing:
          "Start at 09:00. The Secret Garden requires a separate timed ticket and sells out — book ahead.",
        note:
          "Wearing hanbok gets you free palace admission. Rental shops cluster around Anguk station. This is a genuine discount, not just a photo opportunity.",
      },
      {
        title: "Design day",
        areas: ["Seongsu", "Yeouido & the Han River parks"],
        shape:
          "Seongsu cafés and concept stores from late morning → walk down to Ttukseom Han River Park → cross to Yeouido or stay riverside for sunset and fried chicken.",
        timing: "Sunset around 18:40 mid-September. The riverside is the best evening in Seoul.",
      },
      {
        title: "Night Seoul",
        areas: ["Euljiro & Jung-gu", "Dongdaemun"],
        shape:
          "Gwangjang Market for street food from 17:00 → Euljiro hidden bars → DDP lit up after dark → Dongdaemun night markets if you're still going.",
        timing: "Starts late, ends later. Subway stops around midnight; after that it's Kakao T.",
        note: "Gwangjang Market's food alley is the best introduction to Korean street food in the city.",
      },
      {
        title: "South of the river",
        areas: ["Gangnam & Apgujeong"],
        shape:
          "Bongeunsa temple in the morning → COEX and the Starfield Library → Garosu-gil in the afternoon → screen golf or a Korean BBQ dinner in the evening.",
        timing: "Flexible. Almost entirely indoors and air conditioned.",
      },
      {
        title: "Mountain day",
        areas: ["Bukhansan"],
        shape: "Early subway and bus to a trailhead → 4-6 hours on the mountain → recovery meal at the base.",
        timing:
          "Start by 07:30. Korean hikers start early and the trails are crowded by mid-morning, especially on weekends.",
        note:
          "Save this for the last week of September if you can — cooler, drier, and the clearest air of the year. Trailhead restaurants serving pajeon and makgeolli after a hike are part of the ritual.",
      },
    ],
    closures: [
      {
        place: "Gyeongbokgung Palace",
        closed: "Tuesdays",
        severity: "trap",
        detail:
          "The main palace closes Tuesday. Deoksugung, Changdeokgung and Changgyeonggung close Monday. Getting these two backwards is the standard Seoul planning error — there is no single day when all the palaces are shut, and no single day when all are open.",
        confidence: "verify",
      },
      {
        place: "Changdeokgung, Changgyeonggung, Deoksugung",
        closed: "Mondays",
        severity: "trap",
        detail:
          "The opposite day from Gyeongbokgung. If you have one palace day, Wednesday through Sunday is the safe window.",
        confidence: "verify",
      },
      {
        place: "Changdeokgung Secret Garden",
        closed: "Requires a separate timed ticket",
        severity: "trap",
        detail:
          "Not a closure but the same outcome: limited daily capacity, guided entry only, and it sells out. Book in advance or you will be turned away at the gate.",
        confidence: "verify",
      },
      {
        place: "Leeum Museum of Art",
        closed: "Mondays",
        severity: "note",
        detail: "As with most private museums in Seoul.",
        confidence: "verify",
      },
      {
        place: "Small restaurants and shops during Chuseok",
        closed: "Roughly 24-26 September 2026",
        severity: "trap",
        detail:
          "This is the big one for your dates. Family-run restaurants close for several days, and the city noticeably empties as people travel to hometowns. Palaces and major museums usually open free on the holiday itself, and department stores and chains stay open. Plan the holiday days around large institutions, not neighborhood restaurants.",
        confidence: "verify",
      },
    ],
    rainPlan:
      "Seoul has a third of Hong Kong's September rainfall, so this matters least here. When it does rain: COEX and the Starfield Library, the National Museum of Korea, Leeum, department store food halls, and the underground shopping arcades that run for kilometres beneath Gangnam and Myeongdong. Korea's café culture means you are never more than a block from somewhere to sit out a shower.",
  },
];

export function plannerFor(city: CityId): CityPlanner {
  const found = PLANNER.find((p) => p.city === city);
  if (!found) throw new Error(`No planner for ${city}`);
  return found;
}
