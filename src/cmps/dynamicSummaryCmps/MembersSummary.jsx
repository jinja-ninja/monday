import { Avatar, AvatarGroup } from "monday-ui-react-core"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'
import { utilService } from "../../services/util.service"

export function MembersSummary({ group, currBoard }) {

    let allGroupMembers = getAllGroupMembers(group)

    function getMemberById(memberId) {
        return currBoard.members.find(member => member._id === memberId)
    }

    function getAllGroupMembers(group) {
        const groupMembers = []

        group.tasks.forEach(task => {
            task.memberIds.forEach(memberId => {
                if (!groupMembers.some(member => member._id === memberId)) {
                    groupMembers.push(getMemberById(memberId))
                }
            })
        })

        return groupMembers
    }

    function setDynamicMaxMembers(chosenMembersLength) {
        if (chosenMembersLength <= 2) return 2
        return 1
    }

    return (
        <div className="members-summary-container">

            {allGroupMembers.length > 0 ? <AvatarGroup
                max={setDynamicMaxMembers(allGroupMembers.length)}
                size="small"
            >
                {allGroupMembers.map(member => {
                    return <Avatar
                        key={member._id}
                        src={member.imgUrl}
                        type="img"
                        text={utilService.getNameInitials(member.fullname)}
                        backgroundColor={Avatar.colors.BLACKISH}
                        ariaLabel={member.fullname}
                    />
                }
                )}

            </AvatarGroup>
                :
                <img className="person-circle" src={PersonCircle} alt="" />}
        </div>

    )

}