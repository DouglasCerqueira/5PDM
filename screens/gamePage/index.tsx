import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, AppNavigatorProps } from '../../navegation/appNavigator';
import { WebView } from 'react-native-webview';
import api from '../../services/api';
import { Game } from '../types/game';
import { styles } from './styles';
import { Navbar } from '../../components/navbar';

type GamePageRouteProp = RouteProp<RootStackParamList, 'GamePage'>;

type MediaItem = {
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
};

const GamePage: React.FC<AppNavigatorProps> = ({ addToCart, removeFromCart, cartItems, setIsCartVisible }) => {
  const route = useRoute<GamePageRouteProp>();
  const navigation = useNavigation();
  const { gameId } = route.params;
  const [game, setGame] = useState<Game | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get<Game>(`/jogos/${gameId}`);
        const gameData = response.data;
        setGame(gameData);
        
        const media: MediaItem[] = [
          { type: 'video', url: gameData.trailerLink, thumbnail: gameData.poster },
          ...gameData.images.map(img => ({ type: 'image', url: img }))
        ];
        
        setMediaItems(media);
        setSelectedMedia(media[0]);
      } catch (err) {
        console.error('Erro ao buscar detalhes do jogo:', err);
      }
    };

    fetchGame();
  }, [gameId]);

  const renderMediaThumbnail = ({ item, index }: { item: MediaItem; index: number }) => (
    <TouchableOpacity 
      onPress={() => setSelectedMedia(item)}
      style={[
        styles.thumbnail,
        selectedMedia?.url === item.url && styles.selectedThumbnail
      ]}
    >
      {item.type === 'video' ? (
        <View style={styles.videoThumbnail}>
          <Text style={styles.playIcon}>▶️</Text>
          <Image 
            source={{ uri: item.thumbnail }} 
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <Image 
          source={{ uri: item.url }} 
          style={styles.thumbnailImage}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
);
  }

  return (
    <View style={styles.container}>
      <Navbar
        onSearchPress={() => setIsSearchVisible(!isSearchVisible)}
        onCartPress={() => setIsCartVisible(true)}
        cartItemsCount={cartItems.length}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{game.title}</Text>
          <View style={styles.platformInfo}>
            <Text style={styles.platformText}>NINTENDO ESHOP</Text>
            <Text style={styles.platformText}>NINTENDO SWITCH</Text>
          </View>
        </View>

        <View style={styles.mediaContainer}>
          {selectedMedia?.type === 'video' ? (
            <WebView
              source={{ uri: selectedMedia.url }}
              style={styles.video}
              allowsFullscreenVideo={true}
            />
          ) : (
            <Image
              source={{ uri: selectedMedia?.url }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          )}
        </View>

        <FlatList
          data={mediaItems}
          renderItem={renderMediaThumbnail}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailsContainer}
        />

        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {game.price}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.buyButton} onPress={() => addToCart(game)}>
              <Text style={styles.buyButtonText}>COMPRAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.gameDetails}>
          <Text style={styles.detailText}>Lançamento: {game.releaseDate}</Text>
          <Text style={styles.detailText}>Desenvolvedor: {game.developer}</Text>
          <Text style={styles.detailText}>Distribuidor: {game.distributor}</Text>
          <View style={styles.genresContainer}>
            {game.genres.map((genre, index) => (
              <Text key={index} style={styles.genreTag}>{genre}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CLASSIFICAÇÃO INDICATIVA</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingBadge}>L</Text>
            <Text style={styles.ratingText}>RECOMENDADO PARA TODOS OS PÚBLICOS</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GamePage;
