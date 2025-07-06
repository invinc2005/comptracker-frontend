import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});


export const fetchCompetitions = () => api.get('/competitions');

export const createCompetition = (data) => api.post('/competitions', data);

export const updateCompetition = (id, data) => api.put(`/competitions/${id}`, data);

export const deleteCompetition = (id) => api.delete(`/competitions/${id}`);

export const getCompetitionParticipants = (competitionId) =>
  api.get(`/competitions/${competitionId}/participants`);

export const addParticipantToCompetition = (competitionId, participant) =>
  api.post(`/competitions/${competitionId}/participants`, participant);

export const getLeaderboard = (competitionId) =>
  api.get(`/competitions/${competitionId}/leaderboard`);



export const getAllParticipants = () => api.get('/participants');

export const getParticipantsByScoreRange = (minScore, maxScore) =>
  api.get(`/participants`, {
    params: {
      minScore,
      maxScore,
    },
  });

export const getParticipantsByCompetition = (competitionId) =>
  api.get(`/participants/competition/${competitionId}`);

export const addParticipant = (participant) =>
  api.post('/participants', participant);

export const updateParticipant = (id, participant) =>
  api.put(`/participants/${id}`, participant);

export const deleteParticipant = (id) =>
  api.delete(`/participants/${id}`);

export default api;
