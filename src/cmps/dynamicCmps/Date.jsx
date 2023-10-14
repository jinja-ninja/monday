import { TestCmp } from "../../pages/TestCmp";

export function Date({ info }) {
    return <div className="task-date">
        {/* <TestCmp /> date picker by material ui */}
        {info ? info : 'No Deadline'}
    </div>
}