import React, { useEffect } from 'react'
import { pokemonListServices, pokemonDetailServices } from "@/services";
import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from '@/store/pokemonList';

const HomePage = () => {
  
  // const callData = async() => {
  //   const data = await pokemonDetailServices.getPokemonDetail("ditto")
  //   console.log("data", data.data);
  // }
  
  // useEffect(() => {
  //  callData()
  // }, [])
  const {pokemon} = usePokemonListStore()


  return (
    <div className='w-[90%] m-[auto] max-w-[1100px]'>
      <div className='flex justify-center'>
        <img src="/images/logo.webp" className='max-h-[80px] mt-[20px]' alt=""/>
      </div>
      <SearchForm/>
      
      <div>
        {pokemon.data?.map((item) => {
          return (
            <div className='text-white' key={`pokemon-${item.id}`}>
              {item.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage 