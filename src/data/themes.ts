import { SystemTag } from "./metadata";

export interface Theme {
  id: string;
  slug: string;
  title: string;
  yearRange: string;
  thematicStatement: string;
  keyQuestions: string[];
  systemsExplored: SystemTag[];
  relatedOutputs: {
    title: string;
    type: 'Project' | 'Essay' | 'Diagram' | 'Experiment';
    id: string;
  }[];
  status: 'Active' | 'Archived';
  thesis: string; // One-sentence thesis for archive view
}

export const themes: Theme[] = [
  {
    id: '1',
    slug: 'the-radiant-archive',
    title: 'The Radiant Archive',
    yearRange: '2026—2027',
    thematicStatement: 'The Radiant Archive explores architectural systems as living records. It reframes the built environment not as static objects, but as high-velocity flows of cultural and ecological data.',
    keyQuestions: [
      'How does architectural documentation accelerate ecological resilience?',
      'Can digital workflows function as high-velocity cultural heritage?',
      'What is the threshold between static exhibition and living archive?'
    ],
    systemsExplored: [
      'Ecological Systems',
      'Cultural Heritage',
      'Digital Workflows',
      'Urban Morphology'
    ],
    relatedOutputs: [
      { id: 'urban-integument', title: 'Urban Integument', type: 'Project' },
      { id: 'digital-archive', title: 'The Digital Archive', type: 'Essay' },
      { id: 'eco-systemic-shelter', title: 'Eco-Systemic Shelter', type: 'Diagram' }
    ],
    status: 'Active',
    thesis: 'Exploring architecture as an evolving systems-driven record of culture and ecology.'
  },
  {
    id: '2',
    slug: 'porosity-and-place',
    title: 'Porosity & Place',
    yearRange: '2024—2025',
    thematicStatement: 'An investigation into the thermal and social performance of porous materials in high-density Lagosian contexts.',
    keyQuestions: [
      'How do material voids influence social interaction?',
      'Can passive ventilation strategies be codified into high-density urban grids?'
    ],
    systemsExplored: [
      'Thermal Materiality',
      'Cultural Heritage',
      'Urban Morphology'
    ],
    relatedOutputs: [
      { id: 'urban-integument', title: 'Urban Integument', type: 'Project' }
    ],
    status: 'Archived',
    thesis: 'Investigating the intersection of social dynamics and thermal materiality in tropical urbanism.'
  }
];
