import React from 'react';
import {Text, View, StyleSheet, Pressable, TextInput} from 'react-native';
const Item = ({
  item,
  handlePriceChange,
  handleProductNameChange,
  handleCheck,
}) => {
  const {id, productName, price, isSelected, isDeleted} = item;

  const myParse = val => {
    if (val) return val?.replace(/^0+/, '');
    return val;
  };
  return (
    <View style={styles.container}>
      <Pressable onLongPress={() => handleCheck(id)} style={styles.btnStatus}>
        <Text style={styles.btnStatusText}>X</Text>
      </Pressable>
      <TextInput
        placeholder="Nuevo producto"
        onChangeText={text => handleProductNameChange(id, text)}
        style={[styles.input, styles.inputName]}>
        {productName}
      </TextInput>
      <TextInput
        placeholder="Nuevo precio ej: 100"
        onChangeText={text => handlePriceChange(id, text)}
        keyboardType="numeric"
        value={`${myParse(price) || 0}`}
        style={[styles.input, styles.inputPrice]}></TextInput>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
  },
  text: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
  },
  input: {
    color: '#000',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
  },
  date: {
    color: '#374151',
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    shadowOpacity: 1,
  },
  btnStatus: {
    backgroundColor: 'white',
    width: 30,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStatusText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  btnNewIem: {
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 15,
    borderRadius: 10,
  },

  inputName: {
    width: '70%',
    marginRight: 5,
  },
  inputPrice: {
    width: '25%',
    marginLeft: 5,
  },
  btnFinishList: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 30,
    marginVertical: 55,
    borderRadius: 10,
  },
});
