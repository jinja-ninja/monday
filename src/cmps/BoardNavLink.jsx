import { Button, EditableHeading, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Board, Delete, Edit } from "monday-ui-react-core/icons"
import { useState } from "react"

export function BoardNavLink({ text, boardId, showBoard, onDeleteBoard, onRenameBoard }) {
    const [isEditibleMode, setIsEditibleMode] = useState(false)
    
    const EditibleOrText = !isEditibleMode ? text : <EditableHeading
        className="editableHeading"
        type="h6"
        value={text}
        shouldFocusOnMount={true}
        onBlur={() => setIsEditibleMode((prevIsEditable) => !prevIsEditable)}

    />
    console.log('EditibleOrText:', EditibleOrText)
    return (

        <div className="btn-board-container">
            <Button
                className="btn-board"
                kind="tertiary"
                leftIcon={Board}
                onClick={() => showBoard(boardId)

                }
            >
                {EditibleOrText}
            </Button>

            <MenuButton closeDialogOnContentClick className="btn-board-menu" size={MenuButton.sizes.S} onClick={(e) => {
                e.stopPropagation()
                console.log('MENU CLICKED:')
            }}>
                <Menu id="menu" size={Menu.sizes.MEDIUM}>
                    {/* <MenuTitle caption="Look up, you might see" captionPosition={MenuTitle.positions.TOP} /> */}
                    <MenuItem onClick={() => onDeleteBoard(boardId)} icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete" />
                    <MenuItem
                        onClick={() => {
                            setIsEditibleMode((prevIsEditable) => !prevIsEditable)
                            onRenameBoard(boardId)
                        }} icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename Board" />
                </Menu>
            </MenuButton>
        </div>



    )
}


