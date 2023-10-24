import { Button, Dialog, DialogContentContainer, useClickOutside, Icon } from "monday-ui-react-core"
import { AddSmall, Edit, Alert } from "monday-ui-react-core/icons"
import { useCallback, useRef, useState } from "react"
import { EditableLabel } from "./EditableLabel"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { addLabel, removeLabel, updateLabel } from "../../store/actions/board.action"
import { boardService } from "../../services/board.service.local"

export function TaskStatus({ board, task, labels, type, onUpdateTask }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditLabelsOpen, setIsEditLabelsOpen] = useState(false)
    const refLabelDialog = useRef(null)

    function onSetStatus(status) {
        onUpdateTask(task.id, { key: type, value: status })
    }

    function isLabelInUse(labelId) {
        if (!board) return

        let isInUse = false
        const label = board.labels.find(label => label.id === labelId)
        const groups = board.groups

        groups.forEach(group => {
            const tasks = group.tasks
            tasks.forEach(task => {
                if (task.status === label.title) isInUse = true
            })
        })
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
            await addLabel(board._id, label)
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
            await removeLabel(board._id, labelId)
            showSuccessMsg(`Label removed ${labelId}`)
        } catch (err) {
            showErrorMsg(`Cannot remove label ${labelId}`)
        }
    }

    async function onUpdateLabel(boardId, label) {
        try {
            updateLabel(boardId, label)
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


