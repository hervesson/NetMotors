import api from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersAnuncios {
	async GetAbaixoFipe() {
		try {
			const abaixo_fipe = await api.get('/veiculos/abaixo_fipe', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return abaixo_fipe;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async GetAdicionadosRecentemente() {
		try {
			const adicioandosRecentemente = await api.get('/veiculos/adicionados_recentemente', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return adicioandosRecentemente;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async SearchAnuncios(search, page, condicao, categoria){
		try{
			const carros = await api.get('/veiculos/?page='+page+'&search='+search+'&condition='+condicao+'&categoria='+categoria, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return carros
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetMyAnuncios(member_id, page) {
		try {
			const meusAnuncios = await api.get('/veiculos?member_id='+member_id+'&page='+page, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return meusAnuncios;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async SearchFiltros(){
		try{
			const carros = await api.get('/veiculos/?page='+page+'&search='+search+'&condition='+condicao, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return carros
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async DetalheAnuncio(id){
		try{
			const detalhe = await api.get('/veiculos/'+id, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return detalhe
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async CadastroAnuncio(payload){
		const token = await AsyncStorage.getItem('token');

		let model ={
			model_id: payload.modeloId,
			member_id: payload.memberId,
			release_year: payload.fabricacao,
			ano_modelo: payload.anoModelo,
			price: payload.preco,
			mileage: payload.quilometragem,
			condition: payload.condicao,
			placa: payload.placa,
			renavam: payload.renavam,
			door_count: payload.portas,
			exterior_color: payload.cor,
			body_type: payload.carroceria,
			transmission: payload.cambio,
			fuel_type: payload.combustivel,
			options_features : payload.options,
			aceita_troca: payload.troca,
			veiculo_blindado: payload.blindado,
			veiculo_garantia: payload.garantia,
			unico_dono: payload.dono,
			veiculo_pcd: payload.pcd,
			additional_info: payload.observacoes,
			origem: 'netmotorsApp'
		}
		try{	
			const cadastro = await api.post('/veiculos', model, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				}
			});
			return cadastro
		} catch (err) {
			return err.data.message
		}
	}

	async AddFotos(fotos, id_auto){
		const token = await AsyncStorage.getItem('token');

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Bearer ' + token
			},
		};

		let fd = new FormData();

		fotos.forEach(ids => fd.append('fotos[]', {
			uri: ids.path, 
			type: ids.mime,
			name: ids.filename || `${Date.now()}.jpg`,
		}))

		fd.append('id_auto', id_auto);

		try {
			const fotos = api.post('/veiculos/add_fotos', fd, config);
			return fotos;
		} catch(err){
			return err
		}
	}

	async uploadImage(fotos, id_auto){
		const token = await AsyncStorage.getItem('token');
		try{
			
	     	let fd = new FormData();

			fd.append('fotos[]', fotos)
			fd.append('id_auto', id_auto);
	         
	      let res = await fetch('https://api.netmotors.com.br/api/v1/veiculos/add_fotos',
	      	{
	         	method: 'post',
	         	body: fd,
	         	headers: {
	            	'Content-Type': 'multipart/form-data',
	            	'Authorization': 'Bearer ' + token
	         	},
	      	}
	      );
	      return res
		}catch(err){
			console.log("foto" +err)
			return err
		}
   };

   async deletarAnuncio(id){
      const token = await AsyncStorage.getItem('token');
		try{
			const detalhe = await api.delete('/veiculos/'+id, { 
				headers: {
	            'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
	        	}
			})
			return detalhe
		} catch (err) {
			const error = err
			return error
		}
	}

}

export { HelpersAnuncios };

