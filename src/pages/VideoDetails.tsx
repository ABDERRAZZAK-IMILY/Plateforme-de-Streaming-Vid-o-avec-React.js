import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import swal from "sweetalert";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

interface Video {
    id: string;
    title: string;
    trailerUrl: string;
    releaseYear: number;
    duration: string;
    category: string;
    description: string;
    director: string;
    cast: string[];
}

export default function VideoDetails() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [watchList, setWatchList] = useLocalStorage<string[]>('watchList', []);
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleVideo = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`);
                const data = await res.json();
                
                if (data.items && data.items[0]) {
                    const item = data.items[0];
                    setVideo({
                        id: item.id,
                        title: item.snippet.title,
                        trailerUrl: `https://www.youtube.com/embed/${item.id}`,
                        releaseYear: new Date(item.snippet.publishedAt).getFullYear(),
                        duration: '2h 15m', 
                        category: 'Film', 
                        description: item.snippet.description,
                        director: item.snippet.channelTitle,
                        cast: ['YouTube Creator'],
                    });
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSingleVideo();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!video) return (
        <div className="alert alert-error max-w-lg mx-auto mt-10">
            <span>Vidéo non trouvée.</span>
        </div>
    );

    const isInWatchList = watchList.includes(video.id);

    const toggleWatchList = () => {
        if (!currentUser) {
            swal("Attention", "Connectez-vous pour gérer votre liste", "warning");
            return;
        }
        
        if (isInWatchList) {
            setWatchList(watchList.filter(vidId => vidId !== video.id));
            swal("Succès", "Retiré de votre liste", "success");
        } else {
            setWatchList([...watchList, video.id]);
            swal("Succès", "Ajouté à votre liste", "success");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-5xl">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                    className="w-full h-full"
                    src={`${video.trailerUrl}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold">{video.title}</h1>
                    <button 
                        onClick={toggleWatchList}
                        className={`btn ${isInWatchList ? 'btn-outline btn-error' : 'btn-primary'}`}
                    >
                        {isInWatchList ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
                    </button>
                </div>
                
                <div className="flex gap-2">
                    <div className="badge badge-secondary">{video.releaseYear}</div>
                    <div className="badge badge-outline">{video.duration}</div>
                    <div className="badge badge-ghost">{video.category}</div>
                </div>

                <div className="divider">Description</div>
                
                <p className="text-lg leading-relaxed opacity-80 whitespace-pre-wrap">
                    {video.description}
                </p>
                
                <div className="bg-base-200 p-6 rounded-xl space-y-2 mt-6">
                    <p><strong>Réalisateur:</strong> <span className="text-primary">{video.director}</span></p>
                    <p><strong>Casting:</strong> {video.cast.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}