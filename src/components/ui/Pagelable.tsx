/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Box = styled.div`
	margin-top: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 70px;
`;

const PageButton = styled.button<{
	isSelected: boolean;
}>`
	height: 24px;
	padding: 0 15px;
	font-family: ${props => props.theme.NotoSans};
	font-size: 16px;
	font-weight: 300;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: -0.32px;
	text-align: center;
	color: ${props => props.theme.dpblack};
	background: transparent;

	${props =>
		props.isSelected &&
		css`
			color: ${props => props.theme.dpblue};
			font-weight: bold;
		`}

	&:hover {
		color: ${props => props.theme.dpBlue};
		font-weight: bold;
	}
`;

const ArrowButton = styled.button<{
	isDiabled: boolean;
	state: string;
}>`
	display: inline-block;
	width: 30px;
	height: 30px;
	padding: 8px;
	border: solid 1px #b7b7b7;

	${props =>
		props.isDiabled &&
		css`
			pointer-events: none;
			cursor: unset;
			opacity: 0.4;
		`}

	${props => {
		switch (props.state) {
			case 'prevMore':
				return css`
					margin-right: 5px;
					background: url('/ico/btn-first-pagenation.png') center no-repeat;
				`;
			case 'prev':
				return css`
					margin-right: 5px;
					background: url('/ico/btn-prev-pagenation.png') center no-repeat;
				`;
			case 'next':
				return css`
					margin-left: 5px;
					background: url('/ico/btn-next-pagenation.png') center no-repeat;
				`;
			case 'nextMore':
				return css`
					margin-left: 5px;
					background: url('/ico/btn-last-pagenation.png') center no-repeat;
				`;
			default:
				break;
		}
	}};
	background-size: 14px;
`;

interface IPropsPagination {
	limit: number;
	selectPage: number;
	pageSclae: number;
	totalPage?: number;
	onSelect: (selected: number) => void;
}

function Pagelable(props: IPropsPagination) {
	const { limit, selectPage, pageSclae, totalPage, onSelect } = props;
	const offset = Math.floor((selectPage - 1) / limit) * 10 + 1;
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (totalPage) {
			setTotal(totalPage / pageSclae + 1);
		}
	}, [selectPage, totalPage, pageSclae]);

	const paginationComp = [];

	for (let num = offset; num <= total && num < offset + limit; num++) {
		paginationComp.push(
			<PageButton
				key={num}
				isSelected={num === selectPage}
				onClick={() => onSelect(num)}
			>
				{num}
			</PageButton>,
		);
	}

	return (
		<Box>
			<ArrowButton
				state="prevMore"
				onClick={() => onSelect(offset - 1)}
				isDiabled={offset < limit}
			/>
			<ArrowButton
				state="prev"
				isDiabled={selectPage <= 1}
				onClick={() => onSelect(selectPage - 1)}
			/>
			{paginationComp}
			<ArrowButton
				state="next"
				onClick={() => onSelect(selectPage + 1)}
				isDiabled={selectPage >= total}
			/>

			<ArrowButton
				state="nextMore"
				onClick={() => onSelect(offset + limit)}
				isDiabled={offset + limit > total}
			/>
		</Box>
	);
}

Pagelable.defaultProps = {
	totalPage: 1,
};

export default React.memo(Pagelable);
