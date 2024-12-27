/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useSearchParams } from "react-router-dom";
import { getEvents } from "../../firebase/utils/getEvents";
import AddEventForm from "../AddEventPage/AddEventForm";
import { useUserData } from "../../context/UserContext";
import { Link } from "react-router-dom";

export async function getEventByIdLoader(req) {
  const {
    params: { eventId },
  } = req;

  const event = (await getEvents()).find((e) => e.id === eventId);

  return event;
}

export default function UpdateEventPage() {
  const [params] = useSearchParams();
  const from = params.get("from");

  const { userData } = useUserData();
  const currentEmail = userData?.email;
  const { id, ...data } = useLoaderData();
  const isHost = data.host_email_address === currentEmail;

  if (!isHost)
    return (
      <>
        <h2>You are not allowed to enter this page!</h2>
        <p>Only the event host can edit the event.</p>
        <Link to={"/events"}>
          <button>Go to Events</button>
        </Link>
      </>
    );

  return (
    <>
      <AddEventForm eventData={data} eventId={id} from={from} />
    </>
  );
}
