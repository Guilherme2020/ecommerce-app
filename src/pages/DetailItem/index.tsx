import React, {useEffect, useState} from 'react';
import {Image, Alert, View, ImageBackground, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';

import {useNavigation, useRoute} from '@react-navigation/native';
import {Product} from '../../interfaces/Product';
import formatValue from '../../utils/formatValue';
import {useCart} from '../../hooks/cart';
import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  ProductContainer,
  ProductC,
  ProductImageContainer,
  ProductContent,
  ProductTitle,
  ProductDescription,
  ProductPricing,
  AdditionalsContainer,
  Title,
  AddContainer,
  ProductRating,
  PriceButtonContainer,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
  CommentContainer,
} from './styles';

interface Params {
  id: number;
}

const DetailItem: React.FC = () => {
  const [productData, setProductData] = useState({} as Product);
  const {addToCart, removeCart, products} = useCart();
  const [textInfo, setTextInfo] = useState('Adicionar Item');
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      const response = await api.get(`/products/${routeParams.id}`);
      setProductData({
        ...response.data,
        formattedPrice: formatValue(response.data.price),
      });
    }

    loadProduct();
  }, [routeParams]);

  function handleAddToCart(item: Product): void {
    addToCart(item);
    Alert.alert('Informação', 'Produto Adicionado ao Carrinho');
  }
  const goToCart = (item: Product) => {
    const productExist = products.find((product) => product.id === item.id);
    if (!productExist) {
      handleAddToCart(item);
      navigation.navigate('Cart');
    } else {
      navigation.navigate('Cart');
    }
  };
  function removeToCart(item: Product): void {
    removeCart(item.id);
    Alert.alert('Informação', 'Produto Removido do Carrinho');
  }

  function productValueWithDiscount(item: Product) {
    const discount = item.price * (item.discount / 100);
    return formatValue(item.price - discount);
  }

  function valueDiscount(item: Product) {
    const discount = item.price * (item.discount / 100);
    return formatValue(discount);
  }
  const validationProductExist = (item: Product) => {
    const productExist = products.find((product) => product.id === item.id);

    if (!productExist) {
      // setTextInfo('Adicionar Item ao carrinho');
      return (
        <Icon
          size={15}
          color="#6C6C80"
          name="plus"
          onPress={() => handleAddToCart(item)}
        />
      );
    } else {
      // setTextInfo('Remover Item do carrinho');

      return (
        <Icon
          size={15}
          color="#6C6C80"
          name="trash"
          onPress={() => removeToCart(item)}
        />
      );
    }
  };

  const showText = () => {
    const productExist = products.find(
      (product) => product.id === productData.id,
    );
    if (!productExist) {
      return 'Adicionar';
    } else {
      return 'Remover';
    }
  };
  return (
    <Container>
      <Header />

      <ScrollContainer>
        <ProductContainer>
          <ProductC>
            <ProductImageContainer>
              <Image
                style={{width: 327, height: 183}}
                source={{
                  uri: productData.image_url,
                }}
              />
            </ProductImageContainer>
            <ProductContent>
              <ProductTitle>{productData.title}</ProductTitle>
              <ProductDescription>{productData.description}</ProductDescription>
              <ProductPricing>{formatValue(productData.price)}</ProductPricing>
              <ProductPricing>
                {'Desconto='} {valueDiscount(productData)}
              </ProductPricing>
              <ProductPricing>
                {' Valor Final = '}
                {productValueWithDiscount(productData)}
              </ProductPricing>
              <ProductRating>
                <AirbnbRating
                  isDisabled={true}
                  showRating={false}
                  size={20}
                  selectedColor={'#e83f5b'}
                  defaultRating={productData.rating_media}
                />
              </ProductRating>
              <View>
                <Title>Outras Imagens</Title>
              </View>
              <View style={{height: 150, flexDirection: 'row'}}>
                <FlatList
                  data={productData && productData.images}
                  keyExtractor={(item) => String(item.id)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  // ListFooterComponent={() => this.addAditional()}
                  renderItem={({item}) => (
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          alignItems: 'center',

                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            height: 115,
                          }}>
                          <Image
                            style={{
                              width: 85,
                              height: 85,
                              borderRadius: 85,
                              overflow: 'hidden',
                              // AdditionalStyle.imageBackgroundStyle
                            }}
                            source={{uri: item.thumbnail_img}}
                          />
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            </ProductContent>
          </ProductC>
        </ProductContainer>
        <AdditionalsContainer>
          <Title>Comentários</Title>

          <CommentContainer>
            {productData.reviews &&
              productData.reviews.map((review: any) => {
                return (
                  <Title style={{fontWeight: 'bold'}} key={review.id}>
                    {review.comment}
                  </Title>
                );
              })}
          </CommentContainer>
        </AdditionalsContainer>
        <AddContainer>
          <Title>{showText()}</Title>
          <PriceButtonContainer>
            <QuantityContainer>
              {validationProductExist(productData)}
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => goToCart(productData)}>
            <ButtonText>Realizar Compra</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </AddContainer>
      </ScrollContainer>
    </Container>
  );
};

export default DetailItem;
