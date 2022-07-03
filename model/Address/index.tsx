export interface IAddressFormValues {
  id?: string
  fullName: string
  mobileNo: string
  province: string
  district: string
  postalCode: string
  addressDetails: string
  location: google.maps.LatLngLiteral
  addressType?: 'home' | 'office'
  isDefault?: boolean
  isStore?: boolean
  isRefundStore?: boolean
}
