import React, { useEffect, useState } from 'react';
import { imageDb } from './Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Button } from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const UploadImageToFirebase = ({ onImageUpload }) => {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    const handleUpload = () => {
        if (!img) return;
        const imgRef = ref(imageDb, `files/${uuidv4()}`);
        uploadBytes(imgRef, img).then(() => {
            getDownloadURL(imgRef).then((url) => {
                setImgUrl(url);
                onImageUpload(url);
            });
        });
    };

    useEffect(() => {
        if (imgUrl) return;
        const latestImgRef = ref(imageDb, 'files');
        getDownloadURL(latestImgRef)
        .then((url) => {
            setImgUrl(url);
        })
        .catch((error) => {
            console.error('Error getting latest image:', error);
        });
    }, [imgUrl]);

    return (
        <div className='upload_image' style={{width: "400px"}}>
            {/* Giao diện từ Ant Design để upload ảnh */}
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                maxCount={1}
                onChange={handleUpload}
                beforeUpload={(file) => {
                    setImg(file);
                    return false;
                }}
            >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
            <br/>
            {/* Hiển thị ảnh sau khi tải lên */}
            {imgUrl && <img src={imgUrl} height='400px' width='400px' alt='Latest Uploaded Image' />}
        </div>
    );
};

export default UploadImageToFirebase;
