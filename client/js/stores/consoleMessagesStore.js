import { create } from 'zustand';

const MAX_MESSAGES = 200;

const useConsoleMessagesStore = create((set) => ({
	consoleMessages: [],

	addMessages: (newMessages) =>
		set((state) => ({
			consoleMessages: [...state.consoleMessages, ...newMessages].slice(-MAX_MESSAGES)
		}))
}));

export default useConsoleMessagesStore;
