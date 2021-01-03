import React, {useState} from "react";
import "./MetaCard.css";

const MetaCard = (props) => {

    const [cityInput, setCityInput] = useState(props.cityValue);

    const detectEnterKey = (e) => {
        if (e.key === "Enter") {
            props.changeCityValue(cityInput);
        }
    }

    return (
        <div className="metacard-container noselect">
            <div className="data-container">
                <ul>
                    <li>{`Latitude: ${props.lat}°`}</li>
                    <li>{`Longitude: ${props.lon}°`}</li>
                </ul>
            </div>
            <div className="cityvalue-container">
                <span>{`City: ${props.cityValue}`}</span>
                <input value={cityInput} onKeyUp={detectEnterKey} onChange={(e) => setCityInput(e.target.value)}></input>
            </div>
        </div>
    );
}

export default MetaCard;