import { useState, useMemo } from 'react';
import { MOCK_VIDEOS } from '../services/videoService';
import { VideoCard } from '../components/VideoCard';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const filteredVideos = useMemo(() => {
        return MOCK_VIDEOS.filter(video => {
            const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'ALL' || video.type === selectedType;
            const matchesCategory = selectedCategory === 'ALL' || video.category === selectedCategory;
            return matchesSearch && matchesType && matchesCategory;
        });
    }, [searchTerm, selectedType, selectedCategory]);

    const categories = ['ALL', 'Action', 'Comédie', 'Drame', 'Science-Fiction', 'Thriller', 'Documentaire', 'Horreur'];

    return (
        <div className="home-page" style={{ padding: '20px' }}>
            <header style={{ marginBottom: '30px' }}>
                <input 
                    type="text" 
                    placeholder="Rechercher un film..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px' }}
                />
                
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <select onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="ALL">Tous les types</option>
                        <option value="FILM">Films</option>
                        <option value="SERIE">Séries</option>
                        <option value="DOCUMENTAIRE">Documentaires</option>
                    </select>

                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </header>

            <div className="video-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
                gap: '20px' 
            }}>
                {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
            
            {filteredVideos.length === 0 && <p>Aucun contenu trouvé.</p>}
        </div>
    );
}