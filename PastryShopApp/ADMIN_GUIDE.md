# Admin Guide – La Belle Pastry App

## Mengatur Ketersediaan Produk

Untuk menandai produk sebagai **tidak tersedia** (habis/sold out), buka file:

```
data/products.js
```

Cari produk yang ingin dinonaktifkan, lalu ubah `available: true` menjadi `available: false`:

```js
{
  id: '4',
  name: 'Éclair Chocolat',
  ...
  available: false,   // <-- ubah ini
},
```

Produk yang `available: false` akan tetap tampil di aplikasi dengan label **"Habis"** dan tombol **"Tidak Tersedia"** (pelanggan tidak bisa menambahkan ke keranjang).

## Mengatur QRIS

Ganti nilai `SHOP_QRIS` di file `data/products.js` dengan string QRIS resmi dari penyedia pembayaran (QRIS dari bank/dompet digital):

```js
export const SHOP_QRIS = 'YOUR_ACTUAL_QRIS_STRING_HERE';
```

> String QRIS bisa didapat dari aplikasi merchant GoPay, OVO, DANA, BCA, BNI, dll.

## Informasi Toko

Edit objek `SHOP_INFO` di `data/products.js` untuk mengubah nama, alamat, dan jam operasional toko:

```js
export const SHOP_INFO = {
  name: 'Nama Toko Kamu',
  tagline: 'Slogan Toko',
  address: 'Alamat Toko',
  phone: '+62 xxx-xxxx-xxxx',
  hours: 'Senin-Jumat 08:00-19:00',
};
```
