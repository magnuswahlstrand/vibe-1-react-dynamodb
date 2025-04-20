export interface GameItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const GAME_ITEMS: Record<string, GameItem> = {
  'small': {
    id: 'small',
    title: 'Small Cat',
    description: 'A tiny kitten',
    imageUrl: 'https://picsum.photos/id/237/200/300',
  },
  'medium': {
    id: 'medium',
    title: 'Medium Cat',
    description: 'A growing kitten',
    imageUrl: 'https://picsum.photos/id/238/200/300',
  },
  'large': {
    id: 'large',
    title: 'Large Cat',
    description: 'A full-grown cat',
    imageUrl: 'https://picsum.photos/id/239/200/300',
  }
};

// Maps QR codes to item IDs
export const QR_CODE_MAPPINGS: Record<string, string> = {
  'y': 'small',
  'u': 'medium',
  'i': 'large'
};

// Command mappings for the game page
export const GAME_COMMANDS: Record<string, () => void> = {
  'r': () => {
    // Reset game - handled in the component
  },
  'm': () => {
    // Go to menu - handled in the component
  }
};

// Defines the correct order of items
export const CORRECT_ORDER: string[] = ['small', 'medium', 'large'];