import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FavoritesContextProvider from './store/context/favorites-context';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

export type CategoriesStackParamList = {
    MealsCategories: undefined;
    MealsOverview: { categoryId: string; color: string; title: string };
    MealDetail:     { mealId: string;  color?: string; title?: string };
};

export type FavoritesStackParamList = {
    Favorites: undefined;
    MealDetail: { mealId: string };
};

const CategoriesStack = createNativeStackNavigator<CategoriesStackParamList>();
const FavoritesStack  = createNativeStackNavigator<FavoritesStackParamList>();
const Tab = createBottomTabNavigator();

function CategoriesStackNavigator() {
    return (
        <CategoriesStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#e4b7ae' },
                headerTintColor: 'black',
                contentStyle: { backgroundColor: '#d4948f' },
            }}
        >
            <CategoriesStack.Screen
                name="MealsCategories"
                component={CategoriesScreen}
                options={{ title: 'All Categories' }}
            />
            <CategoriesStack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
            />
            <CategoriesStack.Screen
                name="MealDetail"
                component={MealDetailScreen}
            />
        </CategoriesStack.Navigator>
    );
}

function FavoritesStackNavigator() {
    return (
        <FavoritesStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#e4b7ae' },
                headerTintColor: 'black',
                contentStyle: { backgroundColor: '#d4948f' },
            }}
        >
            <FavoritesStack.Screen
                name="Favorites"
                component={FavoritesScreen}
            />
            <FavoritesStack.Screen
                name="MealDetail"
                component={MealDetailScreen}
            />
        </FavoritesStack.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="dark" />
            <FavoritesContextProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarActiveTintColor: 'black',
                            tabBarInactiveTintColor: '#444',
                            tabBarStyle: { backgroundColor: '#e4b7ae' },
                            tabBarIcon: ({ color, size, focused }) => {
                                const name =
                                    route.name === 'CategoriesTab' ? 'list' : 'star';
                                return <Ionicons name={name} color={color} size={size} />;
                            },
                            tabBarLabel:
                                route.name === 'CategoriesTab' ? 'Categories' : 'Favorites',
                        })}
                    >
                        <Tab.Screen
                            name="CategoriesTab"
                            component={CategoriesStackNavigator}
                            options={{
                                popToTopOnBlur: true,
                                tabBarLabel: 'Categories',
                            }}
                        />
                        <Tab.Screen
                            name="FavoritesTab"
                            component={FavoritesStackNavigator}
                            options={{
                                popToTopOnBlur: true,
                                tabBarLabel: 'Favorites',
                            }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </FavoritesContextProvider>
        </>
    );
}
