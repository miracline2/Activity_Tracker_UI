import { motion } from "framer-motion";
import { activities } from "../../common";
import ActivityData from "./ActivityData";
import { useNavigate } from "react-router-dom";

const ActivityCard = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 p-6">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          onClick={() => navigate(`/activity/${activity.title.toLowerCase()}`)}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ 
            scale: 1.08, 
            y: -8,
            rotateX: 5,
            rotateY: 5,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1,
            ease: "easeOut"
          }}
          className="relative group rounded-3xl overflow-hidden cursor-pointer
            bg-gradient-to-br from-white via-gray-50 to-gray-100
            shadow-lg hover:shadow-2xl hover:shadow-purple-500/20
            border border-gray-200/50 backdrop-blur-sm
            transform-gpu perspective-1000"
          style={{
            background: `linear-gradient(135deg, 
              ${getCardGradient(index)} 10%,
              rgba(255,255,255,0.95) 100%)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
         
          <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center items-center">
            <ActivityData {...activity} index={index} />
          </div>
          
        
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl 
            from-white/20 to-transparent rounded-bl-full 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

// Helper function for card gradients
const getCardGradient = (index: number) => {
  const gradients = [
    'rgba(255, 99, 132, 0.1)', // Pink
    'rgba(54, 162, 235, 0.1)',  // Blue
    'rgba(255, 205, 86, 0.1)',  // Yellow
    'rgba(75, 192, 192, 0.1)',  // Teal
    'rgba(153, 102, 255, 0.1)', // Purple
    'rgba(255, 159, 64, 0.1)',  // Orange
  ];
  return gradients[index % gradients.length];
};

export default ActivityCard;