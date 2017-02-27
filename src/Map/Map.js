import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import './Map.css';

export default function Map(props) {
  return (
    <div className="Map">
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
            ref={(map) => console.log(map)}
            defaultZoom={10}
            center={{ lat: props.coords.lat || 47.6062, lng: props.coords.lng || -122.3321 }}
            onClick={props.onMapClick}
          >
            {props.sessions.map((session, index) => {
              const position = {
                lat: Number(session.locationLat),
                lng: Number(session.locationLng)
              }
              console.log(position);
              return (
                <Marker position={position} onClick={() => props.onMarkerClick(index)} key={session.sessionId}/>
              );
            })}
          </GoogleMap>
        }
      />
    </div>
  );
}
