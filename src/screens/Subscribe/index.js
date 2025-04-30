import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, ImageBackground, StyleSheet, Image, ScrollView, TextInput, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, Primary, MSRegular, MSSemiBold } from "../../styles"
import { Footer } from '../../components'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRoute, useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'

import {HelpersAuth} from '../../helpers';
const anunciosAuth = new HelpersAuth();

const Subscribe = (props) => {
	const [senha, setSenha] = useState('');
	const [confirmSenha, setConfirmSenha] = useState('')
	const [geraSenha, setGeraSenha] = useState(false);
	const [termos, setTermos] = useState(false);
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [CPF, setCPF] = useState('');
	const [CNPJ, setCNPJ] = useState('')
	const [email, setEmail] = useState('');
	const [whatsApp, setWhatsApp] = useState('')
	const [loading, setLoading] = useState(false)

	const route = useRoute();
	const navigation = useNavigation();
	const { pessoa } = route.params;

	const geradorSenha = () => {
		var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
      var passwordLength = 8;
      var password = "";

      for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
    	setSenha(password)
	}

	const cadastrar = () => {
		if(termos == true){
			pessoa == 'pessoa_fisica' ? cadPF() : cadPJ()
		}else {
			Alert.alert('Aceite os Termos de uso e Política de Privacidade do site')
		}
	}

	const cadPF = () => {
		setLoading(true)
		anunciosAuth.CadastroPF(email, senha, confirmSenha, pessoa, nome, sobrenome, CPF)
		.then(resp => {
			setLoading(false)
			resp.data.errors ? alert(resp.data.errors) : sucesso()
		})
	}

	const cadPJ = () => { 
		setLoading(true)
		anunciosAuth.CadastroPJ(email, senha, confirmSenha, pessoa, nome, sobrenome, CNPJ)
		.then(resp => {
			setLoading(false)
			resp.data.errors ? alert(resp.data.errors) : sucesso()
		})
	}

	const sucesso = () => {
		props.login_user(email, confirmSenha)
		navigation.navigate('CadFinalizado')
	}

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
				<View style={{height: 871, backgroundColor: "white", marginTop: 40, paddingHorizontal: 24}}>
					<Text style={{paddingTop: 35, fontFamily: MSBold, fontSize: 27}}>
					  	Geral
					</Text>
					<View style={{flex: 2, justifyContent: 'center'}}>
						{
							pessoa == 'pessoa_juridica' ? <View>
								<TextInput
									value={nome}
									onChangeText={value => setNome(value)}
									placeholder="Razão Social"
									placeholderColor={'#727272'}
									style={styles.input}
								/>
								<TextInput
									value={sobrenome}
									onChangeText={value => setSobrenome(value)}
									placeholder="Nome Fantasia"
									placeholderColor={'#727272'}
									style={styles.input}
								/>
							</View> :
							<View>
								<TextInput
									value={nome}
									onChangeText={value => setNome(value)}
									placeholder="Nome"
									placeholderColor={'#727272'}
									style={styles.input}
								/>
								<TextInput
									value={sobrenome}
									onChangeText={value => setSobrenome(value)}
									placeholder="Sobrenome"
									placeholderColor={'#727272'}
									style={styles.input}
								/>
							</View>
						}
						
						
						{
							pessoa == 'pessoa_juridica' ? ( <TextInputMask
								type={'cnpj'}
								value={CNPJ}
								onChangeText={value => setCNPJ(value)}
								placeholder="CNPJ"
								placeholderColor={'#727272'}
								style={styles.input}
							/> ) : ( <TextInputMask
								type={'cpf'}
								value={CPF}
								onChangeText={value => setCPF(value)}
								placeholder="CPF"
								placeholderColor={'#727272'}
								style={styles.input}
							/> )
						}
						<TextInputMask
							type={'cel-phone'}
							options={{
								maskType: 'BRL',
								withDDD: true
							}}
							value={whatsApp}
							onChangeText={value => setWhatsApp(value)}
							placeholder="WhatsApp"
							placeholderColor={'#727272'}
							style={styles.input}
						/>
							
							
						<TextInput
							autoCapitalize='none'
							value={email}
							onChangeText={value => setEmail(value)}
							placeholder="E-mail"
							placeholderColor={'#727272'}
							style={styles.input}
							keyboardType={'email-address'}
						/>
						
					</View>
					<View style={{flex: 1.5}}>
						<Text style={{fontFamily: MSSemiBold, fontSize: 16}}>
						  Senha
						</Text>
						<View style={{flex: 1, alignItems: 'center', flexDirection: "row"}}>
							<BouncyCheckbox
							  	size={25}
							  	isChecked={geraSenha}
							  	fillColor={Primary}
							  	unfillColor="#FFFFFF"
							  	iconStyle={{ borderColor: Primary }}
							  	onPress={(isChecked) => {
							  		setGeraSenha(!isChecked)
							  		isChecked ? geradorSenha() : setSenha('')
							  	}}
							/>
							<Text style={{fontFamily: MSRegular, color: '#727272', fontSize: 14}}>
							  Gerar automaticamente
							</Text>
						</View>
						<View style={{justifyContent: 'space-between', flex: 2, alignItems: 'center'}}>
							<TextInput
								autoCapitalize='none'
								value={senha}
								onChangeText={value => setSenha(value)}
								placeholder="Sua senha"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								autoCapitalize='none'
								value={confirmSenha}
								onChangeText={value => setConfirmSenha(value)}
								placeholder="Confirmar senha"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
						</View>
						<View style={{flex: 1, alignItems: 'center', flexDirection: "row"}}>
							<BouncyCheckbox
							  	size={25}
							  	isChecked={termos}
							  	fillColor={Primary}
							  	unfillColor="#FFFFFF"
							  	iconStyle={{ borderColor: Primary }}
							  	onPress={(isChecked) => setTermos(isChecked)}
							/>
							<Text style={{paddingRight: 24, fontFamily: MSRegular, color: '#727272', fontSize: 14}}>
							  Li e concordo com os Termos de Uso e Política de Privacidade do site
							</Text>
						</View>
					</View>
					<View style={{flexDirection: "row", flex: 1, alignItems: "center"}}>
						<TouchableOpacity style={[styles.btn, {backgroundColor: Primary, marginRight: 5}]} onPress={() => cadastrar()}>
							{
								loading ? <ActivityIndicator /> : props.loading ? <ActivityIndicator /> : <Text style={[styles.txtBtn, {color: 'white'}]}>
							  		REGISTRAR
								</Text>
							}
						</TouchableOpacity>
						<TouchableOpacity style={[styles.btn, {borderColor: Primary, borderWidth: 1, borderLeft: 5}]} onPress={() => navigation.goBack()}>
							<Text style={[styles.txtBtn, {color: Primary}]}>
							  	VOLTAR
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
  	txtBtn: {
  		fontFamily: MSBold,
  		fontSize: 14
  	},
  	btn: {
  		flex: 1,
  		height: 50,
  		alignItems: 'center',
  		justifyContent: 'center',
  		borderRadius: 5
  	},
  	input: {
  		height: 48, 
  		backgroundColor: '#E9E9E9', 
  		width: '100%', 
  		borderRadius: 5, 
  		paddingHorizontal: 10,
  		marginTop: 7
  	}
})



export default Subscribe;
