import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { Pokemons } from "../types/response";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
    const [list, setList] = useState<Pokemons | undefined>(undefined);
    const [search, setSearch] = useState("");

    const urlBase = "https://pokeapi.co/api/v2/";

    const getPokemon = async () => {
        try {
          const response = await axios.get<Pokemons>(`${urlBase}pokemon/${search}`);
          const pokemons = response.data;
          setList(pokemons);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>
            <View style={styles.rowContainer}>
                <TextInput
                    onChangeText={setSearch}
                    style={styles.input}
                    placeholder="Search Pokemon..."
                />
                <TouchableOpacity style={styles.button} onPress={getPokemon}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            {list && (
            <Card item={list} />
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
    },
    button: {
        width: "20%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    input: {
        width: "70%",
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
