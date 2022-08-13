export interface IAddressGeoName {
  lat: number
  lng: number
}

export interface IAddress {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  name: string
  mobile: string
  memberId: number
  province: string
  tambon: string
  district: string
  postcode: string
  address: string
  geoName: IAddressGeoName
  isMain: boolean
  isHome: boolean
  isWork: boolean
  isPickup?: boolean
  isReturnItem?: boolean
}

export interface ICreateAddress {
  name: string
  mobile: string
  province: string
  tambon: string
  district: string
  postcode: string
  address: string
  geoName: IAddressGeoName
  isMain: boolean
  isHome: boolean
  isWork: boolean
  isPickup?: boolean
  isReturnItem?: boolean
}

export interface IUpdateAddress {
  name: string
  mobile: string
  province: string
  tambon: string
  district: string
  postcode: string
  address: string
  geoName: IAddressGeoName
  isMain: boolean
  isHome: boolean
  isWork: boolean
  isPickup?: boolean
  isReturnItem?: boolean
}

export interface IAddressFormValues extends IAddress {
  // id?: string
  // fullName: string
  // mobileNo: string
  // province: string
  // district: string
  // postalCode: string
  // addressDetails: string
  // location: google.maps.LatLngLiteral
  addressType?: 'home' | 'work'
  // isDefault?: boolean
  isStore?: boolean
  isRefundStore?: boolean
}
