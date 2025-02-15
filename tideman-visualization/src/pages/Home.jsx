import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="container">
      <h2>Algoritmo de Tideman para elecciones con votos pluristas</h2>
      <p><strong>Por grupo #5</strong></p>

      <div className="names-container">
        <ul>
          <li>Pablo Lorenzo (21-1894)</li>
          <li>Jorge Lorenzo (21-1895)</li>
          <li>Luis Tavarez (21-1673)</li>
        </ul>
      </div>

      <Link className='btn btn-warning election-button' to="/create">
        Crear elecciones
      </Link>
    </div>
  )
}
