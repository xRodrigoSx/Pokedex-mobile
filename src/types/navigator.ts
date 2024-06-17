import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pokemons } from "./response";

export type StackParams = {
  Home: undefined;
  Details: Pokemons;
};

export type HomeProps = NativeStackScreenProps<StackParams, "Home">;

export type DetailsProps = NativeStackScreenProps<StackParams, "Details">;
