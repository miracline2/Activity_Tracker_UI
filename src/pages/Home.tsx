import { motion } from "framer-motion";
import { HomeAbout } from "../common";
import ActivityCard from "../components/Dashboard/ActivityCard";

const Home = () => {
  return (
    <div className="w-full min-h-screen 
      px-6 py-10 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full 
        mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full 
        mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
      
      <div className="relative z-10">
        {HomeAbout.map((about, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-center text-xl md:text-4xl font-bold mb-12
              bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
              bg-clip-text text-transparent">
              {about.title}
            </h1>
            
            <div className="flex justify-between items-center mb-8 p-6 
             backdrop-blur-sm rounded-2xl shadow-lg md:shadow-none  border md:border-0 md:border-none border-white/20">
              
              <h3 className="text-base md:text-2xl font-semibold text-gray-800">
                {about.activity}
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl
                  hover:from-purple-600 hover:to-pink-600 transition-all duration-300
                  border border-white/20"
              >
                {about.create}
              </motion.button>
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl 
            border border-white/20 p-4"
        >
          <ActivityCard />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
