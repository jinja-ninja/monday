import axios from 'axios';
import AddFileImg from '../../assets/img/AddFileImg.svg'
import { Cloudinary } from "@cloudinary/url-gen";
import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';

export function Files({ boardId, groupId, taskId, onUpdateTask, taskFiles, currBoard }) {
    const [files, setFiles] = useState([])


    useEffect(() => {
        if (taskFiles) {
            setFiles(taskFiles)
        }
    }, [taskFiles, currBoard])

    const handleButtonClick = (taskId) => {

        document.getElementById(`fileInput${taskId}`).click()
    }

    function onAddFile(url) {
        const file = { url, id: Date.now() }
        onUpdateTask(taskId, { key: 'files', value: [...files, file] })
        // setFiles([...files, file])
    }

    function uploadImage(files) {

        const UPLOAD_PRESET = 'fhdi35pq'
        const CLOUD_NAME = 'dhq4tdw9m'
        const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', UPLOAD_PRESET);
        axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData)
            .then((response) => {
                showSuccessMsg("Image uploaded successfully")
                onAddFile(response.data.url)
            }).catch((error) => {
                showErrorMsg("Image upload failed")
                console.log(error);
            })
    }

    // return (
    //     <div className='task-file-container' onClick={() => handleButtonClick(taskId)}>
    //         {files.length > 0 && 
    //             <div className='add-file-img-container'>
    //                 <div className="btn-add-file" >
    //                     <div className="line-one"></div>
    //                     <div className="line-two"></div>
    //                 </div>
    //             </div>
    //         files.map(file => <div key={file.id} className='task-file' >
    //             <Image cloudName="dhq4tdw9m" publicId={file.url} width="17" height="17" crop="scale" />
    //         </div>
    //         )

    //         }
    //         {files.length === 0 && <div className='add-file-img-container'  >
    //             <input type="file" id={`fileInput${taskId}`} style={{ display: 'none' }} accept="image/*" onChange={(ev) => { uploadImage(ev.target.files) }} />
    //             <img className='add-file-img' src={AddFileImg} alt="" />
    //             <div className="btn-add-file" >
    //                 <div className="line-one"></div>
    //                 <div className="line-two"></div>
    //             </div>
    //         </div>
    //         }

    //     </div>
    // )

    return (
        <div className='task-file-container' onClick={() => handleButtonClick(taskId)}>
            {files.length > 0 && (
                <div className='add-file-img-container'>
                    <div className="btn-add-file" >
                        <div className="line-one"></div>
                        <div className="line-two"></div>
                    </div>
                </div>
            )}
            {files.map(file => (
                <div key={file.id} className='task-file'>
                    <Image cloudName="dhq4tdw9m" publicId={file.url} width="17" height="17" crop="scale" />
                </div>
            ))}
            {files.length === 0 && (
                <div className='add-file-img-container'>
                    <input
                        type="file"
                        id={`fileInput${taskId}`}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(ev) => { uploadImage(ev.target.files) }}
                    />
                    <img className='add-file-img' src={AddFileImg} alt="" />
                    <div className="btn-add-file" >
                        <div className="line-one"></div>
                        <div className="line-two"></div>
                    </div>
                </div>
            )}
        </div>
    );




}