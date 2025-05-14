import React, { useState, useContext, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, Primary, MSRegular, MSSemiBold } from "../../styles"
import { Footer } from '../../components';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation, useIsFocused } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../contexts/auth';

import { HelpersAnuncios, HelpersUsers } from '../../helpers';
const helpersAnuncios = new HelpersAnuncios();
const helpersUser = new HelpersUsers();

const Profile = () => {
	const context = useContext(AuthContext);
	const [nome, setNome] = useState(context.user?.name);
	const [sobrenome, setSobrenome] = useState(context.user?.lastname)
	const [whatsApp, setWhatsApp] = useState(context.user?.celular)
	const [telefone, setTelefone] = useState(context.user?.phone)
	const [cpf, setCpf] = useState(context.user?.cpf)
	const [email, setEmail] = useState(context.user?.email)
	const [cep, setCep] = useState(context.user?.cep)
	const [endereco, setEndereco] = useState(context.user?.endereco)
	const [numero, setNumero] = useState(context.user?.endereco_num)
	const [bairro, setBairro] = useState(context.user?.bairro)
	const [complemento, setComplemento] = useState(context.user?.complemento)
	const [estado, setEstado] = useState(context.user?.estado)
	const [cidade, setCidade] = useState(context.user?.cidade)
	const [facebook, setFacebook] = useState(context.user?.facebook)
	const [instagram, setInstagram] = useState(context.user?.instagram)

	const [loading, setLoading] = useState(false)

	const [changeSenha, setChangeSenha] = useState(false);
	const [senha, setSenha] = useState('');
	const [confirmSenha, setConfirmSenha] = useState('')

	const [records, setRecords] = useState(0)



	const navigation = useNavigation()
	const isFocused = useIsFocused();

	useEffect(() => {

		const getMyAdverts = async () => {
			const myAdvertisements = await helpersAnuncios.GetMyAnuncios(context.user.id, 1)
			setRecords(myAdvertisements.data)
		}

		isFocused ? getMyAdverts() : null

	}, [isFocused])

	const atualizarUsuario = async () => {
		setLoading(true)
		try {
			const value = await AsyncStorage.getItem('@App:token')
			const payload = {
				name: context.user.name,
				lastname: context.user.lastname,
				cpf: context.user.cpf,
				celular: whatsApp,
				phone: telefone,
				cep: cep,
				endereco: endereco,
				endereco_num: numero,
				bairro: bairro,
				complemento: complemento,
				estado: estado,
				cidade: cidade,
				facebook: facebook,
				instagram: instagram,
				token: value,
				id: context.user.id
			}
			await helpersUser.UpdateUser(payload)
			const me = await helpersUser.GetUser(value)
            context.defineUser({ data: { ...me.data, token: value } })
		} catch (e) {
			console.log(e)
		}finally{
			setLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
			<ScrollView style={{ flex: 1, backgroundColor: Primary }}>
				<View style={{ backgroundColor: Background }}>
					<View>
						<TouchableOpacity onPress={() => navigation.navigate('Home')}>
							<ImageBackground
								style={{ width: '100%', height: 64, flexDirection: "row" }}
								source={require('../../assets/images/header.png')}
							>
								<View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
									<Icon name="arrow-back" size={30} color={Primary} onPress={() => navigation.goBack()} />
								</View>
								<View style={{ flex: 1, alignItems: 'flex-end' }}>
									<TouchableOpacity style={styles.menu} onPress={() => navigation.openDrawer()}>
										<Image
											style={{ width: 20, height: 20 }}
											source={require("../../assets/images/menuBlack.png")}
											resizeMode="contain"
										/>
									</TouchableOpacity>
								</View>
							</ImageBackground>
						</TouchableOpacity>
						<View style={{ borderWidth: 0.3, borderColor: '#D0D0D0' }} />
					</View>
					<View style={{ height: 500, backgroundColor: Primary }}>
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<Icon name="person-circle-outline" size={120} color={'white'} />
							<View style={{}}>
								<Text style={{ color: 'white', textAlign: 'center' }}>
									{context?.user?.fullname}
								</Text>
								<Text style={{ color: 'white', textAlign: 'center' }}>
									{context?.user?.username}
								</Text>
							</View>
						</View>
						<View style={{ flex: 1, justifyContent: "space-evenly" }}>
							<TouchableOpacity style={styles.containerItem} onPress={() => context.user.username ? navigation.navigate("AdRegistrationOne") : navigation.navigate("Login")}>
								<View style={styles.containerIcone}>
									<Icon name="add-circle-outline" size={45} color={'white'} />
								</View>
								<View style={{ justifyContent: "center" }}>
									<Text style={styles.txtAuncios}>
										Anunciar meu carro
									</Text>
								</View>
							</TouchableOpacity>
							<View style={styles.containerItem}>
								<View style={styles.containerIcone}>
									<Icon name="car-sport-outline" size={45} color={'white'} />
								</View>
								<TouchableOpacity style={{ justifyContent: "center" }} onPress={() => navigation.navigate('SearchResult', { item: 'Meus anúncios', condicao: '', rota: 'user', categoria: '' })}>
									<Text style={{ fontFamily: MSBold, fontSize: 32, color: 'white' }}>
										{records.grid?.records}
									</Text>
									<Text style={styles.txtAuncios}>
										Meus anúncios
									</Text>
								</TouchableOpacity>
							</View>
							{/*<View style={styles.containerItem}>
							<View style={styles.containerIcone}>
								<Icon name="reader-outline" size={45} color={'white'} />
							</View>
							<View style={{justifyContent: "center"}}>
								<Text style={styles.txtAuncios}>
								  Minha página
								</Text>
							</View>
						</View>*/}
						</View>
					</View>
					<View style={{ padding: 24 }}>
						<View style={{ flexDirection: "row", alignItems: 'center' }}>
							<Text style={{ fontFamily: MSBold, fontSize: 26 }}>
								Meus Dados
							</Text>
							{/*<Text style={{fontFamily: MSMedium, fontSize: 14, color: Primary, paddingLeft: 15}}>
						  Minha Loja
						</Text>*/}
						</View>
						<Text style={{ paddingTop: 30, fontFamily: MSSemiBold, fontSize: 16 }}>
							Geral
						</Text>
						<View style={{ paddingTop: 20 }}>
							<TextInput
								value={nome}
								onChangeText={value => setNome(value)}
								placeholder="Nome"
								editable={false}
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={sobrenome}
								onChangeText={value => setSobrenome(value)}
								placeholder="Sobrenome"
								editable={false}
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={whatsApp}
								onChangeText={value => setWhatsApp(value)}
								placeholder="Whatsapp"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={telefone}
								onChangeText={value => setTelefone(value)}
								placeholder="Telefone"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={cpf}
								onChangeText={value => setCpf(value)}
								placeholder="CPF"
								editable={false}
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={email}
								onChangeText={value => setEmail(value)}
								placeholder="Email"
								editable={false}
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={cep}
								onChangeText={value => setCep(value)}
								placeholder="CEP"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={endereco}
								onChangeText={value => setEndereco(value)}
								placeholder="Endereço"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={numero}
								onChangeText={value => setNumero(value)}
								placeholder="Número"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={bairro}
								onChangeText={value => setBairro(value)}
								placeholder="Bairro"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={complemento}
								onChangeText={value => setComplemento(value)}
								placeholder="Complemento"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={estado}
								onChangeText={value => setEstado(value)}
								placeholder="Estado"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={cidade}
								onChangeText={value => setCidade(value)}
								placeholder="Cidade"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={facebook}
								onChangeText={value => setFacebook(value)}
								placeholder="Facebook"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
							<TextInput
								value={instagram}
								onChangeText={value => setInstagram(value)}
								placeholder="Instagram"
								placeholderColor={'#727272'}
								style={styles.input}
							/>
						</View>
						<View style={{ flex: 1, alignItems: 'center', flexDirection: "row", paddingTop: 20 }}>
							<BouncyCheckbox
								size={25}
								isChecked={changeSenha}
								fillColor={Primary}
								unfillColor="#FFFFFF"
								iconStyle={{ borderColor: Primary }}
								onPress={(isChecked) => setChangeSenha(isChecked)}
							/>
							<Text style={{ paddingRight: 24, fontFamily: MSRegular, color: '#727272', fontSize: 14 }}>
								Trocar senha
							</Text>
						</View>
						<Text style={{ paddingTop: 30, fontFamily: MSSemiBold, fontSize: 16 }}>
							Senha
						</Text>
						<View style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 }}>
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
						<View style={{ flexDirection: "row", alignItems: "center", paddingTop: 80 }}>
							<TouchableOpacity
								style={[styles.btn, { backgroundColor: Primary, marginRight: 5 }]}
								onPress={() => atualizarUsuario()}
								disabled={loading}
							>
								{
									loading ? <ActivityIndicator color={'white'} /> : <Text style={[styles.txtBtn, { color: 'white' }]}>
										REGISTRAR
									</Text>
								}
							</TouchableOpacity>
							<TouchableOpacity style={[styles.btn, { borderColor: Primary, borderWidth: 1, borderLeft: 5 }]} onPress={() => navigation.goBack()}>
								<Text style={[styles.txtBtn, { color: Primary }]}>
									VOLTAR
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<Footer
						press={() => navigation.navigate('Home')}
						anunciar={() => navigation.navigate("AdRegistrationOne")}
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
	containerItem: {
		borderWidth: 1,
		borderColor: 'white',
		height: 80,
		marginHorizontal: 40,
		borderRadius: 10,
		//padding: 15,
		flexDirection: "row"
	},
	containerIcone: {
		backgroundColor: '#A60000',
		height: 48,
		width: 48,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		margin: 15,
	},
	txtAuncios: {
		fontFamily: MSRegular,
		fontSize: 16,
		color: 'white'
	},
	input: {
		height: 48,
		backgroundColor: '#E9E9E9',
		width: '100%',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginTop: 7
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
})

export default Profile;

