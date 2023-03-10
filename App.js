import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import Home from './screens/Home';
import People from './screens/People';
import Details from './screens/Details';
import Summary from './screens/Summary';
import Header from './components/Header';
import { store } from './redux/store'
import { Provider } from 'react-redux'
// import { SearchProvider } from './context/SearchContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SearchProvider>
    <Provider store={store}>
      <NavigationContainer>
        {/* <StatusBar/> */}
        <Stack.Navigator 
          initialRouteName="Home" 
          screenOptions={{
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#6979F8',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 28,
            },
            statusBarColor: '#6979F8',
            headerBackTitle: 'Back'
            // statusBarAnimation: 'fade'
            // headerSearchBarOptions: true, // add search bar on header
            // headerBackImageSource: require('./assets/icon.png')
            // headerTitleAlign: 'center'
            // header: () => <Text style={{height: 100}}>Salut!</Text> // custom Header
            // headerRight: () => <Text style={{height: 100}}>Coooool!</Text>, // add on right header custom component
            // headerLeft: () => <Text style={{height: 100}}>Coooool!</Text> / add on left header custom component
            // headerTitle: ( { options} ) => <Text style={options.headerStyle}>Tare!</Text> // Custom Header title
            // statusBarStyle: 'auto'
            // animation: 'default', // animation for stack screen on push and pop
            // animationDuration: , // duration for animation
            // orientation: 'portrait', // orientarea device-ului
        }}>
          <Stack.Screen name="Home" component={Home} options={{title: 'Departments', headerLeft: () => <Text>    </Text>}}/>
          <Stack.Screen name='People' component={People} options={{ 
              header: () => <Header />
            }}/>
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </SearchProvider>
  );
}
