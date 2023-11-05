"use client"
import React from 'react'
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import styles from "./manholeMap.module.css"
import Link from 'next/link';
import { ManholeStatus } from '@/types';

export interface ManholeMapProps {
    data: ManholeStatus[];
}

const GOOGLE_MAP_API_KEY = "AIzaSyCckNi7MWJ8JmglXh_9WYO_0ZnN5N36smg";

export default function ManholeMap({ data }: ManholeMapProps) {
    const containerStyle = {
        width: '100vw',
        height: '90vh'
    };

    const center = {
        lng: -79.39745,
        lat: 43.65971
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
            {data.map(status =>
                <OverlayView
                    position={{ lat: status.latitude, lng: status.longitude }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div className={styles["circle-container"]}>
                        <div className={styles["black-circle"]}></div>
                        <Link title={status.manhole_id} href={`/status/${status.manhole_id}`} className={styles["circle-button-parent"]}>
                            <button className={status.status == "normal" ? styles["circle-button"] : styles["circle-button-alarm"]}>
                            </button>
                        </Link>
                    </div >
                </OverlayView>
            )}
        </GoogleMap>
    ) : <></>
}
