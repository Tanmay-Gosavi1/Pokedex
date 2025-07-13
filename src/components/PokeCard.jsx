import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pokemons from './Pokemons'

const PokeCard = () => {
    // const [pokeApi,setPokeApi] = useState("https://pokeapi.co/api/v2/pokemon")
    // const [pokemons , setPokemons] = useState([])
    // const [nextUrl , setNextUrl] = useState('')
    // const [prevUrl , setPrevUrl] = useState('')
    // const [isLoading , setIsLoading] = useState(true)

    const [PokemonList,setPokemonList] = useState({
        pokeApi : "https://pokeapi.co/api/v2/pokemon" ,
        pokemons : [] ,
        nextUrl : '' ,
        prevUrl : '' ,
        isLoading : true
	})
    useEffect(()=>{
        fetchCurrData()
    },[PokemonList.pokeApi])

    const fetchCurrData = async ()=>{
        const poke = await axios.get(PokemonList.pokeApi) //this downloads the list of 20 pokemons
        // setNextUrl(poke.data.next)
        // setPrevUrl(poke.data.previous)
        setPokemonList((state)=>({...state,nextUrl : poke.data.next , prevUrl : poke.data.previous}))

        const pokeDataResults = poke.data.results  //this gives array of name and url of  pokemons
        const indiviualPokeData = pokeDataResults.map(ele=>axios.get(ele.url))  //From their indiviual urls , we get array of promises
        const pokemonData = await axios.all(indiviualPokeData)  //Wait till all promises get fulfilled
        const res = pokemonData.map(ele=>{     //Mapped through each pokemon to get their info
            return {
                id : ele.data.id ,
                name : ele.data.name ,
                image : ele.data.sprites.other.dream_world.front_default ? ele.data.sprites.other.dream_world.front_default :  ele.data.sprites.back_shiny
            }
        })
        // setPokemons(res)    
        // setIsLoading(false)
        setPokemonList(state =>({...state, pokemons : res , isLoading : false}))    
    }
  return (
    <>  
    {
        PokemonList.isLoading ? <h1 className='text-2xl text-white p-20 text-center font-bold'>Loading...</h1> : ""
    }
        <div className='flex flex-wrap justify-center items-center gap-5 pt-20 pb-15 px-10'>
            {
                PokemonList.pokemons.map((ele,idx)=>{
                    return <Pokemons key={idx} name={ele.name} id={ele.id} image={ele.image} />
                })
            }
        </div>
        <div className='flex space-x-5'>
            <button disabled={PokemonList.prevUrl==null} onClick={()=>setPokemonList({...PokemonList, pokeApi : PokemonList.prevUrl})} className='px-8 py-2 text-sm text-white font-bold text-center bg-[#413f3f4f] rounded-md cursor-pointer'>Previous</button>
            <button disabled={PokemonList.nextUrl==null} onClick={()=>setPokemonList({...PokemonList, pokeApi : PokemonList.nextUrl})} className='px-8 py-2 text-sm text-white font-bold text-center bg-[#413f3f4f] rounded-md cursor-pointer'>Next</button>
        </div>
    </>
  )
}

export default PokeCard