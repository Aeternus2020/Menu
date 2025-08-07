import CategoriesScreen from "./screens/CategoriesScreen";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import {Ionicons} from "@expo/vector-icons";
import FavoritesContextProvider from "./store/context/favorites-context";

export type RootStackParamList = {
    MealsCategories: undefined
    MealsOverview: { categoryId: string }
    MealDetail: { mealId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator()

function  DrawerNavigator() {
    return(
        <Drawer.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: '#e4b7ae'},
                headerTintColor: 'black',
                sceneStyle: {backgroundColor: '#d4948f'},
                drawerContentStyle: {backgroundColor: '#e4b7ae'},
                drawerInactiveTintColor: 'black',
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: '#d4948f',
            }}>
            <Drawer.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    title: "All categories",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='list' color={color} size={size} />
                    )
                }}
            />
            <Drawer.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name='star' color={color} size={size} />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default function App() {
  return (
      <>
        <StatusBar style="dark" />
          <FavoritesContextProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MealsCategories"
                        component={DrawerNavigator}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
                    <Stack.Screen name="MealDetail" component={MealDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
          </FavoritesContextProvider>
      </>
  )
}
