import { Button, IconButton, Menu, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core";
import { Announcement, Check, Filter, Group, Sort } from "monday-ui-react-core/icons";
import { PersonBtn } from "./PersonBtn";
import { HideBtn } from "./HideBtn";

export function BoardActionsBtns({ currBoard, addTaskToFirstGroup, addGroup, setPersonPickerOpen,
    onTogglePersonModal, onRemovePersonFilter, personPickerOpen, setFilterBy, filterBy, sortBy, setSortBy,
    hidePickerOpen, onToggleHideColumnsModal, hiddenColumns, dynSearchBtnInput }) {

    return (
        <div className="board-details-actions">

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

            <SplitButton kind="tertiary" leftIcon={Filter} size="small" secondaryDialogContent={
                <SplitButtonMenu _id="split-menu">
                    <MenuItem icon={Check} title="Hey" />
                    <MenuItem icon={Announcement} title="There" />
                </SplitButtonMenu>}>
                Filter
            </SplitButton>

            <Button
                className={"btn-sortby " + (sortBy ? 'sorted' : '')}
                onClick={() => setSortBy(!sortBy)}
                leftIcon={Sort}
                kind="tertiary"
                size="small">
                Sort
            </Button>


            <HideBtn
                hidePickerOpen={hidePickerOpen}
                onToggleHideColumnsModal={onToggleHideColumnsModal}
                // setHiddenColumns={setHiddenColumns}
                hiddenColumns={hiddenColumns}
            />

            <IconButton icon={Menu} size="small" />
        </div>
    )
}