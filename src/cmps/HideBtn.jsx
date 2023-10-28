import { Button, Tooltip, useClickOutside } from "monday-ui-react-core";
import { Hide } from "monday-ui-react-core/icons";
import { useCallback, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { HideColumnsModal } from "./HideColumnsModal";

export function HideBtn({ hidePickerOpen, onToggleHideColumnsModal, setHiddenColumns, hiddenColumns }) {
    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)

    const refHideModal = useRef(null)

    const onClickOutsideHideModal = useCallback(() => {
        onToggleHideColumnsModal()
    }, [])

    useClickOutside({
        ref: refHideModal,
        callback: onClickOutsideHideModal
    })

    return (<>
        <Tooltip
            content='Hidden columns'
            animationType="expand">
            <div className={"hide-btn " + (hiddenColumns.length > 0 ? 'hidden-columns' : '')} ref={setReferenceElement}>
                <Button leftIcon={Hide} kind="tertiary" size="small" onClick={(ev) => onToggleHideColumnsModal(ev)}>
                    Hide
                </Button>
            </div>
        </Tooltip>

        {hidePickerOpen && <div className="hide-columns-modal" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
            <div className="click-outside-hide-modal" ref={refHideModal}>
                <HideColumnsModal setHiddenColumns={setHiddenColumns} hiddenColumns={hiddenColumns} />
            </div>
        </div>}
    </>
    )
}