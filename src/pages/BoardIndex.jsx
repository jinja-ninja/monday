import { useState } from "react"

import { Box, Counter, Text, Icon } from "monday-ui-react-core"
import { BoardIndexAside } from "../cmps/BoardIndexAside"
import { BoardList } from "../cmps/BoardList"
import { DropdownChevronRight, DropdownChevronDown } from "/node_modules/monday-ui-react-core/src/components/Icon/Icons"
import { BoardMainHeader } from "../cmps/BoardMainHeader"
import { SideBar } from "../cmps/SideBar"

export function BoardIndex() {

    const [toggleBoardList, setToggleBoardList] = useState(true)
    const [toggleInbox, setToggleInbox] = useState(true)

    const boards = [
        { title: `Long Text Test Board for you buddy and if you want I can send you another poem or something so you'll have more text here!`, _id: 1 },
        { title: `Test Board`, _id: 2 }
    ]

    return <main className="board-index">

        <BoardMainHeader />
        <SideBar />

        <section className="board-index-body">
            <Box
                rounded={Box.roundeds.MEDIUM}
                shadow={Box.shadows.MEDIUM}
                padding={Box.paddings.MEDIUM}
                margin={Box.marginYs.LARGE}
                className="main-panel-container"
            >
                <div className="collapsible-header-wrapper">
                    <Icon iconType={Icon.type.SVG} icon={toggleBoardList ? DropdownChevronDown : DropdownChevronRight}
                        onClick={() => setToggleBoardList((prevToggleList => !prevToggleList))} />
                    <Text
                        weight="bold"
                        align="start"
                        element="span"
                    >
                        Recently visited
                    </Text>
                </div>

                <section className="collapsible-content">
                    {toggleBoardList && <BoardList boards={boards} />}
                </section>

                <div className="collapsible-header-wrapper">
                    <Icon iconType={Icon.type.SVG} icon={toggleInbox ? DropdownChevronDown : DropdownChevronRight}
                        iconSize={18} onClick={() => setToggleInbox((prevToggle => !prevToggle))} />
                    <Text
                        weight="bold"
                        align="start"
                        element="span"
                    >
                        Update feed (inbox)
                    </Text>
                    <Counter count={1} />
                </div>
            </Box>

            <section className="right-panel-container">
                <BoardIndexAside />
            </section>
        </section>
    </main >
}