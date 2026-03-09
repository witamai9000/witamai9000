import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF5E6' },
          headerTintColor: '#5C3317',
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          contentStyle: { backgroundColor: '#FFF5E6' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'La Belle Pastry', headerLargeTitle: true }} />
        <Stack.Screen name="cart" options={{ title: 'Keranjang Belanja', presentation: 'modal' }} />
        <Stack.Screen name="payment" options={{ title: 'Pembayaran QRIS', presentation: 'modal' }} />
        <Stack.Screen name="receipt" options={{ title: 'Kirim Bukti Bayar', presentation: 'modal' }} />
        <Stack.Screen name="confirmation" options={{ title: 'Pesanan Dikonfirmasi', presentation: 'modal' }} />
      </Stack>
    </CartProvider>
  );
}
