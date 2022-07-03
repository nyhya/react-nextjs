import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestArr {
	testArray: Array<string>;
	addressId: number;
	addressName: string;
	level: number;
	paddressId: number;
}

const user = createSlice({
	name: 'user',
	initialState: {} as TestArr,
	reducers: {
		rdxSetLoggedUser(state, action: PayloadAction<Array<string>>) {
			state.testArray = action.payload;
		},
	},
});

export const userActions = user.actions;

export default user;
