import { Collapse, IconButton, IconButtonProps, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import SelectionButton from './selection-button';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
const Selection = ({title, options, isTeam = false, onOptionClick }: {title: string, isTeam?: boolean , options: {name: string, value: string, isSelected?: boolean}[], onOptionClick: (name: string) => void}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return  <div className='selection'>
        <div className='selection-title'>
            {title}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon fontSize='large' htmlColor='#000000' />
        </ExpandMore>
        </div>
        <Collapse in={expanded}>
        <div className={`selection-options ${isTeam ? 'triplet' : ''}`}> {options.map((option) => <SelectionButton key={option.name} name={option.name} value={option.value} isSelected={!!option.isSelected} onClick={() =>onOptionClick(option.name)}/>)}</div>
    </Collapse>
    </div>
}

export default Selection