export function SetParameter(key: string, value: any) {
    let serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
}

export function GetParameter<T>(key: string): T | null {
    let strVal = localStorage.getItem(key);
    if (strVal) return JSON.parse(strVal) as T;
    else return null;
}

export function GetParameterOrDefault<T>(key: string, defaultValue: T, validator?: (value: T) => boolean): T {
    let value = GetParameter<T>(key);

    if (value && (validator === undefined || validator(value))) return value;
    else return defaultValue;
}
