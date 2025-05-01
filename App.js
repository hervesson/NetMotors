import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import SideMenu from './src/components/SideMenu';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import Login from "./src/screens/Login"
import SelectPersonType from "./src/screens/SelectPersonType"
import Home from  "./src/screens/Home"
import Favorites from "./src/screens/Favorites"
import SearchResult from './src/screens/SearchResult';
import RegistrationForm from "./src/screens/RegistrationForm"

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Anuncios = () => {
   return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="SearchResult" component={SearchResult} />
         {/* <Stack.Screen name="Detalhe" component={Detalhe} />  */}
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="SelectPersonType" component={SelectPersonType} />
         <Stack.Screen name="RegistrationForm" component={RegistrationForm} /> 
         {/*<Stack.Screen name="CadFinalizado" component={CadFinalizado} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         <Stack.Screen name="Filtros" component={Filtros} /> */}
         <Stack.Screen name="Favorites" component={Favorites} />
         {/* <Stack.Screen name="CadAnuncio1" component={CadAnuncio1} />
         <Stack.Screen name="CadAnuncio2" component={CadAnuncio2} />
         <Stack.Screen name="CadAnuncio3" component={CadAnuncio3} />
         <Stack.Screen name="SucessAnun" component={SucessAnun} />
         <Stack.Screen name="AnunFinalizado" component={AnunFinalizado} />
         <Stack.Screen name="SelectPhotos" component={SelectPhotos} /> */} 
      </Stack.Navigator>
   );
}

const User = () => {
   return (
      <Stack.Navigator initialRouteName="Perfil1" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Perfil1" component={Perfil1} /> 
      </Stack.Navigator>
   );
}

const Routes = (props) => {
   useEffect(() => {
      //buscar()
      //props.retrive_favoritos()
   }, []);

   // const buscar = async() => {
   //    try {
   //       const value = await AsyncStorage.getItem('token')
   //       if(value !== null) {
   //          props.initialization(value)
   //       }else{
   //          props.no_user()
   //       }
   //    } catch(e) {
   //       console.log(e)
   //    }
   // } 
   

   // if(props.initializing == true) {
   //    return(
   //       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
   //          <ActivityIndicator size="large" color={"#CB2525"}/>
   //       </View>
   //    );
   // }

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
         <Routes /> 
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
