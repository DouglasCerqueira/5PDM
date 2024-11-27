import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, AppNavigatorProps } from '../../navegation/appNavigator';
import api from '../../services/api';
import { Game } from '../types/game';
import { styles } from './styles';
import { Navbar } from '../../components/navbar';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Home: React.FC<AppNavigatorProps> = ({ addToCart, cartItems, setIsCartVisible }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [gamesSection1, setGamesSection1] = useState<Game[]>([]);
  const [gamesSection2, setGamesSection2] = useState<Game[]>([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const featuredFlatListRef = useRef<FlatList<Game>>(null);
  
  const featuredGameIds = ['zBreathWild', 'kDreamBuffet', 'xChronicles2', 'aCrossing'];
  const gameIdsSection1 = ['pEevee', 'pPikachu', 'pBrilliantDiamond', 'pShiningPearl'];
  const gameIdsSection2 = ['sSmashBros', 'sMarioWonder', 'sMarioOdyssey', 'mKart'];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const featuredPromises = featuredGameIds.map(id => api.get<Game>(`/jogos/${id}`));
        const featuredResponses = await Promise.all(featuredPromises);
        setFeaturedGames(featuredResponses.map(response => response.data));

        const gamesPromises1 = gameIdsSection1.map(id => api.get<Game>(`/jogos/${id}`));
        const responses1 = await Promise.all(gamesPromises1);
        setGamesSection1(responses1.map(response => response.data));

        const gamesPromises2 = gameIdsSection2.map(id => api.get<Game>(`/jogos/${id}`));
        const responses2 = await Promise.all(gamesPromises2);
        setGamesSection2(responses2.map(response => response.data));
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (featuredGames.length > 0) {
      timer = setInterval(() => {
        if (featuredFlatListRef.current) {
          const nextIndex = (currentFeaturedIndex + 1) % featuredGames.length;
          featuredFlatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
          setCurrentFeaturedIndex(nextIndex);
        }
      }, 5000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [currentFeaturedIndex, featuredGames]);

  const handleScroll = (event: any) => {
    const slideSize = SCREEN_WIDTH;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentFeaturedIndex(roundIndex);
  };

  const handleGamePress = (gameId: string) => {
    navigation.navigate('GamePage', { gameId });
  };

  const handleAddToCart = (game: Game) => {
    addToCart(game);
  };

  const renderFeaturedItem = ({ item }: { item: Game }) => (
    <TouchableOpacity onPress={() => handleGamePress(item.gameID)}>
      <Image source={{ uri: item.poster }} style={[styles.featuredImage, { width: SCREEN_WIDTH }]} resizeMode="contain" />
    </TouchableOpacity>
  );

  const renderGameItem = (game: Game) => (
    <View key={game.gameID} style={styles.gameCard}>
      <TouchableOpacity onPress={() => handleGamePress(game.gameID)}>
        <Image source={{ uri: game.poster }} style={styles.gamePoster} resizeMode="cover" />
        <View style={styles.gameInfo}>
          <Text style={styles.gameTitle} numberOfLines={1} ellipsizeMode="tail">{game.title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton} onPress={() => handleAddToCart(game)}>
        <Text style={styles.buyButtonText}>{game.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Navbar
        onSearchPress={() => setIsSearchVisible(!isSearchVisible)}
        onCartPress={() => setIsCartVisible(true)}
        cartItemsCount={cartItems.length}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.featuredContainer}>
          <FlatList
            ref={featuredFlatListRef}
            data={featuredGames}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.gameID}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
          />
          <View style={styles.dotContainer}>
            {featuredGames.map((_, index) => (
              <View 
                key={index.toString()} 
                style={[
                  styles.dot,
                  { backgroundColor: index === currentFeaturedIndex ? '#0099ff' : '#ffffff50' }
                ]} 
              />
            ))}
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Pokémon</Text>
            <Text style={styles.sectionDescription}>Torne-se um mestre Pokémon!</Text>
          </View>
        </View>

        <View style={styles.gamesGrid}>
          {gamesSection1.map(renderGameItem)}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Mario</Text>
            <Text style={styles.sectionDescription}>Você está pronto para as Aventuras?</Text>
          </View>
        </View>

        <View style={styles.gamesGrid}>
          {gamesSection2.map(renderGameItem)}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
