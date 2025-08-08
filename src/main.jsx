import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create_trip/index.jsx'
import Header from './components/header/header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>
  },
  {
    path : '/create-trip',
    element : <CreateTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <Header/>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
