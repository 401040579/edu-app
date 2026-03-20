import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import DialoguePage from './pages/DialoguePage';
import MindMapPage from './pages/MindMapPage';
import KnowledgeGraphPage from './pages/KnowledgeGraphPage';
import DashboardPage from './pages/DashboardPage';
import AchievementsPage from './pages/AchievementsPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/dialogue" element={<DialoguePage />} />
          <Route path="/mindmap/:id" element={<MindMapPage />} />
          <Route path="/knowledge" element={<KnowledgeGraphPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
