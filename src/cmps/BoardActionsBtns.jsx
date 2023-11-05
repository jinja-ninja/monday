import { Button, MenuItem, SplitButton, SplitButtonMenu, Tooltip } from "monday-ui-react-core";
import { Group, Sort } from "monday-ui-react-core/icons";
import { PersonBtn } from "./PersonBtn";
import { HideBtn } from "./HideBtn";
import { RecordButton } from "./RecordButton";
import AiLogo from '../assets/img/AiLogo.png'

export function BoardActionsBtns({ currBoard, addTaskToFirstGroup, addGroup, setPersonPickerOpen,
    onTogglePersonModal, onRemovePersonFilter, personPickerOpen, setFilterBy, filterBy, sortBy, setSortBy,
    hidePickerOpen, onToggleHideColumnsModal, hiddenColumns, dynSearchBtnInput, updateBoardOptimistic, isCollapse, setIsAiOpen }) {

    return (
        <div className={"board-details-actions " + (!isCollapse ? 'collpase-actions-header' : '')}>
            <SplitButton shouldCloseOnClickInsideDialog onClick={() => addTaskToFirstGroup()} size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                <MenuItem onClick={() => addGroup(currBoard._id)} icon={Group} title="New group of items" />
            </SplitButtonMenu>}>
                New Task
            </SplitButton>

            {dynSearchBtnInput}

            <PersonBtn
                setPersonPickerOpen={setPersonPickerOpen}
                onTogglePersonModal={onTogglePersonModal}
                onRemovePersonFilter={onRemovePersonFilter}
                personPickerOpen={personPickerOpen}
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                currBoard={currBoard}
            />

            <Tooltip
                content='Sort groups'
                animationType="expand">
                <Button
                    className={"btn-sortby " + (sortBy ? 'sorted' : '')}
                    onClick={() => setSortBy(!sortBy)}
                    leftIcon={Sort}
                    kind="tertiary"
                    size="small">
                    Sort
                </Button>
            </Tooltip>

            <HideBtn
                hidePickerOpen={hidePickerOpen}
                onToggleHideColumnsModal={onToggleHideColumnsModal}
                hiddenColumns={hiddenColumns}
            />

            <Tooltip
                content='Use AI to create tasks'
                animationType="expand">
                <div className="ai-btn-container" onClick={() => setIsAiOpen(true)}>
                    <div className="btn-ai">
                        <img className="ai-img" src={AiLogo} alt="" />
                        <span className="ai-text">AI Helper</span>
                        <div className="glow"></div>
                    </div>
                </div>
            </Tooltip>

        </div>
    )
}