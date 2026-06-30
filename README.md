# עתיד ירוק בע"מ — ATID YAROK LTD

אתר מלא עם מערכת ניהול תוכן, מוצרים, מאמרים, גלריה ושאלות נפוצות.

## מה כלול

- **Frontend**: React 19 + TypeScript + Tailwind CSS + GSAP animations
- **Backend**: tRPC + Drizzle ORM + Hono + Node.js
- **Database**: PostgreSQL (Render.com) או MySQL
- **Admin Panel**: ניהול מלא של כל התוכן בסיסמה

## 7 דפי ציבור

| דף | תיאור |
|----|-------|
| בית | Hero וידאו, סטטיסטיקות, שירותים, מוצרים נבחרים |
| אודות | הסיפור של החברה, ניסיון, סטטיסטיקות |
| קו מוצרים | 12 מוצרי GreenFields עם סינון |
| גלריה | 12 תמונות התקנות עם Lightbox |
| מאמרים | 6 מאמרים מקצועיים עם דפי פנים |
| שאלות נפוצות | 8 שאלות Accordion |
| צור קשר | טופס פנייה + פרטי התקשרות |

## מערכת ניהול (דף נסתר)

כתובת: `/#/admin`
סיסמה: `atid2026!`

- לוח בקרה עם סטטיסטיקות
- ניהול מוצרים (הוספה/עריכה/מחיקה)
- ניהול מאמרים (הוספה/עריכה/מחיקה)
- ניהול שאלות נפוצות
- ניהול גלריה
- ניהול תוכן האתר
- ניהול עמודים מותאמים

## פריסה ב-Render.com

### שלב 1: העלה ל-GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/atid-yarok.git
git push -u origin main
```

### שלב 2: צור Database ב-Render.com

1. גש ל-https://dashboard.render.com
2. לחץ **New +** → **PostgreSQL**
3. שם: `atid-yarok-db`
4. Plan: `Free`
5. שמור את ה-**Internal Database URL**

### שלב 3: צור Web Service

1. לחץ **New +** → **Web Service**
2. בחר את ה-repository מה-GitHub
3. הגדרות:
   - **Name**: `atid-yarok`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
4. הוסף Environment Variable:
   - `DATABASE_URL` = ה-URL מהדatabase
   - `NODE_ENV` = `production`
5. לחץ **Create Web Service**

### שלב 4: אתחול מסד הנתונים

בטרמינל של Render.com, הרץ:

```bash
npm run db:push
npx tsx db/seed.ts
```

### שלב 5: עדכן את ה-Frontend URL (אופציונלי)

אם אתה רוצה שה-frontend יתקשר עם Render גם כשהוא מאוחסן במקום אחר, עדכן:

```typescript
// src/providers/trpc.tsx
const API_URL = "https://atid-yarok.onrender.com/api/trpc";
```

ואז בנה מחדש:

```bash
npm run build
git add . && git commit -m "Update API URL" && git push
```

Render.com יעדכן אוטומטית.

## סקריפטים זמינים

| סקריפט | פעולה |
|--------|-------|
| `npm install` | התקנת תלויות |
| `npm run build` | בנייה לפרודקשן |
| `npm start` | הפעלת שרת פרודקשן |
| `npm run dev` | שרת פיתוח |
| `npm run check` | בדיקת טיפוסים |
| `npm run db:push` | סנכרון סכמה למסד נתונים |
| `npx tsx db/seed.ts` | מילוי נתונים התחלתיים |

## טכנולוגיות

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- tRPC + Drizzle ORM + Hono
- GSAP animations
- React Router v7 (HashRouter)

## קרדיטים

עיצוב ופיתוח: Kimi AI
מוצרים: GreenFields (greenfields.eu)
