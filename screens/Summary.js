import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Platform, Keyboard, Button, Alert } from "react-native";
import Template from '../data/DATA.json'
import { PeopleData } from "../data/PeopleData";
import { AntDesign } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useSelector } from 'react-redux'
import * as Network from 'expo-network';
// import useKeyboard from "../components/KeyboaradHook";

export default function Summary({ navigation }) {
const { userId, templateId, message } = useSelector(state => state.routeId)
const selectedUser = PeopleData.find(item => item.id == userId);
const template = Template.find(item => item.id == templateId);
const [input, setInput] = useState(message ? message : template.template);
const [subiect, setSubiect] = useState(template.subiect);
const [search, setSearch] = useState('');
const [people, setPeople] = useState([]);
const searchInput = useRef(null)
const scrollRef = useRef(null)
// const keyboardHeight = useKeyboard()
// const keyboardHeight = useRef(new Animated.Value(0)).current

const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
}, []);

function onKeyboardWillShow(event){
    setKeyboardHeight(event.endCoordinates.height);
    // Animated.timing(keyboardHeight, {
    //     duration: event.duration,
    //     toValue: event.endCoordinates.height,
    //     useNativeDriver: false
    // }).start()
}

function onKeyboardWillHide(event) {
    setKeyboardHeight(0);
    // Animated.timing(keyboardHeight, {
    //     duration: event.duration,
    //     toValue: 0,
    //     useNativeDriver: false
    // }).start()
}

useLayoutEffect(() => {
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

const filterUsers = useMemo(() => {
    return PeopleData.filter(item => item.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) 
        && people.findIndex(p => p.email.toLocaleLowerCase() == item.email.toLocaleLowerCase()) < 0 && item.email != selectedUser.email)
}, [search])

const confirm = (id) => {
    PeopleData.forEach(item => {
        if(item.id == id){
            setPeople((current) =>[...current, {email: item.email, id: Math.random()}]);
        }
    })
    setSearch('')
}

const deletePeople = (id) => {
    setPeople((current) => current.filter(item => item.id != id))
}

const sendEmail = async () => {
    const { isConnected } = await Network.getNetworkStateAsync()
    if(isConnected == true) {
        await MailComposer.composeAsync({
            recipients: selectedUser.email.split(),
            subject: subiect,
            body: input,
            ccRecipients: people.map(item => item.email)
        })
    }else{
        Alert.alert('Check your neetwork connection!')
    }
}

    return (
        <View style={styles.container}>
            <View style={[styles.body, { paddingBottom: Platform.OS == 'ios' ? keyboardHeight : null}]}>
                {search && <View style={[StyleSheet.absoluteFillObject, {backgroundColor: '#111', opacity: 0.3, zIndex: -1, borderTopRightRadius: 10, borderTopLeftRadius: 10}]} />}
                <ScrollView
                    ref={scrollRef}
                    keyboardShouldPersistTaps='handled'
                    style={{zIndex: -10,}}
                    bounces={false}
                    contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 20}}
                >
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', zIndex: 10}}>
                            <TextInput 
                                ref={searchInput}
                                style={{
                                    width: '100%',
                                    height: 30,
                                    borderBottomWidth: 1,
                                    borderColor: '#6979F8',
                                    paddingLeft: 10,
                                }}
                                placeholder='Search People'
                                onBlur={() => setSearch('')}
                                value={search}
                                onChangeText={(value) => setSearch(value)}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center', marginTop: 20}}>
                        <Text>Catre: </Text>
                        <View style={{ 
                                marginLeft: 5,
                                padding: 5,
                                borderRadius: 50, 
                                borderWidth: 1, 
                                borderColor: '#3333',
                            }}
                        >
                            <Text style={{
                                    fontSize: Platform.OS == 'ios' ? 17 : null,
                                    fontWeight: Platform.OS == 'ios' ? '300' : null,
                                    marginTop: Platform.OS == 'ios' ? null : -3
                                }}
                            >
                                {selectedUser.email}
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Text style={{alignSelf: 'center'}}>Cc: </Text>
                        {people && people.map((item)=> {
                            return (
                                <View key={item.id} style={{ 
                                        margin: 5, 
                                        padding: 5,
                                        alignItems: 'center', 
                                        justifyContentL: 'center',
                                        borderRadius: 50, 
                                        borderWidth: 1, 
                                        borderColor: '#3333',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Text style={{
                                            fontSize: Platform.OS == 'ios' ? 17 : null,
                                            fontWeight: Platform.OS == 'ios' ? '300' : null,
                                            marginLeft: 3,
                                            marginTop: Platform.OS == 'ios' ? null : -3
                                        }}
                                    >
                                        {item.email}
                                    </Text>
                                    <TouchableOpacity
                                        style={{marginLeft: 5}}
                                        onPress={() => deletePeople(item.id)}
                                    >
                                        <AntDesign name="close" size={14} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                   
                    <Text style={{marginTop: 20}}>Subiect: </Text>
                    <TextInput 
                        style={{
                            width: '100%',
                            // maxHeight: '20%',
                            marginTop: 5,
                            borderBottomWidth: 1,
                            borderColor: '#6979F8',
                            padding: 5,
                            borderRadius: 10,
                            zIndex: -10,
                            fontSize: Platform.OS == 'ios' ? 17 : null,
                            fontWeight: Platform.OS == 'ios' ? '300' : null,
                        }}
                        multiline={true}
                        placeholder='Subiect'
                        value={subiect}
                        onChangeText={text => setSubiect(text) }
                    />

                    <View style={{marginTop: 20}}>
                        <Text>Body: </Text>
                        <TextInput 
                            style={{
                                width: '100%',
                                // maxHeight: '70%',
                                marginTop: 5,
                                borderWidth: 1,
                                borderColor: '#6979F8',
                                padding: 10,
                                borderRadius: 10,
                                zIndex: -10,
                                fontSize: Platform.OS == 'ios' ? 17 : null,
                                fontWeight: Platform.OS == 'ios' ? '300' : null,
                            }}
                            scrollEnabled={false}
                            multiline={true}
                            placeholder='Body text'
                            value={input}
                            onChangeText={text => {setInput(text); Platform.OS == 'ios' && scrollRef.current.scrollToEnd()}}
                        />
                    </View>
                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '25%',
                                height: 30,
                                borderRadius: 5,
                                backgroundColor: '#6979F8',
                                // marginBottom: Platform.OS == 'ios' ? 20 : null,
                            }}
                            onPress={sendEmail}
                        >
                            <Text style={{
                                    lineHeight: Platform.OS == 'android' ? 15 : null,
                                    color: '#fff'
                                }}
                            >
                                SEND
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {search && <View style={{width: '95%', maxHeight: 250, position: 'absolute', top: 55, backgroundColor: 'white', zIndex: 10, alignSelf: 'center', shadowColor: '#333', elevation: 10, borderRadius: 10}}>
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                    >
                        {search && filterUsers.map((item, index) => {
                            return (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={{
                                        width: '100%', 
                                        height: 40, 
                                        borderBottomColor: '#3333',
                                        borderBottomWidth: index < filterUsers.length ?  1 : 0,
                                        opacity: 0.5,
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => confirm(item.id, searchInput.current.clear())} //setSearch(item.email)
                                >
                                    <Text style={{alignSelf: 'center', fontSize: Platform.OS == 'ios' ? 17 : null, fontWeight: Platform.OS == 'ios' ? '300' : null,}}>{item.email}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    {filterUsers == '' && 
                        <View style={{
                                width: '95%',
                                height: 50,
                                opacity: 0.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{textTransform: 'uppercase', fontSize: Platform.OS == 'ios' ? 17 : null, fontWeight: Platform.OS == 'ios' ? '300' : null,}}>No result founds!</Text>
                        </View>
                    }
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6979F8',
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // paddingHorizontal: 10,
        // paddingVertical: 20,
        // position: 'relative',
    },
})