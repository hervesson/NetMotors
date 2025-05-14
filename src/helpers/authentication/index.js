import api from "../api";

class HelpersAuth {

	Login(email, password){
		return new Promise((resolve, reject) => {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			let fd = new FormData();

			fd.append('email', email);
			fd.append('password', password);


			try {
				const login = api.post('/login', fd, config);
				resolve(login);
			} catch(err){
				reject(err)
			}
		})
	}

	Logout(token){
		console.log('token', token)
		return new Promise(async(resolve, reject) => {
			try {
				const logout = await api.post('/logout', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token
					}
				});
				resolve(logout);
			} catch(err){
				reject(err)
			}
		})
	}

	async CadastroPF(email, senha, confirm, pessoa, nome, sobrenome, cpf) {
		let model = {
		  	email: email,
		  	password: senha,
		  	password_confirmation: confirm,
		  	tipo_registro: pessoa,
		  	name: nome,
		  	lastname: sobrenome,
		  	cpf: cpf == "" ? '-' : cpf
		}

		try {
			const cadastro = await api.post('/usuarios', model, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return cadastro;
		} catch (err) {
			return err;
		}
	}

	async CadastroPJ(email, senha, confirm, pessoa, nome, sobrenome, cnpj) {
		let model = {
		  	email: email,
		  	password: senha,
		  	password_confirmation: confirm,
		  	tipo_registro: pessoa,
		  	razao_social: nome,
		  	nome_fantasia: sobrenome,
		  	cnpj: cnpj
		}

		try {
			const cadastro = await api.post('/usuarios', model, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return cadastro;
		} catch (err) {
			return err;
		}
	}

	async forgotPassword(username) {
		return new Promise((resolve, reject) => {
			try {
				const mudarSenha = api.get('/recover?username='+ username, {
					headers: {
						'Content-Type': 'application/json',
					},
				});
				resolve(mudarSenha);
			} catch (err) {
				const error = err.response.data;
				reject(error)
			}
		})
	}

}

export { HelpersAuth };

//82529683