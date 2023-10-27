import { useNavigate, useParams } from 'react-router-dom'
import BoardDeletedImg from '../assets/img/BoardDeletedImg.svg'
import { Button } from 'monday-ui-react-core'
export function BoardDeletedPage({boardTitle}) {
    // let { title } = useParams()
    let navigate = useNavigate()

    return (
        <div className="board-deleted-container">
            <img className='deleted-board-img' src={BoardDeletedImg} alt="" />
            <div className='texts-container'>
                <h2 className='board-deleted-title'>{`“${boardTitle}” board has been deleted`}</h2>
                <p>Select a different board to continue with or create a new board.</p>
                <Button onClick={()=> navigate('/board')}>
                    Back to workspace
                </Button>
            </div>
        </div>
    )
}