import { Avatar } from 'monday-ui-react-core'
import { utilService } from '../services/util.service';

export function PersonPickerModal({ Members, setFilterBy, filterBy }) {

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
                    let dynSelectedPersonClass = ''

                    if (filterBy.person) {
                        dynSelectedPersonClass = filterBy.person._id === member._id ? 'selected' : '';
                    }

                    return (
                        <div className='person-img-container' key={member._id}>
                            {(!member.imgUrl) ? (
                                <div className={'test ' + dynSelectedPersonClass}>
                                    <Avatar
                                        className='avatar-img'
                                        size={Avatar.sizes.SMALL}
                                        type={Avatar.types.TEXT}
                                        text={utilService.getNameInitials(member.fullname)}
                                        backgroundColor={Avatar.colors.BLACKISH}
                                        ariaLabel={member.fullname}
                                        onClick={() => onSetFilterBy(member)}
                                    />
                                </div>
                            ) : (
                                <Avatar
                                    className={'avatar-img ' + dynSelectedPersonClass}
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