import React, { createContext, useState } from 'react'

interface FavoritesContextValue {
    ids: string[]
    addFavorite:    (id: string) => void
    deleteFavorite: (id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue>({
    ids: [],
    addFavorite: () => {},
    deleteFavorite: () => {},
})

interface ProviderProps {
    children: React.ReactNode
}

function FavoritesContextProvider({ children }: ProviderProps) {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([])

    function addFavorite(id: string) {
        setFavoriteIds((current) => [...current, id])
    }

    function deleteFavorite(id: string) {
        setFavoriteIds((current) => current.filter((mid) => mid !== id))
    }

    const value: FavoritesContextValue = {
        ids: favoriteIds,
        addFavorite,
        deleteFavorite,
    }

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContextProvider
