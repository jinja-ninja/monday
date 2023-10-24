import { useCallback, useRef, useState } from "react"
import { ColorPicker, EditableHeading, Icon, Menu, MenuButton, MenuItem, Modal, ModalContent, ModalFooterButtons, ModalHeader, Tooltip, useClickOutside } from "monday-ui-react-core"
import { Delete, DropdownChevronDown, DropdownChevronRight, Duplicate, Edit, HighlightColorBucket } from "monday-ui-react-core/icons"

import { duplicatedGroup, removeGroup, updateBoard } from "../store/actions/board.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { TaskList } from "./TaskList"

export function GroupPreview({ group, labels, priorities, cmpsOrder, boardId, onRenameGroup }) {

    const [showGroup, setShowGroup] = useState(true)
    const [editableText, setEditableText] = useState(group.title)
    const [numOfTasks, setNumOfTasks] = useState(group.tasks.length)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [show, setShow] = useState(false)
    const openModalButtonRef = useRef()
    const refColorDialog = useRef(null)
    const closeModal = useCallback(() => {
        setShow(false);
    }, [])

    const handleEditClick = (groupId) => {
        const groupElement = document.querySelector(`.group-list-item[data-group-id="${groupId}"]`)
        if (groupElement) {
            const editableElement = groupElement.querySelector('.editable-heading-target')
            if (editableElement) {
                editableElement.click() // Simulate a click on the EditableHeading
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

    return <div className="group-preview-container">

        <div className="collapsible-header-wrapper">
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
            <Tooltip
                content="Collapse/Expand Group"
                animationType="expand">
                <Icon iconType={Icon.type.SVG} iconSize={20}
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
                    onBlur={() => {
                        onRenameGroup(group.id, editableText)
                    }}
                    style={{ color: `var(--color-${group.style})` }}
                    onChange={(newText) => setEditableText(newText)}
                />
            </Tooltip>

            <span className="num-of-tasks">
                {numOfTasks === 0 ? 'No tasks' : `${numOfTasks} ${numOfTasks === 1 ? 'Task' : 'Tasks'}`}
            </span>
        </div>

        {
            showColorPicker && <ColorPicker
                onSave={(color) => onSelectColor(color)}
                colorSize="small"
                className="color-picker"
                ref={refColorDialog}
            />
        }

        {showGroup && <TaskList group={group} cmpsOrder={cmpsOrder} priorities={priorities} setNumOfTasks={setNumOfTasks} />}

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
}


