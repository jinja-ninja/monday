import { Button, Icon, Text } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add, Delete, DropdownChevronDown, DropdownChevronRight, Edit } from "monday-ui-react-core/icons"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addGroup, getBoardById, removeGroup } from "../store/actions/board.action"
import { IconButton, MenuButton, Menu, MenuTitle, MenuItem } from "monday-ui-react-core"


export function GroupList({ groups, labels, cmpOrder, progress, boardId }) {

    const board = useSelector(state => state.boardModule.board)

    async function loadBoard() {
        await getBoardById(boardId)
    }

    async function onRemoveGroup(boardId, groupId) {
        try {
            await removeGroup(boardId, groupId)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }




    const uid = () => Math.random().toString(36).slice(2)

    return <div className="group-list-container">
        <ul className="group-list">
            {groups &&
                groups.map((group, idx) => {
                    return (
                        <li key={group.id} className="group-list-item">
                            <MenuButton
                                size={MenuButton.sizes.XS}
                                className="group-menu-btn"
                                onMenuHide={function noRefCheck() { }}
                                onMenuShow={function noRefCheck() { }}
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
                                        onClick={function noRefCheck() { }}
                                        title="Rename Group"
                                    />
                                </Menu>
                            </MenuButton>
                            <GroupPreview group={group}
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

