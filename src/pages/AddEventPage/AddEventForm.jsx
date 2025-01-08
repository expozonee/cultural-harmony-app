import "./AddEventForm.css";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { intialEvent } from "../../utils/Event/intialEvent";
import ErrorMessage from "../../components/add-update-EventPage/ErrorMessage/ErrorMessage";
import { initAutocomplete } from "../../utils/Event/initAutocomplete";
import { useUser } from "@clerk/clerk-react";
import { useEvents } from "../../context/EventsContext";
import { useNavigate } from "react-router";
import { schema } from "../../schema/YupSchema";
import { useUserData } from "../../context/UserContext";

export default function AddEventForm({ eventData, eventId, from }) {
  const navigate = useNavigate();
  const { createEvent, updateEvent } = useEvents();
  const locationInputRef = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [location, setLocation] = useState(
    eventData ? eventData.location.city_name : ""
  );
  const [items, setItems] = useState(eventData?.contribution_list ?? []);
  const [event, setEvent] = useState(eventData ?? intialEvent);
  const { user } = useUser();
  const { userData } = useUserData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (
        document.querySelector(
          `script[src="https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
          }&libraries=places"]`
        )
      ) {
        if (window.google) {
          initAutocomplete(locationInputRef, setEvent, setLocation);
        }
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () =>
        initAutocomplete(locationInputRef, setEvent, setLocation);
      script.onerror = () => {
        console.error("Google Maps API script could not be loaded.");
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems((prev) => {
        const updatedItems = [
          ...prev,
          { item_name: newItem, user: "", addedBy: userData.email },
        ];
        return updatedItems;
      });
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(data) {
    const newEvent = {
      ...data,
      event_host_name: user.fullName,
      host_email_address: user.primaryEmailAddress.emailAddress,
      location: event.location,
      contribution_list: items,
      participants: [userData.email],
      date: new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .format(data.date)
        .split("/")
        .reverse()
        .join("-"),
    };

    try {
      if (eventId) {
        await updateEvent(eventId, newEvent);
        if (from === "dashboard") {
          navigate("/admin/events-created");
        } else {
          navigate(`/events/${eventId}`);
        }
      } else {
        await createEvent(newEvent);
        navigate("/events");
      }
    } catch (error) {
      console.error("Error adding event to Firestore:", error);
    }
  }

  function handleLoacationChange() {
    setLocation(locationInputRef.current.value);
  }

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label className={`form-group-label ${errors.title ? "text-error" : ""}`}>Title</label>
        <input
          name="event_title"
          type="text"
          className={`form-group-input ${errors.title ? "input-error" : "input-field"}`}
          {...register("event_title")}
          value={event.event_title}
          onChange={handleOnChange}
        />
        {errors.event_title && (
          <ErrorMessage message={errors.event_title.message} />
        )}
      </div>
      <div className="form-group">
        <label className="form-group-label">Summary</label>
        <input
          name="summary"
          type="text"
          className="form-group-input"
          {...register("summary")}
          value={event.summary}
          onChange={handleOnChange}
        />
        {errors.summary && <ErrorMessage message={errors.summary.message} />}
      </div>

      <div className="form-group">
        <label className="form-group-label">Date</label>
        <input
          name="date"
          type="date"
          className="form-group-input"
          {...register("date")}
          value={event.date}
          onChange={handleOnChange}
        />
        {errors.date && <ErrorMessage message={errors.date.message} />}
      </div>

      <div className="form-group">
        <label className="form-group-label">Starting Time</label>
        <input
          name="event_start_time"
          type="time"
          className="form-group-input"
          {...register("event_start_time")}
          value={event.event_start_time}
          onChange={handleOnChange}
        />
        {errors.event_start_time && (
          <ErrorMessage message={errors.event_start_time.message} />
        )}
      </div>

      <div className="form-group">
        <label className="form-group-label">Description</label>
        <textarea
          name="description"
          className="form-group-input"
          {...register("description")}
          value={event.description}
          onChange={handleOnChange}
        />
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>
      <div className="form-group">
        <label className="form-group-label">Image URL </label>
        <input
          name="imgUrl"
          type="text"
          className="form-group-input"
          {...register("imgUrl")}
          value={event.imgUrl}
          onChange={handleOnChange}
        />
        {errors.imgUrl && <ErrorMessage message={errors.imgUrl.message} />}
      </div>

      <div className="form-group">
        <label className="form-group-label">Location</label>
        <input
          type="text"
          name="location"
          className="form-group-input"
          {...register("location")}
          ref={(e) => {
            register("location").ref(e);
            locationInputRef.current = e;
          }}
          onChange={handleLoacationChange}
          value={location}
        />
        {errors.location && <ErrorMessage message={errors.location.message} />}
      </div>

      <div className="form-group">
        <label className="form-group-label">Max Participants </label>
        <input
          name="max_participants"
          type="text"
          className="form-group-input"
          {...register("max_participants")}
          value={event.max_participants}
          onChange={handleOnChange}
        />
        {errors.max_participants && (
          <ErrorMessage message={errors.max_participants.message} />
        )}
      </div>

      <div>
        <h1>Event Item</h1>
        <div>
          <input
            type="text"
            name="item_name"
            className="form-group-input"
            value={newItem}
            onChange={handleNewItemChange}
          />

          <button className="AddButton" type="button" onClick={addItem}>
            Add Checklist Item
          </button>
        </div>
        <ul className="checklist-items">
          {items.map((item, index) => (
            <li key={index} className="checklist-item">
              <strong>{item.item_name}</strong>
              <button
                type="button"
                className="btn btn-remove"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-submit" type="submit">
        {eventId ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}
