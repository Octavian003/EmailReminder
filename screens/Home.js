import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
// import { Departaments } from '../data/Departaments';
import Template from '../data/DATA.json'
import ButtonRadius from '../components/ButtonRadius';
import { useDispatch } from 'react-redux'
import { updateTemplateId } from '../redux/routeId';


export default function Home({ navigation }) {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
        <View style={styles.body}>
          <FlatList 
              bounces={false}
              data={Template}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              renderItem={({item}) => {
                  return (
                      <View style={{marginBottom: 20}}>
                          <ButtonRadius 
                            title={item.subiect} 
                            onPress={() => navigation.navigate('People', dispatch(updateTemplateId(item.id)) )}/>
                      </View>
                  )
              }}
          />
        </View>
    </View>
  );
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
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 40
  }
});
