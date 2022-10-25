/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
import JQL from 'jqljs'
import { map, uniq } from 'lodash'
import { useMemo } from 'react'
import { AddressFieldsEnum } from '~/enums'
import { IOptionAddress } from '~/interfaces'
import { ConfigService } from '~/services'
// import RawAddressData from './address-data.json'

/**
 * From jquery.Thailand.js line 30 - 128
 * Search result by FieldsType
 */
// type IAddressDataType = [
//   string, // province
//   [
//     string, // district
//     [
//       string, // subDistrict
//       string[] // zip
//     ][]
//   ][]
// ][]

// const preprocess = (data: IAddressDataType): IFindAddressResult[] => {
//   if (!data[0].length) {
//     // non-compacted database
//     return data as unknown as IFindAddressResult[]
//   }
//   // compacted database in hierarchical form of:
//   // [["province",[["amphoe",[["district",["zip"...]]...]]...]]...]
//   const expanded: IFindAddressResult[] = []
//   data.forEach((provinceEntry) => {
//     const [province, districtList] = provinceEntry
//     districtList.forEach((districtEntry) => {
//       const [district, subDistrictList] = districtEntry
//       subDistrictList.forEach((subDistrict) => {
//         const [tambon, postcodeList] = subDistrict
//         postcodeList.forEach((postcode) => {
//           expanded.push({
//             [AddressFieldsEnum.SUB_DISTRICT]: tambon,
//             [AddressFieldsEnum.DISTRICT]: district,
//             [AddressFieldsEnum.PROVINCE]: province,
//             [AddressFieldsEnum.POSTCODE]: postcode
//           })
//         })
//       })
//     })
//   })
//   return expanded
// }
// const data = preprocess(RawAddressData as unknown as IAddressDataType)
// console.log(JSON.stringify(data))
// const DB = new JQL(data)

// export const provinceData = uniq(map(data || [], (d) => d[AddressFieldsEnum.PROVINCE]))

export class AddressFinder {
  static DB: JQL
  data: IOptionAddress[]

  provinceData = []

  initialData(data: IOptionAddress[]): void {
    const provinceData = uniq(map(data || [], (d) => d[AddressFieldsEnum.PROVINCE]))
    this.provinceData = provinceData
    AddressFinder.DB = new JQL(data)
  }

  queryDistrict(searchProvince: string): IOptionAddress[] {
    let possibles: IOptionAddress[] = []
    const province = AddressFieldsEnum.PROVINCE
    try {
      possibles = AddressFinder.DB.select('*')
        .where(province)
        .match(`^${searchProvince}`)
        .orderBy(province)
        .fetch()
    } catch (e) {
      return []
    }
    return possibles
  }

  querySubDistrict(searchProvince: string, searchDistrict: string): IOptionAddress[] {
    let possibles: IOptionAddress[] = []
    const province = AddressFieldsEnum.PROVINCE
    const district = AddressFieldsEnum.DISTRICT
    try {
      possibles = AddressFinder.DB.select('*')
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

  queryPostcode(
    searchProvince: string,
    searchDistrict: string,
    searchSubDistrict: string
  ): IOptionAddress[] {
    let possibles: IOptionAddress[] = []
    const province = AddressFieldsEnum.PROVINCE
    const district = AddressFieldsEnum.DISTRICT
    const subDistrict = AddressFieldsEnum.SUB_DISTRICT
    try {
      possibles = AddressFinder.DB.select('*')
        .where(province)
        .match(`^${searchProvince}`)
        .where(district)
        .match(`^${searchDistrict}`)
        .where(subDistrict)
        .match(`^${searchSubDistrict}`)
        .orderBy(subDistrict)
        .fetch()
    } catch (e) {
      return []
    }
    return possibles
  }
}

export const useAddressFinder = () => {
  const { data: configOptions } = ConfigService.useGetConfigOptions()
  const addressFinder = useMemo((): AddressFinder => {
    const tempAddressFinder = new AddressFinder()
    if (configOptions?.address?.length) {
      tempAddressFinder.initialData(configOptions?.address)
    }
    return tempAddressFinder
  }, [])

  return { addressFinder }
}
