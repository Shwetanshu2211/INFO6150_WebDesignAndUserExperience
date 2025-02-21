$(document).ready(function () {
    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);
    }

    function validateUsername(username) {
        return /^[a-zA-Z]+$/.test(username);
    }

    function validatePassword(password) {
        return password.length >= 6 && password.length <= 12;
    }

    let isTouched = {
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
        num1: false,
        num2: false,
    };

    function showValidationMessage(field, isValid, errorMessage) {
        if (isTouched[field]) {
            $(`#${field}Error`).text(isValid ? "" : errorMessage);
        } else {
            $(`#${field}Error`).text("");
        }
    }

    function checkValidation() {
        let email = $("#email").val().trim();
        let username = $("#username").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#confirmPassword").val().trim();

        let emailValid = validateEmail(email);
        let usernameValid = validateUsername(username);
        let passwordValid = validatePassword(password);
        let passwordsMatch = password === confirmPassword;

        showValidationMessage("email", emailValid, "Email must be a valid Northeastern email (e.g., user@northeastern.edu).");
        showValidationMessage("username", usernameValid, "Username should contain only letters (no numbers or special characters).");
        showValidationMessage("password", passwordValid, "Password must be 6-12 characters long.");
        showValidationMessage("confirmPassword", passwordsMatch, "Passwords do not match.");

        $("#loginButton").prop("disabled", !(emailValid && usernameValid && passwordValid && passwordsMatch));
    }

    $("input").on("blur", function () {
        let field = $(this).attr("id");
        isTouched[field] = true;
        checkValidation();
    });

    function bindCalculatorEvents() {
        const MAX_LIMIT = 1e8; // Increased limit to allow multiplication of 4-digit numbers

        $(".calc-btn").off("click").on("click", function () {
            let num1 = $("#num1").val().trim();
            let num2 = $("#num2").val().trim();

            let num1Valid = num1 !== "" && !isNaN(num1) && Math.abs(parseFloat(num1)) <= MAX_LIMIT;
            let num2Valid = num2 !== "" && !isNaN(num2) && Math.abs(parseFloat(num2)) <= MAX_LIMIT;

            isTouched.num1 = true;
            isTouched.num2 = true;

            showValidationMessage("num1", num1Valid, `Only numbers up to ${MAX_LIMIT} are allowed.`);
            showValidationMessage("num2", num2Valid, `Only numbers up to ${MAX_LIMIT} are allowed.`);

            if (!num1Valid || !num2Valid) {
                $("#result").val("Invalid input");
                return;
            }

            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            let operation = $(this).data("op");

            const calculate = (num1, num2, operation) => {
                if (operation === "divide" && num2 === 0) {
                    return "Cannot divide by zero";
                }
                let result = {
                    add: num1 + num2,
                    subtract: num1 - num2,
                    multiply: num1 * num2,
                    divide: num1 / num2,
                }[operation];

                return Math.abs(result) > MAX_LIMIT ? "Result exceeds limit" : result;
            };

            let result = calculate(num1, num2, operation);
            $("#result").val(result.toString()); // Ensure result is always a string
        });
    }

    if (sessionStorage.getItem("loggedIn") === "true") {
        $("#loginSection").hide();
        $("#calculatorSection").show();
        $("#loggedInUser").text("Welcome, " + sessionStorage.getItem("username"));
        bindCalculatorEvents();
    } else {
        $("#loginSection").show();
        $("#calculatorSection").hide();
    }

    $("#loginButton").click(function () {
        sessionStorage.setItem("username", $("#username").val());
        sessionStorage.setItem("loggedIn", "true");

        $("#loginSection").hide();
        $("#calculatorSection").show();
        $("#loggedInUser").text("Welcome, " + $("#username").val());

        bindCalculatorEvents();
    });

    $("#logoutButton").click(function () {
        sessionStorage.clear();
        location.reload();
    });
});
