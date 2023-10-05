import { Checkbox } from "monday-ui-react-core"

export function Side() {

    return <div className="task-side">
        {/* <div className="task-color"></div> */}
        <div className="task-select">
            <Checkbox
                ariaLabel="Select task"
            />
        </div>
    </div>
}