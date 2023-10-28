
export function ActivityPreview({ activity }) {

    console.log('activity:', activity)

    return <li className="activity-list-item">
        <div className="activity-list-item-header">
            <div className="activity-list-item-header-left">
                <img src={activity.byMember.imgUrl} alt="" />
                <div className="activity-list-item-header-text">
                    <span className="activity-list-item-header-text-name">{activity.byMember.fullname}</span>
                    <span className="activity-list-item-header-text-action">{activity.action}</span>
                </div>
            </div>
            <span className="activity-list-item-header-date">{activity.createdAt}</span>
        </div>
        <div className="activity-list-item-content">
            <span className="activity-list-item-content-text">{activity.txt}</span>
        </div>
    </li>
}