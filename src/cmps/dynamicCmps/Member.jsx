import { useEffect, useState } from "react"
import { usePopper } from "react-popper";
import { updateTask } from "../../store/actions/board.action";
import { Avatar, AvatarGroup, Search as SearchInput, Chips } from "monday-ui-react-core"
import { Search } from "monday-ui-react-core/icons"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'

export function Member({ boardMembers, task, boardId, groupId }) {
    const [chosenMembers, setChosenMembers] = useState([])
    const [suggestedMembers, setSuggestedMembers] = useState([])
    const [filteredMembers, setFilteredMembers] = useState([])
    const [isPickerOpen, setIsPickerOpen] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    useEffect(() => {
        setChosenMembers(task.memberIds)
        setSuggestedMembers(boardMembers.filter(member => !chosenMembers.includes(member._id)))
    }, [task.memberIds])

    useEffect(() => {

        document.addEventListener('mousedown', onClosePicker)
        return () => {
            document.removeEventListener('mousedown', onClosePicker)
        }
    }, [])

    function onClosePicker(ev) {
        if (ev.target.closest('.member-picker-modal')) return
        setIsPickerOpen(false)
    }

    function onTogglePicker(ev) {
        if (ev.target.closest('.member-picker-modal')) return
        ev.stopPropagation()
        setIsPickerOpen(prev => !prev)
    }

    async function assignMemberToTask(memberId, task) {
        try {
            if (chosenMembers.includes(memberId)) return
            updateTask(boardId, groupId, task.id, { key: 'memberIds', value: [...chosenMembers, memberId] })
            // setSuggestedMembers(suggestedMembers.filter(member => member._id !== memberId))
            setSuggestedMembers((prevMembers) => prevMembers.filter(member => member._id !== memberId))
        }
        catch {
            console.log('error adding member')
        }
    }
    async function onDeleteChosenMember(memberId) {
        const updatedMembers = chosenMembers.filter(member => member !== memberId)
        try {
            updateTask(boardId, groupId, task.id, { key: 'memberIds', value: updatedMembers })
            setChosenMembers(chosenMembers.filter(member => member !== memberId))
        }
        catch {
            console.log('error removing member')
        }
    }

    function filterMembers(ev) {
        const filterBy = ev
        const filteredMembers = boardMembers.filter(member => member.fullname.toLowerCase().includes(filterBy.toLowerCase()))
        setFilteredMembers(filteredMembers)
    }

    function setDynamicMaxMembers(chosenMembersLength) {
        if (chosenMembersLength <= 2) return 2
        return 1
    }

    return (
        <div className="task-members" onClick={(ev) => onTogglePicker(ev)} ref={setReferenceElement}>
            {chosenMembers.length > 0 ?
                <AvatarGroup
                    max={setDynamicMaxMembers(chosenMembers.length)}
                    size="small"
                >
                    {chosenMembers.map(memberId => {
                        const member = boardMembers.find(member => member._id === memberId)
                        return <Avatar
                            key={member._id}
                            size={Avatar.sizes.SMALL}
                            src={member.imgUrl}
                            type="img"
                            // type={Avatar.types.TEXT}
                            // text={utilService.getNameInitials(member.fullname)}
                            backgroundColor={Avatar.colors.BLACKISH}
                            ariaLabel={member.fullname}
                        />
                    }
                    )}
                </AvatarGroup>
                :
                <img className="person-circle" src={PersonCircle} alt="" />}
            <div className="btn-add-member" >
                <div className="line-one"></div>
                <div className="line-two"></div>
            </div>

            {isPickerOpen && <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="member-picker-modal">
                <div className="chosen-members-container">
                    {chosenMembers.map(
                        memberId => {
                            const member = boardMembers.find(member => member._id === memberId)
                            return <div className="chosen-members" key={member._id} onClick={() => assignMemberToTask(member._id, task)}>
                                <Chips
                                    leftAvatar={member.imgUrl}
                                    className="chip"
                                    label={member.fullname}
                                    onDelete={() => (onDeleteChosenMember(member._id))}
                                />
                            </div>
                        }
                    )}
                </div>

                <div className="members-search">
                    <SearchInput
                        id="filter-search-input"
                        className="search-input"
                        onFocus={() => setFilteredMembers(suggestedMembers)}
                        onChange={(ev) => filterMembers(ev)}
                        autoFocus
                        debounceRate={200}
                        iconName={Search}
                        placeholder="Search names"
                        size="small"
                        wrapperClassName="monday-storybook-search_size"
                    />
                </div>
                <div className="members-list">
                    <p>Suggested People</p>
                    {filteredMembers.map(member => {
                        if (chosenMembers.includes(member._id)) return
                        return <div className="member" key={member._id} onClick={() => assignMemberToTask(member._id, task)}>
                            <Avatar size={Avatar.sizes.SMALL}
                                src={member.imgUrl}
                                type="img"
                                // type={Avatar.types.TEXT}
                                // text={utilService.getNameInitials(member.fullname)}
                                backgroundColor={Avatar.colors.BLACKISH}
                                ariaLabel={member.fullname}
                            />
                            <span className="member-name">{member.fullname}</span>
                        </div>
                    })}
                </div>
                <div ref={setArrowElement} style={styles.arrow} />
            </div>}
        </div>

    )
}

