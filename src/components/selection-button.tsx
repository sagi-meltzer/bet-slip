const SelectionButton = ({name, value, isSelected, onClick}: {name: string, value: string, isSelected: boolean, onClick: () => void}) => {
    return <button className={`selection-button ${isSelected ? 'selected' : ''} `} onClick={onClick}>
        <div className="name">{name}</div>
        <div className="value">{value}</div>
    </button>
}

export default SelectionButton