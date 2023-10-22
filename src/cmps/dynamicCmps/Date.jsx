
import { useState } from "react";
import { usePopper } from "react-popper";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { Icon } from "monday-ui-react-core";
import { Calendar } from "monday-ui-react-core/icons";

export function Date({ info }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [toggle, setToggle] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })
    function onToggleModal(ev) {
        if (ev.target.closest('.date-picker-container')) return
        ev.stopPropagation()
        setToggle(prev => !prev)
    }

    let footer = <p>Please pick a day.</p>
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>
    }

    return (
        <div className="task-date" ref={setReferenceElement} onClick={(ev) => onToggleModal(ev)}>


            {/* //If there is no date show this on hover */}
            {!info && <div className="no-date-container" >

                <div className="btn-add-member">
                    <div className="line-one"></div>
                    <div className="line-two"></div>
                </div>

                <Icon className="calendar-icon" icon={Calendar} iconSize={20} />
            </div>}

            {/* //If there is date show the date  */}
            {info && <span>{info}</span>}

            {/* //If either being clicked show the date picker and update the "info" in the board and then re render the Date.jsx to show to new date */}
            {toggle && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="date-picker-modal">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                />
                <div ref={setArrowElement} style={styles.arrow} />
            </div>}

        </div>
    );
}

