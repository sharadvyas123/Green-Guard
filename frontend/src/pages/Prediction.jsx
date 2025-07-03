import React, { useState } from 'react';
import MapSelector from './MapSelector';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

const Prediction = () => {
  const [location, setLocation] = useState(null);
  const [satelliteImg, setSatelliteImg] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocation = async ({ lat, lng }) => {
    setLocation({ lat, lng });
    setLoading(true);

    try {
      // Fetch satellite image from Django (which uses Sentinel Hub)
      const response = await axios.post('http://localhost:8000/api/predict/get-satellite/', {
        lat,
        lng
      });
      toast.success('succesfully got the image', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      const imgBase64 = response.data.image;
      setSatelliteImg(`data:image/png;base64,${imgBase64}`);

      // TODO: If you want to send this image to ML model, do it here
      // const modelRes = await axios.post('http://localhost:8000/api/predict/predict-image/', {
      //   image: imgBase64
      // });
      // setResult(modelRes.data);
      const res = await axios.post('http://localhost:8000/api/predict/predict-image/', {
        image: `data:image/png;base64,${imgBase64}`
      });
      const heatmapBase64 = res.data.heatmap;
      setResult(`data:image/png;base64,${heatmapBase64}`);
      toast.success('Prediction has been made ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error from the backend', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error fetching satellite image:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className='text-3xl text-center font-bold mb-4'>Select Location</h2>

      <MapSelector onLocationSelect={handleLocation} />

      {loading && <p className="text-center mt-4">Fetching satellite image...</p>}

      {satelliteImg && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Satellite Image</h3>
          <img src={satelliteImg} alt="Satellite" className="mx-auto shadow-md rounded" />
        </div>
      )}

      {result && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Predicted Heatmap</h3>
          <img src={result} alt="Heatmap" className="mx-auto shadow-md rounded" />
        </div>
      )}

    </div>
  );
};

export default Prediction;
