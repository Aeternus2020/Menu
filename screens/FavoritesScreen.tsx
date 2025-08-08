import {StyleSheet, Text, View} from "react-native"
import {useContext} from "react"
import {FavoritesContext} from "../store/context/favorites-context"
import {MEALS} from "../data/dummy-data"
import MealsList from "../components/MealsList"

function FavoritesScreen () {
    const favoriteMealsCtx = useContext(FavoritesContext)
    const favoriteMeals = MEALS.filter(meal => favoriteMealsCtx.ids.includes(meal.id))

    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You have no favorite meals yet.</Text>
            </View>
        )
    }
    return <MealsList items={favoriteMeals} />
}

export default FavoritesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    }
})