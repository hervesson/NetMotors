import React, { useContext } from "react";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet, Linking } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary, MSSemiBold } from "../../styles" 
import { useNavigation } from "@react-navigation/native"
import { DrawerActions } from '@react-navigation/native';

import AuthContext from "../../contexts/auth";

import { HelpersAuth } from "../../helpers";
const helpersAuth = new HelpersAuth()

function SideMenu(props) {
   const context = useContext(AuthContext);
   const navigation = useNavigation()
   
   const handlePress = async (url) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
         await Linking.openURL(url);
      } else {
         Alert.alert(`Don't know how to open this URL: ${url}`);
      }
   }

   return (
      <DrawerContentScrollView {...props}>
         <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
               <Icon name="close-outline" size={40} color={Primary} />
            </TouchableOpacity>
            <Image source={require("../../assets/images/logo.png")}/>
         </View>
         <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Anuncios')}>
            <Icon name="home" size={20} color={"#404040"} />
            <Text style={styles.txtItem}>
               HOME
            </Text>
         </TouchableOpacity>
         {
            context?.user?.name ? <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('User')}>
               <Text style={styles.txtItem}>
                  MEU PERFIL
               </Text>
            </TouchableOpacity> : null
         }
         <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.txtItem}>
               FAVORITOS
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.item} onPress={() => handlePress('https://www.netmotors.com.br/blog')}>
            <Text style={styles.txtItem}>
               BLOG
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.item} onPress={() => handlePress('https://www.netmotors.com.br/contato')}>
            <Text style={styles.txtItem}>
               CONTATO
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.item} onPress={() => handlePress('https://www.netmotors.com.br/contato')}>
            <Text style={styles.txtItem}>
               AJUDA
            </Text>
         </TouchableOpacity>
         {
            context?.user?.name ? <TouchableOpacity style={styles.item} onPress={() => context.logout()}>
               <Text style={styles.txtItem}>
                  LOGOUT
               </Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Login")}>
               <Text style={styles.txtItem}>
                  LOGIN
               </Text>
            </TouchableOpacity>
         }
      </DrawerContentScrollView>
   );
}

const styles = StyleSheet.create({
   header: {
      backgroundColor: "white",  
      width: '100%', 
      height: 80, 
      paddingHorizontal: 24, 
      alignItems: "center", 
      flexDirection: "row",
      justifyContent: "space-between"
   },
   item: {
      backgroundColor: "white",   
      height: 80, 
      alignItems: "center", 
      flexDirection: "row",
      justifyContent: "center",
      borderTopWidth: 0.2,
      borderColor: "#CCC"
   },
   txtItem:{
      color: '#696969',
      fontSize: 15,
      fontFamily: MSSemiBold,
      textAlign: "center"
   }
})

export default SideMenu;