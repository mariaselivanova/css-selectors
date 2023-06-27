import { Level } from './types';

export const levelsArray: Level[] = [
  {
    number: 1,
    task: 'Select the birds',
    answers: ['bird'],
    tagsArray: [
      {
        name: 'bird',
        id: 1,
        idAttribute: null,
        strobe: true,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
        strobe: true,
      }],
  },
  {
    number: 2,
    task: 'Select the balloons',
    answers: ['balloon'],
    tagsArray: [
      {
        name: 'balloon',
        id: 1,
        idAttribute: null,
        strobe: true,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
        strobe: false,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
        strobe: true,
      },
    ],
  },
  {
    number: 3,
    task: 'Select the blue bird',
    answers: ['#blue'],
    tagsArray: [
      {
        name: 'bird',
        id: 1,
        idAttribute: null,
        strobe: false,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: 'blue',
        strobe: true,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
        strobe: false,
      },
    ],
  },
];
