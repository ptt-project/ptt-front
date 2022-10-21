/* eslint-disable @typescript-eslint/typedef */
import JQL from 'jqljs'
import RawAddressData from './address-data.json'
import { map, uniq } from 'lodash'

export enum AddressFieldsEnum {
  SUB_DISTRICT = 'subDistrict', // ตำบล
  DISTRICT = 'district', // อำเภอ
  PROVINCE = 'province', // จังหวัด
  POSTCODE = 'postcode' // รหัสไปรษณีย์
}

/**
 * From jquery.Thailand.js line 30 - 128
 * Search result by FieldsType
 */
type IAddressDataType = [
  string, // province
  [
    string, // district
    [
      string, // subDistrict
      string[] // zip
    ][]
  ][]
][]

export interface IFindAddressResult {
  [AddressFieldsEnum.SUB_DISTRICT]: string
  [AddressFieldsEnum.DISTRICT]: string
  [AddressFieldsEnum.PROVINCE]: string
  [AddressFieldsEnum.POSTCODE]: string
}
const preprocess = (data: IAddressDataType): IFindAddressResult[] => {
  if (!data[0].length) {
    // non-compacted database
    return data as unknown as IFindAddressResult[]
  }
  // compacted database in hierarchical form of:
  // [["province",[["amphoe",[["district",["zip"...]]...]]...]]...]
  const expanded: IFindAddressResult[] = []
  data.forEach((provinceEntry) => {
    const [province, districtList] = provinceEntry
    districtList.forEach((districtEntry) => {
      const [district, subDistrictList] = districtEntry
      subDistrictList.forEach((subDistrict) => {
        const [tambon, postcodeList] = subDistrict
        postcodeList.forEach((postcode) => {
          expanded.push({
            [AddressFieldsEnum.SUB_DISTRICT]: tambon,
            [AddressFieldsEnum.DISTRICT]: district,
            [AddressFieldsEnum.PROVINCE]: province,
            [AddressFieldsEnum.POSTCODE]: postcode
          })
        })
      })
    })
  })
  return expanded
}
const data = preprocess(RawAddressData as unknown as IAddressDataType)
// console.log(JSON.stringify(data))
const DB = new JQL(data)

export const provinceData = uniq(map(data || [], (d) => d[AddressFieldsEnum.PROVINCE]))

export class AddressFinder {
  static queryDistrict(searchProvince: string): IFindAddressResult[] {
    let possibles: IFindAddressResult[] = []
    const province = AddressFieldsEnum.PROVINCE
    try {
      possibles = DB.select('*')
        .where(province)
        .match(`^${searchProvince}`)
        .orderBy(province)
        .fetch()
    } catch (e) {
      return []
    }
    return possibles
  }

  static queryTambon(searchProvince: string, searchDistrict: string): IFindAddressResult[] {
    let possibles: IFindAddressResult[] = []
    const province = AddressFieldsEnum.PROVINCE
    const district = AddressFieldsEnum.DISTRICT
    try {
      possibles = DB.select('*')
        .where(province)
        .match(`^${searchProvince}`)
        .where(district)
        .match(`^${searchDistrict}`)
        .orderBy(district)
        .fetch()
    } catch (e) {
      return []
    }
    return possibles
  }

  static queryZipcode(
    searchProvince: string,
    searchDistrict: string,
    searchTambon: string
  ): IFindAddressResult[] {
    let possibles: IFindAddressResult[] = []
    const province = AddressFieldsEnum.PROVINCE
    const district = AddressFieldsEnum.DISTRICT
    const tambon = AddressFieldsEnum.SUB_DISTRICT
    try {
      possibles = DB.select('*')
        .where(province)
        .match(`^${searchProvince}`)
        .where(district)
        .match(`^${searchDistrict}`)
        .where(tambon)
        .match(`^${searchTambon}`)
        .orderBy(tambon)
        .fetch()
    } catch (e) {
      return []
    }
    return possibles
  }
}
