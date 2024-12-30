import * as yup from "yup";

export const schema = yup.object().shape({
  event_title: yup.string().required("Title is Required"),
  summary: yup.string().required("Summary is required"),
  date: yup
    .date()
    .min(new Date(), "Date must not be in the past")
    .required("Date is required"),
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
