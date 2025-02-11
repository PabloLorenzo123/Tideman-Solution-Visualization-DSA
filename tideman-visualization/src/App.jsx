import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'

// Pages
import { Home } from './pages/Home';
import {CreateElections} from './pages/CreateElections';

function App() {
  return (
    <>
      <h2>AlGORITMO DE TIDEMAN PARA ELECCIONES CON VOTOS PLURISTAS</h2>
      <p>Por grupo #5</p>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/create" element={ <CreateElections />} />
        </Routes>
      </BrowserRouter>
      
      
    </>
  )
}

export default App
