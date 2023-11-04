import { useEffect, useState } from "react"
import { Button, IconButton, MenuButton, MenuItem, SearchComponent, Menu, EditableHeading, Search as SearchInput } from "monday-ui-react-core"
import { Add, Board, Delete, Home, Edit, Favorite, Work, Search, Workspace } from "monday-ui-react-core/icons"
import { useDispatch, useSelector } from "react-redux"
import { BoardNavLink } from "./BoardNavLink"
import { addBoard, duplicateBoard, loadBoards, removeBoard, toggleBoardFavorite, updateBoard } from "../store/actions/board.action"
import { useNavigate, useParams } from "react-router"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import FavoriteGIF from '../assets/img/FavoriteGIF.gif'
import NoGroupsFoundImg from '../assets/img/NoGroupsFoundImg.svg'
import { utilService } from "../services/util.service"

export function SideBar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isHover, setIsHover] = useState(false)

    const [filterByTxt, setFilterByTxt] = useState('')
    const [isFavorites, setIsFavorites] = useState('main')
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const currBoard = useSelector((storeState => storeState.boardModule.board))
    const navigate = useNavigate()

    useEffect(() => {
        loadBoards()
    }, [boards.length])

    function getBoardsToShow() {
        if (isFavorites === 'main') return boards.filter(board => board.title.toLowerCase().includes(filterByTxt.toLowerCase()))
        else if (isFavorites === 'favorites') return boards.filter(board => board.isStarred)
    }

    function handleContainerMouseEnter(ev) {
        if (ev.target === ev.currentTarget) {
            setIsHover(true)
        }
    }

    function handleContainerMouseLeave() {
        setIsHover(false)
    }

    function onSelectBoard(boardId) {
        navigate(`/board/${boardId}`)
        console.log('board clicked - display board in BoardDetails', boardId)
    }

    async function onDeleteBoard(boardId) {
        let isCurrentBoard = currBoard._id === boardId
        try {
            await removeBoard(boardId, isCurrentBoard, currBoard.title)
            showSuccessMsg(`We successfully deleted the board ${boardId}`)
        }
        catch (err) {
            showErrorMsg(`Cannot remove board from workspace (id: ${boardId})`)
        }
    }

    function onRenameBoard(boardId, newText) {
        console.log('Rename Board', boardId)
        console.log('newText:', newText)
        updateBoard('board', boardId, null, null, { key: 'title', value: newText })
    }

    async function onAddBoard() {
        let boardId = await addBoard()
        console.log('boardId:', boardId)
        navigate(`/board/${boardId}`)
        console.log('Add new empty Board')
    }

    function onToggleFavoriteBoard(boardId) {
        let isCurrentBoard = currBoard._id === boardId
        console.log('isCurrentBoard:', isCurrentBoard)
        toggleBoardFavorite(boardId, isCurrentBoard)
        console.log('toggle Board FAVORITE!:', boardId)
    }

    async function onDuplicateBoard(boardId) {
        let duplicatedBoard = await duplicateBoard(boardId)
        navigate(`/board/${duplicatedBoard._id}`)
    }

    const dynOpenCloseClass = isOpen ? 'open' : ''

    return (
        <div
            className={"side-bar-container " + dynOpenCloseClass + (isHover && !isOpen ? 'hovered' : '')}
            onMouseEnter={(ev) => handleContainerMouseEnter(ev)}
            onMouseLeave={handleContainerMouseLeave}
        >

            <div className="side-bar-upper-container">

                <button onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(prevIsOpen => !prevIsOpen)
                }
                } className="btn-open-close">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" role="button" tabIndex="0" aria-hidden="false" className="open-close-arrow icon_bff579c0cd collapse-icon clickable_2774bbf3f2 noFocusStyle_d1e810e473" data-testid="icon">
                        <path d="M14.5303 10.5303L14 10L14.5303 9.46967C14.8232 9.76256 14.8232 10.2374 14.5303 10.5303ZM7.93934 10L1.46967 16.4697C1.17678 16.7626 1.17678 17.2374 1.46967 17.5303C1.76256 17.8232 2.23744 17.8232 2.53033 17.5303L9.53033 10.5303L9 10L9.53033 9.46967L2.53033 2.46967C2.23744 2.17678 1.76256 2.17678 1.46967 2.46967C1.17678 2.76256 1.17678 3.23744 1.46967 3.53033L7.93934 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" ></path>
                    </svg>
                </button>

                <Button
                    className="home-btn"
                    kind="tertiary"
                    leftIcon={Home}
                    onClick={(() => navigate('/'))}
                >
                    Home
                </Button>

                <Button
                    className="home-btn workspace-btn"
                    kind="tertiary"
                    leftIcon={Workspace}
                    onClick={(() => navigate('/board'))}
                >
                    Workspace
                </Button>
            </div>

            <div className="side-bar-lower-container">

                <div className="workspace-container">
                    {isFavorites === 'main' && <div className="main-workspace-txt">
                        <span>M
                            <svg width="14" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.22795 4.46279L5.35212 1.27593C5.35233 1.27578 5.35192 1.27609 5.35212 1.27593C5.3522 1.27587 5.35288 1.27535 5.35295 1.27529C5.68131 1.02149 6.0846 0.883789 6.49962 0.883789C6.91465 0.883789 7.31794 1.02149 7.6463 1.27529C7.64654 1.27548 7.64605 1.2751 7.6463 1.27529C7.64633 1.27532 7.64709 1.2759 7.64713 1.27593L11.7706 4.46227C11.9971 4.63725 12.1812 4.86228 12.3075 5.11913C12.434 5.37624 12.4998 5.6589 12.5 5.9454V12.0088C12.5 12.5061 12.3025 12.983 11.9508 13.3347C11.5992 13.6863 11.1223 13.8838 10.625 13.8838H7.625C7.20885 13.8838 6.80855 13.7301 6.5 13.4541C6.19145 13.7301 5.79115 13.8838 5.375 13.8838H2.375C1.87772 13.8838 1.40081 13.6863 1.04917 13.3347C0.697543 12.983 0.5 12.5061 0.5 12.0088V5.94652C0.5 5.94646 0.5 5.94658 0.5 5.94652C0.499948 5.66079 0.565197 5.37865 0.690772 5.12198C0.816548 4.86491 0.999504 4.64003 1.22563 4.46459L1.22795 4.46279ZM2 5.94634C1.99995 5.8891 2.013 5.83261 2.03815 5.7812C2.06331 5.72978 2.0999 5.68481 2.14513 5.64972L6.27012 2.46222C6.33583 2.41138 6.41655 2.38379 6.49962 2.38379C6.5827 2.38379 6.66342 2.41138 6.72913 2.46222L10.8541 5.64972C10.8995 5.68473 10.9362 5.72967 10.9615 5.78109C10.9868 5.83251 11 5.88904 11 5.94634V12.0088C11 12.1083 10.9605 12.2037 10.8902 12.274C10.8198 12.3443 10.7245 12.3838 10.625 12.3838H7.625C7.57527 12.3838 7.52758 12.3641 7.49242 12.3289C7.45725 12.2938 7.4375 12.2461 7.4375 12.1963V9.50884C7.4375 9.2602 7.33873 9.02175 7.16291 8.84593C6.9871 8.67011 6.74864 8.57134 6.5 8.57134C6.25136 8.57134 6.0129 8.67011 5.83709 8.84593C5.66127 9.02175 5.5625 9.2602 5.5625 9.50884V12.1963C5.5625 12.2461 5.54275 12.2938 5.50758 12.3289C5.47242 12.3641 5.42473 12.3838 5.375 12.3838H2.375C2.27554 12.3838 2.18016 12.3443 2.10984 12.274C2.03951 12.2037 2 12.1083 2 12.0088V5.94634Z" fill="white"></path><path d="M11 5.94634C11 5.88904 10.9868 5.83251 10.9615 5.78109C10.9362 5.72967 10.8995 5.68473 10.8541 5.64972L6.72913 2.46222C6.66342 2.41138 6.5827 2.38379 6.49962 2.38379C6.41655 2.38379 6.33583 2.41138 6.27012 2.46222L2.14513 5.64972C2.0999 5.68481 2.06331 5.72978 2.03815 5.7812C2.013 5.83261 1.99995 5.8891 2 5.94634V12.0088C2 12.1083 2.03951 12.2037 2.10984 12.274C2.18016 12.3443 2.27554 12.3838 2.375 12.3838H5.375C5.42473 12.3838 5.47242 12.3641 5.50758 12.3289C5.54275 12.2938 5.5625 12.2461 5.5625 12.1963V9.50884C5.5625 9.2602 5.66127 9.02175 5.83709 8.84593C6.0129 8.67011 6.25136 8.57134 6.5 8.57134C6.74864 8.57134 6.9871 8.67011 7.16291 8.84593C7.33873 9.02175 7.4375 9.2602 7.4375 9.50884V12.1963C7.4375 12.2461 7.45725 12.2938 7.49242 12.3289C7.52758 12.3641 7.57527 12.3838 7.625 12.3838H10.625C10.7245 12.3838 10.8198 12.3443 10.8902 12.274C10.9605 12.2037 11 12.1083 11 12.0088V5.94634Z" fill="#323338"></path></svg>
                        </span>
                        <h4>Main workspace</h4>
                    </div>}

                    {isFavorites === 'favorites' && <div className="favorite-title">
                        <svg viewBox="0 0 20 20" fill="var(--color-egg_yolk)" width="20" height="20" aria-hidden="true" className="star-icon icon_5270a679af star-component-button-icon star-component-button-icon-on noFocusStyle_0c365cd2de" data-testid="icon"><path d="M11.2336 3.01626L10.5614 3.34904L11.234 3.01724L13.0145 6.62645L17.0025 7.20743C17.256 7.24569 17.4938 7.354 17.6891 7.52016C17.8843 7.68632 18.0293 7.90371 18.1076 8.14784C18.1859 8.39196 18.1945 8.65312 18.1324 8.90186C18.0703 9.15018 17.9403 9.37628 17.7569 9.55475L17.7559 9.55566L14.8738 12.3658L15.5539 16.3359L15.5542 16.3378C15.5984 16.5918 15.5704 16.8532 15.4733 17.0922C15.3759 17.3317 15.2131 17.5389 15.0034 17.6901C14.7937 17.8414 14.5457 17.9305 14.2877 17.9473C14.0313 17.964 13.7754 17.9085 13.5489 17.7874L9.99916 15.9209L6.4403 17.793C6.21381 17.9142 5.95789 17.9697 5.70148 17.953C5.44349 17.9362 5.19545 17.8471 4.98577 17.6958C4.77609 17.5446 4.61324 17.3374 4.51589 17.0979C4.41876 16.8589 4.39073 16.5975 4.43499 16.3434L4.4353 16.3417L5.11535 12.3715L2.23779 9.55909L2.23676 9.55808C2.05337 9.37963 1.92336 9.15357 1.86134 8.90529C1.79921 8.65655 1.80779 8.39539 1.88612 8.15127C1.96445 7.90714 2.10941 7.68974 2.30467 7.52359C2.49993 7.35743 2.73772 7.24912 2.99123 7.21086L2.99453 7.21037L6.9838 6.6265L8.76473 3.01626C8.87864 2.78619 9.05458 2.59254 9.27269 2.45714C9.49081 2.32175 9.74242 2.25 9.99915 2.25C10.2559 2.25 10.5075 2.32175 10.7256 2.45714C10.9437 2.59254 11.1197 2.78619 11.2336 3.01626Z"></path></svg>
                        <span>Favorties</span>
                    </div>}

                    <MenuButton closeDialogOnContentClick className="workspace-menu-btn" size={MenuButton.sizes.S}>
                        <Menu id="menu" size={Menu.sizes.MEDIUM}>
                            <MenuItem onClick={() => {
                                setFilterByTxt('')
                                setIsFavorites('favorites')
                            }}
                                icon={Favorite} iconType={MenuItem.iconType.SVG} title="Favorites" />
                            <MenuItem onClick={() => {
                                setFilterByTxt('')
                                setIsFavorites('main')
                            }}
                                icon={Work} iconType={MenuItem.iconType.SVG} title="Main workspace" />
                        </Menu>
                    </MenuButton>

                </div>

                {isFavorites === 'main' && <div className="search-and-add-container">


                    <SearchInput
                        id="filter-search-input"
                        className="search-input"
                        autoFocus
                        debounceRate={200}
                        iconName={Search}
                        value={filterByTxt}
                        onChange={(textFilter) => setFilterByTxt(textFilter)}
                        placeholder="Search"
                        size="small"
                        wrapperClassName="monday-storybook-search_size"
                    />

                    <IconButton
                        ariaLabel="Add item to workspace"
                        icon={Add}
                        kind="primary"
                        onClick={() => onAddBoard()}
                        size="small"
                        className="btn-add"
                    />

                </div>}

                <div className="boards-btns-container">
                    {boards && getBoardsToShow().length > 0 ? getBoardsToShow().map((board, idx) => {
                        return (
                            <BoardNavLink
                                text={board.title}
                                boardId={board._id}
                                onSelectBoard={onSelectBoard}
                                isStarred={board.isStarred}
                                onDeleteBoard={onDeleteBoard}
                                onRenameBoard={onRenameBoard}
                                onToggleFavoriteBoard={onToggleFavoriteBoard}
                                onDuplicateBoard={onDuplicateBoard}
                                currBoard={currBoard}
                                key={idx} />
                        )
                    })
                        :
                        isFavorites === 'main' && <div className="no-boards-to-show">
                            <img src={NoGroupsFoundImg} alt="" />
                            <p className="first-p">No results found</p>
                            <p className="second-p">Please check your search terms</p>
                            <p className="third-p">or filters.</p>
                        </div>
                    }

                </div>

                {isFavorites === 'favorites' && getBoardsToShow().length == 0 && (
                    <div className="empty-favorites-container">
                        <img src={FavoriteGIF} alt="" />
                        <span>No favorite boards yet</span>
                        <p>"Star" any board so that you can easily access it later</p>
                    </div>
                )}

            </div>
        </div >
    )
}