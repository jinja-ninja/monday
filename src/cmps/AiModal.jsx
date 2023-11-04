import { IconButton } from 'monday-ui-react-core'
import AiRobot from '../assets/img/AiRobot.png'
import { Close } from 'monday-ui-react-core/icons'
import { RecordButton } from './RecordButton'

export function AiModal({ setIsAiOpen }) {

    function closeModalByBtn(ev) {
        ev.stopPropagation()
        setIsAiOpen(prev => !prev)
    }
    return (
        <div className="board-desc-backdrop" onClick={() => setIsAiOpen((prevIsAiOpen) => !prevIsAiOpen)} >
            <div className="ai-modal-container" onClick={(e) => e.stopPropagation()}>
                <IconButton
                    className="close-btn"
                    icon={Close}
                    kind="tertiary"
                    size="xs"
                    onClick={(e) => closeModalByBtn(e)}
                />
                <img className='ai-robot-img' src={AiRobot} alt="" />
                <div className='explaining-txt'>
                    <p>Use your voice to create a new task group,</p>
                    <p>and our AI will break down your main task</p>
                    <p>into smaller manageable sub-tasks.</p>

                    <RecordButton />
                </div>
            </div>
        </div>
    )
}