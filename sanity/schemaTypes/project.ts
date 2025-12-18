import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Academic', value: 'Academic' },
          { title: 'Research', value: 'Research' },
          { title: 'Competition', value: 'Competition' },
          { title: 'Speculative', value: 'Speculative' },
        ],
      },
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'reference' as const,
      to: [{ type: 'theme' as const }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text' as const,
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array' as const,
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array' as const,
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'systems',
      title: 'Systems',
      type: 'array' as const,
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'Concept' },
          { title: 'Developed', value: 'Developed' },
          { title: 'Built', value: 'Built' },
        ],
      },
    }),
  ],
})
