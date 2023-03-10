import React, { useMemo, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import { PeopleData } from '../data/PeopleData';
import Profile from '../components/Profile';
import Template from '../data/DATA.json'
import { useSearchContext } from "../context/SearchContext";
import { useShowSearchContext } from "../context/SearchContext";
import { useSelector, useDispatch } from 'react-redux'
import { changeText, toggleChange } from '../redux/search'
import { updateUserId } from '../redux/routeId';
// import { toggleChange } from '../redux/showSearch'

export default function People({ navigation, route }) {
// const [search, setSearch] = useSearchContext();
// const [showSearch, setShowShearch] = useShowSearchContext()

// const { value, value2 } = useSearchContext()
// const [search, setSearch] = value
// const [showSearch, setShowSearch] = value2
const { templateId } = useSelector(state => state.routeId)
const { name, showSearch } = useSelector(state => state.search)
const dispatch = useDispatch();

const filterUsers = useMemo(() => {
  return PeopleData.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())).sort(() => name);
}, [name])

useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if(showSearch)
        dispatch(toggleChange())
      if(name)
        dispatch(changeText(''))
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, [showSearch])
);
const selectedTemplate = Template.findIndex(item => item.id == templateId)

  return (
    <View style={styles.container}>
        <View style={styles.body}>
           <FlatList
              bounces={false}
              keyboardShouldPersistTaps='handled'
              data={filterUsers}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
              ItemSeparatorComponent={() => {
                return (
                  <View 
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#3333'
                    }}
                  />
                )
              }}
              renderItem={({item, index}) => {
                  return (
                      <View>
                          <Profile 
                            image={item.image} 
                            name={item.name} 
                            email={item.email} 
                            index={index} 
                            onPress={() => {
                              Template[selectedTemplate].variables.length > 0 ? navigation.navigate('Details') : navigation.navigate('Summary'); 
                              showSearch ? dispatch(toggleChange()) : null; 
                              dispatch(changeText('')); 
                              dispatch(updateUserId(item.id))
                            }}
                          />
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
    paddingHorizontal: 15,
    paddingVertical: 15,
  }
});
