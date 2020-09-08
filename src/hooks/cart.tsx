import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {Product} from '../interfaces/Product';
import keyStorageEnum from '../utils/keyStorageEnum';
import AsyncStorage from '@react-native-community/async-storage';

// interface Product {
//   id: string;
//   title: string;
//   image_url: string;
//   price: number;
//   quantity: number;
//   discount: number;
//   rating_media: number;
//   description: string;
//   reviews: string;
// }

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
  removeCart(id: string): void;
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
        console.warn('if');
        setProducts(
          products.map((p) =>
            p.id === product.id ? {...product, quantity: p.quantity + 1} : p,
          ),
        );
        setProducts(products);
        await AsyncStorage.setItem(
          keyStorageEnum.products,
          JSON.stringify(products),
        );
      } else {
        const value = [
          ...products,
          {
            ...product,
            quantity: 1,
          },
        ];
        setProducts(value);
        await AsyncStorage.setItem(
          keyStorageEnum.products,
          JSON.stringify(value),
        );
      }
    },
    [products],
  );
  const removeCart = useCallback(
    async (id) => {
      const removeProduct = products.find((product) => product.id === id);

      const newList = products.filter((item) => item !== removeProduct);

      setProducts(newList);
      await AsyncStorage.setItem(
        keyStorageEnum.products,
        JSON.stringify(newList),
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
    () => ({addToCart, increment, decrement, products, removeCart}),
    [products, addToCart, increment, decrement, removeCart],
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
