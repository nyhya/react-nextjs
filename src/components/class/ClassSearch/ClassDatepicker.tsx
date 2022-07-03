import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useRef, useState } from 'react';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import DateInput from './DateInput';

const Container = styled.div`
	width: 200px;
	height: 100%;
	overflow: hidden;

	.react-datepicker {
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
		top: 30px;
		left: 27px;
		border: 0;
		background: url('/datepicker/ico-datepicker-arrow.png') no-repeat center
			center/9px 15px;
	}

	.react-datepicker__navigation--next {
		top: 30px;
		right: 27px;
		border: 0;
		background-image: url('/datepicker/ico-datepicker-arrow.png') no-repeat
			center center/9px 15px;
	}

	.react-datepicker__current-month {
		font-size: 16px;
		font-weight: 600;
	}

	.react-datepicker__day-names {
		margin-top: 9px;
	}

	.react-datepicker__day-name {
		font-size: 14px;
		font-weight: bold;
		letter-spacing: -0.28px;
		text-align: center;
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
		/* width: 28px;
        height: 28px;
        margin: 0; */
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

interface IProps {
	onSelectDate: (start: string, end: string) => void;
	reset: boolean;
	onReset: () => void;
}

export default function ClassDatePicker(props: IProps): JSX.Element {
	const { onSelectDate, reset, onReset } = props;
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [selectsRange, setselectsRange] = useState(true);

	useEffect(() => {
		if (reset) {
			setStartDate(null);
			setEndDate(null);
			onReset();
		}
	}, [reset]);

	const inputRef = useRef(null);

	const onChange = (date: any) => {
		if (selectsRange) {
			const [start, end] = date;
			setStartDate(start);
			setEndDate(end);
			const startDay = dayjs(start).format('YYYY-MM-DD');
			const endDay = dayjs(end).format('YYYY-MM-DD');

			if (start && end) {
				onSelectDate(startDay, endDay);
			}
		}
	};

	return (
		<Container>
			<DatePicker
				dateFormat="yyyy.MM.dd"
				selected={startDate ? new Date(startDate) : null}
				startDate={startDate}
				endDate={endDate}
				// showPreviousMonths
				onChange={onChange}
				disabledKeyboardNavigation
				monthsShown={2}
				showPopperArrow={false}
				locale={ko}
				shouldCloseOnSelect={false}
				selectsRange
				customInput={<DateInput label="기간" inputRef={inputRef} />}
			/>
		</Container>
	);
}
