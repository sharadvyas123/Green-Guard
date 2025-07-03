import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import MapSelector from './pages/MapSelector'
import Prediction from './pages/Prediction'
import { ToastContainer, Bounce } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import SigninPage from './pages/SigninPage'

function App() {

  const location = useLocation();

  // Define routes that should have no layout
  const hideLayoutRoutes = ['/login', '/signin'];

  // Check if current route is in the list
  const isLayoutHidden = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!isLayoutHidden && <Navbar />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<MapSelector />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
      </Routes>
      {!isLayoutHidden && <Footer />}
    </>
  )
}

export default App
