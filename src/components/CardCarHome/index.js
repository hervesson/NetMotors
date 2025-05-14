import React, {useState} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Image,
	Animated
} from 'react-native';
import { MSRegular, MSSemiBold, MSMedium, Primary } from '../../styles';

import Icon from 'react-native-vector-icons/Ionicons';

export const CardCarHome = props => {
	const [opacity, setOpacity] = useState(new Animated.Value(0))

	const favoritos = props?.favoritos?.map(ids => {return ids.id})


	function onLoad(event){
    	Animated.timing(opacity, {
      	toValue: 1,
     	 	duration: 300,
     	 	useNativeDriver: true
    	}).start();
  	}

	return (
		<Pressable style={styles.container} onPress={() => props.onPress(props.item)}>
			<View style={{flexDirection: 'row'}}>
				<View style={{flex: 5}}>
					<Text style={{fontFamily: MSMedium, fontSize: 12, color: Primary}}>
						{props.item.marca}
					</Text>
					<Text style={{fontFamily: MSSemiBold, fontSize: 20, color: '#424242'}} numberOfLines={1}>
						{props.item.modelo}
					</Text>
				</View>
				<View style={{flex: 1, alignItems: 'flex-end'}}>
					<Pressable
						style={{
							height: 40,
							width: 40,
							backgroundColor: '#eb8f8f',
							borderRadius: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}
						onPress={() => favoritos?.includes(props.item.id) ? props.remover(props.item) : props.adicionar(props.item)}
					>
						<Icon name={favoritos?.includes(props.item.id) ? "star" : "star-outline"} size={20} color={Primary} /> 
					</Pressable>
				</View>
			</View>
			<View style={{width: 268, height: 174}}>
				<Image
			      source={require('../../assets/images/volante.png')}
			      style={{width: 268, height: 174, marginTop: 8}}
			   />
				<Animated.Image
					style={{width: 268, height: 174, marginTop: 8, position: 'absolute', opacity: opacity}}
					source={{uri: props.item.fotos[0]}}
					resizeMethod="resize" 
					onLoad={onLoad()}
				/>
			</View>
			<View style={{flex: 2, justifyContent: 'space-evenly'}}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Image
						style={{width: 13, height: 9}}
						source={require('../../assets/icones/motor.png')}
						resizeMode="cover"
					/>

					<Text style={styles.txtdescriptionCar}>{props.item.versão}</Text>
				</View>

				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1, flexDirection: "row"}}>
						<Image
							style={{width: 11, height: 16}}
							source={require('../../assets/icones/cambio.png')}
							resizeMode="cover"
						/>
						<Text style={styles.txtdescriptionCar} numberOfLines={1}>{props.item.transmission}</Text>
					</View>

					<View style={{ flex: 1, flexDirection: "row"}}>
						
							<Image
								style={{width: 13, height: 13, }}
								source={require('../../assets/icones/calendar.png')}
								resizeMode="cover"
							/>
							<Text style={styles.txtdescriptionCar}>{props.item.ano_modelo}</Text>
						
					</View>
					
					<View style={{flex: 1, flexDirection: "row"}}>
						<Image
							style={{width: 16, height: 14}}
							source={require('../../assets/icones/kms.png')}
							resizeMode="cover"
						/>
						<Text style={styles.txtdescriptionCar}>{props.item.mileage} km</Text>
					</View>
					
				</View>
			</View>
			<View style={{flexDirection: 'row'}}>
				<View style={{flex: 1, justifyContent: 'center'}}>
					<Text
						style={{fontFamily: MSSemiBold, fontSize: 16, color: '#424242'}}
					>
						{props.item.price}
					</Text>
				</View>
				<View style={{flex: 1}}>
					<View style={styles.btnDetails}>
						<Text style={{fontFamily: MSSemiBold, fontSize: 12, color: '#FFF'}}>
							+ Mais Detalhes
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 382,
		marginRight: 13,
		backgroundColor: 'white',
		borderRadius: 5,
		paddingTop: 24,
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	subContainer: {
		paddingLeft: 19,
		paddingBottom: 19,
	},
	title: {
		fontFamily: MSRegular,
		color: 'white',
	},
	subTitle: {
		fontFamily: MSSemiBold,
		color: 'white',
	},
	btnDetails: {
		height: 40,
		backgroundColor: '#CB2525',
		borderRadius: 5,
		opacity: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	txtdescriptionCar: {
		fontFamily: MSSemiBold,
		fontSize: 12,
		color: '#636363',
		flex: 1,
		paddingLeft: 5,
	},
});

export default CardCarHome;
