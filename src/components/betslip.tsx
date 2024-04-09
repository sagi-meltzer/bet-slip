import { useState } from "react";
import useOptionChange from "../useOptionChange";
import { MarketSelectionItem } from "../pages/main";

const DeleteBetIcon = () => {
    return <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="-1" x2="32.2336" y2="-1" transform="matrix(0.748997 0.662574 -0.748997 0.662574 1.85718 1.64285)" stroke="black" stroke-width="2"/>
    <line y1="-1" x2="33.4734" y2="-1" transform="matrix(-0.748997 0.662574 -0.748997 -0.662574 25.0715 0)" stroke="black" stroke-width="2"/>
    </svg>    
}
const BetSlip = ({bets, updateData}: {bets: MarketSelectionItem[], updateData: (bets: MarketSelectionItem[]) => void}) => {
    const onOptionClick = useOptionChange(updateData, bets)
    const handleDeleteBet = (id?: number) => {
        onOptionClick(id);
        setIsOpen(false);
    }
    const [isOpen, setIsOpen] = useState(false);
    const selectedBets = bets.filter((bet) => bet.options.some((option) => option.isSelected));
    const total = selectedBets.reduce((total, bet) => total + bet.options.reduce((total, option) => total + (option.isSelected ? parseFloat(option.value) : 0), 0), 0);
    return <div className="betslip" >
        <button className="betslip-header" onClick={() => setIsOpen(!isOpen)}>
            <div className="betslip-title">
            <div className="betslip-count">{selectedBets.length}</div>
            Bet Slip
            </div>
            <div className="bb">BB</div>
            {selectedBets.length > 1 ? <div className="total">{total > 0 ? `+${total}` : total}</div> : <div className="add-bet">Add another selection</div>}
        </button>
        <div className={`betslip-body ${isOpen ? '' : 'hidden'}`} >
            {
                selectedBets.length > 1 && (
                    <div className="bet-pick-container main-bet">
                        <div className="bet-pick">
                            <div className="betbuilder-row">
                                <button className="delete-bet" onClick={() => handleDeleteBet()}><DeleteBetIcon /></button>
                                <div className="betbuilder-title">Bet Builder</div>
                                <div className="betbuilder-count">{`${selectedBets.length} Picks`}</div>
                            </div>
                            <p>Team 1 vs Team 2</p>
                            {
                                selectedBets.map((bet) => (<div className="bet">
                                    <button className="delete-bet" onClick={() => handleDeleteBet(bet.id)}><DeleteBetIcon /></button>
                                    <svg width={10} height={10}><ellipse cx="5" cy="5" rx="4" ry="4" stroke="black" fill="none" /></svg>
                                    <div className="bet-choice">
                                        <h1>{bet.singleSelection ? `${bet.options.find((option) => option.isSelected)?.name}` : `${bet.options.filter((option) => option.isSelected).length} Picked`}</h1>
                                        <p>{bet.title}</p>
                                    </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="bet-wager">
                            <h1>{`${total > 0 ? `+${total}` : total}`}</h1>
                            <div className="wage-input">
                                <p>$</p>
                                <input type="number" placeholder="0.00"/>
                            </div>
                            <div className="payout">
                                Payout:
                                <p>$0.00</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                selectedBets.map((bet) => {
                    const totalForBet = bet.options.reduce((total, option) => total + (option.isSelected ? parseFloat(option.value) : 0), 0)
                    return <div className="bet-pick-container">
                        <div className="bet-pick">
                            <div className="betbuilder-row">
                                <button className="delete-bet" onClick={() => handleDeleteBet(bet.id)}><DeleteBetIcon /></button>
                                <div className="betbuilder-title">Single</div>
                            </div>
                            <p>Team 1 vs Team 2</p>
                            <div className="bet">
                                <div className="bet-choice">
                                    <h1>{bet.singleSelection ? `${bet.options.find((option) => option.isSelected)?.name}` : `${bet.options.filter((option) => option.isSelected).length} Picked`}</h1>
                                    <p>{bet.title}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bet-wager">
                            <h1>{`${totalForBet > 0 ? `+${totalForBet}` : totalForBet}`}</h1>
                            <div className="wage-input">
                                <p>$</p>
                                <input type="number" placeholder="0.00"/>
                            </div>
                            <div className="payout">
                                Payout:
                                <p>$0.00</p>
                            </div>
                        </div>
                    </div>
                })
            }
            {selectedBets.length === 1 && (<p className="add-pick-disclaimer">Add 1 more pick to build a valid BET BUILDER</p>)}
            <button className="add-picks" onClick={() => setIsOpen(false)}>Add Picks</button>
      </div>
  </div>
}

export default BetSlip