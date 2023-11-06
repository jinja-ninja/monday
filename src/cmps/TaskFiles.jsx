import { Button, DialogContentContainer, Icon, IconButton, Menu, MenuButton, MenuItem, Modal, ModalContent } from "monday-ui-react-core";
import { Add, AddUpdate, Delete, Download, Fullscreen, Time } from "monday-ui-react-core/icons";
import TaskDetailsFileImg from "../assets/img/TaskDetailsFileImg.svg";
import { useCallback, useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Image } from "cloudinary-react";
import { storageService } from "../services/async-storage.service";
import { boardService } from "../services/board.service.local";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { updateTask } from "../store/actions/board.action";

export function TaskFiles({ task }) {

    const currBoard = useSelector(state => state.boardModule.board)
    const { boardId, groupId, taskId } = useParams()

    const [numOfFiles, setNumOfFiles] = useState(0)
    // const [isOpen, setIsOpen] = useState(false)
    const [currFile, setCurrFile] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [files, setFiles] = useState([])

    useEffect(() => {
        if (task.files) {
            setNumOfFiles(task.files.length)
        }
    }, [task.files, numOfFiles])

    useEffect(() => {
        if (task.files) {
            setFiles(task.files)
        }
    }, [task.files, currBoard])

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

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

    function showImgModal(file) {
        setCurrFile(file)
        setShowModal(true)
    }

    async function onDeleteFile(fileId) {
        try {
            await updateTask(boardId, groupId, taskId, { key: 'files', value: files.filter(file => file.id !== fileId) })
            showSuccessMsg(`Task updated ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot update task ${taskId}`)
            console.log('err:', err)
        }
    }



    return (
        <div className="task-files-container">
            {numOfFiles !== 0 ?
                <>
                    <p className="files-to-show">Showing {numOfFiles} out of {numOfFiles} files: </p>
                    <div className="files-container">
                        {task.files.map((file) => {
                            return (
                                <div className="task-file-item">
                                    <DialogContentContainer
                                        type="modal"
                                        size="small"
                                        style={{
                                            padding: 0, borderRadius: 0, margin: 0
                                        }}
                                    >
                                        < div className="file-task-details" key={file.id} >
                                            <MenuButton className="menu-button">
                                                <Menu>
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
                                                        iconType={MenuItem.iconType.SVG}
                                                        title="Delete"
                                                        onClick={() => onDeleteFile(file.id)}
                                                    />
                                                    <MenuItem
                                                        icon={Fullscreen}
                                                        iconType={MenuItem.iconType.SVG}
                                                        title="open"
                                                        onClick={() => showImgModal(file)}
                                                    />
                                                </Menu>
                                            </MenuButton>
                                            <div className="img-task-details">
                                                <Image width="75" height="132" cloudName='dhq4tdw9m' publicId={file.url} loading="lazy" crop="fill" quality="auto" dpr_auto="true" />
                                            </div>
                                        </div>
                                    </DialogContentContainer>
                                    <div className="file-name">
                                        <span>{String(file.id).substring(0, 2)}.jpg</span>
                                        <IconButton
                                            className="time-icon"
                                            icon={Time}
                                            ariaLabel={`Created At ${file.id ? new Date(file.id).toLocaleDateString() : 'N/A'} `}
                                            size="small"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
                :
                <>
                    <img className="img-no-files" src={TaskDetailsFileImg} alt="" />
                    <div>
                        <span>Drag & drop </span>
                        <span className="or-word">or</span>
                        <span> add files here</span>
                    </div>
                    <p>Upload, comment and review all files in this item to easily collaborate in context</p>
                    <Button leftIcon={Add}>Add file</Button>
                </>
            }
            {
                showModal &&
                // <div className="img-modal">
                <Modal
                    contentSpacing
                    // description="Subtitle description text goes here"
                    id="story-book-modal"
                    onClose={closeModal}
                    title="File Preview"
                    triggerElement={null}
                    show={true}
                    width={{}}
                >
                    <ModalContent>
                        <Image width="auto" height="auto" cloudName='dhq4tdw9m' publicId={currFile.url} loading="lazy" crop="fill" quality="auto" dpr_auto="true" />
                    </ModalContent>
                </Modal>
                // </div>
            }
        </div >
    )
}