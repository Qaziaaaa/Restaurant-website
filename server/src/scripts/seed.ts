import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Category from '../models/Category';
import MenuItem from '../models/MenuItem';
import User from '../models/User';
import { UserRole } from '../constants';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sampleCategories = [
  { name: 'Gourmet Pizzas', description: 'Artisanal wood-fired pizzas' },
  { name: 'Signature Pastas', description: 'Handmade pasta with fresh sauces' },
  { name: 'Luxury Desserts', description: 'Sweet endings for your palate' },
  { name: 'Asian Fusion', description: 'Bold flavors from the East' },
  { name: 'Healthy Bowls', description: 'Nutritious and delicious power bowls' },
];

const sampleItems = [
  // Gourmet Pizzas
  {
    name: 'Truffle Mushroom Pizza',
    description: 'Wild mushrooms, mozzarella, and premium black truffle oil on a crispy sourdough base.',
    basePrice: 24.99,
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: true,
    preparationTime: 20,
    ratings: { average: 4.9, count: 128 },
    categoryIndex: 0,
  },
  {
    name: 'Margherita Classica',
    description: 'San Marzano tomatoes, fresh buffalo mozzarella, and basil on a traditional Neapolitan crust.',
    basePrice: 18.50,
    images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 15,
    ratings: { average: 4.7, count: 245 },
    categoryIndex: 0,
  },
  {
    name: 'Prosciutto & Arugula',
    description: 'Aged prosciutto di Parma, wild arugula, shaved parmesan, and a drizzle of balsamic glaze.',
    basePrice: 22.00,
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 18,
    ratings: { average: 4.8, count: 89 },
    categoryIndex: 0,
  },
  // Signature Pastas
  {
    name: 'Lobster Ravioli',
    description: 'Fresh lobster meat encased in delicate pasta, served in a creamy saffron and garlic butter sauce.',
    basePrice: 32.50,
    images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: true,
    preparationTime: 25,
    ratings: { average: 4.9, count: 156 },
    categoryIndex: 1,
  },
  {
    name: 'Carbonara Royale',
    description: 'Traditional Roman carbonara with guanciale, pecorino romano, and free-range egg yolks.',
    basePrice: 21.00,
    images: ['https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 15,
    ratings: { average: 4.6, count: 198 },
    categoryIndex: 1,
  },
  {
    name: 'Squid Ink Linguine',
    description: 'Black linguine with pan-seared calamari, cherry tomatoes, white wine, and fresh herbs.',
    basePrice: 26.00,
    images: ['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 20,
    ratings: { average: 4.5, count: 67 },
    categoryIndex: 1,
  },
  // Luxury Desserts
  {
    name: 'Gold Leaf Tiramisu',
    description: 'Traditional Italian tiramisu topped with 24k edible gold flakes and cocoa dust.',
    basePrice: 18.00,
    images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: true,
    preparationTime: 10,
    ratings: { average: 4.8, count: 312 },
    categoryIndex: 2,
  },
  {
    name: 'Matcha Lava Cake',
    description: 'Warm chocolate cake with a molten matcha center, served with vanilla bean gelato.',
    basePrice: 14.50,
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 12,
    ratings: { average: 4.7, count: 145 },
    categoryIndex: 2,
  },
  // Asian Fusion
  {
    name: 'Szechuan Fire Noodles',
    description: 'Hand-pulled noodles tossed in Szechuan pepper oil with bok choy and crispy tofu.',
    basePrice: 19.50,
    images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: true,
    preparationTime: 15,
    ratings: { average: 4.6, count: 203 },
    categoryIndex: 3,
  },
  {
    name: 'Wagyu Beef Gyoza',
    description: 'Pan-fried dumplings filled with premium wagyu beef, served with ponzu dipping sauce.',
    basePrice: 16.00,
    images: ['https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 12,
    ratings: { average: 4.5, count: 178 },
    categoryIndex: 3,
  },
  // Healthy Bowls
  {
    name: 'Glazed Salmon Poke Bowl',
    description: 'Fresh Atlantic salmon, avocado, edamame, pickled ginger, and sesame-soy dressing.',
    basePrice: 22.00,
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 10,
    ratings: { average: 4.8, count: 267 },
    categoryIndex: 4,
  },
  {
    name: 'Mediterranean Power Bowl',
    description: 'Quinoa, grilled halloumi, roasted vegetables, hummus, and tahini drizzle.',
    basePrice: 17.50,
    images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=750&fit=crop'],
    availability: true,
    featuredFlag: false,
    preparationTime: 12,
    ratings: { average: 4.4, count: 134 },
    categoryIndex: 4,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurant');
    console.log('🌱 Starting database seeding...');

    // 1. Clear existing data
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared old categories, menu items, and users.');

    // 2. Create Admin + Customer Users
    await User.create({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'password123',
      role: UserRole.ADMIN,
      isVerified: true,
    });
    await User.create({
      name: 'John Customer',
      email: 'john@example.com',
      password: 'password123',
      role: UserRole.CUSTOMER,
      isVerified: true,
    });
    console.log('👤 Created Admin: admin@restaurant.com / password123');
    console.log('👤 Created Customer: john@example.com / password123');

    // 3. Create Categories
    const categoryPromises = sampleCategories.map(cat => new Category(cat).save());
    const createdCategories = await Promise.all(categoryPromises);
    console.log(`✅ Created ${createdCategories.length} categories.`);

    // 4. Create Menu Items
    const itemPromises = sampleItems.map((item) => {
      const { categoryIndex, ...itemData } = item;
      const menuItem = new MenuItem({
        ...itemData,
        category: createdCategories[categoryIndex]._id,
      });
      return menuItem.save();
    });

    const createdItems = await Promise.all(itemPromises);
    console.log(`✅ Created ${createdItems.length} menu items.`);

    console.log('✨ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
