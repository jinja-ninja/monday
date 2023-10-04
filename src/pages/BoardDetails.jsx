import { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core";
import { Add, Announcement, Check, Filter, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons";
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader";
import { GroupList } from "../cmps/GroupList";
import { BoardMainHeader } from "../cmps/BoardMainHeader";
import { SideBar } from "../cmps/SideBar";
import { useParams } from "react-router-dom";
import { getBoardById, updateBoard } from "../store/actions/board.action";
import { useSelector } from "react-redux";

export function BoardDetails() {
    const params = useParams()
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        console.log('currBoard:', currBoard)
    }, [currBoard])

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    async function loadBoard() {
        await getBoardById(params.boardId)
    }


    const cmpOrder = [
        "side",
        "taskTitle",
        "status",
        "priority",
        "members",
        "date"
    ];

    const progress = [null, null, "status", null, "priority", null]

    if (!currBoard) return (<div>Loading...</div>)
    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">

            <BoardDetailsHeader title={currBoard.title} />

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

            <GroupList groups={currBoard.groups}
                labels={currBoard.labels}
                cmpOrder={cmpOrder}
                progress={progress}
            />

        </section>
    </main >
}