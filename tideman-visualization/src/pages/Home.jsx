import React from 'react'

import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
    <ul>
        <li>Pablo Lorenzo (21-1894)</li>
        <li>Jorge Lorenzo (21-1895)</li>
        <li>Luis Tavarez (21-1673)</li>
      </ul>

      <Link className='btn btn-primary' to="/create">
            Crear elecciones
        </Link>
    </>
  )
}
