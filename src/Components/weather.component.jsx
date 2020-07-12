import React from "react";

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards pt-4">
                <h1 className="py-4">{props.city}, {props.country}</h1>
                <h6 className="py-2">
                    GMT + {props.time}
                </h6>
                <h4 className="py-4">
                    <i className={getIcon(props.icon)}></i>
                </h4>
                <h1 className="py-2">
                    {props.temp_celsius}<i className="wi wi-celsius display-4"></i> | {props.temp_fahren} <i className="wi wi-fahrenheit display-4"></i>
                </h1>
                <hr/>
                {
                    /** show max temp and min temp*/ 
                    minmaxTemp(props.temp_min,props.temp_max)
                }
                <hr/>
                <h3 className="py-2">
                    <span className="px-4">
                        <i className="wi wi-cloud"></i>
                    </span>
                    
                    <span className="px-4">
                        {props.clouds} %
                    </span>
                </h3>
                <hr/>
                <h3 className="py-2">
                    <span className="px-4">
                        <i className="wi wi-barometer"></i>
                    </span>
                    
                    <span className="px-4">
                        {props.pressure} in
                    </span>
                </h3>
                <hr/>
                <h3 className="py-2">
                    <span className="px-4">
                        <i className="wi wi-humidity"></i> 
                    </span>
                    <span className="px-4">
                    {props.humidity} %
                    </span>
                </h3>
                <hr/>
                
                <h3 className="py-2">
                    <span className="px-4">
                        <i className="wi wi-windy"></i> 
                    </span>
                    <span className="px-4">
                    {props.wind} mph 
                    </span>
                    <span className="px-4">
                        <i className={setDirection(props.wind_direction)}></i> 
                    </span>
                </h3>
                <hr/>
                <h4 className="py-3">{props.description}</h4>
            </div>
        </div>
    )
}

const minmaxTemp = (min,max) => {
    return (
        <h3 className="py-2">
            <span className="px-4"><i className="wi wi-thermometer"></i></span>
            <span className="px-4">{max}&deg; / {min}&deg;</span>
            
        </h3>
    )
}

const getIcon = (weather) =>{
    return "wi "+weather+" display-1";
}
const setDirection = (deg) => {
    return "wi wi-wind towards-"+deg+"-deg";
}
export default Weather;