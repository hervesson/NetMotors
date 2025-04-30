import api from "../api";

class HelpersModelos {

	async GetMarcas() {
		try {
			const marcas = await api.get('/veiculosmodelos/?tipo=marca', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return marcas;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async GetModelos(pid) {
		try {
			const marcas = await api.get('/veiculosmodelos/?pid='+pid+'&tipo=modelo', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return marcas;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async GetVersoes(pid) {
		try {
			const marcas = await api.get('/veiculosmodelos/?pid='+pid+'&tipo=versao', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return marcas;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

}

export { HelpersModelos };

