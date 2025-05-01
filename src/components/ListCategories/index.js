import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native'
import { MSRegular, MSSemiBold } from "../../styles"

const DATA = [
   {  
      uri: require("../../assets/images/categoria-ult-pesquisa.jpg"),
      id: "bd7acbea-c1b1-46c2-aed5-3ad53a9b28ba",
      title: "Pesquisados recentemente",
      subtitle: "Recentemente",
      label: "recentes",
      url: 'https://www.netmotors.com.br/carros/recentemente'
   },
   {  
      uri: require("../../assets/images/categoria-zerokm.jpg"),
      id: "3ac68afc-c605-48w3-a4f8-fbd91aa94f63",
      title: "Zero km",
      subtitle: "0 km",
      label: "0km",
      url: 'https://www.netmotors.com.br/carros/zerokm'
   },
   {  
      uri: require("../../assets/images/categoria-uber.jpg"),
      id: "58694a0f-3da1-471f-bd16-145571e27d72",
      title: "Aplicativos",
      subtitle: "Aplicativos",
      label: "aplicativo",
      url: 'https://www.netmotors.com.br/carros/carrosapp'
   },
   {  
      uri: require("../../assets/images/categoria-blindado.jpg"),
      id: "58694a0f-3da1-471f-bd96-145571e2eg72",
      title: "Blindados",
      subtitle: "Blindados",
      label: "blindados",
      url: 'https://www.netmotors.com.br/carros/blindados'
   },
   {  
      uri: require("../../assets/images/categoria-eletrico.jpg"),
      id: "58624a0f-3da1-471f-bd96-145571e25ed72",
      title: "Elétricos",
      subtitle: "Elétrico",
      label: "eletricos",
      url: 'https://www.netmotors.com.br/carros/eletricos'
   },
   {  
      uri: require("../../assets/images/categoria-antigos.jpg"),
      id: "58624a0f-3da1-471f-bc96-145571e2xed72",
      title: "Antigos",
      subtitle: "Antigos",
      label: "antigos",
      url: 'https://www.netmotors.com.br/carros/colecionador'
   },
   {  
      uri: require("../../assets/images/categoria-recentes.jpg"),
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb284ba",
      title: "Adicionados recentemente",
      subtitle: "Recentemente",
      label: "recentes",
      url: 'https://www.netmotors.com.br/carros/recentemente'
   },
   {  
      uri: require("../../assets/images/categoria-suvs.jpg"),
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb281ba",
      title: "SUVs",
      subtitle: "Recentemente",
      label: "recentes",
      url: 'https://www.netmotors.com.br/carros/recentemente'
   },
   { 
      uri: require("../../assets/images/categoria-pcd.jpg"),
      id: "58624a0f-3da1-471f-bc96-145571e23ed72",
      title: "Carros para PCD",
      subtitle: "pcd",
      label: "pcd",
      url: 'https://www.netmotors.com.br/carros/pcd'
   }
];

   const handlePress = async (url) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
         await Linking.openURL(url);
      } else {
         Alert.alert(`Don't know how to open this URL: ${url}`);
      }
   }

export const Categorias = (props) => {

	const renderItem = ({ item }) => (
      <TouchableOpacity 
         onPress={() => props.press(item.title, item.label)} 
         style={{borderRadius: 105, alignItems: 'center'}}
      >
         <Image style={styles.container} source={item.uri} />
         <Text style={{fontSize: 20, marginTop:20, fontFamily: MSSemiBold}}>
            {item.title}
         </Text>
      </TouchableOpacity>
  	);
 
	return (
		<FlatList
        	data={DATA}
        	renderItem={renderItem}
        	keyExtractor={(item) => item.id}
         horizontal
         showsHorizontalScrollIndicator={false}
      />
	)
}

const styles = StyleSheet.create({
   container: {
      width: 230,
      height: 230,
      marginRight: 13,
      borderRadius: 115
   },
   subContainer: {
      paddingLeft: 19,
      paddingBottom: 19
   },
   title: {
      fontFamily: MSRegular,
      color: "white"
   },
   subTitle: {
      fontFamily: MSSemiBold,
      color: "white"
   },
})

