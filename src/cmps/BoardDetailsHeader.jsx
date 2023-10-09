import { Avatar, AvatarGroup, Button, EditableHeading, IconButton, Tab, TabList } from "monday-ui-react-core"
import { Favorite, Home, Info, Menu, Invite } from "monday-ui-react-core/icons"
import { Link } from "react-router-dom"

import GalImg from '../assets/img/GalImg.png'
import NatiImg from '../assets/img/NatiImg.png'
import OmerImg from '../assets/img/OmerImg.png'
import { useState } from "react"
import { updateBoard } from "../store/actions/board.action"


export function BoardDetailsHeader({ title, boardId, setIsBoardDesc }) {
    const [boardTitle, setBoardTitle] = useState(title)

    function onRenameBoard() {
        if (title !== boardTitle) {
            updateBoard('board', boardId, null, null, { key: 'title', value: boardTitle })
        }
    }

    return <div className="header-wrapper">
        <div className="header-info">
            <div className="board-header">
                <div className="board-title">
                    <div className="editible-container">
                        <EditableHeading
                            type={EditableHeading.types.h1}
                            value={title}
                            onChange={(newText) => setBoardTitle(newText)}
                            onBlur={() => onRenameBoard()} />

                        <IconButton
                            ariaLabel="Show board description"
                            icon={Info}
                            tooltipProps={{ position: "top" }}
                            onClick={() => setIsBoardDesc((prevIsBoardDesc)=> !prevIsBoardDesc)}
                        />

                        <IconButton
                            className="star-icon"
                            ariaLabel="Add to favorites"
                            icon={Favorite}
                            tooltipProps={{ position: "top" }}
                        />
                    </div>
                    <div className="left-btns">
                        <Button
                            className="btn-avatars"
                            kind="tertiary"
                            // onClick={function noRefCheck() { }}
                            size="small"
                        >
                            Activity
                            <AvatarGroup
                                max={2}
                                size="small"
                            >
                                <Avatar
                                    ariaLabel="Gal Ben Natan"
                                    src={GalImg}
                                    type="img"
                                />
                                <Avatar
                                    ariaLabel="Omer Vered"
                                    src={OmerImg}
                                    type="img"
                                />
                                <Avatar
                                    ariaLabel="Nati Feldbaum"
                                    src={NatiImg}
                                    type="img"
                                />

                            </AvatarGroup>
                        </Button>

                        <Button
                            className="btn-invite"
                            kind="tertiary"
                            leftIcon={Invite}
                            // onClick={function noRefCheck() { }}
                            size="small"
                        >
                            Invite / 3
                        </Button>

                        <IconButton
                            icon={Menu}
                            // onClick={function noRefCheck() { }}
                            size="small"
                        />
                    </div>
                </div>

                <div className="header-description">
                    Manage any type of project. Assign owners, set timelines and keep track of where your project stands.
                    <Link onClick={() => setIsBoardDesc((prevIsBoardDesc)=> !prevIsBoardDesc)} to="#"><span> See More</span></Link>
                    
                </div>
            </div>

            <div className="header-navbar">
                <TabList
                    size="sm">
                    <Tab
                        className="main-table-tab"
                        icon={Home}
                        iconSide="left">
                        Main Table
                    </Tab>
                    <Tab >
                        Dashboard
                    </Tab>
                    <Tab >
                        Kanban
                    </Tab>
                </TabList>
            </div>
        </div>
    </div>
}