import { Level } from './types';

export const levelsArray: Level[] = [
  {
    number: 1,
    name: 'easy-peasy',
    task: 'Choose birds',
    answer: 'blabla',
    html: '<plate />',
    tagsArray: [
      {
        name: 'bird',
        id: 1,
      },
      {
        name: 'balloon',
        id: 2,
      },
      {
        name: 'bird',
        id: 3,
      }],
  },
  {
    number: 2,
    name: 'easy',
    task: 'Select all cucumbers',
    answer: 'lalala',
    html: '<cucumber />',
    tagsArray: [
      {
        name: 'bird',
        id: 1,
      },
      {
        name: 'balloon',
        id: 2,
      },
    ],
  },
  {
    number: 3,
    name: 'not-so-easy',
    task: 'Select some tomatoes',
    answer: 'tomatotomato',
    html: '<tomato />',
    tagsArray: [
      {
        name: 'balloon',
        id: 1,
      },
      {
        name: 'bird',
        id: 2,
      },
    ],
  },
];
