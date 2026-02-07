import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { VideoCard } from '../components/VideoCard';
import type { Video } from '../model/Video.model';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Watchlist() {
    const [watchList] = useLocalStorage<string[]>('watchList', []);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlistVideos = async () => {
            if (watchList.length === 0) {
                setVideos([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const ids = watchList.join(',');
                const res = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${ids}&key=${API_KEY}`
                );
                const data = await res.json();

                if (data.items) {
                    const fetchedVideos: Video[] = data.items.map((item: any) => ({
                        id: item.id,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url,
                        trailerUrl: `https://www.youtube.com/embed/${item.id}`,
                        duration: '2h 15m',
                        releaseYear: new Date(item.snippet.publishedAt).getFullYear(),
                        type: 'FILM' as const,
                        category: 'Général',
                        rating: parseFloat((Math.random() * (9.8 - 7.5) + 7.5).toFixed(1)),
                        director: item.snippet.channelTitle,
                        cast: ['YouTube Creator'],
                    }));
                    setVideos(fetchedVideos);
                }
            } catch (error) {
                console.error('Error fetching watchlist videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWatchlistVideos();
    }, [watchList]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Ma Liste</h1>
                        <p className="text-sm opacity-70 mt-1">
                            {videos.length} {videos.length > 1 ? 'vidéos sauvegardées' : 'vidéo sauvegardée'}
                        </p>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total</div>
                            <div className="stat-value text-primary">{videos.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {videos.length === 0 ? (
                <div className="hero min-h-[40vh] bg-base-100 rounded-2xl">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h2 className="text-2xl font-bold">Votre liste est vide</h2>
                            <p className="py-4 opacity-70">
                                Parcourez notre catalogue et ajoutez des vidéos à votre liste pour les retrouver facilement ici.
                            </p>
                            <a href="/" className="btn btn-primary">
                                Explorer le catalogue
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
}