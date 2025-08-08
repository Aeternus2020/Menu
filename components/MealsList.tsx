import React from 'react'
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    View,
} from 'react-native'
import Meal from '../models/meal'
import MealItem from './MealItem'

interface MealsListProps {
    items: Meal[]
    accentColor?: string
}

const MealsList: React.FC<MealsListProps> = ({ items, accentColor }) => {
    const renderMealItem = ({ item }: ListRenderItemInfo<Meal>) => (
        <MealItem
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            affordability={item.affordability}
            complexity={item.complexity}
            duration={item.duration}
            accentColor={accentColor}
        />
    )

    return (
        <View style={styles.container}>
            <FlatList <Meal>
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    )
}

export default MealsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
})
