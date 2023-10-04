import { useState } from "react";

import { EditableHeading, Icon, Text, Tooltip } from "monday-ui-react-core";
import { DropdownChevronDown, DropdownChevronRight, Edit } from "monday-ui-react-core/icons";



import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { Priority } from "./dynamicCmps/Priority";
import { TaskListHeader } from "./TaskListHeader";
import { TaskList } from "./TaskList";


export function GroupPreview({ group, label, cmpOrder, progress, boardId, onRenameGroup, initiateEdit }) {

    const [showGroup, setShowGroup] = useState(true)
    const [editableText, setEditableText] = useState(group.title);

    return <div className="group-preview-container">
        <div className="collapsible-header-wrapper">
            <Tooltip
                content="Collapse/Expand Group"
                animationType="expand">
                <Icon iconType={Icon.type.SVG} iconSize={20} icon={showGroup ? DropdownChevronDown : DropdownChevronRight}
                    onClick={() => setShowGroup((prevShowGroup => !prevShowGroup))} />
            </Tooltip>

            <EditableHeading
                className="editable-heading-target"
                type="h4"
                value={editableText}
                onBlur={() => {
                    onRenameGroup(group.id, editableText);
                }}
                onChange={(newText) => setEditableText(newText)}
            />



        </div>
        {/* <TaskListHeader cmpOrder={cmpOrder} /> */}
        {showGroup && <TaskList group={group} cmpOrder={cmpOrder} />}
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

// {/* Render progress by progress array */}
// <section className="progress-grid">
//     {progress.map((item, idx) => (
//         <div key={idx}>{item}</div>
//     ))}
// </section>
//     </section>
// );
// };


