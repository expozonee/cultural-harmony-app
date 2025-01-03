/* eslint-disable no-unused-vars */
import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';

export function GoogleMapList({ events }) {
  const defaultProps = {
    center: {
      // lat: 32.0132,
      // lng: 34.7722,
      lat: 31.2508828,
      lng: 34.7960648,
    },
    zoom: 8,
  };
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const EventMarker = ({ event, onOpenModal }) => (
    <svg
      onClick={onOpenModal}
      className="marker marker-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="#ff0000"
        d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
      />
    </svg>
  );

  const navToDescriptionFromModal = () => {
    if (!selectedEvent) return;
    setSelectedEvent(null);
    navigate(`/events/${selectedEvent.id}`);
  };

  const mapOptions = {
    draggable: false,
    fullscreenControl: false,
    zoomControl: false,
  };

  if (!events) return <div>Loading map...</div>;

  return (
    <>
      <div style={{ height: '86vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
          }}
          center={defaultProps.center}
          zoom={defaultProps.zoom}
          options={mapOptions}
        >
          {events.map((event) => (
            <EventMarker
              // className="marker"
              key={event.id}
              lat={event.location.lat}
              lng={event.location.lng}
              event={event}
              onOpenModal={() => setSelectedEvent(event)}
            />
          ))}
        </GoogleMapReact>

        {selectedEvent && (
          <div
            className="modal-open-event"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedEvent.imgUrl}
              alt={selectedEvent.event_title}
              className="event-modal-img"
            />
            <h3>{selectedEvent.event_title}</h3>
            <p>{selectedEvent.summary}</p>
            <button onClick={navToDescriptionFromModal} className="go-to-event">
              Go to Event
            </button>
            <button
              onClick={() => setSelectedEvent(null)}
              className="close-modal-btn"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}
