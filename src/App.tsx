import Home from "./pages/Home"
import { Toaster } from "react-hot-toast";



const App = () => {
  return (
    <div>
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
  <Home/>
    </div>
  )
}

export default App
