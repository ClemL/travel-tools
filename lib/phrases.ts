import type { CityId } from "./cities";

export type PhraseCategory =
  | "Basics"
  | "Ordering"
  | "Getting around"
  | "Shopping"
  | "Numbers"
  | "Emergency";

export const PHRASE_CATEGORIES: PhraseCategory[] = [
  "Basics",
  "Ordering",
  "Getting around",
  "Shopping",
  "Numbers",
  "Emergency",
];

export interface Phrase {
  en: string;
  local: string;
  roman: string;
  note?: string;
  category: PhraseCategory;
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
      { en: "Hello", local: "你好", roman: "nǐ hǎo" , category: "Basics" },
      { en: "Thank you", local: "謝謝", roman: "xiè xie" , category: "Basics" },
      { en: "Excuse me / sorry", local: "不好意思", roman: "bù hǎo yì si", note: "The everyday all-purpose opener — use it to get attention, apologize, or squeeze past." , category: "Basics" },
      { en: "How much is it?", local: "多少錢？", roman: "duō shǎo qián" , category: "Shopping" },
      { en: "The bill, please", local: "買單", roman: "mǎi dān" , category: "Ordering" },
      { en: "I don't eat meat", local: "我不吃肉", roman: "wǒ bù chī ròu", note: "Taiwan has a strong Buddhist vegetarian tradition — look for the 素 character." , category: "Ordering" },
      { en: "Not spicy, please", local: "不要辣", roman: "bú yào là" , category: "Ordering" },
      { en: "Where is the bathroom?", local: "廁所在哪裡？", roman: "cè suǒ zài nǎ lǐ" , category: "Basics" },
      { en: "Can I pay by card?", local: "可以刷卡嗎？", roman: "kě yǐ shuā kǎ ma" , category: "Shopping" },
      { en: "This one, please", local: "我要這個", roman: "wǒ yào zhè ge", note: "Point and say this. It resolves most night-market transactions." , category: "Ordering" },
      { en: "Delicious", local: "好吃", roman: "hǎo chī" , category: "Ordering" },
      { en: "I don't understand", local: "我聽不懂", roman: "wǒ tīng bù dǒng" , category: "Basics" },
      { en: "Please take me to this address", local: "請帶我去這個地址", roman: "qǐng dài wǒ qù zhè ge dì zhǐ", note: "Show the address in characters on your phone." , category: "Getting around" },
      { en: "Goodbye", local: "再見", roman: "zài jiàn" , category: "Basics" },
      { en: "Yes / no", local: "對 / 不對", roman: "duì / bú duì", category: "Basics" },
      { en: "Please", local: "請", roman: "qǐng", category: "Basics" },
      { en: "Do you speak English?", local: "你會說英文嗎？", roman: "nǐ huì shuō yīng wén ma", category: "Basics" },
      { en: "Water, please", local: "請給我水", roman: "qǐng gěi wǒ shuǐ", category: "Ordering" },
      { en: "For here / to go", local: "內用 / 外帶", roman: "nèi yòng / wài dài", note: "Asked at almost every counter. 外帶 (takeaway) is the more common answer.", category: "Ordering" },
      { en: "Half sugar, less ice", local: "半糖少冰", roman: "bàn táng shǎo bīng", note: "The standard local bubble tea order.", category: "Ordering" },
      { en: "No coriander", local: "不要香菜", roman: "bú yào xiāng cài", category: "Ordering" },
      { en: "One more, please", local: "再一個", roman: "zài yī ge", category: "Ordering" },
      { en: "Where is the MRT station?", local: "捷運站在哪裡？", roman: "jié yùn zhàn zài nǎ lǐ", category: "Getting around" },
      { en: "Which exit?", local: "幾號出口？", roman: "jǐ hào chū kǒu", note: "MRT exits are numbered; locals navigate by exit number, not street name.", category: "Getting around" },
      { en: "Please stop here", local: "請在這裡停", roman: "qǐng zài zhè lǐ tíng", category: "Getting around" },
      { en: "How long does it take?", local: "要多久？", roman: "yào duō jiǔ", category: "Getting around" },
      { en: "Too expensive", local: "太貴了", roman: "tài guì le", note: "Bargaining is not the norm in Taipei except at tourist markets.", category: "Shopping" },
      { en: "Can I try it on?", local: "可以試穿嗎？", roman: "kě yǐ shì chuān ma", category: "Shopping" },
      { en: "Do you have a bigger size?", local: "有大一點的嗎？", roman: "yǒu dà yī diǎn de ma", category: "Shopping" },
      { en: "I want a tax refund", local: "我要退稅", roman: "wǒ yào tuì shuì", note: "Show your passport at the register.", category: "Shopping" },
      { en: "One, two, three", local: "一、二、三", roman: "yī, èr, sān", category: "Numbers" },
      { en: "Four, five, six", local: "四、五、六", roman: "sì, wǔ, liù", category: "Numbers" },
      { en: "Ten / hundred / thousand", local: "十 / 百 / 千", roman: "shí / bǎi / qiān", note: "NT$250 is 兩百五 (liǎng bǎi wǔ). Prices are usually shown in digits anyway.", category: "Numbers" },
      { en: "Help!", local: "救命！", roman: "jiù mìng", category: "Emergency" },
      { en: "I need a doctor", local: "我需要看醫生", roman: "wǒ xū yào kàn yī shēng", category: "Emergency" },
      { en: "Call an ambulance", local: "請叫救護車", roman: "qǐng jiào jiù hù chē", note: "Ambulance and fire: 119. Police: 110.", category: "Emergency" },
      { en: "I'm allergic to…", local: "我對…過敏", roman: "wǒ duì … guò mǐn", note: "Peanut 花生 huā shēng · shellfish 甲殼類 jiǎ ké lèi · egg 蛋 dàn · dairy 乳製品 rǔ zhì pǐn", category: "Emergency" },
      { en: "Where is the hospital?", local: "醫院在哪裡？", roman: "yī yuàn zài nǎ lǐ", category: "Emergency" },
      { en: "I lost my passport", local: "我的護照不見了", roman: "wǒ de hù zhào bú jiàn le", category: "Emergency" },
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
      { en: "Hello", local: "你好", roman: "néih hóu" , category: "Basics" },
      { en: "Thank you (for a gift or favor)", local: "多謝", roman: "dō jeh", note: "Use for something given to you." , category: "Basics" },
      { en: "Thank you (for a service)", local: "唔該", roman: "m̀h gōi", note: "Also means 'excuse me' and 'please' — the single most useful word in Hong Kong." , category: "Basics" },
      { en: "The bill, please", local: "唔該，埋單", roman: "m̀h gōi, màaih dāan" , category: "Ordering" },
      { en: "How much?", local: "幾多錢？", roman: "géi dō chín" , category: "Shopping" },
      { en: "Sorry / excuse me (apology)", local: "對唔住", roman: "deui m̀h jyuh" , category: "Basics" },
      { en: "Where is the bathroom?", local: "洗手間喺邊度？", roman: "sái sáu gāan hái bīn douh" , category: "Basics" },
      { en: "One of these, please", local: "要一個呢個", roman: "yiu yāt go nī go" , category: "Ordering" },
      { en: "Milk tea", local: "奶茶", roman: "náaih chàh", note: "Order at any cha chaan teng. 'Yuenyeung' (鴛鴦) is the coffee-tea hybrid." , category: "Ordering" },
      { en: "Not too sweet", local: "少甜", roman: "síu tìm" , category: "Ordering" },
      { en: "Delicious", local: "好食", roman: "hóu sihk" , category: "Ordering" },
      { en: "I don't speak Cantonese", local: "我唔識講廣東話", roman: "ngóh m̀h sīk góng gwóng dūng wá" , category: "Basics" },
      { en: "Please stop here", local: "唔該，呢度落車", roman: "m̀h gōi, nī douh lohk chē", note: "For minibuses, where you must call out your stop." , category: "Getting around" },
      { en: "Goodbye", local: "拜拜", roman: "bāai bāai" , category: "Basics" },
      { en: "Yes / no", local: "係 / 唔係", roman: "haih / m̀h haih", category: "Basics" },
      { en: "Please (asking a favour)", local: "唔該", roman: "m̀h gōi", category: "Basics" },
      { en: "Do you speak English?", local: "你識唔識講英文？", roman: "néih sīk m̀h sīk góng yīng mán", note: "Usually unnecessary — English is an official language.", category: "Basics" },
      { en: "Hot / cold drink", local: "熱 / 凍", roman: "yiht / dung", note: "Cha chaan teng staff ask this immediately. Cold drinks often carry a small surcharge.", category: "Ordering" },
      { en: "Less sugar", local: "少甜", roman: "síu tìm", category: "Ordering" },
      { en: "Takeaway", local: "外賣", roman: "ngoih maaih", category: "Ordering" },
      { en: "No MSG, please", local: "唔該唔好味精", roman: "m̀h gōi m̀h hóu meih jīng", category: "Ordering" },
      { en: "I'm vegetarian", local: "我食素", roman: "ngóh sihk sou", note: "Oyster sauce and pork stock are pervasive — be specific.", category: "Ordering" },
      { en: "Which MTR exit?", local: "幾號出口？", roman: "géi houh chēut háu", category: "Getting around" },
      { en: "How do I get to…?", local: "點去…？", roman: "dím heui …", category: "Getting around" },
      { en: "Star Ferry", local: "天星小輪", roman: "tīn sīng síu lèuhn", category: "Getting around" },
      { en: "Please use the meter", local: "唔該打錶", roman: "m̀h gōi dá bīu", note: "Taxis are metered by law; this is rarely needed but useful to know.", category: "Getting around" },
      { en: "How much is this?", local: "呢個幾錢？", roman: "nī go géi chín", category: "Shopping" },
      { en: "Cheaper, please", local: "平啲得唔得？", roman: "pèhng dī dāk m̀h dāk", note: "Expected at Temple Street and the Ladies' Market; not in shops.", category: "Shopping" },
      { en: "Can I pay by Octopus?", local: "可唔可以用八達通？", roman: "hó m̀h hó yíh yuhng baat daaht tūng", category: "Shopping" },
      { en: "One, two, three", local: "一、二、三", roman: "yāt, yih, sāam", category: "Numbers" },
      { en: "Four, five, six", local: "四、五、六", roman: "sei, ńgh, luhk", category: "Numbers" },
      { en: "Ten / hundred", local: "十 / 百", roman: "sahp / baak", category: "Numbers" },
      { en: "Help!", local: "救命！", roman: "gau mehng", category: "Emergency" },
      { en: "Call the police", local: "叫警察", roman: "giu gíng chaat", note: "Police, fire and ambulance are all 999.", category: "Emergency" },
      { en: "I need a doctor", local: "我要睇醫生", roman: "ngóh yiu tái yī sāng", category: "Emergency" },
      { en: "I'm allergic to…", local: "我對…敏感", roman: "ngóh deui … máhn gám", note: "Peanut 花生 fā sāng · shellfish 貝類 bui leuih · egg 蛋 dáan", category: "Emergency" },
      { en: "Where is the hospital?", local: "醫院喺邊度？", roman: "yī yún hái bīn douh", category: "Emergency" },
      { en: "Is the typhoon signal up?", local: "而家掛幾號風球？", roman: "yìh gā gwa géi houh fūng kàuh", note: "Literally 'what number signal is hoisted now'. A genuinely useful September question.", category: "Emergency" },
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
      { en: "Hello", local: "안녕하세요", roman: "annyeonghaseyo" , category: "Basics" },
      { en: "Thank you", local: "감사합니다", roman: "gamsahamnida" , category: "Basics" },
      { en: "Excuse me / over here", local: "저기요", roman: "jeogiyo", note: "This is how you call a server. Saying it loudly across a restaurant is normal, not rude." , category: "Basics" },
      { en: "Please give me this", local: "이거 주세요", roman: "igeo juseyo", note: "Point and say it. Handles almost all ordering." , category: "Ordering" },
      { en: "How much is it?", local: "얼마예요?", roman: "eolmayeyo" , category: "Shopping" },
      { en: "The bill, please", local: "계산해 주세요", roman: "gyesanhae juseyo", note: "You usually pay at the counter on the way out, not at the table." , category: "Ordering" },
      { en: "Not spicy, please", local: "안 맵게 해주세요", roman: "an maepge haejuseyo" , category: "Ordering" },
      { en: "Is it spicy?", local: "매워요?", roman: "maewoyo" , category: "Ordering" },
      { en: "Where is the bathroom?", local: "화장실 어디예요?", roman: "hwajangsil eodiyeyo" , category: "Basics" },
      { en: "Can I pay by card?", local: "카드 돼요?", roman: "kadeu dwaeyo" , category: "Shopping" },
      { en: "Delicious", local: "맛있어요", roman: "masisseoyo" , category: "Ordering" },
      { en: "I don't speak Korean", local: "한국말 못해요", roman: "hangungmal mothaeyo" , category: "Basics" },
      { en: "One person / two people", local: "한 명 / 두 명", roman: "han myeong / du myeong", note: "Many restaurants ask this before seating you. Some refuse single diners for grilled meat." , category: "Ordering" },
      { en: "Goodbye (to someone staying)", local: "안녕히 계세요", roman: "annyeonghi gyeseyo" , category: "Basics" },
      { en: "Yes / no", local: "네 / 아니요", roman: "ne / aniyo", category: "Basics" },
      { en: "Please", local: "주세요", roman: "juseyo", note: "Attaches to a noun: 물 주세요 (water, please).", category: "Basics" },
      { en: "Do you speak English?", local: "영어 하세요?", roman: "yeong-eo haseyo", category: "Basics" },
      { en: "Nice to meet you", local: "반갑습니다", roman: "bangapseumnida", category: "Basics" },
      { en: "Water, please", local: "물 주세요", roman: "mul juseyo", note: "Water is free and usually self-service from a dispenser.", category: "Ordering" },
      { en: "More side dishes, please", local: "반찬 더 주세요", roman: "banchan deo juseyo", note: "Refills are free. Asking is normal.", category: "Ordering" },
      { en: "For one person", local: "혼자예요", roman: "honjayeyo", note: "Say it on arrival — some grilled-meat places refuse solo diners.", category: "Ordering" },
      { en: "Takeaway", local: "포장해 주세요", roman: "pojanghae juseyo", category: "Ordering" },
      { en: "I can't eat meat", local: "고기 못 먹어요", roman: "gogi mot meogeoyo", note: "Add 생선도요 (saengseon-doyo) for fish too — anchovy stock is in almost everything.", category: "Ordering" },
      { en: "Delicious!", local: "잘 먹었습니다", roman: "jal meogeotseumnida", note: "Literally 'I ate well' — said on leaving, and always appreciated.", category: "Ordering" },
      { en: "Which exit?", local: "몇 번 출구예요?", roman: "myeot beon chulguyeyo", note: "Seoul addresses are routinely given as a station plus an exit number.", category: "Getting around" },
      { en: "Please take me here", local: "여기로 가주세요", roman: "yeogiro gajuseyo", note: "Show the address on Naver Map rather than saying it.", category: "Getting around" },
      { en: "Please stop here", local: "여기서 세워주세요", roman: "yeogiseo sewojuseyo", category: "Getting around" },
      { en: "Where is the subway?", local: "지하철역 어디예요?", roman: "jihacheollyeok eodiyeyo", category: "Getting around" },
      { en: "How much is this?", local: "이거 얼마예요?", roman: "igeo eolmayeyo", category: "Shopping" },
      { en: "Can I try it on?", local: "입어봐도 돼요?", roman: "ibeobwado dwaeyo", note: "Some small boutiques say no — asking first avoids an awkward moment.", category: "Shopping" },
      { en: "Do you have a bigger size?", local: "더 큰 사이즈 있어요?", roman: "deo keun saijeu isseoyo", category: "Shopping" },
      { en: "Tax free, please", local: "택스 프리 해주세요", roman: "taekseu peuri haejuseyo", note: "Show your passport; many stores refund at the register.", category: "Shopping" },
      { en: "One, two, three (native)", local: "하나, 둘, 셋", roman: "hana, dul, set", note: "Native numbers count objects and people — two portions is 둘.", category: "Numbers" },
      { en: "One, two, three (Sino)", local: "일, 이, 삼", roman: "il, i, sam", note: "Sino numbers are used for money, dates and phone numbers.", category: "Numbers" },
      { en: "Ten thousand", local: "만", roman: "man", note: "Korean counts in units of 10,000. ₩30,000 is 삼만 (sam-man), not 'thirty thousand'.", category: "Numbers" },
      { en: "Help!", local: "도와주세요!", roman: "dowajuseyo", category: "Emergency" },
      { en: "Call the police", local: "경찰 불러주세요", roman: "gyeongchal bulleojuseyo", note: "Police 112, fire and ambulance 119 — the reverse of Taiwan.", category: "Emergency" },
      { en: "I need a doctor", local: "의사가 필요해요", roman: "uisaga piryohaeyo", category: "Emergency" },
      { en: "I'm allergic to…", local: "저는 … 알레르기가 있어요", roman: "jeoneun … allereugiga isseoyo", note: "Peanut 땅콩 ttangkong · shellfish 조개 jogae · egg 계란 gyeran · dairy 유제품 yujepum", category: "Emergency" },
      { en: "Where is the hospital?", local: "병원 어디예요?", roman: "byeongwon eodiyeyo", category: "Emergency" },
      { en: "Please call 1330", local: "1330에 전화해 주세요", roman: "cheon sambaek samsip-e jeonhwahae juseyo", note: "The 24-hour tourist hotline with live interpretation. Hand your phone over.", category: "Emergency" },
    ],
  },
];

export function phrasesFor(city: CityId): PhraseSet {
  const found = PHRASES.find((p) => p.city === city);
  if (!found) throw new Error(`No phrase set for ${city}`);
  return found;
}
