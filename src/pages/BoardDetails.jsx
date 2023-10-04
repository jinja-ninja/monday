import { Button, IconButton, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core";
import { Add, Announcement, Check, Filter, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons";
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader";
import { GroupList } from "../cmps/GroupList";
import { BoardMainHeader } from "../cmps/BoardMainHeader";
import { SideBar } from "../cmps/SideBar";

export function BoardDetails() {

    // const groups = [{ title: `test`, tasks: [1, 2, 3], _id: 1 }, { title: `test2`, tasks: [11, 22, 33], _id: 2 }]

    const groups = [
        {
            _id: Math.random().toString(36).slice(2),
            color: "red",
            title: 'Dev',
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    taskTitle: "learn CSS",
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
                    taskTitle: "learn vue",
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
                    taskTitle: "learn js",
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
            title: 'Design',
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    taskTitle: "learn CSS",
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
                    taskTitle: "learn vue",
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
                    taskTitle: "learn js",
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
            title: 'Doink',
            tasks: [
                {
                    _id: "t101",
                    side: "null",
                    taskTitle: "learn CSS",
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
                    taskTitle: "learn vue",
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
                    taskTitle: "learn js",
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
        "taskTitle",
        "status",
        "priority",
        "members",
        "date"
    ];

    const labels = ["groupName", null, "status", "members", "priority", "date"] // ?????????????????
    const progress = [null, null, "status", null, "priority", null] // ???????????????????????


    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">

            <BoardDetailsHeader />

            <div className="board-details-actions">

                <SplitButton size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                    <MenuItem icon={Check} title="Hey" />
                    <MenuItem icon={Announcement} title="There" />
                </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                <Button leftIcon={Search} kind="tertiary" size="small">Search</Button>
                <Button leftIcon={PersonRound} kind="tertiary" size="small">Person</Button>

                <SplitButton kind="tertiary" leftIcon={Filter} size="small" secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem icon={Check} title="Hey" />
                        <MenuItem icon={Announcement} title="There" />
                    </SplitButtonMenu>}>
                    Filter
                </SplitButton>

                <Button leftIcon={Sort} kind="tertiary" size="small">Sort</Button>
                <Button leftIcon={Hide} kind="tertiary" size="small">Hide</Button>

                <IconButton icon={Menu} size="small" />
            </div>

            <GroupList groups={groups}
                labels={labels}
                cmpOrder={cmpOrder}
                progress={progress}
            />

        </section>
    </main >
}