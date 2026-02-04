import type { Video } from '../model/Video.model';
import { Link } from 'react-router-dom';

interface Props {
    video: Video;
}

export const VideoCard = ({ video }: Props) => {
    return (
        <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="video-card" style={{ border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '5px 0' }}>{video.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{video.releaseYear} • {video.category}</p>
                <div style={{ color: '#ffd700' }}>★ {video.rating}</div>
            </div>
        </div>
        </Link>
    );
};