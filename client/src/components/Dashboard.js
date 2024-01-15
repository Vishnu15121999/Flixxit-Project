import React, { useEffect, useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <>
      <div className='dashboard'>
        <div className='dashboard-box'>
          <h1>Welcome.Millions of movies, TV shows and people to discover. Explore now.</h1>
          <h1>Get Started</h1>
        </div>
      </div>
    </>
  )
}

export default Dashboard 