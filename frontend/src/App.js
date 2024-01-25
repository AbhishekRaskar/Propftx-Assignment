import './App.css';
import Navbar from './Components/Navbar';
import AllRoutes from './Components/AllRoutes';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Check if values exist in localStorage
    const localStorageValues = localStorage.getItem('token');

    // If values exist, clear localStorage
    if (localStorageValues) {
      localStorage.clear();
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <br />
      <AllRoutes />
    </div>
  );
}

export default App;
