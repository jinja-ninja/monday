import { Button, EditableHeading, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Board, Delete, Duplicate, Edit, Favorite } from "monday-ui-react-core/icons"
import { useState } from "react"
import { useSelector } from "react-redux"

export function BoardNavLink({ text, boardId, onSelectBoard, onDeleteBoard, onRenameBoard, onToggleFavoriteBoard, onDuplicateBoard, isStarred }) {
    const [isEditibleMode, setIsEditibleMode] = useState(false)
    const [editableText, setEditableText] = useState(text)
    const currBoard = useSelector((storeState => storeState.boardModule.board))
    let dynActiveBoardClass

    if (currBoard) {
        dynActiveBoardClass = currBoard._id === boardId ? 'selected-board' : ''
    } else {
        dynActiveBoardClass = ''
    }

    const dynIsFavoriteText = isStarred ? 'Add to favorites' : 'Remove from favorites'

    const EditibleOrText = !isEditibleMode ?
        text
        :
        <EditableHeading
            className="editableHeading"
            type="h6"
            value={text}
            shouldFocusOnMount={true}
            onBlur={() => {
                onRenameBoard(boardId, editableText)
                setIsEditibleMode((prevIsEditable) => !prevIsEditable)
            }}
            onChange={(newText) => setEditableText(newText)}
            onClick={(e) => { e.stopPropagation() }}
        />

    return (

        <div className={"btn-board-container " + dynActiveBoardClass}>
            <Button
                className="btn-board"
                kind="tertiary"
                leftIcon={Board}
                onClick={(e) => {
                    onSelectBoard(boardId)
                }}
            >
                {EditibleOrText}
            </Button>

            <MenuButton closeDialogOnContentClick className="btn-board-menu" size={MenuButton.sizes.S} onClick={(e) => {
                e.stopPropagation()
            }}>
                <Menu id="menu" size={Menu.sizes.MEDIUM}>
                    {/* <MenuTitle caption="Look up, you might see" captionPosition={MenuTitle.positions.TOP} /> */}
                    <MenuItem onClick={() => onDeleteBoard(boardId)} icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete" />
                    <MenuItem
                        onClick={() => {
                            setIsEditibleMode((prevIsEditable) => !prevIsEditable)
                        }} icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename Board" />
                    <MenuItem onClick={() => onToggleFavoriteBoard(boardId)} icon={Favorite} iconType={MenuItem.iconType.SVG} title={dynIsFavoriteText} />
                    <MenuItem onClick={() => onDuplicateBoard(boardId)} icon={Duplicate} iconType={MenuItem.iconType.SVG} title="Duplicate board" />
                </Menu>
            </MenuButton>
        </div>



    )
}


