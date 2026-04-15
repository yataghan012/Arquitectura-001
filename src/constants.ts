import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Departamento Nva. Córdoba',
    category: 'Residencial',
    description: 'Renovación integral de un departamento de 185m² en el corazón de Nueva Córdoba. Se priorizó la entrada de luz natural y la unificación de espacios sociales, integrando cocina y living para una experiencia de vida más fluida.',
    location: 'Córdoba, Argentina',
    year: '2024',
    area: '185 m²',
    images: [import.meta.env.BASE_URL + 'sitio original/assets/project-1.jpg', import.meta.env.BASE_URL + 'sitio original/assets/project-1.jpg', import.meta.env.BASE_URL + 'sitio original/assets/project-1.jpg'],
    featured: true,
    technicalDetails: {
      materials: ['Hormigón visto', 'Madera de incienso', 'Mármol Carrara'],
      client: 'Privado',
      status: 'Finalizado'
    },
    process: {
      sketch: 'https://picsum.photos/seed/sketch1/1920/1080?grayscale',
      final: import.meta.env.BASE_URL + 'sitio original/assets/project-1.jpg',
      description: 'Desde el primer trazo buscamos la desmaterialización de los límites internos para maximizar la luz.'
    }
  },
  {
    id: '2',
    title: 'Oficinas Grupo Andino',
    category: 'Comercial',
    description: 'Diseño de oficinas corporativas centradas en la colaboración. Espacios flexibles, salas de reunión vidriadas y zonas de descanso que fomentan la creatividad y el bienestar de los equipos.',
    location: 'Córdoba, Argentina',
    year: '2024',
    area: '420 m²',
    images: [import.meta.env.BASE_URL + 'sitio original/assets/project-2.jpg', import.meta.env.BASE_URL + 'sitio original/assets/project-2.jpg'],
    process: {
      sketch: 'https://picsum.photos/seed/sketch2/1920/1080?grayscale',
      final: import.meta.env.BASE_URL + 'sitio original/assets/project-2.jpg',
      description: 'Transformamos una planta libre en un ecosistema de trabajo dinámico y colaborativo.'
    }
  },
  {
    id: '3',
    title: 'Centro Cultural Municipal',
    category: 'Institucional',
    description: 'Un hito arquitectónico para la ciudad, combinando la restauración de una estructura histórica con ampliaciones contemporáneas de acero y vidrio. Espacios para exposiciones, talleres y auditorio.',
    location: 'Córdoba, Argentina',
    year: '2023',
    area: '1.200 m²',
    images: [import.meta.env.BASE_URL + 'sitio original/assets/project-3.jpg', import.meta.env.BASE_URL + 'sitio original/assets/project-3.jpg'],
    technicalDetails: {
      materials: ['Ladrillo visto', 'Estructura metálica', 'Policarbonato'],
      client: 'Municipalidad de Córdoba',
      status: 'En uso'
    },
    process: {
      sketch: 'https://picsum.photos/seed/sketch3/1920/1080?grayscale',
      final: import.meta.env.BASE_URL + 'sitio original/assets/project-3.jpg',
      description: 'La restauración patrimonial exigió un diálogo respetuoso entre lo histórico y lo contemporáneo.'
    }
  },
  {
    id: '4',
    title: 'Residencia Cerro de las Rosas',
    category: 'Residencial',
    description: 'Vivienda unifamiliar de lenguaje minimalista. El proyecto se organiza en torno a un patio central que garantiza privacidad y ventilación cruzada en todas las estancias.',
    location: 'Córdoba, Argentina',
    year: '2023',
    area: '310 m²',
    images: [import.meta.env.BASE_URL + 'sitio original/assets/project-4.jpg', import.meta.env.BASE_URL + 'sitio original/assets/project-4.jpg'],
    technicalDetails: {
      materials: ['Piedra local', 'Revoque plástico', 'Aluminio negro'],
      client: 'Privado',
      status: 'Finalizado'
    }
  },
  {
    id: '5',
    title: 'Casa de Piedra',
    category: 'Residencial',
    description: 'Vivienda unifamiliar mimetizada con el paisaje serrano. Uso extensivo de piedra local y madera, con grandes ventanales que enmarcan las vistas panorámicas hacia el valle.',
    location: 'Sierras Chicas, Córdoba',
    year: '2022',
    area: '450 m²',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600'],
    technicalDetails: {
      materials: ['Piedra natural', 'Madera de lapacho', 'Hormigón visto'],
      client: 'Privado',
      status: 'Finalizado'
    }
  },
  {
    id: '6',
    title: 'Torre Empresarial',
    category: 'Comercial',
    description: 'Edificio de oficinas de clase A con certificación LEED. Fachada de doble piel de vidrio para optimización térmica y plantas libres flexibles preparadas para dinámicas modernas.',
    location: 'Nueva Córdoba, Córdoba',
    year: '2023',
    area: '3.500 m²',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600'],
    technicalDetails: {
      materials: ['Curtain wall', 'Acero', 'Hormigón de alta resistencia'],
      client: 'Desarrollista',
      status: 'Finalizado'
    }
  },
  {
    id: '7',
    title: 'Museo de Arte Contemporáneo',
    category: 'Institucional',
    description: 'Espacio cultural diseñado para la flexibilidad expositiva. Volúmenes puros de hormigón blanco que interactúan con la luz natural a través de lucernarios cenitales estratégicos.',
    location: 'Córdoba, Argentina',
    year: '2021',
    area: '2.800 m²',
    images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600'],
    technicalDetails: {
      materials: ['Hormigón blanco', 'Vidrio esmerilado', 'Pisos de terrazo'],
      client: 'Gobierno Provincial',
      status: 'En uso'
    }
  },
  {
    id: '8',
    title: 'Loft General Paz',
    category: 'Residencial',
    description: 'Refuncionalización de un antiguo galpón industrial en una vivienda contemporánea. Se preservaron las cerchas metálicas originales contrastando con intervenciones modernas de diseño.',
    location: 'Barrio General Paz, Córdoba',
    year: '2024',
    area: '180 m²',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600'],
    technicalDetails: {
      materials: ['Ladrillo recuperado', 'Hierro negro', 'Madera de demolición'],
      client: 'Privado',
      status: 'Finalizado'
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: '1',
    number: '01',
    title: 'Arquitectura',
    description: 'Proyecto completo, dirección técnica, documentación ejecutiva y gestión de obra para edificios residenciales, comerciales e institucionales.'
  },
  {
    id: '2',
    number: '02',
    title: 'Diseño de interiores',
    description: 'Conceptualización espacial, selección de materialidades, diseño de mobiliario a medida e iluminación arquitectónica.'
  },
  {
    id: '3',
    number: '03',
    title: 'Consultoría técnica',
    description: 'Auditorías de proyecto, optimización de costos, estudios de factibilidad y asesoramiento en normativas municipales.'
  },
  {
    id: '4',
    number: '04',
    title: 'Remodelaciones',
    description: 'Intervención integral en espacios existentes, puesta en valor patrimonial, ampliaciones y refuncionalización de inmuebles.'
  }
];
