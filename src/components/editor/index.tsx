import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type TProps = {
	initData?: string;
	onChange?: (v: string) => void;
}

const RichTextEditor = ({ initData = "", onChange = () => { } }: TProps) => {

	const content: string | undefined = initData || "<p>This is the initial content of the editor.</p>"
	const editorRef: any = useRef(null);

	const handleChangeContent = (a: string, editor: Editor) => {
		onChange(a)

	}
	// const defaultColor = "#00b96b"

	return (
		<div className='text-editor'>
			<Editor
				apiKey='knuqb65bx38da7iidlz3t8u10dpqty9jvr7kdevvi0hd12sk'
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue={content}
				init={{
					height: 500,
					menubar: false,
					plugins: "'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage  tableofcontents footnotes mergetags autocorrect typography inlinecss",
					toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
				onEditorChange={handleChangeContent}
			/>
		</div>
	);
}

export default RichTextEditor;