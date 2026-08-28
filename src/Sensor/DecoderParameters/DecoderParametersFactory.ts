import { DecoderType } from "../../store/uiSlice";

export declare class DecoderParameters {
    minAvgRatio: number;
}

export function CreateDecoderParameters(decoderType: DecoderType): DecoderParameters {
    switch (decoderType) {
        case "RS485":
            return {
                minAvgRatio: 50,
            };
        case "VCOM":
            return {
                minAvgRatio: 1,
            };
        case "USB":
            return {
                minAvgRatio: 1,
            };
        case "Faker":
            return {
                minAvgRatio: 1,
            };

        default:
            throw "Invalid decoder type.";
    }
}
