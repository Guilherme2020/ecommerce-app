import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import keyStorageEnum from '../utils/keyStorageEnum';
import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({children}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsStorage = await AsyncStorage.getItem(
        keyStorageEnum.products,
      );
      if (productsStorage) {
        setProducts([...JSON.parse(productsStorage)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product) => {
      const productExists = products.find((p) => p.id === product.id);
      if (productExists) {
        setProducts(
          products.map((p) =>
            p.id === product.id ? {...product, quantity: p.quantity + 1} : p,
          ),
        );
      } else {
        setProducts([
          ...products,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
      await AsyncStorage.setItem(
        keyStorageEnum.products,
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async (id) => {
      // TODO INCREMENTS A PRODUCT QUANTITY IN THE CART
      const newProducts = products.map((product) =>
        product.id === id
          ? {...product, quantity: product.quantity + 1}
          : product,
      );

      setProducts(newProducts);

      await AsyncStorage.setItem(
        keyStorageEnum.products,
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async (id) => {
      // TODO DECREMENTS A PRODUCT QUANTITY IN THE CART
      const newProducts = products.map((product) =>
        product.id === id
          ? {...product, quantity: product.quantity - 1}
          : product,
      );

      setProducts(newProducts);

      await AsyncStorage.setItem(
        keyStorageEnum.products,
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({addToCart, increment, decrement, products}),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

export {CartProvider, useCart};
