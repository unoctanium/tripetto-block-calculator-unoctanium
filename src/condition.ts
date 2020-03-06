/** Package information retrieved from `package.json` using webpack. */
declare const PACKAGE_NAME: string;
declare const PACKAGE_VERSION: string;
//const PACKAGE_NAME = "tripetto-block-calculator";
//const PACKAGE_VERSION = "0.0.1";

/** Dependencies */
import {
    ConditionBlock,
    Forms,
    Slots,
    affects,
    definition,
    editor,
    pgettext,
    tripetto
} from "tripetto";
import { Calculator } from "./calculator";

/** Assets */
import * as ICON from "../assets/icon.svg";

@tripetto({
    type: "condition",
    identifier: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    context: Calculator,
    icon: ICON,
    label: () => pgettext("calculator", "Verify number")
})
export class CalculatorCondition extends ConditionBlock {
    @definition
    @affects("#name")
    value = 0;
    @definition
    @affects("#name")
    mode: "equal" | "below" | "above" = "equal";
    // Return an empty label, since the node name is in the block name already.
    get label(): string {
        return "";
    }
    get name(): string {
        if (this.node) {
            const slot = this.node.slot<Slots.Numeric>("calculator");
            if (slot) {
                return `@${slot.id} ${
                    this.mode === "above"
                        ? ">"
                        : this.mode === "below"
                        ? "<"
                        : "="
                } ${`\`${slot.toString(this.value)}\``}`;
            }
        }
        return this.type.label;
    }
    @editor
    defineEditor(): void {
        if (this.node) {
            const slot = this.node.slot<Slots.Numeric>("calculator");
            this.editor.form({
                controls: [
                    new Forms.Radiobutton<"equal" | "below" | "above">(
                        [
                            {
                                label: pgettext("calculator", "Is equal to"),
                                value: "equal"
                            },
                            {
                                label: pgettext("calculator", "Is lower than"),
                                value: "below"
                            },
                            {
                                label: pgettext("calculator", "Is higher than"),
                                value: "above"
                            }
                        ],
                        Forms.Radiobutton.bind(this, "mode", "equal")
                    ),
                    new Forms.Numeric(Forms.Text.bind(this, "value", 0))
                        .precision((slot && slot.precision) || 0)
                        .autoFocus()
                ]
            });
        }
    }
}
