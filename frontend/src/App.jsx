import { useState } from 'react'
import './App.css';
import axios from 'axios';
import HomePage from './Pages/HomePage';

function App() {
  const baseUrl = "http://localhost:3000";

  axios.defaults.baseURL = baseUrl;
  


  return (
    <>
      <HomePage />
    </>
  )
}

export default App
