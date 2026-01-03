require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'phone_store'
});

const products = [
  {
    name: 'iPhone 16 Pro Max',
    description: 'IPHONE 16 Pro Max 0 SCRATCH WITH HIGH Specification: BATTERY HEALTH 90%, CYCLE COUNT: 200, DISPLAY Super Retina XDR display, 6.9‑inch (diagonal) all‑screen OLED display, Dynamic Island, Always-On display, ProMotion technology with adaptive refresh rates up to 120Hz, HDR display, True Tone, FACE ID',
    price: 1299,
    image: 'images/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg',
    infoUrl: 'https://www.apple.com/iphone-16-pro/'
  },
  {
    name: 'S24 Plus',
    description: 'S24 Plus 0 SCRATCH WITH HIGH Specification: Battery 5000mah, Fingerprint, 6.7" Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, Corning Gorilla Glass Victus 2, Android 14, One UI 6.1, 12GB + 256GB, Triple Camera 50MP + 10MP + 12MP, Selfie Camera, FACE ID',
    price: 999,
    image: 'images/Samsung-Galaxy-S24-and-S24-Plus-Cobalt-Violet.jpg',
    infoUrl: 'https://www.gsmarena.com/samsung_galaxy_s24+-12772.php'
  },
  {
    name: 'Z Fold 6',
    description: 'Z FOLD 6 0 SCRATCH WITH HIGH Specification: Announced Jul 2024, Samsung Galaxy Z Fold 6 Android smartphone, Features 7.6″ display, Snapdragon 8 Gen 3 chipset, 4400 mAh battery, 1024 GB storage, DISPLAY Super Retina XDR display, Android 14, One UI 6.1',
    price: 1799,
    image: 'images/Samsung-Galaxy-Z-Fold-6-a.jpg',
    infoUrl: 'https://www.samsung.com/us/smartphones/galaxy-z-fold6/'
  },
  {
    name: 'iPhone 15 Pro',
    description: 'IPHONE 15 Pro 0 SCRATCH WITH HIGH Specification: Battery health 92%, CYCLE COUNT: 300, DISPLAY Super Retina XDR display, Super Retina XDR display, 6.7‑inch (diagonal) all‑screen OLED display, Always on display, Dynamic Island, Emergency SOS via satellite Crash, Face ID',
    price: 1199,
    image: 'images/iPhone-15-Pro-Max-6.jpg',
    infoUrl: 'https://www.apple.com/am/iphone-15-pro/'
  },
  {
    name: 'iPhone 16',
    description: 'IPHONE 16 0 SCRATCH WITH HIGH Specification: BATTERY HEALTH 90%, CYCLE COUNT: 250, DISPLAY Super Retina XDR display, Main camera: 48 MP (Sensor-shift OIS, PDAF), FACE ID',
    price: 899,
    image: 'images/Apple-iPhone-16-hero-geo-240909_inline.jpg.large.jpg',
    infoUrl: 'https://www.apple.com/iphone-16/'
  },
  {
    name: 'iPhone 17 Pro Max',
    description: 'IPHONE 17 Pro Max 0 SCRATCH WITH HIGH Specification: BATTERY HEALTH 100%, CYCLE COUNT: 20, DISPLAY Super Retina XDR display, 7.0‑inch (diagonal) all‑screen OLED display, Dynamic Island, Always-On display, ProMotion technology with adaptive refresh rates up to 120Hz, HDR display, True Tone, FACE ID, A18 Pro chipset, Titanium design',
    price: 1399,
    image: 'images/Iphone17 ProMax.webp',
    infoUrl: 'https://www.apple.com/iphone-17-pro/'
  },
  {
    name: 'iPhone 17 Air',
    description: 'IPHONE 17 Air 0 SCRATCH WITH HIGH Specification: BATTERY HEALTH 100%, CYCLE COUNT: 10, DISPLAY Super Retina XDR display, 6.7‑inch (diagonal) all‑screen OLED display, Dynamic Island, Always-On display, ProMotion technology with adaptive refresh rates up to 120Hz, HDR display, True Tone, FACE ID, A18 chipset, Lightweight design',
    price: 999,
    image: 'images/Iphone17 Air.jpg',
    infoUrl: 'https://www.apple.com/iphone-17/'
  },
  {
    name: 'Galaxy S25 Ultra',
    description: 'Galaxy S25 Ultra 0 SCRATCH WITH HIGH Specification: 7.0" Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, Snapdragon 8 Gen 5 chipset, Main camera: 200MP quad array with AI zoom, Battery 5500mAh with 65W charging, S Pen support, Ultra-wideband connectivity',
    price: 1499,
    image: 'images/S25 Ultra.webp',
    infoUrl: 'https://www.samsung.com/global/galaxy/s25-ultra/'
  },
  {
    name: 'Apple Watch Series 11',
    description: 'Apple Watch Series 11 0 SCRATCH WITH HIGH Specification: BATTERY HEALTH 100%, Always-On Retina display, 45mm or 41mm case sizes, Water resistant 50 meters, GPS + Cellular, Blood Oxygen app, ECG app, Fall detection, S9 SiP chip, watchOS 11',
    price: 499,
    image: 'images/Apple Watch Series11.jpg',
    infoUrl: 'https://www.apple.com/apple-watch-series-11/'
  },
  {
    name: 'Z Flip Foldable Mobile',
    description: 'Samsung Galaxy Z Flip - Premium foldable smartphone',
    price: 120,
    image: 'images/gg-1.jpg',
    infoUrl: ''
  },
  {
    name: 'Air Pods Pro',
    description: 'Apple AirPods Pro with Active Noise Cancellation',
    price: 60,
    image: 'images/hh-2.jpg',
    infoUrl: ''
  },
  {
    name: '250D DSLR Camera',
    description: 'Canon EOS 250D DSLR Camera - Perfect for photography enthusiasts',
    price: 230,
    image: 'images/ee-3.jpg',
    infoUrl: ''
  },
  {
    name: 'Head Phones',
    description: 'Premium Wireless Headphones with Noise Cancellation',
    price: 100,
    image: 'images/aa-1.jpg',
    infoUrl: ''
  },
  {
    name: 'Premium Phone',
    description: 'Latest Premium Smartphone with Advanced Features',
    price: 799,
    image: 'images/phone_img.jpg',
    infoUrl: ''
  }
];

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }

  console.log('Connected to database');
  console.log('Populating products...\n');

  async function populate() {
    try {
      // Clear existing products
      await db.promise().query('DELETE FROM products');
      console.log('Cleared existing products\n');

      // Insert products one by one
      let inserted = 0;
      for (const product of products) {
        try {
          const query = 'INSERT INTO products (name, description, price, image, infoUrl) VALUES (?, ?, ?, ?, ?)';
          await db.promise().query(query, [
            product.name,
            product.description,
            product.price,
            product.image,
            product.infoUrl || ''
          ]);
          inserted++;
          console.log(`✓ Inserted: ${product.name}`);
        } catch (err) {
          console.error(`✗ Error inserting ${product.name}:`, err.message);
        }
      }

      console.log(`\n✓ Successfully inserted ${inserted} out of ${products.length} products`);
      db.end();
      process.exit(0);
    } catch (err) {
      console.error('Error:', err);
      db.end();
      process.exit(1);
    }
  }

  populate();
});

