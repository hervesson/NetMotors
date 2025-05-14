import React, { useEffect, useState, useContext } from 'react';
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	ImageBackground,
	FlatList
} from 'react-native';
import {
	Background,
	Primary,
	BackgroundInput,
	MSSemiBold,
	MSRegular,
	MSBold,
	MSMedium,
} from '../../styles';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

//Listagens
import { Categorias, SearchBar, CardCarHome, Footer } from '../../components';

import { HelpersAnuncios } from "../../helpers"
const anunciosHelpers = new HelpersAnuncios();

const Home = (props) => {
	const [abaixoFipe, setAbaixoFipe] = useState([])
	const [adicionadosRecentemente, setAdicionadosRecentemente] = useState([])
	const navigation = useNavigation();
	const context = useContext(AuthContext)

	useEffect(() => {
		const getData = async () => {
			try {
				const [abaixoFipeResult, adicionadosRecentementeResult] = await Promise.all([
					anunciosHelpers.GetAbaixoFipe(),
					anunciosHelpers.GetAdicionadosRecentemente(),
				]);

				setAbaixoFipe(abaixoFipeResult.data.rows);
				setAdicionadosRecentemente(adicionadosRecentementeResult.data.rows);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			}
		};

		getData()
	}, []);

	return (
		<SafeAreaView style={styles.area}>
			<ScrollView style={styles.scrollView}>
				<View style={{ backgroundColor: Background }}>
					<ImageBackground
						style={{ height: 332, alignItems: 'flex-end' }}
						source={require('../../assets/images/banner.jpg')}
						resizeMode='cover'
					>
						<TouchableOpacity
							style={styles.menu}
							onPress={() => navigation.openDrawer()}
						>
							{/* <Icon name="menu-outline" size={30} color={'white'} /> */}
							<Image
								style={{ width: 20, height: 20 }}
								source={require('../../assets/images/menuWhite.png')}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</ImageBackground>

					<SearchBar press={(search, condicao) => navigation.navigate('SearchResult', {item: search.length > 0 ? search : "Ofertas" , condicao: condicao, rota: 'home', categoria: ''})}/>

					<Text style={styles.txtCategories}>Categorias</Text>
					<View style={styles.listagem}>
						<Categorias press={(title, search) => navigation.navigate('SearchResult', { item: title, condicao: '', rota: 'categoria', categoria: search })} />
					</View>
					<View style={styles.ctnLabel}>
						<Text style={styles.label}>Carros</Text>
						<Text style={styles.subLabel}>Abaixo da FIPE</Text>
						<Text style={styles.description}>
							Encontre as melhores ofertas de veículos novos e semi-novos na sua região, abaixo da tabela Fipe.
						</Text>
					</View>
					<View style={[styles.listagem, { paddingTop: 32 }]}>
						<FlatList
							data={abaixoFipe}
							renderItem={({ item }) =>
								<CardCarHome
									item={item}
									onPress={(anuncio) => navigation.navigate('Detalhe', { item: JSON.stringify(anuncio), rota: 'card' })}
									favoritos={context.favorites}
									adicionar={(value) => context.adicionarFavorito([...context.favorites, value]) }
									remover={(value) => context.removerFavorito(context.favorites.filter(pares => pares.id !== value.id))}
								/>
							}
							keyExtractor={item => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
					</View>
					<View style={styles.ctnLabel}>
						<Text style={styles.label}>Adicionados</Text>
						<Text style={styles.subLabel}>Recentemente</Text>
					</View>
					<View style={[styles.listagem, { paddingVertical: 32 }]}>
						<FlatList
							data={adicionadosRecentemente}
							renderItem={({ item }) =>
								<CardCarHome
									item={item}
									onPress={(anuncio) => navigation.navigate('Detalhe', { item: JSON.stringify(anuncio), rota: 'card' })}
									favoritos={context.favorites}
									adicionar={(value) => context.adicionarFavorito([...context.favorites, value]) }
									remover={(value) => context.removerFavorito(context.favorites.filter(pares => pares.id !== value.id))}
								/>
							}
							keyExtractor={item => item.id}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
					</View>
					<Footer
						press={() => null}
						anunciar={() => context?.user?.username ? navigation.navigate("AdRegistrationOne") : navigation.navigate("Login")}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	area: {
		flex: 1,
		backgroundColor: Primary,
	},
	scrollView: {
		flex: 1,
		backgroundColor: Primary
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
		shadowOffset: { width: 0, height: 0 },
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
		marginRight: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
});



export default Home