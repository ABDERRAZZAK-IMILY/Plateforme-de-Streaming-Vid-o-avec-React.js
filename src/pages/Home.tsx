import { useState, useEffect } from 'react';
import { getYouTubeVideos } from '../services/videoService';
import { VideoCard } from '../components/VideoCard';
import type { Video } from '../model/Video.model';

export default function Home() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            
            let query = searchTerm || 'movie trailers';
            if (selectedType !== 'ALL') query += ` ${selectedType}`;
            if (selectedCategory !== 'ALL') query += ` ${selectedCategory}`;

            const data = await getYouTubeVideos(query, 50);
            setVideos(data);
            setLoading(false);
        };

        const timeoutId = setTimeout(fetchData, 600);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedType, selectedCategory]);

    const categories = ['ALL', 'Action', 'Comédie', 'Drame', 'Science-Fiction', 'Horreur', 'Documentaire'];

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <header className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
                <div className="relative w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Rechercher des films, séries..." 
                        className="input input-bordered w-full pr-10 focus:input-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {loading && <span className="loading loading-spinner loading-sm absolute right-3 top-4 text-primary"></span>}
                </div>
                
                <div className="flex flex-wrap gap-2">
                    <select 
                        className="select select-bordered select-primary" 
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="ALL">Tous les formats</option>
                        <option value="movie trailers">Films</option>
                        <option value="tv show trailers">Séries</option>
                        <option value="documentary">Documentaires</option>
                    </select>

                    <select 
                        className="select select-bordered select-secondary" 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === 'ALL' ? 'Toutes les catégories' : cat}</option>
                        ))}
                    </select>
                </div>
                <div className="ml-auto hidden lg:block text-sm opacity-50">
                    {videos.length} résultats trouvés
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
            
            {!loading && videos.length === 0 && (
                <div className="alert alert-warning shadow-lg mt-10">
                    <span>Aucun contenu trouvé pour</span>
                </div>
            )}
        </div>
    );
}