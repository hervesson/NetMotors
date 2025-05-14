import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import SideMenu from './src/components/SideMenu';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import { AuthProvider } from './src/contexts/auth';

import Login from "./src/screens/Login"
import SelectPersonType from "./src/screens/SelectPersonType"
import Home from "./src/screens/Home"
import Favorites from "./src/screens/Favorites"
import SearchResult from './src/screens/SearchResult';
import RegistrationForm from "./src/screens/RegistrationForm"
import Detail from "./src/screens/Detail";
import ForgotPassword from './src/screens/ForgotPassword';
import Filters from './src/screens/Filters'
import Profile from './src/screens/Profile'
import SuccessRegister from './src/screens/SuccessRegister'
import AdRegistrationOne from './src/screens/AdRegistrationOne'
import AdRegistrationTwo from './src/screens/AdRegistrationTwo'
import AdRegistrationThree from './src/screens/AdRegistrationThree'
import SucessAdRegistration from './src/screens/SucessAdRegistration'
import SelectAdPhotos from './src/screens/SelectAdPhotos';
import RegistrationAdFinish from './src/screens/RegistrationAdFinish';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Anuncios = () => {
   return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="SearchResult" component={SearchResult} />
         <Stack.Screen name="Detalhe" component={Detail} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="SelectPersonType" component={SelectPersonType} />
         <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
         <Stack.Screen name="SuccessRegister" component={SuccessRegister} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         <Stack.Screen name="Filtros" component={Filters} />
         <Stack.Screen name="Favorites" component={Favorites} />
         <Stack.Screen name="AdRegistrationOne" component={AdRegistrationOne} />
         <Stack.Screen name="AdRegistrationTwo" component={AdRegistrationTwo} />
         <Stack.Screen name="AdRegistrationThree" component={AdRegistrationThree} />
         <Stack.Screen name="SucessAdRegistration" component={SucessAdRegistration} />
         <Stack.Screen name="SelectAdPhotos" component={SelectAdPhotos} />
         <Stack.Screen name="RegistrationAdFinish" component={RegistrationAdFinish} />
      </Stack.Navigator>
   );
}

const User = () => {
   return (
      <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="SearchResult" component={SearchResult} />
         <Stack.Screen name="Filtros" component={Filters} />
      </Stack.Navigator>
   );
}

const Routes = () => {
   return (
      <Drawer.Navigator
         initialRouteName={"Anuncios"}
         screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
            drawerStyle: {
               width: "100%",
               backgroundColor: "#FFF"
            }
         }}
         drawerContent={props => <SideMenu {...props} />}
      >
         <Drawer.Screen name="Anuncios" component={Anuncios} />
         <Drawer.Screen name="User" component={User} />
      </Drawer.Navigator>
   );
}

export default function App() {
   return (
      <NavigationContainer>
         <AuthProvider>
            <Routes />
         </AuthProvider>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
