import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IScrapModal {
	open: boolean;
}

const scrapModal = createSlice({
	name: 'scrapModal',
	initialState: {} as IScrapModal,
	reducers: {
		rdxScrapModalOpen(state, action: PayloadAction<boolean>) {
			state.open = action.payload;
		},
	},
});

export const scrapActions = scrapModal.actions;

export default scrapModal;
