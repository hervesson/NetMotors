import React, { useState, useContext } from 'react'
import { View, Text, SafeAreaView, ImageBackground, Pressable, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { Footer } from "../../components"
import { Background, MSBold, MSRegular, Primary, MSSemiBold } from "../../styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native"
import AuthContext from '../../contexts/auth';

import { HelpersAuth } from '../../helpers';
const helpersAuth = new HelpersAuth();

const ForgotPassword = () => {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const context = useContext(AuthContext)

    const forgotPassword = () => {
        setLoading(true)
        helpersAuth.forgotPassword().then(() => {
            setLoading(false);
            Alert.alert("Email de redefinição foi enviado com sucesso!", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
            Alert.alert('Email de redefinição enviado', 'Email de redefinição foi enviado com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
        }).catch(err => {
            setLoading(false);
            Alert.alert('Usuário não encontrado', 'Usuário não encontrado em nossa base', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ])
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
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Pressable style={styles.menu} onPress={() => navigation.openDrawer()}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require("../../assets/images/menuBlack.png")}
                                    resizeMode="contain"
                                />
                            </Pressable>
                        </View>
                    </ImageBackground>
                    <View style={{ height: 310, backgroundColor: "white", marginTop: 40, paddingHorizontal: 24 }}>
                        <View style={{ height: 60, justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
                            <Text style={{ color: "#404040", fontSize: 15, fontFamily: MSBold }}>
                                PREENCHA ALGUM DOS SEUS DADOS ABAIXO
                            </Text>
                            <Text style={{ color: "#404040", fontSize: 14, fontFamily: MSRegular, paddingTop: 10 }}>
                                *Para recuperar sua senha, digite o seu email, CPF ou CNPJ abaixo.
                            </Text>
                        </View>
                        <View style={{ height: 90, justifyContent: "space-between", marginTop: 50 }}>
                            <View style={{}}>
                                <TextInput
                                    autoCapitalize='none'
                                    value={user}
                                    onChangeText={value => setUser(value)}
                                    style={{ height: 53, backgroundColor: "#e9e9e9", borderRadius: 5, marginTop: 10, paddingHorizontal: 15 }}
                                    placeholder="Digite seu E-mail, CPF ou CNPJ"
                                    placeholderTextColor="#727272"
                                />
                            </View>
                        </View>
                        <View>
                            <Pressable
                                style={{ backgroundColor: Primary, height: 56, borderRadius: 5, justifyContent: "center", alignItems: "center" }}
                                onPress={() => forgotPassword(user)}
                                disabled={loading}
                            >
                                {
                                    loading ? <ActivityIndicator color={'white'} /> : <Text style={{ color: "white", fontSize: 15, fontFamily: MSSemiBold }}>
                                        Recuperar
                                    </Text>
                                }
                            </Pressable>
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

export default ForgotPassword;

