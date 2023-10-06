import { Button, Dialog, DialogContentContainer, Label } from "monday-ui-react-core"
import { Edit } from "monday-ui-react-core/icons"
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
            tooltip
            style={{ backgroundColor: 'green' }}
            position={Dialog.positions.BOTTOM}
            open={isMenuOpen}
            content={<DialogContentContainer>
                <div className="label-picker" onBlur={() => setIsMenuOpen(prevState => !prevState)}>
                    <Label className="label" text="Working on it" />
                    <Label className="label" text="Stuck" color={Label.colors.NEGATIVE} />
                    <Label className="label" text="Done" color={Label.colors.POSITIVE} />
                    <span className="line-break"></span>
                    <Button
                        kind="tertiary"
                        leftIcon={Edit}
                        onClick={function noRefCheck() { }}
                        size="small"
                        className="edit-labels-btn"
                    >
                        Edit Labels
                    </Button>
                </div>
            </DialogContentContainer>}>

            <div
                className="task-status-info"
                style={{ backgroundColor: 'var(--color-ui_grey)' }}
                onClick={() => openStatusMenu()}>
                {info}
            </div>
        </Dialog>
    </div>
}