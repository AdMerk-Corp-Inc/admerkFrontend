import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor(props) {
    const { content, setContent } = props

    const handleContentChange = (value) => {
        setContent(value);
    }
    return (
        <ReactQuill
            value={content}
            onChange={handleContentChange}
            placeholder="Please Enter The Description Here"
            style={{ height: '200px' }}
            modules={{
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }]
                ]
            }}
            formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'color', 'background',
                'list', 'bullet',
                'align'
            ]}
        />
    )
}
