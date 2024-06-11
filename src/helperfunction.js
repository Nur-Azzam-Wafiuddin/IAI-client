export const AQIColor = (aqi) => {
    let result = "rgb(162, 220, 97)"
    if(aqi <= 50){
        result = "rgb(162, 220, 97)"
    }else if(51 <= aqi && aqi <= 100){
        result = "rgb(251, 214, 81)"
    }else if(101 <= aqi && aqi <= 150){
        result = "rgb(253, 154, 87)"
    }else if(151 <= aqi && aqi <= 200){
        result = "rgb(255, 106, 110)"
    }else if(201 <= aqi && aqi <= 300){
        result = "rgb(169, 123, 188)"
    }else if(301 <= aqi && aqi <= 500){
        result = "rgb(155, 89, 115)"
    }
    return result
};