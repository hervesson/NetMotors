import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersUsers {

	async GetUser(token) {
		return new Promise((resolve, reject) => {
			try {
				const user = api.get('/me', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					},
				});
				resolve(user)
			} catch (err) {
				reject(err)
			}
		})
	}

	async UpdateUser(values) {
		return new Promise((resolve, reject) => {
			try {
				const payload = {
					name: values.name,
            	lastname: values.lastname,
            	cpf: values.cpf,
					celular: values.celular,
					phone: values.phone,
					cep: values.cep,
					endereco: values.endereco,
					endereco_num: values.endereco_num,
					bairro: values.bairro,
					complemento: values.complemento,
					estado: values.estado,
					cidade: values.cidade,
					facebook: values.facebook,
					instagram: values.instagram,
					tipo_registro: "pessoa_fisica",
				}
				const user = api.put('/usuarios/'+values.id, payload, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + values.token
					},
				});
				resolve(user)
			} catch (err) {
				reject(err)
			}
		})
	}

	async GetFavoritos() {
		return new Promise(async(resolve, reject) => {
			try {
				const favoritos = await AsyncStorage.getItem('favoritos')
			   if(favoritos !== null) {
			     	resolve(JSON.parse(favoritos))
			   }
			} catch (err) {
				reject(err)
			}
		})
	}

}

export { HelpersUsers };