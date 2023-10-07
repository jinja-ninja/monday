
export function TaskPriority({ info }) {

    return <div className="task-priority">
        {info ? info : 'Unset'}
    </div>
}