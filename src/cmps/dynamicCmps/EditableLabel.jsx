import { Box, ColorPicker, Icon, IconButton, TextField, useClickOutside } from 'monday-ui-react-core'
import { CloseSmall, Drag, HighlightColorBucket } from 'monday-ui-react-core/icons'
import { useCallback, useRef, useState } from 'react'
import { getLabelById, updateLabel } from '../../store/actions/board.action'

export function EditableLabel({ boardId, label, onRemoveLabel, onUpdateLabel, statusOrPriorities }) {

    const { id, title, color } = label
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [isLabelSelected, setIsLabelSelected] = useState(false)
    const [labelTitle, setLabelTitle] = useState(title)
    const refColorDialog = useRef(null)

    function onChangeLabelColorClick(ev) {
        ev.stopPropagation()
        setShowColorPicker(prevState => !prevState)
    }

    const onClickOutsideSelectColor = useCallback(() => {
        setShowColorPicker(prevState => !prevState)
    }, [])

    async function onSelectColor(color) {
        try {
            const currLabel = await getLabelById(boardId, label.id,statusOrPriorities)
            const newLabel = { ...currLabel, color: color[0] }
            updateLabel(boardId, newLabel, statusOrPriorities)
            setShowColorPicker(prevState => !prevState)
        }
        catch (err) {
            console.log('err:', err)
            console.log('Cannot update label color')
        }
    }

    function handleInputChange(ev) {
        const value = ev.target.value
        setLabelTitle(value)
    }

    function onInputClick(ev) {
        ev.stopPropagation()
        setIsLabelSelected(true)
    }

    useClickOutside({
        ref: refColorDialog,
        callback: onClickOutsideSelectColor
    })

    return (
        <div className='editable-label'>
            <Icon iconType={Icon.type.SVG} icon={Drag} className='drag-icon' />
            <div
                className='label-wrapper'
                style={isLabelSelected ?
                    { border: `1px solid var(--primary-color)` }
                    : { border: `1px solid rgb(230, 233, 239)` }}
                onBlur={() => setIsLabelSelected(false)}
            >
                <div
                    className='label-color-container'
                    style={{ backgroundColor: `var(--color-${color})` }}
                    onClick={(ev) => onChangeLabelColorClick(ev)}
                >
                    <Icon
                        iconType={Icon.type.SVG}
                        icon={HighlightColorBucket}
                        style={{ color: `var(--primary-background-color` }}
                    />
                </div>
                <input
                    type="text"
                    className='label-title'
                    placeholder={title ? 'Add label' : 'Default Label'}
                    value={labelTitle}
                    onChange={(ev) => handleInputChange(ev)}
                    onBlur={() => onUpdateLabel(boardId, { ...label, title: labelTitle }, statusOrPriorities)}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            onUpdateLabel(boardId, { ...label, title: labelTitle }, statusOrPriorities)
                            ev.target.blur()
                        }
                    }}
                    onClick={(ev) => onInputClick(ev)} />
            </div>

            {showColorPicker && <ColorPicker
                onSave={(color) => onSelectColor(color)}
                colorSize="small"
                className="color-picker"
                ref={refColorDialog}
            />}
            <div className='delete-label-container'>
                <IconButton iconType={Icon.type.SVG} icon={CloseSmall} size='xxs' onClick={(ev) => onRemoveLabel(ev, id)} />
            </div>
        </div>
    )
}