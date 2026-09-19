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
```

## 🚀 Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- App **Expo Go** no celular (ou um emulador Android/iOS)
- A API (Spring Boot + MongoDB) em execução e acessível na mesma rede do dispositivo

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/5PDM.git
cd 5PDM

# 2. Instale as dependências
npm install

# 3. Configure o endereço da API (veja abaixo)

# 4. Inicie o projeto
npx expo start
```

Escaneie o QR Code com o Expo Go, ou pressione `a` (Android) / `i` (iOS) no terminal para abrir no emulador.

### Configurando a URL da API

Em `services/api.ts`, altere o `baseURL` para o IP da máquina onde a API está rodando:

```ts
const api = axios.create({
  baseURL: 'http://SEU_IP_LOCAL:8080/api/v1/',
});
```

> 💡 Celular e computador precisam estar na **mesma rede**. Use o IP da sua máquina na rede local (por exemplo, `192.168.x.x`); `localhost` não funciona no dispositivo físico.


<!-- Adicione seus links, por exemplo:
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/SEU-PERFIL)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/SEU-USUARIO)
-->
