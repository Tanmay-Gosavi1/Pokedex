import React from 'react'
import Search from './Search'
import PokeCard from './PokeCard'

const Pokedex = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center text-orange-700'>
        <h1 className='text-2xl font-bold mt-20 mb-7 pb-3 border-b-1 px-4 border-b-sky-600'>Pokedex</h1>
        <Search />
        <PokeCard />
    </div>
  )
}

export default Pokedex