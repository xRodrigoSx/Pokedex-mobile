import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { FC } from "react";
import { Pokemons } from "../types/response";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../types/navigator";

interface CardProps {
  item: Pokemons;
}
const Card: FC<CardProps> = ({ item }) => {
  const { navigation } = useNavigation<HomeProps>();

  const goToDetails = () => {
    if (navigation) {
      navigation.navigate("Details", item);
    } else {
      console.log("Navigation object is undefined");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.id}>{"#"+item.order}</Text>
      <Image source={{ uri: item.sprites.back_default }} style={styles.avatar} />
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
      <TouchableOpacity style={styles.button} onPress={goToDetails}>
        <Text style={styles.buttonText}>Detalhes</Text>
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
    backgroundColor: "#a1b2c3d4",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  id: {
    fontSize: 20,
    color: "#333",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "gray",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 18,
  },
  button: {
    marginVertical: 10,
    width: "85%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
