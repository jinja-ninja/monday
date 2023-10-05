import { BoardPreview } from "./BoardPreview"

export function BoardList({ boards }) {

    return <>
        <ul className="index-board-list ">
            {boards &&
                boards.map(board => {
                    // console.log('board from list:', board)
                    return (
                        <li key={board._id}>
                            <BoardPreview board={board} />
                        </li>
                    )
                })}
        </ul>
    </>
}