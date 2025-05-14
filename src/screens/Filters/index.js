import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import {
    Background,
    Primary,
    MSSemiBold,
    MSBold,
} from '../../styles';
import { Dropdown } from 'react-native-element-dropdown';

import { useNavigation, useRoute } from '@react-navigation/native';

import { HelpersModelos } from '../../helpers';
const marcasHelpers = new HelpersModelos();

function Filtros() {
    const navigation = useNavigation();
    const route = useRoute();
    const [brands, setBrands] = useState([])


    useEffect(() => {
        const getBrands = async () => {
            const brands = await marcasHelpers.GetMarcas()
            const resultado = brands.data.rows.map((item) => ({ label: item.name, value: item.name, id: item.id }));
            setBrands(resultado)
        }

        getBrands()
    }, [])


    //Marca
    const [marca, setMarca] = useState("");

    //Modelo
    const [modelo, setModelo] = useState("");
    const [modelos, setModelos] = useState([]);

    //Versao
    const [versao, setVersao] = useState("");
    const [versoes, setVersoes] = useState([]);

    //Id
    const [id, setId] = useState('');

    const { item } = route.params;

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Primary }}>
            <View style={{ backgroundColor: Background, flex: 1 }}>
                <View style={{ height: 53, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: Primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                            borderRadius: 20
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ paddingHorizontal: 24, paddingTop: 24, fontFamily: MSSemiBold, color: 'black', fontSize: 20 }}>
                    PESQUISAR
                </Text>
                <Text style={{ paddingHorizontal: 24, paddingTop: 24, fontFamily: MSSemiBold }}>
                    Marca
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
                    value={marca}
                    onChange={item => {
                        setMarca(item.value);
                        searchModelos(item.id);
                        setVersoes([])

                    }}
                />
                <Text style={{ paddingHorizontal: 24, paddingTop: 24, fontFamily: MSSemiBold }}>
                    Modelo
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
                    value={modelo}
                    onChange={item => {
                        setModelo(item.value);
                        searchVersoes(item.id)
                    }}
                />
                <Text style={{ paddingHorizontal: 24, paddingTop: 24, fontFamily: MSSemiBold }}>
                    Versão
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
                    value={versao}
                    onChange={item => { setVersao(item.value); setId(item.id) }}
                />
                <TouchableOpacity
                    style={[styles.btnSearch, styles.shadowProp]}
                    onPress={() => navigation.navigate('Resultados', {
                        item: id ? id : modelo ? modelo : marca ? marca : '',
                        condicao: '',
                        categoria: '',
                        rota: 'filtros',
                        nome: marca + ' ' + modelo + ' ' + versao
                    })}
                >
                    <Text style={styles.txtBotao}>VER OFERTAS</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginTop: 8,
        marginHorizontal: 24
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    btnSearch: {
        backgroundColor: Primary,
        height: 56,
        marginTop: 16,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24
    },
    shadowProp: {
        shadowColor: Primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
    },
    txtBotao: {
        color: 'white',
        fontSize: 15,
        fontFamily: MSBold,
    }
});

export default Filtros;
