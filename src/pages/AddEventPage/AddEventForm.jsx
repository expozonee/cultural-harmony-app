import * as yup from "yup";
import "./AddEventForm.css";
import "./AddEventPage.css";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { intialEvent } from "../../utils/Event/intialEvent";
import ErrorMessage from "../../components/add-update-EventPage/ErrorMessage/ErrorMessage";
import { initAutocomplete } from "../../utils/Event/initAutocomplete";
import { useUser } from "@clerk/clerk-react";
import { postEvent } from "../../firebase/utils/addevent";

const schema = yup.object().shape({
  event_title: yup.string().required("Title is Required"),
  summary: yup.string().required("Summary is required"),
  date: yup
    .string()
    .required("Date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
  event_start_time: yup.string().required("Starting time is requried"),
  description: yup.string().required("Description is required"),
  imgUrl: yup.string().required("ImageUrl is required"),
  location: yup.string().required("Location is required"),
  max_participants: yup
    .number()
    .min(1, "Max participants is required")
    .max(25, "Max praticipants is 25")
    .required("Max participants is required")
    .typeError("Max participants must be a number"),
});

export default function AddEventForm({ eventData }) {
  const locationInputRef = useRef(null);
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [event, setEvent] = useState(eventData ?? intialEvent);
  const user = useUser();
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
          initAutocomplete(locationInputRef, setEvent);
        }
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initAutocomplete(locationInputRef, setEvent);
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
        const updatedItems = [...prev, { item_name: newItem, user: "" }];
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
      event_host_name: user.user.fullName,
      location: event.location,
      contribution_list: items,
      date: data.date,
    };

    try {
      await postEvent(newEvent);
      console.log("Event successfully added to Firestore!");
    } catch (error) {
      console.error("Error adding event to Firestore:", error);
    }
  }

  return (
    <form
      style={{ maxWidth: "900px", marginInline: "auto", marginTop: "5rem" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-group">
        <label className={`${errors.title ? "text-red" : ""}`}>Title</label>
        <input
          name="event_title"
          type="text"
          className={`${errors.title ? "border-red" : ""}`}
          {...register("event_title")}
          value={event.event_title}
          onChange={handleOnChange}
        />
        {errors.event_title && (
          <ErrorMessage message={errors.event_title.message} />
        )}
      </div>
      <div className="form-group">
        <label>summary</label>
        <input
          name="summary"
          type="text"
          {...register("summary")}
          value={event.summary}
          onChange={handleOnChange}
        />
        {errors.summary && <ErrorMessage message={errors.summary.message} />}
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          name="date"
          type="date"
          {...register("date")}
          value={event.date}
          onChange={handleOnChange}
        />
        {errors.date && <ErrorMessage message={errors.date.message} />}
      </div>

      <div className="form-group">
        <label>Starting Time</label>
        <input
          name="event_start_time"
          type="time"
          {...register("event_start_time")}
          value={event.event_start_time}
          onChange={handleOnChange}
        />
        {errors.event_start_time && (
          <ErrorMessage message={errors.event_start_time.message} />
        )}
      </div>

      <div className="form-group">
        <label>description</label>
        <textarea
          name="description"
          {...register("description")}
          value={event.description}
          onChange={handleOnChange}
        />
        {errors.description && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>
      <div className="form-group">
        <label>Image URL </label>
        <input
          name="imgUrl"
          type="text"
          {...register("imgUrl")}
          value={event.imgUrl}
          onChange={handleOnChange}
        />
        {errors.imgUrl && <ErrorMessage message={errors.imgUrl.message} />}
      </div>

      <div className="form-group">
        <label>location</label>
        <input
          type="text"
          name="location"
          {...register("location")}
          ref={(e) => {
            register("location").ref(e);
            locationInputRef.current = e;
          }}
        />
        {errors.location && <ErrorMessage message={errors.location.message} />}
      </div>

      <div className="form-group">
        <label>Max Participants </label>
        <input
          name="max_participants"
          type="text"
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
            value={newItem} // Bind to newItem state
            onChange={handleNewItemChange} // Update newItem state on change
          />

          <button className="AddButton" type="button" onClick={addItem}>
            Add Checklist Item
          </button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{item.item_name}</strong>
              <button
                type="button"
                style={{
                  marginLeft: "10px",
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                  padding: "5px",
                  cursor: "pointer",
                }}
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button className="button1" type="submit">
        Buttontext
      </button>
    </form>
  );
}
