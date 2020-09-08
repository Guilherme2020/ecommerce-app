import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';

import {View} from 'react-native';

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  ProductC,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  ProductDiscount,
  ProductRating,
  AddToCartText,
  AddToCartButton,
} from './styles';

import formatValue from '../../utils/formatValue';
import {Product} from '../../interfaces/Product';
import {useCart} from '../../hooks/cart';
import api from '../../services/api';

import FloatingCart from '../../components/FloatingCart';

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

const Dashboard: React.FC = () => {
  const {addToCart, removeCart, products} = useCart();
  const navigation = useNavigation();
  const [productsData, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/products');
      setProducts(response.data);
    }

    loadProducts();
  }, []);

  function handleAddToCart(item: Product): void {
    addToCart(item);
  }
  function removeToCart(item: Product): void {
    removeCart(item.id);
  }

  // const productExist = products.find((product: Product) =>  product.);

  const validationProductExist = (item: Product) => {
    const productExist = products.find((product) => product.id === item.id);

    if (!productExist) {
      return (
        <ProductButton
          testID={`add-to-cart-${item.id}`}
          onPress={() => handleAddToCart(item)}>
          <FeatherIcon size={20} name="plus" color="#C4C4C4" />
        </ProductButton>
      );
    } else {
      return (
        <ProductButton
          testID={`add-to-cart-${item.id}`}
          onPress={() => removeToCart(item)}>
          <FeatherIcon size={20} name="trash" color="#C4C4C4" />
        </ProductButton>
      );
    }
  };
  const goToCart = (item: Product) => {
    const productExist = products.find((product) => product.id === item.id);
    if (!productExist) {
      handleAddToCart(item);
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Cart');
    }
  };
  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={productsData}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({item}) => (
            <ProductC>
              <ProductImage source={{uri: item.image_url}} />
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>
                  {formatValue(item.price)}
                  <ProductDiscount>
                    {' - '}
                    {item.discount}
                    {'% de desconto'}
                  </ProductDiscount>
                </ProductPrice>
                {validationProductExist(item)}
                {/* <ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}>
                  <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                </ProductButton> */}
              </PriceContainer>
              <ProductRating>
                <AirbnbRating
                  isDisabled={true}
                  showRating={false}
                  size={20}
                  selectedColor={'#e83f5b'}
                  defaultRating={item.rating_media}
                />
              </ProductRating>
              <AddToCartButton onPress={() => goToCart(item)}>
                <FeatherIcon name="shopping-cart" size={24} color="#fff" />
                <AddToCartText>Realizar Compra</AddToCartText>
              </AddToCartButton>
            </ProductC>
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};

export default Dashboard;
