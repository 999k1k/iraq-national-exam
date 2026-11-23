/* محتوى دليل الاختبار الوطني — كل معلومة مربوطة بمصدرها (انظر RESEARCH-NOTES.md).
   الوسوم: off = مصدر رسمي (الوزارة/موقع الحجز/مواقع الجامعات)، tg = تجارب الطلبة (تيليجرام، غير رسمي)، tip = نصيحة من المنصة. */
window.GUIDE = (function(){
const S={
 samarra:{n:'دليل جامعة سامراء 2025-2026',u:'https://uosamarra.edu.iq/uos-inpt/'},
 uob:{n:'مركز التعليم المستمر – جامعة بغداد',u:'https://dcec.uobaghdad.edu.iq/?page_id=28276'},
 mawazin:{n:'ضوابط الوزارة 2026-2027 (موازين نيوز 13/11/2025)',u:'https://www.mawazin.net/Details.aspx?jimare=270267'},
 inpt:{n:'موقع الحجز الرسمي inpt.rdd.edu.iq (صفحة الملف الشخصي/الشهادات)',u:'https://inpt.rdd.edu.iq/'},
 kirkuk:{n:'مركز الحاسبة – جامعة كركوك (إعلانات تشرين الأول 2026)',u:'https://www.facebook.com/'},
 karbala:{n:'مركز الحاسبة – جامعة كربلاء (إعلان 2026)',u:'https://cc.uokerbala.edu.iq/'},
 nahrain:{n:'مركز الحاسبة – جامعة النهرين (8/12/2025)',u:'https://cc.nahrainuniv.edu.iq/'},
 mtu:{n:'مركز التعليم المستمر – الجامعة التقنية الوسطى',u:'https://ce.mtu.edu.iq/ce/pages/national-testing-laboratory?lang=ar'},
 alameed:{n:'كتاب الاختبارات الوطنية (PDF – جامعة العميد 2026)',u:'https://alameed.edu.iq/'},
 polytech:{n:'كلية البوليتكنك – كربلاء',u:'https://ikr.atu.edu.iq/'},
 tg:{n:'قنوات تيليجرام العامة للطلبة',u:'https://t.me/s/alaikhtibarhdhkeoe'}
};
S.kirkuk.u='https://www.unis10.com/IQ/Kirkuk/1172241122632731/';
const overview=[
 ['الجهة المنظمة','وزارة التعليم العالي والبحث العلمي – دائرة البحث والتطوير. تُجرى في مراكز الحاسبة ومراكز التعليم المستمر في الجامعات.','off',['samarra','uob']],
 ['لمن؟','شرط أساسي للتقديم على الدراسات العليا داخل العراق (دبلوم عالي، ماجستير، دكتوراه) بالدرجات المطلوبة لتخصصك.','off',['mawazin','samarra']],
 ['ثلاثة اختبارات منفصلة','اللغة العربية • اللغة الإنكليزية (INELT) • الحاسوب (INCPT). كل اختبار يُحجز ويُؤدّى ويُحسب وحده.','off',['samarra','uob']],
 ['النمط','أسئلة اختيار من متعدد (MCQ) على الحاسبة في قاعة المركز.','off',['mtu']],
 ['المدة وعدد الأسئلة','60 دقيقة لكل اختبار. العربية 60 سؤالاً، الإنكليزية 40، الحاسوب 40.','off',['samarra','uob','alameed']],
 ['الرسوم','30,000 دينار للمحاولة الأولى للمادة، و20,000 دينار لكل محاولة لاحقة.','off',['samarra','uob','nahrain']],
 ['صلاحية الشهادة','سنتان (بعض المراكز تحسبها من تاريخ أداء الاختبار وبعضها من تاريخ الإصدار).','off',['uob','samarra']],
 ['لغة اختبار الحاسوب','الأسئلة بالإنكليزية — لذلك احفظ المصطلحات والاختصارات بالإنكليزية.','off',['nahrain']],
 ['قيمة السؤال','في الإنكليزي والحاسوب: 40 سؤالاً × 2.5 = 100 (حسب الطلبة، غير منشور رسمياً). في العربي 60 سؤالاً ≈ 1.67 لكل سؤال إذا تساوت الأسئلة (حساب تقديري).','tg',['tg']]
];
const pass={
 arabic:{src:['samarra','uob','alameed'],rows:[['ماجستير / دكتوراه — جميع التخصصات',50],['ماجستير — تخصص اللغة العربية',60],['دكتوراه — تخصص اللغة العربية',70]]},
 english:{src:['samarra','polytech'],cefr:true,rows:[['دبلوم عالي (علمي / إنساني)',50,'A1'],['ماجستير — إنساني (عدا الإنكليزية)',50,'A1'],['دكتوراه — إنساني (عدا الإنكليزية)',55,'A2'],['ماجستير — علمي (هندسة، إدارة، علوم تطبيقية)',60,'B1'],['دكتوراه — علمي',65,'B2'],['ماجستير — طبي (طب، أسنان، صيدلة) / إنكليزي وترجمة',70,'C1'],['دكتوراه — طبي / إنكليزي وترجمة / البورد',75,'C2']],
  note:'دليل جامعة سامراء يذكر مدى 60–65 لماجستير العلمي و65–70 لدكتوراه العلمي، ومستويات CEFR المقابلة؛ اعتمد ما يحدده إعلان القبول لقسمك.'},
 computer:{src:['samarra','uob'],rows:[['ماجستير — إنساني',50],['دكتوراه — إنساني',55],['ماجستير — علمي',60],['دكتوراه — علمي (عدا الحاسبات)',65],['ماجستير — حاسبات',70],['دكتوراه — حاسبات',75]]}
};
const booking=[
 {h:'أنشئ حساباً على موقع الحجز',b:'ادخل <a href="https://inpt.rdd.edu.iq" target="_blank" rel="noopener" class="ltr">inpt.rdd.edu.iq</a> واختر «إنشاء حساب جديد». اكتب معلوماتك الشخصية <b>كما في بطاقتك الوطنية بالضبط</b>. في الموقع فيديو تعليمي لإنشاء الحساب (صفحة EducationalVideos). بعض المراكز (مثل كربلاء) تعطي رابط تسجيل خاص للمرة الأولى.',src:['inpt','kirkuk','karbala']},
 {h:'احفظ البريد وكلمة المرور',b:'ستحتاجهما لحجز موعد جديد، وتفعيل المحاولات عند الإعادة، و<b>طباعة الشهادة بعد النجاح</b>.',src:['kirkuk']},
 {h:'اختر الاختبار والمركز والموعد',b:'بعد تسجيل الدخول اختر المادة (عربي / إنكليزي / حاسوب) ثم المركز الامتحاني (الجامعة) ثم موعداً متاحاً. تُعلن المراكز مواعيد كل أسبوع في صفحاتها.',src:['nahrain','karbala']},
 {h:'ادفع الرسوم وأكّد الحجز في المركز',b:'راجع المركز (قسم المالية) وادفع الرسوم ثم سلّم الوصل لتأكيد الحجز. في عدة مراكز يكون الدفع <b>بالبطاقة الإلكترونية فقط</b> (ماستركارد باسم الممتحن) وليس نقداً.',src:['kirkuk','karbala','nahrain']},
 {h:'انتبه لمهلة التأكيد',b:'إذا لم يُؤكَّد الحجز ويُدفع ضمن المهلة يُلغى. نص موقع الحجز: «يغلق تأكيد الحجز قبل ساعة من بدء الاختبار، ويحق للمركز إلغاء الحجز بعد 48 ساعة من تاريخ الحجز في حال عدم الدفع والتأكيد». ضوابط الوزارة تذكر 72 ساعة، وتختلف التفاصيل بين المراكز — اقرأ إعلان مركزك.',src:['inpt','mawazin','samarra']},
 {h:'احضر يوم الاختبار مبكراً',b:'قبل الموعد بساعة تقريباً، ومعك <b>البطاقة الوطنية الأصلية أو جواز السفر الأصلي</b> (بدونه لا يُسمح لك بالدخول).',src:['samarra','kirkuk','inpt']},
 {h:'بعد النجاح: اطبع شهادتك',b:'من حسابك على موقع الحجز، صفحة «شهادات الاختبار» ← «تأكيد البيانات لطباعة الشهادة». يذكر طلبة أن تفعيل «وضع سطح المكتب» في متصفح الهاتف يسهّل تنزيلها.',src:['inpt','tg']}
];
const day={
 bring:[['البطاقة الوطنية الموحدة الأصلية أو جواز السفر الأصلي','off'],['وصل الدفع / تأكيد الحجز (حسب المركز)','off'],['حضور مبكر بساعة','off']],
 banned:[['الهاتف المحمول','off'],['الساعة الذكية والسماعات والأقلام الذكية وأي جهاز إلكتروني — ضبط أي جهاز يُعد غشاً','off'],['القصاصات الورقية وأي مواد متعلقة بالاختبار','off']],
 cheating:['التكلم أثناء الامتحان','النظر إلى حاسبة طالب آخر','انتحال الشخصية','استخدام وسائل غير مسموح بها','استبدال ورقة دخول الامتحان مع طالب آخر','حيازة أي جهاز إلكتروني'],
 tips:['نم جيداً ليلة الاختبار؛ المراجعة الخفيفة أفضل من السهر.','تناول وجبة خفيفة وماء قبل الدخول.','اقرأ السؤال كاملاً — خصوصاً كلمات مثل NOT و EXCEPT و «ليس».','قسّم الوقت: العربي دقيقة لكل سؤال، الإنكليزي والحاسوب دقيقة ونصف.','أجب عن كل الأسئلة؛ إن لم تعرف استبعد الخيارات الخاطئة ثم اختر.','علّم الأسئلة الصعبة وارجع لها في النهاية إن أتاح النظام ذلك.','في القطعة: اقرأ الأسئلة أولاً ثم ابحث عن الإجابة في النص.','تحقق من إجاباتك قبل التسليم إن بقي وقت.']
};
const eligibility=[
 ['المتقدمون للدراسات العليا داخل العراق','اجتياز الاختبارات بالدرجات المطلوبة شرط أساسي للتقديم.','off',['mawazin']],
 ['كليات الذكاء الاصطناعي','يُلزم المتقدمون إليها باجتياز اختباري اللغة الإنكليزية والحاسوب.','off',['mawazin']],
 ['ذوو الإعاقة','ضوابط 2026–2027 استثنت المكفوفين والصم وضعاف البصر والسمع، بشرط تقرير طبي رسمي يثبت نسبة عجز 50% فأكثر.','off',['mawazin']],
 ['الشهادات القديمة (للعام 2026–2027)','شهادات الكفاءة الصادرة قبل 12 شباط 2024 غير نافذة. شهادات العربية والحاسوب الصادرة قبل 1 تشرين الأول 2024 نافذة لذلك العام فقط بشرط ألا يتجاوز إصدارها سنتين.','off',['mawazin']],
 ['التخصص إنساني أم علمي؟','يحدد درجة الاجتياز. الإنساني: اللغات، الآداب، العلوم السياسية، التربية للعلوم الإنسانية، القانون، العلوم الإسلامية، الفقه، الإعلام، الآثار، وكليات التربية عدا أقسامها العلمية. العلمي: المجموعة الطبية، التمريض، البيطري، الهندسة، العلوم، علوم الحاسوب، الإدارة والاقتصاد، الزراعة، التقنيات، التربية البدنية، الفنون الجميلة… (القائمة الكاملة في دليل سامراء).','off',['samarra']]
];
const schedule={src:['samarra'],note:'مثال من جامعة سامراء — كل مركز ينشر جدوله، وقد يتغيّر حسب توجيهات الوزارة والعطل الرسمية.',
 rows:[['الأحد','الإنكليزية','العربية'],['الاثنين','الحاسوب','العربية'],['الثلاثاء','العربية','الإنكليزية'],['الأربعاء','الحاسوب','العربية'],['الخميس','الإنكليزية','الحاسوب']]};
const syllabus={
 arabic:{src:['samarra','uob','alameed'],items:['النحو والصرف','الأخطاء اللغوية والإملاء','الثقافة اللغوية']},
 english:{src:['alameed','polytech'],items:['Grammar: الأزمنة، أدوات الاستفهام والسؤال، المبني للمجهول، أدوات الربط، السبب والنتيجة','Language Functions (وظائف اللغة): المواقف والردود المؤدبة والتعبير بجمل قصيرة','Conversation (المحادثات الكتابية)','Reading / Comprehension (استيعاب القطع الخارجية)'],note:'التوزيع المتداول بين الطلبة: نحو 10 أسئلة لكل جزء (غير منشور رسمياً).'},
 computer:{src:['samarra','uob'],items:['أساسيات الحاسوب + Windows 10: أنواع الحاسبات ومكوناتها، الأمان والفيروسات، ثقافة التراخيص، سطح المكتب والنوافذ، لوحة التحكم، تثبيت البرامج وإلغاؤها، المجلدات والملفات، الحذف والاستعادة','MS Word 2016: إنشاء مستند، التحديد والتحرير، تنسيق النص والفقرات، تجهيز المستند للطباعة، التدقيق الإملائي','MS PowerPoint 2016: الواجهة، طرق التصميم، أنواع الشرائح، إضافة وتكرار وإخفاء الشرائح، طرق العرض','MS Excel 2016: الواجهة، التحرير، الدوال، التنسيق، الإعدادات، الطباعة','الإنترنت والبريد الإلكتروني: الشبكات، الويب، المتصفح، محركات البحث، البريد، حماية الحاسبات','مقدمة في الذكاء الاصطناعي']}
};
const faq=[
 ['هل الاختبار ورقي أم إلكتروني؟','إلكتروني على الحاسبة، أسئلة اختيار من متعدد.','off',['mtu']],
 ['كم مرة يمكنني الإعادة؟','لا يوجد حد منشور؛ يمكن الإعادة حتى الاجتياز، والمحاولة اللاحقة بـ 20,000 دينار.','off',['uob','samarra']],
 ['هل يجب أداء الاختبارات الثلاثة في يوم واحد؟','لا، كل اختبار يُحجز في موعد مستقل، وتختار المواد المطلوبة لقبولك.','off',['samarra']],
 ['هل أحتاج الاختبار العربي إذا كان تخصصي علمياً؟','الضوابط تذكر درجة 50 للعربية لجميع التخصصات (ماجستير/دكتوراه). تأكد من إعلان القبول لقسمك لمعرفة الاختبارات المطلوبة.','off',['samarra','uob']],
 ['متى تظهر النتيجة؟','يذكر الطلبة أن الدرجة تظهر بعد انتهاء الاختبار مباشرة، والشهادة تُطبع من الحساب لاحقاً.','tg',['tg']],
 ['ما مدة صلاحية الشهادة؟','سنتان. وانتبه لضوابط 2026–2027 الخاصة بالشهادات الصادرة قبل 12/2/2024 و1/10/2024 (انظر قسم الأهلية).','off',['uob','mawazin']],
 ['هل أستطيع الدفع نقداً؟','في مراكز كثيرة (كركوك، كربلاء، النهرين) الدفع بالبطاقة الإلكترونية فقط.','off',['kirkuk','karbala','nahrain']],
 ['هل أحتاج وسيطاً أو مكتباً للحجز؟','لا. الحجز مجاني من حسابك على الموقع، والرسوم تُدفع في المركز فقط. احذر من الإعلانات التي تطلب مبالغ مقابل «الحجز وسحب الشهادة».','tip',[]],
 ['ظهرت «محاولة ثانية» في وصلي وأنا أحجز لأول مرة؟','يذكر الطلبة أن ذلك لا يؤثر على الحجز أو الشهادة، وتأكد من موظف المركز قبل الدفع.','tg',['tg']],
 ['ماذا لو تأخرت أو لم أحضر؟','لا تحجز إن لم تكن متأكداً من الحضور؛ الحجز غير المؤكد يُلغى ويحق للمركز إلغاؤه بعد بدء الامتحان.','off',['mtu','polytech']],
 ['هل الدورات التحضيرية إلزامية؟','لا. الوزارة تركت إقامة الدورات للجامعات «على أن لا يكون عليها أي وزن في درجة النجاح».','off',['samarra']],
 ['هل أسئلة هذه المنصة هي أسئلة الوزارة؟','لا. هي أسئلة تدريبية على نمط الاختبار، بعضها نقله الطلبة من اختبارات سابقة، وراجعنا إجاباتها.','tip',[]]
];
const glossary=[
 ['INELT','Iraqi National English Language Test — الاختبار الوطني العراقي للغة الإنكليزية.','exam'],
 ['INCPT','Iraqi National Computer Proficiency Test — الاختبار الوطني لكفاءة الحاسوب.','exam'],
 ['دائرة البحث والتطوير (RDD)','الدائرة في وزارة التعليم العالي التي تنظّم الاختبارات (موقع الحجز inpt.rdd.edu.iq).','exam'],
 ['CEFR','الإطار الأوروبي المرجعي للغات (A1 → C2)؛ يُستخدم لتفسير درجة INELT.','exam'],
 ['تأكيد الحجز','مراجعة المركز ودفع الرسوم وتسليم الوصل قبل انتهاء المهلة، وإلا يُلغى الحجز.','exam'],
 ['المحاولة','كل مرة تؤدي فيها الاختبار؛ الأولى 30 ألف واللاحقة 20 ألف دينار.','exam'],
 ['MCQ','Multiple Choice Question — سؤال اختيار من متعدد.','exam'],
 ['CPU','Central Processing Unit — وحدة المعالجة المركزية «دماغ الحاسوب».','computer'],
 ['ALU / CU','وحدة الحساب والمنطق / وحدة التحكم — جزءان من المعالج.','computer'],
 ['RAM','Random Access Memory — ذاكرة مؤقتة متطايرة تفقد محتواها عند إطفاء الجهاز.','computer'],
 ['ROM','Read Only Memory — ذاكرة للقراءة فقط، دائمة.','computer'],
 ['Cache','ذاكرة سريعة صغيرة تسرّع المعالجة.','computer'],
 ['HDD / SSD','قرص صلب مغناطيسي / قرص حالة صلبة بلا أجزاء متحركة.','computer'],
 ['OS','Operating System — نظام التشغيل مثل Windows 10.','computer'],
 ['GUI','Graphical User Interface — واجهة رسومية.','computer'],
 ['Hardware / Software','المكونات المادية / البرمجيات.','computer'],
 ['Input / Output device','جهاز إدخال (لوحة مفاتيح، فأرة، ماسح) / إخراج (شاشة، طابعة، سماعة).','computer'],
 ['Bit / Byte','البت أصغر وحدة؛ البايت = 8 بت. KB ← MB ← GB ← TB.','computer'],
 ['Virus / Malware','برنامج ضار ينسخ نفسه ويؤذي الملفات / مصطلح عام للبرمجيات الخبيثة.','computer'],
 ['Phishing','التصيّد: رسائل أو مواقع مزيفة لسرقة كلمات المرور والبيانات.','computer'],
 ['Spoofing','تزوير هوية المرسل في البريد لخداع المستلم.','computer'],
 ['Firewall','جدار ناري يمنع الوصول غير المصرح به.','computer'],
 ['Spam','رسائل غير مرغوب بها.','computer'],
 ['URL','Uniform Resource Locator — عنوان صفحة الويب.','computer'],
 ['HTTP / HTTPS','بروتوكول نقل صفحات الويب / النسخة الآمنة المشفّرة (قفل في شريط العنوان).','computer'],
 ['FTP','File Transfer Protocol — نقل الملفات.','computer'],
 ['SMTP / POP3 / IMAP','إرسال البريد / استلامه وتنزيله / استلامه مع إبقائه على الخادم.','computer'],
 ['DNS','Domain Name System — يحوّل اسم الموقع إلى عنوان IP.','computer'],
 ['IP address','عنوان رقمي يميّز كل جهاز على الشبكة.','computer'],
 ['ISP','Internet Service Provider — مزوّد خدمة الإنترنت.','computer'],
 ['LAN / WAN','شبكة محلية / شبكة واسعة تغطي مساحة جغرافية كبيرة (الإنترنت أكبرها).','computer'],
 ['VPN','Virtual Private Network — شبكة خاصة افتراضية مشفّرة.','computer'],
 ['Router / Switch / Modem','الموجّه يربط الشبكات ويوجه البيانات / المبدّل يربط الأجهزة داخل الشبكة / المودم يوصل بالإنترنت.','computer'],
 ['Download / Upload','تنزيل من الإنترنت إلى جهازك / رفع من جهازك إلى الإنترنت.','computer'],
 ['Cookie','ملف صغير يخزّنه الموقع في المتصفح.','computer'],
 ['AI / Machine Learning','الذكاء الاصطناعي / تعلّم الآلة من البيانات.','computer'],
 ['Chatbot','برنامج يحاكي المحادثة مع المستخدم.','computer'],
 ['Cell / Range','خلية (مثل A1) / نطاق (مثل A1:B10) في Excel.','computer'],
 ['Workbook / Worksheet','المصنّف (ملف Excel) / ورقة العمل داخله.','computer'],
 ['Absolute reference','مرجع مطلق ثابت عند النسخ: $A$1.','computer'],
 ['Slide Master','الشريحة الرئيسية: تتحكم بتصميم وتخطيط كل الشرائح.','computer'],
 ['Transition / Animation','انتقال بين الشرائح / حركة لعنصر داخل الشريحة.','computer'],
 ['Tense','الزمن: Present / Past / Future بأنواعه Simple, Continuous, Perfect.','english'],
 ['Passive voice','المبني للمجهول: be + V3 (The letter was written).','english'],
 ['Reported speech','الكلام المنقول: يرجع الزمن خطوة للماضي غالباً.','english'],
 ['Conditional','جمل الشرط: Zero / First / Second / Third.','english'],
 ['Relative pronoun','who للعاقل، which لغير العاقل، whose للملكية، where للمكان.','english'],
 ['Language function','وظيفة الكلام: طلب، اعتذار، اقتراح، شكر، تحذير، نصيحة، رفض…','english'],
 ['Idiom','تعبير اصطلاحي معناه غير حرفي: raining cats and dogs = مطر غزير.','english'],
 ['Gerund / Infinitive','الفعل + ing كاسم (reading) / to + الفعل (to read).','english'],
 ['Modal verbs','can, could, may, might, must, should, would…','english'],
 ['الإعراب / البناء','تغيّر آخر الكلمة بتغيّر موقعها / لزومها حالة واحدة.','arabic'],
 ['الأسماء الخمسة','أب، أخ، حم، فو، ذو: تُرفع بالواو وتُنصب بالألف وتُجر بالياء.','arabic'],
 ['الأفعال الخمسة','يفعلان، تفعلان، يفعلون، تفعلون، تفعلين: تُرفع بثبوت النون وتُنصب وتُجزم بحذفها.','arabic'],
 ['الممنوع من الصرف','لا يُنوَّن ويُجر بالفتحة نيابة عن الكسرة (ما لم يُعرَّف أو يُضف).','arabic'],
 ['النواسخ','كان وأخواتها (ترفع الاسم وتنصب الخبر)، إنّ وأخواتها (تنصب الاسم وترفع الخبر)، ظن وأخواتها.','arabic'],
 ['الميزان الصرفي','وزن الكلمة على (ف ع ل) مثل: كاتب = فاعل، استخرج = استفعل.','arabic'],
 ['المجرد / المزيد','فعل كل حروفه أصلية / فيه حرف أو أكثر زائد.','arabic'],
 ['المقصور / المنقوص / الممدود','ينتهي بألف لازمة (مصطفى) / بياء قبلها كسر (القاضي) / بهمزة قبلها ألف زائدة (صحراء).','arabic'],
 ['همزة الوصل / القطع','تُنطق في البدء وتسقط في الدرج (اسم، ابن، استخرج) / تُكتب وتُنطق دائماً (أكرم، إلى).','arabic'],
 ['الاستثناء المفرغ','حُذف فيه المستثنى منه والكلام منفي: «ما نجح إلا زيدٌ».','arabic'],
 ['الإغراء / التحذير','حث على أمر محمود (أخاك أخاك) / تنبيه من مكروه (إياك والكذبَ).','arabic'],
 ['التشبيه','إلحاق أمر بآخر بأداة (الكاف، مثل، كأنّ) لصفة مشتركة.','arabic']
];
/* ورقة مراجعة سريعة لكل مادة */
const cheats={
arabic:`
<div class="cs-grid">
<div class="cs"><h4>علامات الإعراب الفرعية</h4><table><tr><th></th><th>رفع</th><th>نصب</th><th>جر/جزم</th></tr>
<tr><td>المثنى</td><td>الألف</td><td>الياء</td><td>الياء</td></tr><tr><td>جمع المذكر السالم</td><td>الواو</td><td>الياء</td><td>الياء</td></tr>
<tr><td>جمع المؤنث السالم</td><td>الضمة</td><td>الكسرة</td><td>الكسرة</td></tr><tr><td>الأسماء الخمسة</td><td>الواو</td><td>الألف</td><td>الياء</td></tr>
<tr><td>الممنوع من الصرف</td><td>الضمة</td><td>الفتحة</td><td>الفتحة</td></tr><tr><td>الأفعال الخمسة</td><td>ثبوت النون</td><td>حذف النون</td><td>حذف النون</td></tr>
<tr><td>المضارع المعتل الآخر</td><td>ضمة مقدّرة</td><td>فتحة (ظاهرة على الواو والياء)</td><td>حذف حرف العلة</td></tr></table></div>
<div class="cs"><h4>النواسخ بسرعة</h4><ul><li><b>كان وأخواتها</b>: كان، أصبح، أضحى، ظل، أمسى، بات، صار، ليس، ما زال، ما برح، ما فتئ، ما انفك، ما دام ← ترفع الاسم وتنصب الخبر.</li>
<li><b>إنّ وأخواتها</b>: إنّ، أنّ، كأنّ (تشبيه)، لكنّ (استدراك)، ليت (تمنّي)، لعلّ (ترجّي) ← تنصب الاسم وترفع الخبر.</li>
<li><b>لا النافية للجنس</b> تعمل عمل إنّ: لا طالبَ غائبٌ.</li></ul></div>
<div class="cs"><h4>العدد</h4><ul><li>الواحد والاثنان: يوافقان المعدود دائماً.</li><li>3–10: تخالف المعدود: ثلاثةُ كتبٍ، ثلاثُ طالباتٍ.</li><li>11–12: يوافق الجزآن: أحدَ عشرَ طالباً، اثنتا عشرةَ طالبةً.</li><li>13–19: الجزء الأول يخالف والثاني يوافق: خمسَ عشرةَ طالبةً.</li><li>ألفاظ العقود (عشرون…تسعون) ثابتة، والمعدود بعد 11–99 مفرد منصوب.</li></ul></div>
<div class="cs"><h4>المنصوبات</h4><ul><li>المفعول به، المفعول المطلق (ضربَ ضرباً)، المفعول لأجله (قمت احتراماً)، المفعول فيه (ظرف: يومَ، أمامَ)، المفعول معه (سرت والنهرَ).</li><li>الحال (جاء مسرعاً)، التمييز (اشتريت رطلاً عسلاً)، المستثنى بإلا في الكلام التام المثبت.</li></ul></div>
<div class="cs"><h4>الصرف</h4><ul><li>أوزان الثلاثي المجرد في الماضي: فَعَلَ، فَعِلَ، فَعُلَ.</li><li>الرباعي المجرد: فَعْلَلَ فقط (دحرج، وسوس).</li><li>اسم الفاعل من الثلاثي: فاعل؛ ومن غيره: ميم مضمومة + كسر ما قبل الآخر (مُستخرِج).</li><li>اسم المفعول: مفعول؛ ومن غيره بفتح ما قبل الآخر (مُستخرَج).</li><li>افتعل للمطاوعة غالباً (جمعته فاجتمع)، استفعل للطلب (استغفر).</li></ul></div>
<div class="cs"><h4>الإملاء</h4><ul><li>الألف اللينة في الثلاثي: أصلها واو ← ألف (دعا، عصا)، أصلها ياء ← ياء (رمى، هدى).</li><li>فوق الثلاثي ← ياء (مصطفى، استدعى) إلا إذا سبقتها ياء (دنيا، أحيا).</li><li>الهمزة المتوسطة: تُكتب على حرف يناسب أقوى الحركتين (الكسرة ← ياء، الضمة ← واو، الفتحة ← ألف): سُئل، مسؤول، سأل.</li><li>التاء المربوطة تُلفظ هاءً عند الوقف (فاطمة)، والمبسوطة في جمع المؤنث السالم والأفعال (بنات، كتبت).</li></ul></div>
<div class="cs"><h4>أخطاء شائعة</h4><ul><li>تخرّج <b>في</b> الجامعة (لا: من).</li><li>طبيب <b>اختصاصي</b> (لا: أخصائي).</li><li><b>اللافت</b> للنظر (لا: الملفت).</li><li>الأمر <b>عارٍ</b> من الصحة.</li><li>تسلّم الكتاب (لا: استلم بمعنى أخذ).</li></ul></div>
<div class="cs"><h4>البلاغة والثقافة</h4><ul><li>التشبيه: مشبّه + مشبّه به + أداة + وجه شبه.</li><li>الاستعارة: تشبيه حُذف أحد طرفيه.</li><li>الطباق: الجمع بين الضدين (ليل/نهار)، الجناس: تشابه اللفظ واختلاف المعنى.</li><li>الخليل بن أحمد الفراهيدي: واضع علم العروض. سيبويه: «الكتاب» في النحو.</li><li>السياب ونازك الملائكة: رواد الشعر الحر.</li></ul></div>
</div>`,
english:`
<div class="cs-grid ltr">
<div class="cs"><h4>Tenses — form</h4><table><tr><th>Tense</th><th>Form</th><th>Key words</th></tr>
<tr><td>Present simple</td><td>V / V-s</td><td>always, every day</td></tr><tr><td>Present continuous</td><td>am/is/are + V-ing</td><td>now, at the moment</td></tr>
<tr><td>Present perfect</td><td>have/has + V3</td><td>just, already, yet, since, for</td></tr><tr><td>Past simple</td><td>V2</td><td>yesterday, ago, last</td></tr>
<tr><td>Past continuous</td><td>was/were + V-ing</td><td>while, when (interrupted)</td></tr><tr><td>Past perfect</td><td>had + V3</td><td>before, after, by the time</td></tr>
<tr><td>Future simple</td><td>will + V</td><td>tomorrow, next</td></tr><tr><td>Future perfect</td><td>will have + V3</td><td>by next year</td></tr></table></div>
<div class="cs"><h4>Conditionals</h4><ul><li><b>Zero</b>: If + present, present — If you heat ice, it melts.</li><li><b>First</b>: If + present, will + V — If it rains, we will stay.</li><li><b>Second</b>: If + past, would + V — If I were rich, I would travel.</li><li><b>Third</b>: If + had V3, would have V3 — If he had studied, he would have passed.</li><li>Unless = if … not.</li></ul></div>
<div class="cs"><h4>Passive & Reported speech</h4><ul><li>Passive = be (in the same tense) + V3: They built it → It <b>was built</b>.</li><li>Reported: am/is → was, will → would, can → could, present perfect → past perfect, past → past perfect.</li><li>here → there, now → then, today → that day, tomorrow → the next day.</li><li>Questions: He asked <b>where I lived</b> (no do/does, normal order).</li></ul></div>
<div class="cs"><h4>Small words</h4><ul><li><b>for</b> + period (for 3 years), <b>since</b> + point (since 2020).</li><li><b>much</b> + uncountable, <b>many</b> + plural; <b>a few</b> / <b>a little</b>.</li><li><b>some</b> in positive, <b>any</b> in negative & questions.</li><li><b>so</b> + adj, <b>such</b> + (a) adj + noun; <b>too</b> + adj (negative meaning), adj + <b>enough</b>.</li><li>in (year/month), on (day/date), at (time).</li><li>who (people), which (things), whose (possession), where (place).</li></ul></div>
<div class="cs"><h4>Language functions</h4><table><tr><th>Phrase</th><th>Function</th></tr>
<tr><td>Would you mind…? Could you…?</td><td>Request</td></tr><tr><td>Why don't we…? Let's… How about…?</td><td>Suggestion</td></tr>
<tr><td>You should… If I were you…</td><td>Advice</td></tr><tr><td>I'm sorry… I apologize…</td><td>Apology</td></tr>
<tr><td>Thank you so much… I'm grateful</td><td>Thanking</td></tr><tr><td>Congratulations!</td><td>Congratulating</td></tr>
<tr><td>Watch out! Be careful!</td><td>Warning</td></tr><tr><td>I'm afraid I can't…</td><td>Refusing politely</td></tr>
<tr><td>May I…? Can I…?</td><td>Asking permission</td></tr><tr><td>I think… In my opinion…</td><td>Giving opinion</td></tr></table></div>
<div class="cs"><h4>Conversation & reading strategy</h4><ul><li>Read the question first, then the dialogue.</li><li>The answer is usually in the <b>last speaker's</b> line.</li><li>Know common idioms: raining cats and dogs, piece of cake, break a leg.</li><li>In reading: find key words from the question in the passage; beware of options that are true but not stated.</li></ul></div>
</div>`,
computer:`
<div class="cs-grid ltr">
<div class="cs"><h4>Essential shortcuts</h4><table>
<tr><td>Ctrl+C / X / V</td><td>Copy / Cut / Paste</td></tr><tr><td>Ctrl+Z / Y</td><td>Undo / Redo</td></tr><tr><td>Ctrl+S / F12</td><td>Save / Save As</td></tr>
<tr><td>Ctrl+P / O / N</td><td>Print / Open / New</td></tr><tr><td>Ctrl+F / H</td><td>Find / Replace</td></tr><tr><td>Ctrl+A</td><td>Select all</td></tr>
<tr><td>Ctrl+B / I / U</td><td>Bold / Italic / Underline</td></tr><tr><td>Ctrl+K</td><td>Insert hyperlink</td></tr><tr><td>F7</td><td>Spelling & Grammar</td></tr>
<tr><td>Alt+Tab</td><td>Switch windows</td></tr><tr><td>Alt+F4</td><td>Close window/program</td></tr><tr><td>Shift+Delete</td><td>Delete permanently</td></tr>
<tr><td>Win+D / Win+E / Win+L</td><td>Desktop / File Explorer / Lock</td></tr><tr><td>Ctrl+Shift+Esc</td><td>Task Manager</td></tr><tr><td>F5 (browser)</td><td>Refresh</td></tr></table></div>
<div class="cs"><h4>Word 2016</h4><ul><li>Home: font, paragraph, styles, Find/Replace.</li><li>Insert: pictures, shapes, tables, header & footer, page numbers, WordArt, symbols, equations, page break (Ctrl+Enter).</li><li>Design: themes, watermark, page color. Layout: margins, orientation, size, columns.</li><li>References: table of contents, footnotes. Mailings: mail merge. Review: spelling, comments, track changes.</li><li>Default font: Calibri 11; file: .docx.</li></ul></div>
<div class="cs"><h4>Excel 2016</h4><ul><li>Every formula starts with <b>=</b>. Cell = column letter + row number (A1).</li><li>SUM, AVERAGE, MAX, MIN, COUNT (numbers), COUNTA, IF, SUMIF, COUNTIF, VLOOKUP, TODAY().</li><li>$A$1 absolute, A1 relative, $A1 / A$1 mixed.</li><li>Freeze Panes, Split (View tab). Merge & Center, Wrap Text (Home). Sort & Filter (Data).</li><li>1,048,576 rows × 16,384 columns (XFD). File: .xlsx. F2 edit cell.</li></ul></div>
<div class="cs"><h4>PowerPoint 2016</h4><ul><li>New slide Ctrl+M. Start show F5; from current slide Shift+F5; end Esc.</li><li>Transitions = between slides; Animations = elements inside a slide.</li><li>Slide Master controls layouts/design of all slides. Views: Normal, Outline, Slide Sorter, Notes Page, Reading.</li><li>Hide slide: Slide Show > Hide Slide. File: .pptx.</li></ul></div>
<div class="cs"><h4>Hardware & Windows</h4><ul><li>CPU = brain (ALU + CU). RAM volatile, ROM permanent, Cache fastest.</li><li>Input: keyboard, mouse, scanner, microphone. Output: monitor, printer, speaker.</li><li>SSD no moving parts; HDD magnetic; CD/DVD/Blu-ray optical.</li><li>Recycle Bin keeps deleted files until emptied. Control Panel: install/uninstall programs. Device Manager: drivers.</li><li>1 Byte = 8 bits; KB < MB < GB < TB.</li></ul></div>
<div class="cs"><h4>Internet, email & security</h4><ul><li>HTTPS = secure (lock icon). URL = web address. DNS = names → IP.</li><li>SMTP send; POP3 download; IMAP keep on server. Reply All answers everyone; CC/BCC.</li><li>Virus copies itself; phishing steals data; spoofing fakes the sender; firewall blocks unauthorized access.</li><li>Strong password: long, mixed letters, numbers and symbols.</li><li>AI: machines that perform tasks needing human intelligence; chatbots simulate conversation.</li></ul></div>
</div>`
};
/* خطط المذاكرة: [عنوان اليوم, [مهام]] — كل مهمة: [نص, رابط اختياري] */
const P=(s,t)=>'#/practice/'+s+(t?'?t='+encodeURIComponent(t):'');
const plans={
 d14:{name:'خطة أسبوعين (مكثفة)',desc:'ساعتان يومياً تقريباً. مناسبة إذا كان موعدك قريباً.',days:[
  ['اليوم 1 — تعرّف على الاختبار',[['اقرأ دليل الاختبار وخطوات الحجز','#/guide'],['امتحان تجريبي تشخيصي في المادة الأضعف','#/mock']]],
  ['اليوم 2 — الحاسوب: الأساسيات وWindows',[['ملخص الحاسوب أقسام 1–3','#/study/computer'],['20 سؤال: Computer Basics',P('computer','Computer Basics')],['20 سؤال: Windows 10',P('computer','Windows 10')]]],
  ['اليوم 3 — الحاسوب: Word وPowerPoint',[['ملخص Word وPowerPoint','#/study/computer'],['20 سؤال Word',P('computer','MS Word 2016')],['20 سؤال PowerPoint',P('computer','MS PowerPoint 2016')]]],
  ['اليوم 4 — الحاسوب: Excel والإنترنت والأمان',[['ورقة المراجعة: الاختصارات','#/study/computer?tab=cheat'],['30 سؤال Excel',P('computer','MS Excel 2016')],['20 سؤال الإنترنت والأمان',P('computer','Internet & Email')]]],
  ['اليوم 5 — امتحان حاسوب كامل',[['امتحان تجريبي حاسوب (40 سؤال / 60 دقيقة)','#/mock?s=computer'],['راجع أخطاءك','#/progress']]],
  ['اليوم 6 — الإنكليزي: القواعد',[['ورقة المراجعة: الأزمنة والشرط','#/study/english?tab=cheat'],['30 سؤال Grammar',P('english','Grammar')]]],
  ['اليوم 7 — الإنكليزي: الوظائف والمحادثة',[['جدول وظائف اللغة','#/study/english?tab=cheat'],['20 سؤال Language Functions',P('english','Language Functions')],['20 سؤال Conversation',P('english','Conversation')]]],
  ['اليوم 8 — الإنكليزي: القطع وامتحان كامل',[['تدرّب على القطع',P('english','Reading')],['امتحان تجريبي إنكليزي','#/mock?s=english']]],
  ['اليوم 9 — العربي: النحو (1)',[['ملخص العربي: الإعراب والنواسخ','#/study/arabic'],['30 سؤال نحو',P('arabic','النحو')]]],
  ['اليوم 10 — العربي: النحو (2) والصرف',[['ورقة المراجعة: العدد والمنصوبات','#/study/arabic?tab=cheat'],['20 سؤال نحو',P('arabic','النحو')],['20 سؤال صرف',P('arabic','الصرف')]]],
  ['اليوم 11 — العربي: الإملاء والأخطاء والثقافة',[['20 سؤال إملاء',P('arabic','الإملاء')],['20 سؤال ثقافة لغوية',P('arabic','الثقافة اللغوية')],['10 أسئلة أخطاء لغوية',P('arabic','الأخطاء اللغوية')]]],
  ['اليوم 12 — امتحان عربي كامل',[['امتحان تجريبي عربي (60 سؤال / 60 دقيقة)','#/mock?s=arabic'],['راجع الأخطاء','#/progress']]],
  ['اليوم 13 — مراجعة الأخطاء',[['تدريب «أخطائي السابقة» في كل مادة','#/practice'],['راجع المواضيع الضعيفة في لوحة التقدم','#/progress']]],
  ['اليوم 14 — بروفة نهائية',[['الاختبارات الثلاثة كاملة','#/mock?s=full'],['اقرأ نصائح يوم الاختبار','#/guide?sec=day']]]
 ]},
 d30:{name:'خطة 30 يوماً (متوازنة)',desc:'ساعة يومياً تقريباً، مع يوم مراجعة كل أسبوع.',days:[]}
};
const w=[
 ['computer','Computer Basics','أساسيات الحاسوب'],['computer','Windows 10','Windows 10'],['computer','MS Word 2016','Word'],['computer','MS Excel 2016','Excel'],['computer','MS PowerPoint 2016','PowerPoint'],['computer','Internet & Email','الإنترنت والبريد'],['computer','Security & Viruses','الأمان والفيروسات'],
 ['english','Grammar','Grammar (1)'],['english','Grammar','Grammar (2)'],['english','Language Functions','Language Functions'],['english','Conversation','Conversation'],['english','Reading','Reading'],['english','Grammar','Grammar (3)'],
 ['arabic','النحو','النحو (1)'],['arabic','النحو','النحو (2)'],['arabic','الصرف','الصرف'],['arabic','الإملاء','الإملاء'],['arabic','الأخطاء اللغوية','الأخطاء اللغوية'],['arabic','الثقافة اللغوية','الثقافة اللغوية'],['arabic','البلاغة والأساليب','البلاغة والأساليب']];
const nm={computer:'الحاسوب',english:'الإنكليزي',arabic:'العربي'};
let wi=0;
for(let d=1;d<=30;d++){
 if(d%7===0){plans.d30.days.push(['اليوم '+d+' — مراجعة أسبوعية',[['امتحان تجريبي في مادة هذا الأسبوع','#/mock'],['تدريب على أخطائك السابقة','#/practice'],['راجع لوحة التقدم','#/progress']]]);continue;}
 if(d>=27){const s=['computer','english','arabic'][d-27]||'full';plans.d30.days.push(['اليوم '+d+' — '+(s==='full'?'بروفة شاملة':'امتحان '+nm[s]+' كامل'),[[s==='full'?'الاختبارات الثلاثة':'امتحان تجريبي '+nm[s],'#/mock?s='+s],['راجع الأخطاء','#/progress']]]);continue;}
 const x=w[wi%w.length];wi++;
 plans.d30.days.push(['اليوم '+d+' — '+nm[x[0]]+': '+x[2],[['اقرأ القسم المناسب في الملخص','#/study/'+x[0]],['20 سؤال تدريب: '+x[2],P(x[0],x[1])]]]);
}
return {S,overview,pass,booking,day,eligibility,schedule,syllabus,faq,glossary,cheats,plans,updated:'23 تشرين الثاني 2026'};
})();
