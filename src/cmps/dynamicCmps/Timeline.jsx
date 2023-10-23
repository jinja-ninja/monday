import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { updateTask } from "../../store/actions/board.action";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { utilService } from "../../services/util.service";

export function Timeline({ boardId, groupId, taskId }) {

    const [range, setRange] = useState(null)
    const [isPickerOpen, setIsPickerOpen] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    useEffect(() => {
        if (range) {
            // onChangeDueDate()
            setIsPickerOpen(!isPickerOpen)
        }

        //works kinda like onBlur for div
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

    let footer = <p>Please pick a day.</p>
    if (range) {
        footer = <p>You picked {format(range, 'PP')}.</p>
    }

    return (
        <div className="task-timeline">
            <div className="timeline-container" onClick={(ev) => onToggleModal(ev)}>
                <span className="dash">-</span>
                <span className="set-dates-txt">Set Dates</span>
            </div>


            {isPickerOpen && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="timeline-picker-modal">
                {/* <style>{pickerCss}</style> */}
                <DayPicker
                    numberOfMonths={2}
                    mode="range"
                    defaultMonth={new Date()}
                    selected={range}
                    onSelect={setRange}
                    showOutsideDays
                    fixedWeeks
                    modifiersClassNames={{
                        today: 'my-today',
                    }}
                    
                />
                <div ref={setArrowElement} style={styles.arrow} />
            </div>}

        </div>

    )
}