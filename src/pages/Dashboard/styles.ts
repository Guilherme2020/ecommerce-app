import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {Product} from '../../interfaces/Product';
// interface Product {
//   id: string;
//   title: string;
//   image_url: string;
//   price: number;
//   quantity: number;
//   rating_media: number;
//   discount: number;
//   description: string;
//   reviews: string;
// }

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: #c72828;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const FilterContainer = styled.View`
  padding: 0 24px;
  margin-top: -28px;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(
  FlatList as new () => FlatList<Product>,
).attrs({
  numColumns: 1,
})`
  flex: 1;
  padding: 0 10px;
`;

export const ProductC = styled.TouchableOpacity`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  /* flex: 1; */
`;

export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #e83f5b;
`;

export const ProductDiscount = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #7cb47e;
`;

export const ProductRating = styled.View`
  flex: 1;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;
export const ProductButton = styled.TouchableOpacity``;

export const AddToCartContainer = styled.View`
  position: absolute;
  bottom: 0px;

  flex-direction: row;
  background: yellow;
  width: 100%;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

export const AddToCartButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #e83f5b;
  margin-top: 10px;
  flex: 1;
  display: flex;
  width: 100%;
  padding: 0 20px;

  justify-content: space-between;
  align-items: center;
`;

export const AddToCartText = styled.Text`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-weight: bold;
  color: #fff;
  /* margin-left: 15px; */
  padding: 10px 20px;

  flex: 1;
  /* margin-right: auto; */
`;
