import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SHOP_INFO } from '../data/products';

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={56} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Pesanan Dikonfirmasi!</Text>
        <Text style={styles.subtitle}>
          Terima kasih! Bukti transfer kamu sudah kami terima. Pesanan sedang diproses oleh {SHOP_INFO.name}.
        </Text>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#5C3317" />
            <Text style={styles.infoText}>Estimasi siap: 15–30 menit</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#5C3317" />
            <Text style={styles.infoText}>{SHOP_INFO.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#5C3317" />
            <Text style={styles.infoText}>{SHOP_INFO.phone}</Text>
          </View>
        </View>

        <Text style={styles.thankYou}>Selamat menikmati pastry-mu! 🥐</Text>
      </View>

      {/* Back to Home */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="home-outline" size={20} color="#FFFFFF" />
          <Text style={styles.homeBtnText}>Kembali ke Beranda</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    paddingBottom: 100,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#2C1A0E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7A6050',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    gap: 12,
    shadowColor: '#5C3317',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#2C1A0E',
    lineHeight: 20,
  },
  thankYou: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A0784A',
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
  homeBtn: {
    backgroundColor: '#5C3317',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
