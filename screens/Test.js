import React from "react";
import { StyleSheet, View, FlatList, Text, ScrollView } from "react-native";
import { PeopleData } from "../data/PeopleData";

export default function Test(){
    return(
        <View style={{flex: 1}}>
            <FlatList 
                data={PeopleData}
                keyExtractor={item => item.id}
                contentContainerStyle={{}}
                renderItem={({item}) => {
                    return (
                        <View style={{height: 50, borderWidth: 1, borderColor: 'red', marginBottom: 20}}>
                            <Text>{item.name}</Text>
                        </View>
                    )
                }}
            />
            {/* <ScrollView>
                {PeopleData.map((item, index) => (
                    <View key={index}>
                        <Text style={{marginTop: 20, padding: 30, backgroundColor: 'pink', fontSize: 24}}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView> */}
        </View>
    )
}