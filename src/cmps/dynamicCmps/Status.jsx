import { Dialog, DialogContentContainer, Label } from "monday-ui-react-core"
import { useState } from "react"

export function Status({ info }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function openStatusMenu() {
        // open the menu
    }

    return <div className="task-status" onClick={() => setIsMenuOpen(prevState => !prevState)}>

        <Dialog modifiers={[{
            name: "preventOverflow",
            options: {
                mainAxis: false
            }
        }]}
            position={Dialog.positions.BOTTOM}
            showTrigger={[]}
            hideTrigger={[]}
            open={isMenuOpen}
            content={<DialogContentContainer>
                <Label text="Working on it" />
                <Label text="Stuck" color={Label.colors.NEGATIVE} />
                <Label text="Done" color={Label.colors.POSITIVE} />
            </DialogContentContainer>}>
            <div
                // style={{ backgroundColor: `var(--color-${info})`, color: 'white' }}
                className={`task-status ${info?.toLowerCase().split(' ').join('-')}`}
                onClick={() => openStatusMenu()}>
                {info}
            </div>
        </Dialog>

    </div>
}