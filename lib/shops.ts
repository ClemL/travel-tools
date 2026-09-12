import type { CityId } from "./cities";

export interface Shop {
  name: string;
  local?: string;
  area: string;
  what: string;
  price?: "Budget" | "Mid" | "Premium";
  /** Named businesses move and close; everything here should be checked on a map first. */
  confidence: "verify";
}

export interface ShopScene {
  city: CityId;
  rating: "World-class" | "Strong" | "Limited";
  summary: string;
  /** The one thing this city is genuinely the best place to buy. */
  signature: string;
  district: { name: string; why: string }[];
  shops: Shop[];
  buying: string[];
  searchTerm: string;
}

/* ------------------------------------------------------------------ */
/* Stationery                                                          */
/* ------------------------------------------------------------------ */

export const STATIONERY: ShopScene[] = [
  {
    city: "seoul",
    rating: "World-class",
    summary:
      "Korea treats stationery as a design category rather than an office supply, and Seoul is the best city of the three for it. The range runs from ₩1,000 character goods to meticulously curated ateliers where a single notebook costs ₩30,000.",
    signature:
      "Curated design stationery. Korean brands like MMMG and the Seongsu concept shops do paper goods with a restraint and material quality that is hard to find at the price anywhere else.",
    district: [
      {
        name: "Seongsu",
        why: "The design district. Concept shops and ateliers where stationery sits alongside homeware and the buying is genuinely curated.",
      },
      {
        name: "Hongdae & Yeonnam",
        why: "Student-priced character goods, illustration, stickers and planners. Cheap, dense and fun.",
      },
      {
        name: "Euljiro printing district",
        why:
          "Not a shopping street — a working printing and paper-supply quarter. Letterpress workshops, paper merchants and card printers. Go for the atmosphere and the paper suppliers, not the storefronts.",
      },
      {
        name: "Insadong",
        why: "Hanji — traditional Korean mulberry paper — plus brushes, ink and bound notebooks.",
      },
      {
        name: "Jongno (Kyobo flagship)",
        why: "The basement Hottracks at the Kyobo Book Centre flagship is the single biggest one-stop stationery floor in the city.",
      },
    ],
    shops: [
      {
        name: "Point of View",
        local: "포인트오브뷰",
        area: "Seongsu",
        what:
          "The most celebrated stationery shop in Seoul — part shop, part cabinet of curiosities, laid out like a writer's study. Imported and own-brand tools, beautifully merchandised. Go here first.",
        price: "Premium",
        confidence: "verify",
      },
      {
        name: "Object",
        local: "오브젝트",
        area: "Hongdae, Seongsu and others",
        what: "Multi-floor independent design store. Stationery, illustration, small-maker goods at accessible prices.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Millimeter Milligram (MMMG)",
        area: "Hannam, Seongsu",
        what: "Korean design brand known for notebooks, planners and bags with a restrained, functional aesthetic.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Kyobo Hottracks",
        local: "핫트랙스",
        area: "Jongno flagship, plus branches citywide",
        what: "Department-scale stationery attached to Korea's largest bookshop. The efficient option if you want range in one stop.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Artbox",
        local: "아트박스",
        area: "Everywhere, especially Hongdae and Myeongdong",
        what: "The ubiquitous cheap-and-cheerful chain. Character goods, stickers, pens, gift wrap. Good for souvenirs at ₩2,000 a piece.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "10x10",
        local: "텐바이텐",
        area: "Hongdae, Daehangno",
        what: "Design-led lifestyle chain with a strong stationery section and a lot of Korean independent brands.",
        price: "Mid",
        confidence: "verify",
      },
    ],
    buying: [
      "Korean gel pens and highlighters are excellent and a fraction of US prices. Buy a handful rather than one.",
      "Paper goods weigh little and survive luggage well — this is the most travel-efficient souvenir category of the trip.",
      "Hanji from Insadong is the distinctive buy: handmade mulberry paper, sold in sheets or as bound notebooks.",
      "Most shops take foreign cards. Artbox and the smaller Hongdae shops are the ones most likely to want cash.",
    ],
    searchTerm: "문구점 (stationery shop) · 문구 · on Naver Map",
  },
  {
    city: "taipei",
    rating: "Strong",
    summary:
      "Taipei has a quieter but genuinely good stationery culture, split between vast late-night discount stores and a handful of very serious independent shops. Taiwanese paper and letterpress work is excellent and underrated.",
    signature:
      "Independent, tool-focused shops. Taipei's best stationery stores are small, opinionated, and stock things chosen by someone who uses them — closer to a hardware store for writing than a gift shop.",
    district: [
      {
        name: "Da'an & Yongkang",
        why: "Where the serious independents are. Small shops, carefully chosen stock, often with a café attached.",
      },
      {
        name: "Dihua Street, Dadaocheng",
        why: "Paper, letterpress, seals and traditional printing in restored shophouses. The most atmospheric browsing in the city.",
      },
      {
        name: "Zhongshan",
        why: "Design shops and Japanese-influenced lifestyle retail. Eslite Spectrum branches anchor the area.",
      },
      {
        name: "Gongguan (near NTU)",
        why: "Student stationery — cheap, practical, high turnover.",
      },
    ],
    shops: [
      {
        name: "Tools to Liveby",
        local: "禮拜文房具",
        area: "Da'an",
        what:
          "Taipei's best-known stationery shop and a genuine destination. Imported European and Japanese tools alongside its own well-made scissors, pens and paper. Beautiful shop, knowledgeable staff.",
        price: "Premium",
        confidence: "verify",
      },
      {
        name: "Plain Stationery / Zhi Wu",
        local: "直物生活文具",
        area: "Da'an",
        what: "Small, quiet shop built around vintage and unadorned functional stationery. The antidote to character goods.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Jin Xing Fa",
        local: "金興發生活百貨",
        area: "Multiple branches, open late",
        what:
          "Cavernous discount life-goods stores with enormous stationery sections. Open until midnight, which makes them a genuinely useful stop after a night market.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "Guang Nan",
        local: "光南大批發",
        area: "Ximending and branches",
        what: "Wholesale-priced stationery, art supplies and media. Utilitarian, cheap and very well stocked.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "Eslite Spectrum",
        local: "誠品生活",
        area: "Xinyi flagship, Songyan and others",
        what:
          "The stationery and design floors of Taiwan's flagship bookstore chain. Reliable, broad, and the Songyan branch sits inside the Songshan Cultural Park if you are combining stops.",
        price: "Mid",
        confidence: "verify",
      },
    ],
    buying: [
      "Taiwan produces good paper and excellent letterpress work. Look for locally printed notebooks rather than imported Japanese brands you can buy at home.",
      "Carved name seals (印章) are a distinctive Taipei buy — Dihua Street and the older districts have shops that will cut one while you wait.",
      "The discount chains are open until midnight, so stationery is a viable rainy-evening activity.",
      "Small independents are frequently cash-only.",
    ],
    searchTerm: "文具店 (stationery shop) · 文具 · on Google Maps",
  },
  {
    city: "hongkong",
    rating: "Limited",
    summary:
      "The weakest of the three for stationery as a browsing pleasure, but strong for practical and wholesale buying. Hong Kong's interest here is the working supply streets of Sham Shui Po rather than curated shops.",
    signature:
      "Wholesale craft and paper supply. Sham Shui Po's specialist streets sell ribbon, beads, buttons, leather and paper by the roll at trade prices — more interesting to a maker than to a collector.",
    district: [
      {
        name: "Sham Shui Po",
        why:
          "The supply quarter. Yu Chau Street and Ki Lung Street for ribbon, beads and buttons; Apliu Street for electronics; nearby streets for paper and packaging.",
      },
      {
        name: "Causeway Bay & Tsim Sha Tsui",
        why: "Eslite, Log-On and City'super stationery sections — the curated end, largely imported Japanese and Korean stock.",
      },
      {
        name: "Sheung Wan",
        why: "Seal and chop carvers, calligraphy suppliers, and a few remaining traditional paper merchants.",
      },
    ],
    shops: [
      {
        name: "Eslite",
        area: "Causeway Bay, Tsim Sha Tsui",
        what: "The Taiwanese chain's Hong Kong branches. The most reliable curated stationery in the city.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Log-On",
        area: "Branches citywide",
        what: "Lifestyle chain under the City'super umbrella, with a decent imported stationery section.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Sham Shui Po supply streets",
        local: "深水埗",
        area: "Yu Chau Street, Ki Lung Street",
        what:
          "Blocks of specialist wholesalers — one street for ribbon, another for beads, another for buttons and trim. Prices are wholesale and quantities can be small if you ask.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "Seal and chop carvers",
        area: "Sheung Wan, Man Wa Lane",
        what:
          "Man Wa Lane is the traditional street of seal carvers. A carved stone chop with your name in Chinese takes a day or two and is the most characterful thing you can buy in this category.",
        price: "Mid",
        confidence: "verify",
      },
    ],
    buying: [
      "Hong Kong has no sales tax, so imported Japanese stationery is often cheaper here than in Japan's own duty-free.",
      "Man Wa Lane seal carving is the standout buy — bring the characters you want, allow a day or two.",
      "Sham Shui Po is cash-first. Bring small notes.",
      "If stationery is a priority on this trip, weight your time toward Seoul and Taipei instead.",
    ],
    searchTerm: "stationery shop · 文具 · on Google Maps",
  },
];

/* ------------------------------------------------------------------ */
/* Artisanal and craft                                                 */
/* ------------------------------------------------------------------ */

export const ARTISAN: ShopScene[] = [
  {
    city: "seoul",
    rating: "World-class",
    summary:
      "Korea has an unusually intact craft tradition backed by real state support, plus a modern maker scene concentrated in two former industrial districts. The split is clean: Insadong and Bukchon for traditional work, Seongsu and Mullae for contemporary.",
    signature:
      "Ceramics and leather. Korean ceramics run from Joseon-era white porcelain to contemporary studio work, and Seongsu's leather ateliers are the remnant of Seoul's shoe manufacturing district — custom shoes and bags made on site.",
    district: [
      {
        name: "Insadong",
        why:
          "The traditional craft quarter. Hanji paper, celadon and white porcelain, brushes, tea ware, maedeup knotwork. Ssamziegil, the spiral craft mall, concentrates dozens of small makers in one building.",
      },
      {
        name: "Bukchon",
        why:
          "Working ateliers among the hanok — embroidery, natural dyeing, metalwork, traditional knots. Several offer short workshops.",
      },
      {
        name: "Seongsu",
        why:
          "The former shoe and leather manufacturing district. Custom leather ateliers, small-batch homeware, contemporary ceramics. This is where the interesting modern work is.",
      },
      {
        name: "Mullae-dong",
        why:
          "A steel-fabrication quarter that artists moved into. Metalwork studios and galleries interleaved with working machine shops. Gritty and genuinely unusual.",
      },
      {
        name: "Ikseon-dong",
        why: "Converted hanok alleys with small independent makers, jewellery and homeware alongside the cafés.",
      },
    ],
    shops: [
      {
        name: "Korea Craft & Design Foundation shop",
        local: "공예디자인문화진흥원",
        area: "Insadong",
        what:
          "State-backed gallery and shop showing vetted contemporary Korean craft. The reliable starting point — everything is genuine, well made and clearly labelled, which is not true of the tourist stalls a block away.",
        price: "Premium",
        confidence: "verify",
      },
      {
        name: "Ssamziegil",
        local: "쌈지길",
        area: "Insadong",
        what:
          "A spiral-ramp building packed with small craft studios and shops. Quality is mixed but the density is unmatched and it is an easy hour.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Seongsu leather ateliers",
        area: "Seongsu",
        what:
          "Custom bag and shoe makers working in the old manufacturing buildings. Many take commissions, though a made-to-order pair needs more lead time than a short trip allows. Ready-made goods are excellent.",
        price: "Premium",
        confidence: "verify",
      },
      {
        name: "Icheon ceramics village",
        local: "이천 도자기마을",
        area: "About an hour southeast of Seoul",
        what:
          "Korea's ceramics centre — dozens of working kilns and studios, plus a ceramics museum. A full day trip, and the right move if pottery is the thing you actually care about.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Gwangjang Market fabric floor",
        area: "Jongno",
        what:
          "Above the famous food alley is a whole floor of hanbok fabric, silk and vintage textiles. Almost no tourists go upstairs.",
        price: "Budget",
        confidence: "verify",
      },
    ],
    buying: [
      "Najeonchilgi — mother-of-pearl lacquerware — is the most distinctive Korean craft and the hardest to find well made. Buy it through the Craft & Design Foundation rather than a tourist stall.",
      "Onggi, the traditional fermentation pottery, is beautiful and completely impractical to fly home. Buy small.",
      "Many Bukchon ateliers run 1–2 hour workshops in English; book a day or two ahead.",
      "Insadong's main drag is heavily touristed and much of the cheap stock is imported. Turn into the side alleys.",
    ],
    searchTerm: "공예 (craft) · 공방 (atelier/workshop) · on Naver Map",
  },
  {
    city: "taipei",
    rating: "Strong",
    summary:
      "Taipei's craft scene is built on a revival of old-trade shops rather than a designed craft district. Dihua Street is the spine of it — century-old family businesses making bamboo goods, lanterns and dyed cloth, now sitting next to young design studios.",
    signature:
      "Bamboo, ceramics and indigo. Taiwan's bamboo craft is still a working trade rather than a heritage exhibit, and Yingge is a genuine ceramics town rather than a tourist recreation.",
    district: [
      {
        name: "Dihua Street, Dadaocheng",
        why:
          "The best craft browsing in Taipei. Restored shophouses holding bamboo and wooden household goods, hand-painted lanterns, block-printed textiles and tea ware, mixed with new design studios.",
      },
      {
        name: "Yingge",
        why:
          "Taiwan's ceramics town, about 40 minutes by train. A whole street of kilns, studios and shops, plus a serious ceramics museum. A half to full day.",
      },
      {
        name: "Songshan & Huashan creative parks",
        why: "Converted factory complexes hosting design retail, maker markets and rotating craft exhibitions. Good rainy-day options.",
      },
      {
        name: "Sanxia",
        why: "Indigo dyeing (藍染) town southwest of Taipei, with workshops where you can dye a piece yourself.",
      },
    ],
    shops: [
      {
        name: "Gao Jian Wooden Barrel Shop",
        local: "高建桶店",
        area: "Dihua Street",
        what:
          "A long-running family shop selling bamboo steamers, wooden buckets, brushes and woven baskets. A working trade shop, not a boutique — and the prices reflect that.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "Lin Feng Yi",
        local: "林豐益商行",
        area: "Dihua Street",
        what: "Bamboo and rattan basketry, steamers and household goods. Stacked floor to ceiling.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "inBlooom",
        local: "印花樂",
        area: "Dihua Street and branches",
        what:
          "Taiwanese textile studio doing block-printed fabric with motifs drawn from local birds, tiles and street patterns. Bags, cloth and homeware. One of the most successful modern Taiwanese craft brands.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Lao Mian Cheng Lantern Shop",
        local: "老綿成燈籠店",
        area: "Dihua Street",
        what: "Hand-painted traditional lanterns, made on site. They will paint characters to order.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Yingge Old Street",
        local: "鶯歌老街",
        area: "Yingge, ~40 min by TRA train",
        what:
          "Ceramics studios and shops along a pedestrianised street, with working kilns behind. Quality spans tourist mugs to serious studio work — go a few doors past the station end for the better shops.",
        price: "Mid",
        confidence: "verify",
      },
    ],
    buying: [
      "Bamboo steamers and woven baskets from Dihua Street are cheap, light, genuinely useful and unmistakably Taiwanese.",
      "Tea ware is the natural pairing with loose-leaf tea from the same street — buy them together.",
      "Yingge ceramics are well priced but heavy. Ask shops about packing; many will wrap for flying.",
      "Many Dihua Street shops close by 18:00 and some close Mondays. It is a daytime district.",
    ],
    searchTerm: "手工藝 (handicraft) · 工作室 (studio) · on Google Maps",
  },
  {
    city: "hongkong",
    rating: "Strong",
    summary:
      "Hong Kong's craft story is two things at once: a state-of-the-art design incubator in PMQ, and a handful of genuinely endangered traditional trades still operating out of tenement workshops. The second is the more interesting and will not be there forever.",
    signature:
      "Dying trades. Hand-painted porcelain, carved mahjong tiles, bamboo steamers and hand-carved seals are all still made in Hong Kong by a shrinking number of craftspeople. This is the last city of the three where you can watch these done by the people who always did them.",
    district: [
      {
        name: "PMQ, Central",
        why:
          "The former Police Married Quarters converted into a design incubator — roughly a hundred studios across two blocks, most run by the maker. The single most efficient craft stop in Hong Kong.",
      },
      {
        name: "Sheung Wan & Man Wa Lane",
        why: "Seal carvers, calligraphy suppliers, antiques and traditional paper along and around Hollywood Road.",
      },
      {
        name: "Kowloon City & Hung Hom",
        why: "Workshop districts where several of the remaining traditional trades operate, largely unmarked.",
      },
      {
        name: "Tai Kwun, Central",
        why: "The restored former prison and police compound — galleries, exhibitions and a rotating craft retail presence. Free to enter.",
      },
    ],
    shops: [
      {
        name: "PMQ",
        area: "Aberdeen Street, Central",
        what:
          "Two blocks of independent design and craft studios — ceramics, leather, jewellery, textiles, print. Many makers work on site. Start here if you only have one stop.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Yuet Tung China Works",
        local: "粵東磁廠",
        area: "Kowloon Bay",
        what:
          "The last hand-painted porcelain factory in Hong Kong, operating since 1928. Guangcai enamel ware painted by hand in a working warehouse. Genuinely remarkable, and visiting requires calling ahead.",
        price: "Mid",
        confidence: "verify",
      },
      {
        name: "Man Wa Lane seal carvers",
        local: "文華里",
        area: "Sheung Wan",
        what:
          "A narrow lane of stalls carving stone and wood name seals. Bring the name you want; most will render it into Chinese characters and cut it within a day.",
        price: "Budget",
        confidence: "verify",
      },
      {
        name: "Hand-carved mahjong tile makers",
        area: "Jordan, Hung Hom",
        what:
          "A handful of craftspeople still carve and paint mahjong tiles by hand — a trade down to single figures of practitioners. Worth seeking out given your board game interest, though a full hand-carved set is a serious purchase.",
        price: "Premium",
        confidence: "verify",
      },
      {
        name: "Bamboo steamer workshops",
        area: "Sai Ying Pun, Sheung Wan",
        what: "A few remaining makers producing steamers by hand for the restaurant trade. Cheap, practical and disappearing.",
        price: "Budget",
        confidence: "verify",
      },
    ],
    buying: [
      "PMQ is the low-effort option and the traditional workshops are the high-reward one. Do PMQ on a rainy afternoon and one traditional trade as a deliberate errand.",
      "Several traditional workshops are unmarked, keep irregular hours and expect a phone call first. Have your hotel call ahead in Cantonese.",
      "No sales tax, so what you are quoted is what you pay and there is no refund process to bother with.",
      "Hand-carved mahjong sets are heavy and expensive. If you want one, decide before you go rather than on the day.",
    ],
    searchTerm: "handicraft · 手工藝 · workshop · on Google Maps",
  },
];

export function sceneFor(set: ShopScene[], city: CityId): ShopScene {
  const found = set.find((s) => s.city === city);
  if (!found) throw new Error(`No shop scene for ${city}`);
  return found;
}
