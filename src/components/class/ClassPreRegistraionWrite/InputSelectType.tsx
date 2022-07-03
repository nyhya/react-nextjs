import SelectBox from 'components/ui/SelectBox';
import React from 'react';
import styled from 'styled-components';
import { SelectBoxDesignType } from 'types/ComponentType';

const Container = styled.div<{ topLine: boolean; require: boolean }>`
	width: 100%;
	display: table;
	border-top: ${props => (props.topLine ? '1px solid #000' : 'none')};

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
		padding-left: 20px;
		padding: 12px 12px 12px 20px;

		input {
			width: 100%;
			height: 34px;
			border-radius: 4px;
			border: solid 1px ${props => props.theme.borderColor};
			padding: 10px;
		}

		.warning-massage {
			display: ${props => (props.require ? 'inline-block' : 'none')};
			font-size: 13px;
			line-height: 19px;
			letter-spacing: -0.26px;
			color: #f00;
			margin-top: 5px;
		}
	}

	/* IE */
	select::-ms-expand {
		display: none;
	}
	.select {
		-o-appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}
`;

interface IInputSelectProps {
	id: string;
	name: string;
	title: string;
	require?: boolean;
	registerName: string;
	topLine?: boolean;
	option: Array<{ value: string; label: string }>;
}

function InputSelectType(props: IInputSelectProps): JSX.Element {
	const { id, name, title, require, registerName, topLine, option } = props;

	const onSelectHandler = (selected: string | number) => {
		console.log(selected);
	};
	return (
		<Container topLine={topLine || false} require={require || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<SelectBox
					type={SelectBoxDesignType.NORMAL}
					label="대회"
					options={option}
					selectHandler={onSelectHandler}
				/>
				<p className="warning-massage">{title}명을 입력해주세요.</p>
			</div>
		</Container>
	);
}

export default React.memo(InputSelectType);

InputSelectType.defaultProps = {
	topLine: false,
	require: false,
};
