export type GameItem = {
  id: string;
  title: string;
  imageUrl: string;
};

export const GAME_ITEMS: Record<string, GameItem> = {
  'number_1': {
    id: 'number_1',
    title: 'Giraffe',
    imageUrl: '/images/giraffe.png'
  },
  'number_2': {
    id: 'number_2',
    title: 'Horse',
    imageUrl: '/images/horse.png'
  },
  'number_3': {
    id: 'number_3',
    title: 'Dog',
    imageUrl: '/images/dog.png'
  },
  'number_4': {
    id: 'number_4',
    title: 'Cat',
    imageUrl: '/images/cat.png'
  },
  'number_5': {
    id: 'number_5',
    title: 'Ant',
    imageUrl: '/images/ant.png'
  }
};

export const CORRECT_ORDER = [
  'number_1',
  'number_2',
  'number_3',
  'number_4',
  'number_5'
];

export const QR_CODE_MAPPINGS: Record<string, string> = {
  'number_1': 'number_1',
  'number_2': 'number_2',
  'number_3': 'number_3',
  'number_4': 'number_4',
  'number_5': 'number_5'
};

export const GAME_COMMANDS: Record<string, () => void> = {
  'restart': () => {},
  'down': () => {}
};