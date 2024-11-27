import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import GamePage from '../screens/gamePage';
import CartPage from '../screens/cart';
import SearchResults from '../screens/search-results';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import UserProfileScreen from '../screens/userProfile';
import { Game } from '../screens/types/game';

export type RootStackParamList = {
  Home: undefined;
  GamePage: { gameId: string };
  Cart: undefined;
  SearchResults: { searchQuery: string };
  Login: undefined;
  Register: undefined;
  UserProfile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type AppNavigatorProps = {
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  cartItems: Game[];
  setIsCartVisible: (isVisible: boolean) => void;
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ addToCart, removeFromCart, cartItems, setIsCartVisible }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <Home 
            {...props} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="GamePage" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <GamePage 
            {...props} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="Cart" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <CartPage 
            {...props} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="SearchResults" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <SearchResults 
            {...props} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="UserProfile" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <UserProfileScreen 
            {...props} 
            cartItems={cartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;

