import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Trash2 } from 'lucide-react-native';
import { Game } from '../screens/types/game';
import { RootStackParamList } from '../navegation/appNavigator';

interface CartModalProps {
  isVisible: boolean;
  onClose: () => void;
  cartItems: Game[];
  removeFromCart: (gameId: string) => void;
}

type CartNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

export const CartModal: React.FC<CartModalProps> = ({ 
  isVisible, 
  onClose, 
  cartItems, 
  removeFromCart 
}) => {
  const navigation = useNavigation<CartNavigationProp>();
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigation.navigate('Cart');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
      }}>
        <View style={{
          backgroundColor: '#1a1a1a',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          maxHeight: '80%',
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Carrinho</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ color: '#fff', fontSize: 20 }}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ maxHeight: '70%' }}>
            {cartItems.map((item) => (
              <View 
                key={item.gameID}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#2a2a2a',
                  borderRadius: 10,
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>{item.title}</Text>
                  <Text style={{ color: '#fff', fontSize: 14 }}>{item.price}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => removeFromCart(item.gameID)}
                  style={{ padding: 10 }}
                >
                  <Trash2 color="#ff4444" size={24} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={{ 
            borderTopWidth: 1, 
            borderTopColor: '#333', 
            paddingTop: 20,
            marginTop: 20,
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>Total:</Text>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#0099ff',
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={handleCheckout}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                FINALIZAR COMPRA
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
