import React, {useEffect} from "react";
import {pokemonListServices, pokemonDetailServices} from "@/services"
import { usePokemonListStore } from "@/store/pokemonList";
import { useForm } from "react-hook-form";


const useSearchForm = () => {
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: {errors} 
    } = useForm()
    const {setFetchPokemonList} = usePokemonListStore()

    const keyword = watch("keyword")

    const callData = async () => {
        const responseList = await pokemonListServices.getPokemonList()
        const pokeList = []
        setFetchPokemonList({data: [], loading: true, error: null,})

        if (responseList.status === 200) {
            const responseResults = responseList.data.results || []
            for (const pokemon of responseResults) {
                const response = await pokemonDetailServices.getPokemonDetail(pokemon.name)
                const pokeData = response.data
                pokeList.push({...pokeData})
            }
            // console.log('pokeList', pokeList);
            setFetchPokemonList({data: pokeList, loading: false, error: null,})
        } else {
            setFetchPokemonList({data: [], loading: false, error: responseList.data,})
        }

    };

    useEffect(() => {
        callData();
    }, []);

    useEffect(() => {
        console.log("keyword", keyword);
        
    }, [keyword])

    return {
        fieldKeyword : register("keyword"),
    }
};

export { useSearchForm };
