import { Button, Icon, Text } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add, Delete, DropdownChevronDown, DropdownChevronRight, Edit, Duplicate } from "monday-ui-react-core/icons"
import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { addGroup, duplicatedGroup, getBoardById, removeGroup, updateBoard } from "../store/actions/board.action"
import { IconButton, MenuButton, Menu, MenuTitle, MenuItem } from "monday-ui-react-core"



export function GroupList({ groups, labels, cmpOrder, progress, boardId }) {
    const board = useSelector(state => state.boardModule.board)



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
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onDuplicateGroup(boardId, groupId) {
        try {
            await duplicatedGroup(boardId, groupId)
            // showSuccessMsg('Task removed')

        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    function onRenameGroup(groupId, newText) {
        updateBoard('group', boardId, groupId, null, { key: 'title', value: newText })
    }

    const uid = () => Math.random().toString(36).slice(2)

    return <div className="group-list-container">
        <ul className="group-list">
            {groups &&
                groups.map((group, idx) => {
                    return (
                        <li key={group.id} className="group-list-item" data-group-id={group.id}>
                            <MenuButton
                                size={MenuButton.sizes.XS}
                                className="group-menu-btn"
                            >
                                <Menu
                                    id="menu"
                                    size="medium"
                                >
                                    <MenuItem
                                        icon={Delete}
                                        iconType="SVG"
                                        onClick={() => onRemoveGroup(boardId, group.id)}
                                        title="Delete"
                                    />
                                    <MenuItem
                                        icon={Edit}
                                        iconType="SVG"
                                        onClick={() => handleEditClick(group.id)}
                                        title="Rename Group"
                                    />
                                    <MenuItem
                                        icon={Duplicate}
                                        iconType="SVG"
                                        onClick={() => onDuplicateGroup(boardId, group.id)}
                                        title="Duplicate this group"
                                    />
                                </Menu>
                            </MenuButton>
                            <GroupPreview
                                onRenameGroup={onRenameGroup}
                                group={group}
                                boardId={boardId}
                                labels={labels}
                                cmpOrder={cmpOrder}
                                progress={progress}
                                key={uid()} />
                        </li>

                    )
                })}
        </ul >

        <Button
            onClick={() => { addGroup(boardId) }}
            kind="secondary"
            size="small"
            leftIcon={Add}>

            Add new Group
        </Button>
    </div >
}

