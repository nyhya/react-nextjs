import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertModalType } from 'types/ComponentType';

interface IAlertModal {
	open: boolean;
	modalType: AlertModalType;
	headerTxt: string;
	contentTxt: string;
}

const alertModal = createSlice({
	name: 'alertModal',
	initialState: {
		open: false,
		modalType: AlertModalType.NORMAL,
		contentTxt: '',
	} as IAlertModal,
	reducers: {
		rdxModalOpen(
			state,
			action: PayloadAction<{ alertTxt: string; modalType: AlertModalType }>,
		) {
			state.open = true;
			state.contentTxt = action.payload.alertTxt;
		},
		rdxModalClose(state) {
			state.open = false;
		},
	},
});

export const alertActions = alertModal.actions;
export default alertModal;
