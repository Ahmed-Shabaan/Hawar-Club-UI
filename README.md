# Hawar Club UI

واجهة موقع **نادي الحوار للألعاب الرياضية** — صفحة ثابتة (HTML / SCSS / Bootstrap) بدعم العربية RTL والإنجليزية LTR، مع وضع فاتح وداكن.

## الروابط

| | |
|---|---|
| المستودع | https://github.com/Ahmed-Shabaan/Hawar-Club-UI |
| المعاينة (GitHub Pages) | https://ahmed-shabaan.github.io/Hawar-Club-UI/ |

## الصفحات

- `index.html` — الصفحة الرئيسية
- `aboutPresident.html` — رؤساء النادي (مع Slick Slider)

## التقنيات

- HTML5 + Bootstrap 5
- SCSS (`styleAR.scss` / `styleEN.scss`)
- jQuery + Slick Slider
- Bootstrap Icons
- Dark / Light theme (`js/theme.js`)

## هيكل الملفات

```
css/
  styleAR.scss      # أنماط العربية + المتغيرات والثيم
  styleEN.scss      # يستورد styleAR ثم تعديلات LTR
  Layout/
    navbar.scss
    footer.scss
    responsive.scss
js/
  theme.js
  main.js           # scrollbar مخصص + Slick
images/
```

## التشغيل محلياً

1. افتح المشروع في المتصفح مباشرة، أو عبر Live Server.
2. بعد تعديل SCSS:

```bash
npx sass css/styleAR.scss css/styleAR.css
npx sass css/styleEN.scss css/styleEN.css
```

- العربية: اربط `css/styleAR.css` مع `lang="ar" dir="rtl"`
- الإنجليزية: اربط `css/styleEN.css` مع `lang="en" dir="ltr"`

## الميزات

- Navbar + Footer متجاوبان
- تبديل الوضع الفاتح/الداكن مع حفظ الاختيار
- Breadcrumb وصفحة الرؤساء
- Scrollbar مخصص لمحتوى الرئيس (يختفي على الموبايل)
- Slick dots مخصصة (تختفي إذا عدد الشرائح ≤ 3)

## الترخيص

مشروع خاص بنادي الحوار للألعاب الرياضية.
