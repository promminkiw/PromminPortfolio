const projects = [
  {
    id: "line-expense-bot",
    title: "บอทบันทึกค่าใช้จ่ายผ่าน LINE",
    summary: "บอทสำหรับบันทึกค่าใช้จ่ายผ่านแพลตฟอร์ม LINE พร้อมรายงานสรุปและแจ้งเตือน",
    year: "2026",
    role: "ออกแบบและพัฒนาบอท โดยมี AI เป็นเครื่องมือช่วย",
    tags: ["LINE Messaging API", "Supabase", "LIFF", "Claude API", "Render", "HTML", "CSS", "JavaScript", "Node.js", "Express"],
    cover: "",
    images: [{ src: "images/workimages/smak.jpg", alt: "รูปเฮียสมัคร" }],
    description: [
      "แนวคิดเริ่มจากการอยากให้การจดรายรับรายจ่ายทำได้ง่ายเหมือนการพิมพ์คุยกับเพื่อน จึงพัฒนาบอทนี้ขึ้นมาให้บันทึกข้อมูลผ่าน LINE ได้ทันทีโดยไม่ต้องเปิดแอปแยก",
      "ผู้ใช้พิมพ์ข้อความ เช่น \"กินข้าว 60 กาแฟ 45\" จากนั้น Claude API จะแยกประเภท หมวดหมู่ และจำนวนเงิน แล้วบันทึกลงฐานข้อมูล Supabase นอกจากนี้ยังส่งรูปสลิปให้บอทอ่านยอดได้ ตั้งงบประมาณรายเดือนพร้อมการแจ้งเตือน และตั้งรายการประจำให้บันทึกอัตโนมัติ",
      "ผู้ใช้เปิดเว็บ LIFF ผ่าน Rich Menu เพื่อดู แก้ไข ลบรายการ และดูกราฟสรุปตามหมวดหมู่ได้ โดยระบบรองรับหลายผู้ใช้ และใช้ Row Level Security เพื่อให้แต่ละคนเห็นเฉพาะข้อมูลของตัวเอง พัฒนาด้วย Node.js และ Deploy บน Render พร้อมใช้ AI เป็นเครื่องมือช่วยในการทำงาน",
      "ระบบช่วยให้ผู้ใช้จดรายรับรายจ่ายได้สะดวกขึ้น และเห็นภาพรวมการใช้เงินของตัวเองได้ง่ายขึ้น"
    ],
    links: [
      { label: "เพิ่มเพื่อน LINE OA", url: "https://line.me/R/ti/p/@445wgbyg" },
      { label: "โค้ดบน GitHub", url: "https://github.com/promminkiw/line-expense-bot" }
    ]
  },
  {
    id: "codemoohmooh",
    title: "เว็บไซต์ร้านรับทำงาน โค้ดหมูๆ",
    summary: "เว็บไซต์ร้านรับทำงานด้านโค้ด เว็บไซต์ ฐานข้อมูล รายงาน และสไลด์ มีมาสคอตหมูที่ผู้ชมเล่นด้วยได้ และติดต่อร้านผ่าน LINE",
    year: "2026",
    role: "ออกแบบและพัฒนาเว็บไซต์ โดยมี AI เป็นเครื่องมือช่วย",
    tags: ["HTML", "CSS", "JavaScript", "SVG"],
    cover: "images/workimages/web-codemoohmooh.png",
    images: [{ src: "images/workimages/web-codemoohmooh.png", alt: "หน้าแรกเว็บไซต์โค้ดหมูๆ พร้อมมาสคอตหมู" }],
    description: [
      "แนวคิดเริ่มจากการอยากมีหน้าร้านออนไลน์สำหรับรับงานด้านโค้ด เช่น เว็บไซต์ โปรแกรม ฐานข้อมูล รายงาน สไลด์ และออกแบบ UI ให้ลูกค้าเห็นบริการ ดูผลงาน และติดต่อได้ในที่เดียว โดยมีมาสคอตหมูช่วยให้เว็บดูเป็นกันเองและน่าจดจำ",
      "หน้าแรกมีหมูที่วาดด้วย SVG และเล่นด้วยได้ หมูจะมองตามเมาส์หรือนิ้ว และกะพริบตาเอง แตะแล้วหมูจะเด้ง หูกระดิก และพูดได้ ผู้ชมป้อนขนมด้วยการกดปุ่มหรือลากไปให้หมูได้ หรือกดแป้นพิมพ์ให้หมูพิมพ์โค้ดก็ได้ ส่วนหน้าผลงานกรองตามหมวดได้ และแต่ละชิ้นมีหน้ารายละเอียดของตัวเอง",
      "พัฒนาด้วย HTML, CSS และ JavaScript ล้วน ไม่ต้อง build ข้อมูลร้านและผลงานรวมไว้ในไฟล์เดียว จึงเพิ่มผลงานใหม่ได้ง่าย เนื้อหาค่อยๆ โผล่ขึ้นมาตอนเลื่อนหน้า พร้อมใช้ AI เป็นเครื่องมือช่วยในการทำงาน",
      "เว็บไซต์ช่วยให้ลูกค้ารู้จักบริการของร้าน ดูตัวอย่างผลงาน และทักมาคุยผ่าน LINE ได้สะดวกขึ้น"
    ],
    links: [
      { label: "ดูเว็บจริง", url: "https://codemoohmooh.vercel.app/" },
      { label: "เพิ่มเพื่อน LINE OA", url: "https://line.me/R/ti/p/@yav6197v" },
      { label: "โค้ดบน GitHub", url: "https://github.com/promminkiw/CodeMoohMooh" }
    ]
  },
  {
    id: "group-meeting",
    title: "เว็บแอปจัดการงานและนัดเวลาสำหรับกลุ่ม",
    summary: "เว็บแอปสำหรับกลุ่มนักศึกษาขนาดใหญ่ ใช้ติดตามว่าใครค้างงานอะไร และหาเวลานัดประชุมด้วย heatmap ที่แสดงจำนวนคนว่างในแต่ละช่วงเวลา",
    year: "2026",
    role: "ออกแบบและพัฒนาเว็บแอป โดยมี AI เป็นเครื่องมือช่วย",
    tags: ["Next.js", "React", "Supabase", "Vercel"],
    cover: "images/workimages/group-meeting-calendar-heatmap.png",
    images: [
      { src: "images/workimages/group-meeting-dashboard.png", alt: "หน้าภาพรวมกลุ่ม แสดงว่าใครค้างงานอะไร" },
      { src: "images/workimages/group-meeting-tasks.png", alt: "หน้ารายการงานพร้อมตัวกรอง" },
      { src: "images/workimages/group-meeting-calendar-heatmap.png", alt: "heatmap จำนวนคนว่างในแต่ละช่วงเวลา" },
      { src: "images/workimages/group-meeting-availability.png", alt: "หน้ากรอกเวลาว่างประจำสัปดาห์" },
      { src: "images/workimages/group-meeting-mobile.png", alt: "หน้าตาเว็บแอปบนมือถือ" }
    ],
    description: [
      "แนวคิดเริ่มจากปัญหาที่กลุ่มใหญ่อย่างชมรมหรือกิจกรรมคณะเจอเวลาทำงานผ่าน LINE กลุ่ม คือข้อความจมจนไม่รู้ว่าใครค้างงานอะไร และหาเวลาที่ทุกคนว่างตรงกันแทบไม่ได้ จึงพัฒนาเว็บแอปนี้ขึ้นมาเพื่อแก้ทั้งสองเรื่อง",
      "admin สร้างงานพร้อม deadline และมอบหมายให้หลายคนได้ สมาชิกแต่ละคนอัปเดตสถานะงานของตัวเอง แล้ว dashboard จะแสดงทันทีว่าใครค้างอะไร ส่วนเรื่องนัดเวลา สมาชิกกรอกเวลาว่างประจำสัปดาห์ครั้งเดียวแล้วใช้ได้กับทุกกลุ่ม ระบบแสดงเป็น heatmap ว่าช่วงไหนมีคนว่างกี่คน ให้ admin เลือกช่องเวลาแล้วสร้างนัดหมายได้เลย",
      "พัฒนาด้วย Next.js, TypeScript และ Supabase รองรับการสมัครด้วยอีเมลหรือ Google มีระบบเชิญเข้ากลุ่มด้วยลิงก์หรือโค้ด และตรวจสิทธิ์ 3 ชั้น ตั้งแต่ฝั่งแอปไปจนถึง Row Level Security ที่ database มี unit test กว่า 250 ข้อ และ Deploy บน Vercel พร้อมใช้ AI เป็นเครื่องมือช่วยในการทำงาน",
      "เว็บแอปช่วยให้กลุ่มใหญ่ติดตามงานได้ชัดเจนขึ้น และหาเวลานัดที่คนส่วนใหญ่สะดวกได้เร็วขึ้น"
    ],
    links: [
      { label: "ดูเว็บจริง", url: "https://group-meeting-mauve.vercel.app" },
      { label: "โค้ดบน GitHub", url: "https://github.com/promminkiw/group-meeting" }
    ]
  },
  {
    id: "calculator-electric",
    title: "เว็บไซต์คำนวณค่าไฟอย่างง่าย",
    summary: "เว็บไซต์ช่วยประเมินค่าไฟรายเดือน โดยกรอกเลขมิเตอร์ครั้งก่อนและครั้งปัจจุบันเพื่อคำนวณปริมาณการใช้ไฟและค่าไฟโดยประมาณ",
    year: "2026",
    role: "ออกแบบและพัฒนาเว็บไซต์ โดยใช้ AI เป็นเครื่องมือช่วย",
    tags: ["HTML", "CSS", "JavaScript"],
    cover: "images/workimages/calculator-electric.png",
    images: [{ src: "images/workimages/calculator-electric.png", alt: "รูปเว็บไซต์คำนวณค่าไฟอย่างง่าย" }],
    description: [
      "แนวคิดเริ่มจากผมได้ไปเจอเพื่อนๆในกลุ่มเฟสบุ๊ค ต้องการทราบปริมาณการใช้ไฟและค่าไฟโดยประมาณก่อนถึงรอบบิล จึงพัฒนาเว็บไซต์นี้ขึ้นมาเพื่อช่วยประเมินค่าใช้จ่ายเบื้องต้น",
      "ผู้ใช้กรอกเลขมิเตอร์ครั้งก่อนและครั้งปัจจุบัน จากนั้นเว็บไซต์คำนวณปริมาณไฟฟ้าที่ใช้และแสดงค่าไฟโดยประมาณ โดยพัฒนาด้วย HTML, CSS และ JavaScript พร้อมใช้ AI เป็นเครื่องมือช่วยในการทำงาน",
      "เว็บไซต์ช่วยให้ผู้ใช้ตรวจสอบปริมาณการใช้ไฟและประเมินค่าใช้จ่ายเบื้องต้นได้สะดวกขึ้น"
    ],
    links: [
      { label: "ดูเว็บจริง", url: "https://electricity-kappa.vercel.app/" },
      { label: "โค้ดบน GitHub", url: "https://github.com/promminkiw/Electricity" }
    ]
  },
  {
    id: "it-repair",
    title: "เว็บไซต์แจ้งซ่อม IT",
    summary: "เว็บไซต์แจ้งซ่อมอุปกรณ์ IT ผ่าน QR Code และแบบฟอร์ม พร้อมบันทึกข้อมูลลง Google Sheets และส่งการแจ้งเตือนไปยังกลุ่ม LINE ของฝ่าย IT",
    year: "2026",
    role: "ออกแบบและพัฒนาเว็บไซต์ โดยมี AI เป็นเครื่องมือช่วย",
    tags: ["Google Sheets", "Google Apps Script", "Google Forms", "HTML", "CSS", "JavaScript", "LINE Messaging API"],
    cover: "",
    images: [{ src: "images/workimages/it-repair.png", alt: "รูปเว็บไซต์แจ้งซ่อมIT" }],
    description: [
      "แนวคิดเริ่มจากการพบ QR Code สำหรับแจ้งซ่อมอุปกรณ์ IT ตามโต๊ะเรียน จึงพัฒนาเว็บไซต์นี้เพื่อให้ผู้ใช้ส่งคำร้องได้สะดวกขึ้น",
      "ผู้ใช้สแกน QR Code เพื่อเปิดแบบฟอร์มและกรอกรายละเอียดปัญหา ข้อมูลจะถูกบันทึกลง Google Sheets พร้อมส่งการแจ้งเตือนไปยังกลุ่ม LINE ของฝ่าย IT เพื่อให้รับทราบและดำเนินการแก้ไข",
      "เว็บไซต์ช่วยให้ผู้ใช้แจ้งปัญหาได้ง่ายขึ้น และช่วยให้ฝ่าย IT รับทราบ ติดตาม และจัดการคำร้องได้สะดวกขึ้น"
    ],
    links: [
      { label: "ดูเว็บจริง", url: "https://script.google.com/macros/s/AKfycbyy7Kog-h_AC46dm_XsdDVnXH2dXm3DMaSnv9UIX9mMetoMqc5Hm2Zg65UzvmNX25E1_w/exec" },
      { label: "Google Sheets", url: "https://docs.google.com/spreadsheets/d/1CVApqX8vLdW-fHWenhmIy_E1EkajdqriKIvK1aWKoGY/edit?gid=1262964409#gid=1262964409" },
      { label: "ฟอร์ม", url: "https://docs.google.com/forms/d/e/1FAIpQLSc9VGgARagay-SB3r99bN0JANknhzr2ErrQpmEvm5RFJYLUDg/viewform" },
      { label: "กลุ่มไลน์", url: "https://line.me/ti/g/ReY2QaGqar" },
      { label: "คู่มือการใช้งาน", url: "https://github.com/promminkiw/Electricity" }
    ]
  },
  {
    id: "web-portfolio",
    title: "เว็บไซต์ Portfolio ส่วนตัว",
    summary: "เว็บไซต์แสดงผลงานและประวัติส่วนตัว",
    year: "2026",
    role: "ออกแบบและพัฒนาเว็บไซต์",
    tags: ["HTML", "CSS", "JavaScript"],
    cover: "",
    images: [{ src: "images/workimages/web-portfolio.png", alt: "รูปเว็บไซต์ portfolio" }],
    description: [
      "เว็บไซต์นี้เป็น Portfolio ส่วนตัวที่แสดงผลงานและประวัติส่วนตัวของผู้พัฒนา โดยออกแบบให้ใช้งานง่ายและเข้าถึงข้อมูลได้สะดวก",
      "ผู้ใช้สามารถดูรายละเอียดเกี่ยวกับผู้พัฒนา ผลงานที่ผ่านมา และข้อมูลติดต่อได้อย่างครบถ้วน",
      "เว็บไซต์พัฒนาด้วย HTML, CSS และ JavaScript เพื่อให้มีความทันสมัยและตอบสนองต่อผู้ใช้ได้ดี"
    ],
    links: [
      { label: "ดูเว็บจริง", url: "https://promminkiw.github.io/PromminPortfolio/" },
      { label: "โค้ดบน GitHub", url: "https://github.com/promminkiw/PromminPortfolio" }
    ]
  },
];
