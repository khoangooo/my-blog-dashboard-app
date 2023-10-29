import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import tinymce, { Editor as TinyMCEEditor } from 'tinymce';

type TProps = {
	initData?: string;
	onChange?: (v: string) => void;
}

const RichTextEditor = ({ initData = "", onChange = () => { } }: TProps) => {

	const content: string | undefined = initData || "<p>This is the initial content of the editor.</p>"
	const editorRef = useRef<TinyMCEEditor | null>(null);

	const handleChangeContent = (a: string, editor: TinyMCEEditor) => {
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
					plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
					imagetools_cors_hosts: ['picsum.photos'],
					menubar: 'file edit view insert format tools table help',
					toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					image_title: true,
					/* enable automatic uploads of images represented by blob or data URIs*/
					automatic_uploads: true,
					/*
						URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
						images_upload_url: 'postAcceptor.php',
						here we add custom filepicker only to Image dialog
					*/
					file_picker_types: 'file image media',
					/* and here's our custom image picker*/
					file_picker_callback: (cb, value: any, meta: any) => {
						const input = document.createElement('input');
						input.setAttribute('type', 'file');
						input.setAttribute('accept', 'audio/*,video/*,image/*');

						input.addEventListener('change', (e: any) => {
							const file = e.target.files[0];

							const reader = new FileReader();
							reader.addEventListener('load', () => {
								/*
									Note: Now we need to register the blob in TinyMCEs image blob
									registry. In the next release this part hopefully won't be
									necessary, as we are looking to handle it internally.
								*/
								const id = 'blobid' + (new Date()).getTime();
								const blobCache = tinymce.activeEditor?.editorUpload?.blobCache;
								const base64 = (reader.result as string)?.split(',')?.[1];
								const blobInfo = blobCache?.create(id, file, base64);
								if (blobInfo && blobCache) {
									blobCache.add(blobInfo)
									/* call the callback and populate the Title field with the file name */
									cb(blobInfo.blobUri(), { title: file.name });
								}
							});
							reader.readAsDataURL(file);
						});

						input.click();
					},
					paste_data_images: true,
					image_caption: true
				}}
				onChange={(e) => e.target.getContent()}
				onEditorChange={handleChangeContent}
			/>
		</div>
	);
}

export default RichTextEditor;