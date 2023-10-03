import { Button, IconButton, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core";
import { Add, Announcement, Check, Filter, Hide, Menu, Person, Search, Sort } from "monday-ui-react-core/icons";
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader";
import { GroupList } from "../cmps/GroupList";
import { BoardMainHeader } from "../cmps/BoardMainHeader";

export function BoardDetails() {

    // const groups = [{ title: `test`, tasks: [1, 2, 3], _id: 1 }, { title: `test2`, tasks: [11, 22, 33], _id: 2 }]

    const groups = [
        {
            _id: Math.random().toString(36).slice(2),
            color: "red",
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    tasktTitle: "learn CSS",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "IN WORK",
                    priority: "LOW"
                },
                {
                    _id: "t102",
                    side: "null",
                    tasktTitle: "learn vue",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "STUCK",
                    priority: "LOW"
                },
                {
                    _id: "t103",
                    side: "null",
                    tasktTitle: "learn js",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "DONE",
                    priority: "LOW"
                }
            ]
        },
        {
            _id: Math.random().toString(36).slice(2),
            color: "blue",
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    tasktTitle: "learn CSS",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "IN WORK",
                    priority: "LOW"
                },
                {
                    _id: "t102",
                    side: "null",
                    tasktTitle: "learn vue",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "STUCK",
                    priority: "LOW"
                },
                {
                    _id: "t103",
                    side: "null",
                    tasktTitle: "learn js",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "DONE",
                    priority: "LOW"
                }
            ]
        },
        {
            _id: Math.random().toString(36).slice(2),
            color: "green",
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    tasktTitle: "learn CSS",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "IN WORK",
                    priority: "LOW"
                },
                {
                    _id: "t102",
                    side: "null",
                    tasktTitle: "learn vue",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "STUCK",
                    priority: "LOW"
                },
                {
                    _id: "t103",
                    side: "null",
                    tasktTitle: "learn js",
                    members: [
                        { name: "tal", color: "red" },
                        { name: "bal", color: "black" },
                        { name: "shal", color: "green" }
                    ],
                    date: "27-02-2022",
                    status: "DONE",
                    priority: "LOW"
                }
            ]
        }
    ];

    const cmpOrder = [
        "side",
        "tasktTitle",
        "status",
        "priority",
        "members",
        "date"
    ];

    const uid = () => Math.random().toString(36).slice(2)
    const labels = ["groupName", null, "status", "members", "priority", "date"]
    const progress = [null, null, "status", null, "priority", null]


    return <main className="board-details-layout">
        <BoardMainHeader />
        {/* <SideBar /> */}

        <section className="board-details-container">

            <BoardDetailsHeader />

            <div className="board-details-actions">

                <SplitButton secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                    <MenuItem icon={Check} title="Hey" />
                    <MenuItem icon={Announcement} title="There" />
                </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                <Button leftIcon={Search} kind="tertiary">Search</Button>
                <Button leftIcon={Person} kind="tertiary">Person</Button>

                <SplitButton kind="tertiary" secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem icon={Check} title="Hey" />
                        <MenuItem icon={Announcement} title="There" />
                    </SplitButtonMenu>}>
                    Filter
                </SplitButton>

                <Button leftIcon={Sort} kind="tertiary">Sort</Button>
                <Button leftIcon={Hide} kind="tertiary">Hide</Button>

                <IconButton icon={Menu} />
            </div>

            <GroupList groups={groups}
                labels={labels}
                cmpOrder={cmpOrder}
                progress={progress}
            />

        </section>
    </main >
}