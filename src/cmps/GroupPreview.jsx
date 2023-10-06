import { useCallback, useRef, useState } from "react"

import { ColorPicker, EditableHeading, Icon, Menu, MenuButton, MenuItem, Modal, ModalContent, ModalFooterButtons, ModalHeader, Tooltip } from "monday-ui-react-core"
import { Delete, DropdownChevronDown, DropdownChevronRight, Duplicate, Edit, HighlightColorBucket } from "monday-ui-react-core/icons"
import { TaskList } from "./TaskList"
import { duplicatedGroup, removeGroup, updateBoard } from "../store/actions/board.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function GroupPreview({ group, label, cmpsOrder, progress, boardId, onRenameGroup, initiateEdit }) {

    const [showGroup, setShowGroup] = useState(true)
    const [editableText, setEditableText] = useState(group.title)
    const [numOfTasks, setNumOfTasks] = useState(group.tasks.length)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [show, setShow] = useState(false)
    const openModalButtonRef = useRef()
    const closeModal = useCallback(() => {
        setShow(false);
    }, []);

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
            showSuccessMsg(' Group Title group was successfully deleted')
            // showUserMsg('success', 'Group removed')
        } catch (err) {
            showErrorMsg(`X Cannot remove group from board (id: ${groupId})`)
            // showUserMsg('error', 'Cannot remove group')
        }
    }

    async function onDuplicateGroup(boardId, groupId) {
        try {
            await duplicatedGroup(boardId, groupId)
            showSuccessMsg('Group has been duplicated successfully')
        } catch (err) {
            showErrorMsg(`Cannot duplicate group (${groupId})`)
        }
    }

    function onRenameGroup(groupId, newText) {
        try {
            updateBoard('group', boardId, groupId, null, { key: 'title', value: newText })
            // showSuccessMsg('Group name removed')
        } catch (err) {
            // showErrorMsg('Cannot change name')
        }
    }

    function onChangeGroupColorClick() {
        setShowColorPicker(prevState => !prevState)
    }

    function onSelectColor(color) {
        updateBoard('group', boardId, group.id, null, { key: 'style', value: color[0] })
        setShowColorPicker(prevState => !prevState)
    }

    return <div className="group-preview-container">

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

        <div className="collapsible-header-wrapper">

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
            <span className="num-of-tasks">{numOfTasks} {numOfTasks === 1 ? 'Item' : 'Items'}</span>
        </div>

        {
            showColorPicker && <ColorPicker
                onSave={(color) => onSelectColor(color)}
                colorSize="small"
                className="color-picker"
            />
        }

        {showGroup && <TaskList group={group} cmpsOrder={cmpsOrder} />}

        <>

            <Modal id="story-book-modal" title="Modal title" triggerElement={openModalButtonRef.current} show={show} onClose={closeModal}
                width={Modal.width.DEFAULT} contentSpacing>
                <ModalHeader title={"Delete"} iconSize={32} />
                <ModalContent>Delete this Group? </ModalContent>
                <ModalFooterButtons primaryButtonText="Delete" secondaryButtonText="Cancel" onPrimaryButtonClick={() => {
                    onRemoveGroup(boardId, group.id)
                    closeModal()
                }
                } onSecondaryButtonClick={closeModal} />
            </Modal>
        </>

    </div>
}

// return (
//     <section className="group-list">
//         {/* Render group labels by labels array */}
//         <section className="labels-grid">
//             {labels.map((label, index) => (
//                 <div key={index}>{label}</div>
//             ))}
//         </section>

//         {/* Render tasks by cmp order */}
//         {group.tasks.map((task) => (
//             <section className="group grid" key={task.id}>
//                 {cmpOrder.map((cmp, idx) => (
//                     <section className="grid-item" key={idx}>
//                         <DynamicCmp cmpType={cmp} info={task[cmp]} />
//                     </section>
//                 ))}
//             </section>
//         ))}

// {/* Render progress by progress array */}
// <section className="progress-grid">
//     {progress.map((item, idx) => (
//         <div key={idx}>{item}</div>
//     ))}
// </section>
//     </section>
// )
// }


