# دليل كامل: من بداية المشروع حتى العرض أونلاين
## نادي الحوار للألعاب الرياضية — Hawar Club UI

---

## 1) تجهيز المشروع محلياً

1. إنشاء مجلد المشروع: `Hawar Club UI`
2. تنظيم الملفات:
   - `index.html` / `aboutPresident.html`
   - `css/` (Bootstrap + SCSS)
   - `js/` (theme, main, slick, jquery)
   - `images/` / `fonts/`
3. هيكل الـ SCSS:
   - `css/styleAR.scss` → كل الستايلات العامة
   - `css/Layout/navbar.scss`
   - `css/Layout/footer.scss`
   - `css/Layout/responsive.scss`
   - `css/styleEN.scss` → يستورد styleAR ثم تعديلات الإنجليزية
4. Compile بعد أي تعديل SCSS:

```bash
npx sass css/styleAR.scss css/styleAR.css
npx sass css/styleEN.scss css/styleEN.css
```

5. فتح الصفحات محلياً (Live Server أو فتح الملف في المتصفح)

---

## 2) ما تم بناؤه في الواجهة

1. Navbar عربي RTL + Dark/Light
2. Footer مع خط بعرض كامل ولوجو يقطعه
3. Theme (فاتح افتراضي) عبر `js/theme.js`
4. Breadcrumb + عنوان الصفحة
5. صفحة الرؤساء (صورة + تفاصيل + scrollbar مخصص)
6. Slick Slider للرؤساء + dots مخصصة
7. Responsive (موبايل: ترتيب اللوجو / التوجلر / الأكشنز)

---

## 3) رفع المشروع على GitHub

### أ) تثبيت الأدوات

1. تثبيت Git من: https://git-scm.com/
2. تثبيت GitHub CLI من: https://cli.github.com/

### ب) تهيئة Git داخل المشروع

```bash
cd "D:\3S Software\Hawar Club UI"
git init
```

3. إنشاء `.gitignore` (تجاهل node_modules وملفات النظام)
4. إضافة الملفات وعمل أول commit:

```bash
git add -A
git commit -m "Initial commit: Hawar Club UI with SCSS, RTL/LTR themes, and president pages"
git branch -M main
```

### ج) تسجيل الدخول لـ GitHub

```bash
gh auth login
```

أو عبر Device Login:

1. افتح https://github.com/login/device
2. أدخل الكود الظاهر في التيرمينال
3. وافق على الصلاحيات لحساب Ahmed-Shabaan

### د) إنشاء الريبو والرفع

```bash
gh repo create Hawar-Club-UI --public --source=. --remote=origin
git push -u origin main
```

رابط الريبو: https://github.com/Ahmed-Shabaan/Hawar-Club-UI

---

## 4) إضافة README

1. إنشاء ملف `README.md` (وصف المشروع + طريقة التشغيل)
2. Commit و Push:

```bash
git add README.md
git commit -m "Add README and document GitHub Pages preview URL."
git push origin main
```

---

## 5) تفعيل GitHub Pages (عرض أونلاين)

1. من GitHub: Settings → Pages  
   أو عبر الأمر:

```bash
gh api -X POST repos/Ahmed-Shabaan/Hawar-Club-UI/pages -f build_type=legacy -f source[branch]=main -f source[path]=/
```

2. المصدر: فرع `main` من المجلد `/`
3. انتظر دقيقة أو دقيقتين للـ build

رابط الموقع: https://ahmed-shabaan.github.io/Hawar-Club-UI/

صفحات مباشرة:

- الرئيسية: https://ahmed-shabaan.github.io/Hawar-Club-UI/index.html
- الرؤساء: https://ahmed-shabaan.github.io/Hawar-Club-UI/aboutPresident.html

---

## 6) تحديثات لاحقة (دورة العمل اليومية)

```bash
# عدّل الملفات
npx sass css/styleAR.scss css/styleAR.css
npx sass css/styleEN.scss css/styleEN.css

git add -A
git commit -m "وصف التعديل"
git push origin main
```

بعد الـ push، GitHub Pages بيتحدث تلقائي خلال دقايق.

---

## ملخص سريع

| الخطوة | النتيجة |
|--------|---------|
| بناء الواجهة محلياً | HTML + SCSS + JS |
| git init + commit | نسخة محفوظة محلياً |
| gh auth login | ربط بحساب GitHub |
| git push | رفع الكود |
| تفعيل Pages | موقع أونلاين |

---

## روابط مهمة

- المستودع: https://github.com/Ahmed-Shabaan/Hawar-Club-UI
- المعاينة: https://ahmed-shabaan.github.io/Hawar-Club-UI/
- الحساب: https://github.com/Ahmed-Shabaan
