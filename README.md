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


## تحديث v3 — أسئلة قناة @watani8
أُضيف 297 سؤالاً مدققاً من قناة تيليجرام t.me/watani8 (أسئلة الاختبارات الفعلية لعام 2026 كما نقلها الطلبة + استطلاعات القناة + 5 قطع قراءة جديدة) في `js/data-watani8.js`، وكل سؤال مربوط برابط منشوره. البنك الآن 702 سؤالاً (عربي 250، إنكليزي 203، حاسوب 249). التفاصيل في RESEARCH-NOTES.md.

ثم أُضيف 1884 سؤالاً من ثلاثة ملفات PDF (قناة @watani8): «دليل أسئلة اللغة العربية» (426)، «بنك أسئلة الاختبار الوطني - القواعد والمحادثة والوظائف اللغوية» (1005)، «Computer MCQs - Final Bilingual Color Cards» (453) في `js/data-pdfs.js`، بعد مراجعة الإجابات وتصحيح الخاطئ منها وحذف المكرر. البنك الآن 2586 سؤالاً (عربي 676، إنكليزي 1208، حاسوب 702). تكوين الاختبار التجريبي لم يتغيّر.
