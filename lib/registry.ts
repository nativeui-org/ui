import fs from 'fs';
import path from 'path';

// Type pour représenter les métadonnées d'un composant
export interface ComponentMeta {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
}

// Type complet pour un composant dans la registry
export interface ComponentData extends ComponentMeta {
  files: {
    path: string;
    content: string;
  }[];
  usage: string[];
  props: {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }[];
}

// Répertoire de la registry
const REGISTRY_DIR = path.join(process.cwd(), 'registry');

/**
 * Récupère tous les composants disponibles dans la registry
 */
export function getAllComponents(): ComponentMeta[] {
  try {
    // Lire le répertoire ui dans registry
    const uiDir = path.join(REGISTRY_DIR, 'ui');
    const files = fs.readdirSync(uiDir).filter(file => file.endsWith('.json'));
    
    // Extraire les métadonnées de chaque composant
    return files.map(file => {
      const filePath = path.join(uiDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return {
        name: data.name,
        type: data.type,
        description: data.description,
        dependencies: data.dependencies || []
      };
    });
  } catch (error) {
    console.error('Error reading components:', error);
    return [];
  }
}

/**
 * Récupère les données d'un composant spécifique par son nom
 */
export function getComponentByName(name: string): ComponentData | null {
  try {
    const filePath = path.join(REGISTRY_DIR, 'ui', `${name}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data as ComponentData;
  } catch (error) {
    console.error(`Error reading component ${name}:`, error);
    return null;
  }
} 