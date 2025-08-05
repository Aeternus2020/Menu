import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { RootStackParamList } from '../App';
import {CATEGORIES, MEALS} from "../data/dummy-data";
import Meal from "../models/meal";
import MileItem from "../components/MileItem";
import {useLayoutEffect} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export type MealsOverviewRouteProp = RouteProp<RootStackParamList, 'MealsOverview'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealsOverview'>;

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
            headerStyle: {backgroundColor: `${selectedCategory.color}B3`},
            contentStyle: {backgroundColor: `${selectedCategory.color}E6`},
            headerTintColor: 'black',
        });
    }, [categoryId, navigation]);


    const renderMealItem = ({ item }: ListRenderItemInfo<Meal>) => {
        const mealItemProps = {
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration
        };
        return (
            <MileItem {...mealItemProps} />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList<Meal>
                data={displayMeals}
                keyExtractor={item => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    mealTile: {
        marginBottom: 12,
    },
});
