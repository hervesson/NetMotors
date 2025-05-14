import React, { useState, useContext } from 'react'
import { Alert, View, Text, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, PermissionsAndroid, Image, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, Primary, MSMedium, MSSemiBold } from "../../styles"
import { Footer } from '../../components'
import { useNavigation, useRoute } from "@react-navigation/native"
import ImagePicker from 'react-native-image-crop-picker';
import AuthContext from '../../contexts/auth';

import { HelpersAnuncios } from '../../helpers';
const anunciosHelpers = new HelpersAnuncios();

const SelectAdPhotos = (props) => {
    const [fotos, setFotos] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(AuthContext)

    const navigation = useNavigation();
    const route = useRoute();

    const selecionarEntrada = () => {
        Alert.alert(
            'Selecione',
            'a fonte da foto',
                [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Câmera',
                    onPress: () => requestCameraPermission().then(resp => resp ? captureImage() : alert("Permissão temporariamente negada"))
                },
                { text: 'Galeria', onPress: () => chooseFile('photo') }
            ]
        );
    };

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: "App Permissão de Câmera",
                message: "O App precisa de acesso à câmera.",
                buttonNeutral: "Pergunte-me depois",
                buttonNegative: "Cancelar",
                buttonPositive: "OK"
            },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const captureImage = () => {
        ImagePicker.openCamera({
            width: 320,
            height: 180,
        }).then(image => {
            var PHOTOS = fotos.concat(image);
            setFotos(PHOTOS);
        });
    };

    const chooseFile = type => {
        ImagePicker.openPicker({
            width: 320,
            height: 180,
            multiple: true,
        }).then(images => {
            var PHOTOS = fotos.concat(images);
            setFotos(PHOTOS);
        });
    };

    const exclude = (item) => {
        const exclude = fotos.filter(value => value !== item)
        setFotos(exclude)
    }

    const submit = async() => {
        setLoading(true)
        await anunciosHelpers.AddFotos(fotos, route.params.item)
            .then(ids => {
                setLoading(false)
                navigation.navigate('RegistrationAdFinish')
            })
        console.log(fotos)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
            <ScrollView style={{ flex: 1, backgroundColor: Primary }}>
                <View style={{ backgroundColor: Background }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
                        </TouchableOpacity>
                        <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0' }} />
                        <TouchableOpacity
                            style={{
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                backgroundColor: Primary,
                                marginRight: 5,
                                width: 180,
                                margin: 24
                            }}
                            onPress={() => selecionarEntrada()}>
                            <Text style={[styles.txtBtn, { color: 'white' }]}>
                                ADICIONAR FOTOS
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginTop: 20,
                                marginHorizontal: 19
                            }}
                        >
                            {
                                fotos.map(item => {
                                    return (
                                        <ImageBackground
                                            imageStyle={{ width: '100%', height: 110 }}
                                            style={{ width: '47%', height: 117, marginHorizontal: 5, paddingBottom: 7, alignItems: 'flex-end' }}
                                            source={{ uri: item.path }}
                                            resizeMode="cover"
                                            key={item.path}
                                        >
                                            <TouchableOpacity onPress={() => exclude(item)}>
                                                <Icon name="trash-outline" size={25} color={Primary} />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {
                        fotos.length > 0 ? <View style={{ flexDirection: "row", flex: 1, alignItems: "center", paddingVertical: 30, paddingHorizontal: 24 }}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: Primary, marginRight: 5 }]}
                                onPress={() => submit()}
                                disabled={loading}
                            >
                                {
                                    loading ? <ActivityIndicator /> : <Text style={{ color: "white", fontSize: 15, fontFamily: MSSemiBold }}>
                                        SALVAR
                                    </Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.btn, { borderColor: Primary, borderWidth: 1, borderLeft: 5 }]}
                                onPress={() => navigation.goBack()}
                                disabled={loading}
                            >
                                <Text style={[styles.txtBtn, { color: Primary }]}>
                                    VOLTAR
                                </Text>
                            </TouchableOpacity>
                        </View> : null
                    }
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
    },
    txtBtn: {
        fontFamily: MSBold,
        fontSize: 14
    },
    btn: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
})

export default SelectAdPhotos;

