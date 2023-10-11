import React from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
const ShoppingList = ({
  shopping,
  pressNewAppointmentHandler,
  shoppingToEdithHandler,
  shoppingToDeleteHandler,
  navigation,
}) => {
  const {id, shoppingName, date, shoppingList} = shopping;
  // console.log(`1)${id}, 2)${shoppingName}, 3)${date}, 4)${shoppingList}`);

  const formatDate = date => {
    const newDate = new Date(date);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return newDate.toLocaleDateString('es-Es', options);
  };
  const editHandler = () => {
    pressNewAppointmentHandler();
    shoppingToEdithHandler(id);
  };

  const deleteHandler = () => {
    Alert.alert(
      'Deseas borrar la compra?',
      'Una compra eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Sí, eliminar',
          onPress: () => {
            shoppingToDeleteHandler(id);
          },
        },
      ],
    );
  };

  return (
    <Pressable
      onLongPress={() =>
        navigation.navigate('ShoppingListScreen', {
          shoppingList: shoppingList,
          isEditing: true,
          id: id,
        })
      }>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre: </Text>
        <Text style={styles.text}>{shoppingName}</Text>
        <Text style={styles.label}>Fecha: </Text>

        <Text style={styles.date}>{formatDate(date)}</Text>

        <View style={styles.containerBtn}>
          <Pressable style={[styles.btn, styles.btnEdit]} onPress={editHandler}>
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnDelete]}
            onLongPress={deleteHandler}>
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#2929CC',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#374151',
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    shadowOpacity: 1,
  },
  btnEdit: {
    backgroundColor: '#f5930b',
  },
  btnDelete: {
    backgroundColor: '#ef4444',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
});
