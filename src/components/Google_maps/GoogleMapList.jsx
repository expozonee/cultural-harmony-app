import { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

export function GoogleMapList({ events }) {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const defaultCenter = {
    lat: 31.2508828,
    lng: 34.7960648,
  };

  const mapContainerStyle = {
    width: "100%",
    height: "86vh",
  };

  useEffect(() => {
    if (!mapInstance || !events) return;
    mapInstance.markers?.forEach((marker) => marker.setMap(null));
    mapInstance.markers = [];
    events.forEach((event) => {
      const position = { lat: event.location.lat, lng: event.location.lng };

      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        map: mapInstance,
        position,
        title: event.event_title,
      });

      marker.addListener("click", () => {
        setSelectedEvent(event);
      });

      mapInstance.markers.push(marker);
    });
  }, [mapInstance, events]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={8}
        onLoad={(map) => {
          setMapInstance(map);
          map.markers = [];
        }}
      />
      {selectedEvent && (
        <div className="modal-open-event" onClick={(e) => e.stopPropagation()}>
          <h3>{selectedEvent.event_title || "Untitled Event"}</h3>
          <p>
            {selectedEvent.summary ||
              selectedEvent.description ||
              "No details available"}
          </p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
