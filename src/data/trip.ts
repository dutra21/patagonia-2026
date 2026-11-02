import type { ChecklistCategory, ChecklistItem, Trip } from '../domain/types'

// Public site: never add booking codes, passport numbers, phones or e-mails here.

export const trip: Trip = {
  title: 'Patagonia 2026',
  start: '2026-11-20',
  end: '2026-11-30',
  origin: 'sao-paulo',
  route: ['sao-paulo', 'buenos-aires', 'el-calafate', 'el-chalten', 'ushuaia', 'buenos-aires', 'sao-paulo'],

  places: {
    'sao-paulo': {
      id: 'sao-paulo',
      name: 'São Paulo',
      timeZone: 'America/Sao_Paulo',
      airport: { code: 'GRU', name: 'Aeroporto de Guarulhos' },
    },
    'buenos-aires': {
      id: 'buenos-aires',
      name: 'Buenos Aires',
      timeZone: 'America/Argentina/Buenos_Aires',
      airport: { code: 'AEP', name: 'Aeroparque Jorge Newbery' },
    },
    'el-calafate': {
      id: 'el-calafate',
      name: 'El Calafate',
      timeZone: 'America/Argentina/Rio_Gallegos',
      airport: { code: 'FTE', name: 'Aeroporto de El Calafate' },
    },
    'el-chalten': {
      id: 'el-chalten',
      name: 'El Chaltén',
      timeZone: 'America/Argentina/Rio_Gallegos',
    },
    ushuaia: {
      id: 'ushuaia',
      name: 'Ushuaia',
      timeZone: 'America/Argentina/Ushuaia',
      airport: { code: 'USH', name: 'Aeroporto de Ushuaia' },
    },
  },

  travelers: [
    { id: 'mariana', name: 'Mariana' },
    { id: 'duda', name: 'Duda' },
    { id: 'marcia', name: 'Márcia' },
    { id: 'andrea', name: 'Andréa' },
  ],

  flights: [
    { id: 'gru-aep', code: 'LA8140', from: 'sao-paulo', to: 'buenos-aires', departure: '2026-11-20T09:00-03:00', arrival: '2026-11-20T12:00-03:00' },
    { id: 'aep-fte', code: 'AR1850', from: 'buenos-aires', to: 'el-calafate', departure: '2026-11-20T16:40-03:00', arrival: '2026-11-20T20:00-03:00' },
    { id: 'fte-ush', code: 'AR1894', from: 'el-calafate', to: 'ushuaia', departure: '2026-11-26T14:30-03:00', arrival: '2026-11-26T15:50-03:00' },
    { id: 'ush-aep', code: 'AR1881', from: 'ushuaia', to: 'buenos-aires', departure: '2026-11-29T09:20-03:00', arrival: '2026-11-29T12:50-03:00' },
    { id: 'aep-gru', code: 'LA8139', from: 'buenos-aires', to: 'sao-paulo', departure: '2026-11-30T10:35-03:00', arrival: '2026-11-30T13:15-03:00' },
  ],

  stays: [
    {
      id: 'calafate-airbnb',
      placeId: 'el-calafate',
      name: 'Airbnb em El Calafate',
      address: 'Fuentes del Coyle 53, El Calafate',
      checkIn: { date: '2026-11-20', from: '2026-11-20T15:00-03:00' },
      checkOut: { date: '2026-11-22', until: '2026-11-22T10:00-03:00' },
    },
    {
      id: 'chalten-ruta-40',
      placeId: 'el-chalten',
      name: 'Apart Ruta 40',
      address: 'Comandante Arrua, El Chaltén, Argentina',
      checkIn: { date: '2026-11-22', from: '2026-11-22T14:00-03:00', until: '2026-11-22T20:30-03:00' },
      checkOut: { date: '2026-11-26' }, // TODO: confirmar horário do check-out
    },
    {
      id: 'ushuaia-airbnb',
      placeId: 'ushuaia',
      name: 'Airbnb em Ushuaia',
      address: 'Goleta Florencia 595, 2do I, Ushuaia, Tierra del Fuego, V9410',
      checkIn: { date: '2026-11-26', from: '2026-11-26T15:00-03:00' },
      checkOut: { date: '2026-11-29' }, // TODO: confirmar horário do check-out
    },
    {
      id: 'buenos-aires-regis',
      placeId: 'buenos-aires',
      name: 'Hotel Regis',
      address: 'Lavalle 813, 1047 Buenos Aires, Argentina',
      checkIn: { date: '2026-11-29', from: '2026-11-29T14:00-03:00' },
      checkOut: { date: '2026-11-30' }, // TODO: confirmar horário do check-out
    },
  ],

  activities: [
    {
      id: 'perito-moreno',
      name: 'Glaciar Perito Moreno',
      placeId: 'el-calafate',
      date: '2026-11-21',
      description: 'Parque Nacional Los Glaciares e passarelas do Perito Moreno.',
      transport: 'De carro alugado',
      // TODO: confirmar dificuldade
    },
    {
      id: 'miradores-chalten',
      name: 'Mirador de los Cóndores e Mirador de las Águilas',
      placeId: 'el-chalten',
      date: '2026-11-22',
      description: 'Trilha curta (cerca de 2 km) depois de chegar a El Chaltén.',
      // TODO: confirmar dificuldade
    },
    {
      id: 'laguna-capri',
      name: 'Laguna Capri',
      placeId: 'el-chalten',
      date: '2026-11-23',
      description: 'Trilha até a Laguna Capri.',
      // TODO: confirmar dificuldade
    },
    {
      id: 'piedras-blancas',
      name: 'Glaciar Piedras Blancas',
      placeId: 'el-chalten',
      date: '2026-11-24',
      description: 'Trilha até o mirante do Glaciar Piedras Blancas.',
      // TODO: confirmar dificuldade
    },
    {
      id: 'laguna-de-los-tres',
      name: 'Laguna de los Tres',
      placeId: 'el-chalten',
      date: '2026-11-25',
      description: 'Trilha até a Laguna de los Tres, na base do Fitz Roy.',
      // TODO: confirmar dificuldade
    },
    {
      id: 'canal-beagle',
      name: 'Navegação no Canal de Beagle',
      placeId: 'ushuaia',
      date: '2026-11-27',
      start: '2026-11-27T08:30-03:00',
      description: 'Traslado no ônibus da empresa e navegação pelo Canal de Beagle: Ilha dos Pássaros, Ilha dos Lobos-Marinhos, Farol Les Eclaireurs e Ilha Martillo.',
      transport: 'Ônibus da empresa + barco',
      meetingPoint: 'Encontro 30 min antes no escritório da Piratour, no Tourist Pier',
      // TODO: confirmar dificuldade
    },
    {
      id: 'tierra-del-fuego',
      name: 'Parque Nacional Tierra del Fuego',
      placeId: 'ushuaia',
      date: '2026-11-28',
      description: 'Trilhas e Trem do Fim do Mundo.',
      transport: 'A definir', // TODO: definir transporte
      // TODO: confirmar dificuldade
    },
  ],

  transfers: [
    { id: 'calafate-chalten', mode: 'car', from: 'el-calafate', to: 'el-chalten', date: '2026-11-22' }, // TODO: horário de saída a definir
    { id: 'chalten-calafate', mode: 'car', from: 'el-chalten', to: 'el-calafate', date: '2026-11-26' }, // TODO: horário de saída a definir
  ],

  carRentals: [
    {
      id: 'calafate-car',
      placeId: 'el-calafate',
      pickup: { at: '2026-11-20T21:00-03:00', location: 'Aeroporto de El Calafate (FTE)' },
      dropoff: { at: '2026-11-26T12:00-03:00', location: 'Aeroporto de El Calafate (FTE)' },
    },
  ],

  days: [
    {
      date: '2026-11-20',
      overnight: 'el-calafate',
      title: 'Chegada em El Calafate',
      description: 'São Paulo → Buenos Aires → El Calafate.',
      items: [
        { kind: 'flight', id: 'gru-aep' },
        { kind: 'flight', id: 'aep-fte' },
        { kind: 'car-pickup', id: 'calafate-car' },
        { kind: 'check-in', id: 'calafate-airbnb' },
      ],
    },
    {
      date: '2026-11-21',
      overnight: 'el-calafate',
      title: 'Glaciar Perito Moreno',
      description: 'Dia no Parque Nacional Los Glaciares, de carro.',
      items: [{ kind: 'activity', id: 'perito-moreno' }],
    },
    {
      date: '2026-11-22',
      overnight: 'el-chalten',
      title: 'Estrada para El Chaltén + miradores',
      description: 'De carro até El Chaltén e trilha curta até os miradores.',
      items: [
        { kind: 'check-out', id: 'calafate-airbnb' },
        { kind: 'transfer', id: 'calafate-chalten' },
        { kind: 'check-in', id: 'chalten-ruta-40' },
        { kind: 'activity', id: 'miradores-chalten' },
      ],
    },
    {
      date: '2026-11-23',
      overnight: 'el-chalten',
      title: 'Laguna Capri',
      description: 'Trilha até a Laguna Capri.',
      items: [{ kind: 'activity', id: 'laguna-capri' }],
    },
    {
      date: '2026-11-24',
      overnight: 'el-chalten',
      title: 'Glaciar Piedras Blancas',
      description: 'Trilha até o mirante do Glaciar Piedras Blancas.',
      items: [{ kind: 'activity', id: 'piedras-blancas' }],
    },
    {
      date: '2026-11-25',
      overnight: 'el-chalten',
      title: 'Laguna de los Tres',
      description: 'Trilha até a base do Fitz Roy.',
      items: [{ kind: 'activity', id: 'laguna-de-los-tres' }],
    },
    {
      date: '2026-11-26',
      overnight: 'ushuaia',
      title: 'Rumo a Ushuaia',
      description: 'De carro até El Calafate, devolução do carro e voo para Ushuaia.',
      items: [
        { kind: 'check-out', id: 'chalten-ruta-40' },
        { kind: 'transfer', id: 'chalten-calafate' },
        { kind: 'car-dropoff', id: 'calafate-car' },
        { kind: 'flight', id: 'fte-ush' },
        { kind: 'check-in', id: 'ushuaia-airbnb' },
      ],
    },
    {
      date: '2026-11-27',
      overnight: 'ushuaia',
      title: 'Canal de Beagle',
      description: 'Ilha dos Pássaros, Ilha dos Lobos-Marinhos, Farol Les Eclaireurs e Ilha Martillo.',
      items: [{ kind: 'activity', id: 'canal-beagle' }],
    },
    {
      date: '2026-11-28',
      overnight: 'ushuaia',
      title: 'Parque Nacional Tierra del Fuego',
      description: 'Trilhas e Trem do Fim do Mundo.',
      items: [{ kind: 'activity', id: 'tierra-del-fuego' }],
    },
    {
      date: '2026-11-29',
      overnight: 'buenos-aires',
      title: 'Voo cedo para Buenos Aires',
      description: 'Resto do dia livre na cidade.',
      items: [
        { kind: 'check-out', id: 'ushuaia-airbnb' },
        { kind: 'flight', id: 'ush-aep' },
        { kind: 'check-in', id: 'buenos-aires-regis' },
      ],
    },
    {
      date: '2026-11-30',
      overnight: null,
      title: 'Volta para casa',
      description: 'Buenos Aires → São Paulo.',
      items: [
        { kind: 'check-out', id: 'buenos-aires-regis' },
        { kind: 'flight', id: 'aep-gru' },
      ],
    },
  ],
}

export const checklistCategories: ChecklistCategory[] = [
  { id: 'clothes', label: 'Roupas' },
  { id: 'documents', label: 'Documentos' },
  { id: 'tech', label: 'Tecnologia' },
  { id: 'health', label: 'Saúde' },
  { id: 'other', label: 'Outros' },
]

// Initial list; edit freely.
export const checklistItems: ChecklistItem[] = [
  { id: 'jacket', category: 'clothes', label: 'Jaqueta impermeável e corta-vento' },
  { id: 'fleece', category: 'clothes', label: 'Fleece ou segunda camada' },
  { id: 'base-layer', category: 'clothes', label: 'Segunda pele térmica (blusa e calça)' },
  { id: 'hiking-pants', category: 'clothes', label: 'Calça de trilha' },
  { id: 'boots', category: 'clothes', label: 'Bota de trilha já amaciada' },
  { id: 'socks', category: 'clothes', label: 'Meias de trilha' },
  { id: 'hat-gloves', category: 'clothes', label: 'Gorro e luvas' },
  { id: 'buff', category: 'clothes', label: 'Buff ou bandana' },
  { id: 'sunglasses', category: 'clothes', label: 'Óculos de sol' },

  { id: 'id-doc', category: 'documents', label: 'RG (emitido há menos de 10 anos) ou passaporte' },
  { id: 'driver-license', category: 'documents', label: 'CNH para o carro alugado' },
  { id: 'insurance', category: 'documents', label: 'Seguro viagem' },
  { id: 'boarding', category: 'documents', label: 'Cartões de embarque salvos offline' },
  { id: 'cards', category: 'documents', label: 'Cartão de crédito internacional' },
  { id: 'cash', category: 'documents', label: 'Dinheiro em espécie (pesos ou dólares)' },

  { id: 'phone', category: 'tech', label: 'Celular e carregador' },
  { id: 'power-bank', category: 'tech', label: 'Power bank' },
  { id: 'adapter', category: 'tech', label: 'Adaptador de tomada (padrão argentino, tipo I)' },
  { id: 'offline-maps', category: 'tech', label: 'Mapas offline baixados' },
  { id: 'esim', category: 'tech', label: 'Chip ou eSIM internacional' },
  { id: 'headphones', category: 'tech', label: 'Fone de ouvido' },

  { id: 'sunscreen', category: 'health', label: 'Protetor solar' },
  { id: 'lip-balm', category: 'health', label: 'Protetor labial' },
  { id: 'meds', category: 'health', label: 'Remédios de uso pessoal' },
  { id: 'first-aid', category: 'health', label: 'Kit de primeiros socorros (curativos para bolhas)' },
  { id: 'seasickness', category: 'health', label: 'Remédio para enjoo (navegação)' },

  { id: 'daypack', category: 'other', label: 'Mochila de ataque' },
  { id: 'bottle', category: 'other', label: 'Garrafa de água' },
  { id: 'poles', category: 'other', label: 'Bastões de caminhada' },
  { id: 'headlamp', category: 'other', label: 'Lanterna de cabeça' },
  { id: 'snacks', category: 'other', label: 'Lanches para a trilha' },
  { id: 'trash-bag', category: 'other', label: 'Saco para lixo nas trilhas' },
]
