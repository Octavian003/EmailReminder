import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import Template from '../data/DATA.json'
import { PeopleData } from "../data/PeopleData";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { updateMessage } from "../redux/routeId";

export default function Details({ navigation }) {
const dispatch = useDispatch() 
const { userId, templateId } = useSelector(state => state.routeId)
// const selectedUser = PeopleData.find(item => item.id == userId)
const template = Template.find(item => item.id == templateId)
let text = template?.template
// text = text?.replace('%name%', selectedUser.name)

useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
            onPress={() => navigation.popToTop()}
        >
           <AntDesign name="home" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
}, [navigation]);

const [inputs, setInputs] = useState(() =>
    template?.variables.map(item => ({
        key: item,
        value: ''
    }))
);

const updateState = (value, index) => {
    const newArray = inputs.map((item, i) => {
      if (index == i) {
        return { ...item, ['value']: value };
      } else {
        return item;
      }
    });
    setInputs(newArray);

    // let newVariables = inputs
    // newVariables[index].value = value;

    // setInputs(newVariables);
};

const confirm = () => {
    inputs.forEach((item) => {
       text = text.replace(item.key, item.value)
    })
    navigation.navigate('Summary', dispatch(updateMessage(text)))
}

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    bounces={false}
                >
                    <View style={styles.bodyEmail}>
                        {inputs?.map((item, index) => {
                            return (
                                <View key={index} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Text style={{width: '20%', textTransform: 'capitalize'}}>{item.key.slice(1, -1) + ': '}</Text>
                                    <TextInput 
                                        style={{
                                            width: '80%',
                                            height: 50,
                                            borderBottomWidth: 1,
                                            borderColor: '#6979F8',
                                            paddingLeft: 10

                                        }}
                                        placeholder='edit'
                                        autoCapitalize='none'
                                        value={item.value}
                                        onChangeText={(value) => updateState(value, index)}
                                    />
                                </View>
                            )
                        })}
                    </View>
                    <View style={{marginTop: 20}}>
                        <Button 
                            title="confirm"
                            color='#6979F8'
                            onPress={template && confirm}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6979F8',
    },
    headEmail: {
        flex: 0.3,
        marginBottom: 20
        // backgroundColor: 'red'
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    bodyEmail: {
        flex: 0.7,
        // backgroundColor: 'yellow'
    }
})