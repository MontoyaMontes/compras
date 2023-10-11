import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Item from '../Item';
import {generateId} from '../helpers/tools';
import {Dimensions} from 'react-native';
const SCREEN_WIDTH = useWindowDimensions().width;
const SCREEN_HEIGHT = useWindowDimensions().height;
const ShoppingListScreen = ({navigation, route, changeShopping}) => {
  const {isEditing, shoppingList, shoppingName, date, id} = route.params;
  const [total, setTotal] = useState(0);

  const [newShoppingList, setNewShoppingList] = useState(shoppingList);
  const {height} = Dimensions.get('window');

  useEffect(() => {
    if (shoppingList) {
      setNewShoppingList(shoppingList);
    } else {
      setNewShoppingList([]);
    }
  }, [shoppingList]);

  useEffect(() => {
    const getTotal = () => {
      const val = newShoppingList?.reduce((sum, {price}) => +sum + +price, 0);
      setTotal(val || 0);
    };
    getTotal();
  }, [newShoppingList]);

  const addNewItem2 = () => {
    let newItem = {
      id: generateId(),
      productName: '',
      price: 0,
      isSelected: 0,
      isDeleted: 0,
    };
    console.log('*******', newShoppingList, newItem);

    setNewShoppingList([...newShoppingList, newItem]);
  };

  const handlePriceChange = (id, newPrice = 0) => {
    setNewShoppingList(prevList => {
      const newList = prevList.map(item => {
        if (item.id === id) {
          return {...item, price: newPrice};
        }
        return item;
      });
      return newList;
    });
  };

  const handleProductNameChange = (id, newProductName) => {
    setNewShoppingList(prevList => {
      const newList = prevList.map(item => {
        if (item.id === id) {
          return {...item, productName: newProductName};
        }
        return item;
      });
      return newList;
    });
  };

  const handleCheck = id => {
    const updatedItems = newShoppingList.filter(item => item.id !== id);
    setNewShoppingList(updatedItems);
  };

  const handleSave = () => {
    console.log('.....', id, newShoppingList);
    changeShopping(id, newShoppingList);
    navigation.navigate('HomeScreen');
  };

  const absHeight = {
    height: height,
  };

  return (
    <View style={[styles.content, absHeight]}>
      <View style={styles.btnsContainer}>
        <Text style={styles.title}>
          {isEditing ? 'Editar' : 'Nueva'}{' '}
          <Text style={styles.titleBold}>Compra</Text>
        </Text>

        <Pressable
          style={styles.btnAddContainer}
          onPress={() => {
            addNewItem2();
          }}>
          <Image
            style={styles.imageAdd}
            source={require('../img/nuevo-gasto.png')}
          />
        </Pressable>
        <Text>
          W:{SCREEN_WIDTH}-H:{SCREEN_HEIGHT}
        </Text>
      </View>

      {newShoppingList?.length === 0 ? (
        <Text style={styles.noPatients}>
          No hay productos{' '}
          {/* <Pressable>
            <Text style={styles.noPatientsLink}>agrega alguno</Text>
          </Pressable> */}
        </Text>
      ) : (
        <View style={styles.list}>
          <FlatList
            // style={styles.list}
            data={newShoppingList}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <Item
                  item={item}
                  style={styles.item}
                  handlePriceChange={handlePriceChange}
                  handleProductNameChange={handleProductNameChange}
                  handleCheck={handleCheck}
                />
              );
            }}
          />
        </View>
      )}
      <Pressable
        style={styles.btnFinishList}
        onLongPress={() => {
          handleSave();
        }}>
        <Text style={styles.btnTextNewAppointment}>
          {isEditing ? 'Guardar compra' : 'Terminar compra'}{' '}
          <Text> ${total}</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  content: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerDate: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    paddingHorizontal: 20,
  },
  btnCancel: {
    backgroundColor: '#5827a4',
    marginVertical: 30,
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  titleBold: {
    fontWeight: '900',
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    color: '#000',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  syntomsInput: {
    textAlignVertical: 'top',
    height: 100,
  },
  btnNewIem: {
    backgroundColor: '#f59e0b',
    padding: 15,
    marginTop: 30,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnFinishList: {
    backgroundColor: '#08f26e',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btnTextNewAppointment: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  btnAddContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAdd: {
    width: 60,
    height: 60,
  },
  list: {
    minHeight: '45%',
    maxHeight: '45%',
    // height: '45%',
    // marginTop: 50,
    // marginHorizontal: 30,
  },
  noPatients: {
    height: '45%',
    padding: 20,
    fontSize: 24,
  },
});
