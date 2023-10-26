export function DisplayTitle({ title }) {
    let newTitle

    switch (title) {
        case 'title':
            newTitle = 'Title'
            break
        case 'dueDate':
            newTitle = 'Due Date'
            break
        case 'Status':
            newTitle = 'Status'
            break
        case 'Priority':
            newTitle = 'Priority'
            break
        case 'Members':
            newTitle = 'Members'
            break
        case 'Files':
            newTitle = 'Files'
            break
        case 'Timeline':
            newTitle = 'Timeline'
            break
        case '':
            newTitle = ''
            break

        default:
            throw new Error('Unknown title')
    }

    return <>{newTitle}</>
}