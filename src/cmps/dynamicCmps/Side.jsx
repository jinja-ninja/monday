import { Checkbox } from "monday-ui-react-core"

export function Side({ info }) {


    // width: 7px;
    // height: 16px;
    // border - radius: var(--border - radius - small) 0 0 var(--border - radius - small);
    // background - color: green;


    return <div className={"task-side-wrapper"}>

        <div className="task-side">
            <div className="color-indicator"
                style={{
                    backgroundColor: `var(--color-${info})`
                }}>
            </div>

            <div className="task-select">
                <Checkbox ariaLabel="Select task" />
            </div>
        </div>
    </div >
}