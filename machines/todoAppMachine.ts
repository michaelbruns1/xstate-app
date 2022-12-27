import { createMachine, assign } from "xstate";

export const todosMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMWgOwAmCgFYAbE9dbvAFgcAzLYODgA0IACeiAC0Tu5aFAEeIQCcWgAcKQ6+6QC+ueFCOAQknBL0pIxCbByUCgIURSKl4rQVVTJyCkrmmroatgZIICawZmqkljYItu4pruFRCE4BFF6pWgH+6elJDvmFMsWiZW1S1axgAE5XqFcURgA2KgBmd9iNR81i1GeV0ix5KReD0Jvp9JZRuMLMNpjkUhQUu53LZfFk0rZ0rZFjEAlkKIEHFpib5fO5fI5bAcQE0Sj9qphypBWABhK5gFRgTDkADuEOGUN6UzsrgCq3JWnJriRmx27hxy1sBNcGy2Dh2e2ptJOgk6jLazIAImBHmBlGB+cZTELYXZgr5EmKkik0kjfE4nArXBSKLYnA5pdL7F5bCktV86Zw2RzVP9eZhlDIKABlQioHlSN5XbCYMhGACuylYADF3rnSAXlJgiLhKpBLSNrRNhTNfK4lSqnCknH7bN7dukFXEXN51bZUQ5Me7AuGMMcWhRoyopPHExgU2mM-8szm84XWMn8wAjbBmBuC5u2mbpdsUdJOLFeBUUhJ+gPzFLB9thgo0iM6xd2WXOMwB5BMk2TXBuCkNdUHYdQ6mBfhdTnb4oyA2NGFXCCoJgmQgRBZd1HBXRISbGFQDhdwHDcMcViyKd-QCBV3G8RF4hSLY+0lF19l-bUFyXTDuVA8D10g6D-lgy4bjuB5nmUHdPlQyNKCEldRNglNcKk-DuiIvo9FIgVyMmK9ZlcFx3HvIItE-LZ5UiRAAh2ZUxy0D1XCDAJ3FnYRVIoY1TWE6Tai4JCGgEn4grNPCMAIxQDJIoYrTGG1KMQckEWRZFsi7F0vMcpZO3YuyuO8OYsj8+dopNWLdIwGTbnuJ5XneZT-IAmKQr0pDQWI-pjNS6EzIyhB0iJChiWHMkUnSVjyQVAIPUdMV-GRSyPR-Q4VK6uqerna5muZZMjDASBMHzIxz1Mlt0hyRF7rxLRUVDUUvXSO87LSF6JQ8VxqrQyhurirAjruZkrFgZROQoXAXnNK4AAovGJABKVgos4EGGrB2T2QgG60svMa5tcO9gmcb05gfXYFXsRJvuJWYKX+wGAoZJkIAPKCLSGxtiYo6w7DiJV4j7dUXVROyFicmYVocayVjJZbyWsvJ+P-BcJNB1hYF5oQiZGlsiSVDInWcDF0jshVYk+nJgnu0lzZSUkNZ2zrtZ0xhpPBq4EEwfXuDAQ3+YvIXplcLEpt2MVLZe62UhYlxFfvPsvM-eIvPyX9SHQOBLCxsAyMF0bhYQXxQ1ox88Une6mNtjxPuoycfE7ewgnZgDynOToS+Nq80RcJ0467BPsTl2JLN9UVkWJScA0rgIu4XTmDQgfv0vL8ckhnzwvK0fwghCW25ooB3Fc-e8fE2ba-12hce9x2BMD9yBN5J8v-ASSuKQ48cPJIllksaIDtfQhHsNkBwrt2x8Q9jVdCMYNJgVgh-COdgKSrE7N2Xs-YXL0w8BQTw74gweW-CvH46kQIoIgpuTMZY9zKDQWXaYwQGbIj-t6T8xJmJyycKSX0-pAzcJDHfIugEkHULEqgbSkkfYyGYS2YIYovqWxvJtQ+Sc5YoiVF2ac9Fxz+ABprB+tVgqg0UVeeaCIkRJE8KGeaHheHFSCOxFE7okRzC8svExnszH1XkYdfG78TKlzuqxIhOUJoOIWr4IcmJz6KxVMEUUlcVQ+PgUDWRFjQkDzGkSFw9gJaZE-BSeY9MFZK3TkGLOxjMkBXjNDTkmBbCWLGh4BE5tR5WxtpPBEKxHakgpLsV2OQc65CAA */
    createMachine(
        {
          context: {
            todos: [] as string[],
            errorMessage: undefined as string | undefined,
            createNewTodoFormInput: "",
          },
          tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
          schema: {
            services: {} as {
              loadTodos: {
                data: string[];
              };
              saveTodo: {
                data: void;
              };
              deleteTodo: {
                data: void;
              };
            },
            events: {} as
              | {
                  type: "Create new";
                }
              | {
                  type: "Form input changed";
                  value: string;
                }
              | {
                  type: "Submit";
                }
              | {
                  type: "Delete";
                  todo: string;
                }
              | {
                  type: "Speed up";
                },
          },
          id: "Todo machine",
          initial: "Loading Todos",
          states: {
            "Loading Todos": {
              invoke: {
                src: "loadTodos",
                onDone: [
                  {
                    actions: "assignTodosToContext",
                    cond: "Has todos",
                    target: "Todos Loaded",
                  },
                  {
                    target: "Creating new todo",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Loading todos errored",
                  },
                ],
              },
            },
            "Todos Loaded": {
              on: {
                "Create new": {
                  target: "Creating new todo",
                },
                Delete: {
                  target: "Deleting todo",
                },
              },
            },
            "Loading todos errored": {},
            "Creating new todo": {
              initial: "Showing form input",
              states: {
                "Showing form input": {
                  on: {
                    "Form input changed": {
                      actions: "assignFormInputToContext",
                    },
                    Submit: {
                      target: "Saving todo",
                    },
                  },
                },
                "Saving todo": {
                  invoke: {
                    src: "saveTodo",
                    onDone: [
                      {
                        target: "#Todo machine.Loading Todos",
                      },
                    ],
                    onError: [
                      {
                        actions: "assignErrorToContext",
                        target: "Showing form input",
                      },
                    ],
                  },
                },
              },
            },
            "Deleting todo": {
              invoke: {
                src: "deleteTodo",
                onDone: [
                  {
                    target: "Loading Todos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Deleting todo errored",
                  },
                ],
              },
            },
            "Deleting todo errored": {
              after: {
                "2500": {
                  target: "Todos Loaded",
                },
              },
              on: {
                "Speed up": {
                  target: "Todos Loaded",
                },
              },
            },
          },
        },
        {
          guards: {
            "Has todos": (context, event) => {
              return event.data.length > 0;
            },
          },
          actions: {
            assignTodosToContext: assign((context, event) => {
              return {
                todos: event.data,
              };
            }),
            assignErrorToContext: assign((context, event) => {
              return {
                errorMessage: (event.data as Error).message,
              };
            }),
            assignFormInputToContext: assign((context, event) => {
              return {
                createNewTodoFormInput: event.value,
              };
            }),
          },
        },
      );