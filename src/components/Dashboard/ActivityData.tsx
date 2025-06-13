import { motion } from "framer-motion";

interface IActivityData {
  icon: string;
  title: string;
  index?: number;
}

const ActivityData = ({ icon, title,}: IActivityData) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
  
      <motion.div 
        className="relative"
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl md:text-6xl mb-2 relative z-10 
          filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
          {icon}
        </div>
    
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 
          rounded-full blur-xl opacity-0 group-hover:opacity-30 
          transition-opacity duration-500 scale-150" />
      </motion.div>
      
      <div className="md:space-y-2 ">
        <h3 className="text-sm md:text-xl font-bold text-gray-800 
          group-hover:text-gray-900 transition-colors duration-300
          bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
          {title}
        </h3>
        

      </div>
    </div>
  );
};

export default ActivityData;