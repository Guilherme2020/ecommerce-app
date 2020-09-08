import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Dashboard from '../pages/Dashboard';
import DetailItem from '../pages/DetailItem';
import Cart from '../pages/Cart';
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: {backgroundColor: '#EBEEF8'},
    }}
    initialRouteName="Dashboard">
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: 'Dashboard',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        // headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      name="DetailItem"
      component={DetailItem}
      options={({navigation}) => ({
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={24}
            color="#FFB84D"
            onPress={() => navigation.goBack()}
          />
        ),
        headerLeftContainerStyle: {
          marginLeft: 24,
        },
        headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
        headerRightContainerStyle: {
          marginRight: 24,
        },
        headerTitle: 'Detalhe do Item',
        headerTitleStyle: {
          color: '#fff',
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#C72828',
          elevation: 0,
          borderWidth: 0,
          shadowColor: 'transparent',
        },
      })}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        // headerTitle: () => <Image source={Logo} />,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
