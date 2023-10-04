import { Button, Menu, MenuButton, MenuItem } from "monday-ui-react-core"
import { Board, Delete, Edit } from "monday-ui-react-core/icons"

export function BoardNavLink(text) {


    return (

        <Button
            className="btn-board"
            kind="tertiary"
            leftIcon={Board}
            onClick={() => showBoard()

            }
        >
            {text}
            {/* Monday Funday */}
            <MenuButton closeDialogOnContentClick className="btn-board-menu" size={MenuButton.sizes.XS} onClick={(e) => {
                e.stopPropagation()
                console.log('MENU CLICKED:')
            }}>
                <Menu id="menu" size={Menu.sizes.MEDIUM}>
                    {/* <MenuTitle caption="Look up, you might see" captionPosition={MenuTitle.positions.TOP} /> */}
                    <MenuItem onClick={() => onDeleteBoard(boardId)} icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete" />
                    <MenuItem onClick={() => onRenameBoard(boardId)} icon={Edit} iconType={MenuItem.iconType.SVG} title="Rename Board" />
                </Menu>
            </MenuButton>
        </Button>
    )
}


