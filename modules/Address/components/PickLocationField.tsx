import React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'
import { Image } from 'antd'

const GOOGLE_MAP_API_TOKEN: string = `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_TOKEN}`
const DEFAULT_THAILAND_LOCATION: Coords = {
  lat: 13.736717,
  lng: 100.523186
}

interface IMarkerProps {
  lat?: number
  lng?: number
}
const Marker: React.FC<IMarkerProps> = (props: IMarkerProps) => (
  <div key={`${props.lat}-${props.lng}`}>
    <Image preview={false} src="./images/main/buyer/location-pin.svg" />
  </div>
)

interface IPickLocationFieldProps {
  value?: Coords
  onChange?: (value: Coords) => void
}
const PickLocationField: React.FC<IPickLocationFieldProps> = (props: IPickLocationFieldProps) => {
  const { value, onChange } = props

  function onGoogleMapChange(eventValue: GoogleMapReact.ChangeEventValue): void {
    onChange?.(eventValue.center)
  }

  //   function onGoogleMapClick(eventValue: GoogleMapReact.ClickEventValue): void {
  //     console.log({ eventValue })
  //     onChange?.({
  //       lat: eventValue.lat,
  //       lng: eventValue.lng
  //     })
  //   }

  return (
    <div
      className="grey-section google-map"
      id="googlemaps"
      style={{ height: '453px', maxWidth: '600px', margin: '0 auto' }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_TOKEN }}
        defaultCenter={{
          lat: value?.lat || DEFAULT_THAILAND_LOCATION.lat,
          lng: value?.lng || DEFAULT_THAILAND_LOCATION.lng
        }}
        defaultZoom={11}
        onChange={onGoogleMapChange}
        // onClick={onGoogleMapClick}
        options={{ fullscreenControl: false }}
      >
        <Marker lat={value?.lat} lng={value?.lng} />
        <Image preview={false} src="./images/main/buyer/location-pin.svg" />
      </GoogleMapReact>
    </div>
  )
}
export default PickLocationField
