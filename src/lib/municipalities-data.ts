// Dataset de los principales municipios de España (~400 más poblados, >20.000 hab)
// Cada municipio hereda los festivos de su comunidad autónoma
// Fuente de datos poblacionales: INE - Padrón Municipal 2024

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

  // Almería (04)
  { id: 'm-almeria', name: 'Almería', slug: 'almeria-ciudad', type: 'municipality', code: '04013', parent_id: 'p-alm', population: 202524, category: 'coastal' },
  { id: 'm-roquetas', name: 'Roquetas de Mar', slug: 'roquetas-de-mar', type: 'municipality', code: '04079', parent_id: 'p-alm', population: 97000, category: 'coastal' },
  { id: 'm-ejido', name: 'El Ejido', slug: 'el-ejido', type: 'municipality', code: '04032', parent_id: 'p-alm', population: 85000, category: 'coastal' },
  { id: 'm-nijar', name: 'Níjar', slug: 'nijar', type: 'municipality', code: '04066', parent_id: 'p-alm', population: 32000, category: 'coastal' },
  { id: 'm-vicar', name: 'Vícar', slug: 'vicar', type: 'municipality', code: '04102', parent_id: 'p-alm', population: 27000, category: 'interior' },
  { id: 'm-adra', name: 'Adra', slug: 'adra', type: 'municipality', code: '04003', parent_id: 'p-alm', population: 24000, category: 'coastal' },

  // Cádiz (11)
  { id: 'm-cadiz', name: 'Cádiz', slug: 'cadiz-ciudad', type: 'municipality', code: '11012', parent_id: 'p-cad', population: 116027, category: 'coastal' },
  { id: 'm-jerez', name: 'Jerez de la Frontera', slug: 'jerez-de-la-frontera', type: 'municipality', code: '11020', parent_id: 'p-cad', population: 212915, category: 'historic' },
  { id: 'm-algeciras', name: 'Algeciras', slug: 'algeciras', type: 'municipality', code: '11004', parent_id: 'p-cad', population: 122982, category: 'coastal' },
  { id: 'm-sanfernando', name: 'San Fernando', slug: 'san-fernando', type: 'municipality', code: '11031', parent_id: 'p-cad', population: 95000, category: 'coastal' },
  { id: 'm-puerto-sm', name: 'El Puerto de Santa María', slug: 'el-puerto-de-santa-maria', type: 'municipality', code: '11027', parent_id: 'p-cad', population: 89000, category: 'coastal' },
  { id: 'm-chiclana', name: 'Chiclana de la Frontera', slug: 'chiclana-de-la-frontera', type: 'municipality', code: '11015', parent_id: 'p-cad', population: 86000, category: 'coastal' },
  { id: 'm-sanlucar', name: 'Sanlúcar de Barrameda', slug: 'sanlucar-de-barrameda', type: 'municipality', code: '11032', parent_id: 'p-cad', population: 69000, category: 'coastal' },
  { id: 'm-lalinea', name: 'La Línea de la Concepción', slug: 'la-linea-de-la-concepcion', type: 'municipality', code: '11022', parent_id: 'p-cad', population: 63000, category: 'coastal' },
  { id: 'm-puerto-real', name: 'Puerto Real', slug: 'puerto-real', type: 'municipality', code: '11028', parent_id: 'p-cad', population: 42000, category: 'coastal' },
  { id: 'm-sanroque', name: 'San Roque', slug: 'san-roque', type: 'municipality', code: '11033', parent_id: 'p-cad', population: 31000, category: 'coastal' },
  { id: 'm-arcos', name: 'Arcos de la Frontera', slug: 'arcos-de-la-frontera', type: 'municipality', code: '11006', parent_id: 'p-cad', population: 30000, category: 'historic' },
  { id: 'm-rota', name: 'Rota', slug: 'rota', type: 'municipality', code: '11030', parent_id: 'p-cad', population: 29000, category: 'coastal' },
  { id: 'm-losbarrios', name: 'Los Barrios', slug: 'los-barrios', type: 'municipality', code: '11008', parent_id: 'p-cad', population: 24000, category: 'interior' },
  { id: 'm-conil', name: 'Conil de la Frontera', slug: 'conil-de-la-frontera', type: 'municipality', code: '11014', parent_id: 'p-cad', population: 22000, category: 'coastal' },

  // Córdoba (14)
  { id: 'm-cordoba', name: 'Córdoba', slug: 'cordoba-ciudad', type: 'municipality', code: '14021', parent_id: 'p-cor', population: 325708, category: 'historic' },
  { id: 'm-lucena', name: 'Lucena', slug: 'lucena', type: 'municipality', code: '14038', parent_id: 'p-cor', population: 42000, category: 'interior' },
  { id: 'm-puente-genil', name: 'Puente Genil', slug: 'puente-genil', type: 'municipality', code: '14056', parent_id: 'p-cor', population: 30000, category: 'interior' },
  { id: 'm-montilla', name: 'Montilla', slug: 'montilla', type: 'municipality', code: '14042', parent_id: 'p-cor', population: 23000, category: 'historic' },
  { id: 'm-cabra', name: 'Cabra', slug: 'cabra', type: 'municipality', code: '14013', parent_id: 'p-cor', population: 21000, category: 'interior' },
  { id: 'm-priego', name: 'Priego de Córdoba', slug: 'priego-de-cordoba', type: 'municipality', code: '14055', parent_id: 'p-cor', population: 22000, category: 'historic' },

  // Granada (18)
  { id: 'm-granada', name: 'Granada', slug: 'granada-ciudad', type: 'municipality', code: '18087', parent_id: 'p-gra', population: 231775, category: 'historic' },
  { id: 'm-motril', name: 'Motril', slug: 'motril', type: 'municipality', code: '18140', parent_id: 'p-gra', population: 60800, category: 'coastal' },
  { id: 'm-almunecar', name: 'Almuñécar', slug: 'almunecar', type: 'municipality', code: '18017', parent_id: 'p-gra', population: 27000, category: 'coastal' },
  { id: 'm-armilla', name: 'Armilla', slug: 'armilla', type: 'municipality', code: '18021', parent_id: 'p-gra', population: 24000, category: 'large_city' },
  { id: 'm-maracena', name: 'Maracena', slug: 'maracena', type: 'municipality', code: '18127', parent_id: 'p-gra', population: 22000, category: 'large_city' },
  { id: 'm-baza', name: 'Baza', slug: 'baza', type: 'municipality', code: '18023', parent_id: 'p-gra', population: 21000, category: 'historic' },
  { id: 'm-loja', name: 'Loja', slug: 'loja', type: 'municipality', code: '18122', parent_id: 'p-gra', population: 21000, category: 'interior' },

  // Huelva (21)
  { id: 'm-huelva', name: 'Huelva', slug: 'huelva-ciudad', type: 'municipality', code: '21041', parent_id: 'p-hue', population: 144258, category: 'coastal' },
  { id: 'm-lepe', name: 'Lepe', slug: 'lepe', type: 'municipality', code: '21042', parent_id: 'p-hue', population: 28000, category: 'coastal' },
  { id: 'm-almonte', name: 'Almonte', slug: 'almonte', type: 'municipality', code: '21005', parent_id: 'p-hue', population: 24000, category: 'interior' },
  { id: 'm-isla-cristina', name: 'Isla Cristina', slug: 'isla-cristina', type: 'municipality', code: '21042', parent_id: 'p-hue', population: 21000, category: 'coastal' },
  { id: 'm-moguer', name: 'Moguer', slug: 'moguer', type: 'municipality', code: '21050', parent_id: 'p-hue', population: 22000, category: 'historic' },

  // Jaén (23)
  { id: 'm-jaen', name: 'Jaén', slug: 'jaen-ciudad', type: 'municipality', code: '23050', parent_id: 'p-jae', population: 111932, category: 'interior' },
  { id: 'm-linares', name: 'Linares', slug: 'linares', type: 'municipality', code: '23055', parent_id: 'p-jae', population: 57000, category: 'interior' },
  { id: 'm-andujar', name: 'Andújar', slug: 'andujar', type: 'municipality', code: '23005', parent_id: 'p-jae', population: 36000, category: 'interior' },
  { id: 'm-ubeda', name: 'Úbeda', slug: 'ubeda', type: 'municipality', code: '23092', parent_id: 'p-jae', population: 34000, category: 'historic' },
  { id: 'm-martos', name: 'Martos', slug: 'martos', type: 'municipality', code: '23060', parent_id: 'p-jae', population: 24000, category: 'interior' },

  // Málaga (29)
  { id: 'm-malaga', name: 'Málaga', slug: 'malaga-ciudad', type: 'municipality', code: '29067', parent_id: 'p-mal', population: 578460, category: 'coastal' },
  { id: 'm-marbella', name: 'Marbella', slug: 'marbella', type: 'municipality', code: '29069', parent_id: 'p-mal', population: 147633, category: 'coastal' },
  { id: 'm-mijas', name: 'Mijas', slug: 'mijas', type: 'municipality', code: '29070', parent_id: 'p-mal', population: 86000, category: 'coastal' },
  { id: 'm-velez-malaga', name: 'Vélez-Málaga', slug: 'velez-malaga', type: 'municipality', code: '29094', parent_id: 'p-mal', population: 82000, category: 'coastal' },
  { id: 'm-fuengirola', name: 'Fuengirola', slug: 'fuengirola', type: 'municipality', code: '29054', parent_id: 'p-mal', population: 81400, category: 'coastal' },
  { id: 'm-estepona', name: 'Estepona', slug: 'estepona', type: 'municipality', code: '29051', parent_id: 'p-mal', population: 72500, category: 'coastal' },
  { id: 'm-benalmadena', name: 'Benalmádena', slug: 'benalmadena', type: 'municipality', code: '29025', parent_id: 'p-mal', population: 71700, category: 'coastal' },
  { id: 'm-torremolinos', name: 'Torremolinos', slug: 'torremolinos', type: 'municipality', code: '29901', parent_id: 'p-mal', population: 69400, category: 'coastal' },
  { id: 'm-rincon-victoria', name: 'Rincón de la Victoria', slug: 'rincon-de-la-victoria', type: 'municipality', code: '29080', parent_id: 'p-mal', population: 48000, category: 'coastal' },
  { id: 'm-antequera', name: 'Antequera', slug: 'antequera', type: 'municipality', code: '29015', parent_id: 'p-mal', population: 41000, category: 'historic' },
  { id: 'm-alhaurin-torre', name: 'Alhaurín de la Torre', slug: 'alhaurin-de-la-torre', type: 'municipality', code: '29007', parent_id: 'p-mal', population: 41000, category: 'interior' },
  { id: 'm-ronda', name: 'Ronda', slug: 'ronda', type: 'municipality', code: '29084', parent_id: 'p-mal', population: 34000, category: 'historic' },
  { id: 'm-cartama', name: 'Cártama', slug: 'cartama', type: 'municipality', code: '29036', parent_id: 'p-mal', population: 28000, category: 'interior' },
  { id: 'm-alhaurin-grande', name: 'Alhaurín el Grande', slug: 'alhaurin-el-grande', type: 'municipality', code: '29008', parent_id: 'p-mal', population: 25000, category: 'interior' },
  { id: 'm-coin', name: 'Coín', slug: 'coin', type: 'municipality', code: '29038', parent_id: 'p-mal', population: 22000, category: 'interior' },
  { id: 'm-nerja', name: 'Nerja', slug: 'nerja', type: 'municipality', code: '29075', parent_id: 'p-mal', population: 22000, category: 'coastal' },

  // Sevilla (41)
  { id: 'm-sevilla', name: 'Sevilla', slug: 'sevilla-ciudad', type: 'municipality', code: '41091', parent_id: 'p-sev', population: 684234, category: 'large_city' },
  { id: 'm-dos-hermanas', name: 'Dos Hermanas', slug: 'dos-hermanas', type: 'municipality', code: '41038', parent_id: 'p-sev', population: 135000, category: 'interior' },
  { id: 'm-alcala-guadaira', name: 'Alcalá de Guadaíra', slug: 'alcala-de-guadaira', type: 'municipality', code: '41004', parent_id: 'p-sev', population: 75000, category: 'interior' },
  { id: 'm-utrera', name: 'Utrera', slug: 'utrera', type: 'municipality', code: '41095', parent_id: 'p-sev', population: 52000, category: 'historic' },
  { id: 'm-mairena-aljarafe', name: 'Mairena del Aljarafe', slug: 'mairena-del-aljarafe', type: 'municipality', code: '41059', parent_id: 'p-sev', population: 46000, category: 'large_city' },
  { id: 'm-ecija', name: 'Écija', slug: 'ecija', type: 'municipality', code: '41039', parent_id: 'p-sev', population: 40000, category: 'historic' },
  { id: 'm-rinconada', name: 'La Rinconada', slug: 'la-rinconada', type: 'municipality', code: '41081', parent_id: 'p-sev', population: 40000, category: 'interior' },
  { id: 'm-los-palacios', name: 'Los Palacios y Villafranca', slug: 'los-palacios-y-villafranca', type: 'municipality', code: '41069', parent_id: 'p-sev', population: 38000, category: 'interior' },
  { id: 'm-coria-rio', name: 'Coria del Río', slug: 'coria-del-rio', type: 'municipality', code: '41034', parent_id: 'p-sev', population: 30000, category: 'interior' },
  { id: 'm-carmona', name: 'Carmona', slug: 'carmona', type: 'municipality', code: '41024', parent_id: 'p-sev', population: 28000, category: 'historic' },
  { id: 'm-camas', name: 'Camas', slug: 'camas', type: 'municipality', code: '41023', parent_id: 'p-sev', population: 28000, category: 'large_city' },
  { id: 'm-tomares', name: 'Tomares', slug: 'tomares', type: 'municipality', code: '41093', parent_id: 'p-sev', population: 26000, category: 'large_city' },
  { id: 'm-bormujos', name: 'Bormujos', slug: 'bormujos', type: 'municipality', code: '41015', parent_id: 'p-sev', population: 23000, category: 'large_city' },
  { id: 'm-marchena', name: 'Marchena', slug: 'marchena', type: 'municipality', code: '41060', parent_id: 'p-sev', population: 20000, category: 'historic' },

  // =============================================
  // ARAGÓN
  // =============================================

  // Zaragoza (50)
  { id: 'm-zaragoza', name: 'Zaragoza', slug: 'zaragoza-ciudad', type: 'municipality', code: '50297', parent_id: 'p-zar', population: 674997, category: 'large_city' },
  { id: 'm-calatayud', name: 'Calatayud', slug: 'calatayud', type: 'municipality', code: '50067', parent_id: 'p-zar', population: 20000, category: 'historic' },
  { id: 'm-utebo', name: 'Utebo', slug: 'utebo', type: 'municipality', code: '50272', parent_id: 'p-zar', population: 19000, category: 'large_city' },

  // Huesca (22)
  { id: 'm-huesca', name: 'Huesca', slug: 'huesca-ciudad', type: 'municipality', code: '22125', parent_id: 'p-hues', population: 53132, category: 'mountain' },

  // Teruel (44)
  { id: 'm-teruel', name: 'Teruel', slug: 'teruel-ciudad', type: 'municipality', code: '44216', parent_id: 'p-ter', population: 35890, category: 'historic' },

  // =============================================
  // ASTURIAS
  // =============================================
  { id: 'm-gijon', name: 'Gijón', slug: 'gijon', type: 'municipality', code: '33024', parent_id: 'p-ast', population: 271843, category: 'coastal' },
  { id: 'm-oviedo', name: 'Oviedo', slug: 'oviedo', type: 'municipality', code: '33044', parent_id: 'p-ast', population: 220020, category: 'large_city' },
  { id: 'm-aviles', name: 'Avilés', slug: 'aviles', type: 'municipality', code: '33004', parent_id: 'p-ast', population: 78000, category: 'coastal' },
  { id: 'm-siero', name: 'Siero', slug: 'siero', type: 'municipality', code: '33066', parent_id: 'p-ast', population: 52000, category: 'interior' },
  { id: 'm-langreo', name: 'Langreo', slug: 'langreo', type: 'municipality', code: '33031', parent_id: 'p-ast', population: 40000, category: 'interior' },
  { id: 'm-mieres', name: 'Mieres', slug: 'mieres', type: 'municipality', code: '33037', parent_id: 'p-ast', population: 38000, category: 'mountain' },
  { id: 'm-castrillon', name: 'Castrillón', slug: 'castrillon', type: 'municipality', code: '33012', parent_id: 'p-ast', population: 23000, category: 'coastal' },

  // =============================================
  // ISLAS BALEARES
  // =============================================
  { id: 'm-palma', name: 'Palma de Mallorca', slug: 'palma-de-mallorca', type: 'municipality', code: '07040', parent_id: 'p-bal', population: 416065, category: 'coastal' },
  { id: 'm-calvia', name: 'Calvià', slug: 'calvia', type: 'municipality', code: '07011', parent_id: 'p-bal', population: 52000, category: 'coastal' },
  { id: 'm-ibiza', name: 'Ibiza', slug: 'ibiza', type: 'municipality', code: '07026', parent_id: 'p-bal', population: 50000, category: 'coastal' },
  { id: 'm-manacor', name: 'Manacor', slug: 'manacor', type: 'municipality', code: '07033', parent_id: 'p-bal', population: 44000, category: 'interior' },
  { id: 'm-sta-eulalia', name: 'Santa Eulalia del Río', slug: 'santa-eulalia-del-rio', type: 'municipality', code: '07054', parent_id: 'p-bal', population: 38000, category: 'coastal' },
  { id: 'm-llucmajor', name: 'Llucmajor', slug: 'llucmajor', type: 'municipality', code: '07031', parent_id: 'p-bal', population: 38000, category: 'coastal' },
  { id: 'm-marratxi', name: 'Marratxí', slug: 'marratxi', type: 'municipality', code: '07036', parent_id: 'p-bal', population: 37000, category: 'interior' },
  { id: 'm-inca', name: 'Inca', slug: 'inca', type: 'municipality', code: '07027', parent_id: 'p-bal', population: 33000, category: 'interior' },
  { id: 'm-ciutadella', name: 'Ciutadella de Menorca', slug: 'ciutadella-de-menorca', type: 'municipality', code: '07015', parent_id: 'p-bal', population: 30000, category: 'coastal' },
  { id: 'm-mahon', name: 'Mahón', slug: 'mahon', type: 'municipality', code: '07032', parent_id: 'p-bal', population: 29000, category: 'coastal' },
  { id: 'm-sant-josep', name: 'Sant Josep de sa Talaia', slug: 'sant-josep-de-sa-talaia', type: 'municipality', code: '07048', parent_id: 'p-bal', population: 27000, category: 'coastal' },
  { id: 'm-sant-antoni', name: 'Sant Antoni de Portmany', slug: 'sant-antoni-de-portmany', type: 'municipality', code: '07046', parent_id: 'p-bal', population: 27000, category: 'coastal' },

  // =============================================
  // CANARIAS
  // =============================================

  // Las Palmas (35)
  { id: 'm-las-palmas', name: 'Las Palmas de Gran Canaria', slug: 'las-palmas-de-gran-canaria', type: 'municipality', code: '35016', parent_id: 'p-lpa', population: 379925, category: 'coastal' },
  { id: 'm-telde', name: 'Telde', slug: 'telde', type: 'municipality', code: '35026', parent_id: 'p-lpa', population: 102000, category: 'coastal' },
  { id: 'm-sta-lucia', name: 'Santa Lucía de Tirajana', slug: 'santa-lucia-de-tirajana', type: 'municipality', code: '35022', parent_id: 'p-lpa', population: 73000, category: 'interior' },
  { id: 'm-arrecife', name: 'Arrecife', slug: 'arrecife', type: 'municipality', code: '35004', parent_id: 'p-lpa', population: 63000, category: 'coastal' },
  { id: 'm-san-bartolome-t', name: 'San Bartolomé de Tirajana', slug: 'san-bartolome-de-tirajana', type: 'municipality', code: '35019', parent_id: 'p-lpa', population: 55000, category: 'coastal' },
  { id: 'm-pto-rosario', name: 'Puerto del Rosario', slug: 'puerto-del-rosario', type: 'municipality', code: '35017', parent_id: 'p-lpa', population: 41000, category: 'coastal' },
  { id: 'm-arucas', name: 'Arucas', slug: 'arucas', type: 'municipality', code: '35006', parent_id: 'p-lpa', population: 38000, category: 'interior' },
  { id: 'm-aguimes', name: 'Agüimes', slug: 'aguimes', type: 'municipality', code: '35001', parent_id: 'p-lpa', population: 31000, category: 'coastal' },
  { id: 'm-ingenio', name: 'Ingenio', slug: 'ingenio', type: 'municipality', code: '35010', parent_id: 'p-lpa', population: 31000, category: 'interior' },
  { id: 'm-la-oliva', name: 'La Oliva', slug: 'la-oliva', type: 'municipality', code: '35014', parent_id: 'p-lpa', population: 27000, category: 'coastal' },
  { id: 'm-galdar', name: 'Gáldar', slug: 'galdar', type: 'municipality', code: '35009', parent_id: 'p-lpa', population: 25000, category: 'coastal' },
  { id: 'm-teguise', name: 'Teguise', slug: 'teguise', type: 'municipality', code: '35027', parent_id: 'p-lpa', population: 25000, category: 'coastal' },
  { id: 'm-mogan', name: 'Mogán', slug: 'mogan', type: 'municipality', code: '35012', parent_id: 'p-lpa', population: 22000, category: 'coastal' },

  // Santa Cruz de Tenerife (38)
  { id: 'm-santa-cruz', name: 'Santa Cruz de Tenerife', slug: 'santa-cruz-de-tenerife-ciudad', type: 'municipality', code: '38038', parent_id: 'p-tfe', population: 209194, category: 'coastal' },
  { id: 'm-san-cristobal', name: 'San Cristóbal de La Laguna', slug: 'san-cristobal-de-la-laguna', type: 'municipality', code: '38023', parent_id: 'p-tfe', population: 157500, category: 'historic' },
  { id: 'm-arona', name: 'Arona', slug: 'arona', type: 'municipality', code: '38006', parent_id: 'p-tfe', population: 82000, category: 'coastal' },
  { id: 'm-granadilla', name: 'Granadilla de Abona', slug: 'granadilla-de-abona', type: 'municipality', code: '38017', parent_id: 'p-tfe', population: 49000, category: 'coastal' },
  { id: 'm-adeje', name: 'Adeje', slug: 'adeje', type: 'municipality', code: '38001', parent_id: 'p-tfe', population: 48000, category: 'coastal' },
  { id: 'm-orotava', name: 'La Orotava', slug: 'la-orotava', type: 'municipality', code: '38026', parent_id: 'p-tfe', population: 42000, category: 'mountain' },
  { id: 'm-realejos', name: 'Los Realejos', slug: 'los-realejos', type: 'municipality', code: '38032', parent_id: 'p-tfe', population: 37000, category: 'interior' },
  { id: 'm-pto-cruz', name: 'Puerto de la Cruz', slug: 'puerto-de-la-cruz', type: 'municipality', code: '38028', parent_id: 'p-tfe', population: 30000, category: 'coastal' },
  { id: 'm-candelaria', name: 'Candelaria', slug: 'candelaria', type: 'municipality', code: '38011', parent_id: 'p-tfe', population: 28000, category: 'coastal' },
  { id: 'm-tacoronte', name: 'Tacoronte', slug: 'tacoronte', type: 'municipality', code: '38039', parent_id: 'p-tfe', population: 24000, category: 'interior' },
  { id: 'm-guia-isora', name: 'Guía de Isora', slug: 'guia-de-isora', type: 'municipality', code: '38019', parent_id: 'p-tfe', population: 22000, category: 'coastal' },
  { id: 'm-icod', name: 'Icod de los Vinos', slug: 'icod-de-los-vinos', type: 'municipality', code: '38020', parent_id: 'p-tfe', population: 23000, category: 'interior' },
  { id: 'm-llanos-aridane', name: 'Los Llanos de Aridane', slug: 'los-llanos-de-aridane', type: 'municipality', code: '38024', parent_id: 'p-tfe', population: 21000, category: 'interior' },

  // =============================================
  // CANTABRIA
  // =============================================
  { id: 'm-santander', name: 'Santander', slug: 'santander', type: 'municipality', code: '39075', parent_id: 'p-cnt', population: 172044, category: 'coastal' },
  { id: 'm-torrelavega', name: 'Torrelavega', slug: 'torrelavega', type: 'municipality', code: '39087', parent_id: 'p-cnt', population: 52000, category: 'interior' },
  { id: 'm-castro-urdiales', name: 'Castro-Urdiales', slug: 'castro-urdiales', type: 'municipality', code: '39020', parent_id: 'p-cnt', population: 33000, category: 'coastal' },
  { id: 'm-camargo', name: 'Camargo', slug: 'camargo', type: 'municipality', code: '39016', parent_id: 'p-cnt', population: 31000, category: 'coastal' },
  { id: 'm-pielagos', name: 'Piélagos', slug: 'pielagos', type: 'municipality', code: '39055', parent_id: 'p-cnt', population: 25000, category: 'coastal' },

  // =============================================
  // CASTILLA-LA MANCHA
  // =============================================

  // Albacete (02)
  { id: 'm-albacete', name: 'Albacete', slug: 'albacete-ciudad', type: 'municipality', code: '02003', parent_id: 'p-ab', population: 173329, category: 'interior' },
  { id: 'm-hellin', name: 'Hellín', slug: 'hellin', type: 'municipality', code: '02036', parent_id: 'p-ab', population: 30000, category: 'interior' },
  { id: 'm-villarrobledo', name: 'Villarrobledo', slug: 'villarrobledo', type: 'municipality', code: '02081', parent_id: 'p-ab', population: 26000, category: 'interior' },
  { id: 'm-almansa', name: 'Almansa', slug: 'almansa', type: 'municipality', code: '02009', parent_id: 'p-ab', population: 25000, category: 'historic' },

  // Ciudad Real (13)
  { id: 'm-ciudad-real', name: 'Ciudad Real', slug: 'ciudad-real-ciudad', type: 'municipality', code: '13034', parent_id: 'p-cr', population: 75000, category: 'interior' },
  { id: 'm-puertollano', name: 'Puertollano', slug: 'puertollano', type: 'municipality', code: '13071', parent_id: 'p-cr', population: 47000, category: 'interior' },
  { id: 'm-tomelloso', name: 'Tomelloso', slug: 'tomelloso', type: 'municipality', code: '13082', parent_id: 'p-cr', population: 37000, category: 'interior' },
  { id: 'm-valdepenas', name: 'Valdepeñas', slug: 'valdepenas', type: 'municipality', code: '13087', parent_id: 'p-cr', population: 31000, category: 'interior' },
  { id: 'm-alcazar-sj', name: 'Alcázar de San Juan', slug: 'alcazar-de-san-juan', type: 'municipality', code: '13005', parent_id: 'p-cr', population: 31000, category: 'historic' },

  // Cuenca (16)
  { id: 'm-cuenca', name: 'Cuenca', slug: 'cuenca-ciudad', type: 'municipality', code: '16078', parent_id: 'p-cu', population: 55000, category: 'historic' },

  // Guadalajara (19)
  { id: 'm-guadalajara', name: 'Guadalajara', slug: 'guadalajara-ciudad', type: 'municipality', code: '19130', parent_id: 'p-gu', population: 87000, category: 'historic' },
  { id: 'm-azuqueca', name: 'Azuqueca de Henares', slug: 'azuqueca-de-henares', type: 'municipality', code: '19046', parent_id: 'p-gu', population: 36000, category: 'large_city' },

  // Toledo (45)
  { id: 'm-toledo', name: 'Toledo', slug: 'toledo-ciudad', type: 'municipality', code: '45168', parent_id: 'p-to', population: 84282, category: 'historic' },
  { id: 'm-talavera', name: 'Talavera de la Reina', slug: 'talavera-de-la-reina', type: 'municipality', code: '45165', parent_id: 'p-to', population: 84000, category: 'historic' },
  { id: 'm-illescas', name: 'Illescas', slug: 'illescas', type: 'municipality', code: '45081', parent_id: 'p-to', population: 29000, category: 'interior' },
  { id: 'm-sesena', name: 'Seseña', slug: 'sesena', type: 'municipality', code: '45161', parent_id: 'p-to', population: 26000, category: 'interior' },

  // =============================================
  // CASTILLA Y LEÓN
  // =============================================

  // Ávila (05)
  { id: 'm-avila', name: 'Ávila', slug: 'avila-ciudad', type: 'municipality', code: '05019', parent_id: 'p-av', population: 57000, category: 'historic' },

  // Burgos (09)
  { id: 'm-burgos', name: 'Burgos', slug: 'burgos-ciudad', type: 'municipality', code: '09059', parent_id: 'p-bu', population: 176418, category: 'historic' },
  { id: 'm-miranda-ebro', name: 'Miranda de Ebro', slug: 'miranda-de-ebro', type: 'municipality', code: '09219', parent_id: 'p-bu', population: 36000, category: 'interior' },
  { id: 'm-aranda', name: 'Aranda de Duero', slug: 'aranda-de-duero', type: 'municipality', code: '09018', parent_id: 'p-bu', population: 33000, category: 'interior' },

  // León (24)
  { id: 'm-leon', name: 'León', slug: 'leon-ciudad', type: 'municipality', code: '24089', parent_id: 'p-le', population: 124303, category: 'historic' },
  { id: 'm-ponferrada', name: 'Ponferrada', slug: 'ponferrada', type: 'municipality', code: '24115', parent_id: 'p-le', population: 66000, category: 'historic' },
  { id: 'm-san-andres', name: 'San Andrés del Rabanedo', slug: 'san-andres-del-rabanedo', type: 'municipality', code: '24142', parent_id: 'p-le', population: 32000, category: 'large_city' },

  // Palencia (34)
  { id: 'm-palencia', name: 'Palencia', slug: 'palencia-ciudad', type: 'municipality', code: '34120', parent_id: 'p-pa', population: 78000, category: 'historic' },

  // Salamanca (37)
  { id: 'm-salamanca', name: 'Salamanca', slug: 'salamanca-ciudad', type: 'municipality', code: '37274', parent_id: 'p-sa', population: 144228, category: 'historic' },

  // Segovia (40)
  { id: 'm-segovia', name: 'Segovia', slug: 'segovia-ciudad', type: 'municipality', code: '40194', parent_id: 'p-sg', population: 52000, category: 'historic' },

  // Soria (42)
  { id: 'm-soria', name: 'Soria', slug: 'soria-ciudad', type: 'municipality', code: '42173', parent_id: 'p-so', population: 40000, category: 'historic' },

  // Valladolid (47)
  { id: 'm-valladolid', name: 'Valladolid', slug: 'valladolid-ciudad', type: 'municipality', code: '47186', parent_id: 'p-va', population: 298412, category: 'large_city' },
  { id: 'm-laguna-duero', name: 'Laguna de Duero', slug: 'laguna-de-duero', type: 'municipality', code: '47076', parent_id: 'p-va', population: 22000, category: 'large_city' },
  { id: 'm-medina-campo', name: 'Medina del Campo', slug: 'medina-del-campo', type: 'municipality', code: '47085', parent_id: 'p-va', population: 21000, category: 'historic' },

  // Zamora (49)
  { id: 'm-zamora', name: 'Zamora', slug: 'zamora-ciudad', type: 'municipality', code: '49275', parent_id: 'p-za', population: 61000, category: 'historic' },

  // =============================================
  // CATALUÑA
  // =============================================

  // Barcelona (08)
  { id: 'm-barcelona', name: 'Barcelona', slug: 'barcelona-ciudad', type: 'municipality', code: '08019', parent_id: 'p-bcn', population: 1636762, category: 'large_city' },
  { id: 'm-hospitalet', name: "L'Hospitalet de Llobregat", slug: 'hospitalet-de-llobregat', type: 'municipality', code: '08101', parent_id: 'p-bcn', population: 264923, category: 'large_city' },
  { id: 'm-badalona', name: 'Badalona', slug: 'badalona', type: 'municipality', code: '08015', parent_id: 'p-bcn', population: 223166, category: 'coastal' },
  { id: 'm-terrassa', name: 'Terrassa', slug: 'terrassa', type: 'municipality', code: '08279', parent_id: 'p-bcn', population: 223627, category: 'interior' },
  { id: 'm-sabadell', name: 'Sabadell', slug: 'sabadell', type: 'municipality', code: '08187', parent_id: 'p-bcn', population: 213644, category: 'interior' },
  { id: 'm-mataro', name: 'Mataró', slug: 'mataro', type: 'municipality', code: '08120', parent_id: 'p-bcn', population: 129661, category: 'coastal' },
  { id: 'm-santa-coloma', name: 'Santa Coloma de Gramenet', slug: 'santa-coloma-de-gramenet', type: 'municipality', code: '08245', parent_id: 'p-bcn', population: 120000, category: 'large_city' },
  { id: 'm-sant-cugat', name: 'Sant Cugat del Vallès', slug: 'sant-cugat-del-valles', type: 'municipality', code: '08205', parent_id: 'p-bcn', population: 91000, category: 'large_city' },
  { id: 'm-cornella', name: 'Cornellà de Llobregat', slug: 'cornella-de-llobregat', type: 'municipality', code: '08073', parent_id: 'p-bcn', population: 89000, category: 'large_city' },
  { id: 'm-sant-boi', name: 'Sant Boi de Llobregat', slug: 'sant-boi-de-llobregat', type: 'municipality', code: '08200', parent_id: 'p-bcn', population: 83000, category: 'large_city' },
  { id: 'm-rubi', name: 'Rubí', slug: 'rubi', type: 'municipality', code: '08184', parent_id: 'p-bcn', population: 78000, category: 'large_city' },
  { id: 'm-manresa', name: 'Manresa', slug: 'manresa', type: 'municipality', code: '08113', parent_id: 'p-bcn', population: 78000, category: 'interior' },
  { id: 'm-vilanova', name: 'Vilanova i la Geltrú', slug: 'vilanova-i-la-geltru', type: 'municipality', code: '08307', parent_id: 'p-bcn', population: 69000, category: 'coastal' },
  { id: 'm-castelldefels', name: 'Castelldefels', slug: 'castelldefels', type: 'municipality', code: '08067', parent_id: 'p-bcn', population: 67000, category: 'coastal' },
  { id: 'm-viladecans', name: 'Viladecans', slug: 'viladecans', type: 'municipality', code: '08301', parent_id: 'p-bcn', population: 66000, category: 'large_city' },
  { id: 'm-el-prat', name: 'El Prat de Llobregat', slug: 'el-prat-de-llobregat', type: 'municipality', code: '08169', parent_id: 'p-bcn', population: 64000, category: 'large_city' },
  { id: 'm-granollers', name: 'Granollers', slug: 'granollers', type: 'municipality', code: '08096', parent_id: 'p-bcn', population: 62000, category: 'interior' },
  { id: 'm-cerdanyola', name: 'Cerdanyola del Vallès', slug: 'cerdanyola-del-valles', type: 'municipality', code: '08266', parent_id: 'p-bcn', population: 57000, category: 'large_city' },
  { id: 'm-mollet', name: 'Mollet del Vallès', slug: 'mollet-del-valles', type: 'municipality', code: '08124', parent_id: 'p-bcn', population: 52000, category: 'large_city' },
  { id: 'm-gava', name: 'Gavà', slug: 'gava', type: 'municipality', code: '08089', parent_id: 'p-bcn', population: 47000, category: 'coastal' },
  { id: 'm-esplugues', name: 'Esplugues de Llobregat', slug: 'esplugues-de-llobregat', type: 'municipality', code: '08077', parent_id: 'p-bcn', population: 46000, category: 'large_city' },
  { id: 'm-sant-feliu', name: 'Sant Feliu de Llobregat', slug: 'sant-feliu-de-llobregat', type: 'municipality', code: '08211', parent_id: 'p-bcn', population: 45000, category: 'large_city' },
  { id: 'm-vic', name: 'Vic', slug: 'vic', type: 'municipality', code: '08298', parent_id: 'p-bcn', population: 44000, category: 'historic' },
  { id: 'm-igualada', name: 'Igualada', slug: 'igualada', type: 'municipality', code: '08102', parent_id: 'p-bcn', population: 40000, category: 'interior' },
  { id: 'm-ripollet', name: 'Ripollet', slug: 'ripollet', type: 'municipality', code: '08180', parent_id: 'p-bcn', population: 39000, category: 'large_city' },
  { id: 'm-sant-adria', name: 'Sant Adrià de Besòs', slug: 'sant-adria-de-besos', type: 'municipality', code: '08194', parent_id: 'p-bcn', population: 37000, category: 'large_city' },
  { id: 'm-montcada', name: 'Montcada i Reixac', slug: 'montcada-i-reixac', type: 'municipality', code: '08125', parent_id: 'p-bcn', population: 36000, category: 'large_city' },
  { id: 'm-sant-joan-despi', name: 'Sant Joan Despí', slug: 'sant-joan-despi', type: 'municipality', code: '08217', parent_id: 'p-bcn', population: 34000, category: 'large_city' },
  { id: 'm-barbera', name: 'Barberà del Vallès', slug: 'barbera-del-valles', type: 'municipality', code: '08252', parent_id: 'p-bcn', population: 33000, category: 'large_city' },
  { id: 'm-sant-pere-ribes', name: 'Sant Pere de Ribes', slug: 'sant-pere-de-ribes', type: 'municipality', code: '08231', parent_id: 'p-bcn', population: 30000, category: 'coastal' },
  { id: 'm-sitges', name: 'Sitges', slug: 'sitges', type: 'municipality', code: '08270', parent_id: 'p-bcn', population: 29000, category: 'coastal' },
  { id: 'm-premia-mar', name: 'Premià de Mar', slug: 'premia-de-mar', type: 'municipality', code: '08171', parent_id: 'p-bcn', population: 29000, category: 'coastal' },
  { id: 'm-pineda-mar', name: 'Pineda de Mar', slug: 'pineda-de-mar', type: 'municipality', code: '08163', parent_id: 'p-bcn', population: 28000, category: 'coastal' },
  { id: 'm-sant-vicenc', name: 'Sant Vicenç dels Horts', slug: 'sant-vicenc-dels-horts', type: 'municipality', code: '08237', parent_id: 'p-bcn', population: 28000, category: 'large_city' },
  { id: 'm-martorell', name: 'Martorell', slug: 'martorell', type: 'municipality', code: '08114', parent_id: 'p-bcn', population: 28000, category: 'interior' },
  { id: 'm-molins-rei', name: 'Molins de Rei', slug: 'molins-de-rei', type: 'municipality', code: '08123', parent_id: 'p-bcn', population: 26000, category: 'large_city' },
  { id: 'm-sta-perpetua', name: 'Santa Perpètua de Mogoda', slug: 'santa-perpetua-de-mogoda', type: 'municipality', code: '08260', parent_id: 'p-bcn', population: 26000, category: 'large_city' },
  { id: 'm-olesa', name: 'Olesa de Montserrat', slug: 'olesa-de-montserrat', type: 'municipality', code: '08145', parent_id: 'p-bcn', population: 24000, category: 'mountain' },
  { id: 'm-castellar', name: 'Castellar del Vallès', slug: 'castellar-del-valles', type: 'municipality', code: '08064', parent_id: 'p-bcn', population: 24000, category: 'interior' },
  { id: 'm-el-masnou', name: 'El Masnou', slug: 'el-masnou', type: 'municipality', code: '08118', parent_id: 'p-bcn', population: 23000, category: 'coastal' },

  // Girona (17)
  { id: 'm-girona', name: 'Girona', slug: 'girona-ciudad', type: 'municipality', code: '17079', parent_id: 'p-gi', population: 103369, category: 'historic' },
  { id: 'm-figueres', name: 'Figueres', slug: 'figueres', type: 'municipality', code: '17066', parent_id: 'p-gi', population: 47000, category: 'historic' },
  { id: 'm-lloret', name: 'Lloret de Mar', slug: 'lloret-de-mar', type: 'municipality', code: '17095', parent_id: 'p-gi', population: 38000, category: 'coastal' },
  { id: 'm-blanes', name: 'Blanes', slug: 'blanes', type: 'municipality', code: '17023', parent_id: 'p-gi', population: 39000, category: 'coastal' },
  { id: 'm-olot', name: 'Olot', slug: 'olot', type: 'municipality', code: '17114', parent_id: 'p-gi', population: 34000, category: 'mountain' },
  { id: 'm-salt', name: 'Salt', slug: 'salt', type: 'municipality', code: '17155', parent_id: 'p-gi', population: 31000, category: 'large_city' },
  { id: 'm-palafrugell', name: 'Palafrugell', slug: 'palafrugell', type: 'municipality', code: '17117', parent_id: 'p-gi', population: 23000, category: 'coastal' },

  // Lleida (25)
  { id: 'm-lleida', name: 'Lleida', slug: 'lleida-ciudad', type: 'municipality', code: '25120', parent_id: 'p-ll', population: 139176, category: 'interior' },

  // Tarragona (43)
  { id: 'm-tarragona', name: 'Tarragona', slug: 'tarragona-ciudad', type: 'municipality', code: '43148', parent_id: 'p-ta', population: 134515, category: 'coastal' },
  { id: 'm-reus', name: 'Reus', slug: 'reus', type: 'municipality', code: '43123', parent_id: 'p-ta', population: 107000, category: 'interior' },
  { id: 'm-el-vendrell', name: 'El Vendrell', slug: 'el-vendrell', type: 'municipality', code: '43163', parent_id: 'p-ta', population: 37000, category: 'coastal' },
  { id: 'm-tortosa', name: 'Tortosa', slug: 'tortosa', type: 'municipality', code: '43155', parent_id: 'p-ta', population: 34000, category: 'historic' },
  { id: 'm-cambrils', name: 'Cambrils', slug: 'cambrils', type: 'municipality', code: '43038', parent_id: 'p-ta', population: 34000, category: 'coastal' },
  { id: 'm-salou', name: 'Salou', slug: 'salou', type: 'municipality', code: '43136', parent_id: 'p-ta', population: 28000, category: 'coastal' },
  { id: 'm-calafell', name: 'Calafell', slug: 'calafell', type: 'municipality', code: '43037', parent_id: 'p-ta', population: 26000, category: 'coastal' },
  { id: 'm-valls', name: 'Valls', slug: 'valls', type: 'municipality', code: '43161', parent_id: 'p-ta', population: 24000, category: 'interior' },
  { id: 'm-vila-seca', name: 'Vila-seca', slug: 'vila-seca', type: 'municipality', code: '43171', parent_id: 'p-ta', population: 22000, category: 'coastal' },
  { id: 'm-amposta', name: 'Amposta', slug: 'amposta', type: 'municipality', code: '43014', parent_id: 'p-ta', population: 22000, category: 'interior' },

  // =============================================
  // COMUNIDAD VALENCIANA
  // =============================================

  // Alicante (03)
  { id: 'm-alicante', name: 'Alicante', slug: 'alicante-ciudad', type: 'municipality', code: '03014', parent_id: 'p-ali', population: 337304, category: 'coastal' },
  { id: 'm-elche', name: 'Elche', slug: 'elche', type: 'municipality', code: '03065', parent_id: 'p-ali', population: 234765, category: 'historic' },
  { id: 'm-torrevieja', name: 'Torrevieja', slug: 'torrevieja', type: 'municipality', code: '03133', parent_id: 'p-ali', population: 92000, category: 'coastal' },
  { id: 'm-orihuela', name: 'Orihuela', slug: 'orihuela', type: 'municipality', code: '03099', parent_id: 'p-ali', population: 82000, category: 'coastal' },
  { id: 'm-benidorm', name: 'Benidorm', slug: 'benidorm', type: 'municipality', code: '03031', parent_id: 'p-ali', population: 71000, category: 'coastal' },
  { id: 'm-alcoy', name: 'Alcoy', slug: 'alcoy', type: 'municipality', code: '03009', parent_id: 'p-ali', population: 59000, category: 'mountain' },
  { id: 'm-svr', name: 'San Vicente del Raspeig', slug: 'san-vicente-del-raspeig', type: 'municipality', code: '03122', parent_id: 'p-ali', population: 59000, category: 'large_city' },
  { id: 'm-elda', name: 'Elda', slug: 'elda', type: 'municipality', code: '03066', parent_id: 'p-ali', population: 52000, category: 'interior' },
  { id: 'm-denia', name: 'Denia', slug: 'denia', type: 'municipality', code: '03063', parent_id: 'p-ali', population: 44000, category: 'coastal' },
  { id: 'm-santa-pola', name: 'Santa Pola', slug: 'santa-pola', type: 'municipality', code: '03121', parent_id: 'p-ali', population: 35000, category: 'coastal' },
  { id: 'm-petrer', name: 'Petrer', slug: 'petrer', type: 'municipality', code: '03104', parent_id: 'p-ali', population: 35000, category: 'interior' },
  { id: 'm-villajoyosa', name: 'Villajoyosa', slug: 'villajoyosa', type: 'municipality', code: '03139', parent_id: 'p-ali', population: 35000, category: 'coastal' },
  { id: 'm-villena', name: 'Villena', slug: 'villena', type: 'municipality', code: '03140', parent_id: 'p-ali', population: 34000, category: 'interior' },
  { id: 'm-crevillente', name: 'Crevillente', slug: 'crevillente', type: 'municipality', code: '03059', parent_id: 'p-ali', population: 29000, category: 'interior' },
  { id: 'm-el-campello', name: 'El Campello', slug: 'el-campello', type: 'municipality', code: '03050', parent_id: 'p-ali', population: 28000, category: 'coastal' },
  { id: 'm-novelda', name: 'Novelda', slug: 'novelda', type: 'municipality', code: '03093', parent_id: 'p-ali', population: 27000, category: 'interior' },
  { id: 'm-javea', name: 'Jávea', slug: 'javea', type: 'municipality', code: '03082', parent_id: 'p-ali', population: 27000, category: 'coastal' },
  { id: 'm-mutxamel', name: 'Mutxamel', slug: 'mutxamel', type: 'municipality', code: '03090', parent_id: 'p-ali', population: 26000, category: 'large_city' },
  { id: 'm-pilar-horadada', name: 'Pilar de la Horadada', slug: 'pilar-de-la-horadada', type: 'municipality', code: '03105', parent_id: 'p-ali', population: 26000, category: 'coastal' },
  { id: 'm-altea', name: 'Altea', slug: 'altea', type: 'municipality', code: '03018', parent_id: 'p-ali', population: 24000, category: 'coastal' },
  { id: 'm-san-juan-ali', name: 'San Juan de Alicante', slug: 'san-juan-de-alicante', type: 'municipality', code: '03119', parent_id: 'p-ali', population: 24000, category: 'large_city' },
  { id: 'm-ibi', name: 'Ibi', slug: 'ibi', type: 'municipality', code: '03079', parent_id: 'p-ali', population: 23000, category: 'interior' },
  { id: 'm-calpe', name: 'Calpe', slug: 'calpe', type: 'municipality', code: '03047', parent_id: 'p-ali', population: 22000, category: 'coastal' },
  { id: 'm-aspe', name: 'Aspe', slug: 'aspe', type: 'municipality', code: '03024', parent_id: 'p-ali', population: 22000, category: 'interior' },
  { id: 'm-rojales', name: 'Rojales', slug: 'rojales', type: 'municipality', code: '03112', parent_id: 'p-ali', population: 22000, category: 'coastal' },
  { id: 'm-alfaz-pi', name: 'Alfaz del Pi', slug: 'alfaz-del-pi', type: 'municipality', code: '03012', parent_id: 'p-ali', population: 22000, category: 'coastal' },

  // Castellón (12)
  { id: 'm-castellon', name: 'Castellón de la Plana', slug: 'castellon-de-la-plana', type: 'municipality', code: '12040', parent_id: 'p-cas', population: 174264, category: 'coastal' },
  { id: 'm-vila-real', name: 'Vila-real', slug: 'vila-real', type: 'municipality', code: '12135', parent_id: 'p-cas', population: 51000, category: 'interior' },
  { id: 'm-burriana', name: 'Burriana', slug: 'burriana', type: 'municipality', code: '12032', parent_id: 'p-cas', population: 36000, category: 'coastal' },
  { id: 'm-vinaros', name: 'Vinaròs', slug: 'vinaros', type: 'municipality', code: '12138', parent_id: 'p-cas', population: 30000, category: 'coastal' },
  { id: 'm-benicarlo', name: 'Benicarló', slug: 'benicarlo', type: 'municipality', code: '12027', parent_id: 'p-cas', population: 27000, category: 'coastal' },
  { id: 'm-almassora', name: 'Almassora', slug: 'almassora', type: 'municipality', code: '12009', parent_id: 'p-cas', population: 27000, category: 'coastal' },
  { id: 'm-onda', name: 'Onda', slug: 'onda', type: 'municipality', code: '12084', parent_id: 'p-cas', population: 25000, category: 'interior' },

  // Valencia (46)
  { id: 'm-valencia', name: 'Valencia', slug: 'valencia-ciudad', type: 'municipality', code: '46250', parent_id: 'p-vlc', population: 800215, category: 'large_city' },
  { id: 'm-torrent', name: 'Torrent', slug: 'torrent', type: 'municipality', code: '46244', parent_id: 'p-vlc', population: 83000, category: 'interior' },
  { id: 'm-gandia', name: 'Gandía', slug: 'gandia', type: 'municipality', code: '46131', parent_id: 'p-vlc', population: 74000, category: 'coastal' },
  { id: 'm-paterna', name: 'Paterna', slug: 'paterna', type: 'municipality', code: '46190', parent_id: 'p-vlc', population: 71000, category: 'large_city' },
  { id: 'm-sagunto', name: 'Sagunto', slug: 'sagunto', type: 'municipality', code: '46220', parent_id: 'p-vlc', population: 67000, category: 'historic' },
  { id: 'm-alzira', name: 'Alzira', slug: 'alzira', type: 'municipality', code: '46017', parent_id: 'p-vlc', population: 44000, category: 'interior' },
  { id: 'm-mislata', name: 'Mislata', slug: 'mislata', type: 'municipality', code: '46172', parent_id: 'p-vlc', population: 43000, category: 'large_city' },
  { id: 'm-burjassot', name: 'Burjassot', slug: 'burjassot', type: 'municipality', code: '46078', parent_id: 'p-vlc', population: 39000, category: 'large_city' },
  { id: 'm-ontinyent', name: 'Ontinyent', slug: 'ontinyent', type: 'municipality', code: '46184', parent_id: 'p-vlc', population: 36000, category: 'interior' },
  { id: 'm-aldaia', name: 'Aldaia', slug: 'aldaia', type: 'municipality', code: '46013', parent_id: 'p-vlc', population: 32000, category: 'large_city' },
  { id: 'm-xirivella', name: 'Xirivella', slug: 'xirivella', type: 'municipality', code: '46263', parent_id: 'p-vlc', population: 31000, category: 'large_city' },
  { id: 'm-manises', name: 'Manises', slug: 'manises', type: 'municipality', code: '46164', parent_id: 'p-vlc', population: 31000, category: 'large_city' },
  { id: 'm-alaquàs', name: 'Alaquàs', slug: 'alaquas', type: 'municipality', code: '46005', parent_id: 'p-vlc', population: 30000, category: 'large_city' },
  { id: 'm-xativa', name: 'Xàtiva', slug: 'xativa', type: 'municipality', code: '46145', parent_id: 'p-vlc', population: 29000, category: 'historic' },
  { id: 'm-catarroja', name: 'Catarroja', slug: 'catarroja', type: 'municipality', code: '46094', parent_id: 'p-vlc', population: 29000, category: 'large_city' },
  { id: 'm-sueca', name: 'Sueca', slug: 'sueca', type: 'municipality', code: '46235', parent_id: 'p-vlc', population: 28000, category: 'coastal' },
  { id: 'm-paiporta', name: 'Paiporta', slug: 'paiporta', type: 'municipality', code: '46186', parent_id: 'p-vlc', population: 26000, category: 'large_city' },
  { id: 'm-quart-poblet', name: 'Quart de Poblet', slug: 'quart-de-poblet', type: 'municipality', code: '46207', parent_id: 'p-vlc', population: 25000, category: 'large_city' },

  // =============================================
  // EXTREMADURA
  // =============================================

  // Badajoz (06)
  { id: 'm-badajoz', name: 'Badajoz', slug: 'badajoz-ciudad', type: 'municipality', code: '06015', parent_id: 'p-ba', population: 150984, category: 'interior' },
  { id: 'm-merida', name: 'Mérida', slug: 'merida', type: 'municipality', code: '06083', parent_id: 'p-ba', population: 59352, category: 'historic' },
  { id: 'm-don-benito', name: 'Don Benito', slug: 'don-benito', type: 'municipality', code: '06044', parent_id: 'p-ba', population: 37000, category: 'interior' },
  { id: 'm-almendralejo', name: 'Almendralejo', slug: 'almendralejo', type: 'municipality', code: '06011', parent_id: 'p-ba', population: 34000, category: 'interior' },
  { id: 'm-villanueva-serena', name: 'Villanueva de la Serena', slug: 'villanueva-de-la-serena', type: 'municipality', code: '06153', parent_id: 'p-ba', population: 26000, category: 'interior' },

  // Cáceres (10)
  { id: 'm-caceres', name: 'Cáceres', slug: 'caceres-ciudad', type: 'municipality', code: '10037', parent_id: 'p-cc', population: 96068, category: 'historic' },
  { id: 'm-plasencia', name: 'Plasencia', slug: 'plasencia', type: 'municipality', code: '10148', parent_id: 'p-cc', population: 40000, category: 'historic' },

  // =============================================
  // GALICIA
  // =============================================

  // A Coruña (15)
  { id: 'm-coruna', name: 'A Coruña', slug: 'a-coruna-ciudad', type: 'municipality', code: '15030', parent_id: 'p-co', population: 245711, category: 'coastal' },
  { id: 'm-santiago', name: 'Santiago de Compostela', slug: 'santiago-de-compostela', type: 'municipality', code: '15078', parent_id: 'p-co', population: 98005, category: 'historic' },
  { id: 'm-ferrol', name: 'Ferrol', slug: 'ferrol', type: 'municipality', code: '15036', parent_id: 'p-co', population: 66000, category: 'coastal' },
  { id: 'm-naron', name: 'Narón', slug: 'naron', type: 'municipality', code: '15054', parent_id: 'p-co', population: 40000, category: 'coastal' },
  { id: 'm-oleiros', name: 'Oleiros', slug: 'oleiros', type: 'municipality', code: '15057', parent_id: 'p-co', population: 36000, category: 'coastal' },
  { id: 'm-ames', name: 'Ames', slug: 'ames', type: 'municipality', code: '15002', parent_id: 'p-co', population: 33000, category: 'interior' },
  { id: 'm-arteixo', name: 'Arteixo', slug: 'arteixo', type: 'municipality', code: '15005', parent_id: 'p-co', population: 32000, category: 'coastal' },
  { id: 'm-carballo', name: 'Carballo', slug: 'carballo', type: 'municipality', code: '15019', parent_id: 'p-co', population: 31000, category: 'interior' },
  { id: 'm-culleredo', name: 'Culleredo', slug: 'culleredo', type: 'municipality', code: '15031', parent_id: 'p-co', population: 30000, category: 'large_city' },
  { id: 'm-ribeira', name: 'Ribeira', slug: 'ribeira', type: 'municipality', code: '15072', parent_id: 'p-co', population: 26000, category: 'coastal' },
  { id: 'm-cambre', name: 'Cambre', slug: 'cambre', type: 'municipality', code: '15017', parent_id: 'p-co', population: 25000, category: 'large_city' },

  // Lugo (27)
  { id: 'm-lugo', name: 'Lugo', slug: 'lugo-ciudad', type: 'municipality', code: '27028', parent_id: 'p-lu', population: 98276, category: 'historic' },

  // Ourense (32)
  { id: 'm-ourense', name: 'Ourense', slug: 'ourense-ciudad', type: 'municipality', code: '32054', parent_id: 'p-ou', population: 105505, category: 'interior' },

  // Pontevedra (36)
  { id: 'm-vigo', name: 'Vigo', slug: 'vigo', type: 'municipality', code: '36057', parent_id: 'p-po', population: 295364, category: 'coastal' },
  { id: 'm-pontevedra', name: 'Pontevedra', slug: 'pontevedra-ciudad', type: 'municipality', code: '36038', parent_id: 'p-po', population: 83400, category: 'coastal' },
  { id: 'm-vilagarcia', name: 'Vilagarcía de Arousa', slug: 'vilagarcia-de-arousa', type: 'municipality', code: '36060', parent_id: 'p-po', population: 38000, category: 'coastal' },
  { id: 'm-redondela', name: 'Redondela', slug: 'redondela', type: 'municipality', code: '36045', parent_id: 'p-po', population: 29000, category: 'coastal' },
  { id: 'm-cangas', name: 'Cangas', slug: 'cangas', type: 'municipality', code: '36008', parent_id: 'p-po', population: 26000, category: 'coastal' },
  { id: 'm-marin', name: 'Marín', slug: 'marin', type: 'municipality', code: '36026', parent_id: 'p-po', population: 25000, category: 'coastal' },
  { id: 'm-ponteareas', name: 'Ponteareas', slug: 'ponteareas', type: 'municipality', code: '36042', parent_id: 'p-po', population: 23000, category: 'interior' },
  { id: 'm-estrada', name: 'A Estrada', slug: 'a-estrada', type: 'municipality', code: '36017', parent_id: 'p-po', population: 21000, category: 'interior' },

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
  { id: 'm-ssreyes', name: 'San Sebastián de los Reyes', slug: 'san-sebastian-de-los-reyes', type: 'municipality', code: '28134', parent_id: 'p-mad', population: 91000, category: 'large_city' },
  { id: 'm-coslada', name: 'Coslada', slug: 'coslada', type: 'municipality', code: '28049', parent_id: 'p-mad', population: 91000, category: 'large_city' },
  { id: 'm-rivas', name: 'Rivas-Vaciamadrid', slug: 'rivas-vaciamadrid', type: 'municipality', code: '28123', parent_id: 'p-mad', population: 90000, category: 'large_city' },
  { id: 'm-pozuelo', name: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon', type: 'municipality', code: '28115', parent_id: 'p-mad', population: 88000, category: 'large_city' },
  { id: 'm-valdemoro', name: 'Valdemoro', slug: 'valdemoro', type: 'municipality', code: '28161', parent_id: 'p-mad', population: 77000, category: 'large_city' },
  { id: 'm-majadahonda', name: 'Majadahonda', slug: 'majadahonda', type: 'municipality', code: '28080', parent_id: 'p-mad', population: 73000, category: 'large_city' },
  { id: 'm-collado', name: 'Collado Villalba', slug: 'collado-villalba', type: 'municipality', code: '28047', parent_id: 'p-mad', population: 64000, category: 'mountain' },
  { id: 'm-aranjuez', name: 'Aranjuez', slug: 'aranjuez', type: 'municipality', code: '28013', parent_id: 'p-mad', population: 60000, category: 'historic' },
  { id: 'm-arganda', name: 'Arganda del Rey', slug: 'arganda-del-rey', type: 'municipality', code: '28014', parent_id: 'p-mad', population: 57000, category: 'interior' },
  { id: 'm-boadilla', name: 'Boadilla del Monte', slug: 'boadilla-del-monte', type: 'municipality', code: '28022', parent_id: 'p-mad', population: 54000, category: 'large_city' },
  { id: 'm-pinto', name: 'Pinto', slug: 'pinto', type: 'municipality', code: '28113', parent_id: 'p-mad', population: 53000, category: 'large_city' },
  { id: 'm-colmenar-viejo', name: 'Colmenar Viejo', slug: 'colmenar-viejo', type: 'municipality', code: '28045', parent_id: 'p-mad', population: 49000, category: 'mountain' },
  { id: 'm-tres-cantos', name: 'Tres Cantos', slug: 'tres-cantos', type: 'municipality', code: '28903', parent_id: 'p-mad', population: 48000, category: 'large_city' },
  { id: 'm-sf-henares', name: 'San Fernando de Henares', slug: 'san-fernando-de-henares', type: 'municipality', code: '28130', parent_id: 'p-mad', population: 40000, category: 'large_city' },
  { id: 'm-galapagar', name: 'Galapagar', slug: 'galapagar', type: 'municipality', code: '28062', parent_id: 'p-mad', population: 35000, category: 'mountain' },
  { id: 'm-arroyomolinos', name: 'Arroyomolinos', slug: 'arroyomolinos', type: 'municipality', code: '28016', parent_id: 'p-mad', population: 32000, category: 'large_city' },
  { id: 'm-villavicios-odon', name: 'Villaviciosa de Odón', slug: 'villaviciosa-de-odon', type: 'municipality', code: '28181', parent_id: 'p-mad', population: 30000, category: 'large_city' },
  { id: 'm-navalcarnero', name: 'Navalcarnero', slug: 'navalcarnero', type: 'municipality', code: '28096', parent_id: 'p-mad', population: 30000, category: 'interior' },
  { id: 'm-ciempozuelos', name: 'Ciempozuelos', slug: 'ciempozuelos', type: 'municipality', code: '28042', parent_id: 'p-mad', population: 25000, category: 'interior' },
  { id: 'm-mejorada', name: 'Mejorada del Campo', slug: 'mejorada-del-campo', type: 'municipality', code: '28084', parent_id: 'p-mad', population: 24000, category: 'large_city' },
  { id: 'm-torrelodones', name: 'Torrelodones', slug: 'torrelodones', type: 'municipality', code: '28151', parent_id: 'p-mad', population: 24000, category: 'mountain' },

  // =============================================
  // REGIÓN DE MURCIA
  // =============================================
  { id: 'm-murcia', name: 'Murcia', slug: 'murcia-ciudad', type: 'municipality', code: '30030', parent_id: 'p-mur', population: 460349, category: 'large_city' },
  { id: 'm-cartagena', name: 'Cartagena', slug: 'cartagena', type: 'municipality', code: '30016', parent_id: 'p-mur', population: 216451, category: 'coastal' },
  { id: 'm-lorca', name: 'Lorca', slug: 'lorca', type: 'municipality', code: '30024', parent_id: 'p-mur', population: 96000, category: 'historic' },
  { id: 'm-molina-segura', name: 'Molina de Segura', slug: 'molina-de-segura', type: 'municipality', code: '30027', parent_id: 'p-mur', population: 72000, category: 'interior' },
  { id: 'm-alcantarilla', name: 'Alcantarilla', slug: 'alcantarilla', type: 'municipality', code: '30003', parent_id: 'p-mur', population: 42000, category: 'large_city' },
  { id: 'm-torre-pacheco', name: 'Torre-Pacheco', slug: 'torre-pacheco', type: 'municipality', code: '30037', parent_id: 'p-mur', population: 37000, category: 'interior' },
  { id: 'm-mazarron', name: 'Mazarrón', slug: 'mazarron', type: 'municipality', code: '30025', parent_id: 'p-mur', population: 36000, category: 'coastal' },
  { id: 'm-aguilas', name: 'Águilas', slug: 'aguilas', type: 'municipality', code: '30002', parent_id: 'p-mur', population: 35000, category: 'coastal' },
  { id: 'm-cieza', name: 'Cieza', slug: 'cieza', type: 'municipality', code: '30019', parent_id: 'p-mur', population: 35000, category: 'interior' },
  { id: 'm-yecla', name: 'Yecla', slug: 'yecla', type: 'municipality', code: '30043', parent_id: 'p-mur', population: 34000, category: 'interior' },
  { id: 'm-san-javier', name: 'San Javier', slug: 'san-javier', type: 'municipality', code: '30035', parent_id: 'p-mur', population: 33000, category: 'coastal' },
  { id: 'm-totana', name: 'Totana', slug: 'totana', type: 'municipality', code: '30038', parent_id: 'p-mur', population: 31000, category: 'interior' },
  { id: 'm-caravaca', name: 'Caravaca de la Cruz', slug: 'caravaca-de-la-cruz', type: 'municipality', code: '30015', parent_id: 'p-mur', population: 26000, category: 'historic' },
  { id: 'm-jumilla', name: 'Jumilla', slug: 'jumilla', type: 'municipality', code: '30023', parent_id: 'p-mur', population: 26000, category: 'interior' },
  { id: 'm-san-pedro-pinatar', name: 'San Pedro del Pinatar', slug: 'san-pedro-del-pinatar', type: 'municipality', code: '30036', parent_id: 'p-mur', population: 25000, category: 'coastal' },
  { id: 'm-torres-cotillas', name: 'Las Torres de Cotillas', slug: 'las-torres-de-cotillas', type: 'municipality', code: '30039', parent_id: 'p-mur', population: 22000, category: 'interior' },
  { id: 'm-alhama-murcia', name: 'Alhama de Murcia', slug: 'alhama-de-murcia', type: 'municipality', code: '30004', parent_id: 'p-mur', population: 22000, category: 'interior' },

  // =============================================
  // NAVARRA
  // =============================================
  { id: 'm-pamplona', name: 'Pamplona', slug: 'pamplona', type: 'municipality', code: '31201', parent_id: 'p-nav', population: 203418, category: 'historic' },
  { id: 'm-tudela', name: 'Tudela', slug: 'tudela', type: 'municipality', code: '31232', parent_id: 'p-nav', population: 37000, category: 'interior' },
  { id: 'm-baranain', name: 'Barañáin', slug: 'baranain', type: 'municipality', code: '31036', parent_id: 'p-nav', population: 20000, category: 'large_city' },

  // =============================================
  // PAÍS VASCO
  // =============================================

  // Álava (01)
  { id: 'm-vitoria', name: 'Vitoria-Gasteiz', slug: 'vitoria-gasteiz', type: 'municipality', code: '01059', parent_id: 'p-al', population: 253672, category: 'large_city' },

  // Vizcaya (48)
  { id: 'm-bilbao', name: 'Bilbao', slug: 'bilbao', type: 'municipality', code: '48020', parent_id: 'p-bi', population: 347829, category: 'large_city' },
  { id: 'm-barakaldo', name: 'Barakaldo', slug: 'barakaldo', type: 'municipality', code: '48013', parent_id: 'p-bi', population: 100000, category: 'large_city' },
  { id: 'm-getxo', name: 'Getxo', slug: 'getxo', type: 'municipality', code: '48036', parent_id: 'p-bi', population: 78000, category: 'coastal' },
  { id: 'm-portugalete', name: 'Portugalete', slug: 'portugalete', type: 'municipality', code: '48078', parent_id: 'p-bi', population: 45000, category: 'coastal' },
  { id: 'm-santurtzi', name: 'Santurtzi', slug: 'santurtzi', type: 'municipality', code: '48082', parent_id: 'p-bi', population: 47000, category: 'coastal' },
  { id: 'm-basauri', name: 'Basauri', slug: 'basauri', type: 'municipality', code: '48015', parent_id: 'p-bi', population: 40000, category: 'large_city' },
  { id: 'm-leioa', name: 'Leioa', slug: 'leioa', type: 'municipality', code: '48054', parent_id: 'p-bi', population: 31000, category: 'large_city' },
  { id: 'm-durango', name: 'Durango', slug: 'durango', type: 'municipality', code: '48027', parent_id: 'p-bi', population: 30000, category: 'interior' },
  { id: 'm-galdakao', name: 'Galdakao', slug: 'galdakao', type: 'municipality', code: '48036', parent_id: 'p-bi', population: 30000, category: 'large_city' },
  { id: 'm-sestao', name: 'Sestao', slug: 'sestao', type: 'municipality', code: '48084', parent_id: 'p-bi', population: 27000, category: 'large_city' },
  { id: 'm-erandio', name: 'Erandio', slug: 'erandio', type: 'municipality', code: '48030', parent_id: 'p-bi', population: 24000, category: 'large_city' },

  // Guipúzcoa (20)
  { id: 'm-donostia', name: 'San Sebastián', slug: 'san-sebastian', type: 'municipality', code: '20069', parent_id: 'p-ss', population: 188240, category: 'coastal' },
  { id: 'm-irun', name: 'Irún', slug: 'irun', type: 'municipality', code: '20045', parent_id: 'p-ss', population: 63000, category: 'coastal' },
  { id: 'm-errenteria', name: 'Errenteria', slug: 'errenteria', type: 'municipality', code: '20068', parent_id: 'p-ss', population: 40000, category: 'large_city' },
  { id: 'm-eibar', name: 'Eibar', slug: 'eibar', type: 'municipality', code: '20030', parent_id: 'p-ss', population: 27000, category: 'interior' },
  { id: 'm-zarautz', name: 'Zarautz', slug: 'zarautz', type: 'municipality', code: '20079', parent_id: 'p-ss', population: 23000, category: 'coastal' },
  { id: 'm-arrasate', name: 'Arrasate/Mondragón', slug: 'arrasate-mondragon', type: 'municipality', code: '20055', parent_id: 'p-ss', population: 22000, category: 'interior' },
  { id: 'm-hernani', name: 'Hernani', slug: 'hernani', type: 'municipality', code: '20044', parent_id: 'p-ss', population: 21000, category: 'interior' },

  // =============================================
  // LA RIOJA
  // =============================================
  { id: 'm-logrono', name: 'Logroño', slug: 'logrono', type: 'municipality', code: '26089', parent_id: 'p-rio', population: 151136, category: 'interior' },
  { id: 'm-calahorra', name: 'Calahorra', slug: 'calahorra', type: 'municipality', code: '26036', parent_id: 'p-rio', population: 24000, category: 'interior' },
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
