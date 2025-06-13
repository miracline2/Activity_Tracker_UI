
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { activities } from '../../common';
import toast from 'react-hot-toast';

interface ActivityPopupContentProps {
    onClose: () => void;
  }
  

 const ActivityPopupContent =  ({ onClose }: ActivityPopupContentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
 

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Inside your component
  const onSubmit = async (data: any) => {
    // Simulate delay
    const loadingToast = toast.loading('Submitting Request...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
  
    const newActivity = {
      title: data.Activity.trim(),
      icon: data["Icon/Emoji"].trim() || "❓",
    };
  
    activities.push(newActivity);
    onClose();
    console.log("Updated Activities---:", activities);
    toast.dismiss(loadingToast);
    toast.success('Activity Created Sucessfully', {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10b981',
        color: 'white',
      },
    });
  };
  

  return (
    <motion.form 
    onSubmit={handleSubmit(onSubmit)}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 p-1"
    >
      {/* Icon/Emoji Input */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2 
          bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text">
          Icon/Emoji
        </label>
        <div className="relative group">
          <motion.input
            {...register('Icon/Emoji')}
            placeholder="🎯 Pick an emoji"
            whileFocus={{ scale: 1.01 }}
            className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border 
              border-white/30 rounded-xl text-gray-800 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500/50 
              focus:border-purple-300 focus:bg-white/90
              group-hover:bg-white/80 group-hover:border-white/40
              transition-all duration-200 ease-in-out
              shadow-sm group-hover:shadow-md focus:shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 
            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
      </motion.div>

      {/* Activity Input */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-2
          bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text">
          Activity Name <span className="text-red-400">*</span>
        </label>
        <div className="relative group">
          <motion.input
            {...register('Activity', { required: 'Activity name is required' })}
            placeholder="Enter activity name"
            whileFocus={{ scale: 1.01 }}
            className={`w-full px-4 py-3 bg-white/70 backdrop-blur-sm border 
              rounded-xl text-gray-800 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500/50 
              focus:border-purple-300 focus:bg-white/90
              group-hover:bg-white/80 group-hover:border-white/40
              transition-all duration-200 ease-in-out
              shadow-sm group-hover:shadow-md focus:shadow-lg
              ${errors.Activity 
                ? 'border-red-300 focus:ring-red-500/50 focus:border-red-400' 
                : 'border-white/30'
              }`}
          />
          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 pointer-events-none
            ${errors.Activity 
              ? 'bg-gradient-to-r from-red-400/10 to-pink-400/10' 
              : 'bg-gradient-to-r from-purple-400/10 to-pink-400/10'
            }`} />
        </div>
        
        {/* Animated Error Message */}
        {errors.Activity && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 
              rounded-lg p-3 flex items-center gap-2">
              <span className="text-red-400 text-sm">⚠️</span>
              <p className="text-red-600 text-sm font-medium">
                {errors.Activity.message as string} 
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ 
            scale: 1.02,
            y: -2
          }}
          whileTap={{ scale: 0.98, y: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
            hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 
            disabled:to-gray-500 text-white font-semibold rounded-xl 
            shadow-lg hover:shadow-xl disabled:shadow-md
            transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-white/20
            backdrop-blur-sm border border-white/20 disabled:cursor-not-allowed
            relative overflow-hidden group"
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 
            translate-x-[-100%] group-hover:translate-x-[100%]  
            transition-transform duration-700 ease-in-out" />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Creating...
              </>
            ) : (
              <>
                <span>✨</span>
                Create Activity
              </>
            )}
          </span>
        </motion.button>
      </motion.div>
    </motion.form>
  );
};


export default ActivityPopupContent