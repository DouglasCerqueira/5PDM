import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navegation/appNavigator';
import { styles } from '../screens/home/styles';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface ProfileNavbarProps {
  cartItemsCount: number;
  setIsCartVisible: (isVisible: boolean) => void;
}

export const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ cartItemsCount, setIsCartVisible }) => {
  const navigation = useNavigation<NavigationProp>();


  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>GameHeaven</Text>
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.cartButton} onPress={() => setIsCartVisible(true)}>
          <Text style={styles.cartText}>🛒 {cartItemsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

