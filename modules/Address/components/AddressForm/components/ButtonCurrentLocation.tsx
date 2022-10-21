import React, { useCallback, useEffect, useState } from 'react'
import styles from '../AddressForm.module.scss'
import { useGoogleMap } from '@react-google-maps/api'
import { Button } from 'antd'
import { useTranslation } from 'next-i18next'
import { LocaleNamespaceConst } from '~/constants'

const ButtonCurrentLocation: React.FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'address'])

  const map: google.maps.Map = useGoogleMap()
  const [geolocation, setGeolocation] = useState<Geolocation>()

  // eslint-disable-next-line @typescript-eslint/typedef
  const handleLocationError = useCallback(
    (browserHasGeolocation: boolean, pos: google.maps.LatLng): void => {
      const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow()

      infoWindow.setPosition(pos)
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : 'Error: Your browser does not support geolocation.'
      )
      infoWindow.open(map)
    },
    [map]
  )

  const onClick: VoidFunction = useCallback((): void => {
    geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        map.setCenter(pos)
      },
      () => {
        handleLocationError(false, map.getCenter())
      }
    )
  }, [geolocation, handleLocationError, map])

  useEffect(() => {
    if (navigator.geolocation) {
      // test get current location
      navigator.geolocation.getCurrentPosition(
        () => {
          setGeolocation(navigator.geolocation)
        },
        undefined,
        { enableHighAccuracy: true }
      )
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter())
    }
  }, [handleLocationError, map])

  return geolocation ? (
    <Button className={styles.currentLocationButton} onClick={onClick}>
      {t('address:yourLocation')}
    </Button>
  ) : null
}

export default ButtonCurrentLocation
