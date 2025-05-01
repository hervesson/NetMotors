import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, ImageBackground, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native'
import { Background, MSBold, Primary, MSRegular, MSMedium, MSSemiBold } from "../../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { Footer } from "../../components"

import { HelpersAnuncios } from '../../helpers';

const Favoritos = (props) => {
    const [opacity, setOpacity] = useState(new Animated.Value(0));


    const navigation = useNavigation();

    //const favoritos = props.favoritos.map(ids => { return ids.id })

    function onLoad() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    const HeaderComponent = () => {
        return (
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
                <View style={{ backgroundColor: "white", width: '100%', height: 80, justifyContent: "center", alignItems: "center", flexDirection: "row", paddingHorizontal: 24 }}>
                    <Text style={styles.txtCar}>
                        Favoritos
                    </Text>
                </View>
            </View>
        )
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.containerItem} onPress={() => navigation.navigate("Detalhe", { item: JSON.stringify(item), rota: 'detalhes', title: item.marca + " " + item.modelo })}>
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 2, justifyContent: "space-between", height: 24 }}>
                        <Text style={{ fontFamily: MSMedium, fontSize: 8, color: Primary }}>
                            {item.marca}
                        </Text>
                        <Text style={{ fontFamily: MSSemiBold, fontSize: 14, color: "#424242" }}>
                            {item.modelo}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity
                            style={{ height: 24, width: 24, backgroundColor: "#eb8f8f", borderRadius: 5, justifyContent: "center", alignItems: "center" }}
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
                <View style={{ height: 228, width: '100%', marginTop: 5, }}>
                    <Image
                        source={require('../../assets/images/volante.png')}
                        style={{ height: 228, width: '100%', marginTop: 5, borderRadius: 3 }}
                    />
                    <Animated.Image
                        style={{ height: 228, width: '100%', marginTop: 5, borderRadius: 3, position: 'absolute', opacity: opacity }}
                        resizeMethod="resize"
                        source={{ uri: item.pictures ? item.pictures[0] : null }}
                        onLoad={onLoad()}
                    />
                </View>
                <View style={{ height: 40, justifyContent: "space-between", marginTop: 10 }}>
                    <View style={styles.description}>
                        <Image
                            style={{ width: 13, height: 9 }}
                            source={require("../../assets/icones/motor.png")}
                            resizeMode="contain"
                        />
                        <Text style={styles.txtdescriptionCar}>
                            {item.versão}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.description}>
                            <Image
                                style={{ width: 13, height: 13 }}
                                source={require("../../assets/icones/calendar.png")}
                                resizeMode="cover"
                            />
                            <Text style={styles.txtdescriptionCar}>
                                {item.ano_modelo}
                            </Text>
                        </View>
                        <View style={styles.description}>
                            <Image
                                style={{ width: 11, height: 16 }}
                                source={require("../../assets/icones/cambio.png")}
                                resizeMode="cover"
                            />
                            <Text style={styles.txtdescriptionCar}>
                                {item.transmission}
                            </Text>
                        </View>
                        <View style={styles.description}>
                            <Image
                                style={{ width: 16, height: 14 }}
                                source={require("../../assets/icones/kms.png")}
                                resizeMode="cover"
                            />
                            <Text style={styles.txtdescriptionCar}>
                                {item.mileage}
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{ paddingVertical: 8, justifyContent: "center" }}>
                    <Text style={{ fontFamily: MSBold, fontSize: 14, color: "black" }}>
                        {item.price}
                    </Text>
                </View>
            </View>

            <View style={styles.detalhes}>
                <Text style={{ fontFamily: MSSemiBold, fontSize: 10, color: "white" }}>
                    + Detalhes
                </Text>
            </View>
        </TouchableOpacity>
    );

    const EmptyComponent = ({ item }) => (
        <View style={{ backgroundColor: "white", alignItems: "center" }}>
            <Text style={{ fontFamily: MSSemiBold, fontSize: 16, color: '#424242', paddingVertical: 20 }}>
                Você não posssui nenhum favorito ainda
            </Text>
        </View>
    )


    return (
        <SafeAreaView style={{ backgroundColor: Primary, flex: 1 }}>
            <View style={{ backgroundColor: Background }}>
                <FlatList
                    data={props.favoritos}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyComponent}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={() => <HeaderComponent />}
                    numColumns={1}
                    ListFooterComponent={() => <Footer
                        press={() => navigation.navigate('Home')}
                        anunciar={() => props.user.username ? navigation.navigate("CadAnuncio1") : navigation.navigate("Login")}
                    />}
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

export default Favoritos