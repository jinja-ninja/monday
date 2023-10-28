import { ActivityPreview } from "./ActivityPreview";

export function ActivityList({ activities }) {

    return <ul className="activity-list">
        {activities.map(activity => <ActivityPreview key={activity.id} activity={activity} />)}
    </ul>
}