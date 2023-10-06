import { Button, IconButton } from "monday-ui-react-core";
import { Delete, Replay, ThumbsUp } from "monday-ui-react-core/icons";

export function CommentPreview({ comment, onDeleteComment, currTask }) {
    return (
        <div className='comment-card' key={comment.id}>
            <div>
                <div className='comment-header'>
                    {/* UPDATE LATER WHEN THERE ARE ACTUALLY USERS! */}
                    {/* <img src={comment.byMember.imgUrl} alt="" /> */}
                    <img src="https://cdn1.monday.com/dapulse_default_photo.png" alt="" />
                    <span className='member-name'>{comment.byMember.fullname}</span>
                    <div className='dot'></div>

                    <IconButton
                        className="delete-btn"
                        icon={Delete}
                        onClick={() => onDeleteComment(comment.id, currTask)}
                        size="small"
                    />
                </div>
                <pre>{comment.txt}</pre>
            </div>

            <div className='comment-footer'>
                <Button
                    className='like-btn'
                    kind="tertiary"
                    leftIcon={ThumbsUp}
                    size="small"
                >
                    Like
                </Button>
                <div className='middle-line'></div>
                <Button
                    kind="tertiary"
                    leftIcon={Replay}
                    size="small"
                >
                    Reply
                </Button>
            </div>
        </div>
    )
}