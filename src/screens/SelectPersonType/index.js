import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, Primary, MSRegular, MSMedium } from "../../styles"
import { Footer } from '../../components'

const Cadastro = ({navigation}) => {
	const [background, setBackground] = useState([]);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Primary}}>
			<ScrollView style={{flex: 1, backgroundColor: Primary}}>
			<View style={{backgroundColor: Background}}>
				<View>
					<TouchableOpacity onPress={() => navigation.navigate('Home')}> 
						<ImageBackground
							style={{width: '100%', height: 64, flexDirection: "row"}}
							source={require('../../assets/images/header.png')}
						>
							<View style={{flex: 1, marginLeft: 12, justifyContent: "center"}}>
								<Icon name="arrow-back" size={30} color={Primary} onPress={() => navigation.goBack()}/> 
							</View>
							<View style={{flex: 1, alignItems: 'flex-end'}}>
								<TouchableOpacity style={styles.menu}  onPress={() => navigation.openDrawer()}>
									<Image
									  	style={{width: 20, height: 20}}
									  	source={require("../../assets/images/menuBlack.png")}
									  	resizeMode="contain"
									/>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</TouchableOpacity>
					<View style={{borderWidth: 0.3, borderColor: '#D0D0D0'}} />
				</View>
				<View style={{height: 543, backgroundColor: "white", marginTop: 40, paddingHorizontal: 24}}>
					<View style={{flex: 2, justifyContent: 'center'}}>
						<Text style={{textAlign: 'center', color: 'black', fontSize: 27, fontFamily: MSBold}}>
						  Tipo de cadastro
						</Text>
						<Text style={{textAlign: 'center', color: '#9D9D9D', fontSize: 14, fontFamily: MSRegular, paddingTop: 8}}>
						  Você é empresa ou pessoa física
						</Text>
					</View>
					<View style={{flex: 4, flexDirection: "row"}}>
						<TouchableOpacity 
							style={[styles.containerCentral, { marginRight: 5, backgroundColor: background.includes('pessoa_fisica') ? Primary : '#D3D3D3'}]}
							onPress={() => background.includes('pessoa_fisica') ? setBackground([]) : setBackground(['pessoa_fisica'])}
						>
							<Icon name="person-outline" size={40} color={'black'} />
							<View style={{}}>
								<Text style={styles.person}>
								  	PESSOA 
								</Text>
								<Text style={styles.person}>
								  	FÍSICA 
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity 
							style={[styles.containerCentral, { marginLeft: 5, backgroundColor: background.includes('pessoa_juridica') ? Primary : '#D3D3D3'}]}
							onPress={() => background.includes('pessoa_juridica') ? setBackground([]) : setBackground(['pessoa_juridica'])}
						>
							<Icon name="person-outline" size={40} color={'black'} />
							<View style={{}}>
								<Text style={styles.person}>
								  PESSOA 
								</Text>
								<Text style={styles.person}>
								  JURÍDICA 
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{flex: 3, alignItems: 'center'}}>
						<TouchableOpacity 
							style={{backgroundColor: Primary, height: 56, width: 205, borderRadius: 5, alignItems: 'center', justifyContent: "center"}}
							onPress={() => background.length > 0 ? navigation.navigate('RegistrationForm', {pessoa: background[0]}) : alert('Selecione o tipo de pessoa')}
							>
							<Text style={{fontFamily: MSBold, color: 'white', fontSize: 16}}>
							  	AVANÇAR
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Footer
					press={() => navigation.navigate('Home')}
					anunciar={() => props.user.username ? navigation.navigate("CadAnuncio1") : navigation.navigate("Login")}
				/>
			</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	menu: {
		backgroundColor: Background,
  		borderRadius: 5, 
  		height: 40, 
  		width: 40,
  		marginTop: 12,
  		marginRight: 12,
  		justifyContent: "center",
  		alignItems: "center"
  	},
  	txtCar: {
  		color: "#404040",
		fontSize: 15,
		fontFamily: MSBold,
		paddingLeft: 5
  	},
  	containerCentral: {
  		flex: 1, 
  		height: 133,
  		alignItems: 'center', 
  		justifyContent: 'space-evenly',
  		borderRadius: 5
  	},
  	person: {
  		fontFamily: MSMedium,
  		color: 'black',
  		textAlign: 'center',
  		fontSize: 16
  	}
})

export default Cadastro;


