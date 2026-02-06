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
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <form onSubmit={handleSubmit} className="form-control gap-4">
                        {!isLogin && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                                {errors.username && <span className="label-text-alt text-error mt-1">{errors.username}</span>}
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            {errors.email && <span className="label-text-alt text-error mt-1">{errors.email}</span>}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            {errors.password && <span className="label-text-alt text-error mt-1">{errors.password}</span>}
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                            disabled={!!errors.email || !!errors.password || (!isLogin && !!errors.username)}
                        >
                            {isLogin ? 'Se connecter' : "S'inscrire"}
                        </button>
                    </form>
                    <div className="divider">OR</div>
                    <p onClick={() => setIsLogin(!isLogin)} className="text-center link link-hover text-sm">
                        {isLogin ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
                    </p>
                </div>
            </div>
        </div>
    );
}