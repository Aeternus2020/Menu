import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import { RootStackParamList } from '../App';
import {MEALS} from "../data/dummy-data";
import {useContext, useLayoutEffect} from "react";
import {NavProp} from "./MealsOverviewScreen";
import IconButton from "../components/IconButton";
import {FavoritesContext} from "../store/context/favorites-context";

type MealDetailRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;

function MealDetailScreen({ route }: { route: MealDetailRouteProp }) {
    const { mealId } = route.params
    const navigation = useNavigation<NavProp>()
    const favoritesMealsCtx = useContext(FavoritesContext)

    const selectedMeal = MEALS.find((meal) => meal.id === mealId)
    const mealsFavorite = favoritesMealsCtx.ids.includes(mealId)

    function changeFavoriteStatusHandler() {
        if (mealsFavorite) {
            favoritesMealsCtx.deleteFavorite(mealId)
        } else {
            favoritesMealsCtx.addFavorite(mealId)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedMeal ? selectedMeal.title : 'Meal Detail',
            headerRight: () => {
                return <IconButton icon={mealsFavorite ? 'star' : 'star-outline'}
                                   color='red'
                                   onPress={changeFavoriteStatusHandler}
                />
            }
        })
    }, [navigation, changeFavoriteStatusHandler, selectedMeal])

    return (
        <ScrollView style={styles.rootContainer}>
            <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{selectedMeal?.title}</Text>
                <View>
                    <View style={styles.details}>
                        <Text style={styles.detailItem}>{selectedMeal?.duration}m</Text>
                        <Text style={styles.detailItem}>{selectedMeal?.complexity}</Text>
                        <Text style={styles.detailItem}>{selectedMeal?.affordability}</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <Text style={styles.subtitle}>Ingredients:</Text>
                        {selectedMeal?.ingredients && (selectedMeal?.ingredients.map((ingredient) => (
                            <Text key={ingredient}>{ingredient}</Text>
                        )))}
                        <Text style={styles.subtitle}>Steps:</Text>
                        {selectedMeal?.steps && (selectedMeal?.steps.map((step) => (
                            <Text key={step}>{step}</Text>
                        )))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen;

export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginBottom: 32,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 4,
        padding: 6,
        textAlign: 'center',
    },
    listContainer: {
        width: '90%'
    }
});


