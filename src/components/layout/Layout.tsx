import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import ScrapModal from 'components/common/popup/ScrapModal';
import Alert from 'components/common/popup/Alert';
import PcNavbar from './pc/PcNavbar';
import PcHeader from './pc/PcHeader';
import PcFooter from './pc/PcFooter';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

type AppLayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: AppLayoutProps) {
	if (!isMobile) {
		return (
			<Container>
				<Alert />
				<ScrapModal />
				<PcHeader />
				<PcNavbar />
				{children}
				<PcFooter />
			</Container>
		);
	}
	return <Container>{children}</Container>;
}
