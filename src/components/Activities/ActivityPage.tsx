import { useNavigate, useParams } from "react-router-dom";
import { activities } from "../../common";
import GamingPage from "../GamingDashboard/GamingPage";

const ActivityPage = () => {
  const { activityName } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(
    (act) => act.title.toLowerCase() === activityName
  );

  if (!activity) {
    return <div className="p-10 text-center text-xl">Activity not found</div>;
  }

  return (
    <div className="min-h-screen">
    <button className="cursor-pointer"
      onClick={() => navigate(`/`)}
    >back</button>
    <div className=" flex flex-col items-center justify-center p-6">
      
      {activity.title==='Gaming'?<GamingPage/>:'It is in Progress Explore Gaming :)'}

    </div>
    </div>
  );
};

export default ActivityPage;
