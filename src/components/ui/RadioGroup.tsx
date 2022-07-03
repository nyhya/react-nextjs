import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ISelectType } from 'types/ComponentType';

const Container = styled.div`
	width: 100%;

	ul {
		display: flex;
		flex-direction: row;
	}
`;

const RadioItem = styled.li`
	position: relative;
	display: flex;
	align-items: center;
	margin-right: 20px;

	label {
		padding-right: 5px;
	}

	input[type='radio'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: 0;
		box-shadow: none;
		border: none;
	}

	input[type='radio'] + label:hover {
	}

	input[type='radio']:before {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		background: #fff;
		border: 1px solid ${props => props.theme.borderColor};
		border-radius: 50%;
	}

	input[type='radio']:after {
		content: '';
		display: inline-block;
		width: 15px;
		height: 15px;
		margin-left: 3px;
		border-radius: 100%;
		vertical-align: middle;
		cursor: pointer;
	}

	label input[type='radio']:after {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 4px;
		margin: auto 0;
		width: 12px;
		height: 12px;
		content: '';
		display: inline-block;
		vertical-align: middle;
		line-height: 18px;
		text-align: center;
		background: ${props => props.theme.borderColor};
		border-radius: 50%;
	}

	label input[type='radio']:checked:after {
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		left: 4px;
		margin: auto 0;
		width: 12px;
		height: 12px;
		background: ${props => props.theme.dpBlue};
		border-radius: 50%;
	}

	p {
		height: 20px;
		align-items: center;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: -0.28px;
		color: ${props => props.theme.dpBlack};
	}
`;

interface IProps {
	option: Array<ISelectType>;
	id: string;
	name: string;
	selected?: number;
	disable?: boolean;
	change: (select: string) => void;
	registerName?: string;
}

function RadioGroup(props: IProps): JSX.Element {
	const { option, id, name, change, selected, disable, registerName } = props;
	const [active, setActive] = useState(selected);
	const methods = useFormContext();

	const onChangeHandler = (selected: number) => {
		setActive(selected);
		change(option[selected].value as string);
	};
	return (
		<Container>
			<ul>
				{option.map((item, idx) => (
					<RadioItem key={idx}>
						<label htmlFor={id}>
							<input
								{...methods.register(`${registerName}`)}
								type="radio"
								id={id}
								name={name}
								disabled={disable}
								checked={active === idx}
								value={item.value}
								onChange={() => onChangeHandler(idx)}
							/>
						</label>
						<p>{item.label}</p>
					</RadioItem>
				))}
			</ul>
		</Container>
	);
}

export default React.memo(RadioGroup);

RadioGroup.defaultProps = {
	selected: 0,
	disable: false,
	registerName: 'undifined',
};
