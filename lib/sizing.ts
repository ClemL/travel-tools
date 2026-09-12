import type { CityId } from "./cities";

/** Men's shoe sizes. Korea and Japan size in millimetres of foot length. */
export interface ShoeRow {
  us: number;
  mm: number;
  eu: number;
  uk: number;
}

export const MENS_SHOES: ShoeRow[] = [
  { us: 6.5, mm: 245, eu: 39.5, uk: 6 },
  { us: 7, mm: 250, eu: 40, uk: 6.5 },
  { us: 7.5, mm: 255, eu: 40.5, uk: 7 },
  { us: 8, mm: 260, eu: 41, uk: 7.5 },
  { us: 8.5, mm: 265, eu: 42, uk: 8 },
  { us: 9, mm: 270, eu: 42.5, uk: 8.5 },
  { us: 9.5, mm: 275, eu: 43, uk: 9 },
  { us: 10, mm: 280, eu: 44, uk: 9.5 },
  { us: 10.5, mm: 285, eu: 44.5, uk: 10 },
  { us: 11, mm: 290, eu: 45, uk: 10.5 },
  { us: 11.5, mm: 295, eu: 45.5, uk: 11 },
  { us: 12, mm: 300, eu: 46, uk: 11.5 },
];

export const WOMENS_SHOES: ShoeRow[] = [
  { us: 5, mm: 220, eu: 35, uk: 2.5 },
  { us: 5.5, mm: 225, eu: 35.5, uk: 3 },
  { us: 6, mm: 230, eu: 36, uk: 3.5 },
  { us: 6.5, mm: 235, eu: 37, uk: 4 },
  { us: 7, mm: 240, eu: 37.5, uk: 4.5 },
  { us: 7.5, mm: 245, eu: 38, uk: 5 },
  { us: 8, mm: 250, eu: 38.5, uk: 5.5 },
  { us: 8.5, mm: 255, eu: 39, uk: 6 },
  { us: 9, mm: 260, eu: 40, uk: 6.5 },
  { us: 9.5, mm: 265, eu: 40.5, uk: 7 },
  { us: 10, mm: 270, eu: 41, uk: 7.5 },
];

export interface ClothingRow {
  us: string;
  /** Korean men's sizing is chest circumference in cm; women's uses both the old 44/55/66 scale and cm. */
  korea: string;
  /** Taiwan and Hong Kong mostly use letter sizes, sometimes with EU/UK numbers. */
  taiwanHk: string;
  chestCm?: string;
}

export const MENS_TOPS: ClothingRow[] = [
  { us: "XS", korea: "85 / 90", taiwanHk: "XS", chestCm: "86-89 cm" },
  { us: "S", korea: "95", taiwanHk: "S", chestCm: "90-94 cm" },
  { us: "M", korea: "100", taiwanHk: "M", chestCm: "95-99 cm" },
  { us: "L", korea: "105", taiwanHk: "L", chestCm: "100-104 cm" },
  { us: "XL", korea: "110", taiwanHk: "XL", chestCm: "105-109 cm" },
  { us: "XXL", korea: "115", taiwanHk: "XXL (rare)", chestCm: "110-114 cm" },
];

export const WOMENS_TOPS: ClothingRow[] = [
  { us: "US 0-2 / XS", korea: "44 (or 85)", taiwanHk: "XS" },
  { us: "US 4 / S", korea: "55 (or 90)", taiwanHk: "S" },
  { us: "US 6-8 / M", korea: "66 (or 95)", taiwanHk: "M" },
  { us: "US 10 / L", korea: "77 (or 100)", taiwanHk: "L" },
  { us: "US 12+ / XL", korea: "88 (or 105)", taiwanHk: "XL (limited)" },
];

export interface SizingNote {
  title: string;
  body: string;
  severity: "warn" | "info";
}

export const SIZING_NOTES: SizingNote[] = [
  {
    title: "Assume one to two sizes smaller than US",
    body:
      "East Asian sizing runs smaller than US sizing across the board, and cuts are narrower through the shoulder and chest. If you wear a US medium, buy a Korean or Taiwanese large and try it on. This is the single most common shopping mistake.",
    severity: "warn",
  },
  {
    title: "Korea sizes shoes in millimetres",
    body:
      "Korean shoe labels give the foot length in mm rather than a US or EU number. US men's 9 is 270 mm; US women's 7 is 240 mm. Each half size is 5 mm. Taiwan and Hong Kong mostly use US or EU numbers, with some UK.",
    severity: "info",
  },
  {
    title: "Large sizes are genuinely scarce",
    body:
      "Above roughly US men's 11 (290 mm) or US women's 10, shoe availability drops sharply outside international chains. The same applies to clothing above XL. If you need those sizes, shop at Uniqlo, Nike, Adidas or department store international floors rather than local boutiques.",
    severity: "warn",
  },
  {
    title: "Korean 'free size' means one size",
    body:
      "A large share of Korean women's clothing, especially in Hongdae, Myeongdong and online-first brands, is sold as 프리사이즈 (free size) — a single cut roughly equivalent to US 0-4. It is not adjustable and it is not universal.",
    severity: "info",
  },
  {
    title: "Trying things on is not always allowed",
    body:
      "Many small Korean boutiques and market stalls do not permit trying on clothing, particularly knitwear and anything white. Department stores and international brands always do. Ask 입어봐도 돼요? (ibeobwado dwaeyo — may I try it on?).",
    severity: "info",
  },
  {
    title: "Ring and bracelet sizing differs",
    body:
      "Korea uses its own ring size numbering (roughly 1-30) unrelated to US sizes. Have your ring measured in-store rather than converting.",
    severity: "info",
  },
];

export interface TaxRefund {
  city: CityId;
  vatRate: string;
  threshold: string;
  mechanism: string;
  where: string;
  catch: string;
  confidence?: "verify";
}

export const TAX_REFUNDS: TaxRefund[] = [
  {
    city: "taipei",
    vatRate: "5%",
    threshold: "NT$2,000 in one day at one participating store",
    mechanism:
      "Show your passport at purchase and ask for a Tax Refund Claim form. Refunds are claimed at the airport, or at in-town e-kiosks and authorised service counters for smaller amounts.",
    where: "Airport departure hall before check-in, or in-town TRS kiosks",
    catch:
      "The store must display a Tax Refund Shopping sign. The 5% rate means the refund is modest — worth claiming on electronics or a large purchase, rarely worth the queue otherwise.",
    confidence: "verify",
  },
  {
    city: "hongkong",
    vatRate: "None",
    threshold: "Not applicable",
    mechanism:
      "Hong Kong levies no VAT or sales tax at all. The price on the tag is the price you pay, and there is nothing to reclaim.",
    where: "Nowhere — there is no refund process",
    catch:
      "This is exactly why Hong Kong is a shopping destination for electronics, cosmetics and watches. Compare prices against home before assuming a bargain, though — duty-free is not automatically cheap.",
  },
  {
    city: "seoul",
    vatRate: "10%",
    threshold: "₩30,000 per transaction at a Tax Free store",
    mechanism:
      "Two routes. Immediate refund: many stores deduct the refund at the register when you show your passport, up to per-transaction and total trip limits. Otherwise you take the receipts to an airport kiosk.",
    where: "At the register, airport kiosks, or downtown refund machines",
    catch:
      "The immediate-refund route has a cap on total purchases per trip, after which you must use the airport process. Keep the goods accessible — customs can ask to see them before you check bags.",
    confidence: "verify",
  },
];

export interface ShoppingSpot {
  city: CityId;
  what: string;
  where: string;
  note: string;
}

export const SHOPPING: ShoppingSpot[] = [
  {
    city: "taipei",
    what: "Electronics and computer parts",
    where: "Guang Hua Digital Plaza and Syntrend Creative Park, Zhongzheng",
    note: "Six floors of components, peripherals and gaming hardware. Prices are competitive; bargaining is mild.",
  },
  {
    city: "taipei",
    what: "Bookshops and stationery",
    where: "Eslite Spectrum branches",
    note: "Eslite is a Taiwanese institution — part bookshop, part design retail. The Xinyi branch is the flagship.",
  },
  {
    city: "taipei",
    what: "Tea",
    where: "Dihua Street, Maokong",
    note: "Buy loose-leaf oolong at source. Vacuum-sealed packs travel fine and clear US customs without issue.",
  },
  {
    city: "hongkong",
    what: "Cameras and electronics",
    where: "Mong Kok, Sham Shui Po (Golden Computer Arcade), Wan Chai Computer Centre",
    note: "No sales tax and grey-market imports mean genuinely low prices. Confirm international warranty before buying.",
  },
  {
    city: "hongkong",
    what: "Tailoring",
    where: "Tsim Sha Tsui, Central",
    note: "Bespoke and made-to-measure at a fraction of Western prices, but allow at least three days and two fittings. Ignore street touts entirely.",
  },
  {
    city: "hongkong",
    what: "Markets",
    where: "Temple Street, Ladies' Market, Apliu Street",
    note: "Bargaining is expected — open at roughly half the asking price. Quality is variable; treat it as entertainment.",
  },
  {
    city: "seoul",
    what: "Cosmetics and skincare",
    where: "Myeongdong, Olive Young stores citywide",
    note:
      "The best in the world for range and price, and Olive Young is the one-stop option. Staff hand out free samples aggressively. Buy sunscreen here — Korean formulations are substantially better than US ones.",
  },
  {
    city: "seoul",
    what: "Fashion",
    where: "Dongdaemun wholesale markets, Garosu-gil, Seongsu",
    note: "Dongdaemun runs through the night and is wholesale-oriented. Seongsu is where the interesting independent brands are.",
  },
  {
    city: "seoul",
    what: "Eyewear",
    where: "Myeongdong, Namdaemun",
    note:
      "Prescription glasses are dramatically cheaper than in the US — often a same-day exam and lenses for well under ₩100,000. One of the genuinely great deals in Seoul.",
  },
];
