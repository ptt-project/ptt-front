export default {
  profile: {
    title: 'บัญชีผู้ใช้',
    setting: 'ตั้งค่า',
    personalInfo: 'ข้อมูลส่วนตัว',
    form: {
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
    }
  },
  sellerPoint: {
    shop: 'ร้านค้า',
    title: 'คะแนนร้านค้า',
    detail: 'ดู 500 คะแนนล่าสุดที่ร้านค้าได้รับ',
    part: '5',
    filters: {
      productName: 'ชื่อสินค้า',
      productNameChoice: 'ชื่อตัวเลือกสินค้า',
      date: 'วัน/เดือน/ปี'
    },
    all: 'ทั้งหมด',
    waitingForReply: 'รอการตอบกลับ',
    replied: 'ตอบกลับแล้ว',
    point: {
      one: '1 ดาว',
      two: '2 ดาว',
      three: '3 ดาว',
      four: '4 ดาว',
      five: '5 ดาว'
    },
    productDetail: 'รายละเอียดสินค้า',
    reviewDetail: 'รายละเอียดการรีวิว',
    yourReply: 'การตอบกลับของคุณ',
    reply: 'ตอบกลับ',
    user: 'ชื่อผู้ใช้',
    orderId: 'Order ID',
    msgReply: 'ข้อความตอบกลับ'
  },
  sellerProducts: {
    list: {
      product: 'สินค้า',
      myProduct: 'สินค้าของฉัน',
      list: 'รายการ',
      uploadProduct: 'อัพโหลดสินค้าเพิ่มอีก',
      items: 'ชิ้น',
      addNewProduct: 'เพิ่มสินค้าใหม่',
      filters: {
        group: 'กลุ่มการค้นหา',
        orderId: 'รหัสคําสั่งซื้อ',
        keyword: 'Keyword ที่ใช้ในการค้นหา',
        category: 'หมวดหมู่'
      },
      all: 'ทั้งหมด',
      waitingForApprove: 'รอ Approve',
      selling: 'ขายอยู่',
      soldOut: 'หมด',
      notPublished: 'ไม่เผยแพร่',
      productName: 'ชื่อสินค้า',
      SKU: 'เลข SKU',
      productSelection: 'ตัวเลือกสินค้า',
      price: 'ราคา',
      warehouse: 'คลัง',
      sales: 'ยอดขาย',
      operation: 'ดำเนินการ'
    },
    delete: {
      title: 'ลบสินค้า',
      msgQuestion: 'ต้องการลบสินค้าต่อไปนี้หรือไม่',
      msgWarning: 'หากการลบสำเร็จ คุณจะไม่สามารถกู้คืนสินค้านี้ได้อีก'
    },
    form: {
      addTitle: 'เพิ่มสินค้า',
      editTitle: 'แก้ไขสินค้า',
      saveHide: 'บันทึกและซ่อน',
      savePublish: 'บันทึกและเผยแพร่',
      info: {
        title: 'ข้อมูลทั่วไป',
        productPicture: 'ภาพสินค้า',
        photoCover: 'ภาพปก',
        picture: 'รูปภาพ',
        videoProduct: 'วิดีโอสินค้า',
        productName: 'ชื่อสินค้า',
        productDetail: 'รายละเอียดสินค้า',
        category: 'หมวดหมู่'
      },
      features: {
        title: 'คุณลักษณะของสินค้า',
        brand: 'แบรนด์',
        weight: 'น้ำหนัก',
        kg: 'กิโลกรัม',
        shelfLife: 'อายุการเก็บรักษา',
        day: 'วัน',
        condition: 'สภาพ',
        old: 'เก่า',
        new: 'ใหม่'
      },
      sales: {
        title: 'ข้อมูลการขาย',
        useOptions: 'ใช้งานตัวเลือกสินค้า',
        price: 'ราคา',
        baht: 'บาท',
        warehouse: 'คลัง',
        sku: 'เลข SKU',
        msgSku: 'ถ้าไม่ใส่ระบบจะสร้างให้อัตโนมัติ',
        optionsForm: {
          productOptions: 'ตัวเลือกสินค้า',
          name: 'ชื่อ',
          choice: 'ตัวเลือก',
          addOption: 'เพิ่มตัวเลือก',
          addOptionChoice: 'เพิ่มตัวเลือกสินค้า 2'
        },
        titleTable: 'รายการตัวเลือกสินค้า',
        productModel: 'รุ่นสินค้า',
        choice2: 'ตัวเลือก 2',
        priceBaht: 'ราคา (บาท)'
      },
      delivery: {
        title: 'การจัดส่ง',
        weight: 'น้ำหนัก',
        size: 'ขนาดพัสดุ',
        kg: 'กิโลกรัม',
        cm: 'cm',
        shippingCost: 'ค่าจัดส่ง',
        standardDelivery: 'Standard Delivery - ส่งธรรมดาในประเทศ',
        ems: 'EMS - Thailand Post (max 20 kg)',
        msgShipping: 'กรุณาใส่น้ำหนักสินค้า'
      },
      other: {
        title: 'อื่นๆ',
        prepareDeliver: 'เตรียมส่งนานกว่าปกติ',
        yes: 'ใช่',
        no: 'ไม่',
        iNeedTime: 'ฉันต้องใช้เวลา',
        day: 'วัน'
      }
    }
  }
}
