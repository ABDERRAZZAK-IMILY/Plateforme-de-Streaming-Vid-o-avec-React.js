export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    trailerUrl: string;
    duration: string;
    releaseYear: number;
    type: 'FILM' | 'SERIE' | 'DOCUMENTAIRE';
    category: string;
    rating: number;
    director: string;
    cast: string[];
}