import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export const insertPlayer = payload => api.post(`/player`, payload);
export const getAllPlayers = () => api.get(`/players`);
export const updatePlayerById = (id, payload) => api.put(`/player/${id}`, payload);
export const deletePlayerById = id => api.delete(`/player/${id}`);
export const getPlayerById = id => api.get(`/player/${id}`);

export const insertMatch = payload => api.post(`/match`, payload);
export const getAllMatches = () => api.get(`/matches`);
export const updateMatchById = (id, payload) => api.put(`/match/${id}`, payload);
export const deleteMatchById = id => api.delete(`/match/${id}`);
export const getMatchById = id => api.get(`/match/${id}`);

export const insertHandicaprule = payload => api.post(`/handicaprule`, payload);
export const updateHandicapruleById = (id, payload) => api.put(`/handicaprule/${id}`, payload);
export const getAllHandicaprules = () => api.get(`/handicaprules`);
export const deleteHandicapruleById = id => api.delete(`/handicaprule/${id}`);
export const getHandicapruleById = id => api.get(`/handicaprule/${id}`);

const apis = {
    insertPlayer,
    getAllPlayers,
    updatePlayerById,
    deletePlayerById,
    getPlayerById,
    insertMatch,
    getAllMatches,
    updateMatchById,
    deleteMatchById,
    getMatchById,
    insertHandicaprule,
    updateHandicapruleById,
    getAllHandicaprules,
    deleteHandicapruleById,
    getHandicapruleById,
};

export default apis;



