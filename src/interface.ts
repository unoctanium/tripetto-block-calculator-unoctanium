import { TFunctionTypes } from "./types";
export interface ICalculator {
    functionType: TFunctionTypes;
    argument1: string | undefined;
    argument2: string | undefined;
    argument3: string | undefined;
}
