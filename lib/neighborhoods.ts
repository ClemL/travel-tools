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

export interface DayTrip {
  name: string;
  local?: string;
  travel: string;
  duration: string;
  what: string;
  worthIt: string;
  septemberNote?: string;
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
  dayTrips: DayTrip[];
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
    dayTrips: [
      {
        name: "Jiufen & Shifen",
        local: "九份 / 十分",
        travel: "TRA to Ruifang, then bus — about 1h15m",
        duration: "Full day",
        what:
          "A former gold-mining town of lantern-lit stepped alleys clinging to a hillside above the sea, plus Shifen's old railway street where sky lanterns are released from the tracks.",
        worthIt:
          "The single most photographed day trip from Taipei, and genuinely atmospheric once the coach parties leave. Go late and stay for dusk when the lanterns come on.",
        septemberNote: "Fog and rain are common on the ridge even when Taipei is clear. Bring the umbrella.",
      },
      {
        name: "Yingge",
        local: "鶯歌",
        travel: "TRA local train, about 40 min",
        duration: "Half day",
        what: "Taiwan's ceramics town — a street of working studios, kilns and shops, plus a serious ceramics museum.",
        worthIt:
          "The best craft shopping within reach of Taipei, and far less touristed than Jiufen. Pairs naturally with Sanxia's indigo dyeing, two stops further.",
      },
      {
        name: "Tamsui & Fisherman's Wharf",
        local: "淡水",
        travel: "MRT red line to the end — 40 min, no transfers",
        duration: "Half day, best in late afternoon",
        what:
          "A riverside old street of food stalls, a Spanish-then-Dutch fort, and a sunset over the Taiwan Strait from the wharf.",
        worthIt:
          "The easiest trip on this list — it is just the end of a subway line. The sunset is the point; go after 16:00.",
      },
      {
        name: "Wulai",
        local: "烏來",
        travel: "Bus from MRT Xindian, about 50 min",
        duration: "Half day",
        what:
          "An Atayal indigenous township in a river gorge, with hot springs, a waterfall and a small log-cart railway.",
        worthIt:
          "Hot springs without the crowds of Beitou, plus one of the more accessible windows onto Taiwan's indigenous cultures.",
        septemberNote: "Typhoon rain closes the gorge road and the springs. Check before committing.",
      },
      {
        name: "Keelung night market",
        local: "基隆廟口",
        travel: "TRA or bus, about 50 min",
        duration: "Evening",
        what: "Miaokou is a temple-front night market with a serious seafood reputation, in a working port city.",
        worthIt: "Arguably the best night market in northern Taiwan, and almost no foreign visitors make the trip.",
      },
      {
        name: "Yehliu Geopark",
        local: "野柳",
        travel: "Bus from Taipei, about 1h20m",
        duration: "Half day",
        what: "A coastal cape of wind-eroded mushroom rocks, the Queen's Head among them.",
        worthIt: "Striking, but small, crowded and fully exposed. Combine with Jiufen rather than making it the whole day.",
        septemberNote: "No shade whatsoever. Go early or not at all in September heat.",
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
    dayTrips: [
      {
        name: "Macau",
        local: "澳門",
        travel: "Ferry, about 1 hour, or bus over the HZMB bridge",
        duration: "Full day, or overnight",
        what:
          "A Portuguese colonial old town — baroque church facades, egg tarts, cobbled squares — bolted onto the largest casino economy on earth.",
        worthIt:
          "A genuinely different city and an easy add. The Historic Centre is UNESCO-listed and walkable; the Cotai casino strip is the surreal counterpoint.",
        septemberNote:
          "This is a separate jurisdiction: you clear immigration both ways. Check entry requirements and carry your passport, not a copy.",
      },
      {
        name: "Cheung Chau",
        local: "長洲",
        travel: "Ferry from Central, 35-60 min",
        duration: "Half to full day",
        what:
          "A car-free dumbbell-shaped island of seafood restaurants, a fishing harbour, beaches and a pirate cave.",
        worthIt:
          "The most characterful of the outlying islands and the easiest to enjoy without hiking. Rent a bike; there are no cars at all.",
      },
      {
        name: "Lamma Island",
        local: "南丫島",
        travel: "Ferry from Central, about 30 min",
        duration: "Half day",
        what:
          "Walk the hour-long family trail between Yung Shue Wan and Sok Kwu Wan, ending at a seafood restaurant on stilts over the water.",
        worthIt: "A low-effort island walk with a meal at the end and a ferry back. Reliably pleasant.",
        septemberNote: "The trail is exposed and hilly. Do it in the morning, and carry water.",
      },
      {
        name: "Sai Kung & the Geopark",
        local: "西貢",
        travel: "MTR to Diamond Hill, then bus 92 — about 1 hour",
        duration: "Full day",
        what:
          "A seafood town where you choose your fish from tanks on the waterfront, plus boat trips to hexagonal volcanic rock columns and some of Hong Kong's best beaches.",
        worthIt:
          "The part of Hong Kong that surprises people most — it looks nothing like the city. Hire a sampan to the islands.",
      },
      {
        name: "Tai O & Big Buddha",
        local: "大澳",
        travel: "MTR to Tung Chung, cable car, then bus — about 1h30m",
        duration: "Full day",
        what: "A stilt-house fishing village and the Po Lin Monastery's giant bronze Buddha, both on Lantau.",
        worthIt: "The classic Lantau day. Do the Buddha first, then Tai O in the afternoon light.",
        septemberNote: "The cable car suspends in high wind with no notice. Have the bus route as a fallback.",
      },
      {
        name: "Shenzhen",
        local: "深圳",
        travel: "MTR East Rail to Lo Wu or Lok Ma Chau, about 45 min",
        duration: "Full day",
        what: "Mainland China's tech capital — electronics markets at Huaqiangbei, huge malls, and a completely different urban register.",
        worthIt:
          "Better as its own stop than a day trip — see the Shenzhen destination. US passport holders cannot use the 5-day Shenzhen port visa, and a Hong Kong → Shenzhen → Hong Kong round trip does not qualify for visa-free transit, so a day trip needs a full Chinese visa.",
        septemberNote: "Visa rules for US passport holders change; confirm well in advance rather than at the border.",
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
    city: "shenzhen",
    geography:
      "A linear city stretched about 80 km along the Hong Kong border. The core runs west to east: Shekou and Nanshan (waterfront, tech campuses, expat neighbourhoods), Futian (civic centre, CBD, Huaqiangbei), and Luohu (the original downtown, at the Lo Wu crossing). Bao'an, Longhua and Longgang to the north are huge but mostly residential and industrial; Dapeng in the far east is coastline and beaches.",
    planningRule:
      "Distances are the constraint, not cost. Shekou to Luohu is about 30 km and an hour on the metro, so plan each day along one stretch of a metro line — Line 1 is the east-west spine — and do not zig-zag. DiDi is cheap enough to fill the gaps. Most sights open late (10:00) and the city comes alive after dark.",
    neighborhoods: [
      {
        name: "Futian CBD & Civic Center",
        local: "福田中心区",
        character:
          "The planned heart of the city: the Civic Center with its giant wing roof, Lianhuashan Park with the skyline view, the library and concert hall, and the Ping An Finance Centre's observation deck above it all.",
        bestFor: ["Skyline", "Lianhuashan Park", "Ping An observation deck", "Book City"],
        timeNeeded: "Half day",
        station: "Metro Civic Center / Shopping Park",
      },
      {
        name: "Huaqiangbei",
        local: "华强北",
        character:
          "The electronics market district: a pedestrian street lined with multi-storey malls of components, gadgets, phones and drones. Chaotic, fascinating, and the reason many visitors come to Shenzhen at all.",
        bestFor: ["Electronics", "Gadgets", "Components", "People-watching"],
        timeNeeded: "Half day",
        station: "Metro Huaqiang Road / Huaqiangbei",
      },
      {
        name: "Luohu & Dongmen",
        local: "罗湖 / 东门",
        character:
          "The original downtown, right at the Lo Wu border crossing. Dongmen is a busy pedestrian shopping district on the site of the old market town; Luohu Commercial City above the border is tailors, fabric and massage.",
        bestFor: ["Street shopping", "Tailoring", "Cheap eats", "Foot massage"],
        timeNeeded: "Half day",
        station: "Metro Laojie / Luohu",
      },
      {
        name: "OCT & OCT Loft",
        local: "华侨城",
        character:
          "A leafy district of theme parks and museums, with OCT Loft — a converted factory complex of galleries, design studios, cafés and bookshops — as the reason to come.",
        bestFor: ["Galleries", "Design shops", "Cafés", "Architecture"],
        timeNeeded: "Half day",
        station: "Metro Qiaocheng East / OCT",
      },
      {
        name: "Nantou Ancient Town",
        local: "南头古城",
        character:
          "A walled town far older than Shenzhen itself, restored into lanes of small shops, cafés and exhibitions while people still live in it.",
        bestFor: ["Old town lanes", "Design shops", "Cafés", "Photography"],
        timeNeeded: "2-3 hours",
        station: "Metro Zhongshan Park",
      },
      {
        name: "Nanshan & Shenzhen Bay Park",
        local: "南山 / 深圳湾公园",
        character:
          "The tech district — Tencent's headquarters and the high-tech park — plus a long waterfront park looking across the bay to Hong Kong. Shenzhen's best sunset walk or bike ride.",
        bestFor: ["Sunset", "Waterfront cycling", "Tech campuses", "Malls"],
        timeNeeded: "Half day, ending at sunset",
        station: "Metro Houhai / Shenzhen Bay Park",
      },
      {
        name: "Shekou & Sea World",
        local: "蛇口 / 海上世界",
        character:
          "Where Shenzhen's opening-up began, now an expat-friendly waterfront of restaurants, bars and the Design Society cultural centre, with ferries to Hong Kong and Macau.",
        bestFor: ["Dinner", "Craft beer", "Design Society", "Ferries"],
        timeNeeded: "Evening",
        station: "Metro Sea World",
      },
      {
        name: "Dafen Oil Painting Village",
        local: "大芬油画村",
        character:
          "A few blocks of open studios where thousands of painters produce reproductions and originals. Fun to wander and the place to commission a painting.",
        bestFor: ["Art", "Commissions", "Studios"],
        timeNeeded: "2-3 hours",
        station: "Metro Dafen (Line 3)",
      },
      {
        name: "Dapeng Peninsula",
        local: "大鹏半岛",
        character:
          "The far east of the city: a Ming-dynasty fortress town, fishing villages, seafood streets and Shenzhen's best beaches at Xichong. Feels nothing like the city.",
        bestFor: ["Beaches", "Seafood", "Dapeng Fortress", "Coastal hiking"],
        timeNeeded: "Full day",
        station: "1.5-2 hours by bus or DiDi from Futian",
      },
    ],
    days: [
      {
        title: "Gadgets and skyline",
        areas: ["Huaqiangbei", "Futian CBD & Civic Center"],
        shape:
          "Huaqiangbei malls from late morning → lunch nearby → Lianhuashan Park for the skyline view → Civic Center → Ping An Finance Centre deck at sunset → Chaoshan beef hot pot for dinner.",
        timing: "Start around 10:30 when the malls are fully open. Many stalls wind down from 18:00.",
        note: "Almost entirely on Lines 1, 2 and 3, and largely indoors — a good hot-day plan.",
      },
      {
        title: "West side waterfront",
        areas: ["Nantou Ancient Town", "Nanshan & Shenzhen Bay Park", "Shekou & Sea World"],
        shape:
          "Nantou Ancient Town late morning → lunch → Shenzhen Bay Park in the late afternoon, on foot or a shared bike → sunset over the bay → dinner and drinks at Shekou.",
        timing: "Time the park for the last two hours of daylight; midday is exposed and very hot.",
      },
      {
        title: "Design and art",
        areas: ["OCT & OCT Loft", "Dafen Oil Painting Village"],
        shape: "OCT Loft galleries and studios in the morning → lunch in OCT → Metro to Dafen for the afternoon → commission a painting to collect later.",
        timing: "Avoid Mondays, when many galleries close.",
        note: "If you commission at Dafen, do it early in your stay so the paint has time to dry.",
      },
      {
        title: "Border-side Luohu",
        areas: ["Luohu & Dongmen"],
        shape: "Arrive via Lo Wu → tailor fitting at Luohu Commercial City → Dongmen pedestrian streets → foot massage → back across the border.",
        timing: "Avoid Saturday mornings northbound and Sunday evenings southbound, when border queues peak.",
        note: "A natural arrival or departure day if you are coming from or going to Hong Kong by MTR.",
      },
    ],
    dayTrips: [
      {
        name: "Hong Kong",
        local: "香港",
        travel: "High-speed rail Futian → West Kowloon, 15-20 min; or Metro to the Lo Wu border",
        duration: "Full day",
        what: "A different jurisdiction a quarter of an hour away by train. See the Hong Kong destination.",
        worthIt:
          "Easy — but leaving the mainland ends a visa-free transit stay, and coming back needs a new entry basis. Plan the order of the two cities around your entry rules.",
        septemberNote: "Typhoon warnings can suspend cross-border services and strand you on one side.",
      },
      {
        name: "Guangzhou",
        local: "广州",
        travel: "High-speed rail from Futian or Shenzhen North, 30-45 min",
        duration: "Full day",
        what:
          "The historic capital of Cantonese culture and food: the Chen Clan Ancestral Hall, colonial Shamian Island, the Canton Tower and dim sum at its source.",
        worthIt: "The best day trip from Shenzhen for food and history. Book trains on Trip.com with your passport.",
      },
      {
        name: "Chaozhou",
        local: "潮州",
        travel: "High-speed rail from Shenzhen North, about 1h40m-2h",
        duration: "Full day, or overnight",
        what:
          "A beautifully preserved old city — Guangji Bridge, the Paifang Street arches, traditional houses — and the source of the beef hot pot, braised goose and gongfu tea you eat in Shenzhen.",
        worthIt: "A long day but a memorable one, especially if Chaoshan food is the highlight of your Shenzhen eating.",
      },
      {
        name: "Dapeng Fortress & Xichong",
        local: "大鹏所城 / 西涌",
        travel: "Bus or DiDi from Futian, 1.5-2 hours",
        duration: "Full day",
        what: "A 600-year-old walled fortress town, then the cleanest beach in Shenzhen and a seafood dinner by the water.",
        worthIt: "The antidote to the city. Go on a weekday; weekend traffic to the peninsula is heavy.",
        septemberNote: "Beaches close under typhoon and rainstorm warnings, and the sea can stay rough for days afterwards.",
      },
      {
        name: "Macau",
        local: "澳门",
        travel: "Ferry from Shekou, about 1 hour",
        duration: "Full day, or overnight",
        what: "Portuguese colonial old town and casino strip, with a direct ferry from Shekou.",
        worthIt:
          "Easy to reach, but Macau is outside the mainland: going there ends a visa-free transit stay unless it is your onward destination.",
      },
      {
        name: "Guanlan Printmaking Village",
        local: "观澜版画村",
        travel: "Metro and taxi, about 1 hour from Futian",
        duration: "Half day",
        what: "An old Hakka village of watchtowers and courtyard houses, turned into a printmaking base with studios and exhibitions.",
        worthIt: "A quiet, pretty half day that few visitors find. Combine with Mission Hills if you are playing golf.",
      },
    ],
    closures: [
      {
        place: "Museums and many galleries",
        closed: "Mondays",
        severity: "trap",
        detail: "The Shenzhen Museum and many OCT galleries close on Mondays. Check each one, as a few use a different day.",
        confidence: "verify",
      },
      {
        place: "Huaqiangbei malls",
        closed: "Evenings, and for weeks around Chinese New Year",
        severity: "note",
        detail: "Open daily, but stalls start closing from about 18:00. Go in the late morning or early afternoon.",
        confidence: "verify",
      },
      {
        place: "Everything, under a red typhoon or rainstorm warning",
        closed: "City-wide stop order",
        severity: "trap",
        detail:
          "Shenzhen orders work, school and business to stop at the highest warning levels. Cross-border coaches, ferries and some checkpoints suspend too.",
      },
      {
        place: "Border checkpoints",
        closed: "Lo Wu at midnight; Lok Ma Chau Spur Line earlier",
        severity: "trap",
        detail: "Each crossing has its own hours. Missing the last crossing means a night on the wrong side of the border.",
        confidence: "verify",
      },
      {
        place: "Every attraction, during Golden Week",
        closed: "Open but overwhelmed, 1-7 October 2026",
        severity: "trap",
        detail: "Popular sights set visitor caps and sell out; trains, hotels and the border crossings are at their busiest of the year.",
        confidence: "verify",
      },
    ],
    rainPlan:
      "Shenzhen's malls are enormous and connected to the metro — MixC, Coco Park, the Shenzhen Bay malls — and Huaqiangbei is largely indoors. Good rainy-day fallbacks: Shenzhen Book City, the Shenzhen Museum, Design Society in Shekou, and an afternoon at a bathhouse-spa, which is the classic local answer to bad weather. Skip the observation deck when the cloud is low.",
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
    dayTrips: [
      {
        name: "The DMZ",
        local: "비무장지대",
        travel: "Organised tour only, about 1 hour each way",
        duration: "Half to full day",
        what:
          "The Joint Security Area, observation posts over North Korea, and the Third Infiltration Tunnel. Access is by licensed tour with passport checks.",
        worthIt:
          "The most singular thing you can do from Seoul. JSA access is intermittently suspended depending on the security situation, so book early and have a fallback.",
        septemberNote: "Book weeks ahead. Tours sell out around Chuseok and some do not run on the holiday itself.",
      },
      {
        name: "Suwon Hwaseong Fortress",
        local: "수원 화성",
        travel: "Subway line 1 or a KTX hop — about 1 hour",
        duration: "Half day",
        what:
          "A late-18th-century walled fortress with 5.7 km of ramparts you can walk, gates, and archery. UNESCO-listed and genuinely impressive.",
        worthIt:
          "The best history day trip from Seoul, and Suwon is also the home of galbi. Walk the full circuit in about two hours.",
        septemberNote: "Late September is ideal for this — the whole point is a long exposed walk on the walls.",
      },
      {
        name: "Nami Island & Garden of Morning Calm",
        local: "남이섬",
        travel: "ITX train to Gapyeong, then shuttle — about 1h20m",
        duration: "Full day",
        what: "A tree-lined river island famous from Korean television, usually paired with a landscaped garden nearby.",
        worthIt:
          "Pleasant rather than essential, and busy. Worth it in peak autumn colour, which is late October rather than September.",
      },
      {
        name: "Icheon ceramics village",
        local: "이천 도자기마을",
        travel: "Bus or subway plus bus, about 1h15m",
        duration: "Full day",
        what: "Korea's ceramics centre — working kilns, studios, a museum, and shops selling directly from the makers.",
        worthIt: "The right trip if craft is a priority. Prices are far better than Insadong and the work is the real thing.",
      },
      {
        name: "Incheon Chinatown & Open Port",
        local: "인천 차이나타운",
        travel: "Subway line 1 to Incheon, about 1 hour",
        duration: "Half day",
        what:
          "Korea's only official Chinatown, the birthplace of jjajangmyeon, plus a preserved Japanese-era open-port district and a museum about the noodle itself.",
        worthIt: "An easy, odd, low-commitment half day. Convenient if you have a long layover at Incheon.",
      },
      {
        name: "Bukhansan National Park",
        local: "북한산",
        travel: "Subway to Gupabal, then bus — about 1 hour",
        duration: "Full day",
        what: "Granite peaks inside the city limits, with genuine scrambling on the Baegundae route and superb views back over Seoul.",
        worthIt:
          "Korean hiking culture at full strength — busy, social, and ending in makgeolli at the trailhead. The best free thing to do near Seoul.",
        septemberNote:
          "Save it for the last week of the month: cooler, drier and the clearest air of the year. Trails close for days after heavy rain.",
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
