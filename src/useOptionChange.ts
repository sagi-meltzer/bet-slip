import { MarketSelectionItem } from "./pages/main"

function useOptionChange(updateData: (data: MarketSelectionItem[]) => void, data: MarketSelectionItem[]) {
    return (id?: number, name?: string) => {
        if (!id) {
            updateData(data.map((item) => ({
                ...item,
                options: item.options.map((option) => ({ ...option, isSelected: false }))
            })))
        } else {
            if (name){
                updateData(data.map((item) => item.id === id ?
                {
                    ...item,
                    options: item.options.map((option) => option.name === name ?
                        { ...option, isSelected: !option.isSelected } :
                        { ...option, isSelected: item.singleSelection ? false : option.isSelected }
                    )
                }
                : item))
            } else {
                updateData(data.map((item) => item.id === id ?
                {
                    ...item,
                    options: item.options.map((option) => ({ ...option, isSelected: false }))
                }
                : item))
            }
        }
    }
}


export default useOptionChange;