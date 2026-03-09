import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useCart } from '../context/CartContext';

const formatPrice = (price) =>
  'Rp ' + price.toLocaleString('id-ID');

export default function ProductCard({ product }) {
  const { addItem, items } = useCart();
  const cartItem = items.find(i => i.id === product.id);
  const inCart = cartItem ? cartItem.quantity : 0;

  return (
    <View style={[styles.card, !product.available && styles.cardUnavailable]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      {!product.available && (
        <View style={styles.unavailableBadge}>
          <Text style={styles.unavailableText}>Habis</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.available ? (
            <TouchableOpacity
              style={[styles.addBtn, inCart > 0 && styles.addBtnActive]}
              onPress={() => addItem(product)}
            >
              <Text style={styles.addBtnText}>{inCart > 0 ? `+ ${inCart}` : '+ Tambah'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.soldOutBtn}>
              <Text style={styles.soldOutText}>Tidak Tersedia</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#5C3317',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardUnavailable: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0E6D3',
  },
  unavailableBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#CC3333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unavailableText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    padding: 14,
  },
  category: {
    fontSize: 11,
    color: '#A0784A',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A0E',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#7A6050',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: '#5C3317',
  },
  addBtn: {
    backgroundColor: '#5C3317',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnActive: {
    backgroundColor: '#A0522D',
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  soldOutBtn: {
    backgroundColor: '#E8DDD4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  soldOutText: {
    color: '#9E8070',
    fontSize: 12,
    fontWeight: '600',
  },
});
