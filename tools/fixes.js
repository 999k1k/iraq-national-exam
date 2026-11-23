/* تصحيحات مراجعة الجودة (تشرين الثاني 2026) — تُطبَّق عند بناء البنك.
   drop: أسئلة محذوفة مع السبب. patch: حقول تُستبدل (o = الخيارات، الأول هو الصحيح)، note تُضاف للشرح. */
module.exports={
drop:{
  arp110:'مكرر مع arp283 (صفة الجهر)',
  arp134:'مكرر مع arp280',
  arp286:'مكرر مع arp136 (ونصه تالف)',
  arp411:'مكرر مع arp203',
  enp31:'مكرر مع enp133',
  enp886:'مكرر مع enp944',
  enp889:'مكرر مع enp944',
  arp281:'مكرر مع arw76 (من أسماء الأسد)',
  enp109:'مكرر مع enp36',
  enp407:'مكرر مع enw33',
  enp106:'غامض: في الكلام المنقول يجوز إبقاء must أو تحويلها إلى had to، فالخياران الأولان صحيحان'
},
patch:{
  arp61:{o:['رَ','رِ','أري','را'],e:'الإجابة الصحيحة: «رَ». الأمر من رأى: رَ (للمذكر)، رَيْ (للمؤنث)، رَيَا، رَوْا.',note:'(تصحيح: الملف حدّد «رِ» والصواب «رَ» بالفتح.)'},
  cop19:{o:['Clear cell contents','Clear formatting','Clear both contents and formatting','Delete the whole workbook'],e:'الإجابة الصحيحة: «Clear cell contents». مفتاح Delete يمسح المحتوى فقط ويُبقي التنسيق.'},
  cop56:{q:'How can you insert a new worksheet in Excel?',o:['Home > Insert > Insert Sheet','View > New Window','Review > Protect Sheet','Page Layout > Breaks'],e:'الإجابة الصحيحة: «Home > Insert > Insert Sheet». ويمكن أيضاً النقر بالزر الأيمن على تبويب الورقة ثم Insert، أو Shift+F11.',note:'(عُدّل: الخيار الأصلي «Both options above» يشير لترتيب الخيارات الذي يتغيّر عند الخلط.)'},
  cop187:{o:['Safe version of HTTP','None of these','File Locking Protocol','Unsafe version of HTTP']},
  cop260:{q:'How do you move from page to page in a Word document?',o:['Ctrl + PgDn / Ctrl + PgUp','Ctrl + Home only','Alt + F4','None of these'],e:'الإجابة الصحيحة: «Ctrl + PgDn / Ctrl + PgUp» للانتقال للصفحة التالية/السابقة.'},
  cop345:{o:['Fill down in the selection','Open the font dialog box','Apply double underline for the active cell','None of these']},
  cop406:{q:'A URL (web address) can include:',o:['All of these (protocol, host name, file path)','Host name only','Source type only','File path only'],e:'الإجابة الصحيحة: يتكوّن الـ URL من البروتوكول (https) واسم المضيف (النطاق) ومسار الملف.'},
  cop316:{q:'To delete a sheet in Excel:',o:['Home > Delete > Delete Sheet','Page Layout > Delete > Delete Sheet','View > Delete Sheet','Insert > Delete Sheet']},
  cop380:{o:['Insert','View','Review','Design'],e:'الإجابة الصحيحة: «Insert» (Insert > Shapes).'},
  cop9:{o:['Paste Special > Transpose','Cut','Paste','Merge & Center']}
}};
