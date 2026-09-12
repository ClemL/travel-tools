import type { CityId } from "./cities";

export interface Dish {
  en: string;
  local: string;
  roman: string;
  what: string;
  price: string;
  /** Point at the characters if the words fail. */
  mustTry?: boolean;
}

export interface OrderingRule {
  title: string;
  detail: string;
}

export interface FoodProfile {
  city: CityId;
  summary: string;
  /** The one structural thing about eating here that visitors get wrong. */
  keyMechanic: string;
  dishes: Dish[];
  ordering: OrderingRule[];
  vegetarian: string;
  drinks: string;
  mealTimes: string;
  budget: string;
}

export const FOOD: FoodProfile[] = [
  {
    city: "taipei",
    summary:
      "The best cheap eating of the three cities by a wide margin. Taipei's food culture is built around small specialist shops that make one thing, plus night markets that run until midnight.",
    keyMechanic:
      "Most small restaurants use an order sheet: you take a paper slip and a pencil at the door, tick quantities next to the items you want, and hand it to the counter. Nobody will take a verbal order. If you walk in and wait to be served, you will wait forever. Look for the clipboard.",
    dishes: [
      {
        en: "Beef noodle soup",
        local: "牛肉麵",
        roman: "niú ròu miàn",
        what:
          "Taiwan's national dish. Braised beef shank in a dark, spiced broth. The clear-broth version (清燉) is the subtler alternative to the standard red-braised (紅燒).",
        price: "NT$150-250",
        mustTry: true,
      },
      {
        en: "Braised pork rice",
        local: "滷肉飯",
        roman: "lǔ ròu fàn",
        what: "Minced fatty pork stewed in soy and five-spice over rice. The cheapest genuinely great thing you will eat.",
        price: "NT$30-60",
        mustTry: true,
      },
      {
        en: "Xiao long bao",
        local: "小籠包",
        roman: "xiǎo lóng bāo",
        what:
          "Soup dumplings. Din Tai Fung started in Taipei and is genuinely excellent, but neighborhood shops are a third of the price.",
        price: "NT$100-250",
        mustTry: true,
      },
      {
        en: "Scallion pancake",
        local: "蔥油餅",
        roman: "cōng yóu bǐng",
        what: "Layered griddled flatbread, often with an egg added. Street-corner breakfast staple.",
        price: "NT$30-50",
      },
      {
        en: "Oyster omelette",
        local: "蚵仔煎",
        roman: "ô-á-tsian",
        what: "Night market classic — small oysters, egg and sweet potato starch, gelatinous and sweet-sauced. Divisive and worth trying.",
        price: "NT$70-90",
      },
      {
        en: "Pepper pork bun",
        local: "胡椒餅",
        roman: "hú jiāo bǐng",
        what: "Peppery pork and scallion in a bun baked against the wall of a clay oven. Raohe Night Market's signature.",
        price: "NT$50-60",
        mustTry: true,
      },
      {
        en: "Stinky tofu",
        local: "臭豆腐",
        roman: "chòu dòu fu",
        what: "Fermented tofu, deep fried, served with pickled cabbage. It smells far worse than it tastes.",
        price: "NT$50-70",
      },
      {
        en: "Bubble tea",
        local: "珍珠奶茶",
        roman: "zhēn zhū nǎi chá",
        what:
          "Invented in Taiwan. Order by sweetness and ice level — 半糖 (half sugar) and 少冰 (less ice) is the standard local order.",
        price: "NT$50-80",
        mustTry: true,
      },
      {
        en: "Shaved ice with mango",
        local: "芒果冰",
        roman: "máng guǒ bīng",
        what: "September is still mango season. Milk-based shaved ice with fresh fruit, not the syrup-drenched version.",
        price: "NT$150-250",
      },
      {
        en: "Breakfast soy milk shop",
        local: "豆漿店",
        roman: "dòu jiāng diàn",
        what:
          "A whole category: hot or cold soy milk, fried dough sticks (油條), egg crepes (蛋餅), and savory soy curd (鹹豆漿). Open from 05:00, gone by 11:00.",
        price: "NT$50-100",
        mustTry: true,
      },
    ],
    ordering: [
      {
        title: "Take the order slip",
        detail:
          "Paper slip and pencil at the entrance or on the table. Tick quantities, hand it to the counter, pay when you order or when you leave depending on the shop.",
      },
      {
        title: "Night markets are cash and walk-and-eat",
        detail:
          "Buy from one stall, eat it standing, move to the next. Do not try to assemble a whole meal at one place. Carry small bills — NT$100 notes and coins.",
      },
      {
        title: "Specialist shops do one thing",
        detail:
          "A beef noodle shop sells beef noodles. Do not expect a broad menu; expect the thing on the sign to be very good.",
      },
      {
        title: "Sit down, share tables",
        detail: "Communal seating at busy shops is normal. Sit at any open seat.",
      },
      {
        title: "Convenience stores are real food",
        detail:
          "7-Eleven and FamilyMart in Taiwan sell tea eggs, hot oden, decent coffee and full meals. This is not a compromise; locals eat this way daily.",
      },
    ],
    vegetarian:
      "Taiwan is the easiest place in East Asia to eat vegetarian, thanks to a strong Buddhist tradition. Look for the character 素 (sù) — it marks fully vegetarian shops and buffets, which are common and cheap. Note that 素 in the Buddhist sense also excludes garlic and onion. Say 我吃素 (wǒ chī sù) — 'I eat vegetarian'.",
    drinks:
      "Tea culture is serious — visit a tea house in Maokong. Craft beer has grown substantially. Convenience-store beer is legal to drink in most public places.",
    mealTimes:
      "Breakfast 06:00-10:00 and genuinely important. Lunch 11:30-14:00. Dinner from 18:00. Night markets 18:00-24:00. Many small shops close between lunch and dinner.",
    budget:
      "Street and night market meal: NT$100-200. Casual sit-down restaurant: NT$200-400. Mid-range: NT$600-1,200. You can eat extremely well for under NT$500 a day.",
  },
  {
    city: "hongkong",
    summary:
      "Two parallel food cultures: Cantonese cooking at the highest level anywhere, and the cha chaan teng — fast, cheap, chaotic diners serving a Hong Kong-specific hybrid of Cantonese and British colonial food.",
    keyMechanic:
      "At a cha chaan teng, you will be seated with strangers, an order will be taken within about 30 seconds of you sitting down, and you are expected to eat and leave in under 25 minutes. Decide what you want before you sit. Lingering is the one genuine rudeness. This is not unfriendliness — it is throughput.",
    dishes: [
      {
        en: "Dim sum",
        local: "點心",
        roman: "dím sām",
        what:
          "Steamed and fried small plates, served morning to mid-afternoon only. Har gow (shrimp dumpling) and siu mai are the benchmarks by which a place is judged.",
        price: "HK$150-350 per person",
        mustTry: true,
      },
      {
        en: "Roast goose",
        local: "燒鵝",
        roman: "sīu ngó",
        what: "Crisp-skinned roast goose over rice. Hong Kong's single greatest dish and hard to find done well elsewhere.",
        price: "HK$80-200",
        mustTry: true,
      },
      {
        en: "Char siu rice",
        local: "叉燒飯",
        roman: "chā sīu faahn",
        what: "Barbecue pork over rice from a siu mei shop — the places with meat hanging in the window.",
        price: "HK$50-90",
        mustTry: true,
      },
      {
        en: "Wonton noodles",
        local: "雲吞麵",
        roman: "wàhn tān mihn",
        what: "Thin springy egg noodles in shrimp-shell broth with prawn wontons. A small bowl by design.",
        price: "HK$40-70",
        mustTry: true,
      },
      {
        en: "Hong Kong milk tea",
        local: "絲襪奶茶",
        roman: "sī maht náaih chàh",
        what:
          "Literally 'stocking milk tea' — black tea strained through fabric, with evaporated milk. Strong and slightly bitter.",
        price: "HK$20-30",
        mustTry: true,
      },
      {
        en: "Pineapple bun",
        local: "菠蘿包",
        roman: "bō lòh bāau",
        what:
          "No pineapple. A sweet crackle-topped bun, ideally served with a cold slab of butter inside (菠蘿油).",
        price: "HK$10-20",
      },
      {
        en: "Egg tart",
        local: "蛋撻",
        roman: "daahn tāat",
        what: "Custard tart in either shortcrust or puff pastry. Bakeries argue about which is correct.",
        price: "HK$8-15",
      },
      {
        en: "Clay pot rice",
        local: "煲仔飯",
        roman: "bōu jái faahn",
        what:
          "Rice cooked to order in a clay pot with cured sausage or chicken, producing a crisp crust at the bottom. Winter dish, available year-round in Temple Street.",
        price: "HK$60-120",
      },
      {
        en: "Curry fish balls",
        local: "咖喱魚蛋",
        roman: "ga lēi yùh dáan",
        what: "The definitive Hong Kong street snack, on a skewer, from a hole in the wall.",
        price: "HK$15-25",
      },
      {
        en: "Yuenyeung",
        local: "鴛鴦",
        roman: "yūn yēung",
        what: "Coffee and milk tea mixed. Sounds wrong, works.",
        price: "HK$22-32",
      },
    ],
    ordering: [
      {
        title: "Cha chaan teng: be fast",
        detail:
          "Shared tables, immediate ordering, rapid turnover. Menus are often Chinese-only with set meals listed by number — pointing at a number works fine.",
      },
      {
        title: "Dim sum is a morning meal",
        detail:
          "Traditionally 07:00 to about 15:00. Old-school halls use a paper card stamped at your table; modern ones use tick sheets. Trolleys are increasingly rare.",
      },
      {
        title: "Tea table etiquette",
        detail:
          "Tap two fingers on the table to thank whoever pours your tea. Leave the teapot lid ajar to request a refill. Rinsing your bowl and chopsticks with the first pour of tea is normal.",
      },
      {
        title: "Siu mei shops: point at the window",
        detail: "Roast meat shops hang the product in the window. Point at what you want, over rice or noodles.",
      },
      {
        title: "Tea and pickles may be charged",
        detail: "The small dish of peanuts or pickles placed on your table is not free. Wave it away if you don't want it.",
      },
      {
        title: "Use OpenRice, not Google",
        detail:
          "OpenRice is the local restaurant authority and its ratings reflect local opinion. Google reviews in Hong Kong skew heavily toward tourists.",
      },
    ],
    vegetarian:
      "Harder than Taiwan. Buddhist vegetarian restaurants (齋 / 素食) exist and are good, but mainstream Cantonese cooking uses pork, oyster sauce and stock pervasively — including in dishes that look vegetable-only. Say 我食素 (ngóh sihk sou). Vegetarian dim sum is widely available.",
    drinks:
      "Milk tea is the default. Craft beer has taken hold in Sheung Wan and Kennedy Town. Cocktail bars in Central and Soho are world-class and priced accordingly — HK$120-180 per drink.",
    mealTimes:
      "Dim sum from 07:00. Lunch 12:00-14:00 and genuinely crowded — arrive before noon or after 14:00. Dinner 18:30-22:00. Late-night food in Mong Kok and Temple Street until 02:00.",
    budget:
      "Cha chaan teng meal: HK$50-80. Siu mei rice: HK$60-90. Mid-range dinner: HK$200-400. Dim sum: HK$150-350. Hong Kong is the most expensive of the three for restaurant dining but the cheap end is still cheap.",
  },
  {
    city: "seoul",
    summary:
      "Korean eating is structurally different from the other two: a meal is a shared table of communal dishes plus unlimited free side dishes, and many restaurants specialize in exactly one thing that requires two or more people to order.",
    keyMechanic:
      "Banchan — the small side dishes that arrive unbidden — are free and refillable. Ask for more by raising a hand and saying 저기요 (jeogiyo). Separately: many restaurants, especially grilled meat and stew specialists, have a two-portion minimum and will turn away a solo diner. If you are eating alone, aim for noodle shops, gimbap places, or the increasingly common 혼밥 (honbap, solo dining) restaurants with counter seating.",
    dishes: [
      {
        en: "Korean BBQ — pork belly",
        local: "삼겹살",
        roman: "samgyeopsal",
        what:
          "Thick-cut pork belly grilled at your table, wrapped in lettuce with garlic, ssamjang and grilled kimchi. Usually a two-person minimum.",
        price: "₩15,000-22,000 per portion",
        mustTry: true,
      },
      {
        en: "Korean BBQ — beef",
        local: "갈비",
        roman: "galbi",
        what: "Marinated short rib. Hanwoo (Korean beef) is excellent and expensive; imported is a third of the price.",
        price: "₩25,000-60,000",
      },
      {
        en: "Cold buckwheat noodles",
        local: "냉면",
        roman: "naengmyeon",
        what:
          "Buckwheat noodles in an icy broth. Perfect for early-September heat, and traditionally eaten after grilled meat.",
        price: "₩10,000-14,000",
        mustTry: true,
      },
      {
        en: "Army stew",
        local: "부대찌개",
        roman: "budae jjigae",
        what:
          "Postwar dish built from spam, sausage, kimchi, instant noodles and gochujang in a bubbling pot. Communal, cheap, and a genuine piece of Korean history.",
        price: "₩9,000-12,000 per person",
      },
      {
        en: "Fried chicken and beer",
        local: "치맥",
        roman: "chimaek",
        what:
          "Korean fried chicken — double-fried, thin-crusted — with beer. A national institution, best eaten in a Han River park.",
        price: "₩18,000-25,000 per bird",
        mustTry: true,
      },
      {
        en: "Knife-cut noodle soup",
        local: "칼국수",
        roman: "kalguksu",
        what: "Hand-cut wheat noodles in anchovy or chicken broth. Solo-diner friendly.",
        price: "₩8,000-11,000",
      },
      {
        en: "Bibimbap",
        local: "비빔밥",
        roman: "bibimbap",
        what: "Rice with vegetables, egg and gochujang, mixed thoroughly at the table. The stone-pot version (돌솥) crisps the bottom.",
        price: "₩9,000-14,000",
      },
      {
        en: "Blood sausage",
        local: "순대",
        roman: "sundae",
        what: "Noodle-and-blood sausage, usually from a market stall with a salt-and-pepper dip. Better than it sounds.",
        price: "₩5,000-8,000",
      },
      {
        en: "Rice cakes in chili sauce",
        local: "떡볶이",
        roman: "tteokbokki",
        what: "Chewy rice cylinders in sweet-hot gochujang sauce. The default Korean street snack.",
        price: "₩4,000-7,000",
      },
      {
        en: "Rolled rice",
        local: "김밥",
        roman: "gimbap",
        what: "Seaweed rice roll, sold everywhere, eaten any time. The cheapest reliable meal in Korea and fine for one person.",
        price: "₩3,500-6,000",
      },
      {
        en: "Rice wine",
        local: "막걸리",
        roman: "makgeolli",
        what: "Cloudy, lightly fizzy, low-alcohol rice wine. Traditionally drunk after hiking with a savory pancake.",
        price: "₩5,000-9,000",
        mustTry: true,
      },
    ],
    ordering: [
      {
        title: "Call the server, out loud",
        detail:
          "Say 저기요 (jeogiyo) clearly across the room, or press the table call button if there is one. Waiting quietly to be noticed does not work and is not expected.",
      },
      {
        title: "Two-person minimums are real",
        detail:
          "Grilled meat, stews and many specialty dishes require two orders. Some restaurants will refuse a solo diner outright. Look for counter seating or 혼밥 signage if eating alone.",
      },
      {
        title: "Banchan is free and refillable",
        detail: "The six to ten little dishes are included. Ask for more of any of them at no charge. Do not take them home.",
      },
      {
        title: "Pay at the counter on the way out",
        detail:
          "You are rarely brought a bill at the table. Take the slip to the register by the door. Splitting is uncommon but increasingly accepted.",
      },
      {
        title: "Drinking has rules",
        detail:
          "Pour for others, never yourself. Hold your glass with two hands when someone older pours for you. Turning away slightly when drinking in front of elders is the traditional courtesy.",
      },
      {
        title: "Use Naver, not Google",
        detail:
          "Naver Map carries the real reviews, hours and menus. Google's Korean restaurant data is thin and often wrong about opening hours.",
      },
    ],
    vegetarian:
      "The hardest of the three. Fish sauce, anchovy stock and shrimp paste are in most kimchi and nearly all stews, so dishes that look vegetarian usually are not. Temple food (사찰음식) restaurants are the reliable option and are genuinely excellent. Say 저는 채식주의자예요 (jeoneun chaesikjuuija-yeyo). Expect to explain repeatedly.",
    drinks:
      "Soju is ubiquitous and cheap (₩4,000-6,000 a bottle at a restaurant). Makgeolli for hiking days. Korean craft beer has improved sharply. Café culture is enormous — Seoul has more coffee shops per capita than almost anywhere.",
    mealTimes:
      "Breakfast is not a major meal out. Lunch 12:00-13:00 and rigidly observed — office districts are packed. Dinner 18:00-21:00, then a second round (2차) of drinks. Late-night food is abundant and many places run 24 hours.",
    budget:
      "Gimbap or noodles: ₩5,000-9,000. Casual meal: ₩10,000-15,000. Korean BBQ dinner with drinks: ₩30,000-50,000 per person. Café coffee: ₩4,500-6,500, which is proportionally expensive.",
  },
];

export function foodFor(city: CityId): FoodProfile {
  const found = FOOD.find((f) => f.city === city);
  if (!found) throw new Error(`No food profile for ${city}`);
  return found;
}
