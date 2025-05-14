import React, { useState, useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, ScrollView, ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, MSBold, MSRegular, Primary, MSSemiBold } from "../../styles"
import { useNavigation } from "@react-navigation/native"
import { Dropdown } from 'react-native-element-dropdown';

import { combustiveis, cambios, rangeYear } from '../../utils'

import AuthContext from '../../contexts/auth'

import { HelpersModelos } from '../../helpers';
const marcasHelpers = new HelpersModelos();

import { Formik } from 'formik'
import * as yup from 'yup';

const AdRegistrationOne = () => {
    const context = useContext(AuthContext)
    const navigation = useNavigation()

    // Marcas
    const [brands, setBrands] = useState([])

    // //Modelos
    const [modelos, setModelos] = useState([]);

    // //Versoes
    const [versoes, setVersoes] = useState([]);

    useEffect(() => {
        const getBrands = async () => {
            const brands = await marcasHelpers.GetMarcas()
            const resultado = brands.data.rows.map((item) => ({ label: item.name, value: item.name, id: item.id }));
            setBrands(resultado)
        }

        getBrands()
    }, [])


    const searchModelos = (pid) => {
        marcasHelpers.GetModelos(pid).then(response => {
            const resultado = response.data.rows.map((item) => ({ label: item.name, value: item.name, id: item.id }));
            setModelos(resultado);
        });
    };

    const searchVersoes = (pid) => {
        marcasHelpers.GetVersoes(pid).then(response => {
            const resultado = response.data.rows.map((item) => ({ label: item.name, value: item.name, id: item.id }));
            setVersoes(resultado);
        });
    };

    const submit = (values) => {
        const payload = {
            memberId: context.user.id,
            modeloId: values.versaoId,
            fabricacao: values.fabricacao,
            anoModelo: values.anoModelo,
            combustivel: values.combustivel,
            cambio: values.cambio
        }

        navigation.navigate("AdRegistrationTwo", { item: payload })
    }

    const cadastroValidationSchema = yup.object().shape({
        marca: yup.string().required('Selecione a marca do seu veículo'),
        modelo: yup.string().required('Selecione o modelo do seu veículo'),
        versao: yup.string().required('Selecione a versão do seu veículo'),
        fabricacao: yup.string().required('Selecione o ano de fabricação do seu veículo'),
        anoModelo: yup.string().required('Selecione o ano do modelo do seu veículo'),
        combustivel: yup.string().required('Selecione o tipo de combustivel do seu veículo'),
        cambio: yup.string().required('Selecione o tipo de câmbio do seu veículo')
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
                        initialValues={{ marca: '', modelo: '', versao: '', fabricacao: 0, anoModelo: 0, combustivel: '', cambio: '' }}
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
                                        MARCA / MODELO
                                    </Text>
                                    <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0', marginVertical: 10 }} />
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        MARCA:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={brands}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE A MARCA'}
                                        searchPlaceholder="Procurar..."
                                        value={values.marca}
                                        onChange={item => {
                                            setFieldValue('marca', item.value);
                                            searchModelos(item.id);
                                            setVersoes([])
                                        }}
                                    />
                                    {errors.marca &&
                                        <Text style={styles.erros}>{errors.marca}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        MODELO:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={modelos}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE O MODELO'}
                                        searchPlaceholder="Procurar..."
                                        value={values.modelo}
                                        onChange={item => {
                                            setFieldValue('modelo', item.value);
                                            searchVersoes(item.id)
                                        }}
                                    />
                                    {errors.modelo &&
                                        <Text style={styles.erros}>{errors.modelo}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        VERSÃO:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={versoes}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE A VERSÃO'}
                                        searchPlaceholder="Procurar..."
                                        value={values.versao}
                                        onChange={item => {
                                            setFieldValue('versao', item.value);
                                            setFieldValue('versaoId', item.id);
                                        }}
                                    />
                                    {errors.versao &&
                                        <Text style={styles.erros}>{errors.versao}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        ANO FABRICAÇÃO:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={rangeYear()}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE O ANO DE FABRICAÇÃO'}
                                        searchPlaceholder="Procurar..."
                                        value={values.fabricacao}
                                        onChange={item => {
                                            setFieldValue('fabricacao', item.value);
                                        }}
                                    />
                                    {errors.fabricacao &&
                                        <Text style={styles.erros}>{errors.fabricacao}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        ANO MODELO:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={rangeYear()}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE O ANO DO MODELO'}
                                        searchPlaceholder="Procurar..."
                                        value={values.anoModelo}
                                        onChange={item => {
                                            setFieldValue('anoModelo', item.value);
                                        }}
                                    />
                                    {errors.anoModelo &&
                                        <Text style={styles.erros}>{errors.anoModelo}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSBold, paddingTop: 30 }}>
                                        MOTOR:
                                    </Text>
                                    <View style={{ borderWidth: 0.3, borderColor: '#D0D0D0', marginVertical: 10 }} />
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        COMBUSTÍVEL:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={combustiveis}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'TIPO DE COMBUSTIVEL'}
                                        searchPlaceholder="Procurar..."
                                        value={values.combustivel}
                                        onChange={item => {
                                            setFieldValue('combustivel', item.value);
                                        }}
                                    />
                                    {errors.combustivel &&
                                        <Text style={styles.erros}>{errors.combustivel}</Text>
                                    }
                                    <Text style={{ color: "#424242", fontSize: 15, fontFamily: MSSemiBold, paddingTop: 10 }}>
                                        CÂMBIO:
                                    </Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={cambios}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'SELECIONE O ANO DO MODELO'}
                                        searchPlaceholder="Procurar..."
                                        value={values.cambio}
                                        onChange={item => {
                                            setFieldValue('cambio', item.value);
                                        }}
                                    />
                                    {errors.cambio &&
                                        <Text style={styles.erros}>{errors.cambio}</Text>
                                    }
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

export default AdRegistrationOne;