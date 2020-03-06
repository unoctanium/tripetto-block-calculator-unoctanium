/** Dependencies */
/** Package information retrieved from `package.json` using webpack. */
declare const PACKAGE_NAME: string;
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
    readonly calculatorSlot = assert(
        this.valueOf<number, Slots.Numeric>("calculator")
    );

    // Read values out of the argument fields in the editor or evaluate the pipe values inside there
    getNumberFromFieldOrPipe(prop: string | undefined): number {
        if (!prop) {
          return 0;
        }
        if (prop.lastIndexOf("@", 0) === 0) {  // ECMA6: startsWith("@"))
            const v1 = this.variableFor(prop.substring(1));
            if (v1) {
              return castToFloat(v1.value);
            }
            return 0;
        }
        return castToFloat(prop);
    }

    // Assign the result of the functionType with args to the result slot
    do(): void {
        let result = 0.0;

        const a1 = this.getNumberFromFieldOrPipe(this.props.argument1);
        const a2 = this.getNumberFromFieldOrPipe(this.props.argument2);
        // If needed: const a3 = this.getNumberFromFieldOrPipe(this.props.argument3);

        switch (this.props.functionType) {
            case "add":
                result = a1 + a2;
                break;
            case "substract":
                result = a1 - a2;
                break;
            case "multiply":
                result = a1 * a2;
                break;
            case "divide":
                result = (a2 !== 0) ? a1 / a2 : 0;
                break;
            case "minimum":
                result = (a1 < a2) ? a1 : a2;
                break;
            case "maximum":
                result = (a1 > a2) ? a1 : a2;
                break;
            case "average":
                result = (a1 + a2) / 2;
                break;
            case "floor":
                result = Math.floor(a1);
                break;
            case "ceil":
                result = Math.ceil(a1);
                break;
            case "round":
                result = Math.round(a1);
                break;
        }
        // Old: this.calculatorSlot.value = result;
        this.calculatorSlot.pristine = result;
    }
}
