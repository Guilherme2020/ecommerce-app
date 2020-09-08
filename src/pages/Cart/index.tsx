import React, {useMemo} from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';

import {View} from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  ProductC,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ProductRating,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
} from './styles';
import {Product} from '../../interfaces/Product';
import {useCart} from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

const Cart: React.FC = () => {
  const {increment, decrement, products, removeCart} = useCart();
  function handleIncrement(id: string): void {
    increment(id);
    // TODO
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }
  function removeToCart(item: Product): void {
    removeCart(item.id);
  }
  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product: Product) => {
      const discount = product.price * (product.discount / 100);
      const formatValueItem = product.price * product.quantity - discount;
      return accumulator + formatValueItem;
    }, 0);
    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce((accumulator, product: Product) => {
      const productsQuantity = product.quantity;
      return accumulator + productsQuantity;
    }, 0);
    return total;
  }, [products]);
  function productValueWithDiscount(item: Product) {
    const discount = item.price * (item.discount / 100);
    return formatValue(item.price * item.quantity - discount);
  }
  function valueDiscount(item: Product) {
    const discount = item.price * (item.discount / 100);
    return formatValue(item.price - discount);
  }
  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({item}: {item: Product}) => (
            <ProductC>
              <ProductImage source={{uri: item.image_url}} />
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)} {': Desconto='}
                    {valueDiscount(item)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(item.price * item.quantity)} {' = '}{' '}
                      {productValueWithDiscount(item)}
                    </ProductPrice>
                  </TotalContainer>
                  <ProductRating>
                    <AirbnbRating
                      isDisabled={true}
                      showRating={false}
                      size={20}
                      selectedColor={'#e83f5b'}
                      defaultRating={item.rating_media}
                    />
                  </ProductRating>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}>
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}>
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => removeToCart(item)}>
                  <FeatherIcon name="trash" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </ProductC>
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
