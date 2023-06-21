import { CKEditor } from 'ckeditor4-react';
import "./styles.scss";
import { useEffect } from 'react';

type TProps = {
	initData?: string;
	onChange?: (v: string) => void;
}

const RichTextEditor = ({ initData = "", onChange = () => { } }: TProps) => {

	const content: string | undefined = initData

	const handleChangeContent = ({ editor }: any) => {
		onChange(editor.getData());
	}
	const defaultColor = "#00b96b"

	return (
		<div className='text-editor'>
			<CKEditor
				config={{ delayIfDetached: true}}
				initData={content}
				// config={{
				// 	extraPlugins: 'easyimage',
				// 	removePlugins: 'image',
				// 	// cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
				// 	// cloudServices_tokenUrl:
				// 	// 	'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
				// }}
				onChange={handleChangeContent}
				onInstanceReady={(e) => e.editor.container.setAttribute('style', `--color: ${defaultColor}`)}
			/>
		</div>
	);
}

export default RichTextEditor;