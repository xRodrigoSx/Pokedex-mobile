import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParams } from "../types/navigator";
import Home from "../screens/Home";
import Details from "../screens/Details";

export default function AppRoutes() {
  const Stack = createNativeStackNavigator<StackParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
