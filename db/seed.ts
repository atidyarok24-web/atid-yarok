import { getDb } from "../api/queries/connection";
import { products, articles, faqItems, galleryImages, siteSettings } from "./schema";

const db = getDb();

// ── Seed Products ──
await db.insert(products).values([
  { name: "MF Elite", category: "כדורגל", image: "/images/grass-closeup.jpg", description: "מוצר רב-סיבי (Multi-Fibre) המשלב עמידות יוצאת דופן עם מניעת דליפת מילוי. סיבי מונופילמנט בצורת יהלום משולבים עם סיבי טייפ (Tape) פטנטיים לביצועים מקצועיים ברמה הגבוהה ביותר.", specs: "סוג: מילוי גומי | ספורט: כדורגל, רוגבי, פוטבול אמריקאי | FIFA: Preferred", features: ["סיבי יהלום עמידים לשחיקה", "מניעת דליפת מילוי", "מראה טבעי בגוון דו-צבעי", "100% ממוחזר ל-RTA"] },
  { name: "MX Range", category: "כדורגל", image: "/images/installation-3.jpg", description: "מערכת ארוגה (Woven) מתקדמת לשחקנים מקצועיים. הסיבים ארוגים זה בזה ליצירת מבנה צפוף וחזק יותר.", specs: "טכנולוגיה: ארוגה (Woven) | ספורט: כדורגל | מילוי: Ultra Low", features: ["בנייה ארוגה ליציבות מקסימלית", "מראה טבעי ירוק וסמיך", "משטח רך ונעים לשחקן", "ביצועי כדור עקביים"] },
  { name: "Pure PT", category: "ללא מילוי", image: "/images/product-lounge.jpg", description: "מערכת מהפכנית ללא מילוי (Non-Infill) לכדורגל. מציעה ביצועים ברמה עלית עם תחזוקה מינימלית.", specs: "סוג: ללא מילוי | ספורט: כדורגל | מיחזור: 100%", features: ["ביצועים מקצועיים ללא מילוי", "נוחות שחקן מקסימלית", "בקרת כדור מיטבית", "עמידות יוצאת דופן"] },
  { name: "Slide Max Pro NF", category: "ללא מילוי", image: "/images/product-supergreen.jpg", description: "מערכת ללא מילוי ידידותית לסביבה ועמידה. סיבי Diamond Shape עמידים לשחיקה.", specs: "סוג: ללא מילוי | ספורט: כדורגל, הוקי, בייסבול | מיחזור: 100%", features: ["מראה טבעי ללא מילוי", "קל להתקנה ותחזוקה", "אידיאלי למגרשים קטנים ומקורים", "100% ממוחזר ל-RTA"] },
  { name: "Apollo", category: "רב-תכליתי", image: "/images/installation-8.jpg", description: "מוצר כניסה (Entry-Level) המשלב עמידות יוצאת דופן למחיר עם מראה טבעי.", specs: "סוג: מילוי | ספורט: רב-תכליתי | רמת מחיר: כניסה", features: ["עמידות יוצאת דופן", "מראה טבעי", "תחזוקה מינימלית", "מחיר תחרותי"] },
  { name: "DT Range", category: "כדורגל", image: "/images/installation-1.jpg", description: "טכנולוגיית Double-Tuft של GreenFields לעמידות קיצונית. שני קברים לכל סיב.", specs: "טכנולוגיה: Double-Tuft | ספורט: כדורגל | עמידות: קיצונית", features: ["עמידות קיצונית לשחיקה", "מבנה צפוף ויציב", "ביצועים עקביים לאורך זמן", "תחזוקה מינימלית"] },
  { name: "ONE-DNA", category: "כדורגל", image: "/images/product-roof.jpg", description: "מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא. ללא ציפויים או פסולת.", specs: "חומר: פוליאתילן יחיד | מיחזור: 100% | קיימות: מקסימלית", features: ["פולימר יחיד — מיחזור מלא", "ללא פסולת", "פליטת CO2 מינימלית", "עתיד ירוק"] },
  { name: "Pure EP", category: "הוקי", image: "/images/installation-12.jpg", description: "מערכת Dry Turf מאושרת FIH למשחקי הוקי ברמה הגבוהה ביותר — ללא צורך בהשקיה.", specs: "סוג: Dry Turf | תקן: FIH | ספורט: הוקי", features: ["מאושר FIH ללא השקיה", "מהירות כדור גבוהה", "שליטה מיטבית בכדור", "חיסכון במים"] },
  { name: "TX Range", category: "הוקי", image: "/images/installation-4.jpg", description: "משטחי הוקי מבוססי חול ומים של GreenFields.", specs: "סוג: חול / מים | תקן: FIH Global | ספורט: הוקי", features: ["בקרת כדור אולטימטיבית", "תקן FIH Global", "משטח מים חסכוני", "ביצועים מקצועיים"] },
  { name: "Ecocept Base", category: "בסיס", image: "/images/installation-7.jpg", description: "שכבת בסיס חדשנית מסוג Porous Pavement שפותחה במיוחד לשימוש מתחת למשטחי דשא סינתטי.", specs: "סוג: שכבת בסיס | שימוש: מתחת לדשא סינתטי | ניקוז: מעולה", features: ["ניקוז מים מעולה", "יציבות מבנית", "בידוד תרמי", "קל להתקנה"] },
  { name: "XtraGrass", category: "כדורגל", image: "/images/hero-fallback.jpg", description: "מערכת היברידית המשלבת דשא טבעי עם דשא סינתטי. טבעי פוגש עמיד.", specs: "סוג: היברידי | ספורט: כדורגל | מראה: טבעי", features: ["משחק טבעי אותנטי", "יותר שעות משחק", "פחות שחיקה", "שילוב מושלם"] },
  { name: "PE", category: "רב-תכליתי", image: "/images/installation-6.jpg", description: "מערכת דשא מבוססת טכנולוגיית XT Polymer המספקת עמידות מוגברת וחיים ארוכים.", specs: "טכנולוגיה: XT Polymer | סוג: מבוסס חול | עמידות: מוגברת", features: ["טכנולוגיית XT Polymer", "עמידות מוגברת", "חיים ארוכים", "בסיס חול יעיל"] },
]);

// ── Seed Articles ──
await db.insert(articles).values([
  { title: "GreenFields — טכנולוגיה הולנדית ברמה עולמית", category: "GreenFields", image: "/images/article-1.jpg", excerpt: "GreenFields מ-Genemuiden הולנד מפתחת טכנולוגיות חדשניות כמו סיבי V-Shape, מערכות Woven, ו-ONE-DNA.", content: "GreenFields ממטה ב-Genemuiden שבהולנד היא אחת מחברות הדשא הסינתטי המובילות בעולם. כחברת בת של TenCate Grass, החברה מפתחת טכנולוגיות חדשניות המהוות פריצת דרך בתחום. סיבי V-Shape פטנטיים — סיבים בצורת V המציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי. מערכות ארוגות (Woven) — במקום לקבר את הסיבים בשטח, הם ארוגים זה בזה ליצירת מבנה צפוף וחזק יותר. ONE-DNA — מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא.", date: "15 בינואר 2026" },
  { title: "תהליך התקנת דשא סינתטי — מדריך מלא", category: "התקנה", image: "/images/article-2.jpg", excerpt: "התקנת דשא סינתטי איכותי דורשת מקצועיות. התהליך כולל הכנת תשתית, סלילה, חיבור קווים, מילוי ובדיקות איכות.", content: "התקנת דשא סינתטי איכותי היא תהליך מקצועי הדורש ניסיון וידע. שלב 1: הכנת התשתית — פינוי השטח, יצירת שיפועים לניקוז מים, והנחת שכבות בסיס. שלב 2: הנחת הדשא — סלילת יריעות הדשא בכיוון אחיד. שלב 3: חיבור קווים — שימוש בדבק מקצועי וסרטי חיבור. שלב 4: מילוי — פיזור גומי או חול באופן אחיד. שלב 5: בדיקות איכות — בדיקות מעבדה מוסמכות.", date: "8 בינואר 2026" },
  { title: "FIFA Preferred Provider — מה זה אומר?", category: "ספורט", image: "/images/article-3.jpg", excerpt: "הסמכת הספק המועדף של FIFA היא ההסמכה הגבוהה ביותר בתעשייה. עתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו.", content: "הסמכת FIFA Preferred Provider היא ההסמכה הגבוהה ביותר שחברת דשא סינתטי יכולה לקבל. רק חברות בודדות בעולם זכו בה. מה כוללת ההסמכה? בדיקות מעבדה מוסמכות (Sports Labs, Labosport) לכל המוצרים, עמידה בתקני FIFA Quality Pro, ניסיון בהקמת מגרשים ברמה בינלאומית, שותפות עם יצרן מוכר ומאושר. עתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו, עם למעלה מ-27 מגרשים מאושרי FIFA ברחבי הארץ.", date: "2 בינואר 2026" },
  { title: "Pure PT — דשא ללא מילוי מבית GreenFields", category: "מוצרים", image: "/images/product-lounge.jpg", excerpt: "Pure PT של GreenFields הוא מערכת דשא מהפכנית ללא צורך במילוי גומי. ביצועים ברמה עלית עם תחזוקה מינימלית.", content: "Pure PT של GreenFields הוא מערכת דשא מהפכנית ללא צורך במילוי גומי. הדשא מציע ביצועים ברמה עלית עם תחזוקה מינימלית. יתרונות מרכזיים: ביצועים מקצועיים ללא מילוי, נוחות שחקן מקסימלית, בקרת כדור מיטבית, עמידות יוצאת דופן, 100% ממוחזר. אידיאלי למגרשי קהילה, בתי ספר ושטחים ציבוריים.", date: "20 בדצמבר 2025" },
  { title: "ONE-DNA — העתיד הירוק של הדשא הסינתטי", category: "קיימות", image: "/images/installation-11.jpg", excerpt: "ONE-DNA של GreenFields הוא מערכת דשא בעלת פולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא.", content: "ONE-DNA של GreenFields הוא מערכת דשא בעלת פולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא. ללא ציפויים או פסולת — צעד ברור לקראת עיצוב מעגלי וקיימות סביבתית. בניגוד לדשא סינתטי רגיל המכיל שילוב של חומרים שונים, ONE-DNA בנוי מפוליאתילן אחד בלבד. המשמעות: בסוף חיי הדשא ניתן למחזר אותו במלואו — ללא פסולת.", date: "12 בדצמבר 2025" },
  { title: "סיבי V-Shape — הטכנולוגיה שמשנה את כללי המשחק", category: "טכנולוגיה", image: "/images/grass-closeup.jpg", excerpt: "סיבי V-Shape הפטנטיים של GreenFields מציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי.", content: "סיבי V-Shape הפטנטיים של GreenFields מציעים עמידות יוצאת דופן, גמישות ומראה טבעי כמו דשא אמיתי. הצורה הייחודית של סיב ה-V מאפשרת לסיב לחזור למצבו המקורי גם לאחר לחץ כבד. בניגוד לסיבים רגילים שנשארים שטוחים לאורך זמן, סיבי ה-V מתאוששים בכל פעם. יתרונות: עמידות מוגברת לשחיקה, מראה טבעי לאורך זמן, ביצועי משחק עקביים, חיים ארוכים יותר למגרש.", date: "5 בדצמבר 2025" },
]);

// ── Seed FAQ ──
await db.insert(faqItems).values([
  { question: "כמה זמן מחזיק דשא סינתטי איכותי?", answer: "דשא סינתטי איכותי מבית GreenFields מחזיק מעמד 15-20 שנה ויותר. הדשאים שלנו מגיעים עם אחריות יצרן של 5-8 שנים, וכל המוצרים עוברים בדיקות מעבדה מוסמכות (Sports Labs, Labosport) לפני התקנה." },
  { question: "מה ההבדל בין דשא ארוג (Woven) לדשא רגיל?", answer: "דשא ארוג (Woven) כמו מערכות MX Elite של GreenFields מציע עמידות גבוהה יותר, ביצועי משחק משופרים ופחות דליפת מילוי. האריגה הייחודית מונעת הפרדה של סיבים ומאריכה את חיי הדשא. זוהי הטכנולוגיה המתקדמת ביותר כיום." },
  { question: "האם הדשא מתחמם בשמש הישראלית?", answer: "הדשאים של GreenFields פותחו עם טכנולוגיות מיוחדות שמפחיתות התחממות. סיבי V-Shape והמבנה הארוג מאפשרים זרימת אוויר טובה יותר. בנוסף, מערכות ללא מילוי כמו Pure PT מציעות פתרון קריר יותר." },
  { question: "מהי הסמכת FIFA Preferred Provider?", answer: "FIFA Preferred Provider היא ההסמכה הגבוהה ביותר שחברת דשא סינתטי יכולה לקבל. עתיד ירוק בעמ היא אחת מהחברות הבודדות בישראל עם הסמכה זו. הסמכה זו מאפשרת לנו להתקין מגרשים לליגות הלאומיות והבינלאומיות." },
  { question: "האם צריך לתחזק את הדשא הסינתטי?", answer: "דשא סינתטי דורש תחזוקה מינימלית בהשוואה לדשא טבעי — ניקוי עלים ולכלוך מדי פעם, והברשה. אין צורך בהשקיה, כיסוח או דישון. מערכות ללא מילוי כמו Pure PT דורשות תחזוקה אפילו פחותה." },
  { question: "מה זה ONE-DNA ולמה זה חשוב?", answer: "ONE-DNA של GreenFields הוא מערכת דשא מפולימר יחיד (100% פוליאתילן) המיועדת למיחזור מלא בסוף חייו. בניגוד לדשא רגיל המכיל שילוב של חומרים שונים, ONE-DNA מאפשר מחזוריות מלאה — צעד משמעותי לקראת קיימות סביבתית." },
  { question: "האם ניתן להתקין דשא על גג או מרפסת?", answer: "בהחלט! יש לנו מערכות ייעודיות לגגות ומרפסות עם מערכת ניקוז מתקדמת. הדשא קל משקל, עמיד לתנאי מזג האוויר בישראל, ומציע פתרון ירוק אידיאלי למרחבים עירוניים." },
  { question: "כמה זמן לוקחת התקנה של מגרש כדורגל?", answer: "התקנה של מגרש כדורגל סטנדרטי נמשכת כ-30-60 ימי עבודה, תלוי בגודל השטח, במורכבות התשתית ובתנאי השטח. אנו מלווים את הלקוח מהתכנון ועד הבדיקות הסופיות עם מעבדה מוסכת." },
]);

// ── Seed Gallery ──
await db.insert(galleryImages).values([
  { src: "/images/installation-1.jpg", title: "שדרוג גינה פרטית", location: "תל אביב", category: "גינות פרטיות" },
  { src: "/images/installation-2.jpg", title: "וילה יוקרתית", location: "הרצליה", category: "גינות פרטיות" },
  { src: "/images/installation-3.jpg", title: "מרכז ספורט עירוני", location: "ראשון לציון", category: "מגרשי ספורט" },
  { src: "/images/installation-4.jpg", title: "מתחם משרדים", location: "רעננה", category: "מוסדות" },
  { src: "/images/installation-5.jpg", title: "גן ילדים", location: "פתח תקווה", category: "מוסדות" },
  { src: "/images/installation-6.jpg", title: "בריכת מלון", location: "אילת", category: "מוסדות" },
  { src: "/images/installation-7.jpg", title: "תהליך התקנה", location: "כל הארץ", category: "גינות פרטיות" },
  { src: "/images/installation-8.jpg", title: "מגרש בית ספר", location: "באר שבע", category: "מגרשי ספורט" },
  { src: "/images/installation-9.jpg", title: "מרפסת עירונית", location: "תל אביב", category: "גגות" },
  { src: "/images/installation-10.jpg", title: "גן ציבורי", location: "חיפה", category: "מוסדות" },
  { src: "/images/installation-11.jpg", title: "מגרש לילה", location: "ירושלים", category: "מגרשי ספורט" },
  { src: "/images/installation-12.jpg", title: "מגרש פנימי", location: "נתניה", category: "מגרשי ספורט" },
]);

// ── Seed Site Settings ──
await db.insert(siteSettings).values([
  { key: "heroTitle", value: "עתיד ירוק בע\"מ" },
  { key: "heroSubtitle", value: "הפתרון המושלם לגינה שלכם" },
  { key: "heroBody", value: "אנו מתמחים בייבוא, שיווק והתקנה של מערכות דשא סינתטי מבית GreenFields — מותג מוביל בעולם. עם 17 שנות ניסיון, 250,000 מ\"ר מותקנים ו-27 מגרשים מאושרי FIFA — אנחנו כאן להפוך כל מרחב לירוק ומזמין." },
  { key: "contactPhone1", value: "074-707-7595" },
  { key: "contactPhone2", value: "052-563-1420" },
  { key: "contactEmail", value: "atid.yarok24@gmail.com" },
  { key: "contactAddress", value: "מרכז הרשרון, ת.ד 9427, מיקוד 4040000" },
  { key: "contactHours", value: "א'-ה': 08:00-18:00, ו': 08:00-13:00" },
  { key: "heroVideo", value: "/videos/hero-video.mp4" },
  { key: "heroFallback", value: "/images/hero-fallback.jpg" },
]);

console.log("Seed completed successfully!");
