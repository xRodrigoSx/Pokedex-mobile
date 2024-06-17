import { StyleSheet, Text, Image, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Pokemons } from "../types/response";

const Details = () => {
  const route = useRoute<any>();
  const [pokemon, setPokemon] = useState<Pokemons | undefined>(undefined);

  const pokemonId = route.params;

  React.useEffect(() => {
    if (pokemonId) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          setPokemon(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [pokemonId]); 

  if (!pokemon) return <Text>Loading...</Text>; 

  return (
    <View style={styles}>
      <View style={styles}>
        {pokemon.sprites?.front_default && (
          <Image
            style={styles}
            source={{ uri: pokemon.sprites.front_default }}
          />
        )}
        <Text>{pokemon.name}</Text>
      </View>
      <Text style={styles}>#{pokemon.id}</Text>
      {pokemon.types && (
        <Text>Type: {pokemon.types.map((type) => type.type.name)}</Text>
      )}
      {pokemon.height && <Text>Height: {pokemon.height} cm</Text>}
      {pokemon.weight && <Text>Weight: {pokemon.weight} hg</Text>}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  
});
