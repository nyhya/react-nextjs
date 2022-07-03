import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';
import { combineReducers } from 'redux';
import user from 'store/user';
import scrapModal from 'store/common/scrapModal';
import alertModal from './common/alertModal';

const rootReducer = combineReducers({
	user: user.reducer,
	scrapModal: scrapModal.reducer,
	alertModal: alertModal.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		if (state === initialRootState) {
			return {
				...state,
				...action.payload,
			};
		}
		return state;
	}
	return rootReducer(state, action);
};

export const userSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore = () => {
	const store = configureStore({
		reducer,
		devTools: true,
		// debug: process.env.NODE_ENV === 'development',
	});
	initialRootState = store.getState();
	return store;
};

export const wrapper = createWrapper(initStore);
