import axios from 'axios';
import AddFileImg from '../../assets/img/AddFileImg.svg'
import { Cloudinary } from "@cloudinary/url-gen";
import { Image } from 'cloudinary-react'
import { useEffect, useState } from 'react';
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service';
import { boardService } from '../../services/board.service.local';

import { Dialog, DialogContentContainer, Icon, Menu, MenuButton, MenuItem } from 'monday-ui-react-core';
import { CloseSmall, Delete, Download } from 'monday-ui-react-core/icons';


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
        if (fileInputElement && hoveredFiledId === null) {
            fileInputElement.click()
        }
    }

    function onAddFile(url) {
        const file = { url, id: Date.now() }
        onUpdateTask(taskId, { key: 'files', value: [...files, file] })
    }

    function onDeleteFile(fileId) {
        onUpdateTask(taskId, { key: 'files', value: files.filter(file => file.id !== fileId) })
    }

    function onDeleteAllFiles() {
        onUpdateTask(taskId, { key: 'files', value: [] })
    }


    async function onDownloadFile(url) {

        try {
            const response = await fetch(url)
            const blob = await response.blob()

            const blobURL = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobURL
            link.setAttribute('download', 'downloaded-image.jpg');

            document.body.appendChild(link)
            link.click();
            document.body.removeChild(link)

            setTimeout(() => {
                URL.revokeObjectURL(blobURL)
            }, 100);
        } catch (error) {
            console.error('Failed to download the image:', error)
        }
    }

    function uploadImage(files) {
        const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('upload_preset', UPLOAD_PRESET)
        axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData)
            .then((response) => {
                showSuccessMsg("Image uploaded successfully")
                onAddFile(response.data.url)
            }).catch((error) => {
                showErrorMsg("Image upload failed")
                console.log(error)
            })
    }

    return (
        <div className='task-file-container' onClick={() => handleButtonClick(taskId)}>
            <input
                type="file"
                id={`fileInput${taskId}`}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(ev) => { uploadImage(ev.target.files) }}
            />
            {files.map(file => (
                <div key={file.id} className='task-file' onMouseEnter={() => setHoveredFileId(file.id)} onMouseLeave={() => setHoveredFileId(null)} >
                    {hoveredFiledId !== file.id &&
                        <Image className='task-file-img'
                            cloudName="dhq4tdw9m"
                            loading="lazy"
                            publicId={file.url}
                            width="17" height="17" crop="scale" quality="auto" dpr_auto="true" />
                    }
                    {hoveredFiledId === file.id &&
                        <div className="task-file-hover">
                            <DialogContentContainer
                                type="modal"
                                size="small">
                                <MenuButton

                                    size='16'
                                >
                                    <Menu
                                        id="menu"
                                        size="medium"
                                    >
                                        <MenuItem
                                            icon={Download}
                                            iconType="SVG"
                                            onClick={(ev) => {
                                                ev.stopPropagation()
                                                onDownloadFile(file.url)
                                            }
                                            }
                                            title="Download File"
                                        />
                                        <MenuItem
                                            icon={Delete}
                                            iconType="SVG"
                                            onClick={(ev) => {
                                                ev.stopPropagation()
                                                onDeleteFile(file.id)
                                            }}
                                            title="Delete File"
                                        />
                                    </Menu>
                                </MenuButton>
                                <Image cloudName="dhq4tdw9m" publicId={file.url} loading="lazy" crop="fill" quality="auto" dpr_auto="true" />
                            </DialogContentContainer>
                        </div>
                    }
                </div>
            ))}
            {files.length === 0 && (
                <div className='add-file-img-container'>
                    <img className='add-file-img' src={AddFileImg} alt="" />
                </div>
            )}
            {files.length > 0 &&
                <div className="btn-delete-files" onClick={(ev) => {
                    ev.stopPropagation()
                    onDeleteAllFiles()
                }}>
                    <Icon size="small" icon={CloseSmall} />
                </div>}

            <div className={"btn-add-file " + (files.length > 0 ? 'more' : '')} >
                <div className="line-one"></div>
                <div className="line-two"></div>
            </div>

        </div>
    )
}


