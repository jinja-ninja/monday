import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { updateTask } from "../../store/actions/board.action";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { utilService } from "../../services/util.service";
import { Icon } from "monday-ui-react-core";
import { CloseSmall, Time } from "monday-ui-react-core/icons";

export function Timeline({ Timeline, boardId, groupId, taskId, groupColor }) {
    const [range, setRange] = useState(null)
    const [isPickerOpen, setIsPickerOpen] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    const pickerCss = `
    .my-selected:not([disabled]) { 
        background-color: var(--primary-color);
        color : white;
      }
      .my-selected:hover:not([disabled]) { 
        background-color: #0060b9;
        color: black;
      }
      .my-today { 
        border-radius: var(--border-radius-small);
        border : 1px solid var(--primary-color);
      }
    `
    useEffect(() => {
        if (range) {
            onChangeTimelineRange()
        }

        document.addEventListener('mousedown', onClosePicker)
        return () => {
            document.removeEventListener('mousedown', onClosePicker)
        }
    }, [range])

    function onClosePicker(ev) {
        if (ev.target.closest('.timeline-picker-modal')) return
        setIsPickerOpen(false)
    }

    function onToggleModal(ev) {
        if (ev.target.closest('.timeline-picker-modal')) return
        ev.stopPropagation()
        setIsPickerOpen(prev => !prev)
    }



    async function onChangeTimelineRange() {
        if (!range.from || !range.to) return
        const fromTimestamp = range.from.getTime()
        const toTimestamp = range.to.getTime()
        let timeline = { from: fromTimestamp, to: toTimestamp }
        // const taskToEdit = { ...task, dueDate: timestamp }
        try {
            //     // const action = {
            //     //     description: taskToEdit.title,
            //     //     fromDate: task.dueDate,
            //     //     toDate: taskToEdit.dueDate,
            //     //     type: 'Date',
            //     // }
            await updateTask(boardId, groupId, taskId, { key: 'timeline', value: timeline })
            showSuccessMsg(`Changed timeline in task ${taskId}`)
        } catch {
            showErrorMsg(`Cant change timeline in task ${taskId}`)
        }
    }

    async function onClearTaskTimeline(ev) {
        ev.stopPropagation()
        setRange(null)
        try {
            await updateTask(boardId, groupId, taskId, { key: 'timeline', value: undefined })
        } catch {
            showErrorMsg('Something went wrong')
        }
    }
    return (
        <div className="task-timeline" ref={setReferenceElement}>
            <div className="timeline-container" onClick={(ev) => onToggleModal(ev)} style={
                (!Timeline || !Timeline.from || !Timeline.to) ?
                    { backgroundColor: '#c4c4c4' } :
                    {
                        background: `linear-gradient(to right,
                        var(--color-${groupColor})${utilService.calculateTimelineProgress(Timeline)}, 
                        #333333 ${utilService.calculateTimelineProgress(Timeline)})`
                    }
            }>

                {!Timeline && <span className="dash">-</span>}
                {!Timeline && <span className="set-dates-txt">Set Dates</span>}
                {Timeline && (Timeline.from && Timeline.to) && (<span className="range-txt">{`${utilService.getTimelineRange(Timeline)}`}</span>)}
                {Timeline && <span className="calculated-days-txt">{utilService.getTimestampInDays(Timeline) + 'd'}</span>}
                {Timeline && <div className="btn-delete-timeline" onClick={(ev) => { onClearTaskTimeline(ev) }}>
                    <Icon size="small" icon={CloseSmall} />
                </div>}
            </div>

            {isPickerOpen && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="timeline-picker-modal">
                <style>{pickerCss}</style>
                <DayPicker
                    numberOfMonths={2}
                    mode="range"
                    defaultMonth={new Date()}
                    selected={range}
                    onSelect={setRange}
                    fixedWeeks
                    modifiersClassNames={{
                        selected: 'my-selected',
                        today: 'my-today'
                    }}
                />
                <div ref={setArrowElement} style={styles.arrow} />
            </div>}

        </div>

    )
}