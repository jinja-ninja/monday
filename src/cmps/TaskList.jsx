import { Checkbox, EditableHeading } from "monday-ui-react-core";
import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";

export function TaskList({ group, cmpOrder }) {

    return <div className="task-list-container">


        <section className="header-title-container group-grid">
            {cmpOrder.map(title => (
                <div className="header-title" key={title}>{title}</div>
            ))
            }
        </section>

        {group.tasks.map(task => (
            <section className="task-list group-grid" key={task._id}>
                {cmpOrder.map((cmp, idx) => (
                    <section className="task-item" key={idx}>
                        <DynamicCmp cmpType={cmp} info={task[cmp]} />
                    </section>
                ))}
            </section>
        ))}
        <section className="task-list-add group-grid">
            {/* <DynamicCmp cmpType={'side'} info={''} /> */}
            <Checkbox disabled />
            <EditableHeading className="task-add-btn" type={EditableHeading.types.h5} value="+ Add Item" />
        </section>

    </div>
}

const DynamicCmp = ({ cmpType, info }) => {

    switch (cmpType) {
        case "side":
            return <Side info={info} />;
        case "priority":
            return <Priority info={info} />;
        case "taskTitle":
            return <TaskTitle info={info} />;
        case "status":
            return <Status info={info} />;
        case "members":
            return <Member info={info} />;
        case "date":
            return <Date info={info} />;

        default:
            break;
    }
}