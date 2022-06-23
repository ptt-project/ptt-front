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
    confirm: 'ยืนยัน',
    next: 'ต่อไป',
    close: 'ปิด'
  },
  auth: {
    register: {
      title: 'สมัครสมาชิก',
      form: {
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
      consent: {
        title: 'ขอความยินยอม',
        content: '...do something',
        checkbox: 'กรุณาติ๊กเพื่อรับทราบและยินยอม',
        otp: {
          title: 'ยืนยัน OTP ไปยังหมายเลขหลัก',
          label: 'OTP',
          ref: 'Ref code: 1234',
          request: 'ส่งอีกครั้ง'
        }
      },
      success: {
        title: 'สมัครสมาชิกสำเร็จ',
        message: 'ระบบได้สมัครสมาชิกให้เรียบร้อยแล้ว กรุณากดปุ่ม เข้าสู่ระบบ เพื่อเข้าใช้งานถัดไป',
        login: 'เข้าสู่ระบบ'
      }
    }
  },
  header: {
    titleSellerCentre: 'Seller centre',
    signIn: 'Sign in',
    register: 'Register'
  }
}
