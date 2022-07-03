import CalenderSingle from 'components/ui/CalenderSingle';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import ko from 'date-fns/locale/ko';

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
		position: relative;
		height: 60px;
		vertical-align: middle;
		display: table-cell;
		box-shadow: inset 0px -1px 0px 0px ${props => props.theme.borderColor};
		padding-left: 20px;
		z-index: 9999;

		.warning-massage {
			display: ${props => (props.require ? 'inline-block' : 'none')};
			font-size: 13px;
			line-height: 19px;
			letter-spacing: -0.26px;
			color: #f00;
			margin-top: 5px;
			padding-left: 10px;
		}
	}
	.react-datepicker-wrapper {
		display: inline-block;
	}

	.react-datepicker__input-container input {
		width: 160px;
		height: 34px;
		border-radius: 4px;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0px;
		border: solid 1px ${props => props.theme.borderColor};
		background: url('/ico/ico-calender.png') no-repeat 7px center/22px 22px;
		padding: 10px 10px 10px 33px;
		::placeholder {
			font-size: 14px;
			line-height: 20px;
			letter-spacing: -0.28px;
			color: ${props => props.theme.borderColor};
		}
	}

	.react-datepicker {
		position: relative;
		padding: 30px 0px;
		border: 0px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
		cursor: default;
	}

	.react-datepicker-popper[data-placement^='bottom'] {
		margin-top: 24px;
	}

	.react-datepicker__triangle {
		display: none;
	}

	.react-datepicker__month-container {
		padding: 0 27px;
	}

	.react-datepicker__header {
		font-size: 16px;
		font-weight: 600;
		border: 0;
		background-color: white;
	}

	.react-datepicker__navigation--previous {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 28px;
		left: 70px;
		border: 0;
		background: url('/ico/btn-first-pagenation.png') no-repeat center center/9px
			15px;

		span {
			display: none;
		}
	}

	.react-datepicker__navigation--next {
		position: absolute;
		width: 24px;
		height: 24px;
		top: 28px;
		right: 70px;
		border: 0;
		background: url('/ico/btn-first-pagenation.png') no-repeat center center/9px
			15px;

		span {
			display: none;
		}
	}

	.react-datepicker__current-month {
		font-size: 16px;
		text-align: center;
		font-weight: 600;
	}

	.react-datepicker__day-names {
		display: flex;
		margin-top: 9px;
	}

	.react-datepicker__day-name {
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		font-size: 14px;
		font-weight: bold;
		-webkit-letter-spacing: -0.28px;
		-moz-letter-spacing: -0.28px;
		-ms-letter-spacing: -0.28px;
		letter-spacing: -0.28px;
		text-align: center;
		margin: 3px 0px;
		line-height: 32px;
	}

	.react-datepicker__month {
		margin: 0;
	}

	.react-datepicker__day {
		width: 32px;
		height: 32px;
		font-size: 14px;
		font-weight: bold;
		letter-spacing: -0.28px;
		text-align: center;
		margin: 3px 0px;
		line-height: 32px;

		&:hover {
			font-size: 14px;
			font-weight: bold;
			letter-spacing: -0.28px;
			text-align: center;
			color: ${props => props.theme.dpblue};
			background-color: transparent;
		}
	}

	.react-datepicker__day-in-range {
		background-color: #000;
	}

	.react-datepicker__day--in-selecting-range {
		background-color: blue;
	}

	.react-datepicker__day--seledcted {
		background-color: aliceblue;
		color: wheat;
		border-radius: 50%;
	}
	.react-datepicker__day--range-start {
		background-color: ${props => props.theme.dpblue};
		color: bisque;
		border-radius: 50%;
	}

	.react-datepicker__day-range-end {
		background-color: azure;
		color: bisque;
		border-radius: 50%;
	}

	.react-datepicker__day--disabled {
		color: blueviolet;
		cursor: no-drop;
		&:hover {
			border: 0;
		}
	}

	& .react-datepicker__day--selected,
	& .react-datepicker__day--selecting-range-start,
	& .react-datepicker__day--range-start,
	& .react-datepicker__day--range-end,
	& .react-datepicker__day--selecting-range-end {
		position: relative;
		color: #fff !important;
		z-index: 100;
		background: none;

		&:before {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			background: ${props => props.theme.dpLightBlue};
			border-radius: 100% !important;
			background-color: ${props => props.theme.dpblue};
		}
	}

	& .react-datepicker__day--selecting-range-start,
	& .react-datepicker__day--range-start {
		background: linear-gradient(
			to right,
			transparent 0,
			transparent 50%,
			${props => props.theme.dpLightBlue} 50%,
			${props => props.theme.dpLightBlue} 100%
		) !important;
	}

	& .react-datepicker__day--selecting-range-end,
	& .react-datepicker__day--range-end {
		background: linear-gradient(
			to left,
			transparent 0,
			transparent 50%,
			${props => props.theme.dpLightBlue} 50%,
			${props => props.theme.dpLightBlue} 100%
		) !important;
	}

	& .react-datepicker__day--in-selecting-range,
	& .react-datepicker__day--in-range {
		margin: 0;
		background-color: ${props => props.theme.dpLightBlue};
		border-radius: 0;
		color: ${props => props.theme.dpblack};
	}

	& .react-datepicker__day-name {
		&:first-child {
			color: #fd7b57;
		}
	}

	& .react-datepicker__day--weekend {
		&:first-child {
			color: #fd7b57;
		}
	}

	& .react-datepicker__week {
		height: 32px;
		display: flex;
	}
`;

interface IInputProps {
	title: string;
	require?: boolean;
	topLine?: boolean;
	change: (date: string) => void;
}

/**
 * @function InnerInput
 * @description INPUT TEXT TYPE
 */
function InputTextType(props: IInputProps) {
	const { title, require, topLine, change } = props;
	const [date, setDate] = useState(null);

	const onChangeDate = (date: any) => {
		setDate(date);
		if (date) {
			change(date);
		}
	};

	return (
		<Container topLine={topLine || false} require={require || false}>
			<div className="title">
				{title}
				<span className="require">&nbsp;*</span>
			</div>
			<div className="input-text">
				<DatePicker
					placeholderText="날짜"
					dateFormat="yyyy-MM-dd"
					selected={date ? new Date(date) : null}
					startDate={date}
					onChange={onChangeDate}
					disabledKeyboardNavigation
					showPopperArrow={false}
					locale={ko}
					shouldCloseOnSelect={false}
				/>
				<p className="warning-massage">{title}를 입력해주세요.</p>
			</div>
		</Container>
	);
}

export default React.memo(InputTextType);

InputTextType.defaultProps = {
	topLine: false,
	require: false,
};
