import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ButtonRadius({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
        <View style={{borderLeftColor: '#fff', borderLeftWidth: 1, paddingLeft: 10, paddingRight: 10}}>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="#fff" />
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        height: 50, 
        backgroundColor: '#6979F8',
        borderRadius: 10,
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6979F8',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 25, 
        color: '#fff', 
        fontWeight: '500',
        textTransform: 'capitalize',
        marginLeft: 20
    },
});
