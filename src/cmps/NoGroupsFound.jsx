import NoGroupsFoundImg from '../assets/img/NoGroupsFoundImg.svg'

export function NoGroupsFound({ cmpsOrder }) {
    const columsCounter = cmpsOrder.length - 2
    return (
        <section className="no-groups-container">
            <img className='no-group-img' src={NoGroupsFoundImg} alt="" />
            <p className='no-results-txt'>No results found</p>
            <p className='colums-counter-txt'>{`Searching ${columsCounter} of ${columsCounter} columns on this board`}</p>
            <div className='main-text'>
                <p>Try using a different search term, configuring the search options or</p>
                <p>use ”Search Everything” to search across the entire account</p>
            </div>

        </section>
    )
}