import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { MSBold, MSRegular, MSMedium, MSSemiBold } from "../../styles"

export const Acessorios = (props) => {
	const [acessorios, setAcessorios] = useState([]);

	useEffect(() => {
		if(props.features?.options_features !== null){
			props.features?.options_features?.split(',').forEach(ids => tratar(ids))
		}
	}, [props.features])

	const tratar = (ace) => {
	   switch (ace) {
	      case '1':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{	nome : 'Freios ABS', url: require("../../assets/icones/freiosabs.png") }
	         ])
	      break;
	      case '2':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{	nome : 'Engate' }
	         ])
	      break;
	      case '3':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Direção elétrica', url: require("../../assets/icones/direcao.png") }
	         ])
	      break;
	      case '4':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Direção hidraulica', url: require("../../assets/icones/direcao.png") }
	         ])
	      break;
	      case '5':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{nome : 'Vidros eletricos' }	
	         ])
	      break;
	      case '7':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Alarme',	url: require("../../assets/icones/alarm.png") }
	         ])
	      break;
	      case '9':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Central Multimidia' }
	         ])
	      break;
	      case '9':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'CD player MP3' }
	         		
	         ])
	      break;
	      case '11':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'DVD player' }
	         ])
	      break;
	      case '12':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Air bags', url: require("../../assets/icones/air-bag.png") }
	         ])
	      break;
	      case '13':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Air bags laterais' }
	         ])
	      break;
	      case '14':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Faróis de milha' }
	         ])
	      break;
	      case '17':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Ar-condicionado' }
	         ])
	      break;
	      case '19':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'GPS' }
	         ])
	      break;
	      case '20':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Outros' }
	         ])
	      break;
	      case '21':
	         setAcessorios((prev) => [
	         	...prev, 
	         	{ nome : 'Air bags traseiros' }
	         ])
	      break;
	      default: return null
	   }
	}

	return (
		<>
			<View style={{height: 348, backgroundColor: "white", paddingHorizontal: 24}}>	
				<Text style={[styles.tituloItem, {paddingTop: 16}]}>
					Acessórios
				</Text>
				<Text style={{paddingTop: 8, fontFamily: MSRegular, color: "#727272", fontSize: 14}}>
					Veja os itens que acompanha o veículo
				</Text>
				<View style={{flex:1,  marginTop: 13, flexDirection: 'row',	flexWrap: 'wrap'}}>
				{
				 	acessorios.map((item, index) => {
				 		return (							
							<View style={styles.cntItem} key={index}>
								<Image
									style={{height: 19, width: 16}}
									source={item.url}
									resizeMode="cover"
								/>
								<View style={{paddingLeft: 8}}>
									<Text style={styles.labelAcessorios}>
										{item.nome}
									</Text>
								</View>
							</View>
				 		)
				 	})
				}
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	icones: {
  		width: 16, 
  		height: 16
  	},
  	cntItem: {
  		alignItems: "center",
  		flexDirection: "row",
  		width: '50%',
  		paddingTop: 10
  	},
  	label: {
  		fontFamily: MSMedium, 
  		color: "#424242", 
  		fontSize: 12
  	},
  	descricaoItem: {
  		fontFamily: MSSemiBold, 
  		color: "#373737", 
  		fontSize: 18
  	},
  	tituloItem: {
  		fontFamily: MSBold, 
  		color: "#424242", 
  		fontSize: 24
  	},
  	labelAcessorios: {
  		fontFamily: MSMedium, 
  		color: "#373737", 
  		fontSize: 14
  	},
})

{/*
							<View style={styles.container}>
									<View style={styles.cntItem}>
										<Image
											style={{height: 19, width: 16}}
											source={require("../../assets/icones/air-bag.png")}
											resizeMode="cover"
										/>
										<View style={{paddingLeft: 8}}>
											<Text style={styles.labelAcessorios}>
												Ar Cond.
											</Text>
										</View>
									</View>
									<View style={styles.cntItem}>
										<Image
											style={{height: 20, width: 20}}
											source={require("../../assets/icones/direcao.png")}
											resizeMode="cover"
										/>
										<View style={{paddingLeft: 8}}>
											<Text style={styles.labelAcessorios}>
												Direcao Hidráulica
											</Text>
										</View>
									</View>
								</View>
								<View style={styles.container}>
									<View style={styles.cntItem}>
										<Image
											style={{height: 20, width: 24}}
											source={require("../../assets/icones/freiosabs.png")}
											resizeMode="cover"
										/>
										<View style={{paddingLeft: 8}}>
											<Text style={styles.labelAcessorios}>
												Freios ABS
											</Text>
										</View>
									</View>
									<View style={styles.cntItem}>
										<Image
											style={{height: 18, width: 24}}
											source={require("../../assets/icones/sensorEsta.png")}
											resizeMode="cover"
										/>
										<View style={{paddingLeft: 8}}>
											<Text style={styles.labelAcessorios}>
												Sensor de Estacionamento
											</Text>
										</View>
									</View>
								</View>
*/}