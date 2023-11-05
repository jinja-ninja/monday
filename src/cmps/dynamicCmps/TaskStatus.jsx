import { Button, Dialog, DialogContentContainer, useClickOutside, Icon } from "monday-ui-react-core"
import { AddSmall, Edit, Alert } from "monday-ui-react-core/icons"
import { useCallback, useRef, useState } from "react"
import { EditableLabel } from "./EditableLabel"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { addLabel, removeLabel, updateBoard, updateBoardOptimistic, updateLabel } from "../../store/actions/board.action"
import { boardService } from "../../services/board.service.local"

export function TaskStatus({ board, task, labels, type, onUpdateTask }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditLabelsOpen, setIsEditLabelsOpen] = useState(false)
    const refLabelDialog = useRef(null)

    let statusOrPriorities
    if (type === 'priority') {
        statusOrPriorities = 'priorities'
    } else if (type = 'status') {
        statusOrPriorities = 'labels'
    }

    async function onSetStatus(status) {
        await onUpdateTask(task.id, { key: type, value: status })
        
        if (board.kanbanCmpsOrder && !board.kanbanCmpsOrder.includes(status)) {
            board.kanbanCmpsOrder.unshift(status)
            await updateBoard('board', board._id, null, null, { key: 'kanbanCmpsOrder', value: board.kanbanCmpsOrder })
        }
    }

    function isLabelInUse(labelId) {
        if (!board) return

        let isInUse = false
        const label = board[statusOrPriorities].find(label => label.id === labelId)
        const groups = board.groups

        groups.forEach(group => {
            const tasks = group.tasks
            tasks.forEach(task => {
                if (task[type] === label.title) isInUse = true
            })
        })
        console.log('isInUse:', isInUse)
        return isInUse
    }

    function getCurrLabel() {
        if (!task[type]) return labels.find(label => label.title === '')
        else return labels.find(label => label.title === task[type])
    }

    function onEditLabelsClicked(ev) {
        ev.stopPropagation()
        setIsEditLabelsOpen(prevState => !prevState)
        setIsMenuOpen(true)
    }

    async function onAddLabel(ev) {
        ev.stopPropagation()
        try {
            const label = await boardService.getEmptyLabel()
            await addLabel(board._id, label, statusOrPriorities)
            showSuccessMsg(`New label added`)
        } catch (err) {
            showErrorMsg(`Cannot add label`)
        }
    }

    async function onRemoveLabel(ev, labelId) {
        ev.stopPropagation()
        if (isLabelInUse(labelId)) {
            showErrorMsg(`Cannot delete a label while in use`)
            return
        }
        try {
            await removeLabel(board._id, labelId, statusOrPriorities)
            showSuccessMsg(`Label removed ${labelId}`)
        } catch (err) {
            showErrorMsg(`Cannot remove label ${labelId}`)
        }
    }

    async function onUpdateLabel(boardId, label, statusOrPriorities) {
        if (isLabelInUse(label.id)) {
            showErrorMsg(`Cannot edit a label while in use`)
            return
        }
        else if (labels.some(l => l.title === label.title)) {
            showErrorMsg(`Label title is already in use`)
            return
        }

        try {
            updateLabel(boardId, label, statusOrPriorities)
            showSuccessMsg(`Label ${label.id} updated successfully`)
        } catch (err) {
            showErrorMsg(`Cannot update label ${label.id}`)
        }
    }

    const onClickOutsideLabels = useCallback(() => {
        setIsMenuOpen(false)
        setIsEditLabelsOpen(false)
    }, [])

    useClickOutside({
        ref: refLabelDialog,
        callback: onClickOutsideLabels
    })

    return (
        <div className="task-status" onClick={() => setIsMenuOpen(prevState => !prevState)}>
            <Dialog modifiers={[{
                name: "preventOverflow",
                options: { mainAxis: false }
            }]}
                tooltip
                position={Dialog.positions.BOTTOM}
                open={isMenuOpen}
                showTrigger={[Dialog.hideShowTriggers.CLICK]}
                content={
                    <DialogContentContainer ref={refLabelDialog}>
                        <div className="label-picker" >

                            {!isEditLabelsOpen ?
                                (labels.map(label => {
                                    return <div
                                        key={label.id}
                                        className="label"
                                        style={{ backgroundColor: `var(--color-${label.color})` }}
                                        onClick={() => onSetStatus(label.title)}
                                    >
                                        {label.title}
                                    </div>
                                })
                                ) : (
                                    <>
                                        {labels.map(label =>
                                            <EditableLabel
                                                boardId={board._id}
                                                key={`label-${label.id}`}
                                                label={label}
                                                statusOrPriorities={statusOrPriorities}
                                                onRemoveLabel={onRemoveLabel}
                                                onUpdateLabel={onUpdateLabel} />
                                        )}

                                        <Button
                                            kind="secondary"
                                            leftIcon={AddSmall}
                                            size="small"
                                            onClick={(ev) => onAddLabel(ev)}
                                            className="add-labels-btn">
                                            New label
                                        </Button>
                                    </>
                                )
                            }

                            <span className="line-break"></span>

                            {!isEditLabelsOpen ?
                                <Button
                                    kind="tertiary"
                                    leftIcon={Edit}
                                    size="small"
                                    onClick={(ev) => onEditLabelsClicked(ev)}
                                    className="edit-labels-btn">
                                    Edit Labels
                                </Button>
                                :
                                <Button
                                    kind="tertiary"
                                    size="small"
                                    onClick={(ev) => onEditLabelsClicked(ev)}
                                    className="apply-labels-btn">
                                    Apply
                                </Button>
                            }

                        </div>
                    </DialogContentContainer>
                }>

                <div
                    className="task-status-info"
                    style={{ backgroundColor: `var(--color-${getCurrLabel().color})` }}>
                    {task[type] === "Critical" ?
                        <div className="critical-priority-container">
                            <span>{task[type]}</span>
                            <Icon icon={Alert} iconSize={17} />
                        </div>
                        : task[type]}
                    <div className="fold-label"></div>
                </div>

            </Dialog >
        </div >
    )
}


