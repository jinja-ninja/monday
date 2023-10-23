import { Button, Dialog, DialogContentContainer, TextField, useSwitch } from "monday-ui-react-core"
import { Edit } from "monday-ui-react-core/icons"
import { useState } from "react"

export function TaskStatus({ task, labels, onUpdateTask, type }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditLabelsOpen, setIsEditLabelsOpen] = useState(false)
    const { isChecked: clickOutsideButtonActive, onChange: switchClickOutsideActive } = useSwitch({ defaultChecked: true })

    function getCurrLabel() {
        if (!task[type]) return labels.find(label => label.title === '')
        else return labels.find(label => label.title === task[type])
    }

    function onSetStatus(status) {
        onUpdateTask(task.id, { key: type, value: status })
    }

    function onEditClicked(ev) {
        ev.stopPropagation()
        setIsEditLabelsOpen(prevState => !prevState)
        setIsMenuOpen(true)
    }

    // console.log(`RENDER`)
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
                onClickOutside={switchClickOutsideActive}
                content={
                    <DialogContentContainer>
                        <div className="label-picker">

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
                                    labels.map(label => {
                                        return <TextField
                                            placeholder="Small"
                                            key={label.id}
                                            className="label"
                                            style={{ backgroundColor: `var(--color-${label.color})` }}
                                            onClick={() => onSetStatus(label.title)} />
                                    }))}

                            <span className="line-break"></span>

                            <Button
                                kind="tertiary"
                                leftIcon={Edit}
                                size="small"
                                onMouseUp={(ev) => onEditClicked(ev)}
                                className="edit-labels-btn">
                                Edit Labels
                            </Button>

                        </div>
                    </DialogContentContainer>
                }>

                <div
                    className="task-status-info"
                    style={{ backgroundColor: `var(--color-${getCurrLabel().color})` }}>
                    {task[type]}

                    <div className="fold-label"></div>
                </div>

            </Dialog >
        </div >
    )
}
