import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import LetraPage from './pages/LetraPage';
import CifraPage from './pages/CifraPage';
import HomePage from './pages/HomePage';
import './App.css'
import React from 'react';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/letra' element={<LetraPage />} />
        <Route path='/cifra' element={<CifraPage />} />
      </Routes>
    </>
  )
}

export default App
