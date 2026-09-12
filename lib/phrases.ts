import type { CityId } from "./cities";

export interface Phrase {
  en: string;
  local: string;
  roman: string;
  note?: string;
}

export interface PhraseSet {
  city: CityId;
  language: string;
  script: string;
  englishLevel: string;
  primer: string;
  phrases: Phrase[];
}

export const PHRASES: PhraseSet[] = [
  {
    city: "taipei",
    language: "Mandarin Chinese",
    script: "Traditional characters",
    englishLevel:
      "Moderate. Signage and MRT announcements are bilingual; younger staff in Taipei often speak some English. Taiwanese people are notably willing to help a struggling visitor.",
    primer:
      "Taiwan uses traditional characters, not the simplified set used in mainland China. Romanization on street signs is inconsistent — the same road may appear as Zhongxiao, Chunghsiao or Jhongsiao. Match the characters, not the spelling.",
    phrases: [
      { en: "Hello", local: "你好", roman: "nǐ hǎo" },
      { en: "Thank you", local: "謝謝", roman: "xiè xie" },
      { en: "Excuse me / sorry", local: "不好意思", roman: "bù hǎo yì si", note: "The everyday all-purpose opener — use it to get attention, apologize, or squeeze past." },
      { en: "How much is it?", local: "多少錢？", roman: "duō shǎo qián" },
      { en: "The bill, please", local: "買單", roman: "mǎi dān" },
      { en: "I don't eat meat", local: "我不吃肉", roman: "wǒ bù chī ròu", note: "Taiwan has a strong Buddhist vegetarian tradition — look for the 素 character." },
      { en: "Not spicy, please", local: "不要辣", roman: "bú yào là" },
      { en: "Where is the bathroom?", local: "廁所在哪裡？", roman: "cè suǒ zài nǎ lǐ" },
      { en: "Can I pay by card?", local: "可以刷卡嗎？", roman: "kě yǐ shuā kǎ ma" },
      { en: "This one, please", local: "我要這個", roman: "wǒ yào zhè ge", note: "Point and say this. It resolves most night-market transactions." },
      { en: "Delicious", local: "好吃", roman: "hǎo chī" },
      { en: "I don't understand", local: "我聽不懂", roman: "wǒ tīng bù dǒng" },
      { en: "Please take me to this address", local: "請帶我去這個地址", roman: "qǐng dài wǒ qù zhè ge dì zhǐ", note: "Show the address in characters on your phone." },
      { en: "Goodbye", local: "再見", roman: "zài jiàn" },
    ],
  },
  {
    city: "hongkong",
    language: "Cantonese (English is co-official)",
    script: "Traditional characters",
    englishLevel:
      "High. English is an official language; signage, transport and most service staff operate in English. You can function entirely in English, but a few Cantonese words are received warmly.",
    primer:
      "Cantonese has six tones and Mandarin phrases will not be understood the same way. Older taxi drivers and market vendors may have limited English — have destinations written in Chinese characters.",
    phrases: [
      { en: "Hello", local: "你好", roman: "néih hóu" },
      { en: "Thank you (for a gift or favor)", local: "多謝", roman: "dō jeh", note: "Use for something given to you." },
      { en: "Thank you (for a service)", local: "唔該", roman: "m̀h gōi", note: "Also means 'excuse me' and 'please' — the single most useful word in Hong Kong." },
      { en: "The bill, please", local: "唔該，埋單", roman: "m̀h gōi, màaih dāan" },
      { en: "How much?", local: "幾多錢？", roman: "géi dō chín" },
      { en: "Sorry / excuse me (apology)", local: "對唔住", roman: "deui m̀h jyuh" },
      { en: "Where is the bathroom?", local: "洗手間喺邊度？", roman: "sái sáu gāan hái bīn douh" },
      { en: "One of these, please", local: "要一個呢個", roman: "yiu yāt go nī go" },
      { en: "Milk tea", local: "奶茶", roman: "náaih chàh", note: "Order at any cha chaan teng. 'Yuenyeung' (鴛鴦) is the coffee-tea hybrid." },
      { en: "Not too sweet", local: "少甜", roman: "síu tìm" },
      { en: "Delicious", local: "好食", roman: "hóu sihk" },
      { en: "I don't speak Cantonese", local: "我唔識講廣東話", roman: "ngóh m̀h sīk góng gwóng dūng wá" },
      { en: "Please stop here", local: "唔該，呢度落車", roman: "m̀h gōi, nī douh lohk chē", note: "For minibuses, where you must call out your stop." },
      { en: "Goodbye", local: "拜拜", roman: "bāai bāai" },
    ],
  },
  {
    city: "seoul",
    language: "Korean",
    script: "Hangul",
    englishLevel:
      "Lower than Hong Kong, comparable to or slightly below Taipei outside tourist districts. Subway and major signage is bilingual; ordinary restaurants frequently are not.",
    primer:
      "Hangul is a genuine alphabet and takes about an hour to learn to sound out. That hour pays for itself immediately — a large share of Korean menu items are phonetic loanwords, so once you can read, 'aiseukeurim' resolves to ice cream. This is the highest-leverage language investment of the three cities.",
    phrases: [
      { en: "Hello", local: "안녕하세요", roman: "annyeonghaseyo" },
      { en: "Thank you", local: "감사합니다", roman: "gamsahamnida" },
      { en: "Excuse me / over here", local: "저기요", roman: "jeogiyo", note: "This is how you call a server. Saying it loudly across a restaurant is normal, not rude." },
      { en: "Please give me this", local: "이거 주세요", roman: "igeo juseyo", note: "Point and say it. Handles almost all ordering." },
      { en: "How much is it?", local: "얼마예요?", roman: "eolmayeyo" },
      { en: "The bill, please", local: "계산해 주세요", roman: "gyesanhae juseyo", note: "You usually pay at the counter on the way out, not at the table." },
      { en: "Not spicy, please", local: "안 맵게 해주세요", roman: "an maepge haejuseyo" },
      { en: "Is it spicy?", local: "매워요?", roman: "maewoyo" },
      { en: "Where is the bathroom?", local: "화장실 어디예요?", roman: "hwajangsil eodiyeyo" },
      { en: "Can I pay by card?", local: "카드 돼요?", roman: "kadeu dwaeyo" },
      { en: "Delicious", local: "맛있어요", roman: "masisseoyo" },
      { en: "I don't speak Korean", local: "한국말 못해요", roman: "hangungmal mothaeyo" },
      { en: "One person / two people", local: "한 명 / 두 명", roman: "han myeong / du myeong", note: "Many restaurants ask this before seating you. Some refuse single diners for grilled meat." },
      { en: "Goodbye (to someone staying)", local: "안녕히 계세요", roman: "annyeonghi gyeseyo" },
    ],
  },
];

export function phrasesFor(city: CityId): PhraseSet {
  const found = PHRASES.find((p) => p.city === city);
  if (!found) throw new Error(`No phrase set for ${city}`);
  return found;
}
