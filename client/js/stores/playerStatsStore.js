import { create } from 'zustand';

const usePlayerStatsStore = create((set) => ({
	playerStats: {
		attributes: {
			fuerza: 0,
			agilidad: 0,
			inteligencia: 0,
			carisma: 0,
			constitucion: 0
		},
		fameInfo: {
			asesino: 0,
			bandido: 0,
			burgues: 0,
			ladron: 0,
			noble: 0,
			plebe: 0,
			status: ''
		},
		miniStats: {
			ciudadanosMatados: 0,
			criminalesMatados: 0,
			usuariosMatados: 0,
			npcsMuertos: 0,
			clase: '',
			pena: 0
		},
		skills: []
	},
	setPlayerAttributes: (attributes) =>
		set((state) => ({ playerStats: { ...state.playerStats, attributes } })),
	setPlayerSkills: (skills) => set((state) => ({ playerStats: { ...state.playerStats, skills } })),
	setFameInfo: (fameInfo) => set((state) => ({ playerStats: { ...state.playerStats, fameInfo } })),
	setMiniStats: (miniStats) => set((state) => ({ playerStats: { ...state.playerStats, miniStats } })),
	setSkills: (skills) => set((state) => ({ playerStats: { ...state.playerStats, skills } }))
}));

export default usePlayerStatsStore;
