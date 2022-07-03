import React from 'react';
import styled from 'styled-components';
import PcWrapper from 'components/common/PcWrapper';
import Link from 'next/link';
// import { REACT_APP_PUBLIC_URL } from '@env';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	padding: 20px;

	.inner-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;

		.left-ad {
			position: absolute;
			left: 0;
			top: 0;
			width: 234px;
			height: 60px;
			img {
				width: 100%;
				height: auto;
			}
		}

		h1 {
			.logo {
				position: relative;
				width: 145px;
				height: 60px;
				cursor: pointer;

				img {
					position: absolute;
					max-width: 100%;
					max-height: 100%;
					width: auto;
					height: auto;
					margin: auto;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				}
			}
		}
	}
`;

export default function PcHeader() {
	return (
		<Container>
			<PcWrapper>
				<div className="inner-container">
					<div className="left-ad">
						<img
							src={`${process.env.REACT_APP_PUBLIC_URL}/header/img-header-left-ad.jpg`}
							alt="광고이미지"
						/>
					</div>
					<h1>
						<Link href="">
							<div className="logo">
								<img
									src={`${process.env.REACT_APP_PUBLIC_URL}/header/img-logo.png`}
									alt="로고"
								/>
							</div>
						</Link>
					</h1>
				</div>
			</PcWrapper>
		</Container>
	);
}
