import type { Video } from '../model/Video.model';
import { Link } from 'react-router-dom';

interface Props {
    video: Video;
}
export const VideoCard = ({ video }: Props) => {
    return (
        <Link to={`/video/${video.id}`} className="card card-compact bg-base-100 shadow-xl hover:scale-105 transition-transform">
            <figure>
                <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-sm">{video.title}</h2>
                <p className="text-xs opacity-70">{video.releaseYear} • {video.category}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline text-warning">★ {video.rating}</div>
                </div>
            </div>
        </Link>
    );
};