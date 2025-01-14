import EventPreview from "./EventPreview";
import { GoogleMapList } from "./Google_maps/GoogleMapList";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useEvents } from "../context/EventsContext";

function EventsList() {
  const { events } = useEvents();

  const [previewMap, setPreviewMap] = useState(false);
  const { isSignedIn } = useUser();

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;
  const totalPages = Math.ceil((events?.length || 0) / eventsPerPage);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
    <div className="buttonSection">
      <button
        className="show-map-btn"
        onClick={() => setPreviewMap(!previewMap)}
      >
        {previewMap ? " List" : " Map"}{" "}
        <i className={`fa-solid ${previewMap ? "fa-list" : "fa-map"}`}></i>
      </button>
      {isSignedIn && (
        <Link to="/events/add-event">
          <button className="add-event">
            <i className="fa-solid fa-plus"></i> 
          </button>

        </Link>
      )}
      </div>
      {previewMap ? (
        <GoogleMapList events={events} />
      ) : (

        

        <>
          <ul className="events-list">
            {currentEvents &&
              currentEvents.map((event) => (
                <li className="event-preview" key={event.id}>
                  <EventPreview event={event} />
                </li>
              ))}
          </ul>
          <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
              {"<<"}
              </button>
              <span className="pagination-info">
              {currentPage} of {totalPages}
                </span>
              <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
              >
            {">>"}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default EventsList;
