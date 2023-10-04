import { Button, Icon, Text } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add, DropdownChevronDown, DropdownChevronRight } from "monday-ui-react-core/icons"
import { useState } from "react"


export function GroupList({ groups, labels, cmpOrder, progress }) {

    const uid = () => Math.random().toString(36).slice(2)

    return <div className="group-list-container">
        <ul className="group-list">
            {groups &&
                groups.map((group, idx) => {
                    return (
                        <li key={group.id}>
                            <GroupPreview group={group}
                                labels={labels}
                                cmpOrder={cmpOrder}
                                progress={progress}
                                key={uid()} />
                        </li>
                    )
                })}
        </ul>

        <Button
            kind="secondary"
            size="small"
            leftIcon={Add}>
            Add new Group
        </Button>
    </div>
}