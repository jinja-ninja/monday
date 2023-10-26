import { Avatar, AvatarGroup, Dialog, Icon, IconButton, DialogContentContainer, Search as SearchInput, Chips } from "monday-ui-react-core"
import { Add, AddSmall, Info, PersonRound, Search } from "monday-ui-react-core/icons"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'
import { useCallback, useEffect, useState } from "react"
import { usePopper } from "react-popper";

import { createPortal } from "react-dom";
import { ReactDOM } from "react";
import { set } from "date-fns";
import { updateTask } from "../../store/actions/board.action";


export function Member({ boardMembers, task, boardId, groupId }) {

    const [chosenMembers, setChosenMembers] = useState([])
    const [suggestedMembers, setSuggestedMembers] = useState([])
    const [isMembersMenuOpen, setIsMembersMenuOpen] = useState(false)
    const [isAddMemberMenuOpen, setIsAddMemberMenuOpen] = useState(true)
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })


    useEffect(() => {
        setChosenMembers(task.memberIds)
        setSuggestedMembers(boardMembers.filter(member => !chosenMembers.includes(member._id)))
    }, [task.memberIds]);

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
            setSuggestedMembers(suggestedMembers.filter(member => member._id !== memberId))
        }

        catch {
            console.log('error in assignMemberToTask')
        }
    }

    async function onDeleteChosenMember(memberId) {
        try {
            updateTask(boardId, groupId, task.id, { key: 'memberIds', value: chosenMembers.filter(member => member !== memberId) })
            setChosenMembers(chosenMembers.filter(member => member !== memberId))
        }
        catch {
            console.log('error in onDeleteChosenMember')
        }
    }



    function getNameInitials(fullname) {
        const names = fullname.split(' ')
        return names.map(name => name[0]).join('')
    }

    function setDynamicMaxMembers(chosenMembersLength) {
        if (chosenMembersLength <= 2) return 2
        return 1
    }

    return (
        <div className="task-members" onClick={(ev) => onTogglePicker(ev)} ref={setReferenceElement}>
            {/* {members.length > 0 && <AvatarGroup size={AvatarGroup.sizes.SMALL} maxCount={3} members={members} />} */}

            {chosenMembers.length > 0 ? <AvatarGroup
                max={setDynamicMaxMembers(chosenMembers.length)}
                size="small"
            >
                {chosenMembers.map(memberId => {
                    const member = boardMembers.find(member => member._id === memberId)
                    return <Avatar
                        key={member._id}
                        size={Avatar.sizes.SMALL}
                        type={Avatar.types.TEXT}
                        text={getNameInitials(member.fullname)}
                        backgroundColor={Avatar.colors.LIPSTICK}
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
                {isAddMemberMenuOpen &&
                    <div className="chosen-members-container">
                        {chosenMembers.map(
                            memberId => {
                                const member = boardMembers.find(member => member._id === memberId)
                                return <div className="chosen-members" key={member._id} onClick={() => assignMemberToTask(member._id, task)}>
                                    <Chips
                                        label={member.fullname}
                                        onDelete={() => (onDeleteChosenMember(member._id))}

                                    />
                                </div>
                            }
                        )}
                    </div>}

                <div className="members-search">
                    {/* <input type="text" />
                    <Icon iconType={Icon.type.SVG} icon={Search} /> */}
                    <SearchInput
                        id="filter-search-input"
                        className="search-input"
                        // onBlur={() => toggleIsSearch()}
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
                    {console.log('suggestedMembers in return statement:', suggestedMembers)}
                    {suggestedMembers.map(member => {
                        if (chosenMembers.includes(member._id)) return
                        return <div className="member" key={member._id} onClick={() => assignMemberToTask(member._id, task)}>
                            <Avatar size={Avatar.sizes.SMALL}
                                type={Avatar.types.TEXT}
                                text={getNameInitials(member.fullname)}
                                backgroundColor={Avatar.colors.LIPSTICK}
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

