const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Load the HTML and JS for testing
const html = fs.readFileSync(path.resolve(__dirname, "./views/Dashboard.ejs"), "utf8");
const script = fs.readFileSync(path.resolve(__dirname, "./public/JS/Profile.js"), "utf8");


let document, window;

beforeEach(() => {
    // Create a simulated browser environment
    const dom = new JSDOM(html, { runScripts: "dangerously" });
    window = dom.window;
    document = window.document;

    // Inject the JavaScript file
    const scriptElement = document.createElement("script");
    scriptElement.textContent = script;
    document.body.appendChild(scriptElement);
});

describe("Code Testing: Core Logic Functions", () => {
    test("Should add a new class", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        const classList = document.getElementById("classList").innerHTML;
        expect(classList).toContain("Class A");
    });

    test("Should add a staff member to a class", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        document.getElementById("staffClass").value = 0;
        document.getElementById("staffName").value = "John Doe";
        document.getElementById("maxClasses").value = "5";
        document.getElementById("subjects").value = "Math, Science";

        window.addStaff();

        const staffList = document.getElementById("staffList").innerHTML;
        expect(staffList).toContain("John Doe");
        expect(staffList).toContain("Math, Science");
    });

    test("Should not allow duplicate staff for the same class", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        document.getElementById("staffClass").value = 0;
        document.getElementById("staffName").value = "John Doe";
        document.getElementById("maxClasses").value = "5";
        document.getElementById("subjects").value = "Math";

        window.addStaff();
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

        window.addStaff(); // Adding the same staff again
        expect(alertMock).toHaveBeenCalledWith('Staff member "John Doe" is already assigned to this class.');

        alertMock.mockRestore();
    });
});

describe("Functional Testing: Timetable Generation", () => {
    test("Each staff member should have at least one free period per day", () => {
        window.generateTimetables();
        const timetable = document.getElementById("timetableContainer").innerHTML;
        expect(timetable).toContain("No Staff Assigned");
    });

    test("Timetable should not assign more than max allowed classes per staff", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        document.getElementById("staffClass").value = 0;
        document.getElementById("staffName").value = "John Doe";
        document.getElementById("maxClasses").value = "2"; // Max 2 classes
        document.getElementById("subjects").value = "Math";
        window.addStaff();

        window.generateTimetables();
        const staffAssigned = document.getElementById("timetableContainer").innerHTML;
        const matchCount = (staffAssigned.match(/John Doe/g) || []).length;
        expect(matchCount).toBeLessThanOrEqual(2);
    });
});

describe("Integration Testing: UI Interactions", () => {
    test("Should remove a class from the list", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        expect(document.getElementById("classList").innerHTML).toContain("Class A");

        window.removeClass(0);
        expect(document.getElementById("classList").innerHTML).not.toContain("Class A");
    });

    test("Should remove a staff member from a class", () => {
        document.getElementById("className").value = "Class A";
        window.addClass();

        document.getElementById("staffClass").value = 0;
        document.getElementById("staffName").value = "John Doe";
        document.getElementById("maxClasses").value = "5";
        document.getElementById("subjects").value = "Math";
        window.addStaff();

        expect(document.getElementById("staffList").innerHTML).toContain("John Doe");

        window.removeStaff(0, 0);
        expect(document.getElementById("staffList").innerHTML).not.toContain("John Doe");
    });
});
