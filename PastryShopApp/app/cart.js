import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => 'Rp ' + price.toLocaleString('id-ID');

function CartItemRow({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <View style={styles.itemRow}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Ionicons name={item.quantity === 1 ? 'trash-outline' : 'remove'} size={16} color="#5C3317" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#5C3317" />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemSubtotal}>{formatPrice(item.price * item.quantity)}</Text>
    </View>
  );
}

export default function CartScreen() {
  const router = useRouter();
  const { items, total, itemCount, clearCart } = useCart();

  const handleClearCart = () => {
    Alert.alert(
      'Kosongkan Keranjang',
      'Yakin ingin menghapus semua item?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
          <Text style={styles.emptySubtitle}>Tambahkan pastry favorit kamu!</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => router.back()}>
            <Text style={styles.shopBtnText}>Mulai Belanja</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItemRow item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>{itemCount} item di keranjang</Text>
            <TouchableOpacity onPress={handleClearCart}>
              <Text style={styles.clearText}>Hapus Semua</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Order Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal ({itemCount} item)</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push('/payment')}
        >
          <Ionicons name="qr-code-outline" size={20} color="#FFF5E6" />
          <Text style={styles.checkoutBtnText}>Bayar dengan QRIS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C1A0E',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#7A6050',
    marginBottom: 28,
  },
  shopBtn: {
    backgroundColor: '#5C3317',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  shopBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listHeaderTitle: {
    fontSize: 14,
    color: '#7A6050',
    fontWeight: '600',
  },
  clearText: {
    fontSize: 14,
    color: '#CC3333',
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A0E',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    color: '#7A6050',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    borderRadius: 20,
    paddingHorizontal: 4,
    gap: 2,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A0E',
    minWidth: 24,
    textAlign: 'center',
  },
  itemSubtotal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#5C3317',
    minWidth: 90,
    textAlign: 'right',
  },
  separator: {
    height: 10,
  },
  summary: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7A6050',
  },
  summaryValue: {
    fontSize: 14,
    color: '#2C1A0E',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0E6D3',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2C1A0E',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#5C3317',
  },
  checkoutBtn: {
    backgroundColor: '#5C3317',
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
