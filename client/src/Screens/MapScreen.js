/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow, DirectionsRenderer
} from "react-google-maps";
import mapStyles from "./mapStyles";
import axios from 'axios'
import arr from '../assets/img/icons/arriver.png'
import { Circle } from "react-google-maps";
import mag from '../assets/img/icons/magasin.png'
import dep from '../assets/img/icons/depart.png'

export default function MapScreen({ mapme, magasin }) {


    const Map = () => {
        const [depart, setDepart] = useState(null);
        const [arriver, setArriver] = useState(null)
        const [tag, setTag] = useState(null)
   
        // const [magasin, setListMagasin] = useState()
        const po = mapme[0]
        let lng1 = po.lng_arriver
        let lat1 = po.lat_arriver
        let lng = po.lng_depart
        let lat = po.lat_depart

        

        useEffect(() => {
            const listener = e => {
                if (e.key === "Escape") {
                    setDepart(null);
                    setArriver(null)
                    setTag(null)
                }
            };

            window.addEventListener("keydown", listener);

            return () => {
                window.removeEventListener("keydown", listener);
            };


        }, []);



        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: lat1, lng: lng1 }}
                defaultOptions={{ styles: mapStyles }}
            >
                {/* Direction */}

                {/* <DirectionsRenderer
                    directions={directions}
                /> */}

                {/* Magasin */}

                {magasin?.map((park, key) => (
                    <Marker
                        key={key}
                        position={{
                            lat: park.lat,
                            lng: park.lng
                        }}
                        onClick={() => {
                            setTag(park);
                        }}
                        icon={{
                            url: mag,
                            scaledSize: new window.google.maps.Size(50, 50)
                        }}
                    />
                ))}

                {tag && (
                    <InfoWindow
                        onCloseClick={() => {
                            setTag(null);
                        }}
                        position={{
                            lat: tag.lat,
                            lng: tag.lng
                        }}
                    >
                        <div>
                            <h2>{tag.nom_magasin}</h2>
                            <p>{tag.adresse_magasin}{tag.province}</p>
                        </div>
                    </InfoWindow>
                )}
                {/* Depart */}
                <Marker

                    position={{
                        lat: lat,
                        lng: lng
                    }}
                    onClick={() => {
                        setDepart(po);
                    }}
                    icon={{
                        url: dep,
                        scaledSize: new window.google.maps.Size(50, 50)
                    }}
                />
                <Circle
                    center={{ lat: lat, lng: lng }}
                    radius={50}
                />

                {depart && (
                    <InfoWindow
                        onCloseClick={() => {
                            setDepart(null);
                        }}
                        position={{
                            lat: depart.lat_depart,
                            lng: depart.lng_depart
                        }}
                    >
                        <div>
                            <h2>Position de depart</h2>
                            <p>Date depart {depart.date_depart}</p>
                        </div>
                    </InfoWindow>
                )}

                {/* Arriver  */}
                <Marker

                    position={{
                        lat: lat1,
                        lng: lng1
                    }}
                    onClick={() => {
                        setArriver(po);
                    }}
                    icon={{
                        url: arr,
                        scaledSize: new window.google.maps.Size(50, 50)
                    }}
                />
                <Circle
                    center={{ lat: lat1, lng: lng1 }}
                    radius={10}
                />

                {arriver && (
                    <InfoWindow
                        onCloseClick={() => {
                            setArriver(null);
                        }}
                        position={{
                            lat: arriver.lat_arriver,
                            lng: arriver.lng_arriver
                        }}
                    >
                        <div>
                            <h2>Position arriver</h2>
                            <p>Date d'arriver {arriver.date_arriver}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    }

    const MapWrapped = withScriptjs(withGoogleMap(Map));


    return (

        <div style={{ width: "80vw", height: "60vh" }}>
            <MapWrapped
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9dpYe4E4kU-n3-C118qRyTU8pSn0bC0s"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />


        </div>
    );
}