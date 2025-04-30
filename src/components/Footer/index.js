import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import { MSRegular, MSSemiBold, MSMedium, Primary } from "../../styles"

export const Footer = (props) => {

	const handlePress = async (url) => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
         await Linking.openURL(url);
      } else {
         Alert.alert(`Don't know how to open this URL: ${url}`);
      }
   }

	return (
		<View style={{flex: 1}}>
			<View style={styles.containerFinal}>
				<View style={{height: 208, justifyContent: "space-between"}}>
					<TouchableOpacity style={styles.btnSpeedActions} onPress={() => props.anunciar()}>
						<View style={{flex: 2, justifyContent: "center"}}>
							<Text style={styles.txtFastActions}>
								Quero anunciar
							</Text>
						</View>
						<View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
							<Text style={{fontSize: 50, fontFamily: MSRegular, color: "white"}}>
								+
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnSpeedActions} onPress={() => handlePress('https://www.netmotors.com.br/carros/pesquisar')}>
						<View style={{flex: 2, justifyContent: "center"}}>
							<Text style={styles.txtFastActions}>
								Quero Comprar
							</Text>
						</View>
						<View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
							<Text style={{fontSize: 50, fontFamily: MSRegular, color: "white"}}>
								+
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btnSpeedActions} onPress={() => handlePress('https://www.netmotors.com.br/contato')}>
						<View style={{flex: 2, justifyContent: "center"}}>
							<Text style={styles.txtFastActions}>
								Comunicação
							</Text>
						</View>
						<View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
							<Text style={{fontSize: 50, fontFamily: MSRegular, color: "white"}}>
								+
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{paddingTop: 80}}>
					<Text style={{fontFamily: MSRegular, fontSize: 14,	color: "#FFA3A3"}}>
						O parceiro que anuncia nesta página é o único responsável pelas transações comerciais que realizar com usuários do web site da Netmotors. A comercialização do produto anunciado, bem como a garantia de sua legítima procedência, é de inteira responsabilidade do anunciante, não sendo a Netmotors responsável por quaisquer danos diretos e/ou indiretos causados a terceiros, advindos da exibição dos anúncios em desacordo com o Código de Defesa do Consumidor e outras legislações aplicáveis ao comércio e/ou prestação de serviços por parte do anunciante. Para oferecer uma melhor experiência de navegação, a Netmotors utiliza cookies. Ao navegar pelo site você concorda com o uso de cookies, com a "Política de Privacidade" e os "Termos de Uso".
					</Text>
				</View>
			</View>
			<View style={{height: 80, backgroundColor: "#404040", justifyContent: "center", alignItems: "center"}}>
				<Text style={styles.autores}>
					Copyright © 2021. Desenvolvido por i9TV - 
				</Text>
				<Text style={styles.autores}>
					Todos os direitos reservados.
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	containerFinal:{
  		backgroundColor: Primary,
  		height: 859,
  		//marginTop: 68,
  		paddingHorizontal: 24,
  		paddingTop: 65
  	},
  	btnSpeedActions: {
  		borderWidth: 1.5,
  		borderColor: "white",
  		borderRadius: 10,
  		height: 64,
  		paddingHorizontal: 20,
  		flexDirection: "row"
  	},
  	txtFastActions: {
  		fontFamily: MSSemiBold,
  		fontSize: 16,
  		color: "white"
  	},
  	autores: {
  		fontFamily: MSRegular,
  		fontSize: 14,
  		color: "white"
  	},
})
