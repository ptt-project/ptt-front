import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, GoogleMapProps } from '@react-google-maps/api'
import { debounce } from 'lodash'
import ButtonCurrentLocation from './ButtonCurrentLocation'
import styles from '../AddressForm.module.scss'
import Loading from '~/components/main/Loading'

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
  googleMapsApiKey: string
}
const PickLocationField: React.FC<IPickLocationFieldProps> = (props: IPickLocationFieldProps) => {
  const { value, onChange, googleMapsApiKey } = props

  const googleMapInstantRef: MutableRefObject<google.maps.Map> = useRef<google.maps.Map>()
  const [marker, setMarker] = useState<google.maps.Marker>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
    libraries: ['places'],
    language: 'th-TH'
  })

  const position: google.maps.LatLngLiteral = useMemo(
    () => ({
      lat: Number(value?.lat || DEFAULT_THAILAND_LOCATION.lat),
      lng: Number(value?.lng || DEFAULT_THAILAND_LOCATION.lng)
    }),
    [value?.lat, value?.lng]
  )

  const onMapLoaded: GoogleMapProps['onLoad'] = useCallback(
    (googleMapInstant: google.maps.Map): void => {
      if (googleMapInstant) {
        googleMapInstantRef.current = googleMapInstant
        setMarker(
          new google.maps.Marker({
            position,
            icon: {
              url: './images/main/buyer/location-pin.svg'
            },
            map: googleMapInstant
          })
        )
      }
    },
    [position]
  )

  const onCenterChanged: VoidFunction = useCallback(async (): Promise<void> => {
    const googleMapInstant: google.maps.Map = googleMapInstantRef.current
    if (googleMapInstant) {
      const center: google.maps.LatLng = googleMapInstant.getCenter()
      const newValue: google.maps.LatLngLiteral = {
        lat: center?.lat(),
        lng: center?.lng()
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

  useEffect(() => {
    marker?.setPosition(position)
  }, [marker, position])

  return (
    <div
      id="google-maps"
      className={`grey-section google-map ${styles.googleMapLayout} ${
        isLoaded ? styles.googleMapHide : ''
      }`}
    >
      {isLoaded ? (
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
          <ButtonCurrentLocation />
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  )
}

PickLocationField.defaultProps = {
  value: undefined,
  onChange: undefined
}

export default PickLocationField
