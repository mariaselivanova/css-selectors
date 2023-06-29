import { Level } from './types';

export const levelsArray: Level[] = [
  {
    number: 1,
    task: 'Select the piglets',
    answers: ['bird'],
    tagsArray: [
      {
        name: 'pig',
        id: 1,
        idAttribute: null,
        strobe: true,
        child: null,
      },
      {
        name: 'pig',
        id: 2,
        idAttribute: null,
        strobe: true,
        child: null,
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
        child: null,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
        strobe: false,
        child: null,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
        strobe: true,
        child: null,
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
        child: null,
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: 'blue',
        strobe: true,
        child: null,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
        strobe: false,
        child: null,
      },
    ],
  },
  {
    number: 4,
    task: 'Select the bird on the cloud',
    answers: ['#blue'],
    tagsArray: [
      {
        name: 'cloud',
        id: 1,
        idAttribute: null,
        strobe: false,
        child: {
          name: 'bird',
          id: 4,
          idAttribute: null,
          strobe: true,
          child: null,
        },
      },
      {
        name: 'bird',
        id: 2,
        idAttribute: null,
        strobe: false,
        child: null,
      },
      {
        name: 'balloon',
        id: 3,
        idAttribute: null,
        strobe: false,
        child: null,
      },
    ],
  },
];
