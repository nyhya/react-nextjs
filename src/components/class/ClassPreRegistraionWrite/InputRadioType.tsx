import RadioGroup from 'components/ui/RadioGroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div<{ topLine: boolean }>`
	position: relative;
	width: 100%;
	display: table;
	border-top: ${props => (props.topLine ? '1px solid #000' : 'none')};

	.col1 {
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
		padding-left: 20px;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		span {
			height: 14px;
			display: inline-block;
			padding-left: 1px;
			vertical-align: sub;
			color: #fd7b57;
		}
	}

	.col2 {
		height: 60px;
		vertical-align: middle;
		display: table-cell;
		padding-left: 20px;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
	}
`;

interface IInputRadioProps {
	id: string;
	name: string;
	title: string;
	registerName: string;
	require?: boolean;
	topLine?: boolean;
	onChangeHandler: (select: string) => void;
	option: Array<{ value: string; label: string }>;
}

/**
 * @function InnerRadio
 * @description INPUT RADIO TYPE
 */
function InputRadioType(props: IInputRadioProps) {
	const {
		id,
		name,
		title,
		registerName,
		require,
		onChangeHandler,
		topLine,
		option,
	} = props;
	const methods = useFormContext();

	const change = (select: string) => {
		onChangeHandler(select);
	};

	return (
		<Container topLine={topLine || false}>
			<div className="col1 top-line">
				광고유형<span>&nbsp;*</span>
			</div>
			<div className="col2 top-line">
				<RadioGroup
					id={id}
					name={name}
					option={option}
					selected={0}
					change={change}
					registerName={registerName}
				/>
			</div>
		</Container>
	);
}

export default React.memo(InputRadioType);

InputRadioType.defaultProps = {
	topLine: false,
	require: false,
};
