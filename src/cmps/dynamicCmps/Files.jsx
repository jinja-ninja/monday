import axios from 'axios';
import AddFileImg from '../../assets/img/AddFileImg.svg'
import { Cloudinary } from "@cloudinary/url-gen";
import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';
import { boardService } from '../../services/board.service.local';

import { DialogContentContainer, Menu, MenuButton, MenuItem } from 'monday-ui-react-core';
import { Delete, Download } from 'monday-ui-react-core/icons';


export function Files({ boardId, groupId, taskId, onUpdateTask, taskFiles, currBoard }) {
    const [files, setFiles] = useState([])
    const [hoveredFiledId, setHoveredFileId] = useState(null)

    const UPLOAD_PRESET = 'fhdi35pq'
    const CLOUD_NAME = 'dhq4tdw9m'


    useEffect(() => {
        if (taskFiles) {
            setFiles(taskFiles)
        }
    }, [taskFiles, currBoard])

    const handleButtonClick = (taskId) => {
        const fileInputElement = document.getElementById(`fileInput${taskId}`)
        if (fileInputElement) {
            fileInputElement.click()
        }
    }

    function onAddFile(url) {
        const file = { url, id: Date.now() }
        onUpdateTask(taskId, { key: 'files', value: [...files, file] })
        // setFiles([...files, file])
    }

    function onDeleteFile(fileId) {
        onUpdateTask(taskId, { key: 'files', value: files.filter(file => file.id !== fileId) })
        // setFiles(files.filter(file => file.id !== fileId))

        // removeImageFromCloudinary(fileId)
    }

    async function onDownloadFile(url) {
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'downloaded-image.jpg')
        // // link.download = '';  // The name of the downloaded file goes here, or keep it blank to use the file's original name.
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        try {
            const response = await fetch(url);
            const blob = await response.blob();

            // Create an Object URL for the blob
            const blobURL = URL.createObjectURL(blob);

            // Create an anchor element for the download
            const link = document.createElement('a');
            link.href = blobURL;
            link.setAttribute('download', 'downloaded-image.jpg');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up: revoke the Object URL after the link is clicked
            setTimeout(() => {
                URL.revokeObjectURL(blobURL);
            }, 100);
        } catch (error) {
            console.error('Failed to download the image:', error);
        }
    }


    // function removeImageFromCloudinary(fileId) {
    //     const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });
    //     const publicId = files.find(file => file.id === fileId).url.split('/')[7].split('.')[0]
    //     axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`, { public_id: publicId })
    //         .then((response) => {
    //             showSuccessMsg("Image deleted successfully")
    //         }).catch((error) => {
    //             showErrorMsg("Image delete failed")
    //             console.log(error);
    //         })
    // }

    function uploadImage(files) {
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
                <div key={file.id} className='task-file' onMouseEnter={() => setHoveredFileId(file.id)} onMouseLeave={() => setHoveredFileId(null)} >
                    {hoveredFiledId !== file.id &&
                        <Image className='task-file-img' cloudName="dhq4tdw9m" publicId={file.url} width="17" height="17" crop="scale" quality="auto" dpr_auto="true" />}
                    {hoveredFiledId === file.id && <div className="task-file-hover">
                        <DialogContentContainer
                            type="modal"
                            size="small">
                            <MenuButton
                                onMenuHide={function noRefCheck() { }}
                                onMenuShow={function noRefCheck() { }}
                                size='16'
                            >
                                <Menu
                                    id="menu"
                                    size="medium"
                                >
                                    <MenuItem
                                        icon={Download}
                                        iconType="SVG"
                                        onClick={() => onDownloadFile(file.url)}
                                        title="Download File"
                                    />
                                    <MenuItem
                                        icon={Delete}
                                        iconType="SVG"
                                        onClick={() => onDeleteFile(file.id)}
                                        title="Delete File"
                                    />
                                </Menu>
                            </MenuButton>
                            <Image cloudName="dhq4tdw9m" publicId={file.url} width="200" height="200" crop="scale" quality="auto" dpr_auto="true" />
                        </DialogContentContainer>
                    </div>
                    }
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