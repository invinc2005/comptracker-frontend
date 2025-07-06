import { useEffect, useState } from 'react';
import api from '../api/api';
import GradientText from '../GradientText/GradientText';

const rankColor = (rank) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-400 text-yellow-900 border-yellow-500';
    case 2:
      return 'bg-slate-300 text-slate-800 border-slate-400';
    case 3:
      return 'bg-orange-400 text-orange-900 border-orange-500';
    default:
      return 'bg-slate-200 text-slate-600 border-slate-300';
  }
};

const Leaderboard = () => {
  const [competitionId, setCompetitionId] = useState('');
  const [competitions, setCompetitions] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await api.get('/competitions');
        setCompetitions(res.data);
      } catch (err) {
        console.error('Failed to fetch competitions', err);
      }
    };
    fetchCompetitions();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!competitionId) return;
      try {
        const res = await api.get(`/competitions/${competitionId}/leaderboard`);
        setParticipants(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      }
    };
    fetchLeaderboard();
  }, [competitionId]);

  return (
    <>

    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <GradientText className="text-4xl  text-center  mb-4">Leaderboard</GradientText>
          <select
            className="mb-6 w-full border px-3 py-2 rounded text-gray-700"
            value={competitionId}
            onChange={(e) => setCompetitionId(e.target.value)}
          >
            <option value="">Select Competition</option>
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.title}
              </option>
            ))}
          </select>

          {participants.length === 0 ? (
            <p className="text-center text-gray-600">No leaderboard data available.</p>
          ) : (
            <div className="space-y-4">
              {participants.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-lg ${
                    index === 0 ? 'bg-gradient-to-r from-amber-300 to-yellow-400 shadow-yellow-500/30' : 'bg-white'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-4 border-2 ${rankColor(index + 1)}`}
                  >
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-full mr-4 bg-indigo-100 text-indigo-800 font-bold text-center flex items-center justify-center border-2 border-white shadow-sm">
                    {player.name[0].toUpperCase()}
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg font-bold text-gray-800">{player.name}</p>
                  </div>
                  <div className="text-xl font-bold text-indigo-600">
                    {player.score.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Leaderboard;
