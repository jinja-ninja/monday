
import { Icon } from "monday-ui-react-core";
import { Calendar } from "monday-ui-react-core/icons";
import { useState } from "react";

export function Date({ info }) {

    return (
        <div className="task-date" onClick={() => setIsSelectDate(true)}>

            {!info && <div className="no-date-container">

                <div className="btn-add-member">
                    <div className="line-one"></div>
                    <div className="line-two"></div>
                </div>

                <Icon className="calendar-icon" icon={Calendar} iconSize={20} />
            </div>}

            {info && <span>{info}</span>}


        </div>
    );
}