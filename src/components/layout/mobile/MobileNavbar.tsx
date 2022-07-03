import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 52px;
	padding: 0 12px;
	border-bottom: 1px solid #eee h1 {
		font-size: 21px;
	}
`;

export default function MobileNavbar() {
	return <Container>Navbar</Container>;
}
