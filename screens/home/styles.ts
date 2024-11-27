import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#1a1a1a',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    logo: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    navButtons: {
      flexDirection: 'row',
    },
    searchButton: {
      padding: 5,
      marginRight: 10,
    },
    searchIcon: {
      color: '#fff',
      fontSize: 18,
    },
    cartButton: {
      padding: 5,
    },
    cartText: {
      color: '#fff',
      fontSize: 18,
    },
    searchBar: {
      backgroundColor: '#2a2a2a',
      padding: 10,
    },
    searchInput: {
      backgroundColor: '#333',
      color: '#fff',
      padding: 10,
      borderRadius: 5,
    },
    scrollView: {
      flex: 1,
    },
    featuredContainer: {
      height: 400,
      position: 'relative',
    },
    featuredImage: {
      width: SCREEN_WIDTH,
      height: 350,
    },
    dotContainer: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 20,
    },
    sectionTitle: {
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sectionDescription: {
      color: '#999',
      fontSize: 14,
    },
    gamesGrid: {
      padding: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gameCard: {
      width: '48%',
      marginBottom: 20,
      backgroundColor: '#2a2a2a',
      borderRadius: 10,
      overflow: 'hidden',
    },
    gamePoster: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    gameInfo: {
      padding: 10,
    },
    gameTitle: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    buyButton: {
      backgroundColor: '#0099ff',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
    },
    buyButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    loginButton: {
      padding: 5,
    },
  });

