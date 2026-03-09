import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  TextInput, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, SHOP_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['Semua', ...new Set(PRODUCTS.map(p => p.category))];

export default function HomeScreen() {
  const router = useRouter();
  const { itemCount, total } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const formatPrice = (price) => 'Rp ' + price.toLocaleString('id-ID');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroEmoji}>🥐</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>{SHOP_INFO.name}</Text>
          <Text style={styles.heroSubtitle}>{SHOP_INFO.tagline}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#A0784A" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari pastry..."
          placeholderTextColor="#C0A882"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#A0784A" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryChip, selectedCategory === item && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.categoryChipText, selectedCategory === item && styles.categoryChipTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Products */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
          </View>
        }
      />

      {/* Cart FAB */}
      {itemCount > 0 && (
        <TouchableOpacity style={styles.cartBar} onPress={() => router.push('/cart')}>
          <View style={styles.cartBarLeft}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{itemCount}</Text>
            </View>
            <Text style={styles.cartBarLabel}>Lihat Keranjang</Text>
          </View>
          <Text style={styles.cartBarTotal}>{formatPrice(total)}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5C3317',
    padding: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  heroEmoji: {
    fontSize: 32,
  },
  heroTitle: {
    color: '#FFF5E6',
    fontSize: 18,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#D4A97A',
    fontSize: 12,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#5C3317',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2C1A0E',
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8D8C4',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#5C3317',
    borderColor: '#5C3317',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#7A6050',
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  productList: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#A0784A',
  },
  cartBar: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#5C3317',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  cartBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartBadge: {
    backgroundColor: '#FFF5E6',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#5C3317',
    fontWeight: '800',
    fontSize: 13,
  },
  cartBarLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  cartBarTotal: {
    color: '#FFD9A0',
    fontWeight: '800',
    fontSize: 15,
  },
});
