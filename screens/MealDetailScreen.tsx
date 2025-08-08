import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import {RouteProp, useNavigation} from '@react-navigation/native'
import { CategoriesStackParamList } from '../App'
import {MEALS} from "../data/dummy-data"
import {useContext, useLayoutEffect} from "react"
import {NavProp} from "./MealsOverviewScreen"
import IconButton from "../components/IconButton"
import {FavoritesContext} from "../store/context/favorites-context"
import {Ionicons} from "@expo/vector-icons";

type MealDetailRouteProp = RouteProp<CategoriesStackParamList, 'MealDetail'>

function MealDetailScreen({ route }: { route: MealDetailRouteProp }) {
    const { mealId, color } = route.params
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

    const flags = [
        { label: 'Gluten-free', on: !!selectedMeal?.isGlutenFree },
        { label: 'Vegan',       on: !!selectedMeal?.isVegan },
        { label: 'Vegetarian',  on: !!selectedMeal?.isVegetarian },
        { label: 'Lactose-free',on: !!selectedMeal?.isLactoseFree },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedMeal ? selectedMeal.title : 'Meal Detail',
            headerStyle:  { backgroundColor: `${color}E6` },
            contentStyle: { backgroundColor: `${color}B3` },
            headerRight: () => {
                return <IconButton icon={mealsFavorite ? 'star' : 'star-outline'}
                                   color='red'
                                   onPress={changeFavoriteStatusHandler}
                />
            }
        })
    }, [navigation, selectedMeal, color, mealsFavorite, changeFavoriteStatusHandler])

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
                    <View style={styles.details}>
                        {flags.filter(f => f.on).map(f => (
                            <View key={f.label} style={styles.badge}>
                                <Ionicons name="checkmark" size={18} color="#2e7d32" style={{ marginRight: 2 }} />
                                <Text style={styles.badgeText}>{f.label}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.listContainer}>
                        <Text style={styles.subtitle}>Ingredients:</Text>
                        {selectedMeal?.ingredients && (selectedMeal?.ingredients.map((ingredient) => (
                            <Text key={ingredient} style={styles.stepItem}>{ingredient}</Text>
                        )))}
                        <Text style={styles.subtitle}>Steps:</Text>
                        {selectedMeal?.steps?.map((step, idx) => (
                            <Text key={`step-${idx}`} style={styles.stepItem}>
                                {idx + 1}. {step}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen

export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginBottom: 4,
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
        fontSize: 14,
        fontStyle: 'italic',
    },
    stepItem: {
        fontSize: 14,
        lineHeight: 20,
        marginVertical: 2,
    },
    subtitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 4,
        padding: 6,
    },
    listContainer: {
        width: '90%'
    },
    badge: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    badgeText:{
        fontSize:12,
        color:'#2e7d32',
        fontWeight:'600'
    },
})


