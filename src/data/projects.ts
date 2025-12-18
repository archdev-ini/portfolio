import { SystemTag } from "./metadata";

export interface Project {
  id: string;
  title: string;
  year: number;
  type: 'Academic' | 'Research' | 'Competition' | 'Speculative';
  description: string;
  themeId: string;
  tools: string[];
  systems: SystemTag[];
  status: 'Concept' | 'Developed' | 'Built';
  imagePlaceholder?: string; // For design phase
}

export const projects: Project[] = [
  {
    id: 'urban-integument',
    title: 'Urban Integument',
    year: 2024,
    type: 'Academic',
    description: 'A speculative investigation into high-density housing in Lagos, examining porous material strategies to enhance microclimatic performance and urban livability.',
    themeId: 'the-radiant-archive',
    tools: ['Rhino', 'Grasshopper', 'Ladybug'],
    systems: ['Urban Morphology', 'Thermal Materiality'],
    status: 'Developed'
  },
  {
    id: 'digital-archive',
    title: 'The Digital Archive',
    year: 2023,
    type: 'Research',
    description: 'A spatial framework for digitizing oral histories, translating cultural narratives into immersive and navigable digital environments.',
    themeId: 'the-radiant-archive',
    tools: ['Unreal Engine', 'Photogrammetry'],
    systems: ['Cultural Heritage', 'Digital Workflows'],
    status: 'Concept'
  },
  {
    id: 'eco-systemic-shelter',
    title: 'Eco-Systemic Shelter',
    year: 2023,
    type: 'Competition',
    description: 'A modular bamboo construction system designed for rapid deployment in flood-prone regions, prioritizing adaptability, material efficiency, and local fabrication.',
    themeId: 'the-radiant-archive',
    tools: ['Revit', 'Bamboo Construction'],
    systems: ['Ecological Systems', 'Speculative Futures'],
    status: 'Concept'
  }
];
