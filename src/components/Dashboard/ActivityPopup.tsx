import PopupCard from "../popup/PopupCard"
import ActivityPopupContent from "./ActivityPopupContent";


interface ActivityPopupProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ActivityPopup = ({ isOpen, onClose }: ActivityPopupProps) => {
    return (
      <PopupCard
        isOpen={isOpen}
        onClose={onClose}
        title="Create New Activity"
        variant="info"
        animation="scale"
        size="md"
      >
        {/* You can add form content here */}
       <ActivityPopupContent  onClose={onClose}/>
      </PopupCard>
    );
  };
  

export default ActivityPopup
