import styled from 'styled-components';

function Icon({ name }) {
	switch (name) {
		case 'myPage':
			return <MyPageIcon />;
		case 'cashmall':
			return <CashMallIcon />;
		case 'login':
			return <LoginIcon />;
		case 'ic_right':
			return <LoginIcon />;
		case 'editor-image':
			return <EditorImage />;
		case 'editor-video':
			return <EditorVideo />;
		default:
			return null;
	}
}

export default Icon;

const Wrapper = styled.i`
	font-style: normal;

	& {
		svg,
		img {
			display: inline-block;
			vertical-align: middle;
		}
	}

	&.bottom {
		svg,
		img {
			display: inline-block;
			vertical-align: bottom;
		}
	}
`;

function MyPageIcon() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
			>
				<g id="ic_mp_person" transform="translate(-1412 -199)">
					<g id="person-outline" transform="translate(1412 199)">
						<g id="person-outline-2" data-name="person-outline">
							<g id="person">
								<path
									id="패스_822"
									data-name="패스 822"
									className="cls-2"
									d="M10.654 8.309A2.654 2.654 0 1 0 8 5.654a2.654 2.654 0 0 0 2.654 2.655zm0-3.981a1.327 1.327 0 1 1-1.327 1.326 1.327 1.327 0 0 1 1.327-1.327z"
									transform="translate(-2.691 -1.009)"
									fill="#202020"
								/>
								<path
									id="패스_823"
									data-name="패스 823"
									className="cls-2"
									d="M9.645 13A4.645 4.645 0 0 0 5 17.645a.664.664 0 1 0 1.327 0 3.318 3.318 0 0 1 6.636 0 .664.664 0 1 0 1.327 0A4.645 4.645 0 0 0 9.645 13z"
									fill="#202020"
									transform="translate(-1.682 -4.374)"
								/>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</Wrapper>
	);
}

function CashMallIcon() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 14 14"
			>
				<g id="img_ic_cashmall" transform="translate(-95 -120)">
					<path
						id="사각형_1608"
						data-name="사각형 1608"
						transform="translate(95 120)"
						fill="none"
						d="M0 0h14v14H0z"
					/>
					<g
						id="Icon_feather-shopping-bag"
						data-name="Icon feather-shopping-bag"
						transform="translate(96.167 120.389)"
					>
						<path
							id="패스_959"
							data-name="패스 959"
							className="cls-2"
							fill="#202020"
							d="M5.333 1.5h7a.583.583 0 0 1 .467.233l1.75 2.333a.583.583 0 0 1 .117.35v8.167a1.752 1.752 0 0 1-1.75 1.75H4.75A1.752 1.752 0 0 1 3 12.583V4.417a.583.583 0 0 1 .117-.35l1.75-2.333a.583.583 0 0 1 .466-.234zm6.708 1.167H5.625L4.167 4.611v7.972a.584.584 0 0 0 .583.583h8.167a.584.584 0 0 0 .583-.583V4.611z"
							transform="translate(-3 -1.5)"
						/>
						<path
							id="패스_960"
							data-name="패스 960"
							className="cls-2"
							d="M14.083 8.667h-10.5a.583.583 0 0 1 0-1.167h10.5a.583.583 0 1 1 0 1.167z"
							fill="#202020"
							transform="translate(-3 -5.167)"
						/>
						<path
							id="패스_961"
							data-name="패스 961"
							className="cls-2"
							fill="#202020"
							d="M13.417 17a2.92 2.92 0 0 1-2.917-2.917.583.583 0 0 1 1.167 0 1.75 1.75 0 1 0 3.5 0 .583.583 0 0 1 1.167 0A2.92 2.92 0 0 1 13.417 17z"
							transform="translate(-7.583 -8.833)"
						/>
					</g>
				</g>
			</svg>
		</Wrapper>
	);
}

function LoginIcon() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
			>
				<g id="log-in" transform="translate(9 9)">
					<g id="log-in-2" data-name="log-in" transform="translate(-9 -9)">
						<g id="log-in-3" data-name="log-in">
							<path
								id="패스_1016"
								data-name="패스 1016"
								className="cls-2"
								fill="#202020"
								d="M18 4h-1.333a.667.667 0 0 0 0 1.333h.667v8h-.667a.667.667 0 0 0 0 1.333H18a.667.667 0 0 0 .667-.666V4.667A.667.667 0 0 0 18 4z"
								transform="translate(-5.333 -1.333)"
							/>
							<path
								id="패스_1017"
								data-name="패스 1017"
								className="cls-2"
								fill="#202020"
								d="M8.867 7.267a.667.667 0 1 0-1.067.8l1.2 1.6H3.667a.667.667 0 0 0 0 1.333H9.06l-1.147 1.627A.667.667 0 0 0 9 13.4l1.88-2.667a.667.667 0 0 0 0-.787z"
								transform="translate(-1 -2.333)"
							/>
						</g>
					</g>
				</g>
			</svg>
		</Wrapper>
	);
}

function EditorImage() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 18 18"
			>
				<g id="ic_image" transform="translate(-2577.823 -1616.992)">
					<path
						id="사각형_2242"
						data-name="사각형 2242"
						transform="translate(2577.823 1616.992)"
						fill="none"
						d="M0 0h18v18H0z"
					/>
					<g
						id="그룹_2473"
						data-name="그룹 2473"
						transform="translate(-86.551 -26.816)"
					>
						<circle
							id="타원_115"
							data-name="타원 115"
							fill="#040405"
							cx="1.263"
							cy="1.263"
							r="1.263"
							transform="translate(2668.884 1648.845)"
						/>
						<path
							id="패스_1118"
							data-name="패스 1118"
							fill="#040405"
							d="M2678.427 1644.808h-10.1a2.95 2.95 0 0 0-2.947 2.947v10.101a2.95 2.95 0 0 0 2.947 2.947h10.1a2.95 2.95 0 0 0 2.947-2.947v-10.1a2.95 2.95 0 0 0-2.947-2.948zm2.1 12.942a2.107 2.107 0 0 1-2.1 2.1h-10.1a2.105 2.105 0 0 1-2.072-1.8c.043-.043.088-.086.135-.125l7.823-6.395a2.107 2.107 0 0 1 2.963.3l3.359 4.11zm.009-3.125-2.717-3.323a2.947 2.947 0 0 0-4.146-.417l-7.45 6.091v-9.221a2.107 2.107 0 0 1 2.1-2.1h10.1a2.107 2.107 0 0 1 2.105 2.1z"
						/>
					</g>
				</g>
			</svg>
		</Wrapper>
	);
}

function EditorVideo() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 18 18"
			>
				<g id="ic_video" transform="translate(-2593.823 -1617.008)">
					<path
						id="사각형_2243"
						data-name="사각형 2243"
						transform="translate(2593.823 1617.008)"
						fill="none"
						d="M0 0h18v18H0z"
					/>
					<g
						id="그룹_2472"
						data-name="그룹 2472"
						transform="translate(205.683 -106.145)"
					>
						<path
							id="패스_1115"
							data-name="패스 1115"
							fill="#181818"
							d="M2397.141 1740.153a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm0-15.06a7.06 7.06 0 1 0 7.06 7.06 7.067 7.067 0 0 0-7.06-7.06z"
						/>
						<path
							id="패스_1093"
							data-name="패스 1093"
							fill="#181818"
							d="M2395.555 1727.795a.833.833 0 0 0-1.366.64v4.775a.832.832 0 0 0 1.366.64l2.865-2.387a.825.825 0 0 0 .106-.1.833.833 0 0 0-.106-1.174z"
							transform="translate(1.41 1.33)"
						/>
					</g>
				</g>
			</svg>
		</Wrapper>
	);
}

function RightIcon() {
	return (
		<Wrapper>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="30"
				viewBox="0 0 16 30"
			>
				<path style={{ fill: 'none' }} d="M0 0h16v30H0z" />
				<path
					d="m-97.239 2449.475 12.9-12.872-13.093-13.093 1.155-1.173 14.066 14.045-.01.007.2.2-14.017 14.057zm3.442-13.093z"
					transform="translate(97.431 -2421.399)"
					style={{ fill: '#089feb' }}
				/>
			</svg>
		</Wrapper>
	);
}
