import type { AppProps } from 'next/app';
import Layout from 'components/layout/Layout';
import { wrapper } from 'store';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/globalTheme';
import GlobalStyle from '../styles/GlobalStyle';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
				<style jsx global>
					{`
						* {
							padding: 0;
							margin: 0;
							box-sizing: border-box;
						}

						html {
							-webkit-text-size-adjust: 100%;
							line-height: 1.15;
							width: 100%;
						}

						body {
							width: 100%;
							margin: 0;
							color: #222;
							font-size: 12px;
							font-family: 'Noto Sans KR', sans-serif;
						}

						main {
							display: block;
						}

						h1 {
							font-size: 2em;
							margin: 0;
						}

						hr {
							box-sizing: content-box;
							height: 0;
							overflow: visible;
						}

						pre {
							font-family: monospace, monospace;
							font-size: 1em;
						}

						a {
							background-color: transparent;
							text-decoration: none;
							color: inherit;
						}

						abbr[title] {
							border-bottom: none;
							text-decoration: underline;
							text-decoration: underline dotted;
						}

						b,
						strong {
							font-weight: bolder;
						}

						code,
						kbd,
						samp {
							font-family: monospace, monospace;
							font-size: 1em;
						}

						small {
							font-size: 80%;
						}

						sub,
						sup {
							font-size: 75%;
							line-height: 0;
							position: relative;
							vertical-align: baseline;
						}

						sub {
							bottom: -0.25em;
						}

						sup {
							top: -0.5em;
						}

						img {
							border-style: none;
						}

						button,
						input,
						optgroup,
						select,
						textarea {
							font-family: inherit;
							font-size: 100%;
							line-height: 1.15;
							margin: 0;
						}

						button,
						input {
							overflow: visible;
						}

						button,
						select {
							text-transform: none;
						}

						[type='button'],
						[type='reset'],
						[type='submit'],
						button {
							-webkit-appearance: button;
						}

						[type='button']::-moz-focus-inner,
						[type='reset']::-moz-focus-inner,
						[type='submit']::-moz-focus-inner,
						button::-moz-focus-inner {
							border-style: none;
							padding: 0;
						}

						[type='button']:-moz-focusring,
						[type='reset']:-moz-focusring,
						[type='submit']:-moz-focusring,
						button:-moz-focusring {
							outline: 1px dotted ButtonText;
						}

						fieldset {
							padding: 0.35em 0.75em 0.625em;
						}

						legend {
							box-sizing: border-box;
							color: inherit;
							display: table;
							max-width: 100%;
							padding: 0;
							white-space: normal;
						}

						progress {
							vertical-align: baseline;
						}

						textarea {
							overflow: auto;
						}

						[type='checkbox'],
						[type='radio'] {
							box-sizing: border-box;
							padding: 0;
						}

						[type='number']::-webkit-inner-spin-button,
						[type='number']::-webkit-outer-spin-button {
							height: auto;
						}

						[type='search'] {
							-webkit-appearance: textfield;
							outline-offset: -2px;
						}

						[type='search']::-webkit-search-decoration {
							-webkit-appearance: none;
						}

						::-webkit-file-upload-button {
							-webkit-appearance: button;
							font: inherit;
						}

						details {
							display: block;
						}

						summary {
							display: list-item;
						}

						[hidden],
						template {
							display: none;
						}

						li {
							list-style: none;
						}

						button {
							background: inherit;
							border: none;
							box-shadow: none;
							border-radius: 0;
							padding: 0;
							overflow: visible;
							cursor: pointer;
						}

						select {
							-webkit-appearance: none; /* 네이티브 외형 감추기 */
							-moz-appearance: none;
							appearance: none;
						}

						/* IE 10, 11의 네이티브 화살표 숨기기 */
						select::-ms-expand {
							display: none;
						}
					`}
				</style>
			</Hydrate>
		</QueryClientProvider>
	);
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
