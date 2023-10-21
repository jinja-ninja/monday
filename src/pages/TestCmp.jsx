import { useState } from "react";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Dialog, DialogContentContainer, useSwitch } from "monday-ui-react-core";
export function TestCmp({ isMenuOpen }) {
  const [selected, setSelected] = useState(null)
  const { isChecked: clickOutsideButtonActive, onChange: switchClickOutsideActive } = useSwitch({ defaultChecked: true })

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  //add onBlur that updates a state to false and if the state if false the Dialog wont show
  return (
    <Dialog
      className="date-picker-popup"
      modifiers={[
        {
          name: "preventOverflow",
          options: { mainAxis: false }
        }
      ]}
      tooltip
      position={Dialog.positions.BOTTOM}
      open={isMenuOpen}
      showTrigger={Dialog.hideShowTriggers.CLICK} 
      onClickOutside={switchClickOutsideActive}
      content={
        <DialogContentContainer>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
          />
        </DialogContentContainer>
      }>
    </Dialog >
  )
}