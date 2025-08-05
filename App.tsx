import {StyleSheet} from 'react-native';
import CategoriesScreen from "./screens/CategoriesScreen";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";

const Stack = createNativeStackNavigator()

export type RootStackParamList = {
    MealsCategories: undefined
    MealsOverview: { categoryId: string }
}

export default function App() {
  return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: '#e4b7ae'},
                    headerTintColor: 'black',
                    contentStyle: {backgroundColor: '#d4948f'}
                }}
            >
                <Stack.Screen
                    name="MealsCategories"
                    component={CategoriesScreen}
                    options={{title: 'All Categories'}}
                />
                <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
