import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MealsCategories'>;

const CategoriesScreen: React.FC = () => {
    const navigation = useNavigation<NavProp>();

    return (
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <CategoryGridTile
                    title={item.title}
                    color={item.color}
                    onPress={() =>
                        navigation.navigate('MealsOverview', {
                            categoryId: item.id,
                        })
                    }
                />
            )}
        />
    );
};

export default CategoriesScreen;
