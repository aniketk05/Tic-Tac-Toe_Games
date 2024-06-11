import { useState } from "react"

export default function Player({initialName,symbol, isActive})
{
    const [playerName,setPlayerName]=useState(initialName);
    const [isEditing,setIsEditing] =useState(false);

    function editClicked()
    {
        setIsEditing((editing)=>!editing);

    }

    function handleChange(event)
    {
        setPlayerName(event.target.value);
    }

let editedPlayerName=<span className="player-name">{playerName}</span>;

    if(isEditing)
        {
            editedPlayerName=<input type="text" required value={playerName} onChange={handleChange}/>;
        }

    return(
        <li className={isActive ? 'active': undefined}>
        <span className="player">
        {editedPlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editClicked}>{isEditing ? "Save":"Edit"}</button>
      </li>
    )
}