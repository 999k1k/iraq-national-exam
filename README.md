# منصة الاختبار الوطني — تحضير الدراسات العليا في العراق

موقع ثابت (HTML/CSS/JavaScript) بدون أي أدوات بناء. افتح `index.html` مباشرة في المتصفح (يعمل بدون إنترنت؛ الخط Cairo يُحمّل من Google Fonts عند توفر الإنترنت وإلا يُستخدم خط بديل).

## المحتويات
- `index.html` — التطبيق (الرئيسية، الملخصات، التدريب، الامتحان التجريبي، الملفات، نتائجي).
- `js/data-arabic.js`, `js/data-english.js`, `js/data-computer.js` — بنوك الأسئلة (الخيار الأول هو الصحيح، وتُخلط الخيارات عند العرض).
- `js/notes.js` — الملخصات الدراسية.
- `files/*.pdf` — ملخصات وبنوك أسئلة PDF (مولّدة من `print.html?doc=<subject>-notes|bank` عبر Chrome).
- `RESEARCH-NOTES.md` — ملخص البحث والمصادر.

## إعادة توليد ملفات PDF
```
for d in arabic-notes english-notes computer-notes arabic-bank english-bank computer-bank; do
  google-chrome --headless=new --no-sandbox --no-pdf-header-footer --virtual-time-budget=4000 \
    --print-to-pdf=files/$d.pdf "file://$PWD/print.html?doc=$d"; done
```
