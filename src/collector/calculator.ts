/** Dependencies */
/** Package information retrieved from `package.json` using webpack. */
declare const PACKAGE_NAME: string;
//const PACKAGE_NAME = "tripetto-block-calculator";
import {
    HeadlessBlock,
    Slots,
    assert,
    tripetto
} from "tripetto-collector";
import { ICalculator } from "../interface";
import { castToFloat } from "tripetto-collector";
@tripetto({
    type: "headless",
    identifier: PACKAGE_NAME
})
export class Calculator extends HeadlessBlock<ICalculator> {
    /** Contains the number slot with the value. */
    readonly calculatorSlot = assert(this.valueOf<number, Slots.Numeric>("calculator"));

    // get the arguments as numbers
    //a1 = parseFloat(this.props.argument1 || "");
    //a2 = parseFloat(this.props.argument2 || "");
    //a3 = parseFloat(this.props.argument3 || "");

    // assign the result of the functionType with args to the result slot
    do(): void {      
        var result = 0.0;

        const a1 = castToFloat(
          this.props.argument1, 
          castToFloat(this.variableFor(this.props.argument1)?.value)
        ); 
        const a2 = castToFloat(
          this.props.argument2, 
          castToFloat(this.variableFor(this.props.argument2)?.value)
        ); 
        const a3 = castToFloat(
          this.props.argument3, 
          castToFloat(this.variableFor(this.props.argument3)?.value)
        );

        //console.log(this.props.argument1);
        
        switch (this.props.functionType) {
            case "add":
                result = this.a1 + this.a2; 
                break;
            case "substract":
                result = this.a1 - this.a2; 
                break;
            case "multiply":
                result = this.a1 * this.a2;
                break;
            case "divide":
                if (this.a2 != 0)
                    result = this.a1 / this.a2;
                else
                    result = 0;
                break;
            case "minimum":
                result = this.a1 < this.a2 ? this.a1 : this.a2;
                break;
            case "maximum":
                result = this.a1 > this.a2 ? this.a1 : this.a2;
                break;
            case "average":
                result = (this.a1 + this.a2) / 2;
                break;
            case "floor":
                result = Math.floor( this.a1 );
                break;
            case "ceil":
                result = Math.ceil( this.a1 );
            break;
            case "round":
                result = Math.round(this.a1);
        }
        this.calculatorSlot.value = result; 
    }
}

