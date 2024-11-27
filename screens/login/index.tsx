import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navegation/appNavigator';
import { styles } from './styles';
import api from '../../services/api';
import { AxiosError } from 'axios';
import { useAuth } from '../../contexts/authContext';
import { ArrowLeft } from 'lucide-react-native';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await api.post('/contas/login', { username, password });
      
      if (response.status === 200) {
        login(username);
        Alert.alert('Sucesso', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status === 401) {
          Alert.alert('Erro', 'Usuário ou senha incorretos');
        } else {
          console.error('Erro na requisição:', error);
          Alert.alert('Erro', 'Ocorreu um erro na conexão. Tente novamente mais tarde.');
        }
      } else {
        console.error('Erro desconhecido:', error);
        Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

