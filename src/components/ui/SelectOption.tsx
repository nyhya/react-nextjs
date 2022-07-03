import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

interface IProps {
	options: Array<{ text: string; value: number }>;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	value?: string;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	width?: string;
}

const Container = styled.select`
	width: 160px;
	height: 34px;

	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: -0.28px;
	text-align: left;
	color: ${props => props.theme.dpGrayDeep};

	border-radius: 4px;
	/* 네이티브 화살표 대체 */
	/* background: #fff url('/components/ui/ico-select-option.png') no-repeat center
		right 10px; */
	padding-left: 10px;
	background-size: 10px 10px;

	&:focus {
		outline: none;
	}

	&:focus {
		outline: none;
	}

	& > option {
		border: none;
		outline: none;
	}
`;

function SelectOption(props: IProps): JSX.Element {
	const { options, onChange, value, name, disabled, required, width } = props;

	return (
		<Container
			// style={{ width: width || 'auto' }}
			id={name}
			name={name}
			onChange={onChange || null}
			required={required}
			defaultValue={value || ''}
			disabled={disabled}
		>
			{options.map((option, key) => {
				return (
					<option key={key} value={option.value}>
						{option.text}
					</option>
				);
			})}
		</Container>
	);
}

// SelectOption.propTypes = {
// 	value: PropTypes.string,
// 	name: PropTypes.string,
// 	disabled: PropTypes.boolean,
// 	required: PropTypes.boolean,
// 	width: PropTypes.string,
// };

SelectOption.defaultProps = {
	value: 'nyh',
	name: 'nyh',
	disabled: false,
	required: false,
	width: '120px',
};

export default React.memo(SelectOption);
