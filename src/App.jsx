import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompetitionPage from './pages/CompetitionPage';
import ParticipantPage from './pages/ParticipantPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Navbar from './components/Navbar'; 
import HomePage from './pages/HomePage';
const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
      <Route path="/" element={<HomePage />} /> 
        <Route path="/competitions" element={<CompetitionPage />} />
        <Route path="/participants" element={<ParticipantPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
