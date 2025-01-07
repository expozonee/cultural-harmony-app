function EventImage({ imgUrl, eventTitle }) {
    return imgUrl ? (
      <img
        className="event-image-description"
        src={imgUrl}
        alt={eventTitle}
        onError={(e) => {
          e.target.remove();
          const card = document.querySelector(".event-description-card");
          if (card) card.classList.add("no-image");
        }}
      />
    ) : null;
  }
  
  export default EventImage;
  