import { formatDate } from "./FormatDate";

describe('FormatDate', () => {
    const dateTest = "2020-05-19"

    it("should return formatted date", () => {
        expect(formatDate(dateTest)).toBe("5/19/2020")
    })
}) 
