import React from 'react'
import ReactMarkdown from 'react-markdown';
const DragDropUploadFile = ({ fileType=[], maxCount = 1 }) => {
  const [fileList, setFileList] = useState([]);
  const props = {
    name: "file",
    multiple: false,
    accept: `"${fileType}"`,
    maxCount
  };
  const handleChange = (info) => {
    if (info.fileList.length > 0) {
      setImgFile(info.fileList[0].originFileObj);
      getBase64(info.fileList[0].originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        message.success(`${info.file.name} file selected successfully.`);
      });
    }
  };
  const handleBeforeUpload = (file) => {
    if(fileType.length > 0){
      if(fileType.filter(f => f === file.type)){
        setFileList([...fileList, file]);
      }
    }
    else {
      setFileList([...fileList, file]);
    }
    return false;
};
  return (
    <div>DragDropUploadFile</div>
  )
}

export default DragDropUploadFile