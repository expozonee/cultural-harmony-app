/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getEvents } from "../../firebase/utils/getEvents";
import AddEventForm from "../AddEventPage/AddEventForm";

export async function getEventByIdLoader(req) {
  const {
    params: { eventId },
  } = req;

  const event = (await getEvents()).find((e) => e.id === eventId);

  return event;
}

export default function UpdateEventPage() {
  const { id, ...data } = useLoaderData();

  return (
    <>
      <AddEventForm eventData={data} eventId={id} />
    </>
  );
}
