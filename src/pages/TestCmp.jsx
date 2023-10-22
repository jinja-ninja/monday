import { useState } from "react";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { usePopper } from 'react-popper';
import { createPortal } from "react-dom";


export function TestCmp({ isMenuOpen }) {
  const [selected, setSelected] = useState(null)
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  //add onBlur that updates a state to false and if the state if false the Dialog wont show

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
    />
  )
}

