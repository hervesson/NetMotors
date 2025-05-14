export const combustiveis = [
	{label: 'GASOLINA', value: 'gasolina'},
	{label: 'DIESEL', value: 'diesel'},
	{label: 'ALCOOL', value: 'alcool'},
	{label: 'GNV', value: 'gnv'},
	{label: 'FLEX(Álcool, Gasolina)', value: 'flex'},
	{label: 'ELÉTRICO', value: 'eletrico'},
]

export const cambios = [
	{label: 'MANUAL', value: 'manual'},
	{label: 'AUTOMÁTICO', value: 'automatico'},
	{label: 'SEMI-AUTOMÁTICO', value: 'semiautomatico'},
	{label: 'AUTOMATIZADO', value: 'automatizado'}
]

export const cores = [
	{value: 'beige', label: 'BEJE'},
	{value: 'black', label: 'PRETO'},
	{value: 'blue',label: 'AZUL'},
	{value: 'brown', label: 'MARROM'},
	{value: 'gold', label: 'DOURADO'},
	{value: 'green', label: 'VERDE'},
	{value: 'grey', label: 'CINZA'},
	{value: 'orange', label: 'LARANJA'},
	{value: 'pink', label: 'ROSA'},
	{value: 'purple', label: 'ROXA'},
	{value: 'red', label: 'VERMELHO'},
	{value: 'silver', label: 'PRATA'},
	{value: 'violet', label: 'VIOLETA'},
	{value: 'white', label: 'BRANCO'},
	{value: 'yellow', label: 'AMARELO'}
]

export const carrocerias = [
	{value: 'convertible', label: 'CONVERSIÍVEL'},
	{value: 'sedan', label: 'SEDAN'},
	{value: 'off-road',label: 'OFF-ROAD'},
	{value: 'pickup', label: 'PICKUP'},
	{value: 'truck', label: 'TRUCK'},
	{value: 'hatchback', label: 'HATCHBACK'},
	{value: 'sports-car-coupe', label: 'CUPÉ'},
	{value: 'van-minibus', label: 'VAN'},
	{value: 'other', label: 'OUTRO'}
]

export const rangeYear = () => {
  const max = new Date().getFullYear()
  const min = max - 60
  const years = []

  for (let i = max; i >= min; i--) {
      years.push({value: i, label: i.toString()})
  }
  return years
}