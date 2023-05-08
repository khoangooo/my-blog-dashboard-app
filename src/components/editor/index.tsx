import React, { Component } from "react";
import { render } from "react-dom";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function uploadImageCallBack(file: File) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

interface Props {}

interface State {
  editorState: EditorState;
  editMode: boolean;
}

class RichtextEditor extends Component<Props, State> {
  private editorRef: React.RefObject<Editor>;
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText("abcde")
      ),
      editMode: true
    };
    this.editorRef = React.createRef<Editor>();
  }

  focus = () => {
    let editor = this.editorRef.current;
    if (editor) {
      editor.focusEditor();
    }
  };

  componentDidMount = () => {
    console.log("edit Me");
    if (this.state.editMode) {
      this.focus();
    }
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  onEditorStateChange = (editorState: EditorState) => {
    // console.log(editorState)
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, editMode } = this.state;
    return (
      <div className="editor">
        <button onClick={this.toggleEditMode}>Toggle Edit Mode</button>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          ref={this.editorRef}
          readOnly={!editMode}
          // toolbarHidden={true}
          toolbar={{
            // inline: { inDropdown: true },
            // list: { inDropdown: true },
            // textAlign: { inDropdown: true },
            // link: { inDropdown: true },
            // history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
        />
      </div>
    );
  }
}

export default RichtextEditor;
