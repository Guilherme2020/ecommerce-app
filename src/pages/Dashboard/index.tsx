import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';

import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {
  Container,
  Header,
  FilterContainer,
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
import SearchInput from '../../components/SearchInput';

const Dashboard: React.FC = () => {
  const {addToCart, removeCart, products} = useCart();
  const navigation = useNavigation();
  const [productsData, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('/products', {
        params: {
          q: searchValue,
        },
      });
      setProducts(response.data);
    }

    loadProducts();
  }, [searchValue]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (pageNumber === total) {
      return;
    }
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await api.get('/products', {
      params: {
        _page: pageNumber,
        _limit: 10,
      },
    });

    const totalItems = response.data.length;

    setLoading(false);
    setTotal(Math.floor(totalItems / 4));
    setPage(pageNumber + 1);

    setProducts(
      shouldRefresh ? response.data : [...productsData, ...response.data],
    );
  }
  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }
  function handleAddToCart(item: Product): void {
    addToCart(item);
  }
  function removeToCart(item: Product): void {
    removeCart(item.id);
  }

  // const productExist = products.find((product: Product) =>  product.);
  const sortProducts = async (itemValue) => {
    setSortPrice(itemValue);
    const response = await api.get('/products', {
      params: {
        _sort: itemValue,
        _order: 'desc',
        // _page: page,
        // _limit: 10,
      },
    });
    setProducts(response.data);
  };
  async function handleNavigate(id: number): Promise<void> {
    navigation.navigate('DetailItem', {
      id,
    });
  }
  const renderPicker = () => (
    <Picker
      selectedValue={sortPrice}
      style={{height: 50, width: 200}}
      onValueChange={(itemValue) => sortProducts(itemValue)}>
      <Picker.Item label="Padrão" value="default" />
      <Picker.Item label="Ordernar por maior preco" value="price" />
    </Picker>
  );
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
  const handleViewableChanged = useCallback(({changed}) => {
    setViewable(changed.map(({item}) => item.id));
  }, []);
  return (
    <Container>
      <Header />
      <FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Qual produto você procura?"
        />
      </FilterContainer>
      {renderPicker()}
      <ProductContainer>
        <ProductList
          key="list"
          data={productsData}
          keyExtractor={(item) => String(item.id)}
          onViewableItemsChanged={handleViewableChanged}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 10,
          }}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadPage()}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({item}) => (
            <ProductC onPress={() => handleNavigate(Number(item.id))}>
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
