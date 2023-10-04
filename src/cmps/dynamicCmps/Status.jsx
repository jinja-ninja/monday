
export function Status({ info }) {

    return <div className="task-status">
        {info ? info : 'Not started'}
    </div>
}