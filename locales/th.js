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
    confirm: 'ยืนยัน',
    save: 'บันทึก',
    send:'ส่ง',
    form: {
      option: '---------- เลือก ----------',
      required: 'กรุณาระบุ',
      invalid: {
        head: 'รูปแบบ',
        tail: 'ไม่ถูกต้อง'
      },
      min: {
        head: 'กรุณาระบุตัวอักษรอย่างน้อย',
        tail: 'ตัวอักษร'
      },
      max: {
        head: 'รองรับตัวอักษรสูงสุด',
        tail: 'ตัวอักษร'
      },
      notFound: {
        head: 'ไม่พบ',
        tail: 'ในระบบ'
      },
      unique: 'นี้มีอยู่ในระบบแล้ว'
    }
  },
  components: {
    header: {
      top: {
        shop: 'Seller centre',
        lang: {
          th: 'TH',
          en: 'EN'
        },
        signIn: 'เข้าสู่ระบบ',
        signUp: 'ลงทะเบียน'
      },
      middle: {
        tel: {
          title: 'ติดต่อเรา:',
          no: '0(800) 123-456'
        },
        search: 'Search...'
      },
      bottom: {
        search: 'Search...',
        a: {
          title: 'Home'
        },
        b: {
          title: 'Categories'
        },
        c: {
          title: 'Products'
        },
        d: {
          title: 'Pages'
        },
        e: {
          title: 'Blog'
        },
        f: {
          title: 'Elements'
        },
        g: {
          title: 'About Us'
        }
      }
    },
    footer: {
      copyRight: 'Happy Shopping © 2022. All Rights Reserved'
    },
    otpModal: {
      title: 'ยืนยัน OTP ไปยังหมายเลขหลัก',
      label: 'OTP',
      ref: 'Ref code:',
      request: 'ส่งอีกครั้ง'
    }
  },
  auth: {
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
        emailOrMobileNo: 'E-mail/หมายเลขโทรศัพท์'
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
      breadcrumbs: {
        setting: 'ตั้งค่า',
        account: 'บัญชีผู้ใช้',
        changePassword: 'เปลี่ยนรหัสผ่าน'
      },
      error: {
        passwordInValid: 'รหัสผ่านไม่ถูกต้อง',
        passwordFormatInValid: 'รูปแบบรหัสผ่านไม่ถูกต้อง',
        confirmPasswordNotMatched: 'ยืนยันรหัสผ่านไม่ตรงกัน'
      }
    },
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
        loginB: 'เข้าสู่ระบบ'
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
    registerSeller: {
      title: 'ลงทะเบียนเพื่อสมัครร้านค้า',
      section: {
        contact: 'ข้อมูลผู้ติดต่อ',
        brand: 'แบรนด์สินค้า',
        info: 'ข้อมูลเพิ่มเติม'
      },
      form: {
        shopType: {
          title: 'ประเภทร้านค้า',
          normal: 'ร้านค้าปกติ',
          mall: 'ร้านค้า Mall'
        },
        name: 'ชื่อ-นามสกุล',
        tel: 'หมายเลขโทรศัพท์',
        email: 'อีเมล',
        corporateName: 'ชื่อบริษัท',
        corporateNo: 'เลขทะเบียนนิติบุคคล',
        brand: 'ชื่อแบรนด์สินค้าหลักที่ต้องการเปิดร้าน',
        category: 'หมวดหมู่สินค้าหลักของร้านค้า',
        website: 'เว็บไซต์ของแบรนด์สินค้าหลัก',
        facebook: 'Facebook Page ของแบรนด์สินค้าหลักหรือร้านค้าของคุณ',
        instagram: 'Instagram ของแบรนด์สินค้าหลักหรือร้านค้าของคุณ',
        other: 'Social Media อื่นๆ ของแบรนด์สินค้าหลักหรือร้านค้าของคุณ',
        corporate: 'นิติบุคคลของคุณเกี่ยวข้องอย่างไรกับแบรนด์สินค้าหลักที่ต้องการเปิดร้าน',
        corporateDetail:
          'นอกเหนือจากช่องทางออนไลน์ โปรดยกตัวอย่างชื่อร้านค้าหรือสถานที่จัดจำหน่ายแบรนด์สินค้าของคุณ / ร้านค้าของคุณ',
        info: 'โปรดระบุข้อมูลเพิ่มเติมเพื่อให้เรารู้จักคุณมากขึ้น'
      },
      success: {
        title: 'กำลังตรวจสอบข้อมูล',
        message: 'ทีมงานกำลังพิจารณาคำขอเปิดบัญชีร้านค้าของคุณอาจใช้เวลาประมาณ 2-3 วันทำการ'
      }
    }
  },
  address: {
    addressLabel: 'ที่อยู่',
    listAddressTitle: 'บัญชีผู้ใช้',
    addAddressTitle: 'เพิ่มที่อยู่',
    editAddressTitle: 'แก้ไขที่อยู่',
    addAddress: '+ เพิ่มที่อยู่',
    deleteAddress: 'ลบที่อยู่',
    confirmDeleteAddress: 'ยืนยันการลบที่อยู่',
    warningMsgDeleteAddress: 'ข้อมูลจะถูกลบและไม่สามารถกู้คืนได้',
    yourLocation: 'Your Location',
    emptyAddress: 'ยังไม่มีข้อมูลที่อยู่กรุณา',
    form: {
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
    },
    breadcrumbs: {
      setting: 'ตั้งค่า',
      account: 'บัญชีผู้ใช้',
      address: 'ที่อยู่',
      addAddress: 'เพิ่มที่อยู่',
      editAddress: 'แก้ไขที่อยู่'
    }
  },
  accountProfile: {
    form: {
      title: 'บัญชีผู้ใช้',
      setting: 'ตั้งค่า',
      personalInfo: 'ข้อมูลส่วนตัว',
      memberId: 'รหัสสมาชิก',
      username: 'ชื่อผู้ใช้',
      msgChooseImage: 'ไฟล์ JPEG,PNG ขนาดไฟล์ไม่เกิน 1 MB',
      firstName: 'ชื่อ',
      lastName: 'นามสกุล',
      birthday: 'วันเกิด',
      date: 'วันที่',
      month: 'เดือน',
      year: 'ปี ค.ศ.',
      gender: 'เพศ',
      man: 'ชาย',
      female: 'หญิง',
      other: 'อื่นๆ',
      email: 'อีเมล',
      phoneNumber: 'หมายเลขโทรศัพท์'
    },
    email: {
      title: 'แก้ไขอีเมล',
      currentEmail: 'อีเมลปัจจุบัน',
      newEmail: 'อีเมลใหม่',
      password: 'รหัสผ่าน',
      msgConfirm: 'กรุณายืนยันตัวตนด้วยการใส่รหัสผ่าน เพื่ออัพเดทอีเมลของคุณ'
    },
    phone: {
      titleEdit: 'แก้ไขหมายเลขโทรศัพท์',
      titleAdd: 'เพิ่มเบอร์โทร',
      phoneList: 'รายการเบอร์โทร',
      newPhone: 'เบอร์โทรศัพท์ใหม่',
      msgConfirm: 'รหัสยืนยันจะถูกส่งไปที่เบอร์ 082-222-2222',
      otp: 'OTP',
      refCode: 'Ref code',
      confirmOTP: 'ยืนยัน OTP ไปยังหมายเลขหลัก',
      deletePhone: 'ลบเบอร์โทร',
      confirmDelete: 'ยืนยันการลบเบอร์โทร',
      msgConfirmDelete: 'ข้อมูลจะถูกลบและไม่สามารถกู้คืนได้'
    },
    button: {
      chooseImage: 'เลือกรูป',
      edit: 'แก้ไข',
      save: 'บันทึก',
      confirm: 'ยืนยัน',
      addPhone: 'เพิ่มเบอร์โทร',
      mainNumber: 'เบอร์หลัก',
      sendVerificationCode: 'ส่งรหัสยืนยัน',
      close: 'ปิด',
      deletePhone: 'ลบเบอร์โทร'
    },
    rules: {
      firstName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
      lastName: 'รองรับตัวอักษรสูงสุด 50 ตัวอักษร',
      email: 'รหัสผ่านไม่ถูกต้อง'
    }
  },
  settingSidebar: {
    buyer: {
      account: {
        title: 'บัญชีผู้ใช้',
        info: 'ข้อมูลส่วนตัว',
        address: 'ที่อยู่',
        password: 'เปลี่ยนรหัสผ่าน',
        relation: 'ความสัมพันธ์'
      },
      wallet: {
        title: 'การเงิน',
        eWallet: 'E-Wallet',
        bank: 'บัญชีธนาคาร',
        point: 'Happy Point'
      },
      coupon: {
        title: 'โค้ดส่วนลด'
      },
      history: {
        title: 'การซื้อของฉัน'
      },
      notification: {
        title: 'การแจ้งเตือน'
      }
    },
    seller: {
      delivery: {
        title: 'การจัดส่ง'
      },
      order: {
        title: 'คำสั่งซื้อ'
      },
      product: {
        title: 'สินค้า'
      },
      marketing: {
        title: 'Marketing Centre'
      },
      payment: {
        title: 'การเงิน'
      },
      report: {
        title: 'รายงาน'
      },
      shop: {
        title: 'ร้านค้า',
        point: 'คะแนนร้านค้า',
        detail: 'รายละเอียดร้านค้า',
        category: 'หมวดหมู่ในร้านค้า',
        recommended: 'ร้านค้าแนะนำ'
      },
      management: {
        title: 'การตั้งค่า',
        address: 'ที่อยู่ของฉัน',
        account: 'บัญชี'
      },
      service: {
        title: 'การบริการลูกค้า'
      }
    }
  },
  shopPoint:{
    shop:'ร้านค้า',
    title:'คะแนนร้านค้า',
    detail:'ดู 500 คะแนนล่าสุดที่ร้านค้าได้รับ',
    part:'/5',
    formSearch:{
      productName:'ชื่อสินค้า',
      productNameChoice:'ชื่อตัวเลือกสินค้า',
      date:'วัน/เดือน/ปี',
      search:'ค้นหา',
      reset:'รีเซ็ต'
    },
    all:'ทั้งหมด',
    waitingForReply:'รอการตอบกลับ',
    replied:'ตอบกลับแล้ว',
    point:{
      one:'1 ดาว',
      two:'2 ดาว',
      three:'3 ดาว',
      four:'4 ดาว',
      five:'5 ดาว',
    },
    productDetail:'รายละเอียดสินค้า',
    reviewDetail:'รายละเอียดการรีวิว',
    yourReply:'การตอบกลับของคุณ',
    reply:'ตอบกลับ',
    user:'ชื่อผู้ใช้',
    orderID:'Order ID',
    msgReply:'ข้อความตอบกลับ'
  }
}
