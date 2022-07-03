import styled from 'styled-components';

const InnerContents = styled.div`
	width: 1080px;
	min-width: 1080px;
	margin: 0 auto;
`;

type AppLayoutProps = {
	children: React.ReactNode;
};

function PcWrapper({ children }: AppLayoutProps) {
	return <InnerContents>{children}</InnerContents>;
}

export default PcWrapper;
