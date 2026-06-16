
// ── DATA ────────────────────────────────────────────────────
const SUBS=[
  {id:'all',n:'ทั้งหมด',ic:'📋',c:'#1B3A6B'},
  {id:'preop',n:'ก่อนผ่าตัด',ic:'📝',c:'#1D9E75'},
  {id:'intraop',n:'ขณะผ่าตัด',ic:'😷',c:'#1B3A6B'},
  {id:'postop',n:'หลังผ่าตัด',ic:'🛌',c:'#D85A30'},
  {id:'comm',n:'สื่อสารผู้ป่วย',ic:'💬',c:'#BA7517'},
];
const SM=Object.fromEntries(SUBS.filter(s=>s.id!=='all').map(s=>[s.id,s]));

let VID=[];

const BKS=[
  {id:'b1',s:'preop',t:'การเตรียมตัวก่อนผ่าตัด (Pre-op Prep)',a:'Healthcare Academy',ch:4,c:'#1D9E75'},
  {id:'b2',s:'postop',t:'การดูแลแผลและฟื้นฟู (Post-op Care)',a:'Nursing Dept',ch:5,c:'#D85A30'},
  {id:'b3',s:'comm',t:'เทคนิคให้คำแนะนำผู้ป่วย',a:'Communication Unit',ch:3,c:'#BA7517'},
  {id:'b4',s:'intraop',t:'ความปลอดภัยในห้องผ่าตัด',a:'OR Team',ch:4,c:'#1B3A6B'},
];

const BKCONTENT={
  default:(b,n)=>{
    let content = '';
    if(b.s === 'preop') {
      content = `
        <h3 style="font-size:17px;font-weight:800;margin-bottom:12px;color:var(--p)">บทที่ ${n}: การเตรียมผู้ป่วยก่อนผ่าตัด</h3>
        <p style="line-height:1.9;margin-bottom:14px;color:var(--t1)">การเตรียมตัวก่อนผ่าตัดเป็นขั้นตอนสำคัญที่จะช่วยให้การผ่าตัดราบรื่นและปลอดภัย</p>
        <div style="background:var(--pxl);border-left:4px solid var(--p);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>NPO (งดน้ำงดอาหาร):</strong> ต้องงดอย่างน้อย 8 ชั่วโมงก่อนการผ่าตัด (หรือตามแผนการรักษา) เพื่อป้องกันการสำลักลงปอด (Aspiration) ระหว่างได้รับยาสลบ
        </div>
        <div style="background:rgba(29,158,117,.1);border-left:4px solid var(--g);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Informed Consent:</strong> ผู้ป่วยและญาติสายตรงต้องได้รับข้อมูลที่ครบถ้วนจากแพทย์ และเซ็นใบยินยอมก่อนไปห้องผ่าตัดเสมอ
        </div>
        <p style="line-height:1.9;color:var(--t2)">*อย่าลืมให้ผู้ป่วยถอดฟันปลอม คอนแทคเลนส์ และล้างสีเล็บก่อนส่งตัว</p>
      `;
    } else if (b.s === 'postop') {
      content = `
        <h3 style="font-size:17px;font-weight:800;margin-bottom:12px;color:var(--p)">บทที่ ${n}: การดูแลและฟื้นฟูหลังผ่าตัด</h3>
        <p style="line-height:1.9;margin-bottom:14px;color:var(--t1)">การดูแลหลังผ่าตัดช่วยป้องกันภาวะแทรกซ้อนและทำให้ผู้ป่วยฟื้นตัวได้เร็วขึ้น</p>
        <div style="background:var(--pxl);border-left:4px solid var(--p);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Early Ambulation:</strong> กระตุ้นให้ผู้ป่วยลุกเดินโดยเร็วเมื่อประเมินว่าปลอดภัย เพื่อลดโอกาสเกิดภาวะหลอดเลือดดำอุดตัน (DVT) และปอดแฟบ (Atelectasis)
        </div>
        <div style="background:rgba(29,158,117,.1);border-left:4px solid var(--g);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Pain Management:</strong> ประเมิน Pain Score อย่างต่อเนื่อง และดูแลให้ยาแก้ปวดตามแผนการรักษา พร้อมสอนวิธี Splinting แผลเวลาไอ
        </div>
        <p style="line-height:1.9;color:var(--t2)">*สังเกตบริเวณแผล หากมีเลือดซึมมากผิดปกติ ให้รายงานแพทย์ทันที</p>
      `;
    } else if (b.s === 'intraop') {
      content = `
        <h3 style="font-size:17px;font-weight:800;margin-bottom:12px;color:var(--p)">บทที่ ${n}: ความปลอดภัยในห้องผ่าตัด</h3>
        <p style="line-height:1.9;margin-bottom:14px;color:var(--t1)">หลักการปฏิบัติในห้องผ่าตัดต้องเคร่งครัดเรื่องความสะอาดและความถูกต้องของตัวผู้ป่วย</p>
        <div style="background:var(--pxl);border-left:4px solid var(--p);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Time Out:</strong> ก่อนลงมีดผ่าตัด ทีมแพทย์และพยาบาลต้องหยุดเพื่อยืนยันชื่อผู้ป่วย ชนิดการผ่าตัด และตำแหน่งให้ตรงกันเสมอ
        </div>
        <div style="background:rgba(29,158,117,.1);border-left:4px solid var(--g);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Sterile Technique:</strong> การรักษาสิ่งแวดล้อมและอุปกรณ์ให้ปราศจากเชื้อ (Aseptic technique) คือหัวใจสำคัญของการป้องกัน Surgical Site Infection (SSI)
        </div>
      `;
    } else {
      content = `
        <h3 style="font-size:17px;font-weight:800;margin-bottom:12px;color:var(--p)">บทที่ ${n}: ${b.t}</h3>
        <p style="line-height:1.9;margin-bottom:14px;color:var(--t1)">ทักษะการสื่อสารที่ดีช่วยลดความวิตกกังวลของผู้ป่วยและสร้างความมั่นใจในการรักษา</p>
        <div style="background:var(--pxl);border-left:4px solid var(--p);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Empathy:</strong> รับฟังความกังวลของผู้ป่วยอย่างตั้งใจ และอธิบายขั้นตอนต่างๆ ด้วยภาษาที่เข้าใจง่าย ไม่ใช้ศัพท์เทคนิคที่ซับซ้อนเกินไป
        </div>
        <div style="background:rgba(29,158,117,.1);border-left:4px solid var(--g);padding:16px;border-radius:10px;margin-bottom:14px">
          <strong>Discharge Planning:</strong> วางแผนจำหน่ายผู้ป่วยตั้งแต่แรกรับ สอนวิธีดูแลตัวเองที่บ้าน การทานยา และอาการผิดปกติที่ต้องรีบกลับมาโรงพยาบาล
        </div>
      `;
    }
    return content;
  }
};

const QS=[
  {id:'q1',s:'preop',t:'ทดสอบความรู้: ก่อนผ่าตัด',n:8,tm:60},
  {id:'q2',s:'postop',t:'ทดสอบความรู้: หลังผ่าตัด',n:8,tm:60},
  {id:'q3',s:'comm',t:'จำลองสถานการณ์: สื่อสารผู้ป่วย',n:8,tm:60},
  {id:'q4',s:'all',t:'ทดสอบความรู้: กรณีศึกษาฉุกเฉิน',n:8,tm:60},
];

const QQ={
  q1:[
    {q:'ผู้ป่วยมีคิวผ่าตัดแบบ General Anesthesia พรุ่งนี้เช้า ต้องแนะนำเรื่องงดน้ำงดอาหารอย่างไร?',o:['งดเฉพาะอาหารแข็ง 4 ชั่วโมง','งดน้ำงดอาหาร (NPO) อย่างน้อย 8 ชั่วโมงก่อนผ่าตัด','งดเฉพาะน้ำหวาน อาหารกินได้ปกติ','กินได้ตามปกติจนกว่าจะถึงเวลาผ่าตัด'],a:1,e:'NPO อย่างน้อย 8 ชั่วโมง เพื่อป้องกันการสำลัก (Aspiration) ระหว่างดมยาสลบ'},
    {q:'การล้างสีเล็บและถอดเครื่องประดับก่อนเข้าห้องผ่าตัด มีวัตถุประสงค์เพื่ออะไร?',o:['เพื่อความสวยงาม','เพื่อป้องกันการสูญหายเท่านั้น','เพื่อประเมินภาวะขาดออกซิเจน (Cyanosis) และป้องกันไฟดูดจากเครื่องจี้ไฟฟ้า','เพื่อให้ผู้ป่วยรู้สึกสบายตัว'],a:2,e:'การดูสีเล็บช่วยให้วิสัญญีแพทย์ประเมิน O2 ได้ และเครื่องประดับโลหะอาจทำให้เกิดไฟลัดวงจรเวลาใช้เครื่องจี้ไฟฟ้า'},
    {q:'หากผู้ป่วยรับประทานยาละลายลิ่มเลือด (เช่น Aspirin) ควรสั่งการอย่างไรก่อนผ่าตัดแบบ Elective?',o:['กินต่อได้เลยไม่มีผล','ให้หยุดยาก่อนผ่าตัด 7 วันตามแผนการรักษา','ให้หยุดยา 1 วันก่อนผ่าตัด','เพิ่มขนาดยาก่อนผ่าตัด'],a:1,e:'โดยทั่วไปยาละลายลิ่มเลือดหรือยาต้านเกล็ดเลือดต้องหยุดล่วงหน้า เพื่อป้องกันเลือดออกไม่หยุดระหว่างผ่าตัด'},
    {q:'ผู้ป่วยกังวลมากก่อนผ่าตัด เจ้าหน้าที่ควรทำอย่างไรอันดับแรก?',o:['บอกให้ทำใจสบายๆ ไม่ต้องคิดมาก','ให้ยานอนหลับทันที','รับฟังความกังวลและอธิบายขั้นตอนการผ่าตัดคร่าวๆ ให้มั่นใจ','บอกญาติให้พาผู้ป่วยกลับบ้าน'],a:2,e:'การให้ข้อมูลที่ถูกต้องและรับฟัง (Active listening) ช่วยลดความวิตกกังวลได้ดีที่สุด'},
    {q:'การให้ผู้ป่วยเซ็นใบยินยอมการผ่าตัด (Informed Consent) ข้อใดถูกต้องที่สุด?',o:['พยาบาลเป็นผู้มีหน้าที่อธิบายความเสี่ยงทั้งหมด','แพทย์ผู้ผ่าตัดต้องอธิบายและผู้ป่วยเซ็นยินยอมขณะมีสติสัมปชัญญะครบถ้วน','เซ็นหลังได้รับยานอนหลับแล้วก็ได้','ให้ญาติเซ็นแทนได้เสมอแม้ผู้ป่วยจะรู้สึกตัวดี'],a:1,e:'การทำ Informed consent ผู้ป่วยต้องรู้เรื่องและยินยอมโดยปราศจากการกดดันหรือฤทธิ์ยาเบลอ'},
  ],
  q2:[
    {q:'หลังผ่าตัดหน้าท้อง ผู้ป่วยมีอาการปวดแผลมากเวลาไอหรือจาม ควรแนะนำผู้ป่วยอย่างไร?',o:['ห้ามไอหรือจามเด็ดขาด','ให้ใช้หมอนใบเล็กๆ กดพยุงบริเวณแผลเวลาไอหรือจาม','ให้กินยาแก้ปวดทุก 1 ชั่วโมง','ให้นอนหงายราบตลอดเวลา'],a:1,e:'การใช้หมอนพยุงแผล (Splinting) ช่วยลดแรงดันและลดอาการปวดแผลผ่าตัดหน้าท้องเวลาไอหรือจามได้'},
    {q:'การส่งเสริมให้ผู้ป่วยลุกเดินเร็ว (Early Ambulation) หลังผ่าตัด มีประโยชน์อย่างไร?',o:['ทำให้แผลหายเร็วขึ้น 10 เท่า','ป้องกันภาวะแทรกซ้อน เช่น ลิ่มเลือดอุดตัน และปอดแหก','เพื่อให้ผู้ป่วยกลับบ้านได้ใน 1 วัน','เพื่อให้พยาบาลทำงานน้อยลง'],a:1,e:'Early ambulation ป้องกันภาวะ DVT, ปอดติดเชื้อ (Pneumonia) และลำไส้อืด (Ileus)'},
    {q:'สัญญาณใดที่บ่งบอกว่าผู้ป่วยอาจมีภาวะแผลผ่าตัดติดเชื้อ (SSI)?',o:['มีไข้ แผลบวมแดง ร้อน และมีหนองซึม','แผลแห้งสนิท ไม่มีอาการปวด','รู้สึกคันบริเวณแผลเล็กน้อย','ปวดแผลเฉพาะเวลาขยับตัว'],a:0,e:'อาการปวด บวม แดง ร้อน มีไข้ มีสารคัดหลั่งหรือหนอง เป็นสัญญาณของการติดเชื้อที่แผล'},
    {q:'การประเมินความปวดของผู้ป่วยหลังผ่าตัด ควรใช้เครื่องมือใด?',o:['การวัดความดันโลหิต','Numeric Rating Scale (0-10) หรือ Pain scale','การดูจากสีหน้าเท่านั้น','การสอบถามญาติ'],a:1,e:'Pain scale เป็นเครื่องมือมาตรฐานที่ให้ผู้ป่วยประเมินความปวดของตนเอง'},
    {q:'ผู้ป่วยผ่าตัดลำไส้ สามารถเริ่มจิบน้ำได้เมื่อใดตามปกติ?',o:['ทันทีหลังออกจากห้องผ่าตัด','เมื่อแพทย์ประเมินและสั่งแผนการรักษา หรือมีเสียงการทำงานของลำไส้','ต้องรอ 3 วันเท่านั้น','เมื่อผู้ป่วยร้องขอน้ำ'],a:1,e:'ควรให้ผู้ป่วย NPO ต่อจนกว่าการทำงานของลำไส้จะกลับมา (Bowel sound active) หรือตามแผนการรักษาแพทย์'},
  ],
  q3:[
    {q:'ผู้ป่วยถามว่า "ผ่าตัดไส้ติ่งน่ากลัวไหม จะเจ็บมากไหม?" คำตอบที่ดีที่สุดคือ?',o:['เจ็บมากครับ ต้องทนเอา','ไม่เจ็บเลยครับ สบายมากเหมือนมดกัด','เป็นการผ่าตัดทั่วไปที่ปลอดภัย ระหว่างผ่าตัดจะได้รับยาสลบไม่รู้สึกตัว และหลังผ่าตัดมียาแก้ปวดดูแลตลอดครับ','ไม่ทราบครับ ต้องถามหมอ'],a:2,e:'เป็นการตอบที่ให้ความมั่นใจ บอกความจริงเบื้องต้น และคลายกังวล'},
    {q:'ผู้ป่วยหลังผ่าตัดไม่ยอมเป่าเครื่องบริหารปอด (Incentive Spirometer) เพราะเจ็บแผล ควรแนะนำว่า?',o:['ถ้าไม่ทำ ปอดจะพังนะครับ','คุณหมอสั่งไว้ ต้องทำเดี๋ยวนี้','เข้าใจว่าเจ็บแผลครับ แต่การเป่าจะช่วยขยายปอด ป้องกันปอดแฟบ เดี๋ยวเราใช้หมอนประคองแผลก่อนเป่านะครับ','ไม่เป็นไรครับ เก็บไว้ทำตอนกลับบ้านก็ได้'],a:2,e:'แสดงความเข้าใจ (Empathy) และบอกข้อดี พร้อมทั้งสอนวิธีลดปวดขณะทำ'},
    {q:'ญาติถามว่า "ทำไมคนไข้ยังไม่ตื่นเต็มที่หลังออกมาจากห้องผ่าตัดใหม่ๆ?" ควรตอบว่า?',o:['หมอคงให้ยาเยอะเกินไปครับ','เป็นอาการสะลึมสะลือจากฤทธิ์ยาสลบที่ยังหลงเหลืออยู่ เป็นภาวะปกติและจะค่อยๆ ตื่นดีขึ้นครับ','สงสัยสมองขาดออกซิเจนครับ','เดี๋ยวก็ตื่นครับ อย่าเพิ่งถาม'],a:1,e:'การให้เหตุผลทางการแพทย์อย่างง่าย ช่วยลดความตื่นตระหนกของญาติ'},
    {q:'เมื่อผู้ป่วยเตรียมตัวกลับบ้าน (Discharge) สิ่งสำคัญที่สุดที่ต้องสอนคือ?',o:['วิธีชำระเงินค่ารักษา','การนัดหมายแพทย์ การสังเกตอาการผิดปกติที่ต้องรีบมา รพ. และการกินยา','รายชื่อทีมแพทย์ที่ดูแล','วิธีค้นหาข้อมูลโรคในอินเทอร์เน็ต'],a:1,e:'การวางแผนจำหน่าย (Discharge planning) ต้องสอนเรื่องอาการผิดปกติ การทานยา และการดูแลแผล'},
    {q:'ผู้ป่วยถามเรื่องแผลผ่าตัดโดนน้ำได้ไหม คำแนะนำคือ?',o:['อาบน้ำได้ปกติ แผลเปียกได้','ห้ามอาบน้ำจนกว่าจะตัดไหม','ให้เช็ดตัวไปก่อน หรือระวังไม่ให้แผลโดนน้ำ หากแผลเปียกให้รีบทำแผลใหม่ให้แห้งทันที','ใช้สบู่อาบน้ำฟอกที่แผลได้เลย'],a:2,e:'โดยปกติแผลผ่าตัดช่วงแรกไม่ควรโดนน้ำโดยตรง หากเปียกชื้นเสี่ยงต่อการติดเชื้อ'},
  ],
  q4:[
    {q:'หากผู้ป่วยมีภาวะ Evisceration (ลำไส้ทะลักออกจากแผลผ่าตัด) ควรทำอย่างไรอันดับแรก?',o:['ดันลำไส้กลับเข้าไปในช่องท้องทันที','ใช้ผ้าก๊อซชุบ Normal Saline ปลอดเชื้อคลุมลำไส้ไว้ และรายงานแพทย์ด่วน','ใช้ผ้าแห้งพันแผลให้แน่น','ให้ผู้ป่วยลุกเดินเพื่อลดแรงดัน'],a:1,e:'ห้ามดันลำไส้กลับเข้าไปเด็ดขาด ควรใช้ผ้าชุบน้ำเกลือคลุมไว้เพื่อรักษาความชุ่มชื้นและป้องกันเนื้อเยื่อตาย'},
    {q:'สัญญาณเริ่มแรกของภาวะ Malignant Hyperthermia (ภาวะไข้สูงวิกฤตจากยาสลบ) ในห้องผ่าตัดคือ?',o:['อุณหภูมิร่างกายสูงขึ้นอย่างรวดเร็วเป็นอย่างแรก','ระดับคาร์บอนไดออกไซด์ในลมหายใจออก (EtCO2) สูงขึ้นกะทันหัน','ความดันโลหิตต่ำรุนแรง','หัวใจเต้นช้าลง'],a:1,e:'การเพิ่มขึ้นของ EtCO2 มักเป็นสัญญาณแรกสุดที่พบ ตามมาด้วย tachycardia, กล้ามเนื้อเกร็ง และไข้สูง'},
    {q:'ในผู้ป่วยที่มีภาวะ Hypovolemic shock จากการตกเลือด สารน้ำที่เหมาะสมในการทำ Resuscitation เบื้องต้นคือ?',o:['D5W','0.9% Normal Saline หรือ Ringer Lactate','0.45% Normal Saline','50% Glucose'],a:1,e:'Isotonic crystalloid เช่น NSS หรือ Ringer Lactate เป็นสารน้ำมาตรฐานในการเพิ่มปริมาตรเลือดเบื้องต้น'},
    {q:'เมื่อเกิดภาวะ Cardiac Arrest ในห้องผ่าตัด อัตราส่วนการกดหน้าอกต่อการช่วยหายใจคือเท่าใด (ผู้ใหญ่)?',o:['15:2','30:2','100 ครั้งต่อนาทีต่อเนื่องโดยไม่ต้องช่วยหายใจ','5:1'],a:1,e:'มาตรฐาน CPR ปัจจุบันแนะนำอัตรา 30:2 สำหรับผู้ใหญ่'},
    {q:'ยาที่ใช้เป็น Antidote สำหรับแก้ไขภาวะกดการหายใจจาก Opioids คือยาอะไร?',o:['Flumazenil','Naloxone','Atropine','Epinephrine'],a:1,e:'Naloxone เป็น opioid antagonist โดยเฉพาะ'},
    {q:'หากผู้ป่วยเกิดภาวะ Anaphylactic shock ระหว่างผ่าตัด ยาตัวแรกที่แพทย์มักสั่งให้คือ?',o:['Hydrocortisone','Epinephrine','Chlorpheniramine','Dopamine'],a:1,e:'Epinephrine (Adrenaline) เป็น drug of choice ตัวแรกในการรักษาภาวะ Anaphylaxis'},
    {q:'พยาบาลพบว่าผู้ป่วยกระสับกระส่ายมากหลังผ่าตัด สาเหตุที่เป็นไปได้คือข้อใด?',o:['ปวดแผล','ภาวะออกซิเจนในเลือดต่ำ (Hypoxia)','ปัสสาวะเต็มกระเพาะปัสสาวะ (Urinary retention)','ถูกทุกข้อ'],a:3,e:'ความกระสับกระส่ายเป็นอาการที่พบบ่อยและอาจเกิดจากหลายสาเหตุ รวมถึง hypoxia, pain, และ urinary retention'},
    {q:'เมื่อสงสัยว่าผู้ป่วยมี Pulmonary Embolism (PE) หลังผ่าตัด อาการที่โดดเด่นคือ?',o:['เหนื่อยหอบกะทันหัน หายใจเร็ว เจ็บหน้าอก','ไข้สูง หนาวสั่น','ปวดแผลผ่าตัดรุนแรง','ปวดศีรษะ อาเจียน'],a:0,e:'PE มักมาด้วยอาการ dyspnea กะทันหัน tachypnea และ pleuritic chest pain'},
  ]
};
const LB=[
  {r:1,n:'พยบ. สุดารัตน์ (หัวหน้าวอร์ด)',xp:4820,lv:9,st:45},
  {r:2,n:'พยบ. อรทัย (วิสัญญี)',xp:4350,lv:8,st:32},
  {r:3,n:'พยบ. สมชาย (OR)',xp:3990,lv:7,st:28},
  {r:4,n:'จนท. กิตติ (ผู้ช่วยพยาบาล)',xp:3650,lv:7,st:21},
  {r:5,n:'พยบ. วิไลวรรณ (IPD)',xp:3100,lv:6,st:15},
  {r:6,n:'จนท. มานี (PN)',xp:2750,lv:5,st:12},
  {r:7,n:'พยบ. ใจดี (OPD)',xp:2400,lv:4,st:9},
  {r:8,n:'นศพ. ภาคภูมิ',xp:1800,lv:3,st:5},
  {r:9,n:'จนท. สายสมร',xp:1200,lv:2,st:3},
  {r:10,n:'จนท. สมปอง',xp:500,lv:1,st:1},
];

const BDEFS=[
  {id:'q3',ic:'🎯',n:'Care Advisor',d:'ทำแบบทดสอบให้คำแนะนำครบ 3 ชุด',f:s=>s.qc>=3},
  {id:'b2',ic:'📚',n:'Knowledge Seeker',d:'อ่านคู่มือการดูแลครบ 2 เล่ม',f:s=>s.bc>=2},
  {id:'st3',ic:'🔥',n:'7-Day Streak',d:'เรียนรู้ 7 วันต่อเนื่อง',f:s=>s.streak>=7},
  {id:'xp500',ic:'⭐',n:'Rising Star',d:'XP ครบ 500',f:s=>s.xp>=500},
  {id:'v5',ic:'🎬',n:'Visual Learner',d:'ดูวิดีโอสาธิตครบ 5 คลิป',f:s=>s.vc>=5},
  {id:'lv5',ic:'💎',n:'Senior Staff',d:'ถึงเลเวล 5',f:s=>s.lv>=5},
];

// ── STATE ─────────────────────────────────────────────────
const DEF={xp:0,lv:1,streak:1,ld:new Date().toDateString(),badges:[],vp:{},vc:0,bp:{},bc:0,qh:{},qc:0,gc:0,bw:0};
let S=()=>{
  try{
    const sv=localStorage.getItem('lt_s');
    if(sv){
      const p=JSON.parse(sv);
      const t=new Date().toDateString(),y=new Date(Date.now()-864e5).toDateString();
      if(p.ld!==t){p.streak=(p.ld===y)?(p.streak||0)+1:1;p.ld=t;}
      return {...DEF,...p};
    }
  }catch(e){}
  return {...DEF};
};
let ST=S();
const save=()=>localStorage.setItem('lt_s',JSON.stringify(ST));

function lvInfo(){
  const xpL=500,lv=Math.floor(ST.xp/xpL)+1,inL=ST.xp%xpL;
  return{lv,inL,tot:xpL,pct:inL/xpL*100};
}

// ── GAMIFICATION ─────────────────────────────────────────
function addXP(amt,src=''){
  const old=lvInfo().lv;
  ST.xp+=amt;ST.lv=lvInfo().lv;save();
  toast(`✨ +${amt} XP${src?' — '+src:''}`,'xp');
  if(ST.lv>old)setTimeout(()=>toast(`🆙 เลเวลอัพ! ตอนนี้ Lv.${ST.lv}`,'lvl'),500);
  checkBadges();
  if(tab==='home')renderHome();
}

function checkBadges(){
  BDEFS.forEach(b=>{
    if(!ST.badges.includes(b.id)&&b.f(ST)){
      ST.badges.push(b.id);save();
      setTimeout(()=>{toast(`${b.ic} Badge: ${b.n}!`,'badge');showBModal(b);},800);
    }
  });
}

function toast(msg,type='xp'){
  const c=document.getElementById('toasts');
  const el=document.createElement('div');
  el.className=`toast ${type}`;el.textContent=msg;
  c.appendChild(el);setTimeout(()=>el.remove(),3200);
}

function showBModal(b){
  const m=document.getElementById('bmodal');
  m.innerHTML=`<div class="mbox">
    <div style="font-size:72px;margin-bottom:16px">${b.ic}</div>
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:var(--o);text-transform:uppercase;margin-bottom:8px">Badge ใหม่!</div>
    <h2 style="font-size:22px;font-weight:800;margin-bottom:8px">${b.n}</h2>
    <p style="color:var(--t2);margin-bottom:24px">${b.d}</p>
    <button class="btn bp" onclick="closeBM()">สุดยอด! 🎉</button>
  </div>`;
  m.classList.remove('h');
}
window.closeBM=()=>document.getElementById('bmodal').classList.add('h');

// ── NAV ───────────────────────────────────────────────────
let tab='home';
const NI=[{id:'home',ic:'🏠',l:'หน้าหลัก'},{id:'videos',ic:'▶️',l:'วิดีโอ'},{id:'books',ic:'📖',l:'หนังสือ'},{id:'quiz',ic:'📝',l:'แบบทดสอบ'}];

function renderNav(){
  document.getElementById('nav').innerHTML=NI.map(i=>`
    <button class="nb ${tab===i.id?'active':''}" onclick="sw('${i.id}')" id="nb-${i.id}" aria-label="${i.l}">
      <span class="ni">${i.ic}</span><span>${i.l}</span>
    </button>`).join('');
}

function sw(t){tab=t;renderNav();renderTab(t);document.getElementById('main').scrollTop=0;}

function renderTab(t){
  const f={home:renderHome,videos:renderVideos,books:renderBooks,quiz:renderQuizList};
  if(f[t])f[t]();
}

function trigPB(){
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.querySelectorAll('.pf[data-t]').forEach(el=>{el.style.width=el.dataset.t+'%';});
  }));
}

// ── HOME ──────────────────────────────────────────────────
function renderHome(){
  const li=lvInfo();ST.lv=li.lv;
  const lv=Object.keys(ST.vp).pop();
  const lv_=lv?VID.find(v=>v.id===lv):null;
  const sub=lv_?SM[lv_.s]:null;
  const prog=lv_?(ST.vp[lv_?.id]||0):0;

  let cont=lv_?`
  <div class="card" style="margin:0 20px 16px;cursor:pointer" onclick="viewVid('${lv_.id}')">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <div style="width:48px;height:48px;border-radius:12px;background:${sub.c};display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${sub.ic}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;color:var(--t2);margin-bottom:3px">${sub.n} · วิดีโอ</div>
        <div style="font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${lv_.t}</div>
      </div>
    </div>
    <div class="pt"><div class="pf" data-t="${prog}" style="background:${sub.c}"></div></div>
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--t2)">
      <span>ความคืบหน้า</span><span style="color:${sub.c};font-weight:700">${prog}%</span>
    </div>
  </div>`
  :`<div class="card" style="margin:0 20px 16px;cursor:pointer;text-align:center;padding:24px" onclick="sw('videos')">
    <div style="font-size:40px;margin-bottom:8px">🚀</div>
    <div style="font-weight:700;margin-bottom:4px">เริ่มเรียนได้เลย!</div>
    <div style="color:var(--t2);font-size:14px">แตะเพื่อดูวิดีโอแรก</div>
  </div>`;

  document.getElementById('main').innerHTML=`<div class="page">
    <div style="background:linear-gradient(135deg,#534AB7 0%,#7B74D4 55%,#A78BFA 100%);padding:28px 20px 60px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.07)"></div>
      <div style="position:absolute;bottom:-30px;left:30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.05)"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;position:relative">
        <div>
          <div style="color:rgba(255,255,255,.8);font-size:14px;margin-bottom:4px">สวัสดี 👋</div>
          <h1 style="color:#fff;font-size:24px;font-weight:800">เจ้าหน้าที่</h1>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="background:rgba(255,255,255,.2);border-radius:12px;padding:8px 14px;text-align:center">
            <div style="font-size:18px">🔥</div>
            <div style="color:#fff;font-size:12px;font-weight:700">${ST.streak} วัน</div>
          </div>
          <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:22px">😊</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,.15);border-radius:14px;padding:14px;position:relative">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="color:#fff"><span style="font-size:13px;opacity:.8">เลเวล </span><span style="font-size:22px;font-weight:800">${li.lv}</span></div>
          <div style="text-align:right"><span style="color:rgba(255,255,255,.9);font-size:13px;font-weight:600">${ST.xp} XP</span><span style="color:rgba(255,255,255,.6);font-size:12px"> / ${li.lv*500}</span></div>
        </div>
        <div style="height:7px;background:rgba(255,255,255,.25);border-radius:99px;overflow:hidden">
          <div class="pf" data-t="${li.pct}" style="background:#fff"></div>
        </div>
        <div style="color:rgba(255,255,255,.7);font-size:11px;margin-top:6px">อีก ${500-li.inL} XP ถึงเลเวล ${li.lv+1}</div>
      </div>
    </div>

    <div style="margin-top:-24px">
      <div style="padding:0 20px 8px"><div style="font-size:12px;font-weight:700;color:var(--p);letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px">เรียนต่อ</div></div>
      ${cont}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;padding:0 20px;margin-bottom:22px">
      <div class="card" style="padding:14px;text-align:center"><div style="font-size:22px;margin-bottom:4px">🎬</div><div style="font-size:20px;font-weight:800;color:var(--p)">${ST.vc}</div><div style="font-size:11px;color:var(--t2)">วิดีโอ</div></div>
      <div class="card" style="padding:14px;text-align:center"><div style="font-size:22px;margin-bottom:4px">📝</div><div style="font-size:20px;font-weight:800;color:var(--g)">${ST.qc}</div><div style="font-size:11px;color:var(--t2)">แบบทดสอบ</div></div>
      <div class="card" style="padding:14px;text-align:center"><div style="font-size:22px;margin-bottom:4px">🏅</div><div style="font-size:20px;font-weight:800;color:var(--o)">${ST.badges.length}</div><div style="font-size:11px;color:var(--t2)">Badge</div></div>
    </div>

    <div style="padding:0 20px 8px"><div style="font-size:17px;font-weight:700;margin-bottom:12px">วิชาทั้งหมด</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        ${SUBS.filter(s=>s.id!=='all').map(s=>`
          <button onclick="sw('videos');vf='${s.id}';renderVideos()" style="background:var(--bgc);border:1px solid var(--br);border-radius:var(--rlg);padding:16px;display:flex;align-items:center;gap:12px;cursor:pointer;font-family:var(--f);box-shadow:var(--sh);transition:all .2s">
            <div style="width:40px;height:40px;border-radius:10px;background:${s.c}20;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${s.ic}</div>
            <div style="text-align:left"><div style="font-size:13px;font-weight:700;color:var(--t1)">${s.n}</div><div style="font-size:11px;color:${s.c}">ดูเนื้อหา →</div></div>
          </button>`).join('')}
      </div>
    </div>

    ${ST.badges.length?`<div style="padding:20px 20px 0"><div style="font-size:17px;font-weight:700;margin-bottom:12px">Badge ของฉัน</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${ST.badges.map(bid=>{const b=BDEFS.find(x=>x.id===bid);return b?`<div style="background:var(--bgc);border:1px solid var(--br);border-radius:var(--rlg);padding:14px 16px;display:flex;align-items:center;gap:12px;box-shadow:var(--sh)">
          <span style="font-size:28px">${b.ic}</span>
          <div><div style="font-size:13px;font-weight:700">${b.n}</div><div style="font-size:11px;color:var(--t2)">${b.d}</div></div>
        </div>`:''}).join('')}
      </div></div>`:''}
  </div>`;
  trigPB();
}

// ── VIDEOS ────────────────────────────────────────────────
let vf='all';
window.renderVideos=function(){
  const fil=vf==='all'?VID:VID.filter(v=>v.s===vf);
  document.getElementById('main').innerHTML=`<div class="page">
    <div class="ph"><h1>▶️ วิดีโอ</h1><p>เนื้อหาครบทุกวิชา ดูได้ทุกที่</p></div>
    <div style="padding:24px 0 0">
      <div class="frow">${SUBS.map(s=>`<button class="pill ${vf===s.id?'active':''}" onclick="vf='${s.id}';renderVideos()">${s.ic} ${s.n}</button>`).join('')}</div>
      <div style="padding:0 20px;display:flex;flex-direction:column;gap:12px">
        ${fil.map(v=>{
          const sb=SM[v.s];const pg=ST.vp[v.id]||0;
          const st=pg>=100?'done':pg>0?'watching':'new';
          const sl={done:'ดูแล้ว ✓',watching:'กำลังดู',new:'ใหม่'}[st];
          const sc={done:'var(--g)',watching:'var(--o)',new:'var(--p)'}[st];
          return `<div class="card" style="cursor:pointer;padding:0;overflow:hidden" onclick="viewVid('${v.id}')">
            <div style="height:110px;background:linear-gradient(135deg,${sb.c},${sb.c}88);display:flex;align-items:center;justify-content:center;position:relative">
              <div style="font-size:38px;opacity:.3">${sb.ic}</div>
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
                <div style="width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 16px rgba(0,0,0,.2)">▶️</div>
              </div>
              <div style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,.6);color:#fff;font-size:12px;font-weight:600;padding:3px 8px;border-radius:6px">${v.dur}</div>
              <div style="position:absolute;top:8px;left:8px;background:${sc};color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px">${sl}</div>
            </div>
            <div style="padding:14px">
              <div style="font-size:12px;color:${sb.c};font-weight:600;margin-bottom:4px">${sb.ic} ${sb.n}</div>
              <div style="font-size:15px;font-weight:700;margin-bottom:6px;line-height:1.3">${v.t}</div>
              <div style="font-size:13px;color:var(--t2);margin-bottom:${pg>0?'10px':'0'};white-space:pre-wrap;word-break:break-word;max-height:3.2em;overflow:hidden">${v.sd||''}</div>
              ${pg>0?`<div class="pt"><div class="pf" data-t="${pg}" style="background:${sb.c}"></div></div>`:''}
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
  trigPB();
};

window.viewVid=function(id){
  const v=VID.find(x=>x.id===id);if(!v)return;
  const sb=SM[v.s];const pg=ST.vp[id]||0;
  const rel=VID.filter(x=>x.s===v.s&&x.id!==id).slice(0,3);
  document.getElementById('main').innerHTML=`<div class="page">
    <div style="background:linear-gradient(135deg,${sb.c},${sb.c}CC);padding:20px 20px 32px">
      <button class="bb" onclick="renderVideos()">← กลับ</button>
      <h1 style="color:#fff;font-size:19px;font-weight:800;line-height:1.3;margin-bottom:6px">${v.t}</h1>
      <div style="color:rgba(255,255,255,.8);font-size:13px">${sb.ic} ${sb.n} · ${v.dur}</div>
    </div>
    <div style="margin:-12px 20px 0;border-radius:var(--rlg);overflow:hidden;box-shadow:var(--shl);aspect-ratio:16/9">
      <iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen style="width:100%;height:100%;display:block;"></iframe>
      <div style="height:4px;background:#222"><div id="vbar" style="height:100%;background:${sb.c};width:${pg}%;transition:width .3s"></div></div>
      <div style="background:#111;padding:12px 18px;display:flex;align-items:center;justify-content:space-between">
        <div style="color:#aaa;font-size:13px">0:00 / ${v.dur}</div>
        <button onclick="markWatched('${id}')" style="background:${pg>=100?'#333':''+sb.c};color:#fff;border:none;border-radius:99px;padding:8px 18px;font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s">
          ${pg>=100?'✓ ดูแล้ว':'✅ ดูจบแล้ว (+20 XP)'}
        </button>
      </div>
    </div>
    <div style="padding:20px 20px 0">
      <h2 style="font-size:16px;font-weight:700;margin-bottom:8px">รายละเอียด</h2>
      <div style="white-space:pre-wrap;line-height:1.7;color:var(--t2);font-size:14px">${v.d}</div>
    </div>
    ${rel.length?`<div style="padding:20px 20px 0">
      <h2 style="font-size:16px;font-weight:700;margin-bottom:12px">วิดีโอถัดไป</h2>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${rel.map(r=>`<div class="crow" style="cursor:pointer" onclick="viewVid('${r.id}')">
          <div style="width:50px;height:50px;border-radius:10px;background:${sb.c}33;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${sb.ic}</div>
          <div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.t}</div><div style="font-size:12px;color:var(--t2)">${r.dur}</div></div>
          <span style="color:var(--t3);font-size:20px">›</span>
        </div>`).join('')}
      </div>
    </div>`:''}
  </div>`;
};

window.markWatched=function(id){
  if((ST.vp[id]||0)>=100){toast('✓ ดูวิดีโอนี้แล้ว','xp');return;}
  ST.vp[id]=100;ST.vc=Object.values(ST.vp).filter(v=>v>=100).length;save();
  addXP(20,'ดูวิดีโอ');
  const bar=document.getElementById('vbar');if(bar)bar.style.width='100%';
};

// ── BOOKS ─────────────────────────────────────────────────
window.renderBooks=function(){
  document.getElementById('main').innerHTML=`<div class="page">
    <div class="ph"><h1>📖 หนังสือ</h1><p>อ่าน E-Book ทุกวิชา พร้อมบันทึกโน้ต</p></div>
    <div style="padding:24px 20px 0;display:grid;grid-template-columns:1fr 1fr;gap:14px">
      ${BKS.map(b=>{
        const done=ST.bp[b.id]||0;const pg=Math.round(done/b.ch*100);const sb=SM[b.s];
        return `<div class="card" style="cursor:pointer;padding:0;overflow:hidden" onclick="openBook('${b.id}')">
          <div style="height:100px;background:linear-gradient(135deg,${b.c},${b.c}AA);display:flex;align-items:center;justify-content:center;font-size:36px;position:relative">
            ${sb.ic}
            ${pg>=100?`<div style="position:absolute;top:6px;right:6px;background:var(--g);border-radius:99px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:700">✓</div>`:''}
          </div>
          <div style="padding:12px">
            <div style="font-size:13px;font-weight:800;margin-bottom:2px;line-height:1.2">${b.t}</div>
            <div style="font-size:11px;color:var(--t2);margin-bottom:8px">${b.a}</div>
            <div class="pt" style="height:5px"><div class="pf" data-t="${pg}" style="background:${b.c}"></div></div>
            <div style="font-size:11px;color:${b.c};font-weight:700;margin-top:4px">${pg}% อ่านแล้ว</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
  trigPB();
};

window.openBook=function(id){
  const b=BKS.find(x=>x.id===id);if(!b)return;
  const cur=Math.min((ST.bp[id]||0)+1,b.ch);
  openCh(id,cur);
};

let hlMode=false;
window.openCh=function(bid,n){
  const b=BKS.find(x=>x.id===bid);if(!b)return;
  const sb=SM[b.s];const done=ST.bp[bid]||0;
  const ck=BKCONTENT[bid+'_'+n]||BKCONTENT.default(b,n);
  const qset=QS.find(q=>q.s===b.s);const rVid=VID.find(v=>v.s===b.s);
  document.getElementById('main').innerHTML=`<div class="page">
    <div style="background:linear-gradient(135deg,${b.c},${b.c}CC);padding:20px 20px 32px">
      <button class="bb" onclick="renderBooks()">← กลับ</button>
      <h1 style="color:#fff;font-size:18px;font-weight:800;margin-bottom:4px">${b.t}</h1>
      <div style="color:rgba(255,255,255,.8);font-size:13px">${sb.ic} บทที่ ${n}</div>
    </div>
    <div style="padding:0 20px;margin-top:-12px">
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px;font-weight:700">ความคืบหน้า</span>
          <span style="font-size:13px;color:${b.c};font-weight:700">${done}/${b.ch} บท</span>
        </div>
        <div class="pt"><div class="pf" data-t="${Math.round(done/b.ch*100)}" style="background:${b.c}"></div></div>
        <div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">
          ${Array.from({length:b.ch},(_,i)=>i+1).map(x=>`
            <button onclick="openCh('${bid}',${x})" style="width:34px;height:34px;border-radius:8px;background:${x===n?b.c:x<=done?b.c+'33':'var(--bgi)'};color:${x===n?'#fff':x<=done?b.c:'var(--t2)'};border:${x===n?'none':'1.5px solid var(--br)'};font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s">${x}</button>
          `).join('')}
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:14px">
        <button onclick="hlBtn()" id="hlb" style="flex:1;padding:10px;border-radius:var(--rmd);background:rgba(186,117,23,.1);color:var(--o);border:1.5px solid rgba(186,117,23,.3);font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s">🖌️ ไฮไลต์</button>
        <button onclick="openNote()" style="flex:1;padding:10px;border-radius:var(--rmd);background:var(--pxl);color:var(--p);border:1.5px solid rgba(83,74,183,.3);font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer">📝 โน้ต</button>
        ${rVid?`<button onclick="viewVid('${rVid.id}')" style="flex:1;padding:10px;border-radius:var(--rmd);background:rgba(29,158,117,.1);color:var(--g);border:1.5px solid rgba(29,158,117,.3);font-family:var(--f);font-size:13px;font-weight:700;cursor:pointer">▶️ วิดีโอ</button>`:''}
      </div>
      <div id="rdr" style="font-size:14px;line-height:1.9;color:var(--t1);margin-bottom:16px">${ck}</div>
      ${qset?`<button class="btn bgh" style="margin-bottom:10px" onclick="goQuiz('${qset.id}')">📝 ทำแบบทดสอบบทนี้</button>`:''}
      ${n<=done?`<button class="btn bg_" style="opacity:.6" disabled>✓ อ่านบทนี้แล้ว</button>`:`<button class="btn bp" onclick="finCh('${bid}',${n})">✅ ครบบทแล้ว (+15 XP)</button>`}
    </div>
  </div>`;
  trigPB();
};

window.hlBtn=function(){
  hlMode=!hlMode;
  const btn=document.getElementById('hlb');const rdr=document.getElementById('rdr');
  if(btn)btn.style.background=hlMode?'rgba(186,117,23,.3)':'rgba(186,117,23,.1)';
  if(rdr)rdr.style.userSelect=hlMode?'text':'none';
  if(hlMode)toast('🖌️ โหมดไฮไลต์เปิดแล้ว เลือกข้อความเพื่อไฮไลต์','xp');
};

window.openNote=function(){
  const ov=document.createElement('div');ov.className='ov';
  ov.innerHTML=`<div class="mbox" style="width:100%">
    <h3 style="font-size:18px;font-weight:800;margin-bottom:14px">📝 บันทึกโน้ต</h3>
    <textarea id="nta" style="width:100%;height:110px;border:1.5px solid var(--br);border-radius:12px;padding:12px;font-family:var(--f);font-size:14px;background:var(--bgi);color:var(--t1);resize:none;outline:none" placeholder="พิมพ์โน้ตที่นี่..."></textarea>
    <div style="display:flex;gap:10px;margin-top:14px">
      <button class="btn bgh" style="flex:1" onclick="this.closest('.ov').remove()">ยกเลิก</button>
      <button class="btn bp" style="flex:1" onclick="svNote(this)">💾 บันทึก</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
};
window.svNote=function(btn){
  const v=document.getElementById('nta').value;
  btn.closest('.ov').remove();
  if(v.trim())toast('💾 บันทึกโน้ตแล้ว!','badge');
};
window.finCh=function(bid,n){
  if((ST.bp[bid]||0)<n){
    ST.bp[bid]=n;
    const b=BKS.find(x=>x.id===bid);
    if(n>=b.ch)ST.bc=Object.keys(ST.bp).filter(k=>ST.bp[k]>=(BKS.find(b=>b.id===k)?.ch||99)).length;
    save();addXP(15,'อ่านหนังสือ');openCh(bid,n);
  }
};
window.goQuiz=function(qid){tab='quiz';renderNav();beginQuiz(qid);};

// ── QUIZ ──────────────────────────────────────────────────
window.renderQuizList=function(){
  document.getElementById('main').innerHTML=`<div class="page">
    <div class="ph"><h1>📝 แบบทดสอบ</h1><p>วัดความรู้และรับ XP เพิ่ม</p></div>
    <div style="padding:24px 20px 0;display:flex;flex-direction:column;gap:12px">
      ${QS.map(q=>{
        const sb=SM[q.s];const done=ST.qh[q.id];
        return `<div class="card" style="cursor:pointer" onclick="beginQuiz('${q.id}')">
          <div style="display:flex;align-items:center;gap:14px">
            <div style="width:52px;height:52px;border-radius:14px;background:${sb.c}22;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${sb.ic}</div>
            <div style="flex:1">
              <div style="font-size:12px;color:${sb.c};font-weight:600;margin-bottom:3px">${sb.n}</div>
              <div style="font-size:16px;font-weight:800">${q.t}</div>
              <div style="font-size:12px;color:var(--t2);margin-top:3px">${q.n} ข้อ · ${q.tm} วินาที/ข้อ</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              ${done!==undefined?`<div style="font-size:20px;font-weight:800;color:${done>=80?'var(--g)':done>=60?'var(--o)':'var(--r)'}">${done}%</div><div style="font-size:11px;color:var(--t2)">คะแนนล่าสุด</div>`:`<div class="chip cp">ใหม่</div>`}
            </div>
          </div>
        </div>`;
      }).join('')}
      <div class="card" style="background:linear-gradient(135deg,rgba(83,74,183,.08),rgba(83,74,183,.04));text-align:center;padding:20px">
        <div style="font-size:32px;margin-bottom:8px">💡</div>
        <div style="font-weight:700;margin-bottom:4px">เคล็ดลับ</div>
        <div style="font-size:13px;color:var(--t2);line-height:1.6">ทำแบบทดสอบบ่อยๆ เพื่อทบทวนความรู้และรับ XP เพิ่ม</div>
      </div>
    </div>
  </div>`;
};

let QST=null,QTM=null;
window.beginQuiz=function(qid){
  const qs=QQ[qid]||[];
  QST={id:qid,qs,cur:0,ans:[],done:false};
  renderQQ();
};

function renderQQ(){
  clearInterval(QTM);
  const{qs,cur}=QST;const q=qs[cur];
  const set=QS.find(x=>x.id===QST.id);let tl=set?set.tm:60;
  QST.done=false;
  document.getElementById('main').innerHTML=`<div class="page">
    <div style="background:linear-gradient(135deg,var(--p),var(--pl));padding:20px 20px 32px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <button class="bb" style="margin-bottom:0" onclick="clearInterval(QTM);renderQuizList()">✕ ออก</button>
        <div style="color:#fff;font-size:14px;font-weight:700">${cur+1} / ${qs.length}</div>
      </div>
      <div style="display:flex;gap:5px">${qs.map((_,i)=>`<div style="flex:1;height:4px;border-radius:99px;background:${i<cur?'rgba(255,255,255,.9)':i===cur?'rgba(255,255,255,.55)':'rgba(255,255,255,.22)'}"></div>`).join('')}</div>
    </div>
    <div style="padding:0 20px;margin-top:-12px">
      <div class="card" style="margin-bottom:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
          <div class="chip cp">ข้อที่ ${cur+1}</div>
          <div style="position:relative;width:40px;height:40px">
            <svg width="40" height="40" style="position:absolute;top:0;left:0;transform:rotate(-90deg)">
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--br)" stroke-width="3"/>
              <circle id="tc" cx="20" cy="20" r="16" fill="none" stroke="var(--p)" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="0" style="transition:stroke-dashoffset 1s linear"/>
            </svg>
            <span id="tt" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--p)">${tl}</span>
          </div>
        </div>
        <p style="font-size:16px;font-weight:700;line-height:1.6">${q.q}</p>
      </div>
      <div id="opts" style="display:flex;flex-direction:column;gap:10px">
        ${q.o.map((opt,i)=>`<button id="o${i}" onclick="ansQ(${i})" style="background:var(--bgc);border:2px solid var(--br);border-radius:var(--rmd);padding:14px 16px;text-align:left;font-family:var(--f);font-size:14px;font-weight:600;color:var(--t1);cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:12px;box-shadow:var(--sh)">
          <div style="width:28px;height:28px;border-radius:8px;background:var(--bgi);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:var(--t2);flex-shrink:0">${['ก','ข','ค','ง'][i]}</div>${opt}
        </button>`).join('')}
      </div>
      <div id="exp" style="display:none;margin-top:14px"></div>
      <div id="nxt" style="display:none;margin-top:14px"><button class="btn bp" onclick="nxtQ()">${cur+1<qs.length?'ข้อถัดไป →':'ดูผลคะแนน 🎉'}</button></div>
    </div>
  </div>`;
  const tc=document.getElementById('tc');const tt=document.getElementById('tt');
  QTM=setInterval(()=>{
    tl--;if(tt)tt.textContent=tl;
    if(tc)tc.style.strokeDashoffset=((set.tm-tl)/set.tm)*100;
    if(tl<=10&&tt)tt.style.color='var(--r)';
    if(tl<=0){clearInterval(QTM);if(!QST.done)ansQ(-1);}
  },1000);
}

window.ansQ=function(sel){
  if(QST.done)return;QST.done=true;clearInterval(QTM);
  const q=QST.qs[QST.cur];const ok=sel===q.a;
  QST.ans.push({sel,ok,q});
  for(let i=0;i<q.o.length;i++){
    const b=document.getElementById(`o${i}`);if(!b)continue;
    b.onclick=null;b.style.cursor='default';
    if(i===q.a){b.style.background='rgba(29,158,117,.12)';b.style.borderColor='var(--g)';b.style.color='var(--g)';if(ok&&i===sel)b.classList.add('ac');}
    else if(i===sel&&!ok){b.style.background='rgba(229,57,53,.1)';b.style.borderColor='var(--r)';b.style.color='var(--r)';b.classList.add('aw');}
    else b.style.opacity='.35';
  }
  const exp=document.getElementById('exp');
  if(exp){exp.style.display='block';exp.innerHTML=`<div style="background:${ok?'rgba(29,158,117,.1)':'rgba(229,57,53,.08)'};border:1.5px solid ${ok?'var(--g)':'var(--r)'};border-radius:var(--rmd);padding:16px">
    <div style="font-size:16px;font-weight:800;margin-bottom:6px;color:${ok?'var(--g)':'var(--r)'}">${ok?'✅ ถูกต้อง! +3 คะแนน':'❌ ไม่ถูกต้อง'}</div>
    <div style="font-size:14px;color:var(--t1);line-height:1.7">💡 ${q.e}</div>
  </div>`;}
  const nxt=document.getElementById('nxt');if(nxt)nxt.style.display='block';
};

window.nxtQ=function(){
  QST.cur++;
  if(QST.cur>=QST.qs.length)showQR();
  else{renderQQ();document.getElementById('main').scrollTop=0;}
};

function showQR(){
  clearInterval(QTM);
  const{ans,qs,id}=QST;const ok=ans.filter(a=>a.ok).length;const tot=qs.length;
  const pct=Math.round(ok/tot*100);const sc=pct>=80?'var(--g)':pct>=60?'var(--o)':'var(--r)';
  ST.qh[id]=pct;ST.qc=Object.keys(ST.qh).length;save();addXP(30,'ทำแบบทดสอบ');
  document.getElementById('main').innerHTML=`<div class="page">
    <div style="background:linear-gradient(135deg,var(--p),var(--pl));padding:40px 20px 60px;text-align:center">
      <div style="font-size:72px;margin-bottom:14px">${pct>=80?'🏆':pct>=60?'👍':'💪'}</div>
      <h1 style="color:#fff;font-size:26px;font-weight:800;margin-bottom:6px">ผลการทดสอบ</h1>
      <div style="color:rgba(255,255,255,.8);font-size:14px">${QS.find(q=>q.id===id)?.t}</div>
    </div>
    <div style="margin:-30px 20px 0">
      <div class="card" style="text-align:center;padding:28px">
        <div style="font-size:60px;font-weight:900;color:${sc};margin-bottom:6px">${pct}%</div>
        <div style="font-size:17px;font-weight:700;margin-bottom:4px">${ok} / ${tot} ข้อถูก</div>
        <div style="color:var(--t2);font-size:13px;margin-bottom:20px">${pct>=80?'ยอดเยี่ยม!':pct>=60?'ผ่าน! ทบทวนเพิ่มอีกนิด':'ต้องฝึกเพิ่มนะ!'}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="background:rgba(29,158,117,.1);border-radius:12px;padding:14px"><div style="font-size:24px;font-weight:800;color:var(--g)">${ok}</div><div style="font-size:13px;color:var(--t2)">ตอบถูก</div></div>
          <div style="background:rgba(229,57,53,.1);border-radius:12px;padding:14px"><div style="font-size:24px;font-weight:800;color:var(--r)">${tot-ok}</div><div style="font-size:13px;color:var(--t2)">ตอบผิด</div></div>
        </div>
      </div>
    </div>
    ${ans.some(a=>!a.ok)?`<div style="padding:20px 20px 0">
      <h2 style="font-size:16px;font-weight:800;margin-bottom:12px">📋 ข้อที่ตอบผิด</h2>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${ans.filter(a=>!a.ok).map((a,i)=>`<div class="card" style="border-left:3px solid var(--r)">
          <div style="font-size:13px;font-weight:700;color:var(--r);margin-bottom:6px">ข้อที่ ${qs.indexOf(a.q)+1}</div>
          <p style="font-size:14px;font-weight:600;margin-bottom:8px">${a.q.q}</p>
          <div style="font-size:13px;color:var(--g)">✅ เฉลย: ${a.q.o[a.q.a]}</div>
          <div style="font-size:13px;color:var(--t2);margin-top:6px">💡 ${a.q.e}</div>
        </div>`).join('')}
      </div>
    </div>`:''}
    <div style="padding:20px;display:flex;flex-direction:column;gap:10px">
      <button class="btn bp" onclick="beginQuiz('${id}')">🔄 ทำอีกครั้ง</button>
      <button class="btn bgh" onclick="renderQuizList()">← กลับรายการ</button>
    </div>
  </div>`;
}


// LEADERBOARD
window.showLB=function(){
  const li=lvInfo();
  document.getElementById('main').innerHTML=`<div class="page">
    <div class="ph">
      <button class="bb" onclick="sw('home')">← กลับ</button>
      <h1>🏆 กระดานคะแนน</h1><p>Top 10 ผู้เรียนประจำสัปดาห์</p>
    </div>
    <div style="padding:24px 20px 0">
      <div class="card" style="padding:0;overflow:hidden">
        <div style="background:var(--p);padding:10px 16px;display:grid;grid-template-columns:32px 1fr 60px 44px;gap:8px;align-items:center">
          ${['#','ชื่อ','XP','Lv.'].map(h=>`<div style="color:rgba(255,255,255,.7);font-size:12px;font-weight:700;${h==='XP'?'text-align:right':h==='Lv.'?'text-align:center':''}">${h}</div>`).join('')}
        </div>
        ${LB.map((p,i)=>{
          const md=i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
          return `<div style="padding:12px 16px;display:grid;grid-template-columns:32px 1fr 60px 44px;gap:8px;align-items:center;background:${i%2===0?'transparent':'rgba(83,74,183,.03)'};border-bottom:1px solid var(--br)">
            <div style="font-size:14px;font-weight:800;color:${i<3?['#FFD700','#C0C0C0','#CD7F32'][i]:'var(--t3)'}">${md||p.r}</div>
            <div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.n}</div>
            <div style="font-size:13px;font-weight:800;color:var(--p);text-align:right">${p.xp.toLocaleString()}</div>
            <div style="text-align:center"><span class="chip cp" style="font-size:11px;padding:2px 8px">${p.lv}</span></div>
          </div>`;
        }).join('')}
        <div style="padding:12px 16px;display:grid;grid-template-columns:32px 1fr 60px 44px;gap:8px;align-items:center;background:rgba(83,74,183,.12);border-top:2px solid var(--p)">
          <div style="font-size:14px;font-weight:800;color:var(--p)">?</div>
          <div style="font-size:13px;font-weight:800;color:var(--p)">👤 คุณ</div>
          <div style="font-size:13px;font-weight:800;color:var(--p);text-align:right">${ST.xp}</div>
          <div style="text-align:center"><span class="chip cp" style="font-size:11px;padding:2px 8px">${li.lv}</span></div>
        </div>
      </div>
    </div>
  </div>`;
};

// ── INIT ──────────────────────────────────────────────────
async function init(){
  try {
    const res = await fetch('/api/videos');
    if(res.ok) VID = await res.json();
  } catch(e) { console.error('Error loading videos:', e); }
  renderNav();
  renderHome();
}
document.addEventListener('DOMContentLoaded',init);
