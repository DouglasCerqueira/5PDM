import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorProps, RootStackParamList } from '../../navegation/appNavigator';
import { styles } from './styles';
import { CartNavbar } from '../../components/cart-navbar';
import { Trash2, HelpCircle } from 'lucide-react-native';
import { useAuth } from '../../contexts/authContext';
import api from '../../services/api';
import { Game } from '../types/game';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartPage: React.FC<AppNavigatorProps> = ({ cartItems, removeFromCart, setIsCartVisible }) => {
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'creditInstallments' | 'pix'>('credit');
  const [couponCode, setCouponCode] = useState('');
  const [userGames, setUserGames] = useState<Game[]>([]);
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { isLoggedIn, username } = useAuth();

  useEffect(() => {
    const fetchUserGames = async () => {
      if (isLoggedIn && username) {
        try {
          const response = await api.get<string[]>(`/contas/${username}/idGames`);
          const gameIds = response.data;
          const gamesPromises = gameIds.map(id => api.get<Game>(`/jogos/${id}`));
          const gamesResponses = await Promise.all(gamesPromises);
          const games = gamesResponses.map(response => response.data).filter(game => game !== null);
          setUserGames(games);
        } catch (error) {
          console.error('Erro ao buscar jogos do usuário:', error);
        }
      }
    };

    fetchUserGames();
  }, [isLoggedIn, username]);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return sum + price;
  }, 0);

  const handleContinue = async () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    } else {
      try {
        const gameIds = [...userGames.map(game => game.gameID), ...cartItems.map(item => item.gameID)];
        const response = await api.patch(`/contas/${username}/idGames`, gameIds);
        
        if (response.status === 200) {
          Alert.alert('Sucesso', 'Compra finalizada com sucesso!', [
            { text: 'OK', onPress: () => {
              // Limpar o carrinho
              cartItems.forEach(item => removeFromCart(item.gameID));
              setIsCartVisible(false);
              navigation.navigate('Home');
            }}
          ]);
        } else {
          Alert.alert('Erro', 'Ocorreu um erro ao finalizar a compra. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao finalizar a compra:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao finalizar a compra. Por favor, tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <CartNavbar />
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.pageTitle}>Meu Carrinho</Text>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PRODUTO</Text>
            <TouchableOpacity onPress={() => cartItems.forEach(item => removeFromCart(item.gameID))}>
              <Text style={styles.clearCart}>Limpar Carrinho</Text>
            </TouchableOpacity>
          </View>

          {cartItems.map((item) => (
            <View key={item.gameID} style={styles.productCard}>
              <Image 
                source={{ uri: item.poster }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.storeInfo}>Nintendo eShop</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.gameID)}>
                  <Trash2 color="#ff4444" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.discountTitle}>Possui um cupom de desconto ou voucher?</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Cupom ou voucher"
              placeholderTextColor="#999"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>APLICAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FORMAS DE PAGAMENTO</Text>
          
          <TouchableOpacity 
            style={[styles.paymentOption, selectedPayment === 'credit' && styles.selectedPayment]}
            onPress={() => setSelectedPayment('credit')}
          >
            <View style={styles.radioButton}>
              <View style={selectedPayment === 'credit' ? styles.radioSelected : null} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>CARTÃO DE CRÉDITO - À VISTA</Text>
              <Text style={styles.paymentDescription}>Pague à vista com cartão de crédito</Text>
              <View style={styles.cardLogos}>
                <Image source={{ uri: 'https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png' }} style={styles.cardLogo} />
                <Image source={{ uri: 'https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-1.png' }} style={styles.cardLogo} />
              </View>
            </View>
            <TouchableOpacity>
              <HelpCircle color="#999" size={24} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, selectedPayment === 'creditInstallments' && styles.selectedPayment]}
            onPress={() => setSelectedPayment('creditInstallments')}
          >
            <View style={styles.radioButton}>
              <View style={selectedPayment === 'creditInstallments' ? styles.radioSelected : null} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>CARTÃO DE CRÉDITO - PARCELADO</Text>
              <Text style={styles.paymentDescription}>Parcele em até 6x sem juros ou de 7 a 12x com juros</Text>
              <View style={styles.cardLogos}>
                <Image source={{ uri: 'https://logodownload.org/wp-content/uploads/2016/10/visa-logo-1.png' }} style={styles.cardLogo} />
                <Image source={{ uri: 'https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-1.png' }} style={styles.cardLogo} />
              </View>
            </View>
            <TouchableOpacity>
              <HelpCircle color="#999" size={24} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, selectedPayment === 'pix' && styles.selectedPayment]}
            onPress={() => setSelectedPayment('pix')}
          >
            <View style={styles.radioButton}>
              <View style={selectedPayment === 'pix' ? styles.radioSelected : null} />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>PIX</Text>
              <View style={styles.cardLogos}>
                <Image 
                  source={{ uri: 'https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo.png' }} 
                  style={[styles.cardLogo, styles.pixLogo]} 
                />
              </View>
            </View>
            <TouchableOpacity>
              <HelpCircle color="#999" size={24} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>VALOR TOTAL</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartPage;

