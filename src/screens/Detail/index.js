import React, { useState, useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, FlatList, ImageBackground, Pressable, StyleSheet, Linking, ActivityIndicator, Image, Modal, ScrollView, Tex, PressabletInput } from 'react-native'
import { Background, MSBold, Primary, MSRegular, MSMedium, MSSemiBold } from "../../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Footer } from "../../components"
import AuthContext from '../../contexts/auth';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

import { HelpersAnuncios } from '../../helpers';
const anunciosHelpers = new HelpersAnuncios();

import { Acessorios } from "../../components"

const Detalhe = () => {
    const context = useContext(AuthContext)
    const route = useRoute();
    const navigation = useNavigation();
    const { item, rota, title } = route.params;
    const data = JSON.parse(item)

    const favoritos = context.favorites.map(ids => {return ids.id})

    const [uri, setUri] = useState()
    const [info, setInfo] = useState({})
    const [loading, setLoading] = useState(true);
    const [contt, setContt] = useState(false);
    const [features, setFeatures] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await anunciosHelpers.DetalheAnuncio(data.id)
                setInfo(response.data);
                setUri(response.data.fotos ? response.data.fotos[0] : null);
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        getData()
    }, [item])

    const renderItem = ({ item }) => (
        <Pressable onPress={() => setUri(item)}>

            <Image
                style={{ width: 136, height: 91, marginRight: 2 }}
                source={{ uri: item }}
            />

        </Pressable>
    )

    const handlePress = async (url) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }

    const _pressCall = (telefone) => {
        const url = 'tel://' + telefone
        Linking.openURL(url)
    }

    const whatsapp = (telefone) => {
        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
            if (supported) {
                return Linking.openURL(
                    "whatsapp://send?phone=55" + telefone + "&text=Oi"
                );
            } else {
                return Linking.openURL(
                    "https://api.whatsapp.com/send?phone=55" + telefone + "&text=Oi"
                );
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
            <ScrollView style={{ flex: 1, backgroundColor: Primary }}>
                <View style={{ backgroundColor: Background }}>
                    <ImageBackground
                        style={{ width: '100%', height: 64, flexDirection: "row" }}
                        source={require('../../assets/images/header.png')}
                    >
                        <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }}>
                            <Icon name="arrow-back" size={30} color={Primary} onPress={() => navigation.goBack()} />
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            <Pressable style={styles.menu} onPress={() => navigation.openDrawer()}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require("../../assets/images/menuBlack.png")}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                    </ImageBackground>

                    <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0' }} />
                    {
                        rota === 'card' ? <View style={{ backgroundColor: "white", width: '100%', height: 80, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Text style={styles.txtCar}>
                                DETALHES DO VEÍCULO
                            </Text>
                        </View> 
                        :
                        <View style={{ backgroundColor: "white", width: '100%', height: 80, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Icon name="search-outline" size={20} color={Primary} />
                            <Text style={styles.txtCar}>
                                {title}
                            </Text>
                        </View>
                    }
                    <View>
                        <View style={{ backgroundColor: Background }}>
                            <ImageBackground source={{ uri: uri }} style={{ flex: 1, height: 256 }} />
                            <FlatList
                                data={info.fotos}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index}
                                horizontal
                            />
                        </View>
                        <View style={{ height: 80, backgroundColor: "white", flexDirection: "row", paddingHorizontal: 24, alignItems: "center" }}>
                            <View>
                                <Text style={{ fontFamily: MSSemiBold, fontSize: 24, color: "#424242" }}>
                                    {info.price}
                                </Text>
                                <Text style={{ fontFamily: MSRegular, fontSize: 14, color: "#727272" }}>
                                    Entrar em contato com o anunciante
                                </Text>
                            </View>
                            <Pressable style={{ alignItems: "flex-end", flex: 1 }} onPress={() => setContt(!contt)}>
                                {/*<Icon name={contt ?  'remove-outline' : 'add-outline' } size={40} color={"#424242"} /> */}
                                {
                                    contt ? <Text style={{ fontFamily: MSMedium, fontSize: 11, textAlign: "center", color: Primary }}>
                                        Ocultar contato do vendedor
                                    </Text> : <Text style={{ fontFamily: MSMedium, fontSize: 11, textAlign: "center", color: Primary }}>
                                        Ver contato do vendedor
                                    </Text>
                                }

                            </Pressable>
                        </View>
                        {
                            contt ? <View style={{ paddingHorizontal: 24, justifyContent: 'space-evenly', backgroundColor: 'white' }}>
                                {
                                    info.celular.length > 0 ? <Pressable style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }}
                                        onPress={() => whatsapp(info.celular)}
                                    >
                                        <Icon name="logo-whatsapp" size={30} color={"green"} />
                                        <Text style={{ fontFamily: MSMedium, fontSize: 14, marginLeft: 5 }}>
                                            {info.celular}
                                        </Text>
                                    </Pressable> : null
                                }
                                {
                                    info.celular.length > 0 ? <Pressable style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }}
                                        onPress={() => _pressCall(info.celular)}
                                    >
                                        <Icon name="call-sharp" size={28} color={Primary} />
                                        <Text style={{ fontFamily: MSMedium, fontSize: 14, marginLeft: 5 }}>
                                            {info.celular}
                                        </Text>
                                    </Pressable> : null
                                }
                                {
                                    info.email.length > 0 ? <Pressable style={{ marginVertical: 10, flexDirection: "row", alignItems: 'center' }}
                                        onPress={() => Linking.openURL('mailto:' + info.email)}
                                    >
                                        <Icon name="mail-sharp" size={28} color={Primary} />
                                        <Text style={{ fontFamily: MSMedium, fontSize: 14, marginLeft: 5 }}>
                                            {info.email}
                                        </Text>
                                    </Pressable> : null
                                }

                            </View> : null
                        }
                        {/* AQUI COMEÇA O CONTAINER DE INFORMAÇÕES DO CARRO */}
                        <View style={{ height: 410, backgroundColor: "white", paddingHorizontal: 24 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ paddingTop: 16 }}>
                                    <View>
                                        <Text style={styles.tituloItem}>
                                            {info.marca} {" "}
                                        </Text>
                                        <Text style={{ fontFamily: MSBold, color: Primary, fontSize: 24 }}>
                                            {info.modelo}
                                        </Text>
                                    </View>
                                    <Text style={{ fontFamily: MSRegular, color: "#727272", fontSize: 14 }}>
                                        {info.name}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: "flex-end", paddingTop: 16 }}>
                                    <Pressable
                                        style={{ height: 40, width: 40, backgroundColor: "#eb8f8f", borderRadius: 5, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => favoritos.includes(info.id) ?
                                            context.removerFavorito(context.favorites.filter(pares => pares.id !== info.id))
                                            :
                                            context.adicionarFavorito([...context.favorites, info])
                                        }
                                    >
                                        <Icon name={favoritos.includes(info.id) ? "star" : "star-outline"} size={20} color={Primary} />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ height: 263, marginTop: 24 }}>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/calendar.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Ano
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.release_year}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/kms.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Kms
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.mileage}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={styles.cntItem}>
                                        <Image
                                            style={styles.icones}
                                            source={require("../../assets/icones/cambio.png")}
                                            resizeMode="cover"
                                        />
                                        <View style={{ paddingLeft: 8 }}>
                                            <Text style={styles.label}>
                                                Câmbio
                                            </Text>
                                            <Text style={styles.descricaoItem}>
                                                {info.transmission}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.cntItem}>
                                        <Image
                                            style={styles.icones}
                                            source={require("../../assets/icones/cambio.png")}
                                            resizeMode="cover"
                                        />
                                        <View style={{ paddingLeft: 8 }}>
                                            <Text style={styles.label}>
                                                Carroceria
                                            </Text>
                                            <Text style={styles.descricaoItem}>
                                                {info.body_type}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/cambio.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Combustivel
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.fuel_type}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/calendar.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Cor
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.exterior_color}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/kms.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Qtd.Portas
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.door_count}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/cambio.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.cntItem}>
                                            <Image
                                                style={styles.icones}
                                                source={require("../../assets/icones/cambio.png")}
                                                resizeMode="cover"
                                            />
                                            <View style={{ paddingLeft: 8 }}>
                                                <Text style={styles.label}>
                                                    Condição
                                                </Text>
                                                <Text style={styles.descricaoItem}>
                                                    {info.condition}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* AQUI TERMINA O CONTAINER DE INFORMAÇÕES DO CARRO */}

                        {/* AQUI COMEÇA O CONTAINER DE ACESSORIOS DO CARRO */}

                        <Acessorios features={info} />

                        {/* AQUI TERMINA O CONTAINER DE ACESSORIOS DO CARRO */}


                        {/* AQUI COMEÇA O CONTAINER DE OBSERVAÇÕES DO VENDEDOR */}
                        <View style={{ height: 297, backgroundColor: "white", paddingHorizontal: 24 }}>
                            <Text style={[styles.tituloItem, { paddingTop: 16 }]}>
                                Observações Vendedor
                            </Text>
                            <Text style={{ paddingTop: 8, fontFamily: MSRegular, color: "#727272", fontSize: 14 }}>
                                Verifique algumas informações deixadas pelo vendedor
                            </Text>
                            <View style={{ height: 155, marginTop: 25 }}>
                                <View style={styles.container}>
                                    {
                                        info.aceita_troca ?
                                            <View style={styles.cntItem}>
                                                <Image
                                                    style={{ width: 15, height: 18 }}
                                                    source={require("../../assets/icones/troca.png")}
                                                    resizeMode="cover"
                                                />
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={styles.label}>
                                                        Aceita troca
                                                    </Text>
                                                    <Text style={styles.descricaoItem}>
                                                        {info.aceita_troca}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null
                                    }

                                    {
                                        info.veiculo_blindado ?
                                            <View style={styles.cntItem}>
                                                <Image
                                                    style={{ width: 15, height: 18 }}
                                                    source={require("../../assets/icones/troca.png")}
                                                    resizeMode="cover"
                                                />
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={styles.label}>
                                                        Blindado
                                                    </Text>
                                                    <Text style={styles.descricaoItem}>
                                                        {info.veiculo_blindado}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null
                                    }
                                </View>
                                <View style={styles.container}>
                                    {
                                        info.veiculo_garantia ?
                                            <View style={styles.cntItem}>
                                                <Image
                                                    style={{ width: 15, height: 18 }}
                                                    source={require("../../assets/icones/troca.png")}
                                                    resizeMode="cover"
                                                />
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={styles.label}>
                                                        Tem garantia
                                                    </Text>
                                                    <Text style={styles.descricaoItem}>
                                                        {info.veiculo_garantia}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null
                                    }
                                    {
                                        info.unico_dono ?
                                            <View style={styles.cntItem}>
                                                <Image
                                                    style={{ height: 18, width: 18 }}
                                                    source={require("../../assets/icones/dono.png")}
                                                    resizeMode="cover"
                                                />
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={styles.label}>
                                                        Unico dono
                                                    </Text>
                                                    <Text style={styles.descricaoItem}>
                                                        {info.unico_dono}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null
                                    }
                                </View>
                                <View style={styles.container}>
                                    {
                                        info.veiculo_pcd ?
                                            <View style={styles.cntItem}>
                                                <Image
                                                    style={{ width: 17, height: 19.9 }}
                                                    source={require("../../assets/icones/pcd.png")}
                                                    resizeMode="cover"
                                                />
                                                <View style={{ paddingLeft: 8 }}>
                                                    <Text style={styles.label}>
                                                        PCD
                                                    </Text>
                                                    <Text style={styles.descricaoItem}>
                                                        {info.veiculo_pcd}
                                                    </Text>
                                                </View>
                                            </View>
                                            : null
                                    }

                                </View>
                            </View>
                        </View>

                        {/* AQUI TERMINA O CONTAINER DE OBSERVAÇÕES DO VENDEDOR */}

                        {/* AQUI COMECA O CONTAINER DE SOBRE VENDEDOR DO CARRO */}

                        <View style={{ height: 459, backgroundColor: "white", paddingHorizontal: 24 }}>
                            <Text style={[styles.tituloItem, { paddingTop: 16 }]}>
                                Sobre o vendedor
                            </Text>
                            <Text style={{ paddingTop: 8, fontFamily: MSRegular, color: "#727272", fontSize: 14 }}>
                                Informações referentes ao vendedor
                            </Text>
                            <View style={{ height: 62, marginTop: 25, flexDirection: "row" }}>
                                <View style={{ flex: 3 }}>
                                    {/*<Text style={{fontFamily: MSRegular, fontSize: 14, color: "#727272"}}>
								  		Pessoa juridica
									</Text>*/}
                                    <Text style={{ fontFamily: MSSemiBold, fontSize: 16, color: "#424242" }} numberOfLines={1}>
                                        {info.nome_fantasia}
                                    </Text>
                                    <Text style={{ fontFamily: MSSemiBold, fontSize: 14, color: "#424242" }}>
                                        {info.celular}
                                    </Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-end" }}>
                                    <Pressable
                                        style={{ height: 40, width: 117, backgroundColor: "#CB2525", borderRadius: 5, justifyContent: "center", alignItems: "center" }}
                                        onPress={() => navigation.navigate('Resultados', { item: info.member_id, condicao: '', rota: 'detalhe', nome: info.nome_fantasia })}
                                    >
                                        <Text style={{ fontFamily: MSSemiBold, fontSize: 12, color: "white" }}>
                                            Ver estoque
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <Text style={{ marginTop: 44, fontFamily: MSSemiBold, color: "#565656", fontSize: 16 }}>
                                Mensagem do proprietário
                            </Text>
                            <ScrollView style={{ width: '100%' }}>
                                <Text style={{ marginTop: 8, fontFamily: MSRegular, color: "#959595", fontSize: 14 }}>
                                    {info.additional_info}
                                </Text>
                            </ScrollView>
                        </View>

                        {/* AQUI TERMINA O CONTAINER DE SOBRE VENDEDOR DO CARRO */}

                        {/* AQUI COMECA O CONTAINER DE PRECOS DO CARRO */}

                        <View style={{ height: info.price_fipe === null ? 259 : 459, backgroundColor: "#2E2D37", paddingHorizontal: 24 }}>
                            <Text style={[styles.tituloItem, { paddingTop: 16, color: "white" }]}>
                                Compare os preços
                            </Text>
                            <Text style={{ paddingTop: 8, fontFamily: MSRegular, color: "white", fontSize: 14 }}>
                                Uma boa pesquisa, leva um bom negócio!
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 24 }}>
                                <View style={{ borderWidth: 2, borderColor: "#252525", height: 152, flex: 1, borderRadius: 5, marginRight: 4 }}>
                                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: MSRegular, fontSize: 14, color: "white" }}>
                                            Valor anunciado
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: MSBold, fontSize: 22, color: "white" }}>
                                            {info.price}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: MSRegular, fontSize: 11, color: "#979797", textAlign: "center", paddingHorizontal: 20 }}>
                                            {/*Valor médio de carros iguais a este anunciado na Netmotors*/}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 2, borderColor: "#252525", height: 152, flex: 1, borderRadius: 5, marginLeft: 4 }}>
                                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                        <Image
                                            style={{ height: 18 }}
                                            source={require("../../assets/images/logo.png")}
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: MSBold, fontSize: 22, color: "white" }}>
                                            {info.price}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ fontFamily: MSRegular, fontSize: 11, color: "#979797", textAlign: "center", paddingHorizontal: 20 }}>
                                            Valor médio de carros iguais a este anunciado na Netmotors
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {
                                info.price_fipe === null ? null : <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                                    <View style={{ borderWidth: 2, borderColor: "#252525", height: 166, width: 195, borderRadius: 5 }}>
                                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                                            <Image
                                                style={{ height: 30 }}
                                                source={require("../../assets/images/fipe.png")}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontFamily: MSBold, fontSize: 22, color: "white" }}>
                                                {info.price_fipe}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 3, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
                                            <Text style={{ fontFamily: MSRegular, fontSize: 11, color: "#979797", textAlign: "center" }}>
                                                {/*Valor médio de carros iguais a este anunciado na Netmotors*/}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>

                        {/* AQUI TERMINA O CONTAINER DE PRECOS VENDEDOR DO CARRO */}

                        {/* AQUI COMECA O CONTAINER DE PARCELAS DO CARRO */}
                        {/*<View style={{height: 615, backgroundColor: "white", marginTop: 8, paddingHorizontal: 24}}>
							<Text style={[styles.tituloItem, {paddingTop: 16}]}>
								Vejas as parcelas desse veículo
							</Text>
							<Text style={{paddingTop: 8, fontFamily: MSRegular, color: "#727272", fontSize: 14}}>
								Tudo sem compromisso e vamos começar com alguns dados ;) 
							</Text>
							<View style={{height: 328, marginTop: 24, justifyContent: "space-between"}}>
								<TextInput
							     	style={styles.input}
							     	placeholder="Nome"
							     	placeholderTextColor="#727272"
							   />
							   <TextInput
							     	style={styles.input}
							     	placeholder="E-mail"
							     	placeholderTextColor="#727272"
							   />
							   <TextInput
							     	style={styles.input}
							     	placeholder="Data de nascimento"
							     	placeholderTextColor="#727272"
							   />
							   <TextInput
							     	style={styles.input}
							     	placeholder="CPF"
							     	placeholderTextColor="#727272"
							   />
							   <TextInput
							     	style={styles.input}
							     	placeholder="Telefone"
							     	placeholderTextColor="#727272"
							   />
							   <TextInput
							     	style={styles.input}
							     	placeholder="Localização"
							     	placeholderTextColor="#727272"
							   />
							</View>
							<View style={{flexDirection: "row", marginTop: 18}}>
								<Text style={{fontFamily: MSRegular, fontSize: 14, color: "#727272"}}>
								  Quero receber contatos da Netmotors por e-mail whatsapp, ou outros canais
								</Text>
							</View>
							<View style={{justifyContent: "center", alignItems: "center", marginTop: 35,}}>
								<Pressable style={{height: 40, width: 120, backgroundColor: "#CB2525", borderRadius: 5, justifyContent: "center", alignItems: "center"}}>
									<Text style={{fontFamily: MSSemiBold, fontSize: 12, color: "white"}}>
									  	Ver parcelas
									</Text>
								</Pressable>
							</View>
						</View>*/}
                        {/* AQUI TERMINA O CONTAINER DE PARCELAS DO CARRO */}
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
    },
    txtCar: {
        color: "#404040",
        fontSize: 15,
        fontFamily: MSBold
    },
    steps: {
        color: "#727272",
        fontSize: 14,
        fontFamily: MSRegular
    },
    container: {
        flexDirection: "row",
        flex: 1,
    },
    icones: {
        width: 16,
        height: 16
    },
    cntItem: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
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
    input: {
        height: 48,
        backgroundColor: "#e9e9e9",
        borderRadius: 5,
        color: "green",
        fontSize: 14,
        fontFamily: MSRegular,
        paddingHorizontal: 19,
        color: "#727272"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
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
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginVertical: 10
    },
    buttonClose: {
        backgroundColor: Primary,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})



export default Detalhe;