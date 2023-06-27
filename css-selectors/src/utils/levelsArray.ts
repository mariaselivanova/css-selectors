import { Level } from './types';

export const levelsArray: Level[] = [
  {
    number: 1,
    task: 'Select the birds',
    answer: 'bird',
    tagsArray: [
      {
        name: 'bird',
        id: 1,
        idAttribute: null,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
      }],
  },
  {
    number: 2,
    task: 'Select the balloons',
    answer: 'balloon',
    tagsArray: [
      {
        name: 'balloon',
        id: 1,
        idAttribute: null,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
      },
    ],
  },
  {
    number: 3,
    task: 'Select the blue bird',
    answer: '#blue',
    tagsArray: [
      {
        name: 'bird',
        id: 1,
        idAttribute: 'blue',
      },
      {
        name: 'balloon',
        id: 2,
        idAttribute: null,
      },
      {
        name: 'bird',
        id: 3,
        idAttribute: null,
      },
    ],
  },
];
