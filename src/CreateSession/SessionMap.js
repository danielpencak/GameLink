import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import './SessionMap.css';
import MapStyles from '../Map/MapStyles'

export default function SessionMap(props) {
  return (
    <div className="SessionMap">
      {
        props.locationName ?
        <div className="map">
          <GoogleMapLoader
            containerElement={
              <div
                {...props.containerElementProps}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                defaultOptions={{
                  styles: MapStyles,
                  scrollwheel: false
                }}
                defaultZoom={15}
                center={{ lat: props.locationCoords.lat, lng: props.locationCoords.lng}}
              >
                <Marker position={props.locationCoords} />
              </GoogleMap>
            }
          />
        </div>
        :null
      }
    </div>
  );
}
