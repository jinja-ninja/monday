import { useState } from 'react'
import { Button } from "monday-ui-react-core";

import TaskDetailsUpdatesImg from '../assets/img/TaskDetailsUpdatesImg.svg'
import { updateTask } from '../store/actions/board.action';
export function TaskUpdates({ boardId }) {
    const [textAreaState, setTextAreaState] = useState(true)
    const [TextAreaValue, setTextAreaValue] = useState('')

    function onSaveTaskComment() {
        console.log('button clicked!!!');
        const newComment = TextAreaValue
        updateTask(boardId, groupId, taskId, data)
        //לבדוק איך לקבל את כל המשתנים האלה
        setTextAreaValue('')
        console.log("newComment", newComment);
    }

    function toggleInputAndTextArea() {
        setTextAreaState((prevTextAreaState) => !prevTextAreaState)
    }

    function handleTextAreaChange(event) {
        setTextAreaValue(event.target.value)
        console.log(TextAreaValue);
    }

    return (
        <div className='task-updates-container'>
            {!textAreaState &&
                <input
                    onClick={() => toggleInputAndTextArea()}
                    type="text"
                    placeholder="Write an update..." />}
            {textAreaState &&
                <div className='text-area-contianer'>
                    <textarea
                        type="text"
                        autoFocus
                        onBlur={() => toggleInputAndTextArea()}
                        onChange={(event) => handleTextAreaChange(event)} >
                    </textarea>
                    <Button
                        className='update-btn' size="small"
                        onMouseDown={(e) => {
                            e.stopPropagation()
                            onSaveTaskComment()
                        }}
                    >
                        Update
                    </Button>
                </div>}

            <img src={TaskDetailsUpdatesImg} alt="" />
            <h2>No updates yet for this item</h2>
            <p>Be the first one to update about progress, mention someone
                or upload files to share with your team members</p>
        </div >

    )
}