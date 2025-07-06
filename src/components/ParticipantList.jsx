import { useEffect, useState } from 'react';
import api from '../api/api';
import GradientText from '../GradientText/GradientText';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', score: '', competitionId: '' });

  const fetchCompetitions = async () => {
    try {
      const res = await api.get('/competitions');
      setCompetitions(res.data);
    } catch (err) {
      console.error('Error fetching competitions', err);
    }
  };

 const fetchParticipants = async () => {
  try {
    let url = '/participants';

    if (selectedCompetitionId) {
      const params = new URLSearchParams();
      params.append('competitionId', selectedCompetitionId);
      if (minScore) params.append('minScore', minScore);
      if (maxScore) params.append('maxScore', maxScore);
      url = `/participants/by-competition-and-score?${params.toString()}`;
    } else if (minScore || maxScore) {
      const params = new URLSearchParams();
      if (minScore) params.append('minScore', minScore);
      if (maxScore) params.append('maxScore', maxScore);
      url = `/participants?${params.toString()}`;
    }

    const res = await api.get(url);
    setParticipants(res.data);
  } catch (err) {
    console.error('Error fetching participants', err);
  }
};


  useEffect(() => {
    fetchCompetitions();
  }, []);

  useEffect(() => {
    fetchParticipants();
  }, [selectedCompetitionId, minScore, maxScore]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this participant?')) return;
    try {
      await api.delete(`/participants/${id}`);
      fetchParticipants();
    } catch (err) {
      console.error('Error deleting participant', err);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      name: p.name,
      email: p.email,
      score: p.score,
      competitionId: p.competition?.id || ''
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', email: '', score: '', competitionId: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await api.put(`/participants/${id}`, {
        name: editForm.name,
        email: editForm.email,
        score: editForm.score,
        competition: { id: editForm.competitionId }
      });
      setEditingId(null);
      fetchParticipants();
    } catch (err) {
      alert('Update failed.');
      console.error(err);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompetitionId('');
    setMinScore('');
    setMaxScore('');
  };

  return (
    <div className="w-full">
    <GradientText className="text-3xl font-bold mb-6 text-start ">Participant List</GradientText>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Filter by Competition</label>
          <select
            value={selectedCompetitionId}
            onChange={(e) => setSelectedCompetitionId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All Competitions</option>
            {competitions.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Min Score</label>
          <input
            type="number"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Max Score</label>
          <input
            type="number"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-sm overflow-hidden rounded-xl bg-white border border-black-200">
        <thead className="bg-gray-100">
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Competition</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No participants found.
              </td>
            </tr>
          ) : (
            participants.map((p) => (
              <tr key={p.id}>
                {editingId === p.id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        name="score"
                        value={editForm.score}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        name="competitionId"
                        value={editForm.competitionId}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      >
                        <option value="">Select</option>
                        {competitions.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEditSubmit(p.id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{p.name}</td>
                    <td className="border px-4 py-2">{p.email}</td>
                    <td className="border px-4 py-2">{p.score}</td>
                    <td className="border px-4 py-2">{p.competition?.title || 'N/A'}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => startEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ParticipantList;
