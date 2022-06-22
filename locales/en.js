export default {
  meta: {
    title: 'Happy Shopping',
    description: 'Happy Shopping',
    keywords: 'Happy Shopping',
    ogTag: {
      url: '',
      type: '',
      title: '',
      description: '',
      image: ''
    }
  },
  common: {
    close: 'ปิด'
  },
  auth: {
    register: {
      title: 'สมัครสมาชิก',
      firstName: 'ชื่อ',
      lastName: 'นามสกุล',
      mobileNo: 'หมายเลขโทรศัพท์',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      passwordHintA: 'ใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ ตัวเลขอารบิกและเครื่องหมายปกติ',
      passwordHintB: 'ความยาว 8-20 ตัวอักษร ประกอบด้วย',
      passwordHintC: 'ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว',
      passwordHintD: 'ตัวพิมพ์เล็กอย่างน้อย 1 ตัว',
      passwordHintE: 'ตัวเลขอย่างน้อย 1 ตัว',
      policyA: 'โดยการเปิดบัญชี PTT รับทราบและตกลงตาม',
      policyB: 'เงื่อนไขการให้บริการ',
      policyBContent: '...do something',
      policyC: 'นโยบายความเป็นส่วนตัว',
      policyCContent: '...do something',
      noteA: 'หรือ',
      noteB: 'หากมีบัญชีผู้ใช้แล้ว คุณสามารถ',
      noteC: 'เข้าสู่ระบบ',
      rules: {
        firstName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
        lastName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
        mobileNo: 'รองรับตัวอักษรสูงสุด 10 ตัวอักษร',
        email: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
        username: 'รองรับตัวอักษรสูงสุด 20 ตัวอักษร',
        password: 'รูปแบบรหัสผ่านไม่ถูกต้อง'
      }
    }
  },
  header:{
    titleSellerCentre:"Seller centre",
    signIn:"Sign in",
    register :"Register"
},
  accountProfile :{
    title:"บัญชีผู้ใช้",
    setting:"ตั้งค่า",
    personalInformation:"ข้อมูลส่วนตัว",
    memberId:"รหัสสมาชิก",
    username:"ชื่อผู้ใช้",
    msgChooseImage:"ไฟล์JPEG,PNG ขนาดไฟล์ไม่เกิน 1 MB",
    firstName:"ชื่อ",
    lastName:"นามสกุล",
    birthday:"วันเกิด",
    date:"วันที่",
    month:"เดือน", 
    year:"ปี ค.ศ.",
    gender:"เพศ",
    man:"ชาย",
    female:"หญิง",
    other:"อื่นๆ",
    email:"อีเมล",
    phoneNumber:"หมายเลขโทรศัพท์",
    button:{
      chooseImage :"เลือกรูป",
      edit:"แก้ไข",
      save:"บันทึก"
    },
    rules: {
      firstName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
      lastName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
    }
  }
}
