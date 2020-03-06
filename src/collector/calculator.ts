/** Dependencies */
/** Package information retrieved from `package.json` using webpack. */
declare const PACKAGE_NAME: string;
//const PACKAGE_NAME = "tripetto-block-calculator";
import {
    HeadlessBlock,
    Slots,
    assert,
    castToFloat,
    tripetto
} from "tripetto-collector";
import { ICalculator } from "../interface";
@tripetto({
    type: "headless",
    identifier: PACKAGE_NAME
})
export class Calculator extends HeadlessBlock<ICalculator> {
    /** Contains the number slot with the value. */
    readonly calculatorSlot = assert(this.valueOf<number, Slots.Numeric>("calculator"));

    // assign the result of the functionType with args to the result slot
    do(): void {      
        var result = 0.0;



        this.calculatorSlot.value = result; 
    }
}

