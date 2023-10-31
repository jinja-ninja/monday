import { Avatar, Modal, ModalContent, ModalFooterButtons, ModalHeader, Search, Search as SearchInput } from "monday-ui-react-core"
import { boardService } from "../services/board.service.local"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"




export function InviteMembersModal({ setIsShowInviteMembersModal, isShowInviteMembersModal }) {

    const currBoard = useSelector(state => state.boardModule.board)

    const closeModal = () => {
        setIsShowInviteMembersModal(false)
    }

    return (
        <>
            <Modal
            className='invite-memebers-modal'
                id="story-book-modal"
                title={<span className="modal-title">Board Members</span>}
                show={isShowInviteMembersModal}
                onClose={closeModal} // Width prop effects on the modal width
                width={Modal.width.DEFAULT} contentSpacing>

                <ModalContent>

                    <div className="member-invite-container">
                        {/* <span className="modal-title">Board Members</span> */}
                        <div className="member-invite-list">

                            {currBoard.members.map(member => {
                                return (
                                    <div className="monday-storybook-chips_inline-container member-item" key={member._id}>
                                        <Avatar size={Avatar.sizes.MEDIUM}
                                            className="member-img"
                                            src={member.imgUrl}
                                            type="img"
                                        />
                                        <span className="monday-storybook-chips_name">
                                            {member.fullname} <span>{member.title}</span>
                                        </span>
                                    </div>
                                )
                            }


                            )}
                        </div>
                    </div>




                </ModalContent>

            </Modal >
        </>
    )



}