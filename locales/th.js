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
  components: {
    otpModal: {
      title: 'ยืนยัน OTP ไปยังหมายเลขหลัก',
      label: 'OTP',
      ref: 'Ref code:',
      request: 'ส่งอีกครั้ง'
    }
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
        divider: 'หรือ',
        loginA: 'หากมีบัญชีผู้ใช้แล้ว คุณสามารถ',
        loginB: 'เข้าสู่ระบบ',
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
        checkbox: 'กรุณาติ๊กเพื่อรับทราบและยินยอม'
      },
      success: {
        title: 'สมัครสมาชิกสำเร็จ',
        message: 'ระบบได้สมัครสมาชิกให้เรียบร้อยแล้ว กรุณากดปุ่ม เข้าสู่ระบบ เพื่อเข้าใช้งานถัดไป',
        login: 'เข้าสู่ระบบ'
      }
    },
    login: {
      title: 'เข้าสู่ระบบ',
      form: {
        username: 'Username',
        password: 'Password'
      },
      divider: 'หรือ',
      forgotPassword: 'ลืมรหัสผ่าน'
    },
    forgotPassword: {
      title: 'ตั้งรหัสผ่านใหม่',
      form: {
        emailOrMobileNo: 'E-mail/หมายเลขโทรศัพท์',
        rules: {
          emailOrMobileNo: 'กรุณาระบุ E-mail/หมายเลขโทรศัพท์'
        }
      }
    }
  },
  header:{
    titleSellerCentre:'Seller centre',
    signIn:'Sign in',
    register :'Register'
},
  accountProfile :{
    form:{
      title:'บัญชีผู้ใช้',
      setting:'ตั้งค่า',
      personalInformation:'ข้อมูลส่วนตัว',
      memberId:'รหัสสมาชิก',
      username:'ชื่อผู้ใช้',
      msgChooseImage:'ไฟล์JPEG,PNG ขนาดไฟล์ไม่เกิน 1 MB',
      firstName:'ชื่อ',
      lastName:'นามสกุล',
      birthday:'วันเกิด',
      date:'วันที่',
      month:'เดือน', 
      year:'ปี ค.ศ.',
      gender:'เพศ',
      man:'ชาย',
      female:'หญิง',
      other:'อื่นๆ',
      email:'อีเมล',
      phoneNumber:'หมายเลขโทรศัพท์',
    },
    email:{
      title:'แก้ไขอีเมล',
      currentEmail:'อีเมลปัจจุบัน',
      newEmail:'อีเมลใหม่',
      password:'รหัสผ่าน',
      msgConfirm:'กรุณายืนยันตัวตนด้วยการใส่รหัสผ่าน เพื่ออัพเดทอีเมลของคุณ'
    },
    phone:{
      titleEdit:'แก้ไขหมายเลขโทรศัพท์',
      titleAdd:'เพิ่มเบอร์โทร',
      phoneList:'รายการเบอร์โทร',
      newPhone:'เบอร์โทรศัพท์ใหม่',
      msgConfirm:'รหัสยืนยันจะถูกส่งไปที่เบอร์ 082-222-2222',
      otp:'OTP',
      refCode:'Ref code',
      confirmOTP:'ยืนยัน OTP ไปยังหมายเลขหลัก',
      deletePhone:'ลบเบอร์โทร',
      confirmDelete:'ยืนยันการลบเบอร์โทร',
      msgConfirmDelete:'ข้อมูลจะถูกลบและไม่สามารถกู้คืนได้'
    },
    button:{
      chooseImage :'เลือกรูป',
      edit:'แก้ไข',
      save:'บันทึก',
      confirm:'ยืนยัน',
      addPhone:'เพิ่มเบอร์โทร',
      mainNumber:'เบอร์หลัก',
      sendVerificationCode:'ส่งรหัสยืนยัน',
      close:'ปิด',
      deletePhone:'ลบเบอร์โทร'
    },
    rules: {
      firstName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
      lastName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
      email:'รหัสผ่านไม่ถูกต้อง'
    }
  }
}
