import { Avatar } from 'monday-ui-react-core'

export function PersonPickerModal({ Members, setFilterBy,getNameInitials }) {

    function onSetFilterBy(memberId) {
        setFilterBy((prevFilterBy) => ({
            ...prevFilterBy,
            person: memberId,
        }))
    }

    return (
        <div className="person-picker-container">
            <p className="first-title">Quick person filter</p>
            <p className="second-title">Filter items and subitems by person</p>

            <div className="member-list-container">
                {Members.map(member => {
                    return (
                        <div className='person-img-container' key={member._id}>
                            {(!member.imgUrl || member.imgUrl === 'https://www.google.com') ? (
                                <Avatar
                                    className='avatar-img'
                                    size={Avatar.sizes.SMALL}
                                    type={Avatar.types.TEXT}
                                    text={getNameInitials(member.fullname)}
                                    backgroundColor={Avatar.colors.BLACKISH}
                                    ariaLabel={member.fullname}
                                    onClick={() => onSetFilterBy(member)}
                                />
                            ) : (
                                <Avatar
                                    className='avatar-img'
                                    ariaLabel={member.fullname}
                                    size={Avatar.sizes.SMALL}
                                    src={member.imgUrl}
                                    type="img"
                                    onClick={() => onSetFilterBy(member)}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}