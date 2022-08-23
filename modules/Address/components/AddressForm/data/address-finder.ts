/* eslint-disable @typescript-eslint/typedef */
import JQL from 'jqljs'
import { map, uniq } from 'lodash'
import RawAddressData from './address-data2.json'

export enum AddressFieldsEnum {
  TAMBON = 't', // ตำบล
  DISTRICT = 'd', // อำเภอ
  PROVINCE = 'p', // จังหวัด
  ZIPCODE = 'z' // รหัสไปรษณีย์
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
      string, // tambon
      string[] // zip
    ][]
  ][]
][]

export interface IFindAddressResult {
  [AddressFieldsEnum.TAMBON]: string
  [AddressFieldsEnum.DISTRICT]: string
  [AddressFieldsEnum.PROVINCE]: string
  [AddressFieldsEnum.ZIPCODE]: string
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
    const province = provinceEntry[0]
    const districtList = provinceEntry[1]
    districtList.forEach((districtEntry) => {
      const district = districtEntry[0]
      const tambonList = districtEntry[1]
      tambonList.forEach((tambonEntry) => {
        const tambon = tambonEntry[0]
        const zipCodeList = tambonEntry[1]
        zipCodeList.forEach((zipCode) => {
          expanded.push({
            [AddressFieldsEnum.TAMBON]: tambon,
            [AddressFieldsEnum.DISTRICT]: district,
            [AddressFieldsEnum.PROVINCE]: province,
            [AddressFieldsEnum.ZIPCODE]: zipCode
          })
        })
      })
    })
  })
  return expanded
}
const data = preprocess(RawAddressData as unknown as IAddressDataType)
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
    const tambon = AddressFieldsEnum.TAMBON
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
