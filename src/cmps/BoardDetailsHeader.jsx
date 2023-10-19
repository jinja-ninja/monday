import { Avatar, AvatarGroup, Button, EditableHeading, IconButton, Tab, TabList, Tooltip } from "monday-ui-react-core"
import { Favorite, Home, Info, Menu, Invite } from "monday-ui-react-core/icons"
import { Link } from "react-router-dom"
import GalImg from '../assets/img/GalImg.png'
import NatiImg from '../assets/img/NatiImg.png'
import OmerImg from '../assets/img/OmerImg.png'
import { useEffect, useState } from "react"
import { toggleBoardFavorite, updateBoard } from "../store/actions/board.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function BoardDetailsHeader({ title, boardId, setIsBoardDesc, isStarred }) {
    const [boardTitle, setBoardTitle] = useState(title)
    const [isCollapse, setIsCollapse] = useState(true)
    const [DynIsScrolledClass, setDynIsScrolledClass] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            const isAtTop = window.scrollY === 0
            //check if its better to use if and only then update the state
            setDynIsScrolledClass(isAtTop ? '' : 'hide-collapse-btn')
            setIsCollapse(isAtTop)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function onRenameBoard() {
        try {
            if (title !== boardTitle) {
                updateBoard('board', boardId, null, null, { key: 'title', value: boardTitle })
            }
            showSuccessMsg(`Board ${boardId} has been renamed`)
        } catch (err) {
            showErrorMsg(`Cannot rename board ${boardId}`)
        }
    }

    const dynStarIcon = isStarred ?
        <Tooltip
            content="Remove from favorites"
            animationType="expand">
            <span onClick={() => toggleBoardFavorite(boardId)} className="star-icon-container">
                <svg viewBox="0 0 20 20" fill="var(--color-egg_yolk)" width="20" height="20" aria-hidden="true" className="star-icon icon_5270a679af star-component-button-icon star-component-button-icon-on noFocusStyle_0c365cd2de" data-testid="icon"><path d="M11.2336 3.01626L10.5614 3.34904L11.234 3.01724L13.0145 6.62645L17.0025 7.20743C17.256 7.24569 17.4938 7.354 17.6891 7.52016C17.8843 7.68632 18.0293 7.90371 18.1076 8.14784C18.1859 8.39196 18.1945 8.65312 18.1324 8.90186C18.0703 9.15018 17.9403 9.37628 17.7569 9.55475L17.7559 9.55566L14.8738 12.3658L15.5539 16.3359L15.5542 16.3378C15.5984 16.5918 15.5704 16.8532 15.4733 17.0922C15.3759 17.3317 15.2131 17.5389 15.0034 17.6901C14.7937 17.8414 14.5457 17.9305 14.2877 17.9473C14.0313 17.964 13.7754 17.9085 13.5489 17.7874L9.99916 15.9209L6.4403 17.793C6.21381 17.9142 5.95789 17.9697 5.70148 17.953C5.44349 17.9362 5.19545 17.8471 4.98577 17.6958C4.77609 17.5446 4.61324 17.3374 4.51589 17.0979C4.41876 16.8589 4.39073 16.5975 4.43499 16.3434L4.4353 16.3417L5.11535 12.3715L2.23779 9.55909L2.23676 9.55808C2.05337 9.37963 1.92336 9.15357 1.86134 8.90529C1.79921 8.65655 1.80779 8.39539 1.88612 8.15127C1.96445 7.90714 2.10941 7.68974 2.30467 7.52359C2.49993 7.35743 2.73772 7.24912 2.99123 7.21086L2.99453 7.21037L6.9838 6.6265L8.76473 3.01626C8.87864 2.78619 9.05458 2.59254 9.27269 2.45714C9.49081 2.32175 9.74242 2.25 9.99915 2.25C10.2559 2.25 10.5075 2.32175 10.7256 2.45714C10.9437 2.59254 11.1197 2.78619 11.2336 3.01626Z"></path></svg>
            </span>
        </Tooltip>

        :
        <IconButton
            className="star-icon"
            ariaLabel="Add to favorites"
            icon={Favorite}
            tooltipProps={{ position: "top" }}
            onClick={() => toggleBoardFavorite(boardId)}
        />
    const dynCollapseBtnClass = isCollapse ? '' : 'collapseBtn'
    const dynCollapseHeaderNavClass = isCollapse ? '' : 'collapse-header-navbar'
    const dynCollapseTabsClass = isCollapse ? '' : 'collapse-tabs'

    return <div className="header-wrapper">
        <div className="header-info">
            <div className="board-header">
                <div className="board-title">
                    <div className="editible-container">
                        {isCollapse &&
                            <Tooltip
                                content='Click to edit'
                                animationType="expand">
                                <EditableHeading
                                    type={EditableHeading.types.h1}
                                    value={title}
                                    onChange={(newText) => setBoardTitle(newText)}
                                    onBlur={() => onRenameBoard()} />
                            </Tooltip>
                        }
                        {isCollapse && <IconButton
                            ariaLabel="Show board description"
                            icon={Info}
                            tooltipProps={{ position: "top" }}
                            onClick={() => setIsBoardDesc((prevIsBoardDesc) => !prevIsBoardDesc)}
                        />}
                        {isCollapse && dynStarIcon}

                        {/* <IconButton
                            className="star-icon"
                            ariaLabel="Add to favorites"
                            icon={Favorite}
                            tooltipProps={{ position: "top" }}
                        /> */}
                    </div>
                    {isCollapse && <div className="left-btns">
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
                    </div>}
                </div>

                {isCollapse && <div className="header-description">
                    Manage any type of project. Assign owners, set timelines and keep track of where your project stands.
                    <Link onClick={() => setIsBoardDesc((prevIsBoardDesc) => !prevIsBoardDesc)} to="#"><span> See More</span></Link>

                </div>}
            </div>

            <div className={"header-navbar " + dynCollapseHeaderNavClass}>
                {!isCollapse &&
                 <EditableHeading
                    className="collapse-heading"
                    type={EditableHeading.types.h2}
                    value={title}
                    onChange={(newText) => setBoardTitle(newText)}
                    onBlur={() => onRenameBoard()} />}
                <TabList
                    className={dynCollapseTabsClass}
                    size="sm">
                    <Tab
                        className="main-table-tab"
                        icon={Home}
                        iconSide="left">
                        Main Table
                    </Tab>
                    <Tab >
                        Kanban
                    </Tab>
                    <Tab >
                        Dashboard
                    </Tab>
                </TabList>
                {/* {!isCollapse && <div className="left-btns">
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
                </div>} */}
                <div onClick={() => setIsCollapse(prevIsCollapse => !prevIsCollapse)} className={"btn-collapse-header " + dynCollapseBtnClass + " " + DynIsScrolledClass}><svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" className="icon_5270a679af direction-icon expand-mode noFocusStyle_0c365cd2de" data-testid="icon"><path d="M9.46967 7.46967L10 8L10.5303 7.46967C10.2374 7.17678 9.76256 7.17678 9.46967 7.46967ZM10 9.06066L13.4697 12.5303C13.7626 12.8232 14.2374 12.8232 14.5303 12.5303C14.8232 12.2374 14.8232 11.7626 14.5303 11.4697L10.5303 7.46967L10 8L9.46967 7.46967L5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10 9.06066Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>

            </div>
        </div>
    </div>
}