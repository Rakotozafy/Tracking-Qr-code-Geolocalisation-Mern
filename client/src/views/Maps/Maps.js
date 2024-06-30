/*eslint-disable*/
import React from "react";

const Maps = () => {
  const mapRef = React.useRef(null);

  const [mapme, setMapme] = React.useState({
    mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
    lat: "-18.894851",
    lng: "47.526831",
  });

  const [listme, setListme] = React.useState([
    {
      mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
      nom: "tojo",
      lat: "-18.894851",
      lng: "47.526831",
    },
    {
      mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
      nom: "zo",
      lat: "-20.894851",
      lng: "47.526831",
    },
    {
      mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
      nom: "haja",
      lat: "-25.894851",
      lng: "47.526831",
    },
    {
      mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
      nom: "violeta",
      lat: "-27.894851",
      lng: "47.526831",
    },
    {
      mouvement: [{ article: "cable", type: "départ", arrivé: "" }],
      nom: "tojo",
      lat: "-30.894851",
      lng: "47.526831",
    },
  ]);

  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "-18.894851";
    let lng = "47.526831";
    const myLatlng = new google.maps.LatLng(mapme.lat, mapme.lng);
    const mapOptions = {
      zoom: 15,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "water",
          stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: "#0088ff" }],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            { hue: "#ff0000" },
            { saturation: -100 },
            { lightness: 99 },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#808080" }, { lightness: 54 }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#ece2d9" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#ccdca1" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#767676" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }],
        },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
        },
        { featureType: "poi.park", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.sports_complex",
          stylers: [{ visibility: "on" }],
        },
        { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "simplified" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: mapme.nom,
    });

    const contentString =
      '<div class="info-window-content"><h2>Emplacement indiqué :</h2><p>' +
      mapme.map +
      "</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, [mapme]);

  return (
    <>
      <div style={{ height: `80vh` }} ref={mapRef}></div>
      <hr />
      {listme.map((x) => {
        return (
          <p>
            {JSON.stringify(x)}
            <button onClick={() => setMapme(x)}>voir</button>
          </p>
        );
      })}
    </>
  );
};

export default Maps;
