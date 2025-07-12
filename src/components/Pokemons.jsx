import React from 'react'

const Pokemons = ({name , id , image}) => {
  return (
    <div className='px-6 pb-2 w-60 h-60 text-black rounded-lg flex flex-col items-center hover:bg-[#413f3f4f]'>
        <img className='py-2 w-full h-[85%] object-cover object-top-left' src={image} alt="" />
        <h1 className='capitalize py-2 text-white font-bold'>{name}</h1>
    </div>
  )
}

export default Pokemons