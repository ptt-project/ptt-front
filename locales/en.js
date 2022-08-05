export default {
  auth: {
    changePassword: {
      title: 'เปลี่ยนรหัสผ่าน',
      password: 'รหัสผ่านปัจจุบัน',
      newPassword: 'รหัสผ่านใหม่',
      confirmNewPassword: 'ยืนยันรหัสผ่านใหม่',
      breadcrumbs: {
        setting: 'ตั้งค่า',
        account: 'บัญชีผู้ใช้',
        changePassword: 'เปลี่ยนรหัสผ่าน'
      }
    }
  },
  address: {
    title: 'ที่อยู่',
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
  relation: {
    title: 'ความสัมพันธ์',
    copyInviteSuccess: 'คัดลอก Link Invite แล้ว',
    button: {
      copyInvite: 'คัดลอก Link Invite'
    },
    tabs: {
      tree: 'แสดงต้นไม้',
      table: 'แสดงแบบตาราง'
    },
    table: {
      username: 'Username',
      relationLevel: 'ระดับความสัมพันธ์',
      commission: 'ส่วนแบ่ง (%)',
      noFilterRelation: 'ทุกระดับความสัมพันธ์',
      childrenUnit: 'คน'
    },
    relationLevel: {
      one: 'ลูก',
      two: 'หลาน',
      three: 'เหลน'
    },
    breadcrumbs: {
      setting: 'ตั้งค่า',
      account: 'บัญชีผู้ใช้',
      relation: 'ความสัมพันธ์'
    }
  }
}
