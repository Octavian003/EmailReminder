import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";;
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSearchContext } from "../context/SearchContext";
import { useShowSearchContext } from "../context/SearchContext";
import { useSelector, useDispatch } from 'react-redux'
import { changeText, toggleChange } from "../redux/search";
// import { toggleChange } from '../redux/showSearch'


export default function Header(){
    const navigation = useNavigation()
    // const [search, setSearch] = useSearchContext();
    // const [showSearch, setShowShearch] = useShowSearchContext()

    // const { value, value2 } = useSearchContext()
    // const [search, setSearch] = value
    // const [showSearch, setShowSearch] = value2
    const { templateId } = useSelector(state => state.routeId)
    const { name, showSearch } = useSelector(state => state.search)
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={{
                backgroundColor: '#6979F8',
                height: Platform.OS === 'ios' ? 92 : 56,
                width: '100%',
                flexDirection: 'row'
            }}
        >
            {!showSearch && <View style={{
                    width: '15%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity 
                    style={{
                        // backgroundColor: 'red',
                        paddingLeft: Platform.OS == 'ios' ? 10 : null,
                        // justifyContent: 'center',
                        alignItems: Platform.OS == 'ios' ? 'center' : null,
                        flexDirection: Platform.OS == 'ios' ? 'row' : null
                    }}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    {Platform.OS == 'ios' ? (
                            <MaterialIcons name="keyboard-arrow-left" size={35} color="#fff" />      
                        ):(
                            <Ionicons name="ios-arrow-back" size={24} color="#fff" />
                        )
                    }
                    {Platform.OS == 'ios' ? <Text style={{fontSize: 18, color: 'white'}}>Back</Text> : null}
                </TouchableOpacity>
            </View> }

            {!showSearch ? (
                <View style={{
                        // width: '80%',
                        flex: 1,
                        justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
                        alignItems: 'center' ,
                        marginLeft: Platform.OS === 'ios' ? null : 20,
                        flexDirection: 'row',
                        // backgroundColor: 'red'
                    }}
                >
                    <Text style={{
                            fontSize: 28,
                            fontWeight: '700',
                            color: 'white',
                            // marginLeft: 20
                        }}
                    >
                        People
                    </Text>
                    <Text style={{color: 'white'}}>({templateId})</Text>
                </View>
            ) : (
                <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >   
                    <View style={{
                        width: '90%'
                    }}>  
                        <TextInput
                            // ref={inputRef}
                            autoFocus={true}
                            style={{
                                marginLeft: 20,
                                borderBottomColor: '#fff',
                                borderBottomWidth: 1,
                                color: '#fff',
                            }}
                            value={name}
                            placeholder="Search People"
                            placeholderTextColor='#fff'
                            onChangeText={text => dispatch(changeText(text))}
                        />
                    </View>
                </View> 
            )}
            <View style={{
                    // marginRight: 20,
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={() => {dispatch(changeText('')); dispatch(toggleChange())}}
                >   
                    {showSearch ? <Feather name="x" size={24} color="#fff" /> : <Feather name="search" size={24} color="#fff" />}
                       
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}