import { useState } from "react";

import { Icon, Text } from "monday-ui-react-core";
import { DropdownChevronDown, DropdownChevronRight } from "monday-ui-react-core/icons";



import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Priority } from "./dynamicCmps/Priority";

export function GroupPreview({ group, label, cmpOrder, progress }) {

    // const [showGroup, setShowGroup] = useState(true)

    return <div className="preview-container">

        {label}
        {/* {showGroup && <div className="group-table-container">

        </div>} */}
    </div>
}

// return (
//     <section className="group-list">
//         {/* Render group labels by labels array */}
//         <section className="labels-grid">
//             {labels.map((label, index) => (
//                 <div key={index}>{label}</div>
//             ))}
//         </section>

//         {/* Render tasks by cmp order */}
//         {group.tasks.map((task) => (
//             <section className="group grid" key={task.id}>
//                 {cmpOrder.map((cmp, idx) => (
//                     <section className="grid-item" key={idx}>
//                         <DynamicCmp cmpType={cmp} info={task[cmp]} />
//                     </section>
//                 ))}
//             </section>
//         ))}

//         {/* Render progress by progress array */}
//         <section className="progress-grid">
//             {progress.map((item, idx) => (
//                 <div key={idx}>{item}</div>
//             ))}
//         </section>
//     </section>
// );
// };

const DynamicCmp = ({ cmpType, info }) => {
    console.log(cmpType, info);

    switch (cmpType) {
        case "side":
            return <Side {...info} />;
        case "priority":
            return <Priority {...info} />;
        case "taskTitle":
            return <TaskTitle {...info} />;
        case "status":
            return <Status {...info} />;
        case "members":
            return <Member {...info} />;
        case "date":
            return <Date {...info} />;

        default:
            break;
    }
};
