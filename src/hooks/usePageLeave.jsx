import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

const usePageLeave = (
  hasJoined,
  hasPickedItem,
  setShowPopup,
  setPopupMessage,
  confirmAction
) => {
  const blocker = useBlocker(hasJoined && !hasPickedItem);

  useEffect(() => {
    if (blocker.state === "blocked") {
      setPopupMessage(
        "You have not picked an item from the contribution list. Are you sure you want to leave?"
      );
      setShowPopup(true);
      if (confirmAction) {
        blocker.proceed();
      }
    }
  }, [blocker, confirmAction, hasJoined, setPopupMessage, setShowPopup]);
};

export default usePageLeave;
