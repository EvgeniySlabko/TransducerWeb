export function GetColorBySeed(baseColor: string, seed: number) : string
{
    //let decreased = decrease_brightness(baseColor, 100);
    //let newColor = increase_brightness(baseColor, seed * 5);
    return baseColor;
}

function decrease_brightness(hex: string, dec: number){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r - dec).toString(16)).substr(1) +
       ((0|(1<<8) + g - dec).toString(16)).substr(1) +
       ((0|(1<<8) + b - dec).toString(16)).substr(1);
}