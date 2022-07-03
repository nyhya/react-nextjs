import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import PcWrapper from 'components/common/PcWrapper';

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 54px;
	border-top: 1px solid ${props => props.theme.dpGrayLight};
	border-bottom: 1px solid ${props => props.theme.dpGrayLight};

	.inner-container {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
	}

	.util {
		position: relative;
		display: flex;
		li {
			position: relative;
			font-size: 14px;
			font-weight: 500;
			letter-spacing: -0.28px;
			line-height: 24px;
			padding-left: 29px;
			margin-right: 15px;

			&::after {
				position: absolute;
				left: 0;
				top: 0;
				content: '';
				width: 23px;
				height: 23px;
				border: 1px solid ${props => props.theme.borderColor};
				background: url('/ico/ico-cashmall.png') no-repeat center/14px auto;
				background-color: ${props => props.theme.dpWhite};
				border-radius: 50%;
			}
		}
	}
`;

const MenuItem = styled.li<{ isActive: boolean }>`
	float: left;
	padding: 0 30px;

	&:first-child {
		padding-left: 0;
	}

	a {
		position: relative;
		display: block;
		height: 52px;
		line-height: 52px;
		font-size: 16px;
		color: ${props => props.theme.dpblack};
		letter-spacing: -0.32px;
		font-weight: ${props => (props.isActive ? `bold` : `500`)};
		text-decoration: none;

		&:hover {
			color: ${props => props.theme.dpblue};

			&::after {
				background: ${props => props.theme.dpblue};
			}
		}

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: -1px;
			height: 2px;
			background: transparent;
			width: 100%;
		}
	}
`;

const menuList = [
	{
		name: '메인1',
		to: '/community',
	},
	{
		name: '클래스',
		to: '/class',
	},
	{
		name: '사전지식',
		to: '/business/consult',
	},
	{ name: '게시판', to: '/lease' },
	{ name: '중고거래', to: '/job' },
	{ name: '해피포인트', to: '/shopping' },
	{ name: '이벤트', to: '/event' },
];

export default function PcNavbar() {
	const route = useRouter();
	const { pathname } = route;
	return (
		<Container>
			<PcWrapper>
				<nav className="inner-container">
					<ul className="inner-ul">
						{menuList.map((menu, key) => {
							const { to, name } = menu;
							const isActive = pathname === to;
							return (
								<MenuItem key={key} isActive={isActive}>
									<Link href={to}>{name}</Link>
								</MenuItem>
							);
						})}
					</ul>
					<ul className="util">
						<li>캐시몰</li>
						<li>마이페이지</li>
					</ul>
				</nav>
			</PcWrapper>
		</Container>
	);
}
