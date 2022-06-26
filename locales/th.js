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
    },
    changePassword: {
      title: 'เปลี่ยนรหัสผ่าน',
      password: 'รหัสผ่านปัจจุบัน',
      newPassword: 'รหัสผ่านใหม่',
      confirmNewPassword: 'ยืนยันรหัสผ่านใหม่',
      description: 'ใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ ตัวเลขอารบิกและเครื่องหมายปกติ ความยาว 8-20 ตัวอักษร ประกอบด้วย ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว ตัวพิมพ์เล็กอย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว',
      button: {
        submit: 'ยืนยัน'
      },
      error: {
        passwordInValid: 'รหัสผ่านไม่ถูกต้อง',
        passwordFormatInValid: 'รูปแบบรหัสผ่านไม่ถูกต้อง',
        confirmPasswordNotMatched: 'ยืนยันรหัสผ่านไม่ตรงกัน',
      }
    }
  },
  header: {
    titleSellerCentre: "Seller centre",
    signIn: "เข้าสู่ระบบ",
    register: "ลงทะเบียน"
  }
}
