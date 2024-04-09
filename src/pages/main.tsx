import { Button, IconButton, Switch, Tooltip, Typography } from "@mui/material"
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import BetSlip from "../components/betslip"
import MarketSelection from "../components/market-selection"
import { useState } from "react";

const InfoButton = () => {
    return <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4167 32.8333C21.6738 32.8333 25.528 31.1077 28.3179 28.3179C31.1077 25.528 32.8333 21.6738 32.8333 17.4167C32.8333 13.1595 31.1077 9.30534 28.3179 6.51543C25.528 3.72557 21.6738 2 17.4167 2C13.1595 2 9.30534 3.72557 6.51543 6.51543C3.72557 9.30534 2 13.1595 2 17.4167C2 21.6738 3.72557 25.528 6.51543 28.3179C9.30534 31.1077 13.1595 32.8333 17.4167 32.8333Z" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4167 7.39581C18.481 7.39581 19.3438 8.25861 19.3438 9.3229C19.3438 10.3872 18.481 11.25 17.4167 11.25C16.3524 11.25 15.4896 10.3872 15.4896 9.3229C15.4896 8.25861 16.3524 7.39581 17.4167 7.39581Z" fill="white"/>
    <path d="M17.802 25.125V14.3333H17.0312H16.2604" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.1041 25.125H20.5" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
}

export type MarketSelectionItem = {
    id: number;
    title: string;
    isTeam?: boolean;
    singleSelection?: boolean;
    options: { name: string; value: string, isSelected?: boolean }[];
  };

const calculateSelectedOptionsForAllIds = (marketSelectionData: MarketSelectionItem[]) => {
    let selectedOptionsByid: { [title: string]: { [key: string]: number} }  = {};

    let selectedCount = 0
    marketSelectionData.forEach((marketItem) => {
      let selectedOptions: { [key: string]: number}  = {  };
  
      marketItem.options.forEach((option) => {
        if (option.isSelected) {
          selectedOptions[option.name] = parseFloat(option.value);
          selectedCount++;
        }
      });
  
      selectedOptionsByid[marketItem.title] =  selectedOptions;
    });
  
    return {selectedOptionsByid, selectedCount};
};

const Main = () => {
    const [marketSelectionData, setMarketSelectionData] = useState<MarketSelectionItem[]>([
        {
            id: 1,
            title: "Moneyline",
            isTeam: true,
            singleSelection: true,
            options: [
                { name: "Team 1", value: "-150" },
                { name: "Draw", value: "+200" },
                { name: "Team 2", value: "+235" }
            ]
        },
        {
            id: 2,
            title: "Both teams to score",
            singleSelection: true,
            options: [
                { name: "Yes", value: "-110" },
                { name: "Draw", value: "-120" }
            ]
        },
        {
            id: 3,
            title: "Any time goalscorer",
            options: [
                { name: "Player 1", value: "+110" },
                { name: "Player 2", value: "+200" },
                { name: "Player 3", value: "+300" },
                { name: "Player 4", value: "+220" },
                { name: "Player 5", value: "+150" }
            ]
        }
      ]);


      const {selectedOptionsByid, selectedCount} = calculateSelectedOptionsForAllIds(marketSelectionData);
      
    return <div className="main">
        <div className="header">
            <img src="logo.png" />
            <div className="user-actions">
                <Button variant="contained" >Login</Button>
                <Button variant="contained" color="success">Register</Button>
            </div>
        </div>
        <div className="team-selection">
            <div className="back"></div>
            <div className="team-data">
                Team 1
                <div className="vs">VS</div>
                Team 2
            </div>
            Game Data
        </div>
        <div className="bet-toggle">
            <div className="bet-toggle-info">
                BET BUILDER
                <Tooltip title="BET BUILDER">
                    <IconButton><InfoButton/></IconButton>
                </Tooltip>
            </div>
            <Switch defaultChecked color="error" />
        </div>
        <div className="propositions">
            <Button variant="text" className="proposition selected">Proposition 1</Button>
            <Button variant="text" className="proposition">Proposition 2</Button>
            <Button variant="text" className="proposition">Proposition 3</Button>
            <Button variant="text" className="proposition">Proposition 4</Button>
        </div>
        <MarketSelection data={marketSelectionData} updateData={setMarketSelectionData}/>
        {/* {Object.keys(selectedOptionsByid).map((title: string)  => (
        <div key={title}>
          <p>Selected Options for ID {title}: {JSON.stringify(selectedOptionsByid[title as keyof typeof selectedOptionsByid])}</p>
        </div>
      ))}
      <p>Selected Count: {selectedCount}</p> */}
        {marketSelectionData.reduce((total, marketItem) => total + marketItem.options.reduce((total, option) => total + (option.isSelected ? 1 : 0), 0), 0) > 0 
        && (<BetSlip bets={marketSelectionData} updateData={setMarketSelectionData}/>)}
    </div>
}

export default Main