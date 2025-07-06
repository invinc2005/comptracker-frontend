import { useEffect, useState } from 'react';
import api from '../api/api';
import { format } from 'date-fns';
import GradientText from '../GradientText/GradientText';


const CompetitionList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const fetchCompetitions = async () => {
    try {
      const res = await api.get('/competitions');
      setCompetitions(res.data);
    } catch (err) {
      console.error('Error fetching competitions', err);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this competition?')) return;
    try {
      await api.delete(`/competitions/${id}`);
      fetchCompetitions();
    } catch (err) {
      console.error('Error deleting competition', err);
    }
  };

  const startEdit = (comp) => {
    setEditingId(comp.id);
    setEditForm({
      title: comp.title,
      description: comp.description,
      startDate: comp.startDate.slice(0, 16),
      endDate: comp.endDate.slice(0, 16),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', startDate: '', endDate: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      await api.put(`/competitions/${id}`, {
        ...editForm,
        startDate: new Date(editForm.startDate).toISOString(),
        endDate: new Date(editForm.endDate).toISOString(),
      });
      setEditingId(null);
      fetchCompetitions();
    } catch (err) {
      alert('Failed to update competition');
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <GradientText className="text-3xl font-bold mb-6 text-start">Competition List</GradientText>
      <table className="w-full border-collapse shadow-sm overflow-hidden rounded-xl bg-white border border-black-200">
        <thead className="bg-gray-100">

          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Start</th>
            <th className="border px-4 py-2">End</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((comp) => (
            <tr key={comp.id}>
              {editingId === comp.id ? (
                <>
                  <td className="border px-4 py-2">
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={editForm.startDate}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={editForm.endDate}
                      onChange={handleEditChange}
                      className="border px-2 py-1 rounded w-full"
                    />
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => handleEditSubmit(comp.id)}
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
                  <td className="border px-4 py-2">{comp.title}</td>
                  <td className="border px-4 py-2">
                    {format(new Date(comp.startDate), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className="border px-4 py-2">
                    {format(new Date(comp.endDate), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => startEdit(comp)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(comp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionList;
