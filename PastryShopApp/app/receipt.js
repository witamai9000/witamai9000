import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  Image, ScrollView, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => 'Rp ' + parseInt(price).toLocaleString('id-ID');

export default function ReceiptScreen() {
  const router = useRouter();
  const { orderId, total } = useLocalSearchParams();
  const { clearCart } = useCart();

  const [receiptImage, setReceiptImage] = useState(null);
  const [note, setNote] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Izin Diperlukan',
        'Aplikasi butuh akses galeri untuk memilih bukti transfer.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setReceiptImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Izin Diperlukan',
        'Aplikasi butuh akses kamera untuk mengambil foto.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setReceiptImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!receiptImage) {
      Alert.alert('Upload Bukti Transfer', 'Mohon pilih atau foto bukti transfer terlebih dahulu.');
      return;
    }

    setUploading(true);

    // Simulate upload delay (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUploading(false);
    clearCart();
    router.replace('/confirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Order Info */}
        <View style={styles.orderInfo}>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Order ID</Text>
            <Text style={styles.orderInfoValue}>{orderId}</Text>
          </View>
          <View style={styles.orderInfoRow}>
            <Text style={styles.orderInfoLabel}>Total Pembayaran</Text>
            <Text style={styles.orderInfoTotal}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bukti Transfer</Text>
          <Text style={styles.sectionSub}>Upload foto struk atau screenshot bukti pembayaran QRIS kamu.</Text>

          {receiptImage ? (
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: receiptImage.uri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
              <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
                <Ionicons name="pencil" size={14} color="#5C3317" />
                <Text style={styles.changePhotoText}>Ganti Foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadBtn} onPress={takePhoto}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="camera-outline" size={28} color="#5C3317" />
                </View>
                <Text style={styles.uploadBtnTitle}>Ambil Foto</Text>
                <Text style={styles.uploadBtnSub}>Foto struk langsung</Text>
              </TouchableOpacity>

              <View style={styles.uploadDivider} />

              <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                <View style={styles.uploadIcon}>
                  <Ionicons name="image-outline" size={28} color="#5C3317" />
                </View>
                <Text style={styles.uploadBtnTitle}>Pilih Galeri</Text>
                <Text style={styles.uploadBtnSub}>Screenshot / foto bukti</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Note Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catatan (Opsional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Contoh: Transfer via GoPay jam 14:30"
            placeholderTextColor="#C0A882"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Ionicons name="information-circle-outline" size={18} color="#A0784A" />
          <Text style={styles.tipsText}>
            Pastikan bukti transfer menunjukkan nominal, merchant, dan waktu transaksi dengan jelas.
          </Text>
        </View>

      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.submitBtn, (!receiptImage || uploading) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!receiptImage || uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Konfirmasi Pembayaran</Text>
            </>
          )}
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
    paddingBottom: 110,
  },
  orderInfo: {
    backgroundColor: '#5C3317',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderInfoLabel: {
    color: '#D4A97A',
    fontSize: 13,
  },
  orderInfoValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  orderInfoTotal: {
    color: '#FFD9A0',
    fontSize: 18,
    fontWeight: '900',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A0E',
    marginBottom: 6,
  },
  sectionSub: {
    fontSize: 13,
    color: '#7A6050',
    marginBottom: 16,
    lineHeight: 18,
  },
  uploadOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8D8C4',
    borderStyle: 'dashed',
    gap: 6,
  },
  uploadIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF5E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  uploadBtnTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C1A0E',
  },
  uploadBtnSub: {
    fontSize: 11,
    color: '#7A6050',
    textAlign: 'center',
  },
  uploadDivider: {
    width: 1,
    backgroundColor: '#F0E6D3',
  },
  previewContainer: {
    alignItems: 'center',
    gap: 12,
  },
  previewImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    backgroundColor: '#F0E6D3',
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#5C3317',
  },
  changePhotoText: {
    color: '#5C3317',
    fontWeight: '700',
    fontSize: 13,
  },
  noteInput: {
    backgroundColor: '#FFF5E6',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#2C1A0E',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#E8D8C4',
  },
  tipsCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#FFF0D4',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#A0784A',
    alignItems: 'flex-start',
  },
  tipsText: {
    flex: 1,
    fontSize: 13,
    color: '#7A6050',
    lineHeight: 18,
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
  submitBtn: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  submitBtnDisabled: {
    backgroundColor: '#B0C4B1',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
