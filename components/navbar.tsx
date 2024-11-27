import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navegation/appNavigator';
import { styles } from '../screens/home/styles';
import { User } from 'lucide-react-native';
import { useAuth } from '../contexts/authContext';

interface NavbarProps {
  onSearchPress: () => void;
  onCartPress: () => void;
  cartItemsCount: number;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const Navbar: React.FC<NavbarProps> = ({ onSearchPress, onCartPress, cartItemsCount }) => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleSearch = () => {
    if (isSearchActive && searchQuery.trim()) {
      navigation.navigate('SearchResults', { searchQuery: searchQuery.trim() });
      setSearchQuery('');
      setIsSearchActive(false);
    } else {
      setIsSearchActive(true);
      onSearchPress();
    }
  };

  const handleUserIconPress = () => {
    if (isLoggedIn) {
      navigation.navigate('UserProfile');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>GameHeaven</Text>
      <View style={styles.navButtons}>
        {isSearchActive ? (
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar jogos..."
            placeholderTextColor="#999"
            autoFocus
            onSubmitEditing={handleSearch}
          />
        ) : (
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <Text style={styles.cartText}>🛒 {cartItemsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleUserIconPress}>
          <User color="#fff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

