import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Pokemons } from "../types/response";

const Details = () => {
  const route = useRoute<any>();
  const [pokemon, setPokemon] = useState<Pokemons | undefined>(undefined);

  const pokemonId = route.params.id;

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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const typeColors: { [key: string]: string } = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  const backgroundColor = typeColors[pokemon.types[0].type.name] || "#FFFFFF";

  interface ProgressBarProps {
    progress: number;
  }

  const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progress, backgroundColor: backgroundColor }]} />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.head}>
        <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
        <Text style={styles.id}>#{pokemon.id}</Text>
      </View>
      <Text style={styles.types}>
        {pokemon.types.map((type) => capitalizeFirstLetter(type.type.name)).join(" | ")}
      </Text>
      <Image style={styles.avatar} source={{ uri: pokemon.sprites.front_default }} />
      <View style={styles.info}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Base stats</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={{ color: "white" , fontSize: 13}}>HP:</Text>
            <Text style={{ color: "white" , fontSize: 13}}>Attack:</Text>
            <Text style={{ color: "white" , fontSize: 13}}>Defense:</Text>
            <Text style={{ color: "white" , fontSize: 13}}>Sp. Atk:</Text>
            <Text style={{ color: "white" , fontSize: 13}}>Sp. Def:</Text>
            <Text style={{ color: "white" , fontSize: 13}}>Speed:</Text>
            <Text style={{ color: "cyan" , fontSize: 13}}>Total:</Text>

          </View>
          <View style={styles.stat}>
            <Text style={{ color: "white" }}>{pokemon.stats[0].base_stat}</Text>
            <Text style={{ color: "white" }}>{pokemon.stats[1].base_stat}</Text>
            <Text style={{ color: "white" }}>{pokemon.stats[2].base_stat}</Text>
            <Text style={{ color: "white" }}>{pokemon.stats[3].base_stat}</Text>
            <Text style={{ color: "white" }}>{pokemon.stats[4].base_stat}</Text>
            <Text style={{ color: "white" }}>{pokemon.stats[5].base_stat}</Text>
            <Text style={{ color: "cyan" , fontWeight: "bold"}}>{pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat}</Text>
          </View>
          <View style={styles.stat}>
            <ProgressBar progress={pokemon.stats[0].base_stat / 2} />
            <ProgressBar progress={pokemon.stats[1].base_stat / 2} />
            <ProgressBar progress={pokemon.stats[2].base_stat / 2} />
            <ProgressBar progress={pokemon.stats[3].base_stat / 2} />
            <ProgressBar progress={pokemon.stats[4].base_stat / 2} />
            <ProgressBar progress={pokemon.stats[5].base_stat / 2} />
            <ProgressBar progress={(pokemon.stats[0].base_stat +
              pokemon.stats[1].base_stat +
              pokemon.stats[2].base_stat +
              pokemon.stats[3].base_stat +
              pokemon.stats[4].base_stat +
              pokemon.stats[5].base_stat) / 12} />
          </View>

        </View>
        <View style={styles.statistic}>
          <Text>Weight: {pokemon.weight / 10} kg</Text>
          <Text>Height: {pokemon.height / 10} m</Text>
        </View>
      </View>
    </ScrollView >
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
  },
  head: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "baseline",
    flexDirection: "row",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textTransform: "capitalize",
    color: "white"
  },
  id: {
    fontSize: 20,
    color: "white"
  },
  types: {
    marginHorizontal: 15,
    fontSize: 15,
    color: "white"
  },
  avatar: {
    alignSelf: "center",
    width: 180,
    height: 180,
    marginBottom: 10
  },
  info: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "purple",
    fontSize: 16,
    color: "white",
    padding: 20,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
  },
  progressBarContainer: {
    height: 10,
    width: "140%",
    backgroundColor: '#2B004A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
    marginLeft: -50
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF9A57',
    borderRadius: 5,
  },
  stat: {
    marginTop: 10,
    gap: 4,
    flex: 1,
    justifyContent: "space-between",
  },
  statistic: {
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "lightblue",
    justifyContent: "center",
    paddingVertical: 20,
    marginVertical: 20,
    gap: 40,
  }
});
