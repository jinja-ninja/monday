import { Checkbox } from "monday-ui-react-core"

export function Side({ info }) {

    return <div className={"task-side " + info}>

        <div className="task-select">
            <Checkbox
                ariaLabel="Select task"
            />
        </div>
    </div>
}