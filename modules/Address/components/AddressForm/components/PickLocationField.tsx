import React, { MutableRefObject, useCallback, useMemo, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { debounce } from 'lodash'
import ButtonCurrentLocation from './ButtonCurrentLocation'
import styles from '../AddressForm.module.scss'

const GOOGLE_MAP_API_TOKEN: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_TOKEN

// lat, lng แถว ๆ กรุงเทพ ครับ
const DEFAULT_THAILAND_LOCATION: google.maps.LatLngLiteral = {
  lat: 13.736717,
  lng: 100.523186
}

const containerStyle: any = {
  width: 'inherit',
  height: 'inherit',
  minHeight: '400px'
}

interface IPickLocationFieldProps {
  value?: google.maps.LatLngLiteral
  onChange?: (value: google.maps.LatLngLiteral) => void
}
const PickLocationField: React.FC<IPickLocationFieldProps> = (props: IPickLocationFieldProps) => {
  const { value, onChange } = props

  const googleMapInstantRef: MutableRefObject<google.maps.Map> = useRef<google.maps.Map>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_TOKEN,
    libraries: ['places'],
    language: 'th-TH'
  })

  const onMapLoaded = (googleMapInstant: google.maps.Map): void => {
    if (googleMapInstant) {
      googleMapInstantRef.current = googleMapInstant
    }
  }

  const onCenterChanged: VoidFunction = useCallback(async (): Promise<void> => {
    const googleMapInstant: google.maps.Map = googleMapInstantRef.current
    if (googleMapInstant) {
      const center: google.maps.LatLng = googleMapInstant.getCenter()
      const newValue: google.maps.LatLngLiteral = {
        lat: center.lat(),
        lng: center.lng()
      }
      if (
        !value?.lat ||
        !value?.lng ||
        (value?.lat && value?.lng && (value?.lat !== newValue?.lat || value?.lng !== newValue?.lng))
      ) {
        onChange?.(newValue)
      }
    }
  }, [value, onChange])

  const renderMap: ReturnType<React.FC> = useMemo((): ReturnType<React.FC> => {
    const markerIcon: google.maps.Icon = {
      url: './images/main/buyer/location-pin.svg'
    }
    return isLoaded ? (
      <div id="googlemaps" className={`grey-section google-map ${styles.googleMapLayout}`}>
        <GoogleMap
          onLoad={onMapLoaded}
          mapContainerStyle={containerStyle}
          center={{
            lat: value?.lat || DEFAULT_THAILAND_LOCATION.lat,
            lng: value?.lng || DEFAULT_THAILAND_LOCATION.lng
          }}
          zoom={10}
          options={{
            mapTypeControlOptions: { mapTypeIds: ['ROADMAP'] },
            disableDefaultUI: false,
            streetViewControl: false,
            fullscreenControl: false
          }}
          onCenterChanged={debounce(onCenterChanged, 200)}
        >
          <Marker
            position={{
              lat: value?.lat || DEFAULT_THAILAND_LOCATION.lat,
              lng: value?.lng || DEFAULT_THAILAND_LOCATION.lng
            }}
            icon={markerIcon}
            animation={google.maps.Animation.DROP}
          />
          <ButtonCurrentLocation />
          {/* <AutoCompleteBox /> */}
        </GoogleMap>
      </div>
    ) : (
      <div>loading...</div>
    )
  }, [isLoaded, value, onCenterChanged])

  return renderMap
}

PickLocationField.defaultProps = {
  value: undefined,
  onChange: undefined
}

export default PickLocationField
