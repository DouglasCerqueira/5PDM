import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Game } from '../types/game';
import { Navbar } from '../../components/navbar';
import { styles } from './styles';
import api from '../../services/api';
import { AppNavigatorProps, RootStackParamList } from '../../navegation/appNavigator';

interface RouteParams {
  searchQuery: string;
}

type SearchResultsNavigationProp = StackNavigationProp<RootStackParamList, 'SearchResults'>;

const SearchResults: React.FC<AppNavigatorProps> = ({ addToCart, cartItems, setIsCartVisible }) => {
  const route = useRoute();
  const navigation = useNavigation<SearchResultsNavigationProp>();
  const { searchQuery } = route.params as RouteParams;
  const [games, setGames] = useState<Game[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Simulando chamada à API com a query de busca
        const response = await api.get<Game[]>('/jogos');
        const filteredGames = response.data.filter(game => 
          game.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .includes(searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        );
        setGames(filteredGames);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      }
    };

    fetchGames();
  }, [searchQuery]);

  const handleGamePress = (gameId: string) => {
    navigation.navigate('GamePage', { gameId });
  };

  return (
    <View style={styles.container}>
      <Navbar
        onSearchPress={() => setIsSearchVisible(!isSearchVisible)}
        onCartPress={() => setIsCartVisible(true)}
        cartItemsCount={cartItems.length}
      />
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{games.length} resultados</Text>
        <View style={styles.filterContainer}>
        </View>
      </View>

      <ScrollView style={styles.gamesGrid}>
        <View style={styles.gridContainer}>
          {games.map((game) => (
            <TouchableOpacity 
              key={game.gameID} 
              style={styles.gameCard}
              onPress={() => handleGamePress(game.gameID)}
            >
              <Image source={{ uri: game.poster }} style={styles.gameImage} resizeMode="cover" />
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <TouchableOpacity 
                  style={styles.priceButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    addToCart(game);
                  }}
                >
                  <Text style={styles.priceText}>R$ {game.price}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchResults;

