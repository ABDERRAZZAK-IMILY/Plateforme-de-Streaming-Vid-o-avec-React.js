import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { User } from '../model/User.model';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '', username: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const validateForm = () => {
            let newErrors = { email: '', password: '', username: '' };

            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Format d'email invalide";
            }

            if (formData.password && formData.password.length < 6) {
                newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
            }

            if (!isLogin && formData.username && formData.username.length < 3) {
                newErrors.username = "Le nom d'utilisateur est trop court";
            }

            setErrors(newErrors);
        };

        validateForm();
    }, [formData, isLogin]);

    const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

        if (isLogin) {
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            if (user) {
                login(user);
                navigate('/');
            } else {
                alert("Identifiants incorrects");
            }
        } else {
            const newUser: User = {
                id: crypto.randomUUID(),
                username: formData.username,
                email: formData.email,
                password: formData.password
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            login(newUser);
            navigate('/');
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '2rem auto', marginLeft : "5rem" }}>
            <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {!isLogin && (
                    <div>
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        {errors.username && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.username}</p>}
                    </div>
                )}
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    {errors.password && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</p>}
                </div>
                <button type="submit" disabled={!!errors.email || !!errors.password || (!isLogin && !!errors.username)}>
                    {isLogin ? 'Se connecter' : "S'inscrire"}
                </button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', marginTop: '1rem', textDecoration: 'underline' }}>
                {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </p>
        </div>
    );
}