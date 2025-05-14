import React, { useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native'
import { Background, MSBold, Primary, MSMedium } from "../../styles"
import { Footer } from '../../components/Footer'
import { useNavigation } from "@react-navigation/native"

import AuthContext from '../../contexts/auth'

const SucessRegister = (props) => {
    const context = useContext(AuthContext)
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
            <ScrollView style={{ flex: 1, backgroundColor: Primary }}>
                <View style={{ backgroundColor: Background }}>


                    <ImageBackground
                        style={{ width: '100%', height: 64, flexDirection: "row" }}
                        source={require('../../assets/images/header.png')}
                    >
                        <View style={{ flex: 1, marginLeft: 12, justifyContent: "center" }} />
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

                    <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0' }} />

                    <View style={{ height: 800, backgroundColor: "white" }}>
                        <Image
                            style={{}}
                            source={require('../../assets/images/sucesso.png')}
                        />
                        <View style={{ paddingTop: 20, alignItems: 'center' }}>
                            <Image
                                style={{}}
                                source={require('../../assets/images/suce.png')}
                            />
                        </View>
                        <Text style={{ paddingTop: 20, fontFamily: MSBold, fontSize: 27, textAlign: 'center' }}>
                            Cadastro Finalizado !
                        </Text>
                        <View style={{ paddingTop: 20, alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#48D35E', borderRadius: 5, opacity: 0.8 }}>
                                <Text style={{ padding: 8, color: '#006600' }}>
                                    {context?.user?.email}
                                </Text>
                            </View>
                        </View>
                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ color: '#9D9D9D', textAlign: 'center', fontSize: 14 }}>
                                Seus dados de acesso foram enviados para o seu e-mail, você já pode acessar nosso portal utilizando E-mail e Senha!
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ backgroundColor: Primary, height: 56, width: 205, borderRadius: 5, alignItems: 'center', justifyContent: "center" }}
                                onPress={() => navigation.navigate('Home')}
                            >
                                <Text style={{ fontFamily: MSBold, color: 'white', fontSize: 16 }}>
                                    CONTINUAR
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
    },
    txtCar: {
        color: "#404040",
        fontSize: 15,
        fontFamily: MSBold,
        paddingLeft: 5
    },
    containerCentral: {
        flex: 1,
        height: 133,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 5
    },
    person: {
        fontFamily: MSMedium,
        color: 'black',
        textAlign: 'center',
        fontSize: 16
    }
})

export default SucessRegister