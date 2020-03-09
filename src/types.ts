/** Dependencies */
import { pgettext } from "tripetto";
export type TFunctionTypes =
    | "add"
    | "substract"
    | "multiply"
    | "divide"
    | "minimum"
    | "maximum"
    | "average"
    | "floor"
    | "ceil"
    | "round";

export function getFunctionName(type: TFunctionTypes): string {
    switch (type) {
        case "add":
            return pgettext("calculator", "Add values");
        case "substract":
            return pgettext("calculator", "Substract values");
        case "multiply":
            return pgettext("calculator", "Multiply values");
        case "divide":
            return pgettext("calculator", "Divide values");
        case "minimum":
            return pgettext("calculator", "Get minimum");
        case "maximum":
            return pgettext("calculator", "Get maximum");
        case "average":
            return pgettext("calculator", "Get average");
        case "floor":
            return pgettext("calculator", "Get lower integer");
        case "ceil":
            return pgettext("calculator", "Get higher integer");
        case "round":
            return pgettext("calculator", "Round value");
    }
}
export function getFunctionDescription(type: TFunctionTypes): string {
    switch (type) {
        case "add":
            return pgettext("calculator", "Adds two values.");
        case "substract":
            return pgettext("calculator", "Substracts two values.");
        case "multiply":
            return pgettext("calculator", "Multiplies two values.");
        case "divide":
            return pgettext("calculator", "Divides two values.");
        case "minimum":
            return pgettext("calculator", "Get the minimum of two values.");
        case "maximum":
            return pgettext("calculator", "Get the maximum of two values.");
        case "average":
            return pgettext("calculator", "Calculate average.");
        case "floor":
            return pgettext("calculator", "Get lower integer value.");
        case "ceil":
            return pgettext("calculator", "Get higher integer value.");
        case "round":
            return pgettext("calculator", "Round value to integer.");
    }
}
export function getFunctionNumArgs(type: TFunctionTypes): number {
    switch (type) {
        case "add":
        case "substract":
        case "multiply":
        case "divide":
        case "minimum":
        case "maximum":
        case "average":
            return 2;
        case "floor":
        case "ceil":
        case "round":
            return 1;
    }
}
