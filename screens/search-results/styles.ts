import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  resultsCount: {
    color: '#999',
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 5,
  },
  filtersApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  clearFiltersButton: {
    marginRight: 15,
  },
  clearFiltersText: {
    color: '#ff69b4',
    fontSize: 14,
  },
  platformFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  platformFilterText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 5,
  },
  platformFilterIcon: {
    color: '#ffffff',
    fontSize: 12,
  },
  gamesGrid: {
    flex: 1,
  },
  gridContainer: {
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
  gameImage: {
    width: '100%',
    height: 150,
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
  priceButton: {
    backgroundColor: '#0099ff',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  priceText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

