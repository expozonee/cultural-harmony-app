export const initAutocomplete = (locationInputRef, setEvent) => {
  if (window.google) {
    const autocomplete = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        fields: ["geometry", "formatted_address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        console.log("No details available for input: " + place.name);
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address;

      setEvent((prevEvent) => ({
        ...prevEvent,
        location: {
          city_name: address,
          lat: lat,
          lng: lng,
        },
      }));
    });
  }
};
