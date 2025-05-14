import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, StyleSheet, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, MSRegular, Primary } from "../../styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { HelpersAnuncios } from '../../helpers';
const anunciosHelpers = new HelpersAnuncios();

const AdRegistrationThree = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [observacoes, setObservacoes] = useState('')

    const route = useRoute();

    const payload = {
    	...route.params.item,
    	options: options.join(),
    	observacoes: observacoes
    }

    const cadastrar = async () => {
        setLoading(true)
        try {
            const resp = await anunciosHelpers.CadastroAnuncio(payload)
            if (resp.status === 200) {
                setLoading(false)
                navigation.navigate('SucessAdRegistration', { item: JSON.stringify(resp.data.id) })
            } else {
                setLoading(false)
                alert(JSON.stringify(resp.data.errors))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
            <ScrollView style={{ flex: 1, backgroundColor: Primary }}>
                <View style={{ backgroundColor: Background }}>
                    <ImageBackground
                        style={{ width: '100%', height: 64, flexDirection: 'row' }}
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
                    <View style={{ backgroundColor: "white", marginTop: 40, paddingHorizontal: 24, paddingVertical: 40 }}>
                        <View style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ color: "#404040", fontSize: 15, fontFamily: MSBold }}>
                                ANUNCIAR VEÍCULO
                            </Text>
                        </View>
                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSBold, paddingTop: 30 }}>
                            GERAL
                        </Text>
                        <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0', marginVertical: 10 }} />
                        <BouncyCheckbox
                            size={22}
                            useNativeDriver
                            isChecked={options.includes(1)}
                            text="FREIO ABS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(1) ?
                                    setOptions(options.filter(pares => pares !== 1))
                                    :
                                    setOptions([...options, 1])
                            }
                        />
                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(2)}
                            text="ENGATE"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(2) ?
                                    setOptions(options.filter(pares => pares !== 2))
                                    :
                                    setOptions([...options, 2])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(3)}
                            text="DIREÇÃO ELÉTRICA"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(3) ?
                                    setOptions(options.filter(pares => pares !== 3))
                                    :
                                    setOptions([...options, 3])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(4)}
                            text="DIREÇÃO HIDRÁULICA"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(4) ?
                                    setOptions(options.filter(pares => pares !== 4))
                                    :
                                    setOptions([...options, 4])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(5)}
                            text="VIDROS ELETRICOS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(5) ?
                                    setOptions(options.filter(pares => pares !== 5))
                                    :
                                    setOptions([...options, 5])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(7)}
                            text="ALARME"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(7) ?
                                    setOptions(options.filter(pares => pares !== 7))
                                    :
                                    setOptions([...options, 7])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(9)}
                            text="CENTRAL MULTIMÍDIA"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(9) ?
                                    setOptions(options.filter(pares => pares !== 9))
                                    :
                                    setOptions([...options, 9])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(10)}
                            text="CD PLAYER"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(10) ?
                                    setOptions(options.filter(pares => pares !== 10))
                                    :
                                    setOptions([...options, 10])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(11)}
                            text="DVD PLAYER"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(11) ?
                                    setOptions(options.filter(pares => pares !== 11))
                                    :
                                    setOptions([...options, 11])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(12)}
                            text="AIR-BAGS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(12) ?
                                    setOptions(options.filter(pares => pares !== 12))
                                    :
                                    setOptions([...options, 12])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(13)}
                            text="AIR-BAGS LATERAIS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(13) ?
                                    setOptions(options.filter(pares => pares !== 13))
                                    :
                                    setOptions([...options, 13])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(21)}
                            text="AIR-BAGS TRASEIROS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(21) ?
                                    setOptions(options.filter(pares => pares !== 21))
                                    :
                                    setOptions([...options, 21])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(14)}
                            text="FAROL DE MILHA"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(14) ?
                                    setOptions(options.filter(pares => pares !== 14))
                                    :
                                    setOptions([...options, 14])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(17)}
                            text="AR CONDICIONADO"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(17) ?
                                    setOptions(options.filter(pares => pares !== 17))
                                    :
                                    setOptions([...options, 17])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(19)}
                            text="GPS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(19) ?
                                    setOptions(options.filter(pares => pares !== 19))
                                    :
                                    setOptions([...options, 19])
                            }
                        />

                        <BouncyCheckbox
                            size={22}
                            isChecked={options.includes(20)}
                            text="OUTROS"
                            textStyle={{ fontSize: 14, color: 'black' }}
                            fillColor={Primary}
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: Primary, fontFamily: MSRegular, marginVertical: 5 }}
                            onPress={() =>
                                options.includes(20) ?
                                    setOptions(options.filter(pares => pares !== 20))
                                    :
                                    setOptions([...options, 20])
                            }
                        />

                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSBold, paddingTop: 30 }}>
                            OBSERVAÇÕES:
                        </Text>
                        <TextInput
                            value={observacoes}
                            onChangeText={value => setObservacoes(value)}
                            multiline={true}
                            maxLength={200}
                            style={{ height: 100, borderColor: "#ccc", borderWidth: 1, borderRadius: 10, marginTop: 10, padding: 10 }}
                        />
                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSBold, paddingTop: 10 }}>
                            CARACTERES RESTANTES : {200 - observacoes.length}
                        </Text>
                        <View style={{ flexDirection: "row", flex: 1, alignItems: "center", paddingTop: 30 }}>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: Primary, marginRight: 5 }]} onPress={() => cadastrar()}>
                                {
                                    loading ? <ActivityIndicator color={'white'} /> : <Text style={[styles.txtBtn, { color: 'white' }]}>
                                        REGISTRAR
                                    </Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { borderColor: Primary, borderWidth: 1, borderLeft: 5 }]} onPress={() => navigation.goBack()}>
                                <Text style={[styles.txtBtn, { color: Primary }]}>
                                    VOLTAR
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 8
    },
    butons: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
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

export default AdRegistrationThree