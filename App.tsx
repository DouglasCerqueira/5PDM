import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navegation/appNavigator';
import { CartModal } from './components/cart-modal';
import { Game } from './screens/types/game';
import { AuthProvider } from './contexts/authContext';

const App = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState<Game[]>([]);

  const addToCart = (game: Game) => {
    setCartItems(prev => [...prev, game]);
  };

  const removeFromCart = (gameId: string) => {
    setCartItems(prev => prev.filter(item => item.gameID !== gameId));
  };

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator 
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
          <CartModal
            isVisible={isCartVisible}
            onClose={() => setIsCartVisible(false)}
            cartItems={cartItems}
            removeFromCart={removeFromCart}
          />
          <StatusBar style="light" />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;

