import axios from 'axios';
import type { Video } from '../model/Video.model';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getYouTubeVideos = async (
    query: string = 'movie trailers', 
    maxResults: number = 50
): Promise<Video[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                part: 'snippet',
                maxResults: maxResults,
                q: query,
                type: 'video',
                videoEmbeddable: 'true',
                key: API_KEY
            }
        });

        return response.data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url,
            trailerUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
            duration: '2h 15m', 
            releaseYear: new Date(item.snippet.publishedAt).getFullYear(),
            type: query.toLowerCase().includes('documentary') ? 'DOCUMENTAIRE' : 
                  query.toLowerCase().includes('tv show') ? 'SERIE' : 'FILM',
            category: 'Général', 
            rating: parseFloat((Math.random() * (9.8 - 7.5) + 7.5).toFixed(1)),
            director: item.snippet.channelTitle,
            cast: ['Official Source']
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
        return [];
    }
};