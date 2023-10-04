

export function TaskListHeader({ cmpOrder }) {

    return <div className="task-list-header-container">

        {cmpOrder.map(title => (
            <section className="header-title" key={`title-${title}`}>
                {title}
            </section>
        ))
        }
    </div>
}