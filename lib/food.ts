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

/** In season during the September travel window specifically. */
export interface SeasonalItem {
  name: string;
  local: string;
  what: string;
  window: string;
}

export interface DrinkItem {
  name: string;
  local?: string;
  what: string;
  price: string;
  where: string;
}

export interface DishLocation {
  dish: string;
  where: string;
  note: string;
}

export interface FoodProfile {
  city: CityId;
  summary: string;
  /** The one structural thing about eating here that visitors get wrong. */
  keyMechanic: string;
  dishes: Dish[];
  seasonal: SeasonalItem[];
  drinks: DrinkItem[];
  whereToEat: DishLocation[];
  ordering: OrderingRule[];
  vegetarian: string;
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
      {
        en: "Fried chicken cutlet",
        local: "雞排",
        roman: "jī pái",
        what:
          "A chicken breast pounded flat to roughly the size of your face, battered, fried and dusted with pepper and chilli. The definitive night-market walking food.",
        price: "NT$70-90",
        mustTry: true,
      },
      {
        en: "Gua bao",
        local: "刈包",
        roman: "guà bāo",
        what:
          "Braised pork belly, pickled mustard greens, crushed peanut and coriander in a folded steamed bun. The Taiwanese original that the West rediscovered a decade ago.",
        price: "NT$55-80",
        mustTry: true,
      },
      {
        en: "Pick-your-own braised snacks",
        local: "滷味",
        roman: "lǔ wèi",
        what:
          "Take the tongs and basket, choose from trays of tofu, greens, noodles, eggs and offal, hand it over and it comes back chopped and dressed. Hot or cold versions; the cold one is a summer staple.",
        price: "NT$60-150",
      },
      {
        en: "Tofu pudding",
        local: "豆花",
        roman: "dòu huā",
        what:
          "Silken tofu in sweet ginger or sugar syrup with toppings — peanuts, taro balls, red bean. Served hot or over ice. The everyday Taiwanese dessert.",
        price: "NT$50-70",
        mustTry: true,
      },
      {
        en: "Danzai noodles",
        local: "擔仔麵",
        roman: "dàn zǎi miàn",
        what:
          "A deliberately small bowl of noodles in shrimp-and-pork broth topped with minced pork and a prawn. Meant as one item among several, not a meal.",
        price: "NT$50-80",
      },
      {
        en: "Hot pot for one",
        local: "小火鍋",
        roman: "xiǎo huǒ guō",
        what:
          "Individual induction burners with your own pot — no sharing, no minimum party size. A useful solo-dining option and a good air-conditioned lunch.",
        price: "NT$200-400",
      },
      {
        en: "Turnip cake",
        local: "蘿蔔糕",
        roman: "luó bo gāo",
        what: "Griddled radish cake with a crisp crust, usually eaten at breakfast with soy paste and chilli.",
        price: "NT$35-60",
      },    ],
    seasonal: [
      {
        name: "Mooncakes and pomelo",
        local: "月餅 / 柚子",
        what:
          "Mid-Autumn Festival brings mooncakes into every bakery and pomelo into every fruit stall. Taiwanese mooncakes lean toward flaky pastry with mung bean or taro rather than the dense Cantonese lotus-seed style.",
        window: "Two weeks either side of 25 September",
      },
      {
        name: "Barbecue, everywhere",
        local: "中秋烤肉",
        what:
          "Taiwan barbecues for Mid-Autumn — a tradition that started as a marketing campaign and became universal. Expect smoke on every pavement, riverbank and rooftop on the night itself.",
        window: "25-27 September",
      },
      {
        name: "Late mango, early persimmon",
        local: "芒果 / 柿子",
        what:
          "The tail of mango season overlaps the start of persimmon. Mango shaved ice is still on menus in early September and disappears by October.",
        window: "Through mid-September",
      },
    ],
    drinks: [
      {
        name: "Bubble tea, ordered properly",
        local: "珍珠奶茶",
        what:
          "Specify sweetness and ice: 半糖少冰 (half sugar, less ice) is the standard local order. Ordering full sugar marks you instantly.",
        price: "NT$50-80",
        where: "Chains on every corner; 50嵐, Chun Shui Tang, Tiger Sugar",
      },
      {
        name: "Oolong tea",
        local: "烏龍茶",
        what:
          "Taiwan's high-mountain oolong is world-class. A tea house will brew gongfu style across many short steepings — an hour well spent in the Maokong hills.",
        price: "NT$300-800 per session",
        where: "Maokong tea houses, Dihua Street merchants",
      },
      {
        name: "Convenience store coffee",
        local: "超商咖啡",
        what: "City Café at 7-Eleven is genuinely drinkable and costs a fraction of a café. Buy-one-get-one promotions are constant.",
        price: "NT$45-65",
        where: "Every 7-Eleven and FamilyMart",
      },
      {
        name: "Craft beer",
        local: "精釀啤酒",
        what:
          "A small but serious scene — Taiwan Head, Redpoint, Zhangmen. Convenience-store beer is legal to drink in most public places, which makes riverside evenings easy.",
        price: "NT$150-280",
        where: "Da'an, Zhongshan taprooms",
      },
      {
        name: "Winter melon tea",
        local: "冬瓜茶",
        what: "Non-caffeinated, caramel-sweet, served over ice. The traditional answer to September humidity.",
        price: "NT$30-50",
        where: "Traditional drink stalls, night markets",
      },
    ],
    whereToEat: [
      {
        dish: "Beef noodle soup",
        where: "Yongkang Street and the Da'an backstreets",
        note: "The city's densest cluster of specialists. Taipei runs an annual beef noodle competition — winners post the certificate in the window.",
      },
      {
        dish: "Night market food",
        where: "Raohe over Shilin",
        note:
          "Shilin is bigger and better known; Raohe is a single covered street, older, and has better food per square metre. Ningxia is the local favourite of the three.",
      },
      {
        dish: "Breakfast",
        where: "Any 豆漿店 before 10:00",
        note: "Soy milk shops are a whole category and they are gone by late morning. This is the meal most visitors miss entirely.",
      },
      {
        dish: "Xiao long bao",
        where: "Din Tai Fung, or any neighbourhood shop",
        note:
          "Din Tai Fung began in Taipei and genuinely deserves its reputation, but a local shop charges a third of the price for something close.",
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
      {
        en: "Beef brisket noodles",
        local: "牛腩麵",
        roman: "ngàuh láam mihn",
        what:
          "Slow-braised brisket in a clear or curried broth with noodles. Specialist shops do nothing else and queue out the door at lunch.",
        price: "HK$50-80",
        mustTry: true,
      },
      {
        en: "Rice noodle rolls",
        local: "腸粉",
        roman: "chéung fán",
        what:
          "Sheets of steamed rice noodle rolled around prawn, beef or nothing at all, doused in sweet soy and sesame. A breakfast staple and a dim sum fixture.",
        price: "HK$25-45",
        mustTry: true,
      },
      {
        en: "Congee",
        local: "粥",
        roman: "jūk",
        what:
          "Rice porridge simmered to collapse, with century egg and pork, fish, or beef. Eaten at breakfast and late at night, and the thing to order when the humidity has beaten you.",
        price: "HK$35-60",
      },
      {
        en: "Typhoon shelter crab",
        local: "避風塘炒蟹",
        roman: "beih fūng tòhng cháau háaih",
        what:
          "Crab buried under a mountain of fried garlic, chilli and black bean. Named for the boat kitchens that once sheltered from storms in the harbour — which makes it the September dish.",
        price: "HK$400-700",
        mustTry: true,
      },
      {
        en: "Dessert soup",
        local: "糖水",
        roman: "tòhng séui",
        what:
          "Sweet soups — black sesame, walnut, red bean, or mango pomelo sago (楊枝甘露). Dedicated tong sui shops open late and are where a Hong Kong evening ends.",
        price: "HK$30-55",
        mustTry: true,
      },
      {
        en: "Hong Kong French toast",
        local: "西多士",
        roman: "sāi dō sí",
        what:
          "Deep-fried, peanut-butter-filled, topped with butter and condensed milk. Indefensible and excellent. Cha chaan teng afternoon tea set.",
        price: "HK$25-40",
      },
      {
        en: "Claypot rice",
        local: "煲仔飯",
        roman: "bōu jái faahn",
        what:
          "Cooked to order over a flame so the bottom layer crisps. Traditionally a cold-weather dish but available year-round on Temple Street. Allow 25 minutes.",
        price: "HK$60-120",
      },    ],
    seasonal: [
      {
        name: "Mooncakes",
        local: "月餅",
        what:
          "Cantonese mooncakes — dense lotus seed paste with salted egg yolk — plus the local snowskin variety. Hotel bakeries compete on packaging and the boxes become a gifting arms race.",
        window: "Through 26 September",
      },
      {
        name: "Snake soup",
        local: "蛇羹",
        what:
          "A genuinely traditional autumn dish, thickened with shredded snake, chicken and wood ear. Specialist shops open as the weather turns; a handful remain in Sham Shui Po and Sheung Wan.",
        window: "From late September through winter",
      },
      {
        name: "Hairy crab",
        local: "大閘蟹",
        what:
          "The season starts as September ends and runs through November. If your trip is late in the month you may catch the first of it.",
        window: "Very late September onward",
      },
    ],
    drinks: [
      {
        name: "Silk stocking milk tea",
        local: "絲襪奶茶",
        what:
          "Strong black tea strained repeatedly through fabric, cut with evaporated milk. Bitter, tannic and nothing like a British builder's tea. The national drink.",
        price: "HK$20-30",
        where: "Any cha chaan teng",
      },
      {
        name: "Yuenyeung",
        local: "鴛鴦",
        what: "Three parts milk tea to seven parts coffee, roughly. Invented here, and better than the description suggests.",
        price: "HK$22-32",
        where: "Any cha chaan teng",
      },
      {
        name: "Herbal tea",
        local: "涼茶",
        what:
          "Bitter medicinal brews sold from shopfront urns and drunk standing at the counter. 廿四味 is the punishing one. Locally held to counter the humidity.",
        price: "HK$10-20",
        where: "Herbal tea shops, Sheung Wan and Kowloon",
      },
      {
        name: "Cocktails",
        local: "",
        what:
          "Central and Soho hold several bars that rank on world lists. Prices match — expect HK$130-190 a drink and a 10% service charge.",
        price: "HK$130-190",
        where: "Central, Soho, Sheung Wan",
      },
      {
        name: "Craft beer",
        local: "",
        what: "Young Master, Gweilo and Heroes lead a scene concentrated in Kennedy Town, Sai Ying Pun and Sheung Wan.",
        price: "HK$60-95",
        where: "Kennedy Town, Sai Ying Pun",
      },
    ],
    whereToEat: [
      {
        dish: "Dim sum",
        where: "Old-school halls in Sham Shui Po and Wan Chai",
        note:
          "Michelin-listed places take bookings and queues; a neighbourhood hall at 08:00 on a weekday is emptier, cheaper and often just as good.",
      },
      {
        dish: "Roast goose",
        where: "Sham Tseng village, or a specialist in town",
        note:
          "Sham Tseng in the New Territories is the traditional destination and worth the trip if you are serious. Otherwise the roast meat shops with queues are the signal.",
      },
      {
        dish: "Wok hei stir fry",
        where: "Dai pai dong, Central and Sham Shui Po",
        note:
          "The handful of surviving open-air cooked-food stalls produce a smoky char no restaurant kitchen matches. Temple Street and Stanley Street are the reliable spots.",
      },
      {
        dish: "Late night",
        where: "Temple Street, Mong Kok",
        note: "Claypot rice, seafood and beer until 02:00. The one part of Hong Kong that is genuinely nocturnal.",
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
      {
        en: "Soft tofu stew",
        local: "순두부찌개",
        roman: "sundubu jjigae",
        what:
          "Silken tofu in a bubbling chilli broth with an egg cracked in at the table. Arrives volcanic. One of the few stews reliably served to a single diner.",
        price: "₩9,000-12,000",
        mustTry: true,
      },
      {
        en: "Ginseng chicken soup",
        local: "삼계탕",
        roman: "samgyetang",
        what:
          "A whole young chicken stuffed with rice, ginseng and jujube in a clear broth. Eaten in the hottest weeks on the principle of fighting heat with heat.",
        price: "₩16,000-22,000",
        mustTry: true,
      },
      {
        en: "Black bean noodles",
        local: "짜장면",
        roman: "jjajangmyeon",
        what:
          "Wheat noodles under a dark, sweet fermented bean sauce with pork and onion. Korean-Chinese, ubiquitous, and the default delivery order nationwide.",
        price: "₩7,000-9,000",
      },
      {
        en: "Boiled pork wraps",
        local: "보쌈",
        roman: "bossam",
        what:
          "Poached pork belly sliced thin, wrapped in cabbage leaves with salted shrimp and fresh kimchi. Gentler than grilled meat and usually for two or more.",
        price: "₩30,000-45,000 to share",
      },
      {
        en: "Pig trotters",
        local: "족발",
        roman: "jokbal",
        what: "Braised in soy and spices, sliced, served cold-ish with wraps. A late-night drinking dish; better than it sounds.",
        price: "₩30,000-45,000 to share",
      },
      {
        en: "Hangover soup",
        local: "해장국",
        roman: "haejangguk",
        what:
          "A whole restaurant category dedicated to the morning after — usually ox bone or cabbage broth. Open at 06:00 near any nightlife district.",
        price: "₩9,000-13,000",
      },
      {
        en: "Sweet filled pancake",
        local: "호떡",
        roman: "hotteok",
        what:
          "Griddled dough filled with molten brown sugar, cinnamon and nuts. Street carts reappear as the weather turns — late September is when they come back.",
        price: "₩2,000-3,000",
        mustTry: true,
      },
      {
        en: "Dumplings",
        local: "만두",
        roman: "mandu",
        what: "Steamed or fried, pork and kimchi or vegetable. Cheap, everywhere, and fine for one.",
        price: "₩6,000-9,000",
      },    ],
    seasonal: [
      {
        name: "Chuseok food",
        local: "송편 / 전",
        what:
          "Songpyeon — half-moon rice cakes stuffed with sesame or bean — plus stacks of jeon (savoury pancakes). Department store food halls fill with gift sets; family restaurants close.",
        window: "24-28 September",
      },
      {
        name: "Autumn fruit",
        local: "감 / 밤 / 배",
        what:
          "Persimmon, chestnut and Korean pear come in with the season and appear on every market stall. Korean pears are enormous, crisp and a standard Chuseok gift.",
        window: "From mid-September",
      },
      {
        name: "Street carts return",
        local: "포장마차",
        what:
          "Hotteok, bungeoppang and roasted chestnut carts reappear as the evenings cool. Early September is too warm; by the last week of the month they are back.",
        window: "Late September onward",
      },
      {
        name: "Makgeolli and pajeon after a hike",
        local: "막걸리 / 파전",
        what:
          "Autumn hiking season opens on Bukhansan, and the trailhead restaurants serving rice wine and scallion pancake to descending hikers are part of the ritual.",
        window: "From late September",
      },
    ],
    drinks: [
      {
        name: "Soju",
        local: "소주",
        what:
          "Cheap, clear, around 16-17% and drunk in shots alongside food rather than on its own. Never pour your own; hold the glass with two hands when someone older pours.",
        price: "₩4,000-6,000 a bottle in a restaurant",
        where: "Everywhere food is served",
      },
      {
        name: "Makgeolli",
        local: "막걸리",
        what:
          "Cloudy unfiltered rice wine, lightly fizzy, 6-8%. Served in a kettle and poured into bowls. Traditional pairing is a savoury pancake.",
        price: "₩5,000-9,000",
        where: "Traditional bars, trailhead restaurants",
      },
      {
        name: "Korean coffee culture",
        local: "카페",
        what:
          "Seoul has one of the highest café densities on earth and they are destinations rather than pit stops — enormous, designed, and full at midnight. Seongsu and Yeonnam are the epicentres.",
        price: "₩4,500-7,000",
        where: "Seongsu, Yeonnam, Ikseon-dong",
      },
      {
        name: "Beer and fried chicken",
        local: "치맥",
        what: "The combination is a national institution. Han River parks let you order delivery straight to a picnic mat.",
        price: "₩25,000-35,000 for two",
        where: "Han River parks, anywhere",
      },
      {
        name: "Traditional tea",
        local: "전통차",
        what:
          "Jujube, citron, omija and ginger teas served in hanok tea houses around Insadong and Bukchon. A genuinely pleasant break from the coffee arms race.",
        price: "₩7,000-12,000",
        where: "Insadong, Bukchon hanok tea houses",
      },
    ],
    whereToEat: [
      {
        dish: "Street food",
        where: "Gwangjang Market, Jongno",
        note:
          "The best single introduction to Korean street food in the city. Go hungry, sit at a stall, point. Bindaetteok (mung bean pancake) and mayak gimbap are the signatures.",
      },
      {
        dish: "Korean BBQ",
        where: "Mapo or Jongno backstreets, not a tourist strip",
        note:
          "Look for extraction ducts over every table and a queue of office workers. Two-person minimums are normal; solo diners should aim elsewhere.",
      },
      {
        dish: "Late-night drinking food",
        where: "Euljiro",
        note:
          "Bars hidden above printing workshops, reached by unmarked stairwells. The most distinctive night out in Seoul and almost entirely local.",
      },
      {
        dish: "Temple food",
        where: "Insadong",
        note:
          "The reliable vegetarian option — Buddhist temple cuisine, no meat, no fish sauce, no onion or garlic. Book ahead at the better-known places.",
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
