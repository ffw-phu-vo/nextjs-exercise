import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import httpClient from '../../api/httpClient'
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


interface IEditorRef {
  CKEditor: any;
  ClassicEditor: any;
}

interface ICustomEditor {
  onChange: (editor:any) => void
}

// https://www.techgalery.com/2021/05/how-to-use-react-ckeditor-upload-file.html
const CustomEditor = ({onChange}:ICustomEditor) => {
  // https://github.com/ckeditor/ckeditor5-react/issues/313
  const editorRef = useRef<IEditorRef>()
  const [ editorLoaded, setEditorLoaded ] = useState( false )
  const {CKEditor, ClassicEditor} = editorRef.current || {}

  useEffect( () => {
    editorRef.current = {
      CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
    setEditorLoaded( true )
  }, [] )

  const uploadAdapter = (loader:any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file:any) => {
            body.append('media', file);
            body.append('title', file.name);
            httpClient
              .post("/media", body)
              .then((res) => {
                // console.log('finished', res.data.url);
                resolve({
                  default: `${res.data.url}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }

  const uploadPlugin = (editor:any) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      {
        editorLoaded ?
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin]
          }}
          editor={ClassicEditor}
          // onReady={(editor) => {}}
          // onBlur={(event, editor) => {}}
          // onFocus={(event, editor) => {}}
          onChange={(event:any, editor:any) => {
            onChange(editor.getData());
          }}
        />
        :
          "loading..."
      }
    </div>
  )
}

export default CustomEditor
