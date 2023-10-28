
import { Avatar, Button, Tooltip, useClickOutside } from "monday-ui-react-core";
import { PersonRound } from "monday-ui-react-core/icons";
import { useCallback, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { PersonPickerModal } from "./PersonPickerModal";
import { utilService } from "../services/util.service";


export function PersonBtn({ setPersonPickerOpen, personPickerOpen, setFilterBy, filterBy, onTogglePersonModal, onRemovePersonFilter, currBoard }) {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)

    const refPersonModal = useRef(null)

    const onClickOutsidePersonModal = useCallback(() => {
        setPersonPickerOpen(false)
    }, [])

    useClickOutside({
        ref: refPersonModal,
        callback: onClickOutsidePersonModal
    })

    return (
        <>

            <Tooltip
                content='Filter by person'
                animationType="expand">
                <div className="person-filter-btns-container" ref={setReferenceElement}>
                    {!filterBy.person ?
                        <Button leftIcon={PersonRound} kind="tertiary" size="small" onClick={(ev) => onTogglePersonModal(ev)}>
                            Person
                        </Button> :
                        <div className="chosen-person-filter-btn" onClick={(ev) => onTogglePersonModal(ev)}>
                            <div className="person-img-txt-container">
                                {(!filterBy.person.imgUrl || filterBy.person.imgUrl === 'https://www.google.com') ? (
                                    <Avatar
                                        className='avatar-img'
                                        size={Avatar.sizes.SMALL}
                                        type={Avatar.types.TEXT}
                                        text={utilService.getNameInitials(filterBy.person.fullname)}
                                        backgroundColor={Avatar.colors.BLACKISH}
                                        ariaLabel={filterBy.person.fullname}
                                    />
                                ) : (
                                    <Avatar
                                        className='avatar-img'
                                        ariaLabel={filterBy.person.fullname}
                                        size={Avatar.sizes.SMALL}
                                        src={filterBy.person.imgUrl}
                                        type="img"
                                    />
                                )}
                                <span>Person</span>
                            </div>
                            <div className="btn-remove-person" onClick={(ev) => onRemovePersonFilter(ev)}>
                                <svg viewBox="0 0 20 20" fill="currentColor" width="16px" height="16px" id="combobox-search" aria-hidden="true" aria-label="Clear Search" className="icon_component input-component__icon icon_component--no-focus-style"><path d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L8.62562 9.68628L5.47045 12.8415C5.17756 13.1343 5.17756 13.6092 5.47045 13.9021C5.76334 14.195 6.23822 14.195 6.53111 13.9021L9.68628 10.7469L12.8415 13.9021C13.1343 14.195 13.6092 14.195 13.9021 13.9021C14.195 13.6092 14.195 13.1343 13.9021 12.8415L10.7469 9.68628L13.9029 6.53033C14.1958 6.23744 14.1958 5.76256 13.9029 5.46967C13.61 5.17678 13.1351 5.17678 12.8422 5.46967L9.68628 8.62562L6.53033 5.46967Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </div>


                        </div>
                    }
                </div>

            </Tooltip>

            {personPickerOpen && <div className="person-picker-modal" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                <div className="click-outside-container" ref={refPersonModal}>
                    <PersonPickerModal Members={currBoard.members} setFilterBy={setFilterBy} filterBy={filterBy} />
                </div>
                {/* <div ref={setArrowElement} style={styles.arrow} /> */}
            </div>}
        </>
    )
}