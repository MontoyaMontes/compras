import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/components/screens/HomeScreen';
import ShoppingListScreen from './src/components/screens/ShoppingListScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Stack = createNativeStackNavigator();

const App = () => {
  const [shoppings, setShoppings] = useState([
    {
      id: 1,
      shoppingName: 'Compras Comer',
      date: new Date(),
      shoppingList: [
        {
          id: 100,
          productName: 'manzanas',
          price: 150.5,
          isSelected: false,
          isDeleted: false,
        },
        {
          id: 102,
          productName: 'manzanas',
          price: 120.5,
          isSelected: false,
          isDeleted: false,
        },
      ],
    },
    {
      id: 2,
      shoppingName: 'Compras marzo',
      date: new Date(),
      shoppingList: [
        {
          id: 200,
          productName: 'peras',
          price: 250.5,
          isSelected: false,
          isDeleted: false,
        },
      ],
    },
    {
      id: 3,
      shoppingName: 'Compras Aurrera',
      date: new Date(),
      shoppingList: [
        {
          id: 300,
          productName: 'sandias',
          price: 210.5,
          isSelected: false,
          isDeleted: false,
        },
      ],
    },
  ]);

  const changeShopping = (id, nuevoObjeto) => {
    console.log('Saving...');
    setShoppings(prevShoppings => {
      return prevShoppings.map(shopping => {
        if (shopping.id === id) {
          return {...shopping, ...nuevoObjeto};
        }
        return shopping;
      });
    });
    console.log('Saved', shoppings);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" options={{title: 'Mis listas'}}>
          {props => (
            <HomeScreen
              {...props}
              shoppings={shoppings}
              setShoppings={setShoppings}
              changeShopping={changeShopping}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ShoppingListScreen"
          options={{title: 'Lista de compras'}}>
          {props => (
            <ShoppingListScreen
              {...props}
              shoppings={shoppings}
              setShoppings={setShoppings}
              changeShopping={changeShopping}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
