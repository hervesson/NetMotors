import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext({});

import { HelpersAuth, HelpersUsers } from '../helpers';
const helpersAuth = new HelpersAuth()
const helpersUser = new HelpersUsers()


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        async function getUser() {
            const storagedUser = await AsyncStorage.getItem('@App:user');
            const storagedToken = await AsyncStorage.getItem('@App:token');

            if (storagedToken && storagedUser) {
                setUser(JSON.parse(storagedUser));
                //api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
            }
        }

        async function getfav() {
            let fav = await helpersUser.GetFavoritos()
            setFavorites(fav)
        }

        getUser()
        getfav()
    }, []);

    async function handleLogin(user, password) {
        setLoading(true);
        try {
            const response = await helpersAuth.Login(user, password);
            const me = await helpersUser.GetUser(response.data.access_token)
            defineUser({ data: { ...me.data, token: response.data.access_token } })
            //Supondo que a API retorne algum tipo de sucesso (ex: response.ok === true)
            if (response && me) {
                // Redireciona para a tela desejada e reseta a pilha
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'User' }], // Substitua 'Home' pelo nome da sua tela principal
                });
            } else {
                Alert.alert('Erro no Login', 'Falha ao autenticar. Por favor, tente novamente.', [
                    { text: 'OK' },
                ]);
            }
        } catch (err) {
            Alert.alert('Usuário/senha inválidos', 'Digite o usuário e senha corretos!', [
                { text: 'OK' },
            ]);
            console.error("Erro durante o login:", err);
        } finally {
            setLoading(false);
        }
    }

    async function defineUser(value) {
        setUser(value.data);
        // //api.defaults.headers.Authorization = `Bearer ${value.data.token}`
        await AsyncStorage.setItem('@App:user', JSON.stringify(value.data));
        await AsyncStorage.setItem('@App:token', value.data.token);
    }

    async function logout() {
        try {
            //const value = await AsyncStorage.getItem('@App:token')
            //await helpersAuth.Logout(value)
            await AsyncStorage.clear()
            navigation.navigate("Anuncios")
            setUser(null);
            // console.log('Logout feito com segurança!')
        } catch (e) {
            console.log(e)
        }
    }

    function adicionarFavorito( favoritos ){
        try {
            AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
            setFavorites(favoritos)
        } catch (error) {
           console.log(error);
        }
    }

    function removerFavorito( favoritos ){
        try {
            AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
            setFavorites(favoritos)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, favorites, setLoading, handleLogin, logout, adicionarFavorito, removerFavorito }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
