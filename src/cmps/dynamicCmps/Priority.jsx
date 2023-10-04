
export function Priority({ info }) {

    return <div className="task-priority">
        {info ? info : 'Unset'}
    </div>
}