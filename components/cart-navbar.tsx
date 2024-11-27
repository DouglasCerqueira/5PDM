import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navegation/appNavigator';
import { styles } from '../screens/home/styles';
import { User } from 'lucide-react-native';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const CartNavbar: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>GameHeaven</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
        <User color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

