const schemes = [
    {
        name: "Student Education Assistance",
        description: "Sample financial assistance for students.",
        minAge: 16,
        maxAge: 30,
        incomeLimit: 500000,
        studentRequired: true,
        daysUntilDeadline: 7
    },
    {
        name: "Low Income Family Support",
        description: "Sample assistance for low-income families.",
        minAge: 18,
        maxAge: 100,
        incomeLimit: 200000,
        studentRequired: false,
        daysUntilDeadline: 15
    },
    {
        name: "Girl Child Education Support",
        description: "Sample educational support for students.",
        minAge: 10,
        maxAge: 25,
        incomeLimit: 250000,
        studentRequired: true,
        daysUntilDeadline: 30
    }
];

function getDeadline(days) {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    return deadline.toLocaleDateString("en-IN");
}

document.getElementById("schemeForm").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const age = Number(document.getElementById("age").value);
        const income = Number(document.getElementById("income").value);
        const student =
            document.getElementById("student").value === "yes";

        const eligibleResults =
            document.getElementById("eligibleResults");

        const gapResults =
            document.getElementById("gapResults");

        const deadlineResults =
            document.getElementById("deadlineResults");

        eligibleResults.innerHTML = "";
        gapResults.innerHTML = "";
        deadlineResults.innerHTML = "";

        let eligibleCount = 0;

        schemes.forEach(function (scheme) {
            const gaps = [];

            if (age < scheme.minAge || age > scheme.maxAge) {
                gaps.push(
                    "Age must be between " +
                    scheme.minAge + " and " + scheme.maxAge + "."
                );
            }

            if (income > scheme.incomeLimit) {
                gaps.push(
                    "Annual family income must be INR " +
                    scheme.incomeLimit.toLocaleString("en-IN") +
                    " or less."
                );
            }

            if (scheme.studentRequired && !student) {
                gaps.push("You must be a student.");
            }

            if (gaps.length === 0) {
                eligibleCount++;

                eligibleResults.innerHTML +=
                    '<div class="result">' +
                    "<h3>" + scheme.name + "</h3>" +
                    "<p>" + scheme.description + "</p>" +
                    "<p>Your details match the sample rules.</p>" +
                    "</div>";
            } else {
                gapResults.innerHTML +=
                    '<div class="warning">' +
                    "<h3>" + scheme.name + "</h3>" +
                    "<p>Conditions not satisfied:</p>" +
                    "<ul>" +
                    gaps.map(function (gap) {
                        return "<li>" + gap + "</li>";
                    }).join("") +
                    "</ul></div>";
            }

            deadlineResults.innerHTML +=
                '<div class="result">' +
                "<h3>" + scheme.name + "</h3>" +
                "<p>Demo deadline: " +
                getDeadline(scheme.daysUntilDeadline) +
                "</p>" +
                "<p>" + scheme.daysUntilDeadline +
                " days remaining in this demo.</p>" +
                (scheme.daysUntilDeadline <= 7
                    ? "<strong>Upcoming deadline!</strong>"
                    : "") +
                "</div>";
        });

        if (eligibleCount === 0) {
            eligibleResults.innerHTML =
                "<p>No schemes match all the sample rules. " +
                "Check the eligibility gap explanations below.</p>";
        }

        if (gapResults.innerHTML === "") {
            gapResults.innerHTML =
                "<p>No unmet conditions found in the sample data.</p>";
        }
    }
);
