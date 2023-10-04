
export function Date({ info }) {
    return <div className="task-date">
        {info ? info : 'No Deadline'}
    </div>
}