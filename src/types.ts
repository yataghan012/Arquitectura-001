export interface Project {
  id: string;
  title: string;
  category: 'Residencial' | 'Comercial' | 'Institucional';
  description: string;
  location: string;
  year: string;
  area: string;
  images: string[];
  featured?: boolean;
  technicalDetails?: {
    materials: string[];
    client?: string;
    status: string;
  };
  process?: {
    sketch: string;
    final: string;
    description: string;
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
}
