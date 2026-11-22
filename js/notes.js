/* ملخصات المواد الدراسية — تُعرض في الموقع وتُطبع كملفات PDF */
window.NOTES = {
arabic: {
title:'ملخص اللغة العربية', sub:'النحو والصرف • الإملاء • الأخطاء اللغوية • الثقافة اللغوية • البلاغة',
sections:[
{h:'1. علامات الإعراب الأصلية والفرعية',html:`
<table><tr><th>النوع</th><th>الرفع</th><th>النصب</th><th>الجر / الجزم</th></tr>
<tr><td>المفرد وجمع التكسير</td><td>الضمة</td><td>الفتحة</td><td>الكسرة</td></tr>
<tr><td>المثنى</td><td>الألف</td><td>الياء</td><td>الياء</td></tr>
<tr><td>جمع المذكر السالم</td><td>الواو</td><td>الياء</td><td>الياء</td></tr>
<tr><td>جمع المؤنث السالم</td><td>الضمة</td><td>الكسرة (نيابة)</td><td>الكسرة</td></tr>
<tr><td>الأسماء الخمسة (أب، أخ، حم، فو، ذو)</td><td>الواو</td><td>الألف</td><td>الياء</td></tr>
<tr><td>الممنوع من الصرف</td><td>الضمة</td><td>الفتحة</td><td>الفتحة (نيابة عن الكسرة)</td></tr>
<tr><td>الأفعال الخمسة (يفعلان، تفعلون، تفعلين...)</td><td>ثبوت النون</td><td>حذف النون</td><td>حذف النون (جزم)</td></tr>
<tr><td>المضارع المعتل الآخر</td><td>ضمة مقدرة</td><td>فتحة (ظاهرة على الواو والياء)</td><td>حذف حرف العلة (جزم)</td></tr></table>
<div class="tip">💡 الاسم المنقوص (القاضي): يُرفع ويُجر بحركة مقدرة على الياء، ويُنصب بفتحة ظاهرة. وإذا كان نكرة في الرفع والجر حُذفت ياؤه: «جاء قاضٍ».</div>`},
{h:'2. النواسخ',html:`<ul>
<li><b>كان وأخواتها</b> (أصبح، أضحى، أمسى، ظلّ، بات، صار، ليس، ما زال، ما برح، ما فتئ، ما انفكّ، ما دام): ترفع الاسم وتنصب الخبر ← «كان الجوُّ جميلاً».</li>
<li><b>إنّ وأخواتها</b> (أنّ، كأنّ، لكنّ، ليت، لعلّ): تنصب الاسم وترفع الخبر ← «إنّ العلمَ نورٌ».</li>
<li><b>ظنّ وأخواتها</b> (أفعال القلوب: ظنّ، حسب، خال، زعم، علم، رأى، وجد): تنصب مفعولين أصلهما مبتدأ وخبر ← «ظننتُ الامتحانَ سهلاً».</li>
<li><b>لا النافية للجنس</b>: تعمل عمل إنّ. اسمها: مفرد (يُبنى: لا رجلَ)، مضاف (لا طالبَ علمٍ)، شبيه بالمضاف (لا راغبًا في الشر).</li></ul>
<div class="tip">💡 ضمائر الرفع المتصلة بكان (كنتُ، كانوا) هي اسم كان. أما تاء «كانتْ» الساكنة فهي تاء التأنيث لا محل لها.</div>`},
{h:'3. المنصوبات المهمة',html:`<table><tr><th>المنصوب</th><th>تعريفه</th><th>مثال</th></tr>
<tr><td>المفعول المطلق</td><td>مصدر يؤكد الفعل أو يبيّن نوعه أو عدده</td><td>قرأتُ قراءةً متأنيةً (نوع)</td></tr>
<tr><td>المفعول لأجله</td><td>مصدر قلبي يبيّن سبب الفعل</td><td>وقفتُ احترامًا</td></tr>
<tr><td>المفعول فيه</td><td>ظرف زمان أو مكان</td><td>سافرتُ يومَ الخميس / جلستُ أمامَ المعلم</td></tr>
<tr><td>الحال</td><td>نكرة تبيّن هيئة صاحبها (معرفة غالبًا)</td><td>رأيتُ القمرَ منيرًا</td></tr>
<tr><td>التمييز</td><td>نكرة تزيل الإبهام (بعد العدد والمقادير)</td><td>اشتريتُ عشرين كتابًا</td></tr>
<tr><td>المستثنى بإلا</td><td>يُنصب إذا كان الكلام تامًا مثبتًا</td><td>حضر الطلابُ إلا زيدًا</td></tr></table>
<div class="tip">💡 الاستثناء المفرّغ (منفي ومحذوف المستثنى منه): يُعرب ما بعد إلا حسب موقعه ← «ما جاء إلا محمدٌ» (فاعل).</div>`},
{h:'4. العدد',html:`<ul><li>1 و2: يطابقان المعدود.</li><li>3 – 10: تخالف المعدود (ثلاثةُ كتبٍ / ثلاثُ طالباتٍ).</li>
<li>11 و12: يطابقان في الجزأين (أحدَ عشرَ كتابًا / إحدى عشرةَ قصةً).</li><li>13 – 19: الجزء الأول يخالف والثاني يطابق (خمسةَ عشرَ ميلاً / خمسَ عشرةَ ورقةً).</li>
<li>تمييز 3–10 جمع مجرور، وتمييز 11–99 مفرد منصوب.</li></ul>`},
{h:'5. التوابع والأساليب',html:`<ul><li><b>النعت</b> يتبع المنعوت في الإعراب والتعريف والتنكير. <b>البدل</b>: قال الخليفةُ عمرُ. <b>التوكيد المعنوي</b>: نفس، عين، كل، جميع، كلا، كلتا.</li>
<li><b>المنادى</b>: المضاف منصوب (يا عبدَ الله)، والنكرة المقصودة والعلم مبنيان على الضم (يا طالبُ).</li>
<li><b>التعجب</b>: ما أفعلَه! / أفعِلْ به! — <b>المدح والذم</b>: نِعمَ وبئسَ.</li>
<li><b>الاستفهام</b>: «هل» للتصديق (نعم/لا)، والأسماء (من، ما، أين...) للتصوّر، والهمزة للاثنين.</li>
<li><b>إذا</b> ظرف شرطي غير جازم. <b>لم</b> حرف نفي وجزم وقلب. <b>لن</b> نفي ونصب واستقبال. <b>لا الناهية</b> تجزم.</li>
<li><b>أنواع اللام</b>: لام الجحود (ما كان الله ليعذبهم)، لام التعليل (جئتُ لأتعلم)، لام الأمر (لِيُنفقْ)، لام الابتداء (لَأنتم أشد).</li></ul>`},
{h:'6. الصرف',html:`<table><tr><th>المصطلح</th><th>المعنى</th><th>مثال</th></tr>
<tr><td>المثال</td><td>فاؤه حرف علة</td><td>وعد، يسر</td></tr><tr><td>الأجوف</td><td>عينه حرف علة</td><td>قال، باع</td></tr>
<tr><td>الناقص</td><td>لامه حرف علة</td><td>سعى، دعا</td></tr><tr><td>اللفيف المقرون</td><td>حرفا علة متجاوران</td><td>طوى، روى</td></tr>
<tr><td>اللفيف المفروق</td><td>حرفا علة بينهما صحيح</td><td>وقى، وفى</td></tr><tr><td>المضعّف</td><td>عينه ولامه من جنس واحد</td><td>مدّ، شدّ</td></tr>
<tr><td>المهموز</td><td>أحد أصوله همزة</td><td>أخذ، سأل، قرأ</td></tr></table>
<ul><li>الميزان الصرفي (ف ع ل): أكارم = أفاعل، اتّصال = افتعال، استخراج = استفعال.</li>
<li>اسم الفاعل من الثلاثي «فاعل» ومن غيره بميم مضمومة وكسر ما قبل الآخر (مُستخرِج). اسم المفعول من الثلاثي «مفعول» ومن غيره بفتح ما قبل الآخر (مُستخرَج).</li>
<li>اسم الآلة: مِفعال (مفتاح)، مِفعَل (مِبرد)، مِفعَلة (مِكنسة). اسم المكان من «يجلِس» مَجلِس.</li>
<li>مثنى المقصور الثلاثي يُرد إلى أصله: عصا ← عصوان، فتى ← فتيان.</li></ul>`},
{h:'7. الإملاء',html:`<ul><li><b>همزة الوصل</b>: أمر الثلاثي (اكتبْ، اسعَ)، ماضي ومصدر وأمر الخماسي والسداسي (انطلق، استخراج)، والأسماء: ابن، ابنة، اسم، امرؤ، امرأة، اثنان، اثنتان، و«ال».</li>
<li><b>همزة القطع</b>: ماضي الرباعي ومصدره وأمره (أكرم، إكرام، أكرِمْ)، والضمائر (أنا، أنت)، وأغلب الأسماء والحروف (أب، إلى، أنّ).</li>
<li><b>الهمزة المتوسطة</b>: تُكتب على حرف يناسب أقوى الحركتين (الكسرة ← ياء، الضمة ← واو، الفتحة ← ألف): سُئِل، رُؤوس، مسؤول، بِئر.</li>
<li><b>الهمزة المتطرفة</b>: حسب حركة ما قبلها، وعلى السطر بعد الساكن (سماء، شيء).</li>
<li><b>الألف اللينة</b>: في الثلاثي ترجع لأصلها (دعا/يدعو ← قائمة، رمى/يرمي ← مقصورة)، وفوق الثلاثي مقصورة (مصطفى، استدعى) إلا إذا سبقتها ياء (دنيا، استحيا).</li>
<li><b>التاء</b>: مفتوحة في جمع المؤنث السالم والأفعال (بنات، كتبتْ)، ومربوطة في جمع التكسير الذي لا ينتهي مفرده بتاء (قُضاة، دُعاة).</li>
<li>كلمات شائعة: هذا، لكنّ، مئة، إن شاء الله، المظاهرات (ظاء).</li></ul>`},
{h:'8. الثقافة اللغوية',html:`<ul><li>النحو: أحوال أواخر الكلم. الصرف: أبنية الكلمة. العروض: أوزان الشعر (وضعه الخليل الفراهيدي). البلاغة: المعاني والبيان والبديع.</li>
<li>أبو الأسود الدؤلي: أول من وضع النحو على الأشهر. سيبويه: «الكتاب». الخليل: معجم «العين» أول معجم. ابن منظور: «لسان العرب». الفيروزآبادي: «القاموس المحيط».</li>
<li>المعرَّب: لفظ أجنبي غُيّر ليوافق أوزان العرب. الدخيل: دخل بلا تغيير.</li>
<li>أصوات الحيوانات: زئير الأسد، صهيل الخيل، عواء الذئب، نهيق الحمار، خوار البقر، ثغاء الشاة، رغاء البعير، هديل الحمام، نعيق الغراب، نقيق الضفدع، فحيح الأفعى، مواء القطة، نباح الكلب.</li>
<li>الحروف الشفوية: الباء والميم والواو.</li></ul>`},
{h:'9. البلاغة',html:`<ul><li><b>التشبيه</b> أركانه أربعة: المشبه، المشبه به، الأداة، وجه الشبه. البليغ: حُذفت الأداة ووجه الشبه (العلم نور).</li>
<li><b>الاستعارة التصريحية</b>: يُصرّح بالمشبه به (رأيتُ أسدًا يخطب). <b>المكنية</b>: يُحذف المشبه به ويبقى شيء من لوازمه (واشتعل الرأس شيبًا).</li>
<li><b>الكناية</b>: لفظ يُراد به لازم معناه (كثير الرماد = كريم).</li>
<li><b>الطباق</b>: كلمتان متضادتان. <b>المقابلة</b>: معنيان أو أكثر يقابلهما أضدادهما. <b>الجناس التام</b>: اتفاق اللفظين واختلاف المعنى.</li></ul>`}
]},
english: {
title:'English Summary — INELT', sub:'Grammar • Language Functions • Conversation • Reading • Vocabulary',
sections:[
{h:'1. Tenses at a glance',html:`<table><tr><th>Tense</th><th>Form</th><th>Example / key words</th></tr>
<tr><td>Present simple</td><td>V / V+s</td><td>She <b>works</b> every day. (always, usually)</td></tr>
<tr><td>Present continuous</td><td>am/is/are + V-ing</td><td>The water <b>is boiling</b> now.</td></tr>
<tr><td>Present perfect</td><td>have/has + p.p.</td><td>I <b>have studied</b> for 5 hours. (since, for, already, yet)</td></tr>
<tr><td>Past simple</td><td>V2</td><td>I <b>saw</b> her <b>yesterday / last week</b>.</td></tr>
<tr><td>Past continuous</td><td>was/were + V-ing</td><td>I <b>was watching</b> TV when the phone rang.</td></tr>
<tr><td>Past perfect</td><td>had + p.p.</td><td>When we arrived, the thief <b>had left</b>.</td></tr>
<tr><td>Future</td><td>will + V</td><td>If it rains, we <b>will stay</b> home.</td></tr>
<tr><td>Future perfect</td><td>will have + p.p.</td><td>By then I <b>will have finished</b>.</td></tr></table>`},
{h:'2. Conditionals, Passive, Reported speech',html:`<ul><li>Zero: If + present, present (If you heat ice, it melts).</li><li>First: If + present, will + V.</li>
<li>Second: If + past (were), would + V.</li><li>Third: If + had + p.p., would have + p.p.</li>
<li>Passive: be + p.p. → English <b>is spoken</b>; The letter <b>was sent</b>; The bridge <b>will be built</b>.</li>
<li>Reported speech: tense goes one step back (is → was, will → would). Questions use statement order: He asked where I <b>lived</b>.</li>
<li>Indirect questions: Do you know when <b>it will be</b> ready? (not "will it be")</li></ul>`},
{h:'3. Small words that are often tested',html:`<ul><li>Prepositions of time: <b>at</b> 9 o'clock, <b>on</b> Tuesday, <b>in</b> 2027 / in May.</li>
<li><b>since</b> + point in time (since 2015); <b>for</b> + period (for ten years).</li>
<li>too + adj (too heavy); adj + enough (old enough); enough + noun (enough chairs).</li>
<li>much + uncountable (money, information); many + countable (books).</li>
<li>Relative pronouns: who (people), which (things), whose (possession), where (place).</li>
<li>Gerund after enjoy, finish, avoid, be used to; to-infinitive after decide, want, hope.</li>
<li>Modals + base verb: must show, can go, should see. "must be" = strong deduction.</li>
<li>each other = reciprocal; a friend of <b>mine/yours</b>; the same <b>as</b>.</li></ul>`},
{h:'4. Language Functions (وظائف اللغة)',html:`<table><tr><th>Function</th><th>Typical expressions</th></tr>
<tr><td>Offering</td><td>Would you like...? Shall I...? Can I help you?</td></tr>
<tr><td>Suggesting</td><td>Let's... Why don't we...? How about...?</td></tr>
<tr><td>Requesting</td><td>Could you...? Would you mind + V-ing?</td></tr>
<tr><td>Asking permission</td><td>May I...? Could I...? Do you mind if I...?</td></tr>
<tr><td>Advising</td><td>You should... You'd better... If I were you...</td></tr>
<tr><td>Apologizing</td><td>I'm sorry... I apologize... → Never mind / That's OK</td></tr>
<tr><td>Thanking</td><td>Thank you... → You're welcome / Not at all</td></tr>
<tr><td>Refusing politely</td><td>I'm afraid I can't... I'd love to, but...</td></tr>
<tr><td>Regret</td><td>I wish I had... If only I had...</td></tr>
<tr><td>Sympathy</td><td>I'm sorry to hear that. I'm sorry for your loss.</td></tr>
<tr><td>Congratulating</td><td>Congratulations! Well done!</td></tr>
<tr><td>Warning</td><td>Watch out! Be careful! Mind the step!</td></tr>
<tr><td>Agreeing / Disagreeing</td><td>I agree. Exactly. / I'm not sure... I see your point, but...</td></tr>
<tr><td>Leave-taking</td><td>Goodbye. See you later. Take care.</td></tr></table>`},
{h:'5. Conversation & Reading strategy',html:`<ul><li>Conversation questions ask "What does the man/woman mean?". Focus on the <b>last speaker</b> and on idioms: a piece of cake (easy), raining cats and dogs (heavy rain), without a hitch (smoothly), Is it ever! (strong yes).</li>
<li>Reading: read the <b>questions first</b>, then scan the passage. Question types: main idea, specific detail, word meaning in context, synonym/opposite, what a pronoun refers to (it/they), NOT mentioned, type of text.</li>
<li>For "NOT mentioned" questions, tick each option you find in the text; the one left is the answer.</li>
<li>Pronoun reference: look at the nearest noun <b>before</b> the pronoun that matches in number.</li></ul>
<div class="tip">💡 According to student reports on Telegram (unofficial), the INELT is often divided into four parts of about 10 questions each: grammar, language functions, conversation and reading. Each question is worth 2.5 marks (40 × 2.5 = 100).</div>`},
{h:'6. Useful vocabulary',html:`<table><tr><th>Word</th><th>Meaning</th><th>Synonym / Opposite</th></tr>
<tr><td>ancient</td><td>قديم</td><td>≠ modern</td></tr><tr><td>rapid</td><td>سريع</td><td>= fast</td></tr>
<tr><td>accurate</td><td>دقيق</td><td>≠ inaccurate</td></tr><tr><td>essential</td><td>ضروري</td><td>= necessary</td></tr>
<tr><td>reluctant</td><td>متردد</td><td>= unwilling</td></tr><tr><td>significantly</td><td>بشكل كبير</td><td>= greatly</td></tr>
<tr><td>chronic</td><td>مزمن</td><td>≠ short-term</td></tr><tr><td>loyal</td><td>وفيّ</td><td>= faithful</td></tr>
<tr><td>increase</td><td>يزيد</td><td>≠ decrease</td></tr><tr><td>moreover</td><td>علاوة على ذلك</td><td>= furthermore</td></tr></table>
<p>Word families: decide → decision → decisive; success → succeed → successful → successfully.</p>`}
]},
computer: {
title:'ملخص الحاسوب — INCPT', sub:'الأسئلة في الامتحان الحقيقي باللغة الإنكليزية — راجع المصطلحات بالإنكليزي',
sections:[
{h:'1. أساسيات الحاسوب',html:`<ul><li><b>Hardware</b> المكونات المادية: CPU (المعالج — دماغ الحاسوب)، RAM (ذاكرة مؤقتة تُمسح عند الإطفاء)، ROM (ذاكرة قراءة فقط دائمة)، HDD/SSD (تخزين دائم، SSD أسرع وبلا أجزاء متحركة).</li>
<li><b>Input</b>: Keyboard, Mouse, Scanner, Microphone. <b>Output</b>: Monitor, Printer, Speaker.</li>
<li>وحدات التخزين: 1 Byte = 8 bits، 1 KB = 1024 Bytes، ثم MB ثم GB ثم TB.</li>
<li>أنواع الحاسبات: Supercomputer (الأقوى)، Mainframe، Desktop/PC، Laptop، Tablet، Smartphone.</li>
<li><b>Software</b>: System software (نظام التشغيل: Windows, Linux, macOS, Android) و Application software (Word, Chrome...). BIOS برنامج الإقلاع وفحص العتاد.</li>
<li><b>ثقافة التراخيص</b>: License ترخيص الاستخدام، Freeware مجاني، Shareware تجريبي لفترة، Open-source مفتوح المصدر، Proprietary مملوك.</li></ul>`},
{h:'2. Windows 10 والاختصارات',html:`<table><tr><th>الاختصار</th><th>الوظيفة</th><th>الاختصار</th><th>الوظيفة</th></tr>
<tr><td>Ctrl+C / X / V</td><td>نسخ / قص / لصق</td><td>Ctrl+Z / Y</td><td>تراجع / إعادة</td></tr>
<tr><td>Ctrl+A</td><td>تحديد الكل</td><td>Alt+Tab</td><td>التنقل بين النوافذ</td></tr>
<tr><td>Alt+F4</td><td>إغلاق النافذة</td><td>Ctrl+Shift+Esc</td><td>مدير المهام</td></tr>
<tr><td>Win+D</td><td>سطح المكتب</td><td>Win+L</td><td>قفل الجهاز</td></tr>
<tr><td>Win+E</td><td>مستكشف الملفات</td><td>Win+R</td><td>نافذة Run</td></tr>
<tr><td>Win+I</td><td>الإعدادات</td><td>Win+Shift+S</td><td>لقطة شاشة جزئية</td></tr>
<tr><td>F2</td><td>إعادة تسمية</td><td>F5</td><td>تحديث</td></tr>
<tr><td>Shift+Delete</td><td>حذف نهائي</td><td>Alt+Shift</td><td>تبديل اللغة</td></tr></table>
<ul><li>Recycle Bin سلة المحذوفات ← Restore للاستعادة. Clipboard الحافظة. Taskbar شريط المهام.</li>
<li>Minimize تصغير، Maximize تكبير، Restore Down استعادة الحجم. Sleep سكون (الجلسة في الذاكرة)، Hibernate إسبات (الجلسة على القرص).</li>
<li>Control Panel ← Programs and Features لإلغاء تثبيت البرامج (أو Settings ← Apps).</li></ul>`},
{h:'3. الأمان والفيروسات',html:`<table><tr><th>المصطلح</th><th>المعنى</th></tr>
<tr><td>Virus</td><td>برنامج ضار ينسخ نفسه ويلحق بالملفات</td></tr><tr><td>Worm</td><td>ينتشر ذاتياً عبر الشبكة</td></tr>
<tr><td>Trojan horse</td><td>يتنكر كبرنامج مفيد</td></tr><tr><td>Ransomware</td><td>يشفّر الملفات ويطلب فدية</td></tr>
<tr><td>Spyware</td><td>يتجسس ويجمع المعلومات</td></tr><tr><td>Phishing</td><td>رسائل مزيفة لسرقة كلمات المرور</td></tr>
<tr><td>Firewall</td><td>جدار ناري يراقب حركة الشبكة</td></tr><tr><td>Antivirus</td><td>برنامج مكافحة الفيروسات</td></tr>
<tr><td>Encryption</td><td>تشفير البيانات</td></tr><tr><td>Backup</td><td>نسخة احتياطية</td></tr></table>
<div class="tip">💡 كلمة المرور القوية: 8 أحرف فأكثر تمزج حروفاً كبيرة وصغيرة وأرقاماً ورموزاً. فعّل المصادقة الثنائية 2FA.</div>`},
{h:'4. Microsoft Word 2016',html:`<ul><li>الامتداد <b>.docx</b>. التبويبات: Home (تنسيق الخط والفقرة)، Insert (صورة، جدول، رأس وتذييل، ارتباط)، Design، Layout (الهوامش، الاتجاه، الحجم)، References (جدول المحتويات، الحواشي)، Mailings، Review (التدقيق، تعقب التغييرات)، View.</li>
<li>Ctrl+B غامق، Ctrl+I مائل، Ctrl+U تسطير، Ctrl+E توسيط، Ctrl+L يسار، Ctrl+R يمين، Ctrl+J ضبط.</li>
<li>Ctrl+N جديد، Ctrl+O فتح، Ctrl+S حفظ، F12 حفظ باسم، Ctrl+P طباعة، Ctrl+F بحث، Ctrl+H استبدال، Ctrl+K ارتباط، Ctrl+Enter فاصل صفحة، F7 تدقيق إملائي.</li>
<li>Portrait عمودي / Landscape أفقي. Header رأس الصفحة / Footer تذييل. Format Painter نسخ التنسيق. الحفظ PDF: File ← Save As ← PDF.</li>
<li>الخط الأحمر المتموج = خطأ إملائي، والأزرق (أو الأخضر في الإصدارات القديمة) = نحوي.</li></ul>`},
{h:'5. Microsoft Excel 2016',html:`<ul><li>الامتداد <b>.xlsx</b>. الملف Workbook (Book1) يحتوي أوراق Worksheets (Sheet1). الخلية Cell تقاطع صف وعمود (A1). النطاق Range (A1:A5).</li>
<li>عدد الصفوف <b>1,048,576</b> والأعمدة <b>16,384</b> (آخر عمود XFD). أقصى عرض للعمود 255 حرفاً.</li>
<li>كل صيغة تبدأ بـ <b>=</b>. الدوال: SUM جمع، AVERAGE متوسط، MAX أكبر، MIN أصغر، COUNT يعدّ الأرقام، COUNTA يعدّ غير الفارغ، IF شرط.</li>
<li>المرجع المطلق <b>$A$1</b> لا يتغير عند النسخ، والنسبي A1 يتغير، والمختلط $A1 أو A$1.</li>
<li>Wrap Text التفاف النص، Merge & Center دمج وتوسيط، Freeze Panes تجميد الأجزاء، Alt+Enter سطر جديد داخل الخلية.</li>
<li>الأخطاء: #DIV/0! قسمة على صفر، #NAME? اسم دالة خاطئ، #VALUE! نوع بيانات خاطئ، #REF! مرجع غير صالح، #### العمود ضيق.</li>
<li>المخططات: Pie للنسب من الكل، Column/Bar للمقارنة، Line للتغير عبر الزمن.</li></ul>`},
{h:'6. Microsoft PowerPoint 2016',html:`<ul><li>الامتداد <b>.pptx</b>. F5 بدء العرض من البداية، Shift+F5 من الشريحة الحالية، Esc إنهاء العرض.</li>
<li>Ctrl+M شريحة جديدة، Ctrl+D تكرار الشريحة. Hide Slide إخفاء الشريحة (تبويب Slide Show).</li>
<li>Views: Normal، Slide Sorter (فارز الشرائح لترتيبها)، Notes Page، Reading View، Slide Show.</li>
<li>Transitions انتقالات بين الشرائح، Animations حركات للعناصر. Theme / Slide Master لتوحيد مظهر كل الشرائح. Layout ترتيب العناصر داخل الشريحة.</li></ul>`},
{h:'7. الإنترنت والبريد الإلكتروني والذكاء الاصطناعي',html:`<ul><li>WWW = World Wide Web. URL عنوان الصفحة. IP عنوان الجهاز الرقمي. DNS يحوّل اسم الموقع إلى IP. ISP مزوّد الخدمة. HTTPS اتصال مشفّر.</li>
<li>LAN شبكة محلية، WAN شبكة واسعة، Wi-Fi اتصال لاسلكي. Browser متصفح (Chrome, Edge, Firefox). Search engine محرك بحث (Google, Bing).</li>
<li>Ctrl+T تبويب جديد، Ctrl+W إغلاقه، Ctrl+H السجل، Ctrl+Shift+Delete مسح بيانات التصفح. Bookmark إضافة للمفضلة.</li>
<li>البريد: To، CC نسخة مرئية، BCC نسخة مخفية، Subject الموضوع، Attachment مرفق، Drafts مسودات، Spam بريد مزعج، Inbox الوارد، Sent المرسل.</li>
<li>Upload رفع، Download تنزيل، Cloud storage تخزين سحابي (Google Drive, OneDrive).</li>
<li><b>AI</b>: قدرة الحاسوب على أداء مهام تحتاج ذكاءً بشرياً. Machine Learning تعلّم من البيانات، NLP فهم اللغة، Computer Vision التعرّف على الصور والوجوه، Chatbot برنامج محادثة.</li></ul>
<div class="tip">💡 حسب منشورات المدرسين على تيليجرام: أغلب الدرجات على Windows وWord، ثم الفيروسات ونظم التشغيل، ودوال Excel، والإنترنت والبريد، والذكاء الاصطناعي — والاختصارات مهمة جداً.</div>`}
]}
};
