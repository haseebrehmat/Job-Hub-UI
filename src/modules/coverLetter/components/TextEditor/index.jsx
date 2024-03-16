import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='cwe1lw25hfmuo0hjvs2u0aosqll2gzb83eqc9znkuywu43ci'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>your Ai Generated Cover Letter Displays here.........</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;}'
        }}
      />
      <button className='bg-[#10868a] hover:bg-[#209fa3] text-[#ffffff]  py-2 px-3 rounded inline-flex items-center float-right my-2' onClick={log}>Download</button>
    </>
  );
}