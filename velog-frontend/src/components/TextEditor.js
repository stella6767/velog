import React, { Component } from 'react';
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as postAPI from '../lib/api/post';

const TextEditor = (props) => {
  const { value, onChange } = props;

  // function imageHandler() {
  //   // input file tag 생성
  //   console.log('이미지 업로드 실행');

  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', '.png,.jpg,.jpeg');
  //   input.click();
  //   // input change
  //   input.onchange = (e) => {
  //     const files = e.target.files;
  //     console.log('files', files);

  //     const formData = new FormData();
  //     formData.append('files', files[0]); //키와 값 쌍으로 담아줌.

  //     console.log('formData', formData);

  //     // file 등록
  //     const tempFile = postAPI.imgUpload(formData);
  //     // tempFile.then((response) => {
  //     //   // 커서위치 및 fileSrno 얻기
  //     //   const fileSrno = response.fileSrno;
  //     //   const range = this.quill.getSelection();
  //     //   this.quill.insertEmbed(range.index, 'image', 'http://localhost:8002/master/api/v1/upload/img/' + fileSrno);
  //     // });
  //   };
  // }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
          ['clean'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    [],
  );

  const formats = [
    //'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <div style={{ height: '500px' }}>
      <ReactQuill
        style={{ height: '450px' }}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ''}
        placeholder={'당신의 이야기를 적어보세요...'}
        onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
      />
    </div>
  );
};
export default TextEditor;
