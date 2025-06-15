import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityPage from "./components/Activities/ActivityPage";


const App = () => {
  return (
    <div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full 
        mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full 
        mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
            <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{

          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },

          success: {
            duration: 4000,
            style: {
              background: '#10b981',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#10b981',
            },
          },

          error: {
            duration: 4000,
            style: {
              background: '#ef4444',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#ef4444',
            },
          },
        }}
      />

  <Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/activity/:activityName" element={<ActivityPage />} />
  </Routes>
</Router>
    </div>
  )
}

export default App
