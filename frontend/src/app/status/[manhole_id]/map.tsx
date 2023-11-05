"use client"
import React from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

export interface MapProps {
    longitude: number;
    latitude: number;
}

const GOOGLE_MAP_API_KEY = "AIzaSyCckNi7MWJ8JmglXh_9WYO_0ZnN5N36smg";

export default function Map({ longitude, latitude }: MapProps) {

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: latitude,
        lng: longitude
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAP_API_KEY
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={20}
        >
            <MarkerF position={center} />
        </GoogleMap>
    ) : <></>
}
