import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useCart } from '../context/CartContext';
import { SHOP_QRIS, SHOP_INFO } from '../data/products';

const formatPrice = (price) => 'Rp ' + price.toLocaleString('id-ID');

export default function PaymentScreen() {
  const router = useRouter();
  const { items, total } = useCart();
  const [copied, setCopied] = useState(false);

  // Generate order ID
  const orderId = 'ORD-' + Date.now().toString().slice(-8);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Pembayaran ${SHOP_INFO.name}\nTotal: ${formatPrice(total)}\nOrder ID: ${orderId}`,
      });
    } catch (_) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* QR Section */}
        <View style={styles.qrCard}>
          <View style={styles.qrHeader}>
            <Text style={styles.qrHeaderTitle}>Scan QRIS untuk Membayar</Text>
            <Text style={styles.qrHeaderSub}>Gunakan aplikasi dompet digital atau mobile banking</Text>
          </View>

          <View style={styles.qrWrapper}>
            <QRCode
              value={SHOP_QRIS}
              size={220}
              color="#1A0A00"
              backgroundColor="#FFFFFF"
            />
          </View>

          <View style={styles.qrFooter}>
            <Text style={styles.merchantLabel}>Merchant</Text>
            <Text style={styles.merchantName}>{SHOP_INFO.name}</Text>
          </View>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalAmount}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Order Detail */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Detail Pesanan</Text>
          <View style={styles.orderMeta}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Order ID</Text>
              <Text style={styles.metaValue}>{orderId}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Waktu</Text>
              <Text style={styles.metaValue}>{timeStr} · {dateStr}</Text>
            </View>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemQty}>{item.quantity}x</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalRowLabel}>Total</Text>
            <Text style={styles.totalRowValue}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Cara Pembayaran QRIS</Text>
          {[
            { step: '1', text: 'Buka aplikasi dompet digital (GoPay, OVO, DANA, dll.) atau mobile banking.' },
            { step: '2', text: 'Pilih menu "Bayar" atau "Scan QR".' },
            { step: '3', text: 'Scan kode QRIS di atas.' },
            { step: '4', text: `Masukkan nominal Rp ${total.toLocaleString('id-ID')}.` },
            { step: '5', text: 'Konfirmasi pembayaran dan simpan bukti transfer.' },
            { step: '6', text: 'Kirim bukti transfer melalui tombol di bawah.' },
          ].map((s) => (
            <View key={s.step} style={styles.stepRow}>
              <View style={styles.stepBubble}>
                <Text style={styles.stepNumber}>{s.step}</Text>
              </View>
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          ))}
        </View>

        {/* Share button */}
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Ionicons name="share-outline" size={18} color="#5C3317" />
          <Text style={styles.shareBtnText}>Bagikan Detail Pesanan</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomNote}>Sudah transfer? Kirim bukti bayarmu.</Text>
        <TouchableOpacity
          style={styles.receiptBtn}
          onPress={() => router.push({ pathname: '/receipt', params: { orderId, total: total.toString() } })}
        >
          <Ionicons name="receipt-outline" size={20} color="#FFFFFF" />
          <Text style={styles.receiptBtnText}>Kirim Bukti Transfer</Text>
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
  scroll: {
    padding: 16,
    paddingBottom: 130,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#5C3317',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  qrHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C1A0E',
    marginBottom: 4,
  },
  qrHeaderSub: {
    fontSize: 12,
    color: '#7A6050',
    textAlign: 'center',
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F0E6D3',
    marginBottom: 16,
  },
  qrFooter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  merchantLabel: {
    fontSize: 11,
    color: '#A0784A',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A0E',
    marginTop: 2,
  },
  totalBox: {
    backgroundColor: '#5C3317',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  totalLabel: {
    color: '#D4A97A',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A0E',
    marginBottom: 14,
  },
  orderMeta: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#FFF5E6',
    borderRadius: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 13,
    color: '#7A6050',
  },
  metaValue: {
    fontSize: 13,
    color: '#2C1A0E',
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  itemQty: {
    fontSize: 14,
    color: '#A0784A',
    fontWeight: '700',
    width: 30,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#2C1A0E',
  },
  itemPrice: {
    fontSize: 14,
    color: '#5C3317',
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0E6D3',
  },
  totalRowLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A0E',
  },
  totalRowValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#5C3317',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#5C3317',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#5A4030',
    lineHeight: 20,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#5C3317',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  shareBtnText: {
    color: '#5C3317',
    fontWeight: '700',
    fontSize: 15,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomNote: {
    fontSize: 13,
    color: '#7A6050',
    textAlign: 'center',
    marginBottom: 12,
  },
  receiptBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  receiptBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
