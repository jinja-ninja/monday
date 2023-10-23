import AddFileImg from '../../assets/img/AddFileImg.svg'

export function Files({ boardId, groupId, taskId }) {

    return (
        <div className='task-file-container'>

            <div className='add-file-img-container'>
                <img className='add-file-img' src={AddFileImg} alt="" />
                <div className="btn-add-file" >
                    <div className="line-one"></div>
                    <div className="line-two"></div>
                </div>
            </div>

        </div>
    )
}