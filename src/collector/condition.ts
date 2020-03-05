/** Package information retrieved from `package.json` using webpack. */
declare const PACKAGE_NAME: string;
//const PACKAGE_NAME = "tripetto-block-calculator";
/** Dependencies */
import { ConditionBlock, condition, tripetto } from "tripetto-collector";
@tripetto({
    type: "condition",
    identifier: PACKAGE_NAME
})
export class CalculatorCondition extends ConditionBlock<{
    value: number;
    mode: "equal" | "below" | "above";
}> {
    @condition
    verify(): boolean {
        const numberSlot = this.valueOf<number>();
        if (numberSlot && numberSlot.hasValue) {
            switch (this.props.mode) {
                case "below":
                    return numberSlot.value < this.props.value;
                case "above":
                    return numberSlot.value > this.props.value;
                default:
                    return numberSlot.value === this.props.value;
            }
        }
        return false;
    }
}
