import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Watchlist = lazy(() => import('./pages/Watchlist'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading Platform...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;