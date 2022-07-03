import { forwardRef, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 24px;
	z-index: 9999;
	margin-right: 30px;
	cursor: pointer;

	label {
		display: block;
		line-height: 20px;
		font-size: 14px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpblack};
		margin-bottom: 5px;
	}
	.input-area {
		box-sizing: border-box;
		position: relative;
		width: 200px;
		padding-left: 30px;
		height: 24px;
		display: block;
		content: '';
		background: url('/ico/ico-calender.png') no-repeat left center/24px auto;
		input {
			width: 100%;
			font-size: 16px;
			vertical-align: middle;
			letter-spacing: -0.32px;
			color: ${props => props.theme.dpGrayDeep};
			font-family: 'NotoSansKR' !important;
			display: flex;
			align-items: center;
			border: none;
			outline: none;
			padding: 4px 0px;
		}
	}
`;

interface IProp {
	label: string;
	className: string;
	value: string;
	onClick: () => void;
}

function DateInput(
	props: IProp,
	ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element {
	const { label, className, value, onClick } = props;

	const onChangeHander = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log(e.target.value);
		},
		[],
	);

	return (
		<Container>
			<label>{label}</label>
			<div className="input-area">
				<input
					placeholder="날짜를 입력하세요"
					className={className}
					type="text"
					value={value}
					ref={ref}
					// onChange={e => onChange(e.target.value)}
					onChange={onChangeHander}
					onClick={onClick}
				/>
			</div>
		</Container>
	);
}

export default forwardRef(DateInput);
