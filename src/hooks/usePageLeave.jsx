import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageLeave = (hasJoined, hasPickedItem, setShowPopup, setPopupMessage, setConfirmAction) => {
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasJoined && !hasPickedItem) {
        const message = "You have not picked an item from the contribution list. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasJoined, hasPickedItem]);

  useEffect(() => {
    if (hasJoined && !hasPickedItem) {
      const handleLocationChange = () => {
        setPopupMessage("You have not picked an item from the contribution list. Are you sure you want to leave?");
        setConfirmAction(true);
        setShowPopup(true);
        return false;
      };

      handleLocationChange();

      return () => {
        setShowPopup(false);
        setConfirmAction(false);
      };
    }
  }, [location, hasJoined, hasPickedItem, setShowPopup, setPopupMessage, setConfirmAction]);
};

export default usePageLeave;