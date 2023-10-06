import { Button, Checkbox, DialogContentContainer, EditableHeading, Loader, Modal, ModalContent, ModalFooterButtons, ModalHeader, Search, SearchComponent } from "monday-ui-react-core"
import { Date } from "./dynamicCmps/Date"
import { Member } from "./dynamicCmps/Member"
import { Priority } from "./dynamicCmps/Priority"
import { Side } from "./dynamicCmps/Side"
import { Status } from "./dynamicCmps/Status"
import { TaskTitle } from "./dynamicCmps/TaskTitle"
import { boardService } from "../services/board.service.local"
import { useSelector } from "react-redux"
import { addTask, removeTask, updateTask, duplicatedTask } from "../store/actions/board.action"
import { useCallback, useRef, useState } from "react"
import { MenuButton, Menu, MenuItem } from "monday-ui-react-core"
import { Delete, Edit, Duplicate, Upgrade } from "monday-ui-react-core/icons"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function TaskList({ group, cmpsOrder }) {

    const currBoard = useSelector(state => state.boardModule.board)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [addTaskInput, setAddTask] = useState('+ Add Item ')
    const [show, setShow] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const [loading, setLoading] = useState(false)
    const openModalButtonRef = useRef()
    const closeModal = useCallback(() => {
        setShow(false);
    }, []);



    const boardId = currBoard._id
    const groupId = group.id

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    async function onRemoveTask(taskId) {
        try {
            await removeTask(boardId, groupId, taskId)
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    async function onAddTask(task) {
        try {
            const newTask = boardService.getEmptyTask()
            console.log('newTask:', newTask)
            newTask.title = task
            await addTask(boardId, groupId, newTask)
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    async function onUpdateTask(taskId, data = {}) {
        try {
            await updateTask(boardId, groupId, taskId, data)
            showSuccessMsg('Task removed')
        } catch (err) {
            showErrorMsg('Cannot remove task')
        }
    }

    async function onDuplicateTask(taskId) {

        try {
            await duplicatedTask(boardId, groupId, taskId)
            showSuccessMsg('We successfully duplicated your task!')
        } catch (err) {
            showErrorMsg('Cannot duplicate task')
        }
    }

    function renderMenuButton(taskId) {
        return (
            <MenuButton size={MenuButton.sizes.XS}
                className={`task-menu-btn `}
                onClick={toggleMenu}>

                <Menu id="menu" size="medium">
                    <MenuItem
                        icon={Delete}
                        iconType="SVG"
                        onClick={() => {
                            setShow(true)
                            setTaskId(taskId)
                        }
                        }
                        title="Delete" />
                    <MenuItem
                        icon={Edit}
                        iconType="SVG"
                        onClick={() => handleEditClick(group.id)}
                        title="Rename Task" />
                    <MenuItem
                        icon={Duplicate}
                        iconType="SVG"
                        onClick={() => onDuplicateTask(taskId)}
                        title="Duplicate this Task" />
                </Menu>

            </MenuButton>
        )
    }

    function renderDynamicCmp(cmp, task) {
        let info
        switch (cmp) {
            case "side":
                return <Side info={group['style']} />
            case "priority":
                return <Priority info={task[cmp]} />
            case "title":
                return <TaskTitle info={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    onUpdateTask={onUpdateTask} />
            case "status":
                return <Status info={task[cmp]} />
            case "memberIds":
                return <Member info={task[cmp]} />
            case "dueDate":
                return <Date info={task[cmp]} />

            default:
                break
        }
    }

    return <div className="task-list-container">

        <section className="header-title-container group-grid">
            {cmpsOrder.map((title, idx) => {
                if (idx === 0) return <div className="header-title-side-wrapper" key={idx}>
                    <div className="header-title-side">
                        <div className="color-indicator"
                            style={{
                                backgroundColor: `var(--color-${group.style})`
                            }}>
                        </div>

                        <div className="task-select">
                            <Checkbox ariaLabel="Select task" />
                        </div>
                    </div>
                </div>
                return <div className="header-title" key={idx}>{title}</div>
            }
            )}
        </section>

        {group.tasks.map(task => {
            return (<section className="task-list group-grid" key={task.id}>
                {console.log('task:', task)}
                {renderMenuButton(task.id)}
                {cmpsOrder.map((cmp, idx) =>
                    <section className="task-item" key={idx}>
                        {renderDynamicCmp(cmp, task)}
                    </section>
                )}
            </section>
            )
        })}

        <section className="task-list-add group-grid">

            <div className="task-list-add-side">
                <div className="color-indicator"
                    style={{
                        backgroundColor: `var(--color-${group.style})`
                    }}>
                </div>

                <div className="task-select">
                    <Checkbox disabled ariaLabel="Select task" />
                </div>
            </div>

            <EditableHeading className="task-add-btn"
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onBlur={() => {
                    addTaskInput ? onAddTask(addTaskInput) : setAddTask('+ Add Item ')
                    setAddTask('+ Add Item')
                }}
                onStartEditing={() => setAddTask('')}
                onChange={(value) => setAddTask(value)} />

        </section>

        <section className="task-list-summary-wrapper group-grid">

            <div className="task-list-summary-emptycell-left"></div>
            <div className="task-list-summary">StatusSum</div>

        </section>

        <>

            <Modal id="story-book-modal" title="Modal title" triggerElement={openModalButtonRef.current} show={show} onClose={closeModal} // Width prop effects on the modal width
                width={Modal.width.DEFAULT} contentSpacing>
                <ModalHeader title={"Delete"} iconSize={32} />
                <ModalContent>Delete this item? </ModalContent>
                <ModalFooterButtons primaryButtonText="Delete" secondaryButtonText="Cancel" onPrimaryButtonClick={() => {
                    onRemoveTask(taskId)
                    closeModal()
                }
                } onSecondaryButtonClick={closeModal} />
            </Modal>
        </>

    </div>


    {/* <Flex direction={Flex.directions.ROW} gap={Flex.gaps.SMALL}>
      <StoryDescription description="Xs" vertical align={Flex.align.START}>
        <div className="monday-storybook-loader_size-variants_container">
          <Loader size={Loader.sizes.XS} />
        </div>
      </StoryDescription>
</Flex> */}
}