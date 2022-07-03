import React from 'react'
import { useGoogleMap } from '@react-google-maps/api'
import { Button } from 'antd'
import styles from '../AddressForm.module.scss'
import t from '~/locales'

const ButtonCurrentLocation: React.FC = () => {
  const map: google.maps.Map = useGoogleMap()

  function onClick(): void {
    const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow()

    const handleLocationError = (browserHasGeolocation: boolean, pos: google.maps.LatLng): void => {
      infoWindow.setPosition(pos)
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : 'Error: Your browser does not support geolocation.'
      )
      infoWindow.open(map)
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos: google.maps.LatLngLiteral = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          //   infoWindow.setPosition(pos)
          //   infoWindow.setContent('Location found.')
          //   infoWindow.open(map)
          map.setCenter(pos)
        },
        () => {
          handleLocationError(false, map.getCenter())
        }
      )
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter())
    }
  }
  return (
    <Button className={styles.currentLocationButton} onClick={onClick}>
      {t('Your Location')}
    </Button>
  )
}
export default ButtonCurrentLocation
