import React, { useState, useContext } from 'react'
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { Footer } from "../../components"
import { Background, MSBold, MSRegular, Primary, MSSemiBold } from "../../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"

//context
import AuthContext from "../../contexts/auth";

const Login = (props) => {
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")
	const navigation = useNavigation()
	const context = useContext(AuthContext);


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
			<ScrollView style={{ flex: 1, backgroundColor: Primary }}>
				<View style={{ backgroundColor: Background }}>
					<ImageBackground
						style={{ width: '100%', height: 64, flexDirection: 'row' }}
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
					<View style={{ height: 430, backgroundColor: "white", marginTop: 40, paddingHorizontal: 24 }}>
						<View style={{ height: 40, justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
							<Text style={{ color: "#404040", fontSize: 15, fontFamily: MSBold }}>
								FAÇA LOGIN NA SUA CONTA
							</Text>
							<Text style={{ color: "#404040", fontSize: 14, fontFamily: MSRegular }}>
								Login com seu Usuário.
							</Text>
						</View>
						<View style={{ height: 180, justifyContent: "space-between", marginTop: 30 }}>
							<View style={{}}>
								<Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
									USUÁRIO
								</Text>
								<TextInput
									autoCapitalize='none'
									value={user}
									onChangeText={value => setUser(value)}
									style={{ height: 53, backgroundColor: "#e9e9e9", borderRadius: 5, marginTop: 10, paddingHorizontal: 15 }}
									placeholder="Digite seu E-mail, CPF ou CNPJ"
									placeholderTextColor="#727272"
								/>
							</View>
							<View style={{}}>
								<Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
									SENHA
								</Text>
								<TextInput
									autoCapitalize='none'
									value={password}
									onChangeText={value => setPassword(value)}
									style={{ height: 56, backgroundColor: "#e9e9e9", borderRadius: 5, marginTop: 10, paddingHorizontal: 15 }}
									placeholder="Senha"
									placeholderTextColor="#727272"
								/>
							</View>
						</View>
						<Text style={{ color: Primary, textAlign: "right", fontSize: 15, fontFamily: MSSemiBold }} onPress={() => navigation.navigate("ForgotPassword")}>
							Esqueci minha senha
						</Text>
						<View style={{ marginTop: 30 }}>
							<TouchableOpacity
								style={{ backgroundColor: Primary, height: 56, borderRadius: 5, justifyContent: "center", alignItems: "center" }}
								onPress={() => context.handleLogin(user, password)}
								disabled={context.loading}
							>
								{
									context.loading ? <ActivityIndicator color={"white"}/> : <Text style={{ color: "white", fontSize: 15, fontFamily: MSSemiBold }}>
										Entrar
									</Text>
								}
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: "row", marginTop: 10 }}>
							<Text style={{ color: "#727272", fontSize: 13, fontFamily: MSSemiBold }}>
								Nao tem cadastro ainda?
							</Text>
							<TouchableOpacity style={{ marginRight: 24 }} onPress={() => navigation.navigate('PersonType')}>
								<Text style={{ color: Primary, fontSize: 13, fontFamily: MSSemiBold }}>
									{" "} COMEÇAR AGORA
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<Footer
						press={() => navigation.navigate('Home')}
						anunciar={() => context?.user?.username ? navigation.navigate("AdRegistrationOne") : navigation.navigate("Login")}
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
	}
})

export default Login;

