import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 180px;
	height: 100%;
	margin-right: 10px;
	label {
		display: block;
		line-height: 20px;
		font-size: 14px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpblack};
		margin-bottom: 5px;
	}
	input {
		box-sizing: border-box;
		width: 100%;
		height: 24px;
		font-family: NotoSansKR !important;
		font-size: 16px;
		letter-spacing: -0.32px;
		color: ${props => props.theme.dpGrayDeep};
		border: 0;
		padding: 0;
		outline: none;
	}
`;

interface IProp {
	label: string;
	reset: boolean;
	onReset: () => void;
	onChange: (inputValue: string) => void;
}

export default function ClassSearchInput(props: IProp): JSX.Element {
	const { label, reset, onReset, onChange } = props;

	const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		if (reset) {
			inputRef.current.value = '';
			onReset();
		}
	}, [reset]);

	const onChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(e.target.value);
			}
		},
		[],
	);
	return (
		<Container>
			<label>{label}</label>
			<input
				ref={inputRef}
				type="text"
				placeholder="검색어를 입력하세요."
				onChange={onChangeInput}
			/>
		</Container>
	);
}
