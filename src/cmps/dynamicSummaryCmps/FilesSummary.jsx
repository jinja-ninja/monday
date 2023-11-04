import { Image } from "cloudinary-react"

export function FilesSummary({ group }) {

    function getAllGroupFiles() {
        return group.tasks.map(task => task.files).filter(file => file).flat()
    }

    return (
        <div className="files-summary-container">
            <div className="task-file-container">
                {getAllGroupFiles().map(file =>
                    <Image className='task-file-img'
                        key={file.id}
                        cloudName="dhq4tdw9m"
                        loading="lazy"
                        publicId={file.url}
                        width="17" height="17" crop="scale" quality="auto" dpr_auto="true" />
                )
                }
            </div>
        </div>
    )
}