import React, { useState } from "react";
import "./MasterCard.css";

const MasterCard = (props) => {

    const [isMetric, setIsMetric] = useState(true);

    const convertTemp = (value, mode) => {
        if (typeof value === "number") {
            if (mode === true) {
                //convert kelvin to celcius
                return (
                    Math.floor(
                        (value - 273.1)
                    )
                );
            }
            else {
                //convert kelvin to fahrenheit
                return (
                    Math.floor(
                        ((value - 273.1) * (9 / 5)) + 32
                    )
                );
            }
        }
        else {
            return value;
        }
    }

    return (
        <div class="mastercard-container">
            <div className="tempurature-container noselect">
                <div className="maintemp-container">
                    <span className="maintemp-ghost">°</span>
                    <h1 className="maintemp-value">{convertTemp(props.mainTemp, isMetric)}</h1>
                    <span className="maintemp-degrees">°</span>
                </div>
                <div className="feelsliketemp-container">
                    <span className="feelslike-value">{`Feels Like: ${convertTemp(props.feelsLikeTemp, isMetric)}°`}</span>
                </div>
                <div className="mode-container">
                    <span className={isMetric ? "mode-selected" : ""} onClick={() => setIsMetric(!isMetric)}>C</span>
                    <span className={!isMetric ? "mode-selected" : ""} onClick={() => setIsMetric(!isMetric)}>F</span>
                </div>
            </div>
            <div className="weathercard-container noselect">
                <div className="icon-container">
                    <i className={props.icons[props.main]} />
                </div>
                <div className="description-container">
                    <span>{props.description}</span>
                </div>
            </div>
        </div>
    )
}

export default MasterCard;