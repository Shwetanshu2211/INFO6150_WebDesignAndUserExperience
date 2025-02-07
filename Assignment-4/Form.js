document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.getElementById("submitButton");
    const inputs = form.querySelectorAll("input, textarea, select");
    const emailField = document.getElementById("emailId");
    const phoneField = document.getElementById("phoneNumber");
    const zipField = document.getElementById("zipcode");
    const streetAddress2Field = document.getElementById("streetAddress2");
    const streetAddress2Counter = document.getElementById("streetAddress2Counter");

    const regExEmail = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
    const regExPhone = /^\(\d{3}\) \d{3}-\d{4}$/;
    const regExZip = /^\d{5}$/;
    const regExAlphaNumeric = /^[a-zA-Z0-9 ]+$/;

    function validateField(input, minLength, maxLength, regex, errorElement) {
        const value = input.value.trim();
        const isValid = value.length >= minLength && value.length <= maxLength && (!regex || regex.test(value));
        if (errorElement) errorElement.style.display = isValid ? "none" : "block";
        return isValid;
    }

    function validateForm() {
        const titleSelected = document.querySelector('input[name="title"]:checked');
        document.getElementById("titleError").style.display = titleSelected ? "none" : "block";

        const isValid = !!titleSelected &&
            validateField(document.getElementById("firstName"), 2, 50, regExAlphaNumeric, document.getElementById("firstNameError")) &&
            validateField(document.getElementById("lastName"), 2, 50, regExAlphaNumeric, document.getElementById("lastNameError")) &&
            validateField(emailField, 5, 50, regExEmail, document.getElementById("emailError")) &&
            validateField(phoneField, 10, 14, regExPhone, document.getElementById("phoneError")) &&
            validateField(zipField, 5, 5, regExZip, document.getElementById("zipError")) &&
            validateField(document.getElementById("streetAddress1"), 1, 100, null, document.getElementById("streetAddress1Error")) &&
            document.querySelectorAll('input[name="source"]:checked').length > 0 &&
            validateField(document.getElementById("comments"), 1, 500, null, document.getElementById("commentsError"));

        document.getElementById("sourceError").style.display = document.querySelectorAll('input[name="source"]:checked').length > 0 ? "none" : "block";
        submitButton.disabled = !isValid;
    }

    phoneField.addEventListener("input", function () {
        let phoneNumber = phoneField.value.replace(/\D/g, "").slice(0, 10);
        let formattedPhone = "";

        if (phoneNumber.length > 0) formattedPhone += `(${phoneNumber.slice(0, 3)}`;
        if (phoneNumber.length > 3) formattedPhone += `) ${phoneNumber.slice(3, 6)}`;
        if (phoneNumber.length > 6) formattedPhone += `-${phoneNumber.slice(6, 10)}`;

        phoneField.value = formattedPhone;
    });

    streetAddress2Field.addEventListener("input", function () {
        streetAddress2Counter.textContent = `${streetAddress2Field.value.length}/50 characters used`;
    });

    inputs.forEach(input => input.addEventListener("input", validateForm));

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!submitButton.disabled) {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            const table = document.createElement("table");
            const tbody = document.createElement("tbody");

            for (const key in data) {
                const row = document.createElement("tr");
                const cell1 = document.createElement("td");
                const cell2 = document.createElement("td");

                cell1.textContent = key;
                cell2.textContent = data[key] || "";

                row.appendChild(cell1);
                row.appendChild(cell2);
                tbody.appendChild(row);
            }

            table.appendChild(tbody);
            document.getElementById("submittedDataTable").appendChild(table);

            alert("Form submitted successfully!");
            form.reset();
            submitButton.disabled = true;
        }
    });
});

function addCheckboxes() {
    const selectElement = document.getElementById("itemSelect");
    const selectedValue = selectElement.value;
    const checkboxContainer = document.getElementById("checkboxContainer");
    checkboxContainer.innerHTML = "";

    if (selectedValue) {
        const sizes = ["13-inch", "15-inch"];
        sizes.forEach(size => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `${selectedValue}-${size}`;
            checkbox.name = "laptopSize";
            checkbox.value = size;

            const label = document.createElement("label");
            label.setAttribute("for", `${selectedValue}-${size}`);
            label.textContent = ` ${selectedValue} ${size}`;

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            checkboxContainer.appendChild(document.createElement("br"));

            checkbox.addEventListener("change", function () {
                const additionalInfoField = document.getElementById("additionalInfoField");
                const anyCheckboxChecked = Array.from(checkboxContainer.querySelectorAll("input[type='checkbox']")).some(cb => cb.checked);

                if (anyCheckboxChecked && !additionalInfoField) {
                    const additionalInfoDiv = document.createElement("div");
                    additionalInfoDiv.id = "additionalInfoField";

                    const additionalInfoLabel = document.createElement("label");
                    additionalInfoLabel.setAttribute("for", "additionalInfo");
                    additionalInfoLabel.textContent = "Additional Information*:";

                    const additionalInfoInput = document.createElement("input");
                    additionalInfoInput.type = "text";
                    additionalInfoInput.id = "additionalInfo";
                    additionalInfoInput.name = "additionalInfo";
                    additionalInfoInput.placeholder = "Additional Information";
                    additionalInfoInput.required = true;

                    additionalInfoDiv.appendChild(additionalInfoLabel);
                    additionalInfoDiv.appendChild(additionalInfoInput);
                    checkboxContainer.appendChild(additionalInfoDiv);
                } else if (!anyCheckboxChecked && additionalInfoField) {
                    additionalInfoField.remove();
                }
            });
        });
    }
}