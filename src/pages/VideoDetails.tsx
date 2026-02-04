import { useParams } from 'react-router-dom';
import { MOCK_VIDEOS } from '../services/videoService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
import swal from "sweetalert";


export default function VideoDetails() {

    const { id } = useParams();
    const { currentUser } = useAuth();
    const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', []);
    
    const video = MOCK_VIDEOS.find(v => v.id === id);

    if (!video) return <div>Vidéo non trouvée.</div>;

    const isInWatchlist = watchlist.includes(video.id);

    const toggleWatchlist = () => {
        if (!currentUser) {
            swal("Attention", "Connectez-vous pour gérer votre liste", "warning");
            return;
        }
        
        if (isInWatchlist) {
            setWatchlist(watchlist.filter(vidId => vidId !== video.id));
        } else {
            setWatchlist([...watchlist, video.id]);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={video.trailerUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>{video.title}</h1>
                    <button onClick={toggleWatchlist}>
                        {isInWatchlist ? 'Retirer de ma liste' : 'Ajouter à ma liste'}
                    </button>
                </div>
                
                <p style={{ color: '#aaa' }}>{video.releaseYear} | {video.duration} | {video.category}</p>
                <p style={{ fontSize: '1.1rem' }}>{video.description}</p>
                
                <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
                    <p><strong>Réalisateur:</strong> {video.director}</p>
                    <p><strong>Casting:</strong> {video.cast.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}