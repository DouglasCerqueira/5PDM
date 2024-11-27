import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  platformInfo: {
    flexDirection: 'row',
    gap: 10,
  },
  platformText: {
    color: '#999999',
    fontSize: 12,
    backgroundColor: '#2a2a2a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
  mediaContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  video: {
    flex: 1,
  },
  thumbnailsContainer: {
    padding: 10,
  },
  thumbnail: {
    width: 120,
    height: 70,
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: '#0099ff',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  videoThumbnail: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    fontSize: 24,
    zIndex: 1,
  },
  priceContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#e63946',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 20,
  },
  gameDetails: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  detailText: {
    color: '#999999',
    fontSize: 14,
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  genreTag: {
    color: '#ffffff',
    fontSize: 14,
    backgroundColor: '#2a2a2a',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingBadge: {
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 4,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
