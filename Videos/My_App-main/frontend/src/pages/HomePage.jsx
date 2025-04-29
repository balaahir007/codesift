import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import ProductList from '../components/ProductList'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]); 
  return (
    <div>
      <div className='nav-fixed'>
        <Navbar/>
      </div>
      <div className='nav-product'>
        <ProductList/>
      </div>
    </div>
  )
}

export default HomePage
