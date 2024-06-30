/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyles";
import axios from 'axios'
import icon from '../../assets/img/icons/position.png'

const Map = () => {
    const [selectedPark, setSelectedPark] = useState(null);

    const [magasin, setListMagasin] = useState([])

    useEffect(() => {

        axios.get('http://localhost:5000/magasin').then((allMagasin) => {
            setListMagasin(allMagasin.data);
        })

        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPark(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, [setListMagasin]);

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: -18.894851, lng: 47.526831 }}
            defaultOptions={{ styles: mapStyles }}
        >
            {magasin.map((park, key) => (
                /* {magasin.map((park, key) => ( */
                // {magasin.map(park => (
                <Marker
                    key={key}
                    position={{
                        lat: park.lat,
                        lng: park.lng
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}
                    icon={{
                        url: icon,
                        scaledSize: new window.google.maps.Size(50, 50)
                    }}
                />
            ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    position={{
                        lat: selectedPark.lat,
                        lng: selectedPark.lng
                    }}
                >
                    <div>
                        <h2>{selectedPark.nom_magasin}</h2>
                        <p>{selectedPark.adresse_magasin}{selectedPark.province}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {


    return (
        <div style={{ width: "80vw", height: "60vh" }}>
            <MapWrapped
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9dpYe4E4kU-n3-C118qRyTU8pSn0bC0s"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

            {/* {parkData.produit.map((park) => console.log(typeof (park.lng)))}
            {magasin.map((park) => console.log(typeof (park.lng)))} */}

        </div>
    );
}