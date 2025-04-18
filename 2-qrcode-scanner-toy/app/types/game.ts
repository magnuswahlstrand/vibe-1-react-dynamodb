export interface GameItem {
  title: string;
  description: string;
  imageUrl: string;
}

export const QR_CODE_MAPPINGS: Record<string, GameItem> = {
  'r': {
    title: 'Small Cat',
    description: 'A tiny kitten',
    imageUrl: 'https://picsum.photos/id/237/200/300',
  },
  't': {
    title: 'Medium Cat',
    description: 'A growing kitten',
    imageUrl: 'https://picsum.photos/id/238/200/300',
  },
  'y': {
    title: 'Large Cat',
    description: 'A full-grown cat',
    imageUrl: 'https://picsum.photos/id/239/200/300',
  }
}; 