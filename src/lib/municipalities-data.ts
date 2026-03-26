// Dataset de los principales municipios de España (~100 más poblados)
// Cada municipio hereda los festivos de su comunidad autónoma

import { Location } from './types';

// Categorías para plantillas de contenido "Qué hacer en [ciudad]"
export type MunicipalityCategory = 'coastal' | 'large_city' | 'interior' | 'historic' | 'mountain';

export interface Municipality extends Location {
  population: number;
  category: MunicipalityCategory;
}

export const municipios: Municipality[] = [
  // =============================================
  // ANDALUCÍA
  // =============================================
  // Almería
  { id: 'm-almeria', name: 'Almería', slug: 'almeria-ciudad', type: 'municipality', code: '04013', parent_id: 'p-alm', population: 202524, category: 'coastal' },
  { id: 'm-roquetas', name: 'Roquetas de Mar', slug: 'roquetas-de-mar', type: 'municipality', code: '04079', parent_id: 'p-alm', population: 97000, category: 'coastal' },
  { id: 'm-ejido', name: 'El Ejido', slug: 'el-ejido', type: 'municipality', code: '04032', parent_id: 'p-alm', population: 85000, category: 'coastal' },
  // Cádiz
  { id: 'm-cadiz', name: 'Cádiz', slug: 'cadiz-ciudad', type: 'municipality', code: '11012', parent_id: 'p-cad', population: 116027, category: 'coastal' },
  { id: 'm-jerez', name: 'Jerez de la Frontera', slug: 'jerez-de-la-frontera', type: 'municipality', code: '11020', parent_id: 'p-cad', population: 212915, category: 'historic' },
  { id: 'm-algeciras', name: 'Algeciras', slug: 'algeciras', type: 'municipality', code: '11004', parent_id: 'p-cad', population: 122982, category: 'coastal' },
  { id: 'm-sanfernando', name: 'San Fernando', slug: 'san-fernando', type: 'municipality', code: '11031', parent_id: 'p-cad', population: 95000, category: 'coastal' },
  // Córdoba
  { id: 'm-cordoba', name: 'Córdoba', slug: 'cordoba-ciudad', type: 'municipality', code: '14021', parent_id: 'p-cor', population: 325708, category: 'historic' },
  // Granada
  { id: 'm-granada', name: 'Granada', slug: 'granada-ciudad', type: 'municipality', code: '18087', parent_id: 'p-gra', population: 231775, category: 'historic' },
  { id: 'm-motril', name: 'Motril', slug: 'motril', type: 'municipality', code: '18140', parent_id: 'p-gra', population: 60800, category: 'coastal' },
  // Huelva
  { id: 'm-huelva', name: 'Huelva', slug: 'huelva-ciudad', type: 'municipality', code: '21041', parent_id: 'p-hue', population: 144258, category: 'coastal' },
  // Jaén
  { id: 'm-jaen', name: 'Jaén', slug: 'jaen-ciudad', type: 'municipality', code: '23050', parent_id: 'p-jae', population: 111932, category: 'interior' },
  { id: 'm-linares', name: 'Linares', slug: 'linares', type: 'municipality', code: '23055', parent_id: 'p-jae', population: 57000, category: 'interior' },
  // Málaga
  { id: 'm-malaga', name: 'Málaga', slug: 'malaga-ciudad', type: 'municipality', code: '29067', parent_id: 'p-mal', population: 578460, category: 'coastal' },
  { id: 'm-marbella', name: 'Marbella', slug: 'marbella', type: 'municipality', code: '29069', parent_id: 'p-mal', population: 147633, category: 'coastal' },
  { id: 'm-fuengirola', name: 'Fuengirola', slug: 'fuengirola', type: 'municipality', code: '29054', parent_id: 'p-mal', population: 81400, category: 'coastal' },
  { id: 'm-torremolinos', name: 'Torremolinos', slug: 'torremolinos', type: 'municipality', code: '29901', parent_id: 'p-mal', population: 69400, category: 'coastal' },
  { id: 'm-benalmadena', name: 'Benalmádena', slug: 'benalmadena', type: 'municipality', code: '29025', parent_id: 'p-mal', population: 71700, category: 'coastal' },
  { id: 'm-estepona', name: 'Estepona', slug: 'estepona', type: 'municipality', code: '29051', parent_id: 'p-mal', population: 72500, category: 'coastal' },
  // Sevilla
  { id: 'm-sevilla', name: 'Sevilla', slug: 'sevilla-ciudad', type: 'municipality', code: '41091', parent_id: 'p-sev', population: 684234, category: 'large_city' },
  { id: 'm-dos-hermanas', name: 'Dos Hermanas', slug: 'dos-hermanas', type: 'municipality', code: '41038', parent_id: 'p-sev', population: 135000, category: 'interior' },
  { id: 'm-alcala-guadaira', name: 'Alcalá de Guadaíra', slug: 'alcala-de-guadaira', type: 'municipality', code: '41004', parent_id: 'p-sev', population: 75000, category: 'interior' },

  // =============================================
  // ARAGÓN
  // =============================================
  { id: 'm-zaragoza', name: 'Zaragoza', slug: 'zaragoza-ciudad', type: 'municipality', code: '50297', parent_id: 'p-zar', population: 674997, category: 'large_city' },
  { id: 'm-huesca', name: 'Huesca', slug: 'huesca-ciudad', type: 'municipality', code: '22125', parent_id: 'p-hues', population: 53132, category: 'mountain' },
  { id: 'm-teruel', name: 'Teruel', slug: 'teruel-ciudad', type: 'municipality', code: '44216', parent_id: 'p-ter', population: 35890, category: 'historic' },

  // =============================================
  // ASTURIAS
  // =============================================
  { id: 'm-gijon', name: 'Gijón', slug: 'gijon', type: 'municipality', code: '33024', parent_id: 'p-ast', population: 271843, category: 'coastal' },
  { id: 'm-oviedo', name: 'Oviedo', slug: 'oviedo', type: 'municipality', code: '33044', parent_id: 'p-ast', population: 220020, category: 'large_city' },
  { id: 'm-aviles', name: 'Avilés', slug: 'aviles', type: 'municipality', code: '33004', parent_id: 'p-ast', population: 78000, category: 'coastal' },

  // =============================================
  // ISLAS BALEARES
  // =============================================
  { id: 'm-palma', name: 'Palma de Mallorca', slug: 'palma-de-mallorca', type: 'municipality', code: '07040', parent_id: 'p-bal', population: 416065, category: 'coastal' },
  { id: 'm-ibiza', name: 'Ibiza', slug: 'ibiza', type: 'municipality', code: '07026', parent_id: 'p-bal', population: 50000, category: 'coastal' },

  // =============================================
  // CANARIAS
  // =============================================
  { id: 'm-las-palmas', name: 'Las Palmas de Gran Canaria', slug: 'las-palmas-de-gran-canaria', type: 'municipality', code: '35016', parent_id: 'p-lpa', population: 379925, category: 'coastal' },
  { id: 'm-telde', name: 'Telde', slug: 'telde', type: 'municipality', code: '35026', parent_id: 'p-lpa', population: 102000, category: 'coastal' },
  { id: 'm-santa-cruz', name: 'Santa Cruz de Tenerife', slug: 'santa-cruz-de-tenerife-ciudad', type: 'municipality', code: '38038', parent_id: 'p-tfe', population: 209194, category: 'coastal' },
  { id: 'm-san-cristobal', name: 'San Cristóbal de La Laguna', slug: 'san-cristobal-de-la-laguna', type: 'municipality', code: '38023', parent_id: 'p-tfe', population: 157500, category: 'historic' },

  // =============================================
  // CANTABRIA
  // =============================================
  { id: 'm-santander', name: 'Santander', slug: 'santander', type: 'municipality', code: '39075', parent_id: 'p-cnt', population: 172044, category: 'coastal' },
  { id: 'm-torrelavega', name: 'Torrelavega', slug: 'torrelavega', type: 'municipality', code: '39087', parent_id: 'p-cnt', population: 52000, category: 'interior' },

  // =============================================
  // CASTILLA-LA MANCHA
  // =============================================
  { id: 'm-albacete', name: 'Albacete', slug: 'albacete-ciudad', type: 'municipality', code: '02003', parent_id: 'p-ab', population: 173329, category: 'interior' },
  { id: 'm-ciudad-real', name: 'Ciudad Real', slug: 'ciudad-real-ciudad', type: 'municipality', code: '13034', parent_id: 'p-cr', population: 75000, category: 'interior' },
  { id: 'm-guadalajara', name: 'Guadalajara', slug: 'guadalajara-ciudad', type: 'municipality', code: '19130', parent_id: 'p-gu', population: 87000, category: 'historic' },
  { id: 'm-toledo', name: 'Toledo', slug: 'toledo-ciudad', type: 'municipality', code: '45168', parent_id: 'p-to', population: 84282, category: 'historic' },
  { id: 'm-talavera', name: 'Talavera de la Reina', slug: 'talavera-de-la-reina', type: 'municipality', code: '45165', parent_id: 'p-to', population: 84000, category: 'historic' },

  // =============================================
  // CASTILLA Y LEÓN
  // =============================================
  { id: 'm-valladolid', name: 'Valladolid', slug: 'valladolid-ciudad', type: 'municipality', code: '47186', parent_id: 'p-va', population: 298412, category: 'large_city' },
  { id: 'm-burgos', name: 'Burgos', slug: 'burgos-ciudad', type: 'municipality', code: '09059', parent_id: 'p-bu', population: 176418, category: 'historic' },
  { id: 'm-salamanca', name: 'Salamanca', slug: 'salamanca-ciudad', type: 'municipality', code: '37274', parent_id: 'p-sa', population: 144228, category: 'historic' },
  { id: 'm-leon', name: 'León', slug: 'leon-ciudad', type: 'municipality', code: '24089', parent_id: 'p-le', population: 124303, category: 'historic' },
  { id: 'm-segovia', name: 'Segovia', slug: 'segovia-ciudad', type: 'municipality', code: '40194', parent_id: 'p-sg', population: 52000, category: 'historic' },

  // =============================================
  // CATALUÑA
  // =============================================
  { id: 'm-barcelona', name: 'Barcelona', slug: 'barcelona-ciudad', type: 'municipality', code: '08019', parent_id: 'p-bcn', population: 1636762, category: 'large_city' },
  { id: 'm-hospitalet', name: "L'Hospitalet de Llobregat", slug: 'hospitalet-de-llobregat', type: 'municipality', code: '08101', parent_id: 'p-bcn', population: 264923, category: 'large_city' },
  { id: 'm-badalona', name: 'Badalona', slug: 'badalona', type: 'municipality', code: '08015', parent_id: 'p-bcn', population: 223166, category: 'coastal' },
  { id: 'm-terrassa', name: 'Terrassa', slug: 'terrassa', type: 'municipality', code: '08279', parent_id: 'p-bcn', population: 223627, category: 'interior' },
  { id: 'm-sabadell', name: 'Sabadell', slug: 'sabadell', type: 'municipality', code: '08187', parent_id: 'p-bcn', population: 213644, category: 'interior' },
  { id: 'm-mataro', name: 'Mataró', slug: 'mataro', type: 'municipality', code: '08120', parent_id: 'p-bcn', population: 129661, category: 'coastal' },
  { id: 'm-santa-coloma', name: 'Santa Coloma de Gramenet', slug: 'santa-coloma-de-gramenet', type: 'municipality', code: '08245', parent_id: 'p-bcn', population: 120000, category: 'large_city' },
  { id: 'm-cornella', name: 'Cornellà de Llobregat', slug: 'cornella-de-llobregat', type: 'municipality', code: '08073', parent_id: 'p-bcn', population: 89000, category: 'large_city' },
  { id: 'm-castelldefels', name: 'Castelldefels', slug: 'castelldefels', type: 'municipality', code: '08067', parent_id: 'p-bcn', population: 67000, category: 'coastal' },
  { id: 'm-girona', name: 'Girona', slug: 'girona-ciudad', type: 'municipality', code: '17079', parent_id: 'p-gi', population: 103369, category: 'historic' },
  { id: 'm-lleida', name: 'Lleida', slug: 'lleida-ciudad', type: 'municipality', code: '25120', parent_id: 'p-ll', population: 139176, category: 'interior' },
  { id: 'm-tarragona', name: 'Tarragona', slug: 'tarragona-ciudad', type: 'municipality', code: '43148', parent_id: 'p-ta', population: 134515, category: 'coastal' },
  { id: 'm-reus', name: 'Reus', slug: 'reus', type: 'municipality', code: '43123', parent_id: 'p-ta', population: 107000, category: 'interior' },

  // =============================================
  // COMUNIDAD VALENCIANA
  // =============================================
  { id: 'm-valencia', name: 'Valencia', slug: 'valencia-ciudad', type: 'municipality', code: '46250', parent_id: 'p-vlc', population: 800215, category: 'large_city' },
  { id: 'm-torrent', name: 'Torrent', slug: 'torrent', type: 'municipality', code: '46244', parent_id: 'p-vlc', population: 83000, category: 'interior' },
  { id: 'm-gandia', name: 'Gandía', slug: 'gandia', type: 'municipality', code: '46131', parent_id: 'p-vlc', population: 74000, category: 'coastal' },
  { id: 'm-alicante', name: 'Alicante', slug: 'alicante-ciudad', type: 'municipality', code: '03014', parent_id: 'p-ali', population: 337304, category: 'coastal' },
  { id: 'm-elche', name: 'Elche', slug: 'elche', type: 'municipality', code: '03065', parent_id: 'p-ali', population: 234765, category: 'historic' },
  { id: 'm-torrevieja', name: 'Torrevieja', slug: 'torrevieja', type: 'municipality', code: '03133', parent_id: 'p-ali', population: 92000, category: 'coastal' },
  { id: 'm-benidorm', name: 'Benidorm', slug: 'benidorm', type: 'municipality', code: '03031', parent_id: 'p-ali', population: 71000, category: 'coastal' },
  { id: 'm-orihuela', name: 'Orihuela', slug: 'orihuela', type: 'municipality', code: '03099', parent_id: 'p-ali', population: 82000, category: 'coastal' },
  { id: 'm-castellon', name: 'Castellón de la Plana', slug: 'castellon-de-la-plana', type: 'municipality', code: '12040', parent_id: 'p-cas', population: 174264, category: 'coastal' },

  // =============================================
  // EXTREMADURA
  // =============================================
  { id: 'm-badajoz', name: 'Badajoz', slug: 'badajoz-ciudad', type: 'municipality', code: '06015', parent_id: 'p-ba', population: 150984, category: 'interior' },
  { id: 'm-merida', name: 'Mérida', slug: 'merida', type: 'municipality', code: '06083', parent_id: 'p-ba', population: 59352, category: 'historic' },
  { id: 'm-caceres', name: 'Cáceres', slug: 'caceres-ciudad', type: 'municipality', code: '10037', parent_id: 'p-cc', population: 96068, category: 'historic' },
  { id: 'm-plasencia', name: 'Plasencia', slug: 'plasencia', type: 'municipality', code: '10148', parent_id: 'p-cc', population: 40000, category: 'historic' },

  // =============================================
  // GALICIA
  // =============================================
  { id: 'm-vigo', name: 'Vigo', slug: 'vigo', type: 'municipality', code: '36057', parent_id: 'p-po', population: 295364, category: 'coastal' },
  { id: 'm-coruna', name: 'A Coruña', slug: 'a-coruna-ciudad', type: 'municipality', code: '15030', parent_id: 'p-co', population: 245711, category: 'coastal' },
  { id: 'm-ourense', name: 'Ourense', slug: 'ourense-ciudad', type: 'municipality', code: '32054', parent_id: 'p-ou', population: 105505, category: 'interior' },
  { id: 'm-lugo', name: 'Lugo', slug: 'lugo-ciudad', type: 'municipality', code: '27028', parent_id: 'p-lu', population: 98276, category: 'historic' },
  { id: 'm-santiago', name: 'Santiago de Compostela', slug: 'santiago-de-compostela', type: 'municipality', code: '15078', parent_id: 'p-co', population: 98005, category: 'historic' },
  { id: 'm-pontevedra', name: 'Pontevedra', slug: 'pontevedra-ciudad', type: 'municipality', code: '36038', parent_id: 'p-po', population: 83400, category: 'coastal' },
  { id: 'm-ferrol', name: 'Ferrol', slug: 'ferrol', type: 'municipality', code: '15036', parent_id: 'p-co', population: 66000, category: 'coastal' },

  // =============================================
  // COMUNIDAD DE MADRID
  // =============================================
  { id: 'm-madrid', name: 'Madrid', slug: 'madrid-ciudad', type: 'municipality', code: '28079', parent_id: 'p-mad', population: 3305408, category: 'large_city' },
  { id: 'm-mostoles', name: 'Móstoles', slug: 'mostoles', type: 'municipality', code: '28092', parent_id: 'p-mad', population: 209661, category: 'large_city' },
  { id: 'm-alcala', name: 'Alcalá de Henares', slug: 'alcala-de-henares', type: 'municipality', code: '28005', parent_id: 'p-mad', population: 204574, category: 'historic' },
  { id: 'm-fuenlabrada', name: 'Fuenlabrada', slug: 'fuenlabrada', type: 'municipality', code: '28058', parent_id: 'p-mad', population: 194791, category: 'large_city' },
  { id: 'm-leganes', name: 'Leganés', slug: 'leganes', type: 'municipality', code: '28074', parent_id: 'p-mad', population: 190852, category: 'large_city' },
  { id: 'm-getafe', name: 'Getafe', slug: 'getafe', type: 'municipality', code: '28065', parent_id: 'p-mad', population: 183374, category: 'large_city' },
  { id: 'm-alcorcon', name: 'Alcorcón', slug: 'alcorcon', type: 'municipality', code: '28007', parent_id: 'p-mad', population: 170514, category: 'large_city' },
  { id: 'm-torrejon', name: 'Torrejón de Ardoz', slug: 'torrejon-de-ardoz', type: 'municipality', code: '28148', parent_id: 'p-mad', population: 131489, category: 'large_city' },
  { id: 'm-parla', name: 'Parla', slug: 'parla', type: 'municipality', code: '28106', parent_id: 'p-mad', population: 131000, category: 'large_city' },
  { id: 'm-alcobendas', name: 'Alcobendas', slug: 'alcobendas', type: 'municipality', code: '28006', parent_id: 'p-mad', population: 118000, category: 'large_city' },
  { id: 'm-rozas', name: 'Las Rozas de Madrid', slug: 'las-rozas-de-madrid', type: 'municipality', code: '28127', parent_id: 'p-mad', population: 100400, category: 'large_city' },
  { id: 'm-coslada', name: 'Coslada', slug: 'coslada', type: 'municipality', code: '28049', parent_id: 'p-mad', population: 91000, category: 'large_city' },

  // =============================================
  // REGIÓN DE MURCIA
  // =============================================
  { id: 'm-murcia', name: 'Murcia', slug: 'murcia-ciudad', type: 'municipality', code: '30030', parent_id: 'p-mur', population: 460349, category: 'large_city' },
  { id: 'm-cartagena', name: 'Cartagena', slug: 'cartagena', type: 'municipality', code: '30016', parent_id: 'p-mur', population: 216451, category: 'coastal' },
  { id: 'm-lorca', name: 'Lorca', slug: 'lorca', type: 'municipality', code: '30024', parent_id: 'p-mur', population: 96000, category: 'historic' },

  // =============================================
  // NAVARRA
  // =============================================
  { id: 'm-pamplona', name: 'Pamplona', slug: 'pamplona', type: 'municipality', code: '31201', parent_id: 'p-nav', population: 203418, category: 'historic' },

  // =============================================
  // PAÍS VASCO
  // =============================================
  { id: 'm-bilbao', name: 'Bilbao', slug: 'bilbao', type: 'municipality', code: '48020', parent_id: 'p-bi', population: 347829, category: 'large_city' },
  { id: 'm-vitoria', name: 'Vitoria-Gasteiz', slug: 'vitoria-gasteiz', type: 'municipality', code: '01059', parent_id: 'p-al', population: 253672, category: 'large_city' },
  { id: 'm-donostia', name: 'San Sebastián', slug: 'san-sebastian', type: 'municipality', code: '20069', parent_id: 'p-ss', population: 188240, category: 'coastal' },
  { id: 'm-barakaldo', name: 'Barakaldo', slug: 'barakaldo', type: 'municipality', code: '48013', parent_id: 'p-bi', population: 100000, category: 'large_city' },
  { id: 'm-getxo', name: 'Getxo', slug: 'getxo', type: 'municipality', code: '48036', parent_id: 'p-bi', population: 78000, category: 'coastal' },

  // =============================================
  // LA RIOJA
  // =============================================
  { id: 'm-logrono', name: 'Logroño', slug: 'logrono', type: 'municipality', code: '26089', parent_id: 'p-rio', population: 151136, category: 'interior' },
];

// =============================================
// PLANTILLAS DE CONTENIDO POR CATEGORÍA
// =============================================
export interface CityPlan {
  emoji: string;
  title: string;
  description: string;
}

const coastalPlans: CityPlan[] = [
  { emoji: '🏖️', title: 'Paseo por el marítimo', description: 'Aprovecha el festivo para pasear por el paseo marítimo, respirar aire puro y disfrutar de las vistas al mar.' },
  { emoji: '🍤', title: 'Chiringuitos y gastronomía', description: 'Disfruta de una paella, pescaíto frito o mariscos frescos en los chiringuitos y restaurantes con vistas al mar.' },
  { emoji: '🚴', title: 'Ruta en bici por la costa', description: 'Alquila una bicicleta y recorre los kilómetros de carril bici que bordean la línea costera de la ciudad.' },
  { emoji: '🌅', title: 'Atardecer en la playa', description: 'Sin madrugar al día siguiente, quédate a ver el atardecer. Es el plan perfecto para un festivo junto al mar.' },
];

const largeCityPlans: CityPlan[] = [
  { emoji: '🏛️', title: 'Museos gratis', description: 'Muchos museos ofrecen entrada gratuita en festivos o tienen horarios especiales. Aprovecha para cultura sin coste.' },
  { emoji: '🌳', title: 'Parques y jardines', description: 'Explora los parques y zonas verdes de la ciudad. Un festivo es perfecto para un picnic improvisado.' },
  { emoji: '🍽️', title: 'Ruta gastronómica', description: 'Recorre los barrios emblemáticos probando tapas, pinchos y platos típicos de la zona.' },
  { emoji: '🛍️', title: 'Mercadillos y compras', description: 'Los festivos suelen traer mercadillos especiales, ferias y rastros con productos artesanales y locales.' },
];

const interiorPlans: CityPlan[] = [
  { emoji: '🏞️', title: 'Excursión por los alrededores', description: 'Aprovecha el día libre para hacer una excursión a los pueblos y paisajes naturales de los alrededores.' },
  { emoji: '🍷', title: 'Enoturismo y gastronomía', description: 'Visita bodegas de la zona, degusta vinos locales y disfruta de la gastronomía del interior.' },
  { emoji: '🏰', title: 'Patrimonio y cultura', description: 'Recorre el casco histórico, visita iglesias, palacios y monumentos que normalmente no tienes tiempo de ver.' },
  { emoji: '☕', title: 'Terrazas y descanso', description: 'Hotel rural, spa de la zona, o simplemente una terraza tranquila para desconectar sin prisas.' },
];

const historicPlans: CityPlan[] = [
  { emoji: '🏛️', title: 'Ruta monumental', description: 'Dedica el festivo a recorrer los monumentos, catedrales y edificios históricos que hacen única a esta ciudad.' },
  { emoji: '📸', title: 'Free tour o visita guiada', description: 'Muchas ciudades históricas ofrecen free tours en festivos. Descubre historias y rincones que no conocías.' },
  { emoji: '🍴', title: 'Gastronomía tradicional', description: 'Prueba los platos típicos de la ciudad en sus restaurantes más emblemáticos o en un mesón con historia.' },
  { emoji: '🌙', title: 'Ruta nocturna', description: 'Las ciudades históricas tienen un encanto especial por la noche. Pasea por sus calles iluminadas.' },
];

const mountainPlans: CityPlan[] = [
  { emoji: '🥾', title: 'Senderismo', description: 'Aprovecha el festivo para hacer una ruta de senderismo por los montes y caminos naturales de la zona.' },
  { emoji: '🏔️', title: 'Mirador y vistas', description: 'Sube a un mirador cercano y disfruta de las vistas panorámicas sin las prisas del día a día.' },
  { emoji: '🧀', title: 'Productos de la tierra', description: 'Visita mercados locales y prueba quesos, embutidos y productos artesanales de montaña.' },
  { emoji: '♨️', title: 'Termalismo y relax', description: 'Muchas zonas de montaña tienen balnearios y aguas termales. El plan perfecto para un festivo.' },
];

export function getPlansForCategory(category: MunicipalityCategory): CityPlan[] {
  switch (category) {
    case 'coastal': return coastalPlans;
    case 'large_city': return largeCityPlans;
    case 'interior': return interiorPlans;
    case 'historic': return historicPlans;
    case 'mountain': return mountainPlans;
  }
}

// =============================================
// HELPERS
// =============================================
export function getMunicipalitiesByProvince(provinceId: string): Municipality[] {
  return municipios.filter(m => m.parent_id === provinceId);
}

export function getMunicipalityBySlug(slug: string): Municipality | undefined {
  return municipios.find(m => m.slug === slug);
}

export function getAllMunicipalities(): Municipality[] {
  return municipios;
}
