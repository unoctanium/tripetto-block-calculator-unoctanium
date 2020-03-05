declare const PACKAGE_NAME: string;
declare const PACKAGE_VERSION: string;
//const PACKAGE_NAME = "tripetto-block-calculator";
//const PACKAGE_VERSION = "0.0.1";

import {
  NodeBlock,
  Forms,
  Slots,
  affects,
  definition,
  slots,
  slotInsertAction,
  editor,
  map,
  pgettext,
  isNumber,
  isString,
  conditions,
  tripetto
} from "tripetto";
import { ICalculator } from "./interface";
import { TFunctionTypes, getFunctionName, getFunctionDescription, getFunctionNumArgs } from "./types";
import { CalculatorCondition } from "./condition"
/** Assets */
import * as ICON from "../assets/icon.svg";

// Build a custom block
@tripetto({
  type: "node",
  identifier: PACKAGE_NAME,
  version: PACKAGE_VERSION,
  label: "Calculator block",
  icon: ICON,
  kind: "headless"
})
export class Calculator extends NodeBlock implements ICalculator {
  // Function type
  @definition
  @affects("#name")
  @affects("#slots")
  functionType: TFunctionTypes = "add";
  
  // Function argument1
  @definition
  @affects("#name")
  argument1: string | undefined;
  
  // Function argument2
  @definition
  @affects("#name")
  argument2: string | undefined;
  
  // Function argument3
  @definition
  @affects("#name")
  argument3: string | undefined;
  
  // Slot for calculation results
  calculatorSlot!: Slots.Numeric;

  // to crate label from funcType and arguments
  get label(): string {
    let label = this.type.label + "/" + getFunctionName(this.functionType);
    return label;
  }

  @slots
  defineSlot(): void {
    // Define my slot for the calculation result here...
    this.calculatorSlot = this.slots.static({
        type: Slots.Numeric,
        reference: "calculator",
        label: this.label,
    }); 
    this.calculatorSlot.precision = 2;
  }

  @editor
    defineEditor(): void {
      
        const description = new Forms.Static(
            getFunctionDescription(this.functionType)
        );
        
        const fnOptions = (...types: TFunctionTypes[]) =>
            map(types, (type: TFunctionTypes) => ({
                label: getFunctionName(type),
                value: type
            }));
        
        // Block name
        this.editor.name(false, false, pgettext("calculator", "Name"), false);
        
        // Block explanation
        this.editor.explanation();

        // Group for Function
        this.editor.group(pgettext("calculator", "Function"))

        // Calculator-Function selector
        this.editor.option({
            label: pgettext("calculator", "Function"),
            form: {
                title: pgettext("calculator", "Type of function"),
                controls: [
                    new Forms.Dropdown<TFunctionTypes>(
                        [
                            {
                                optGroup: pgettext(
                                    "calculator",
                                    "Basic functions"
                                )
                            },
                            ...fnOptions(
                                "add",
                                "substract",
                                "multiply",
                                "divide"
                            ),
                            {
                                optGroup: pgettext(
                                    "calculator",
                                    "Other functions"
                                )
                            },
                            ...fnOptions(
                                "minimum",
                                "maximum",
                                "floor",
                                "ceil",
                                "round"
                            ),
                        ],
                        Forms.Radiobutton.bind(this, "functionType", "add")
                    ).on((type: Forms.Dropdown<TFunctionTypes>) => {
                        description.label(getFunctionDescription(this.functionType));
                        // show function-argument features depending on number of args
                        let numArgs = getFunctionNumArgs(this.functionType);
                        functionArgument1Feature.visible(numArgs >= 1);
                        functionArgument1Feature.enabled(numArgs >= 1);
                        functionArgument2Feature.visible(numArgs >= 2);
                        functionArgument2Feature.enabled(numArgs >= 2);
                        functionArgument3Feature.visible(numArgs >= 3);
                        functionArgument3Feature.enabled(numArgs >= 3);
                    })
                ]
            },
            enabled: true,
            locked: true
        });
        
        // Calculator-Function description
        this.editor.form({
            title: pgettext("calculator", "What it does"),
            controls: [description]
        });
        
        // to define a form for showing argument features
        const fnAddArgumentFeature = (
            label: string,
            property:
                | "argument1"
                | "argument2"
                | "argument3",
            enabled: boolean,
            locked: boolean,
            visible: boolean = enabled
        ) =>
            this.editor
                .option({
                    label,
                    form: {
                        //title,
                        controls: [
                            new Forms.Text(
                                "singleline",
                                Forms.Text.bind(this, property, undefined)
                            )
                            .label(label)
                            .placeholder(pgettext("paragraph", "Type constant or @ here..."))
                            .action("@", slotInsertAction(this.node))
                        ]
                    },
                    enabled,
                    locked
                })
                .visible(visible);
        
        const functionArgument1Feature = fnAddArgumentFeature(
            pgettext("calculator", "Argument 1"),
            "argument1",
            true,
            true
        );
        
        const functionArgument2Feature = fnAddArgumentFeature(
            pgettext("calculator", "Argument 2"),
            "argument2",
            true,
            true
        );
        
        const functionArgument3Feature = fnAddArgumentFeature(
            pgettext("calculator", "Argument 3"),
            "argument3",
            true,
            true
        );
        
        // Group for result formatting
        this.editor.group(pgettext("calculator", "Format Result"))

        // Option for result precision
        this.editor.option({
            label: pgettext("tripetto-block-number", "Format"),
            form: {
                controls: [
                    new Forms.Dropdown(
                        [
                            { label: "#", value: 0 },
                            { label: "#.#", value: 1 },
                            { label: "#.##", value: 2 },
                            { label: "#.###", value: 3 },
                            { label: "#.####", value: 4 },
                            { label: "#.#####", value: 5 },
                            { label: "#.######", value: 6 },
                            { label: "#.#######", value: 7 },
                            { label: "#.########", value: 8 }
                        ],
                        Forms.Dropdown.bind(
                            this.calculatorSlot,
                            "precision",
                            undefined
                        )
                    )
                    .label(pgettext("tripetto-block-number", "Format"))
                ]
            },
            enabled: isNumber(this.calculatorSlot.precision)
        });

        // Format decimal
        this.editor.option({
            label: pgettext("calculator", "Signs"),
            form: {
                controls: [
                    new Forms.Dropdown(
                        [
                            { label: "#.#", value: "." },
                            { label: "#,#", value: "," }
                        ],
                        Forms.Dropdown.bind(
                            this.calculatorSlot,
                            "decimal",
                            undefined
                        )
                    ).label(pgettext("calculator", "Decimal sign")),
                    new Forms.Dropdown(
                        [
                            {
                                label: pgettext(
                                    "tcalculator",
                                    "None"
                                ),
                                value: undefined
                            },
                            { label: "#,###", value: "," },
                            { label: "#.###", value: "." }
                        ],
                        Forms.Dropdown.bind(
                            this.calculatorSlot,
                            "separator",
                            undefined
                        )
                    ).label(
                        pgettext("calculator", "Thousands separator")
                    )
                ]
            },
            enabled:
                isString(this.calculatorSlot.separator) ||
                isString(this.calculatorSlot.decimal)
        });

        // Format prefix
        this.editor.option({
            label: pgettext("calculator", "Prefix"),
            form: {
                controls: [
                    new Forms.Text(
                        "singleline",
                        Forms.Text.bind(this.calculatorSlot, "prefix", undefined)
                    )
                        .sanitize(false)
                        .label(pgettext("calculator", "Prefix"))
                ]
            },
            enabled: isString(this.calculatorSlot.prefix)
        });

        // Format suffix
        this.editor.option({
            label: pgettext("calculator", "Suffix"),
            form: {
                controls: [
                    new Forms.Text(
                        "singleline",
                        Forms.Text.bind(this.calculatorSlot, "suffix", undefined)
                    )
                        .sanitize(false)
                        .label(pgettext("calculator", "Suffix"))
                ]
            },
            enabled: isString(this.calculatorSlot.suffix)
        });

        // Other Options
        this.editor.groups.options();
        this.editor.visibility();
        this.editor.alias(this.calculatorSlot);
        this.editor.exportable(this.calculatorSlot);
    }

    @conditions
    defineConditions(): void {
        this.conditions.template({
            condition: CalculatorCondition,
            props: {
              slot: this.calculatorSlot
            }
        });
    }

}
