import { Level } from './types';

export const levelsArray: Level[] = [
  {
    number: 1,
    task: 'Select the crabs',
    selector: 'crab',
    markup:
    `<crab></crab>
     <crab></crab>
    `,
    tagsArray: [
      {
        name: 'crab',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        child: null,
        imageClassname: 'crab',
      },
      {
        name: 'crab',
        id: 2,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        child: null,
        imageClassname: 'crab',
      }],
  },
  {
    number: 2,
    task: 'Select the seals',
    selector: 'seal',
    markup:
    `<seal></seal>
     <crab></crab>
     <seal></seal>
    `,
    tagsArray: [
      {
        name: 'seal',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        child: null,
        imageClassname: 'seal',
      },
      {
        name: 'crab',
        id: 2,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'crab',
      },
      {
        name: 'seal',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        child: null,
        imageClassname: 'seal',
      },

    ],
  },
  {
    number: 3,
    task: 'Select the white jellyfish',
    selector: '#white',
    markup:
    `<jellyfish id = 'white'></jellyfish>
     <jellyfish></jellyfish>
     <seal></seal>
    `,
    tagsArray: [
      {
        name: 'jellyfish',
        id: 1,
        idAttribute: 'white',
        classAttribute: null,
        strobe: true,
        child: null,
        imageClassname: 'jellyfish-white',

      },
      {
        name: 'jellyfish',
        id: 2,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'jellyfish-blue',
      },
      {
        name: 'seal',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'seal',
      },
    ],
  },
  {
    number: 4,
    task: 'Select the crab in the seaweed',
    selector: 'seaweed crab',
    markup:
    `<seaweed>
      <crab></crab>
     </seaweed>
     <crab></crab>
     <seal></seal>
    `,
    tagsArray: [
      {
        name: 'seaweed',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 4,
          idAttribute: null,
          classAttribute: null,
          strobe: true,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'crab',
        id: 2,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'crab',
      },
      {
        name: 'seal',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'seal',
      },
    ],
  },
  {
    number: 5,
    task: 'Select the seal in the blue coral',
    selector: '#blue seal',
    markup:
    `<seaweed>
      <crab></crab>
     </seaweed>
     <coral>
       <seal></seal>
     </coral>
     <coral id = "blue">
       <seal></seal>
     </coral>
    `,
    tagsArray: [
      {
        name: 'seaweed',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 2,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'coral',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'coral-red',
        child: {
          name: 'seal',
          id: 4,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'seal',
        },
      },
      {
        name: 'coral',
        id: 5,
        idAttribute: 'blue',
        classAttribute: null,
        strobe: false,
        imageClassname: 'coral-blue',
        child: {
          name: 'seal',
          id: 6,
          idAttribute: null,
          classAttribute: null,
          strobe: true,
          child: null,
          imageClassname: 'seal',
        },
      },
    ],
  },

  {
    number: 6,
    task: 'Select the small seals',
    selector: '.small',
    markup:
    `<seal></seal>
     <seal class = 'small'></seal>
     <coral>
     <seal class = 'small'></seal>
     </coral>
     <coral></coral>
    `,
    tagsArray: [
      {
        name: 'seal',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'seal',
      },
      {
        name: 'seal',
        id: 2,
        idAttribute: null,
        classAttribute: 'small',
        strobe: true,
        child: null,
        imageClassname: 'seal-small',
      },
      {
        name: 'coral',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'coral-red',
        child: {
          name: 'seal',
          id: 4,
          idAttribute: null,
          classAttribute: 'small',
          strobe: true,
          child: null,
          imageClassname: 'seal-small',
        },
      },
      {
        name: 'coral',
        id: 5,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'coral-red',
      },
    ],
  },
  {
    number: 7,
    task: 'Select the small crab',
    selector: 'crab.small',
    markup:
    `<seal></seal>
     <seal class="small"></seal>
     <seaweed>
     <crab class='small'></crab>
     </seaweed>
     <seaweed>
       <crab></crab>
     </seaweed>
    `,
    tagsArray: [
      {
        name: 'seal',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        child: null,
        imageClassname: 'seal',
      },
      {
        name: 'seal',
        id: 2,
        idAttribute: null,
        classAttribute: 'small',
        strobe: false,
        child: null,
        imageClassname: 'seal-small',
      },
      {
        name: 'seaweed',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 4,
          idAttribute: null,
          classAttribute: 'small',
          strobe: true,
          child: null,
          imageClassname: 'crab-small',
        },
      },
      {
        name: 'seaweed',
        id: 5,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 6,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'crab',
        },
      },
    ],
  },
  {
    number: 8,
    task: 'Select the small crab in the seaweed',
    selector: 'seaweed crab.small',
    markup:
    `<seaweed>
      <crab></crab>
    </seaweed>
    <crab class="small"></crab>
    <seaweed>
      <crab class='small'></crab>
    </seaweed>
    <seaweed>
      <seal class='small'></seal>
    </seaweed>
    `,
    tagsArray: [
      {
        name: 'seaweed',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 2,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'crab',
        id: 3,
        idAttribute: null,
        classAttribute: 'small',
        strobe: false,
        child: null,
        imageClassname: 'crab-small',
      },
      {
        name: 'seaweed',
        id: 4,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 5,
          idAttribute: null,
          classAttribute: 'small',
          strobe: true,
          child: null,
          imageClassname: 'crab-small',
        },
      },
      {
        name: 'seaweed',
        id: 6,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seaweed',
        child: {
          name: 'seal',
          id: 7,
          idAttribute: null,
          classAttribute: 'small',
          strobe: false,
          child: null,
          imageClassname: 'seal-small',
        },
      },
    ],
  },
  {
    number: 9,
    task: 'Select all the corals and seaweed',
    selector: 'seaweed, coral',
    markup:
    `<seaweed>
      <crab></crab>
    </seaweed>
    <seaweed>
      <seal></seal>
    </seaweed>
    <coral class='blue'>
      <seal></seal>
    </coral>
    <coral>
      <crab></crab>
    </coral>
    `,
    tagsArray: [
      {
        name: 'seaweed',
        id: 1,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        imageClassname: 'seaweed',
        child: {
          name: 'crab',
          id: 2,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'seaweed',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        imageClassname: 'seaweed',
        child: {
          name: 'seal',
          id: 4,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'seal',
        },
      },
      {
        name: 'coral',
        id: 5,
        idAttribute: null,
        classAttribute: 'blue',
        strobe: true,
        imageClassname: 'coral-blue',
        child: {
          name: 'seal',
          id: 6,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'seal',
        },
      },
      {
        name: 'coral',
        id: 7,
        idAttribute: null,
        classAttribute: null,
        strobe: true,
        imageClassname: 'coral-red',
        child: {
          name: 'crab',
          id: 8,
          idAttribute: null,
          classAttribute: null,
          strobe: false,
          child: null,
          imageClassname: 'crab',
        },
      },
    ],
  },
  {
    number: 10,
    task: 'Select every animal in corals',
    selector: 'coral *',
    markup:
    `
    <coral class='blue'>
      <seal></seal>
    </coral>
    <coral>
      <crab></crab>
    </coral>
    <coral>
      <crab></crab>
    </coral>
    <seal></seal>
    `,
    tagsArray: [
      {
        name: 'coral',
        id: 1,
        idAttribute: null,
        classAttribute: 'blue',
        strobe: false,
        imageClassname: 'coral-blue',
        child: {
          name: 'seal',
          id: 2,
          idAttribute: null,
          classAttribute: null,
          strobe: true,
          child: null,
          imageClassname: 'seal',
        },
      },
      {
        name: 'coral',
        id: 3,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'coral-red',
        child: {
          name: 'crab',
          id: 4,
          idAttribute: null,
          classAttribute: null,
          strobe: true,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'coral',
        id: 5,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'coral-red',
        child: {
          name: 'crab',
          id: 6,
          idAttribute: null,
          classAttribute: null,
          strobe: true,
          child: null,
          imageClassname: 'crab',
        },
      },
      {
        name: 'seal',
        id: 7,
        idAttribute: null,
        classAttribute: null,
        strobe: false,
        imageClassname: 'seal',
        child: null,
      },
    ],
  },
];
