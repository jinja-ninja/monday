import { Button, EditableHeading, IconButton } from "monday-ui-react-core"
import { DropdownChevronRight, Open } from "monday-ui-react-core/icons"

export function TaskTitle({ info }) {

    return <div className="task-title">
        <IconButton
            ariaLabel="Expand subitems"
            icon={DropdownChevronRight}
            kind="tertiary"
            size="xs"
        />

        <EditableHeading type={EditableHeading.types.h5} value={info} />

        <Button
            kind="tertiary"
            leftIcon={Open}
            size="xs"
        >
            Open
        </Button>
    </div>
}