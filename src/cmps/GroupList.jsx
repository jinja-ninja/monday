import { Button, Icon, Text } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add, DropdownChevronDown, DropdownChevronRight } from "monday-ui-react-core/icons"
import { useState } from "react"


export function GroupList({ groups, labels, cmpOrder, progress }) {

    const uid = () => Math.random().toString(36).slice(2)
    const [showGroup, setShowGroup] = useState(true)


    return <div className="group-list-container">
        <ul className="group-list">
            {groups &&
                groups.map((group, idx) => {
                    return (
                        <li key={group._id}>

                            <div className="collapsible-header-wrapper">
                                <Icon iconType={Icon.type.SVG} icon={showGroup ? DropdownChevronDown : DropdownChevronRight}
                                    onClick={() => setShowGroup((prevShowGroup => !prevShowGroup))} />
                                <Text
                                    weight="bold"
                                    align="start"
                                    element="span"
                                >
                                    {group._id}
                                </Text>
                            </div>

                            <GroupPreview group={group}
                                label={labels[idx]}
                                cmpOrder={cmpOrder}
                                progress={progress}
                                key={uid()} />
                        </li>
                    )
                })}
        </ul>

        <Button
            kind="secondary"
            leftIcon={Add}>
            Add new Group
        </Button>
    </div>
}