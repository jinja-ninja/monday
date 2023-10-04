import { Button, EditableHeading, Flex, IconButton } from "monday-ui-react-core"
import { DropdownChevronRight, Open } from "monday-ui-react-core/icons"
import { useState } from "react"

export function TaskTitle({ info, boardId, groupId, taskId, onUpdate }) {

    const [updatedTaskInput, setUpdatedTask] = useState(info)

    return <div className="task-title">
        <EditableHeading type={EditableHeading.types.h5}
            onBlur={() => {
                updatedTaskInput ? onUpdate(taskId, { key: 'title', value: updatedTaskInput }) : setUpdatedTask(info)
                setUpdatedTask(info)
            }}
            onChange={(value) => setUpdatedTask(value)}
            value={info} />
        <Button
            kind="tertiary"
            leftIcon={Open}
            size="xs"
        >
            Open
        </Button>
    </div>
}