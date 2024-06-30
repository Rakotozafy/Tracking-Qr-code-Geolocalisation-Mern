/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

export default function DirectionRoute() {
    const [directions , setDirections] = useState()
    
    useEffect(() => {
        let google = window.google;
    let map = mapRef.current;
    

        const directionsServices = new google.maps.DirectionsService()
        const origin = { lat: 40.75, lng: -73.95 }
        const destination = { lat: 41.75, lng: -78.95 }

        directionsServices.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                   setDirections(result)
                } else {
                    console.error(`error fetching directions ${result}`)
                }
            }
        )
    }, [])

    return (
        <div>

            <GoogleMap
                defaultCenter={{ lat: 40.75, lng: -73.95 }}
                defaultZoom={13}
            >
                <DirectionsRenderer
                    directions={directions}
                />

            </GoogleMap>

        </div>
    )
}
