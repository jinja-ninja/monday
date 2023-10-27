export function DisplayTitle({ title }) {
    let newTitle

    switch (title) {
        case 'title':
            newTitle = 'Title'
            break
        case 'dueDate':
            newTitle = 'Due Date'
            break
        case 'status':
            newTitle = 'Status'
            break
        case 'priority':
            newTitle = 'Priority'
            break
        case 'members':
            newTitle = 'Members'
            break
        case 'files':
            newTitle = 'Files'
            break
        case 'timeline':
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