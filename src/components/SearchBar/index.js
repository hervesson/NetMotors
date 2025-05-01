import React, {useState, useEffect} from 'react';
import { View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	ImageBackground,
	FlatList,
	ActivityIndicator, } from 'react-native'
import {
	Background,
	Primary,
	BackgroundInput,
	MSSemiBold,
	MSRegular,
	MSBold,
	MSMedium,
} from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchBar = (props) => {
	const [text, onChangeText] = useState('');
	const [background, setBackground] = useState([]);

	const cond = background.length > 0 ? background[0] : ''

	return (
		<View style={styles.search}>
			<Text style={styles.txtSearch}>
						Qual o tipo de carro que voce procura?
					</Text>
					<View style={styles.ctnTipoCarro}>
						<TouchableOpacity
							style={[
								styles.botoes,
								{backgroundColor: background.includes('new') ? Primary : BackgroundInput, marginRight: 5},
							]}
							onPress={() => background.includes('new') ? setBackground([]) : setBackground(['new'])}
						>
							<Text style={[styles.txtTipoCarro, {color: background.includes('new') ? 'white' : '#969696'}]}>Novo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.botoes,
								{backgroundColor: background.includes('used') ? Primary : BackgroundInput, marginRight: 5},
							]}
							onPress={() => background.includes('used') ? setBackground([]) : setBackground(['used'])}
						>
							<Text style={[styles.txtTipoCarro, {color: background.includes('used') ? 'white' : '#969696'}]}>Usado</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.ctnInput}>
						<TextInput
							style={styles.txtTipoCarro}
							onChangeText={onChangeText}
							value={text}
							placeholder="Digite a marca ou o modelo do veículo"
							placeholderTextColor="#969696"
						/>
						<Icon name="search-outline" size={30} color={Primary} />
					</View>
					<TouchableOpacity
						style={[styles.btnSearch, styles.shadowProp]}
						onPress={() => props.press(text, cond)}
					>
						<Text style={styles.txtBotao}>VER OFERTAS (52.949)</Text>
					</TouchableOpacity>
				</View>
	)
}

const styles = StyleSheet.create({
	area: {
		flex: 1,
		backgroundColor: Background,
	},
	scrollView: {
		flex: 1,
	},
	search: {
		marginHorizontal: 24,
		height: 283,
		backgroundColor: '#FFF',
		marginTop: -90,
		borderRadius: 5,
		paddingHorizontal: 16,
		paddingVertical: 32,
	},
	txtSearch: {
		color: '#696969',
		fontSize: 15,
		fontFamily: MSSemiBold,
	},
	ctnTipoCarro: {
		paddingTop: 16,
		flexDirection: 'row',
	},
	ctnInput: {
		marginTop: 8,
		height: 56,
		backgroundColor: BackgroundInput,
		borderRadius: 5,
		justifyContent: 'center',
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	botoes: {
		flex: 1,
		height: 49,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	btnSearch: {
		backgroundColor: Primary,
		height: 56,
		marginTop: 16,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	txtTipoCarro: {
		fontSize: 14,
		color: '#969696',
		fontFamily: MSRegular,
	},
	txtBotao: {
		color: 'white',
		fontSize: 15,
		fontFamily: MSBold,
	},
	txtCategories: {
		paddingLeft: 24,
		paddingTop: 32,
		fontSize: 16,
		color: '#424242',
		fontFamily: MSMedium,
	},
	listagem: {
		paddingTop: 16,
		paddingLeft: 24,
	},
	shadowProp: {
		shadowColor: Primary,
		shadowOffset: {width: 0, height: 0},
		shadowOpacity: 0.9,
		shadowRadius: 6,
	},
	ctnLabel: {
		paddingTop: 32,
		paddingLeft: 24,
	},
	label: {
		fontFamily: MSRegular,
		fontSize: 16,
		color: '#424242',
	},
	subLabel: {
		fontFamily: MSSemiBold,
		fontSize: 16,
		color: '#424242',
	},
	description: {
		fontFamily: MSRegular,
		fontSize: 12,
		color: '#636363',
		paddingRight: 100,
	},
	menu: {
		borderColor: '#961010',
		borderWidth: 1,
		borderRadius: 5,
		height: 40,
		width: 40,
		marginTop: 12,
		marginLeft: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
});