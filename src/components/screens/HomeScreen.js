import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';

import Item from '../Item';
import ShoppingList from '../ShoppingList';

const HomeScreen = ({navigation, shoppings}) => {
  // console.log('>>>>>>>>>', shoppings);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [shoppingSelected, setShoppingSelected] = useState({});

  const [shoppingToEdit, setShoppingToEdit] = useState({});
  const [shoppingToDelete, setShoppingDelete] = useState({});
  const [showShoppingModal, setShowShoppingModal] = useState(false);

  const shoppingToEdithHandler = id => {
    const shoppingTE = shoppings.filter(pat => pat.id === id);
    setShoppingToEdit(shoppingTE[0]);
  };

  const shoppingToDeleteHandler = id => {
    const shoppingsUpdated = shoppings.filter(pat => id !== pat.id);
    setShoppings(shoppingsUpdated);
    setShoppingDelete({});
  };

  const pressNewAppointmentHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const showShoppingHandler = () => {
    setShowShoppingModal(!showShoppingModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      {shoppings.length === 0 ? (
        <Text style={styles.noShoppings}>
          No hay compras{' '}
          <Pressable onPress={pressNewAppointmentHandler}>
            <Text style={styles.noShoppingsLink}>agrega alguno</Text>
          </Pressable>
        </Text>
      ) : (
        <FlatList
          style={styles.list}
          data={shoppings}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <ShoppingList
                navigation={navigation}
                shopping={item}
                pressNewAppointmentHandler={pressNewAppointmentHandler}
                shoppingToEdithHandler={shoppingToEdithHandler}
                shoppingToDeleteHandler={shoppingToDeleteHandler}
                showShoppingHandler={showShoppingHandler}
                setShoppingSelected={setShoppingSelected}
              />
            );
          }}
        />
      )}

      <Pressable
        onPress={() =>
          navigation.navigate('ShoppingListScreen', {
            isEditing: false,
          })
        }
        style={styles.btnNewAppointment}>
        <Text style={styles.btnTextNewAppointment}>Iniciar nueva compra</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  list: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  noShoppings: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  noShoppingsLink: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#0000EE',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    marginTop: 10,
  },
  titleBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },
  btnNewAppointment: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextNewAppointment: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});
