import { useCallback, useEffect, useRef, useState } from "react"
import { ColorPicker, EditableHeading, Icon, Menu, MenuButton, MenuItem, Modal, ModalContent, ModalFooterButtons, ModalHeader, Tooltip, useClickOutside } from "monday-ui-react-core"
import { Delete, DropdownChevronDown, DropdownChevronRight, Duplicate, Edit, HighlightColorBucket } from "monday-ui-react-core/icons"
import { Draggable } from "react-beautiful-dnd"

import { duplicatedGroup, removeGroup, updateBoard } from "../store/actions/board.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { TaskList } from "./TaskList"

export function GroupPreview({ group, labels, priorities, cmpsOrder, boardId, onRenameGroup, index, collapseAll, isCollapse }) {
    const [showGroup, setShowGroup] = useState(true)
    const [editableText, setEditableText] = useState(group.title)
    const [numOfTasks, setNumOfTasks] = useState(group.tasks.length)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [show, setShow] = useState(false)
    const openModalButtonRef = useRef()
    const refColorDialog = useRef(null)
    const closeModal = useCallback(() => {
        setShow(false)
    }, [])

    useEffect(() => {
        setEditableText(group.title)
    }, [group.title])

    useEffect(() => {
        setNumOfTasks(group.tasks.length)
    }, [group.tasks.length])

    useEffect(() => {
        if (collapseAll) setShowGroup(false)
        else setShowGroup(true)
    }, [collapseAll])

    const dynCollapseGroupClass = showGroup ? '' : 'collapse-group'

    const handleEditClick = (groupId) => {
        const groupElement = document.querySelector(`.group-list-item[data-group-id="${groupId}"]`)
        if (groupElement) {
            const editableElement = groupElement.querySelector('.editable-heading-target div')
            if (editableElement) {
                editableElement.click()
            }
        }
    }

    async function onRemoveGroup(boardId, groupId) {
        try {
            await removeGroup(boardId, groupId)
            showSuccessMsg(`Group ${groupId} was successfully deleted`)
        } catch (err) {
            showErrorMsg(`X Cannot remove group from board (id: ${groupId})`)
        }
    }

    async function onDuplicateGroup(boardId, groupId) {
        try {
            await duplicatedGroup(boardId, groupId)
            showSuccessMsg(`Group has been duplicated successfully ${groupId}`)
        } catch (err) {
            showErrorMsg(`Cannot duplicate group ${groupId}`)
        }
    }

    function onRenameGroup(groupId, newText) {
        try {
            updateBoard('group', boardId, groupId, null, { key: 'title', value: newText })
            showSuccessMsg(`Group name has been changed ${groupId}`)
        } catch (err) {
            showErrorMsg(`Cannot change group name ${groupId}`)
        }
    }

    function onChangeGroupColorClick() {
        setShowColorPicker(prevState => !prevState)
    }

    function onSelectColor(color) {
        updateBoard('group', boardId, group.id, null, { key: 'style', value: color[0] })
        setShowColorPicker(prevState => !prevState)
    }

    const onClickOutsideSelectColor = useCallback(() => {
        setShowColorPicker(prevState => !prevState)
    }, [])

    useClickOutside({
        ref: refColorDialog,
        callback: onClickOutsideSelectColor
    })

    return (
        <Draggable draggableId={group.id} index={index}>
            {(provider) => (
                <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                    className={"group-preview-container " + dynCollapseGroupClass}>

                    <div className={"collapsible-header-wrapper " + dynCollapseGroupClass + (!isCollapse ? ' collapse-group-header' : '')} >

                        <div className={"side-menu-btn-container " + (collapseAll ? 'dragging' : '')} >

                            <MenuButton
                                size={MenuButton.sizes.XS}
                                className="group-menu-btn"
                                closeDialogOnContentClick >
                                <Menu id="menu" size="medium">
                                    <MenuItem
                                        icon={Delete}
                                        iconType="SVG"
                                        onClick={() => setShow(true)}
                                        title="Delete" />
                                    <MenuItem
                                        icon={Edit}
                                        iconType="SVG"
                                        onClick={() => handleEditClick(group.id)}
                                        title="Rename Group" />
                                    <MenuItem
                                        icon={Duplicate}
                                        iconType="SVG"
                                        onClick={() => onDuplicateGroup(boardId, group.id)}
                                        title="Duplicate this group" />
                                    <MenuItem
                                        icon={HighlightColorBucket}
                                        iconType="SVG"
                                        onClick={() => onChangeGroupColorClick()}
                                        title="Change group color" />
                                </Menu>
                            </MenuButton>
                        </div>

                        <div className="group-title">

                            <Tooltip
                                content={showGroup ? "Collapse Group" : "Expand Group"}
                                animationType="expand">
                                <Icon iconType={Icon.type.SVG} iconSize={20}
                                    className={"collapse-arrow-btn " + dynCollapseGroupClass}
                                    icon={showGroup ? DropdownChevronDown : DropdownChevronRight}
                                    style={{ color: `var(--color-${group.style})` }}
                                    onClick={() => setShowGroup((prevShowGroup => !prevShowGroup))} />
                            </Tooltip>

                            <Tooltip content="Click to Edit"
                                animationType="expand">
                                <EditableHeading
                                    className="editable-heading-target"
                                    type="h4"
                                    value={editableText}
                                    onFinishEditing={() => {
                                        onRenameGroup(group.id, editableText)
                                    }}
                                    style={{ color: `var(--color-${group.style})` }}
                                    onChange={(newText) => setEditableText(newText)}
                                />
                            </Tooltip>

                            <span className={"num-of-tasks " + dynCollapseGroupClass}>
                                {numOfTasks === 0 ?
                                    'No tasks' : `${numOfTasks} 
                                ${numOfTasks === 1 ? 'Task' : 'Tasks'}`}
                            </span>
                        </div>
                    </div>

                    {
                        showColorPicker && <ColorPicker
                            onSave={(color) => onSelectColor(color)}
                            colorSize="small"
                            className="color-picker"
                            ref={refColorDialog}
                        />
                    }
                    <TaskList
                        group={group}
                        cmpsOrder={cmpsOrder}
                        labels={labels}
                        priorities={priorities}
                        setNumOfTasks={setNumOfTasks}
                        showGroup={showGroup}
                        isCollapse={isCollapse}
                        collapseAll={collapseAll}
                    />
                    <>
                        <Modal
                            id="story-book-modal"
                            title="Modal title"
                            triggerElement={openModalButtonRef.current}
                            show={show}
                            onClose={closeModal}
                            width={Modal.width.DEFAULT} contentSpacing>

                            <ModalHeader title={"Delete"} iconSize={32} />
                            <ModalContent>Delete this Group? </ModalContent>
                            <ModalFooterButtons
                                primaryButtonText="Delete"
                                secondaryButtonText="Cancel"
                                onPrimaryButtonClick={() => {
                                    onRemoveGroup(boardId, group.id)
                                    closeModal()
                                }}
                                onSecondaryButtonClick={closeModal} />

                        </Modal>
                    </>
                </div>
            )
            }
        </Draggable >
    )
}


