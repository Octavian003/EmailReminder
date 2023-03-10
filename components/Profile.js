import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get('screen')

export default function Profile({ image, name, email, onPress, index }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconContainer}>
                <View 
                    style={{
                        width: '75%',
                        height: '75%',
                        borderRadius: 100,
                        overflow: 'hidden',
                    }}
                >
                    <Image 
                        style={[ styles.image, {transform: index == 0 || index == 1 || index == 3 ? [{scale: 1.5}] : [{scale: 1}] } ]}
                        source={image}
                    />
                </View>
            </View>
            <View style={styles.textContainer}>  
                <Text style={{fontSize: Platform.OS == 'ios' ? 18 : null, fontWeight: Platform.OS == 'ios' ? '500' : '900' }}>{name}</Text>
                <Text style={{color: '#333', fontSize: Platform.OS == 'ios' ? 17 : null, fontWeight: Platform.OS == 'ios' ? '300' : null }}>{email}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 70,
        flexDirection: 'row',

        // Two columns

        // width: (width - 30) / 2,
        // height: 100,
        // marginBottom: 10,
        // borderRadius: 20,
        // backgroundColor:'#92922a',

        // shadowColor: "#000",
        // elevation: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.34,
        // shadowRadius: 6.27, 
    }, 
    iconContainer: {
        width:70, 
        height: '100%', 
        justifyContent: 'center', 
        // Two columns

        // flex: 1.3,
        // justifyContent: 'flex-end', 
        // alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        // Two columns

        // width: 50,
        // height: 50,
        // borderRadius: 100,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'

        // Two columns

        // justifyContent: 'flex-start', 
        // alignItems: 'center',
        // flex: 1
    },
})