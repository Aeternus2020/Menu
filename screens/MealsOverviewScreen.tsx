import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../App';
import {CATEGORIES, MEALS} from "../data/dummy-data";
import {useLayoutEffect} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import MealsList from "../components/MealsList";

export type MealsOverviewRouteProp = RouteProp<RootStackParamList, 'MealsOverview'>;
export type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealsOverview'>;

export default function MealsOverviewScreen() {
    const navigation = useNavigation<NavProp>();
    const route = useRoute<MealsOverviewRouteProp>();
    const { categoryId } = route.params;

    const displayMeals = MEALS.filter(mealItem =>
        mealItem.categoryIds.includes(categoryId)
    );

    useLayoutEffect(() => {
        const selectedCategory = CATEGORIES.find(
            category => category.id === categoryId
        );

        if (!selectedCategory) return;

        navigation.setOptions({
            title: selectedCategory.title,
            headerStyle: {backgroundColor: `${selectedCategory.color}E6`},
            contentStyle: {backgroundColor: `${selectedCategory.color}B3`},
            headerTintColor: 'black',
        });
    }, [categoryId, navigation]);

    return <MealsList items={displayMeals} />
}
