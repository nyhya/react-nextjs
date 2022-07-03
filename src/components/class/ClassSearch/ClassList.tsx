import Link from 'next/link';
import styled, { css } from 'styled-components';
import { IClassListItem } from 'types/\bclass';
import ListItem from './ListItem';
import ListThumb from './ListThumb';

const Container = styled.div<{ type: string }>`
	padding-top: 25px;
	ul > * {
		margin-right: 20px;
		${props => {
			switch (props.type) {
				case 'thumb':
					return css`
						&:nth-child(5n) {
							margin-right: 0px;
						}
					`;
					break;
				case 'normal':
					return css`
						&:nth-child(2n) {
							margin-right: 0px;
						}
					`;
					break;
				default:
					break;
			}
		}}
	}
`;

interface IProps {
	type: string;
	list?: Array<IClassListItem>;
}

export default function ClassList(props: IProps): JSX.Element {
	const { list, type } = props;
	return (
		<Container type={type}>
			<ul>
				{list &&
					list.map((item, key) => {
						return type === 'thumb' ? (
							<Link href={`/class/detailView/${item.bid}`} key={key}>
								<a>
									<ListThumb item={item} />
								</a>
							</Link>
						) : (
							<Link href={`/class/detailView/${item.bid}`} key={key}>
								<a>
									<ListItem item={item} />
								</a>
							</Link>
						);
					})}
			</ul>
		</Container>
	);
}

ClassList.defaultProps = {
	list: [
		{
			bid: 11397,
			nCnt: 22,
			title: 'John test',
			plazaFg: '1',
			eventFromDt: '2022-05-20',
			eventFromHh: '00',
			eventFromMm: '00',
			eventFromDay: 6,
			eventToDt: '2022-05-31',
			eventToHh: '00',
			eventToMm: '00',
			eventToDay: 3,
			eventAddrSido: null,
			eventAddr1: null,
			hostName: 'www.naver.com',
			preRegCloseDt: null,
			classState: null,
			homepage: null,
			adViewYn: 'Y',
			gradePoint: null,
			onLineYn: null,
			gradeYn: null,
			adminYn: null,
			closeState: null,
			preRegisterYn: 'Y',
			speakerName1: '',
			speakerName2: '',
			speakerName3: '',
			speakerBelong1: '',
			speakerBelong2: '',
			speakerBelong3: '',
			insertDt: '2022-05-18T09:41:36',
			uploadfile1: 'aws.png',
			uploadfile2: null,
			uploadfile1Stored:
				'http://10.200.16.114:8888/download/A004/42/202205/ebbe3ebc8e584dc19ae77ffacec06ea8.png',
			uploadfile2Stored: null,
			fileIdx1: null,
			fileIdx2: null,
			eventConnectType: null,
			preRegClosed: true,
		},
	],
};
