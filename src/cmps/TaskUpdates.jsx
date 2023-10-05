import TaskDetailsUpdatesImg from '../assets/img/TaskDetailsUpdatesImg.svg'
export function TaskUpdates() {

    return (
        <div className='task-updates-container'>
            <input type="text" placeholder="Write an update..." />
            <img src={TaskDetailsUpdatesImg} alt="" />
            <h2>No updates yet for this item</h2>
            <p>Be the first one to update about progress, mention someone
                or upload files to share with your team members</p>
        </div>

    )
}