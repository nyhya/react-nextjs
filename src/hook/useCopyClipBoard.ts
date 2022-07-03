import { useState } from 'react';

type onCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
	onCopyFn,
] {
	const [isCopy, setIsCopy] = useState<boolean>(false);

	const onCopy: onCopyFn = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopy(true);
			return true;
		} catch (e) {
			console.error(e);
			setIsCopy(false);
			return false;
		}
	};
	return [isCopy, setIsCopy, onCopy];
}

export default useCopyClipBoard;
