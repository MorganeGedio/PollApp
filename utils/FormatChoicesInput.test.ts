import { formatChoicesInput } from "./FormatChoicesInput";

describe('formatChoicesInput', () => {
    const input = "Choice 1, Choice 2, Choice 3"

    it("should format the choices of the user", () => {
        expect(formatChoicesInput(input)).toBe("[\"Choice 1\",\" Choice 2\",\" Choice 3\"]")
    })
}) 
