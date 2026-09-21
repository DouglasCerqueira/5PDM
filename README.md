# 🎮 GameHeaven

Aplicativo mobile que simula uma **loja de jogos digitais**: o usuário navega pelo catálogo, assiste a trailers, monta um carrinho, finaliza a compra e acessa a chave de cada jogo adquirido na sua biblioteca.

Desenvolvido com **React Native + Expo + TypeScript**, consumindo uma **API própria em Java (Spring Boot) com MongoDB** para armazenar jogos e contas de usuário.

![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-52-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Spring Boot](https://img.shields.io/badge/API-Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

## ✨ Funcionalidades

- **Home** com carrossel de destaques (troca automática a cada 5 segundos) e vitrines por franquia
- **Busca** por título, ignorando acentos e diferença entre maiúsculas e minúsculas
- **Página do jogo** com trailer em vídeo, galeria de imagens, preço e detalhes
- **Carrinho** acessível por modal em qualquer tela e também em tela cheia, com cálculo do total
- **Cadastro e login** de usuários, com sessão mantida entre aberturas do app (AsyncStorage)
- **Finalização de compra** protegida por login: os jogos comprados são vinculados à conta
- **Perfil / biblioteca** com os jogos adquiridos e acesso à chave de cada um

## 🛠️ Tecnologias

| Camada | Stack |
|---|---|
| App mobile | React Native 0.76, Expo SDK 52, TypeScript |
| Navegação | React Navigation (Stack) |
| Estado | React Context API (autenticação) e estado elevado no `App.tsx` (carrinho) |
| Requisições | Axios |
| Persistência local | AsyncStorage |
| Mídia e UI | react-native-webview (trailers), lucide-react-native (ícones) |
| Back-end | Java + Spring Boot, MongoDB |

## 📂 Estrutura do projeto

```
├── App.tsx                # Raiz: providers, estado do carrinho e modal
├── index.ts               # Entrada do Expo
├── components/            # Navbar, modal do carrinho e barras de navegação
├── contexts/
│   └── authContext.tsx    # Contexto de autenticação (login/logout + AsyncStorage)
├── navegation/
│   └── appNavigator.tsx   # Rotas e tipagem do stack navigator
├── screens/
│   ├── home/              # Destaques e vitrines
│   ├── gamePage/          # Detalhes, trailer e galeria
│   ├── search-results/    # Resultados da busca
│   ├── cart/              # Carrinho e checkout
│   ├── login/             # Login
│   ├── register/          # Cadastro
│   ├── userProfile/       # Biblioteca do usuário
│   └── types/game.ts      # Tipagem do modelo Game
├── services/
│   └── api.ts             # Instância do Axios (URL base da API)
└── assets/                # Ícones e splash screen
```

## 🔌 Endpoints consumidos

O app espera uma API REST com prefixo `/api/v1/`:

| Método | Rota | Uso |
|---|---|---|
| `GET` | `/jogos` | Lista o catálogo (usada na busca) |
| `GET` | `/jogos/{id}` | Detalhes de um jogo |
| `POST` | `/contas` | Cadastro de conta |
| `POST` | `/contas/login` | Login |
| `GET` | `/contas/{username}/idGames` | Jogos adquiridos pelo usuário |
| `PATCH` | `/contas/{username}/idGames` | Registra a compra (lista de IDs) |

Modelo de um jogo (`screens/types/game.ts`):

```ts
interface Game {
  gameID: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  price: string;
  developer: string;
  distributor: string;
  genres: string[];
  poster: string;
  images: string[];
  keys: string[];
}
