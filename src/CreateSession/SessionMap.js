import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import './SessionMap.css';
import Geosuggest from 'react-geosuggest';

export default function SessionMap(props) {
  return (
    <div className="SessionMap">
      <Geosuggest onSuggestSelect={(place) => {props.setLocation(place)}}/>
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
                  scrollwheel: false
                }}
                defaultZoom={18}
                center={{ lat: props.locationCoords.lat, lng: props.locationCoords.lng}}>
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
