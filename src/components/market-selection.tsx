import useOptionChange from "../useOptionChange"
import { MarketSelectionItem } from "../pages/main"
import Selection from "./selection"

const MarketSelection = ({data, updateData}: {data: MarketSelectionItem[], updateData: (data: MarketSelectionItem[]) => void}) => {
    const handleOptionClick = useOptionChange(updateData, data)

    return <>
            {
            data.map((item, index) => (
                <Selection key={index} title={item.title} isTeam={item.isTeam} options={item.options} onOptionClick={(name: string) => handleOptionClick(item.id, name)}/>
            ))}
        </>
}


export default MarketSelection

