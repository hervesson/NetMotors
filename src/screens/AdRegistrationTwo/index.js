import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, MSRegular, Primary, MSSemiBold } from "../../styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Dropdown } from 'react-native-element-dropdown';
import MaskInput, { createNumberMask } from 'react-native-mask-input';

import { cores, carrocerias } from '../../utils'

import { Formik } from 'formik'
import * as yup from 'yup';

const AdRegistrationTwo = () => {
    const navigation = useNavigation()
    const route = useRoute();

    const dollarMask = createNumberMask({
        prefix: ['R', '$', ' '],
        delimiter: '.',
        separator: ',',
        precision: 0,
    })

    const submit = (values) => {
        const payload = {
            ...route.params.item,
            condicao: values.condicao,
            preco: values.preco,
            quilometragem: values.quilometragem,
            placa: values.placa,
            renavam: values.renavam,
            portas: values.portas,
            cor: values.cor,
            carroceria: values.carroceria,
            troca: values.troca,
            blindado: values.blindado,
            garantia: values.garantia,
            dono: values.dono,
            pcd: values.pcd
        }
        navigation.navigate("AdRegistrationThree", { item: payload })
    }


    const cadastroValidationSchema = yup.object().shape({
        condicao: yup.string().required('Selecione a condição do seu veículo'),
        preco: yup.string().required('Coloque o preço do seu veículo'),
        quilometragem: yup.string().required('Digite a quilometragem do seu veículo'),
        placa: yup.string().required('Digite a placa do seu veículo'),
        portas: yup.string().required('Selecione a quantidade de portas do seu veículo'),
        cor: yup.string().required('Selecione a cor do seu veículo'),
        carroceria: yup.string().required('Selecione o tipo de carroçeria seu veículo')
    })

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
                    <Formik
                        validationSchema={cadastroValidationSchema}
                        initialValues={{
                            condicao: '',
                            preco: '',
                            quilometragem: '',
                            placa: '',
                            renavam: '',
                            portas: '',
                            cor: '',
                            carroceria: '',
                            troca: 0,
                            blindado: 0,
                            garantia: 0,
                            dono: 0,
                            pcd: 0
                        }}
                        onSubmit={values => submit(values)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            values,
                            errors,
                            isValid
                        }) => (
                            <>
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
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        CONDIÇÃO DO VEÍCULO:
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            style={[styles.butons, { backgroundColor: values.condicao == 'new' ? Primary : null, flex: 1 }]}
                                            onPress={() => setFieldValue('condicao', 'new')}
                                        >
                                            <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                                NOVO
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.butons, { backgroundColor: values.condicao == 'used' ? Primary : null, flex: 1 }]}
                                            onPress={() => setFieldValue('condicao', 'used')}
                                        >
                                            <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                                USADO
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {errors.condicao &&
                                        <Text style={styles.erros}>{errors.condicao}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        PREÇO
                                    </Text>
                                    <MaskInput
                                        value={values.preco}
                                        mask={dollarMask}
                                        style={[styles.dropdown, { fontSize: 14 }]}
                                        onChangeText={(masked, unmasked) => { setFieldValue('preco', unmasked) }}
                                        keyboardType='numeric'
                                    />
                                    {errors.preco &&
                                        <Text style={styles.erros}>{errors.preco}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        QUILOMETRAGEM:
                                    </Text>
                                    <TextInput
                                        value={values.quilometragem}
                                        onChangeText={value => setFieldValue('quilometragem', value)}
                                        style={styles.dropdown}
                                        placeholder="QUILOMETRAGEM"
                                        keyboardType='numeric'
                                    />
                                    {errors.quilometragem &&
                                        <Text style={styles.erros}>{errors.quilometragem}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        PLACA:
                                    </Text>
                                    <TextInput
                                        value={values.placa}
                                        onChangeText={value => setFieldValue('placa', value)}
                                        style={styles.dropdown}
                                        placeholder="PLACA"
                                    />
                                    {errors.placa &&
                                        <Text style={styles.erros}>{errors.placa}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        RENAVAM:
                                    </Text>
                                    <TextInput
                                        value={values.renavam}
                                        onChangeText={value => setFieldValue('renavam', value)}
                                        style={styles.dropdown}
                                        placeholder="RENAVAM"
                                    />
                                    {errors.renavam &&
                                        <Text style={styles.erros}>{errors.renavam}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        QUANTIDADE DE PORTAS:
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity
                                            style={[styles.butons, { backgroundColor: values.portas == 2 ? Primary : null, flex: 1 }]}
                                            onPress={() => setFieldValue('portas', 2)}
                                        >
                                            <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                                2
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.butons, { backgroundColor: values.portas == 3 ? Primary : null, flex: 1 }]}
                                            onPress={() => setFieldValue('portas', 3)}
                                        >
                                            <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                                3
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.butons, { backgroundColor: values.portas == 4 ? Primary : null, flex: 1 }]}
                                            onPress={() => setFieldValue('portas', 4)}
                                        >
                                            <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                                4
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {errors.portas &&
                                        <Text style={styles.erros}>{errors.portas}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        COR
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={cores}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE A COR'}
                                        searchPlaceholder="Procurar cor..."
                                        value={values.cor}
                                        onChange={item => {
                                            setFieldValue('cor', item.value);
                                        }}
                                    />
                                    {errors.cor &&
                                        <Text style={styles.erros}>{errors.cor}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        TIPO DA CARROCERIA
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={carrocerias}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE A CARROCERIA'}
                                        searchPlaceholder="Procurar carroceria..."
                                        value={values.carroceria}
                                        onChange={item => {
                                            setFieldValue('carroceria', item.value);
                                        }}
                                    />
                                    {errors.carroceria &&
                                        <Text style={styles.erros}>{errors.carroceria}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSBold, paddingTop: 30 }}>
                                        ADICIONAIS
                                    </Text>
                                    <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0', marginVertical: 10 }} />
                                    <TouchableOpacity
                                        style={[styles.butons, { backgroundColor: values.troca == 1 ? Primary : null }]}
                                        onPress={() => values.troca == 1 ? setFieldValue('troca', 0) : setFieldValue('troca', 1)}
                                    >
                                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                            ACEITO TROCA
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.butons, { backgroundColor: values.blindado == 1 ? Primary : null }]}
                                        onPress={() => values.blindado == 1 ? setFieldValue('blindado', 0) : setFieldValue('blindado', 1)}
                                    >
                                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                            VEÍCULO BLINDADO
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.butons, { backgroundColor: values.garantia == 1 ? Primary : null }]}
                                        onPress={() => values.garantia == 1 ? setFieldValue('garantia', 1) : setFieldValue('garantia', 1)}
                                    >
                                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                            GARANTIA
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.butons, { backgroundColor: values.dono == 1 ? Primary : null }]}
                                        onPress={() => values.dono == 1 ? setFieldValue('dono', 1) : setFieldValue('dono', 1)}
                                    >
                                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                            ÚNICO DONO
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.butons, { backgroundColor: values.pcd == 1 ? Primary : null }]}
                                        onPress={() => values.pcd == 1 ? setFieldValue('pcd', 1) : setFieldValue('pcd', 1)}
                                    >
                                        <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold }}>
                                            PCD
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", paddingTop: 30 }}>
                                        <TouchableOpacity style={[styles.btn, { backgroundColor: Primary, marginRight: 5 }]} onPress={() => handleSubmit()}>
                                            <Text style={[styles.txtBtn, { color: 'white' }]}>
                                                AVANÇAR
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.btn, { borderColor: Primary, borderWidth: 1, borderLeft: 5 }]} onPress={() => navigation.goBack()}>
                                            <Text style={[styles.txtBtn, { color: Primary }]}>
                                                VOLTAR
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
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
    erros: {
        fontSize: 12,
        color: 'red',
        fontFamily: MSRegular
    },
})

export default AdRegistrationTwo