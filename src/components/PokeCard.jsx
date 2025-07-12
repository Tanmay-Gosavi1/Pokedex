import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pokemons from './Pokemons'

const PokeCard = () => {
    useEffect(()=>{
        fetchCurrData()
    },[])
    const pokeApi = "https://pokeapi.co/api/v2/pokemon"
    const [pokemons , setPokemons] = useState([])
    
    const fetchCurrData = async ()=>{
        const poke = await axios.get(pokeApi)
        const pokeData  = poke.data 
        const pokeDataResults = pokeData.results
        const  indiviualPokeData = pokeDataResults.map(ele=>axios.get(ele.url))
        const pokemonData = await axios.all(indiviualPokeData)
        const res = pokemonData.map(ele=>{
            return {
                id : ele.data.id ,
                name : ele.data.name ,
                image : ele.data.sprites.other.dream_world.front_default ? ele.data.sprites.other.dream_world.front_default :  ele.data.sprites.back_shiny
            }
        })
        setPokemons(res)
    }
  return (
    <>
        <div className='flex flex-wrap justify-center items-center gap-5 pt-20 pb-15 px-10'>
            {
                pokemons.map((ele,idx)=>{
                    return <Pokemons key={idx} name={ele.name} id={ele.id} image={ele.image} />
                })
            }
        </div>
        <div className='flex space-x-5'>
            <button className='px-8 py-2 text-sm text-white font-bold text-center bg-[#413f3f4f] rounded-md cursor-pointer'>Previous</button>
            <button className='px-8 py-2 text-sm text-white font-bold text-center bg-[#413f3f4f] rounded-md cursor-pointer'>Next</button>
        </div>
    </>
  )
}

export default PokeCard