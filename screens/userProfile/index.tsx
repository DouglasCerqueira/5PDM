import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navegation/appNavigator';
import { styles } from './styles';
import { useAuth } from '../../contexts/authContext';
import { ProfileNavbar } from '../../components/profile-navbar';
import api from '../../services/api';
import { Game } from '../types/game';

type UserProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserProfile'>;

interface UserProfileScreenProps {
  cartItems: Game[];
  setIsCartVisible: (isVisible: boolean) => void;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ cartItems, setIsCartVisible }) => {
  const navigation = useNavigation<UserProfileScreenNavigationProp>();
  const { username, logout, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('games');
  const [userGames, setUserGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchUserGames = async () => {
      if (isLoggedIn && username) {
        try {
          const userGamesResponse = await api.get<string[]>(`/contas/${username}/idGames`);
          const gameIds = userGamesResponse.data;

          const gamesPromises = gameIds.map(id => api.get<Game>(`/jogos/${id}`));
          const gamesResponses = await Promise.all(gamesPromises);
          const games = gamesResponses.map(response => response.data).filter(game => game !== null);
          
          setUserGames(games);
        } catch (error) {
          console.error('Erro ao buscar jogos do usuário:', error);
          Alert.alert('Erro', 'Não foi possível carregar seus jogos. Por favor, tente novamente mais tarde.');
        }
      }
    };

    fetchUserGames();
  }, [isLoggedIn, username]);

  const handleGamePress = async (gameId: string) => {
    try {
      const response = await api.get<Game>(`/jogos/${gameId}`);
      const game = response.data;
      
      if (game && game.keys && game.keys.length > 0) {
        Alert.alert(
          'Chave do Jogo',
          `A chave para ${game.title} é:\n${game.keys[0]}`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Erro', 'Nenhuma chave disponível para este jogo.');
      }
    } catch (error) {
      console.error('Erro ao buscar chave do jogo:', error);
      Alert.alert('Erro', 'Não foi possível recuperar a chave do jogo.');
    }
  };

  return (
    <View style={styles.container}>
      <ProfileNavbar cartItemsCount={cartItems.length} setIsCartVisible={setIsCartVisible} />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'games' && styles.activeTab]}
          onPress={() => setActiveTab('games')}
        >
          <Text style={[styles.tabText, activeTab === 'games' && styles.activeTabText]}>
            Meus Jogos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'games' && (
          <View style={styles.gamesGrid}>
            {userGames.map((game) => (
              <TouchableOpacity
                key={game.gameID}
                style={styles.gameCard}
                onPress={() => handleGamePress(game.gameID)}
              >
                <Image 
                  source={{ uri: game.poster }} 
                  style={styles.gameImage}
                  resizeMode="cover"
                />
                <Text style={styles.gameTitle}>{game.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={async () => {
          await logout();
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;

