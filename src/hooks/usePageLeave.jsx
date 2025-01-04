import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

const usePageLeave = (
  hasJoined,
  hasPickedItem,
  IsHost,
  setPopup,
  eventId,
  unJoinEvent
) => {
  const blocker = useBlocker(hasJoined && !hasPickedItem && !IsHost);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setPopup({
        message: "Are you sure you want to leave? You have not picked an item to bring to the event.",
        buttons: [
          {
            text: "Yes",
            onClick: async () => {
              await unJoinEvent([eventId]);
              blocker.proceed();
              setPopup(null);
            }
          },
          {
            text: "No",
            onClick: () => {
              setPopup(null);
            }
          }
        ]
      });
    }
  }, [blocker, hasJoined, hasPickedItem, eventId, unJoinEvent, setPopup]);
};

export default usePageLeave;
