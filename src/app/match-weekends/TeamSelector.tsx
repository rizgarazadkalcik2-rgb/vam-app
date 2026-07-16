"use client";

import { useState } from "react";
import Link from "next/link";
import { t, type Lang } from "@/lib/dictionary";
import { localizeMatchEvent, type MatchEvent } from "@/lib/matchEvents";
import SmartImage from "@/app/components/SmartImage";

export type Team = {
  slug: string;
  name: string;
  city: { TR: string; DE: string; EN: string; KU?: string; CKB?: string };
  letter: string;
  badge: { TR: string; DE: string; EN: string; KU?: string; CKB?: string };
  heroTitle: { TR: string; DE: string; EN: string; KU?: string; CKB?: string };
  intro: { TR: string; DE: string; EN: string; KU?: string; CKB?: string };
  included: { TR: string[]; DE: string[]; EN: string[]; KU?: string[]; CKB?: string[] };
};

export const TEAMS: Team[] = [
  {
    slug: "amedspor",
    name: "Amedspor",
    city: { TR: "Diyarbakır", DE: "Diyarbakır", EN: "Diyarbakır", KU: "Amed", CKB: "ئامەد" },
    letter: "A",
    badge: { TR: "Amedspor Experience", DE: "Amedspor Experience", EN: "Amedspor Experience", KU: "Amedspor Experience", CKB: "Amedspor Experience" },
    heroTitle: {
      TR: "Amed'in Yaşayan Tarihine ve Modern Kimliğine Bir Yolculuk",
      DE: "Eine Reise in Amed's lebendige Geschichte und moderne Identität",
      EN: "A Journey Into Amed's Living History and Modern Identity",
      KU: "Rêwîtiyek li Dîroka Zindî û Nasnameya Nûjen a Amedê",
      CKB: "گەشتێک بۆ مێژووی زیندوو و ناسنامەی هاوچەرخی ئامەد",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Sur'un beş bin yıllık taşları arasında yankılanan bir tezahüratı, tribünde omuz omuza duran bir şehri ve doksan dakikaya sığmayan bir kimliği sunuyoruz — Amedspor forması, buradaki en genç anıt.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der zwischen fünftausend Jahre alten Mauern von Sur widerhallt, eine Stadt, die Schulter an Schulter auf der Tribüne steht, und eine Identität, die in neunzig Minuten keinen Platz findet — das Amedspor-Trikot ist hier das jüngste Denkmal.",
      EN: "This isn't a football ticket. We offer a chant that echoes among the five-thousand-year-old stones of Sur, a city standing shoulder to shoulder in the stands, and an identity that ninety minutes can't hold — the Amedspor jersey is the youngest monument here.",
      KU: "Ev ne bîleta maçekê ye. Em dengek pêşkêş dikin ku di navbera kevirên Sûrê yên pênc hezar salî de vedigere, bajarekî ku li tribînê milûmil radiweste, û nasnameyek ku di neh deqeyan de nayê wesandin — fanîleya Amedspor li vir bîrdariya herî ciwan e.",
      CKB: "ئەمە بلیتی یاریگای فوتبۆڵ نییە. ئێمە دەنگێک پێشکەش دەکەین کە لەنێوان بەردەکانی پێنج هەزار ساڵەی سوور دەدرەوشێتەوە، شارێک کە شان بە شان لە تریبیونەکە ڕادەوەستێت، و ناسنامەیەک کە لە نەوەد خولەکدا ناگونجێت — کراسی ئامەدسپۆر لێرە گەنجترین ئادگارە.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Sur içi konaklama önerileri",
        "Hevsel Bahçeleri ve Dicle kıyısı turu",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Unterkunftsempfehlungen in Sur",
        "Tour durch die Hevsel-Gärten und am Tigrisufer",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
      EN: [
        "Passolig registration and ticket process tracking",
        "Stand selection and stadium transfer plan",
        "Accommodation recommendations within Sur",
        "Tour of the Hevsel Gardens and the Tigris riverside",
        "Local gastronomy stops",
        "Free time planning for non-match days",
      ],
      KU: [
        "Tomarkirina Passolig û şopandina pêvajoya bîletê",
        "Hilbijartina tribînê û plana gihîştina staldiyûmê",
        "Pêşniyarên cîwar li Sûrê",
        "Gera Baxçeyên Hevselê û kêleka Dîcleyê",
        "Xalên xwarinên herêmî",
        "Plana dema vala ji bo rojên bêyî maçê",
      ],
      CKB: [
        "تۆمارکردنی پاسۆلیگ و شوێنکەوتنی پرۆسەی بلیت",
        "هەڵبژاردنی تریبیون و پلانی گەیشتن بۆ یاریگا",
        "پێشنیاری جێگە لە ناو سوور",
        "گەڕان بە باخچەکانی هەڤسێل و کەناری دیجلە",
        "وەستگەکانی خواردنی ناوچەیی",
        "پلانی کاتی ئازاد بۆ ڕۆژانی بێ یاری",
      ],
    },
  },
  {
    slug: "vanspor",
    name: "Vanspor FK",
    city: { TR: "Van", DE: "Van", EN: "Van", KU: "Wan", CKB: "وان" },
    letter: "V",
    badge: { TR: "Vanspor Experience", DE: "Vanspor Experience", EN: "Vanspor Experience", KU: "Vanspor Experience", CKB: "Vanspor Experience" },
    heroTitle: {
      TR: "Van'ın Gölü Kadar Derin Bir Kimliğe Yolculuk",
      DE: "Eine Reise in eine Identität, so tief wie der Vansee",
      EN: "A Journey Into an Identity as Deep as Lake Van",
      KU: "Rêwîtiyek li Nasnameyek Kûr wek Gola Wanê",
      CKB: "گەشتێک بۆ ناسنامەیەکی قووڵ وەک گۆلی وان",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Van Gölü'nün maviliğinde yansıyan bir tezahüratı, Urartu kalesinin gölgesinde nefes alan bir şehri sunuyoruz — Vanspor forması, bu gölün en genç dalgası.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der sich im Blau des Vansees spiegelt, eine Stadt, die im Schatten der Urartu-Festung atmet — das Vanspor-Trikot ist die jüngste Welle dieses Sees.",
      EN: "This isn't a football ticket. We offer a chant reflected in the blue of Lake Van, a city breathing in the shadow of the Urartian fortress — the Vanspor jersey is this lake's youngest wave.",
      KU: "Ev ne bîleta maçekê ye. Em dengek pêşkêş dikin ku di şînahiya Gola Wanê de tê xuyakirin, bajarekî ku di siya kela Ûrartûyan de nefes digire — fanîleya Vanspor pêla herî ciwan a vê golê ye.",
      CKB: "ئەمە بلیتی یاریگای فوتبۆڵ نییە. ئێمە دەنگێک پێشکەش دەکەین کە لە شینی گۆلی وان دەبریسکێتەوە، شارێک کە لە سایەی قەڵای ئوورارتوویەکاندا هەناسە هەڵدەکێشێت — کراسی ڤانسپۆر لەم گۆلەدا گەنجترین شەپۆلە.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Van Kalesi ve Urartu izleri turu",
        "Akdamar Adası tekne turu",
        "Van kahvaltısı ve yerel lezzet durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour zur Burg von Van und den Spuren der Urartäer",
        "Bootstour zur Akdamar-Insel",
        "Van-Frühstück und lokale Spezialitäten",
        "Freizeitgestaltung für spielfreie Tage",
      ],
      EN: [
        "Passolig registration and ticket process tracking",
        "Stand selection and stadium transfer plan",
        "Tour of Van Castle and the traces of the Urartians",
        "Boat tour to Akdamar Island",
        "Van breakfast and local delicacy stops",
        "Free time planning for non-match days",
      ],
      KU: [
        "Tomarkirina Passolig û şopandina pêvajoya bîletê",
        "Hilbijartina tribînê û plana gihîştina staldiyûmê",
        "Gera Kela Wanê û şopên Ûrartûyan",
        "Gera keştiyê ya Girava Akdamarê",
        "Taştêya Wanê û xalên tama herêmî",
        "Plana dema vala ji bo rojên bêyî maçê",
      ],
      CKB: [
        "تۆمارکردنی پاسۆلیگ و شوێنکەوتنی پرۆسەی بلیت",
        "هەڵبژاردنی تریبیون و پلانی گەیشتن بۆ یاریگا",
        "گەڕانی قەڵای وان و شوێنەوارەکانی ئوورارتوو",
        "گەڕانی بەلەم بۆ دوورگەی ئاقدامار",
        "تاشتەی وان و وەستگەکانی تامی ناوچەیی",
        "پلانی کاتی ئازاد بۆ ڕۆژانی بێ یاری",
      ],
    },
  },
  {
    slug: "batman",
    name: "Batman Petrol Spor",
    city: { TR: "Batman", DE: "Batman", EN: "Batman", KU: "Elih", CKB: "ئەلیح" },
    letter: "B",
    badge: { TR: "Batman Petrol Spor Experience", DE: "Batman Petrol Spor Experience", EN: "Batman Petrol Spor Experience", KU: "Batman Petrol Spor Experience", CKB: "Batman Petrol Spor Experience" },
    heroTitle: {
      TR: "Dicle'nin Kıyısında Yaşayan Bir Direnişe Yolculuk",
      DE: "Eine Reise zu einem lebendigen Widerstand am Ufer des Tigris",
      EN: "A Journey to a Living Resistance on the Banks of the Tigris",
      KU: "Rêwîtiyek li Berxwedaneke Zindî li Kêleka Dîcleyê",
      CKB: "گەشتێک بۆ بەرخوداندنێکی زیندوو لەسەر کەناری دیجلە",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Hasankeyf'in kayalıklarında yankılanan bir tezahüratı, Dicle'nin akışına direnen bir şehri sunuyoruz — Batman Petrol Spor forması, bu direnişin en genç rengi.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der in den Felsen von Hasankeyf widerhallt, eine Stadt, die der Strömung des Tigris standhält — das Trikot von Batman Petrol Spor ist die jüngste Farbe dieses Widerstands.",
      EN: "This isn't a football ticket. We offer a chant that echoes among the cliffs of Hasankeyf, a city standing firm against the current of the Tigris — the Batman Petrol Spor jersey is the youngest color of this resistance.",
      KU: "Ev ne bîleta maçekê ye. Em dengek pêşkêş dikin ku di zinarên Heskîfê de vedigere, bajarekî ku li hember herikîna Dîcleyê radiweste — fanîleya Batman Petrol Spor rengê herî ciwan ê vê berxwedanê ye.",
      CKB: "ئەمە بلیتی یاریگای فوتبۆڵ نییە. ئێمە دەنگێک پێشکەش دەکەین کە لەنێو تاشەبەردەکانی حەسەنکێف دەدرەوشێتەوە، شارێک کە بەرامبەر ڕۆیشتنی دیجلە بەرگری دەکات — کراسی بەتمان پترۆل سپۆر ڕەنگی گەنجترین ئەم بەرخوداندنە.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Hasankeyf ve Dicle Vadisi turu",
        "Kayalık yerleşimler ve mağara evleri gezisi",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour durch Hasankeyf und das Tigristal",
        "Besichtigung der Felsensiedlungen und Höhlenwohnungen",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
      EN: [
        "Passolig registration and ticket process tracking",
        "Stand selection and stadium transfer plan",
        "Tour of Hasankeyf and the Tigris Valley",
        "Visit to the rock-cut settlements and cave dwellings",
        "Local gastronomy stops",
        "Free time planning for non-match days",
      ],
      KU: [
        "Tomarkirina Passolig û şopandina pêvajoya bîletê",
        "Hilbijartina tribînê û plana gihîştina staldiyûmê",
        "Gera Heskîf û Geliyê Dîcleyê",
        "Gera niştecihên zinarî û xaniyên şikeftê",
        "Xalên xwarinên herêmî",
        "Plana dema vala ji bo rojên bêyî maçê",
      ],
      CKB: [
        "تۆمارکردنی پاسۆلیگ و شوێنکەوتنی پرۆسەی بلیت",
        "هەڵبژاردنی تریبیون و پلانی گەیشتن بۆ یاریگا",
        "گەڕانی حەسەنکێف و دۆڵی دیجلە",
        "سەردانی گوندە تاشەبەردییەکان و ماڵە ئەشکەوتییەکان",
        "وەستگەکانی خواردنی ناوچەیی",
        "پلانی کاتی ئازاد بۆ ڕۆژانی بێ یاری",
      ],
    },
  },
  {
    slug: "mardin1969",
    name: "Mardin 1969 Spor",
    city: { TR: "Mardin", DE: "Mardin", EN: "Mardin", KU: "Mêrdîn", CKB: "مێردین" },
    letter: "M",
    badge: { TR: "Mardin 1969 Experience", DE: "Mardin 1969 Experience", EN: "Mardin 1969 Experience", KU: "Mardin 1969 Experience", CKB: "Mardin 1969 Experience" },
    heroTitle: {
      TR: "Taş Şehrin Sabrına ve Zarafetine Yolculuk",
      DE: "Eine Reise zur Geduld und Eleganz der Steinstadt",
      EN: "A Journey Into the Patience and Elegance of the Stone City",
      KU: "Rêwîtiyek li Sebir û Delaliya Bajarê Kevir",
      CKB: "گەشتێک بۆ ئارامی و ڕێکوپێکی شاری بەرد",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Mardin'in altın taşlarında yankılanan bir tezahüratı, ovaya bakan bir şehrin sabrını sunuyoruz — Mardin 1969 forması, bu taşların en genç işçiliği.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der in den goldenen Steinen Mardins widerhallt, die Geduld einer Stadt mit Blick auf die Ebene — das Trikot von Mardin 1969 ist die jüngste Handwerkskunst dieser Steine.",
      EN: "This isn't a football ticket. We offer a chant that echoes among Mardin's golden stones, the patience of a city looking out over the plain — the Mardin 1969 jersey is the youngest craftsmanship of these stones.",
      KU: "Ev ne bîleta maçekê ye. Em dengek pêşkêş dikin ku di kevirên zêrîn ên Mêrdînê de vedigere, sebra bajarekî ku li deştê dinêre — fanîleya Mardin 1969 destkariya herî ciwan a van keviran e.",
      CKB: "ئەمە بلیتی یاریگای فوتبۆڵ نییە. ئێمە دەنگێک پێشکەش دەکەین کە لە بەردە زێڕینەکانی مێردین دەدرەوشێتەوە، ئارامی شارێک کە تەماشای دەشتەکە دەکات — کراسی مێردین ١٩٦٩ وەستایەتی گەنجترین ئەم بەردانەیە.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Mardin eski şehir ve taş mimari turu",
        "Deyrulzafaran Manastırı ziyareti",
        "Mardin mutfağı ve yerel lezzet durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour durch die Altstadt und Steinarchitektur Mardins",
        "Besuch des Deyrulzafaran-Klosters",
        "Mardiner Küche und lokale Spezialitäten",
        "Freizeitgestaltung für spielfreie Tage",
      ],
      EN: [
        "Passolig registration and ticket process tracking",
        "Stand selection and stadium transfer plan",
        "Tour of Mardin's old town and stone architecture",
        "Visit to Deyrulzafaran Monastery",
        "Mardin cuisine and local delicacy stops",
        "Free time planning for non-match days",
      ],
      KU: [
        "Tomarkirina Passolig û şopandina pêvajoya bîletê",
        "Hilbijartina tribînê û plana gihîştina staldiyûmê",
        "Gera bajarê kevn ê Mêrdînê û mîmariya kevir",
        "Serdana Dêra Deyrulzefaranê",
        "Xwarina Mêrdînê û xalên tama herêmî",
        "Plana dema vala ji bo rojên bêyî maçê",
      ],
      CKB: [
        "تۆمارکردنی پاسۆلیگ و شوێنکەوتنی پرۆسەی بلیت",
        "هەڵبژاردنی تریبیون و پلانی گەیشتن بۆ یاریگا",
        "گەڕانی شاری کۆن و تەلارسازی بەردینی مێردین",
        "سەردانی گاسنی دەیرولزەعفەران",
        "خواردنی مێردین و وەستگەکانی تامی ناوچەیی",
        "پلانی کاتی ئازاد بۆ ڕۆژانی بێ یاری",
      ],
    },
  },
  {
    slug: "igdir",
    name: "Iğdır FK",
    city: { TR: "Iğdır", DE: "Iğdır", EN: "Iğdır", KU: "Îgdir", CKB: "ئیگدیر" },
    letter: "I",
    badge: { TR: "Iğdır FK Experience", DE: "Iğdır FK Experience", EN: "Iğdır FK Experience", KU: "Iğdır FK Experience", CKB: "Iğdır FK Experience" },
    heroTitle: {
      TR: "Ağrı'nın Gölgesinde Büyüyen Bir Ovaya Yolculuk",
      DE: "Eine Reise in eine Ebene, die im Schatten des Ararat wächst",
      EN: "A Journey Into a Plain Growing in the Shadow of Ararat",
      KU: "Rêwîtiyek li Deştek Mezinbûyî di Siya Agiriyê de",
      CKB: "گەشتێک بۆ دەشتێک کە لە سایەی ئاگری گەورە دەبێت",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Ağrı Dağı'nın eteklerinde yankılanan bir tezahüratı, bereketli ovanın gururunu sunuyoruz — Iğdır FK forması, bu dağın en genç yansıması.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der an den Hängen des Ararat widerhallt, den Stolz der fruchtbaren Ebene — das Trikot von Iğdır FK ist das jüngste Spiegelbild dieses Berges.",
      EN: "This isn't a football ticket. We offer a chant that echoes at the foot of Mount Ararat, the pride of a fertile plain — the Iğdır FK jersey is this mountain's youngest reflection.",
      KU: "Ev ne bîleta maçekê ye. Em dengek pêşkêş dikin ku li binê Çiyayê Agiriyê vedigere, serbilindiya deştek bereketdar — fanîleya Îgdir FK weyneya herî ciwan a vî çiyayî ye.",
      CKB: "ئەمە بلیتی یاریگای فوتبۆڵ نییە. ئێمە دەنگێک پێشکەش دەکەین کە لە دامێنی چیای ئاگری دەدرەوشێتەوە، شانازی دەشتێکی بەروبوومدار — کراسی ئیگدیر ئێف کە وێنەی گەنجترین ئەم چیایە.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Ağrı Dağı manzara noktaları turu",
        "Iğdır ovası ve yerel tarım kültürü gezisi",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour zu den Aussichtspunkten des Ararat",
        "Ausflug in die Ebene von Iğdır und die lokale Agrarkultur",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
      EN: [
        "Passolig registration and ticket process tracking",
        "Stand selection and stadium transfer plan",
        "Tour of Mount Ararat's viewpoints",
        "Excursion into the Iğdır plain and local agricultural culture",
        "Local gastronomy stops",
        "Free time planning for non-match days",
      ],
      KU: [
        "Tomarkirina Passolig û şopandina pêvajoya bîletê",
        "Hilbijartina tribînê û plana gihîştina staldiyûmê",
        "Gera xalên dîmenê yên Çiyayê Agiriyê",
        "Gera deşta Îgdirê û çanda çandiniyê ya herêmî",
        "Xalên xwarinên herêmî",
        "Plana dema vala ji bo rojên bêyî maçê",
      ],
      CKB: [
        "تۆمارکردنی پاسۆلیگ و شوێنکەوتنی پرۆسەی بلیت",
        "هەڵبژاردنی تریبیون و پلانی گەیشتن بۆ یاریگا",
        "گەڕانی خاڵە دیمەنییەکانی چیای ئاگری",
        "گەشتێک بۆ دەشتی ئیگدیر و کەلتووری کشتوکاڵی ناوچەیی",
        "وەستگەکانی خواردنی ناوچەیی",
        "پلانی کاتی ئازاد بۆ ڕۆژانی بێ یاری",
      ],
    },
  },
];

export default function TeamSelector({
  lang,
  events = [],
  children,
}: {
  lang: Lang;
  events?: MatchEvent[];
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const team = TEAMS[active];

  const locale = lang === "DE" ? "de-DE" : lang === "EN" ? "en-US" : lang === "KU" ? "ku" : lang === "CKB" ? "ckb" : "tr-TR";
  // toISOString() UTC'ye göre "bugün"ü verir — UTC'nin doğusundaki ziyaretçilerde
  // (DE, CKB kullanıcıları vb.) yerel gece yarısından sonraki ilk birkaç saat
  // hâlâ UTC'de "dün" olabilir, bu da geçmiş bir maçın "yaklaşan" listede kalmasına
  // yol açar. Yerel tarih bileşenlerinden (UTC'ye çevirmeden) oluşturuyoruz.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const localizedEvents = events.map((e) => localizeMatchEvent(e, lang));
  const teamEvents = localizedEvents.filter((e) => e.team === team.slug);
  const fixtures = teamEvents.filter(
    (e) => e.kind === "match" && e.event_date && String(e.event_date).slice(0, 10) >= today
  );
  const news = teamEvents.filter((e) => e.kind === "news");
  const heroImage = news.find((e) => e.image_url)?.image_url || null;

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  function venueLabel(v: string | null) {
    if (v === "İç saha") return t("mw_venue_home", lang);
    if (v === "Deplasman") return t("mw_venue_away", lang);
    return v;
  }
  const subjectHero = encodeURIComponent(`Match Weekends – ${team.name} – ${t("mw_mailto_subject_experience", lang)}`);
  const subjectItinerary = encodeURIComponent(`Match Weekends – ${team.name} – ${t("mw_mailto_subject_itinerary", lang)}`);

  return (
    <>
      <div className="vc-mw-team-row">
        {TEAMS.map((tm, i) => (
          <button
            key={tm.slug}
            className={`vc-mw-team-chip${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tm.name}
          </button>
        ))}
      </div>

      <div className="vc-mw-hero">
        {heroImage ? (
          <>
            <SmartImage className="vc-mw-hero-img" src={heroImage} alt={team.name} fill sizes="100vw" />
            <div className="vc-mw-hero-shade" />
          </>
        ) : (
          <>
            <div className="vc-mw-hero-glow" />
            <span className="vc-mw-hero-letter">{team.letter}</span>
          </>
        )}
        <div className="vc-mw-hero-content">
          <div className="vc-badges">
            <span className="vc-badge vc-badge-gold">Match Weekends</span>
            <span className="vc-badge vc-badge-dark">{team.badge[lang] ?? team.badge.TR}</span>
          </div>
          <h1 className="vc-hero-title">{team.heroTitle[lang] ?? team.heroTitle.TR}</h1>
          <div className="vc-hero-meta">
            <span>⊙ {team.city[lang] ?? team.city.TR}</span>
            <span className="vc-dot" />
            <span>{t("mw_hero_tag", lang)}</span>
          </div>
        </div>
      </div>

      <div className="vc-mw-intro">
        <p>{team.intro[lang] ?? team.intro.TR}</p>
      </div>

      {fixtures.length > 0 && (
        <div className="vc-mw-fixtures">
          <h2 className="vc-section-label">{t("mw_fixtures_title", lang)}</h2>
          <p className="vc-mw-fixtures-sub">{t("mw_fixtures_sub", lang)}</p>
          <div className="vc-mw-fixture-list">
            {fixtures.map((f) => (
              <div className="vc-mw-fixture" key={f.id}>
                {f.image_url && (
                  <SmartImage className="vc-mw-fixture-thumb" src={f.image_url} alt="" width={64} height={64} />
                )}
                <div className="vc-mw-fixture-date">{fmtDate(f.event_date as string)}</div>
                <div className="vc-mw-fixture-main">
                  <span className="vc-mw-fixture-teams">
                    {team.name} — {f.title}
                  </span>
                  <span className="vc-mw-fixture-meta">
                    {[f.event_time, f.competition, venueLabel(f.venue)].filter(Boolean).join(" · ")}
                  </span>
                  {f.body && <span className="vc-mw-fixture-note">{f.body}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {news.length > 0 && (
        <div className="vc-mw-news">
          <h2 className="vc-section-label">{t("mw_news_title", lang)}</h2>
          <div className="vc-mw-news-grid">
            {news.map((n) => (
              <div className="vc-mw-news-card" key={n.id}>
                {n.image_url && (
                  <div className="vc-mw-news-thumb">
                    <SmartImage src={n.image_url} alt={n.title} fill sizes="(max-width: 600px) 100vw, 33vw" />
                  </div>
                )}
                <div className="vc-mw-news-body">
                  <div className="vc-mw-news-title">{n.title}</div>
                  {n.event_date && <div className="vc-mw-news-date">{fmtDate(n.event_date)}</div>}
                  {n.body && <p className="vc-mw-news-text">{n.body}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 8px", textAlign: "center" }}>
        <a className="vc-btn-cta" href={`mailto:info@visitvam.com?subject=${subjectHero}`}>
          {t("mw_cta_design", lang)}
        </a>
      </div>

      <div className="vc-mw-band">
        <div className="vc-mw-band-inner">
          <div>
            <div className="vc-mw-band-eyebrow">{t("mw_band_eyebrow", lang)}</div>
            <h2 className="vc-mw-band-title">{t("mw_band_title", lang)}</h2>
            <p className="vc-mw-band-p">{t("mw_band_desc", lang)}</p>
            <div className="vc-mw-cta-row">
              <a className="vc-btn-cta" href={`mailto:info@visitvam.com?subject=${subjectItinerary}`}>
                {t("mw_plan_week", lang)}
              </a>
              <Link className="vc-btn-cta-ghost" href="/bundles">
                {t("mw_view_routes", lang)}
              </Link>
            </div>
          </div>
          <div className="vc-mw-band-card">
            <h2 className="vc-section-label" style={{ color: "var(--gold-300)" }}>
              {t("mw_included_title", lang)}
            </h2>
            <ul className="vc-checklist">
              {(team.included[lang] ?? team.included.TR).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
