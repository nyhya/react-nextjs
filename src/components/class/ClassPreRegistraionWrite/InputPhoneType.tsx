import SelectBox from 'components/ui/SelectBox';
import React from 'react';
import styled from 'styled-components';
import { SelectBoxDesignType } from 'types/ComponentType';

const Container = styled.div`
	width: 100%;
	.title {
		display: table-cell;
		width: 150px;
		height: 59px;
		vertical-align: middle;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: -0.28px;
		text-align: left;
		color: ${props => props.theme.dpBlack};
		background-color: ${props => props.theme.white};
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		padding-left: 20px;

		.require {
			height: 14px;
			display: inline-block;
			padding-left: 1px;
			vertical-align: sub;
			color: #fd7b57;
		}
	}

	.input-text {
		height: 60px;
		vertical-align: middle;
		display: table-cell;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		padding: 12px 12px 12px 20px;
		.box {
			display: flex;
			flex-direction: row;
			align-items: center;

			input {
				width: 110px;
				height: 34px;
				border-radius: 4px;
				border: solid 1px ${props => props.theme.borderColor};
			}
		}
	}
`;

interface IProps {
	title: string;
	registerName1: string;
	registerName2: string;
	require?: boolean;
	topLine?: boolean;
	placeholder?: string;
}

const eventTypeOptions = [
	{ value: 'online', label: '온라인' },
	{ value: 'offline', label: '오프라인' },
];

function InputPhoneType(props: IProps): JSX.Element {
	const { title, registerName1, registerName2, require, topLine, placeholder } =
		props;

	const onSelectHandler = (selected: string | number) => {
		console.log(selected);
	};
	return (
		<Container>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<div className="box">
					<SelectBox
						type={SelectBoxDesignType.NORMAL}
						label="02"
						options={eventTypeOptions}
						selectHandler={onSelectHandler}
					/>
					<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
					<input type="text" />
					<span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
					<input type="text" />
				</div>
			</div>
		</Container>
	);
}

InputPhoneType.defaultProps = {
	require: false,
	topLine: false,
	placeholder: '',
};

export default React.memo(InputPhoneType);
