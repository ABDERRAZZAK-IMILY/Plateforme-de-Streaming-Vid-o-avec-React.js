import type{ Video } from '../model/Video.model';

export const MOCK_VIDEOS: Video[] = [
    {
        id: '1',
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        thumbnailUrl: 'https://img.youtube.com/vi/YoHD9XEInc0/maxresdefault.jpg',
        trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
        duration: '2h 28m',
        releaseYear: 2010,
        type: 'FILM',
        category: 'Science-Fiction',
        rating: 8.8,
        director: 'Christopher Nolan',
        cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt']
    },
];