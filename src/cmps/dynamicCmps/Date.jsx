
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Icon } from "monday-ui-react-core";
import { Calendar, CloseSmall } from "monday-ui-react-core/icons";
import { updateTask } from "../../store/actions/board.action";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { utilService } from "../../services/util.service";

export function Date({ dueDate, taskId, boardId, groupId }) {
    const [selected, setSelected] = useState(null)
    const [isPickerOpen, setIsPickerOpen] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    const pickerCss = `
    .my-selected:not([disabled]) { 
        border-radius: var(--border-radius-small);
        background-color: var(--primary-color);
        color : white;
      }
      .my-selected:hover:not([disabled]) { 
        background-color: #0060b9;
        border : 1px solid black;
        color: black;
      }
      .my-today { 
        border-radius: var(--border-radius-small);
        border-color : var(--primary-color);
      }
    `



    useEffect(() => {
        if (selected) {
            onChangeDueDate()
            setIsPickerOpen(!isPickerOpen)
        }

        //works kinda like onBlur for div
        document.addEventListener('mousedown', onClosePicker)
        return () => {
            document.removeEventListener('mousedown', onClosePicker)
        }
    }, [selected])

    function onClosePicker(ev) {
        if (ev.target.closest('.date-picker-modal')) return
        setIsPickerOpen(false)
    }

    function onToggleModal(ev) {
        if (ev.target.closest('.date-picker-modal')) return
        ev.stopPropagation()
        setIsPickerOpen(prev => !prev)
    }

    async function onChangeDueDate() {
        const timestamp = selected.getTime()
        console.log('timestamp:', timestamp)
        // const taskToEdit = { ...task, dueDate: timestamp }
        try {
            //     // const action = {
            //     //     description: taskToEdit.title,
            //     //     fromDate: task.dueDate,
            //     //     toDate: taskToEdit.dueDate,
            //     //     type: 'Date',
            //     // }
            await updateTask(boardId, groupId, taskId, { key: 'dueDate', value: timestamp })
            showSuccessMsg(`Changed due date in task ${taskId}`)
        } catch {
            showErrorMsg(`Cant change due date in task ${taskId}`)
        }
    }

    async function clearTaskDueDate(ev) {
        ev.stopPropagation()
        try {
            await updateTask(boardId, groupId, taskId, { key: 'dueDate', value: null })
        } catch {
            showErrorMsg('Something went wrong')
        }
    }

    let footer = <p>Please pick a day.</p>
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>
    }

    return (
        <div className="task-date" ref={setReferenceElement} onClick={(ev) => onToggleModal(ev)}>

            {/* //If there is no date show this on hover */}
            {!dueDate && <div className="no-date-container" >

                <div className="btn-add-member">
                    <div className="line-one"></div>
                    <div className="line-two"></div>
                </div>

                <Icon className="calendar-icon" icon={Calendar} iconSize={20} />
            </div>}

            {/* //If there is date show the date  */}
            {dueDate && (
                <div className="date-container">
                    <span className="date-text">
                        {utilService.timeStampToDate(dueDate)}
                    </span>
                    <div className="date-hover-container">
                        <div className="btn-delete-date" onClick={(ev) => { clearTaskDueDate(ev) }}>
                            <Icon size="small" icon={CloseSmall} />
                        </div>
                    </div>
                </div>
            )}


            {isPickerOpen && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="date-picker-modal">
                <style>{pickerCss}</style>
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                    modifiersClassNames={{
                        selected: 'my-selected',
                        today: 'my-today'
                    }}
                />
                <div ref={setArrowElement} style={styles.arrow} />
            </div>}

        </div>
    );
}

