import { Button, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { Delete, Replay, ThumbsUp, Time } from "monday-ui-react-core/icons";
import { utilService } from "../services/util.service";

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

                    <div className="comment-header-left">
                        <span className="time-since">
                            <Icon icon={Time} />
                            <span>{utilService.timeSince(comment.createdAt)}</span>
                        </span>
                        <MenuButton closeDialogOnContentClick className="delete-btn" size={MenuButton.sizes.S}>
                            <Menu id="menu" size={Menu.sizes.MEDIUM}>
                                <MenuItem onClick={() => onDeleteComment(comment.id, currTask)} icon={Delete} iconType={MenuItem.iconType.SVG} title="Delete update for everyone" />
                            </Menu>
                        </MenuButton>
                    </div>



                    {/* <IconButton
                        className="delete-btn"
                        icon={Delete}
                        onClick={() => onDeleteComment(comment.id, currTask)}
                        size="small"
                    /> */}
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