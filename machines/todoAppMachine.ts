import { createMachine } from "xstate";

export const todosMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJgDa0SQBtAAwBdRKAAOnYgBdiqUuJAAPRAFoAzABYKAVgCMugGwAmXQBoQAT3Um9AX3uWOOAiXLU+DJuk6sadN4cXABmuMTcgqJKUrCy8opIKuoAnEJ6hqYW1ohpjk4gpOhwSi54RGRgMdJyCkqqCGomWhqWNo15BWVulZ6BpIzB1XG1iaANavop2e06WvpGi0vLRgDs+o7Ovq4VHsGYAfwQw-F1SQ36qwAcFFe6KRqrM7abIN27lIfeMr5cYABO-1Q-0gJ1G9UQC10t3uj2eCCuGgc+SAA */
createMachine({
    id: "Todo machine",
    initial: "Loading Todos",
    states: {
        "Loading Todos": {
            on: {
                "Todos loaded": "Todos Loaded",
                "Loading Todos failed": "Loading todos errored"
            }
        },

        "Todos Loaded": {},
        "Loading todos errored": {}
    },
});