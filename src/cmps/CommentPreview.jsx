import { Button, Icon, IconButton, Menu, MenuButton, MenuItem } from "monday-ui-react-core";
import { Delete, Replay, ThumbsUp, Time } from "monday-ui-react-core/icons";
import { utilService } from "../services/util.service";

export function CommentPreview({ comment, onDeleteComment, currTask }) {
    return (
        <div className='comment-card' key={comment.id}>
            <div>
                <div className='comment-header'>
                    <img className="member-img" src={comment.byMember ? comment.byMember.imgUrl : "https://cdn1.monday.com/dapulse_default_photo.png"} alt="" />
                    {/* <img src="https://cdn1.monday.com/dapulse_default_photo.png" alt="" /> */}
                    <span className='member-name'>{comment.byMember ? comment.byMember.fullname : 'Guest'}</span>
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
                </div>
                <pre>{comment.txt}</pre>
            </div>

            <div className='comment-footer'>

                <div className='footer-btn like-btn'>
                    <Icon icon={ThumbsUp} />
                    <span>Like</span>
                </div>
                <div className='middle-line'></div>

                <div className='footer-btn reply-btn'>
                    <Icon icon={Replay} />
                    <span>Reply</span>
                </div>

            </div>
        </div>
    )
}