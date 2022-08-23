import React, { FC, memo, useEffect, useMemo } from 'react'
import { Marker, MarkerProps } from '@react-google-maps/api'

const AddressMarker: FC<MarkerProps> = (props: MarkerProps) => {
  const { position } = props

  useEffect(() => {
    console.log({ position })
  }, [position])

  useEffect(() => {
    console.log('AddressMarker mount')
    return () => {
      console.log('AddressMarker un mount')
    }
  }, [])

  const markerIcon: google.maps.Icon = useMemo(
    () => ({
      url: './images/main/buyer/location-pin.svg'
    }),
    []
  )

  return <Marker position={position} icon={markerIcon} animation={google.maps.Animation.DROP} />
}

export default memo(AddressMarker)
