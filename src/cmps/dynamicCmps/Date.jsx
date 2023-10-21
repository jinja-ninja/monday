
import { Icon } from "monday-ui-react-core";
import { Calendar } from "monday-ui-react-core/icons";
import { useState } from "react";
import { TestCmp } from "../../pages/TestCmp";
// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';

export function Date({ info }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <div className="task-date" onClick={() => setIsMenuOpen(prevState => !prevState)}>

            {!info && <div className="no-date-container" >

                <div className="btn-add-member">
                    <div className="line-one"></div>
                    <div className="line-two"></div>
                </div>

                <Icon className="calendar-icon" icon={Calendar} iconSize={20} />
            </div>}

            {info && <span>{info}</span>}

            {isMenuOpen && <TestCmp isMenuOpen={isMenuOpen} />}

        </div>
    );
}

