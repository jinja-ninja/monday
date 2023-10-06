import { Button } from "monday-ui-react-core";
import { Add } from "monday-ui-react-core/icons";
import TaskDetailsFileImg from "../assets/img/TaskDetailsFileImg.svg";

export function TaskFiles() {
    return (
        <div className="task-files-container">
            <img src={TaskDetailsFileImg} alt="" />
            <div>
                <span>Drag & drop </span>
                <span className="or-word">or</span>
                <span> add files here</span>
            </div>
            <p>Upload, comment and review all files in this item to easily collaborate in context</p>
            <Button leftIcon={Add}>Add file</Button>
        </div>
    )
}