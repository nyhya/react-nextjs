import PcWrapper from 'components/common/PcWrapper';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.footer`
	width: 100%;
	border-top: 1px solid #eaebed;

	.footer-container {
		position: relative;
		/* background: url('/header/img-footer-logo.png') no-repeat left 30px/100px
			27px; */
		padding: 30px 0 30px 140px;

		img {
			position: absolute;
			left: 0;
			top: 30px;
			width: 100px;
			height: 27px;
		}
		h1 {
			font-size: 0;
		}

		.link {
			li {
				position: relative;
				display: inline-block;
				margin-right: 20px;
				height: 19px;
				a {
					position: relative;
					font-size: 13px;
					letter-spacing: -0.26px;
					text-align: left;
					color: ${props => props.theme.dpGrayDeep};
				}
				&::after {
					position: absolute;
					right: -10px;
					top: 5px;
					content: '';
					width: 1px;
					height: 12px;
					background-color: #ededed;
				}
			}
		}

		.info {
			position: relative;
			margin-top: 10px;
			li {
				display: inline-block;
				line-height: 17px;
				font-size: 12px;
				letter-spacing: -0.24px;
				text-align: left;
				color: #999;
				margin-right: 10px;
				&:last-child {
					position: absolute;
					right: 0;
					top: 0;
					font-size: 12px;
					font-weight: bold;
					letter-spacing: -0.24px;
					text-align: left;
					color: ${props => props.theme.dpblack};
				}
			}
		}
	}
`;

const footerList = [
	{
		name: '광고문의',
		to: '/company/adbiz',
	},
	{
		name: '이용약관',
		to: '/company/terms?menu=1',
	},
	{
		name: '개인정보처리방침',
		to: '/company/terms?menu=0',
	},
	{ name: '정책', to: '/company/policy' },
	{ name: '고객센터', to: '/company/cs?type=noti' },
	{ name: '사이트맵', to: '/company/sitemap' },
];

export default function PcFooter(): JSX.Element {
	return (
		<Container>
			<PcWrapper>
				<div className="footer-container">
					<img
						src={`${process.env.REACT_APP_PUBLIC_URL}/header/img-footer-logo.png`}
						alt="로고"
					/>
					<h1>
						<Link href="https://daum.net/">dddd</Link>
					</h1>
					<ul className="link">
						{footerList.map((item, key) => {
							const { to, name } = item;
							return (
								<li key={key}>
									<Link href={to}>{name}</Link>
								</li>
							);
						})}
					</ul>
					<ul className="info">
						<li>카카오</li>
						<li> Kakao Corp. All rights reserved.</li>
						<li> Kakao Corp. All rights reserved.</li>
						<li> Kakao Corp. All rights reserved.</li>
						<li> Kakao Corp. All rights reserved.</li>
						<li> Kakao Corp. All rights reserved.</li>
					</ul>
				</div>
			</PcWrapper>
		</Container>
	);
}

// {
/* <ul className="inner-ul">
    {menuList.map((menu, key) => {
        const { to, name } = menu;
        const isActive = pathname === to;
        return (
            <MenuItem key={key} isActive={isActive}>
                <Link href={to}>{name}</Link>
            </MenuItem>
        );
    })}
</ul> */
// }
