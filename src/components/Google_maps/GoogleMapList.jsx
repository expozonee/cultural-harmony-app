import { useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useNavigate } from 'react-router';
import { useUser } from '@clerk/clerk-react';

export function GoogleMapList({ events }) {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoToEvent = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/sign-in", { state: { from: `/events/${selectedEvent.id}` } });
    }
    else{
      navigate(`/events/${selectedEvent.id}`);
    }
  };

  const defaultCenter = {
    lat: 31.2508828,
    lng: 34.7960648,
  };

  const mapContainerStyle = {
    width: '100%',
    height: '86vh',
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

      marker.addListener('click', () => {
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
          <h3 className='modal-open-event-title'>{selectedEvent.event_title || 'Untitled Event'}</h3>
          <p className='modal-open-event-description'>
            {selectedEvent.summary ||
              selectedEvent.description ||
              'No details available'}
          </p>
          <img
            src={selectedEvent.imgUrl}
            alt={selectedEvent.event_title}
            className="event-modal-img"
          />
          <div className='model-open-event-buttons'>
            <button
              onClick={(e) => handleGoToEvent(e)}
              className="go-to-event"
            >
              Go to Event
            </button>
            <button
              className="close-modal-btn"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
            </div>
        </div>
      )}
    </div>
  );
}
