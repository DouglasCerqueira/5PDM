import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    padding: 20,
  },
  section: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clearCart: {
    color: '#ff4444',
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  storeInfo: {
    fontSize: 14,
    color: '#999',
  },
  activationKey: {
    fontSize: 14,
    color: '#0099ff',
    textDecorationLine: 'underline',
  },
  platformLogo: {
    width: 60,
    height: 20,
    marginTop: 5,
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  discountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  couponContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    color: '#000000',
  },
  applyButton: {
    backgroundColor: '#2d3748',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  applyButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  selectedPayment: {
    borderColor: '#0099ff',
    borderWidth: 2,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0099ff',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#0099ff',
    marginBottom: 10,
  },
  cardLogos: {
    flexDirection: 'row',
    gap: 10,
  },
  cardLogo: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  pixLogo: {
    width: 60,
    height: 25,
  },
  totalSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  continueButton: {
    backgroundColor: '#dc2626',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

