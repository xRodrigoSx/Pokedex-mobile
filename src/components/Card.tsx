import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { FC } from "react";
import { Pokemons } from "../types/response";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../types/navigator";

interface CardProps {
  item: Pokemons;
}

const Card: FC<CardProps> = ({ item }) => {
  const navigation = useNavigation();

  const goToDetails = () => {
    if (navigation) {
      navigation.navigate("Details", item);
    } else {
      console.log("Navigation object is undefined");
    }
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
  
  const backgroundColor = typeColors[item.types[0].type.name] || "#FFFFFF";  

  const pokeName = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.button} onPress={goToDetails}>
      <Text style={styles.id}>{"#" + item.id}</Text>
      <Image source={{ uri: item.sprites.front_default }} style={styles.avatar} />
      <Text style={styles.title}>{pokeName(item.name)}</Text>
      <Text>{item.types.map((type) => type.type.name).join(" | ")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  id: {
    fontSize: 15,
    color: "#333",
    backgroundColor: 'rgba(205,205,205, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 6,
    marginBottom: 5
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'rgba(205,205,205, 0.8)',
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 18,
  },
  button: {
    marginVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  }
});