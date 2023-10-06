import { useState } from 'react'
import { Button } from "monday-ui-react-core";
import { Replay, ThumbsUp } from "monday-ui-react-core/icons"

import TaskDetailsUpdatesImg from '../assets/img/TaskDetailsUpdatesImg.svg'
import { updateTask } from '../store/actions/board.action';
import { boardService } from '../services/board.service.local';
import { CommentPreview } from './CommentPreview';

export function TaskUpdates({ boardId, groupId, taskId, currTask }) {
    const [textAreaState, setTextAreaState] = useState(false)
    const [TextAreaValue, setTextAreaValue] = useState('')



    function toggleInputAndTextArea() {
        setTextAreaState((prevTextAreaState) => !prevTextAreaState)
    }

    function handleTextAreaChange(event) {
        setTextAreaValue(event.target.value)
        console.log(TextAreaValue);
    }

    function onSaveTaskComment() {
        const newCommentText = TextAreaValue
        const newComment = boardService.createNewComment(newCommentText)
        const updatedComments = [newComment, ...currTask.comments]
        updateTask(boardId, groupId, taskId, { key: "comments", value: updatedComments })
        setTextAreaValue('')
    }

    function onDeleteComment(commentId, currTask) {
        const updatedComments = boardService.deleteComment(commentId, currTask)
        updateTask(boardId, groupId, taskId, { key: "comments", value: updatedComments })

    }

    if (!currTask) return <div>Loading...</div>
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

            {currTask.comments.length == 0 &&
                <div>
                    <img src={TaskDetailsUpdatesImg} alt="" />
                    <h2>No updates yet for this item</h2>
                    <p>Be the first one to update about progress, mention someone
                        or upload files to share with your team members</p>
                </div>}

            {currTask.comments.length > 0 &&
                <section className='task-comments-container'>
                    {currTask.comments.map((comment) => (
                        <CommentPreview comment={comment} onDeleteComment={onDeleteComment} currTask={currTask} key={comment.id} />
                    ))}
                </section>
            }
        </div >

    )
}