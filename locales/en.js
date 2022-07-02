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
    ok: 'ตกลง',
    cancel: 'ยกเลิก',
    next: 'ต่อไป',
    close: 'ปิด',
    confirm: 'ยืนยัน'
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
      title: 'ลืมรหัสผ่าน',
      form: {
        emailOrMobileNo: 'E-mail/หมายเลขโทรศัพท์',
        rules: {
          emailOrMobileNo: 'กรุณาระบุ E-mail/หมายเลขโทรศัพท์'
        }
      },
      success: {
        messageA: 'Link ยืนยันตัวตนจะถูกส่งไปที่',
        messageB: 'กรุณายืนยัน'
      }
    },
    changePassword: {
      title: 'เปลี่ยนรหัสผ่าน',
      password: 'รหัสผ่านปัจจุบัน',
      newPassword: 'รหัสผ่านใหม่',
      confirmNewPassword: 'ยืนยันรหัสผ่านใหม่',
      description:
        'ใช้ได้เฉพาะตัวอักษรภาษาอังกฤษ ตัวเลขอารบิกและเครื่องหมายปกติ ความยาว 8-20 ตัวอักษร ประกอบด้วย ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว ตัวพิมพ์เล็กอย่างน้อย 1 ตัว ตัวเลขอย่างน้อย 1 ตัว',
      button: {
        submit: 'ยืนยัน'
      },
      error: {
        passwordInValid: 'รหัสผ่านไม่ถูกต้อง',
        passwordFormatInValid: 'รูปแบบรหัสผ่านไม่ถูกต้อง',
        confirmPasswordNotMatched: 'ยืนยันรหัสผ่านไม่ตรงกัน'
      }
    }
  },
  address: {
    listAddressHeader: 'บัญชีผู้ใช้',
    addAddressHeader: 'เพิ่มที่อยู่',
    editAddressHeader: 'แก้ไขที่อยู่',
    addressFields: {
      fullName: 'ชื่อ-นามสกุล',
      mobileNo: 'หมายเลขโทรศัพท์',
      province: 'จังหวัด',
      district: 'เขต/อำเภอ',
      postalCode: 'รหัสไปรษณีย์',
      addressDetails: 'รายละเอียดที่อยู่',
      location: 'ตำแหน่งของคุณ',
      addressType: 'ติดป้ายเป็น',
      isDefault: 'เลือกเป็นที่อยู่ตั้งต้น',
      isStore: 'เลือกเป็นที่อยู่ในการรับสินค้า',
      isRefundStore: 'เลือกเป็นที่อยู่ในการรับสินค้าคืน'
    }
  },
  header: {
    titleSellerCentre: 'Seller centre',
    signIn: 'เข้าสู่ระบบ',
    register: 'ลงทะเบียน'
  }
}
