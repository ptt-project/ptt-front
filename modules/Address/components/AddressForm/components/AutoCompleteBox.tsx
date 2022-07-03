/* eslint-disable @typescript-eslint/typedef */
import React, { useState, useCallback } from 'react'
import { Autocomplete, useGoogleMap } from '@react-google-maps/api'

const AutoCompleteBox: React.FC = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>()
  const map = useGoogleMap()

  const onAutoCompleteBoxLoaded = useCallback(
    (autoCompleteInstance) => {
      setAutocomplete(autoCompleteInstance)
    },
    [setAutocomplete]
  )

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const placeSearchResponse = autocomplete.getPlace()
      const { lat, lng } = placeSearchResponse.geometry.location
      const position = { lat: lat(), lng: lng() }
      console.log({ position })
      map.panTo(position)
    }
  }, [autocomplete, map])

  return (
    <Autocomplete onLoad={onAutoCompleteBoxLoaded} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="ค้นหาใน Google Maps"
        style={{
          position: 'absolute',
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          lineHeight: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
          left: '10px',
          top: '10px'
        }}
      />
    </Autocomplete>
  )
}

export default AutoCompleteBox
