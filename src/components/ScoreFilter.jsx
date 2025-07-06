import { useState } from 'react';
import api from '../api/api';

const ScoreFilter = () => {
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleFilter = async () => {
    try {
      const res = await api.get(`/participants/filter?minScore=${minScore}&maxScore=${maxScore}`);
      setParticipants(res.data);
    } catch (err) {
      console.error('Error filtering participants', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Filter Participants by Score</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="number"
          placeholder="Min Score"
          className="border px-3 py-2 rounded w-full"
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Score"
          className="border px-3 py-2 rounded w-full"
          value={maxScore}
          onChange={(e) => setMaxScore(e.target.value)}
        />
        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded">
          Filter
        </button>
      </div>

      {participants.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.email}</td>
                <td className="border px-4 py-2">{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No participants found.</p>
      )}
    </div>
  );
};

export default ScoreFilter;
