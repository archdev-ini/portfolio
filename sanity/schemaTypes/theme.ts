import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'theme',
  title: 'Thematic Cycle',
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
      name: 'yearRange',
      title: 'Year Range',
      type: 'string',
      description: 'e.g. 2026—2027',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'Active' },
          { title: 'Archived', value: 'Archived' },
        ],
      },
      initialValue: 'Archived',
    }),
    defineField({
      name: 'thematicStatement',
      title: 'Thematic Statement',
      type: 'text' as const,
      rows: 3,
    }),
    defineField({
      name: 'thesis',
      title: 'One-sentence Thesis',
      type: 'string',
      description: 'For archive view cards',
    }),
    defineField({
      name: 'keyQuestions',
      title: 'Key Questions',
      type: 'array' as const,
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'systemsExplored',
      title: 'Systems Explored',
      type: 'array' as const,
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Long-form Description',
      type: 'array' as const,
      of: [{ type: 'block' }],
    }),
  ],
})
