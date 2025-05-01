import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, FlatList, ImageBackground, TouchableOpacity, BackHandler, Animated, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Background, MSBold, Primary, MSRegular, MSMedium, MSSemiBold } from "../../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import {HelpersAnuncios} from '../../helpers';
const anunciosHelpers = new HelpersAnuncios();

const SearchResult = (props) => {
	const [opacity, setOpacity] = useState(new Animated.Value(0));
	const [resultados, setResultados] = useState([]);
	const [pageResultados, setPageResultados] = useState(1);
	const [loadingResultados, setLoadingResultados] = useState(false);

	const navigation = useNavigation();
	const route = useRoute();

	const { item, condicao, rota, nome, categoria } = route.params;

	const title = rota == "filtros" || "detalhe" ? nome : item

	// const favoritos = props.favoritos.map(ids => {return ids.id})
    const favoritos = []

	useEffect(() => {
		setResultados([])
		setPageResultados(1)
		setLoadingResultados(false)
		buscar(); 
	}, [item])

	const buscar = () => {
		switch(rota){
			case 'categoria':
		    	buscarAnuncios()
		   break;
		   case 'home':
		    	buscarAnuncios()
		   break;
		   case 'filtros':
		    	buscarAnuncios()
		   break;
		   case 'user':
		    	buscarMeusAnuncios(props.user.id)
		   break;
		   case 'detalhe':
		    	buscarMeusAnuncios(item.toString())
		   break;
		}
	}
	

	const buscarAnuncios = () => {
		var str = rota == 'categoria' ? '' : item.toString().replace(/\s/g, '');
		setLoadingResultados(true)
		anunciosHelpers.SearchAnuncios(str, 1, condicao, categoria).then(response => {
			setResultados(response.data.rows);
			setPageResultados(pageResultados + 1)
			setLoadingResultados(false);
		});
	}

	const buscarNovosAnuncios = () => {
		var str = rota == 'categoria' ? '' : item.toString().replace(/\s/g, '');
		setLoadingResultados(true)
		anunciosHelpers.SearchAnuncios(str, pageResultados, condicao, categoria).then(response => {
			setResultados([...resultados, ...response.data.rows]);
			setPageResultados(pageResultados + 1)
			setLoadingResultados(false);
		});
	}

	const buscarMeusAnuncios = (userId) => {
		setLoadingResultados(true)
		anunciosHelpers.GetMyAnuncios(userId, 1).then(response => {
			setResultados(response.data.rows);
			setPageResultados(pageResultados + 1)
			setLoadingResultados(false);
		});
	}

	const buscarMaisMeusAnuncios = (userId) => {
		setLoadingResultados(true)
		anunciosHelpers.GetMyAnuncios(userId, 1).then(response => {
			setResultados([...resultados, ...response.data.rows]);
			setPageResultados(pageResultados + 1)
			setLoadingResultados(false);
		});
	}

	const filtros = () => {
		navigation.navigate('Filtros', {item: title})
	}

	function onLoad(event){
    	Animated.timing(opacity, {
      	toValue: 1,
     	 	duration: 300,
     	 	useNativeDriver: true
    	}).start();
  	}

   const excluirAnuncio = (anuncioId) => {
		anunciosHelpers.deletarAnuncio(anuncioId).then(() => {
			buscarMeusAnuncios(props.user.id);
		});
   }

	const HeaderComponent = () => {
		return(
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
				<View style={{backgroundColor: "white",  width: '100%', height: 80, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 24}}>
					<Icon name="search-outline" size={20} color={Primary} />
					<Text style={styles.txtCar}>
					  	{rota == 'filtros' ? nome : rota == "detalhe" ? nome : item }
					</Text>
				</View>
				{
					rota == "user" ? null : <View 
							style={{width: '100%', height: 70, flexDirection: "row", alignItems: "center", paddingHorizontal: 24, justifyContent: 'flex-end'}}
						>
						<TouchableOpacity 
							style={{height: 37, width: 37, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}
							onPress={() => filtros()}
						>
							<Icon name="filter" size={15} color={Primary} /> 
						</TouchableOpacity>
					</View>
				}
			</View>
		)
	};


	const renderFooter = (loading) => {
  		if (!loading) return null;
  		return (
    		<View style={{height: 203, justifyContent: 'center'}}>
      		<ActivityIndicator />
    		</View>
  		);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate("Detalhe", {item: JSON.stringify(item), rota: 'detalhes', title: title})}>
			<View style={{paddingTop: 10, paddingHorizontal: 10}}>
				<View style={{flexDirection: "row"}}>
					<View style={{flex: 2, justifyContent: "space-between", height: 24}}>
						<Text style={{fontFamily: MSMedium, fontSize: 8, color: Primary}}>
						  {item.marca}
						</Text>
						<Text style={{fontFamily: MSSemiBold, fontSize: 14, color: "#424242"}}>
						  {item.modelo}
						</Text>
					</View>
					<View style={{flex: 1, justifyContent: "flex-end", flexDirection: 'row'}}>
                  {
                     rota == "user" ? <TouchableOpacity 
							   style={{height: 24, width: 24, marginRight: 10, backgroundColor: "#eb8f8f", borderRadius: 5, justifyContent: "center", alignItems: "center"}}
							   onPress={() => excluirAnuncio(item.id)}
					      >
			  		   	   <Icon name="close-outline" size={20} color={Primary} />
			  		      </TouchableOpacity> : null
                  }
						<TouchableOpacity 
							style={{height: 24, width: 24, backgroundColor: "#eb8f8f", borderRadius: 5, justifyContent: "center", alignItems: "center"}}
							onPress={() => 
								favoritos.includes(item.id) ?
								props.remove_favorito(props.favoritos.filter(pares => pares.id !== item.id)) 
								:
								props.add_favorito([...props.favoritos, item])
							}
						>
			  				<Icon name={favoritos.includes(item.id) ? "star" : "star-outline"} size={15} color={Primary} />
			  			</TouchableOpacity>
					</View>
				</View>
				<View style={{height: 228, width: '100%', marginTop: 5,}}>
					<Image
				      source={require('../../assets/images/volante.png')}
				      style={{height: 228, width: '100%', marginTop: 5, borderRadius: 3}}
				   />
					<Animated.Image
						style={{ height: 228, width: '100%', marginTop: 5, borderRadius: 3, position: 'absolute', opacity: opacity}} 
						resizeMethod="resize" 
						source={{uri: item.fotos ? item.fotos[0] : null }} 
						onLoad={onLoad()}
					/>
				</View>
				<View style={{height: 40, justifyContent: "space-between", marginTop: 10}}>
					<View style={styles.description}>
						<Image
						  style={{width: 13, height: 9}}
						  source={require("../../assets/icones/motor.png")}
						  resizeMode="contain"
						/>
						<Text style={styles.txtdescriptionCar}>
				  			{item.versão}
						</Text>
					</View>

					<View style={{flexDirection: "row"}}>
						<View style={styles.description}>
							<Image
							  style={{width: 13, height: 13}}
							  source={require("../../assets/icones/calendar.png")}
							  resizeMode="cover"
							/>
							<Text style={styles.txtdescriptionCar}>
						  		{item.ano_modelo}
							</Text>
						</View>
						<View style={styles.description}>
							<Image
							  style={{width: 11, height: 16}}
							  source={require("../../assets/icones/cambio.png")}
							  resizeMode="cover"
							/>
							<Text style={styles.txtdescriptionCar}>
						  		{item.transmission}
							</Text>
						</View>
						<View style={styles.description}>
							<Image
							  style={{width: 16, height: 14}}
							  source={require("../../assets/icones/kms.png")}
							  resizeMode="cover"
							/>
							<Text style={styles.txtdescriptionCar}>
						  		{item.mileage}
							</Text>
						</View>
					</View>

				</View>
				<View style={{paddingVertical: 8, justifyContent: "center"}}>
					<Text style={{fontFamily: MSBold, fontSize: 14, color: "black"}}>
				  		{item.price}
					</Text>
				</View>
			</View>
			
			<View style={styles.detalhes}>
				<Text style={{fontFamily: MSSemiBold, fontSize: 10, color: "white"}}>
				   + Detalhes
				</Text>
			</View>
		</TouchableOpacity>
  	);

  	const EmptyComponent = () => {
  		return loadingResultados ? null : <View style={{ alignItems: "center"}}>
	  		<Text style={{fontFamily: MSSemiBold, fontSize: 16, color: '#424242', paddingVertical: 20}}>
				Desculpe, mas não encontramos nenhum anúncio
			</Text>
	  	</View>
  	}

	return (
		<SafeAreaView style={{backgroundColor: Primary, flex: 1}}>
			<View style={{backgroundColor: Background}}>
				<FlatList
			      data={resultados}
			      renderItem={renderItem}
			      ListEmptyComponent={EmptyComponent}
			      keyExtractor={item => item.id}
			      ListHeaderComponent={()=> <HeaderComponent />}
	        		numColumns={1}
	        		onEndReached={({ distanceFromEnd }) => {
	        			if (distanceFromEnd < 0) return;
					      rota == "user" ? buscarMaisMeusAnuncios(item) : buscarNovosAnuncios();
					 	}}
	  				onEndReachedThreshold={0.1}
	  				ListFooterComponent={renderFooter(loadingResultados)}
			   />
		  	</View>
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
  	steps: {
  		color: "#727272",
		fontSize: 14,
		fontFamily: MSRegular
  	},
  	containerItem: {
  		flex: 1,
  		height: 382,
  		backgroundColor: "white",
  		borderRadius: 5,
  		marginHorizontal: 24,
  		marginVertical: 8	
  	},
  	description: {
  		flexDirection: "row",
  		//alignItems: "center",
  		flex: 1
  	},
  	txtdescriptionCar: {
   	fontFamily: MSSemiBold, 
   	fontSize: 10, 
   	color: "#636363",
   	flex: 1,
   	paddingLeft: 5
   },
   detalhes: {
   	height: 30, 
   	justifyContent: "center", 
   	backgroundColor: "#CB2525", 
   	alignItems: "center",
   	borderBottomLeftRadius: 5,
   	borderBottomRightRadius: 5
   },
   centeredView: {
    	flex: 1,
    	justifyContent: "center",
    	alignItems: "center",
    	marginTop: 22
  	},
  	modalView: {
    	margin: 20,
    	backgroundColor: "white",
    	borderRadius: 20,
    	padding: 35,
    	alignItems: "center",
    	shadowColor: "#000",
    	shadowOffset: {
      	width: 0,
      	height: 2
    	},
    	shadowOpacity: 0.25,
    	shadowRadius: 4,
    	elevation: 5
  	},
})


export default SearchResult;