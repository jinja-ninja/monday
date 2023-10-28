import { Checkbox, Icon, Search as SearchInput } from "monday-ui-react-core";
import { Search, Calendar, PersonRound, Status, Timeline, File } from "monday-ui-react-core/icons"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UPDATE_COLUMNS_STATE } from "../store/reducers/board.reducer";

export function HideColumnsModal({ setHiddenColumns, hiddenColumns }) {
    // export function HideColumnsModal({ setHiddenColumns, hiddenColumns ,columnsStates}) {

    // const [columnsCheckedState, setColumnsCheckedState] = useState(columnsStates)
    const columnsState = useSelector(state => state.boardModule.columnsState)
    const dispatch = useDispatch()

    function getColumnIcon(columnName) {
        if (columnName === "Members") return <Icon icon={PersonRound} className="column-icon" />
        else if (columnName === "Status") return <Icon icon={Status} className="column-icon" />
        else if (columnName === "Priority") return <Icon icon={Status} className="column-icon" />
        else if (columnName === "DueDate") return <Icon icon={Calendar} className="column-icon" />
        else if (columnName === "Timeline") return <Icon icon={Timeline} className="column-icon" />
        else if (columnName === "Files") return <Icon icon={File} className="column-icon" />
    }

   
    function setIsColumnChecked(ev, column) {
        const newCheckedState = ev.target.checked;
        dispatch({ type: UPDATE_COLUMNS_STATE, updatedColumn: { name: column.name, isChecked: newCheckedState } })

    }

    return (
        <div className="hide-columns-container">
            <p className="choose-columns-txt">Choose columns to display</p>

            <SearchInput
                id="filter-search-input"
                className="search-input"
                autoFocus
                debounceRate={200}
                iconName={Search}
                placeholder="Search"
                size="small"
                wrapperClassName="monday-storybook-search_size"
            />

            <div className="columns-list-container">
                {columnsState.map(column =>
                    <div className="column-row" key={column.name}>
                        <div className="column-name-container">
                            {getColumnIcon(column.name)}
                            <span>{column.name}</span>
                        </div>
                        <Checkbox
                            checked={column.isChecked && !hiddenColumns.includes(column.name)}
                            onChange={(ev) => setIsColumnChecked(ev, column)}
                        />
                    </div>

                )}
            </div>
        </div>
    )
}