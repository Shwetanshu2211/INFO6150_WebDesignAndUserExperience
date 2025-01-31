//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add");
  const submitButton = document.getElementById("button");
  const table = document.getElementById("myTable");

  let studentCounter = 3;

  function initializeRowEvents(row) {
    row.querySelector(".delete")?.addEventListener("click", function () {
      deleteRow(row);
    });

    row.querySelector(".edit")?.addEventListener("click", function () {
      editRow(row);
    });

    const checkbox = row.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener("change", function () {
        handleCheckboxChange(checkbox);
      });
    }

    const toggleArrow = row.querySelector("td img");
    if (toggleArrow) {
      toggleArrow.addEventListener("click", function () {
        toggleRow(row);
      });
    }
  }

  document.querySelectorAll("#myTable tr").forEach(row => {
    if (row.cells.length > 1) {
      initializeRowEvents(row);
    }
  });

  addButton.addEventListener("click", function () {
    studentCounter++;

    const newRow = table.insertRow(table.rows.length - 1);
    newRow.innerHTML = `
      <td>
        <input type="checkbox" /><br /><br />
        <img class="toggle-arrow" src="down.png" width="25px" style="cursor:pointer;" />
      </td>
      <td>Student ${studentCounter}</td>
      <td>Teacher ${studentCounter}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>1234${studentCounter}</td>
      <td>100%</td>
      <td><button class="delete">Delete</button></td>
      <td><button class="edit">Edit</button></td>
    `;

    const dropDownRow = table.insertRow(table.rows.length);
    dropDownRow.classList.add("dropDownTextArea");
    dropDownRow.style.display = "none"; 
    dropDownRow.innerHTML = `
      <td colspan="10">
        Advisor:<br /><br />
        Award Details<br />
        Summer 1-2014(TA)<br />
        Budget Number: <br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
      </td>
    `;

    initializeRowEvents(newRow);
    alert(`Student ${studentCounter} Record added successfully`);
  });

  function handleCheckboxChange(checkbox) {
    const row = checkbox.closest('tr');

    if (checkbox.checked) {
      row.style.backgroundColor = "yellow";
      submitButton.style.backgroundColor = "orange";
      submitButton.disabled = false;
    } else {
      row.style.backgroundColor = "white";
      if (!isAnyCheckboxSelected()) {
        submitButton.style.backgroundColor = "gray";
        submitButton.disabled = true;
      }
    }
  }

  function isAnyCheckboxSelected() {
    return Array.from(table.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);
  }

  function deleteRow(row) {
    const studentName = row.cells[1].textContent;
    row.parentNode.removeChild(row);
    alert(`${studentName} Record deleted successfully`);
  }

  function editRow(row) {
    const studentName = row.cells[1].textContent;
    const advisor = row.cells[2].textContent;
    const awardStatus = row.cells[3].textContent;
    const semester = row.cells[4].textContent;
    const type = row.cells[5].textContent;
    const budgetNumber = row.cells[6].textContent;
    const percentage = row.cells[7].textContent;

    const popUp = document.createElement("div");
    popUp.classList.add("edit-popup");
    popUp.innerHTML = `
      <div class="popup-content">
        <h2>Edit details of ${studentName}</h2>
        <label>Student Name:</label><input type="text" id="editStudent" value="${studentName}" /><br />
        <label>Advisor:</label><input type="text" id="editAdvisor" value="${advisor}" /><br />
        <label>Award Status:</label><input type="text" id="editAwardStatus" value="${awardStatus}" /><br />
        <label>Semester:</label><input type="text" id="editSemester" value="${semester}" /><br />
        <label>Type:</label><input type="text" id="editType" value="${type}" /><br />
        <label>Budget #:</label><input type="text" id="editBudgetNumber" value="${budgetNumber}" /><br />
        <label>Percentage:</label><input type="text" id="editPercentage" value="${percentage}" /><br />
        <button id="okButton">OK</button>
        <button id="cancelButton">Cancel</button>
      </div>
    `;

    document.body.appendChild(popUp);

    document.getElementById("okButton").addEventListener("click", function () {
      row.cells[1].textContent = document.getElementById("editStudent").value;
      row.cells[2].textContent = document.getElementById("editAdvisor").value;
      row.cells[3].textContent = document.getElementById("editAwardStatus").value;
      row.cells[4].textContent = document.getElementById("editSemester").value;
      row.cells[5].textContent = document.getElementById("editType").value;
      row.cells[6].textContent = document.getElementById("editBudgetNumber").value;
      row.cells[7].textContent = document.getElementById("editPercentage").value;

      alert(`${studentName} data updated successfully`);
      popUp.remove();
    });

    document.getElementById("cancelButton").addEventListener("click", function () {
      popUp.remove();
    });
  }

  function toggleRow(row) {
    const nextRow = row.nextElementSibling;

    if (nextRow && nextRow.classList.contains("dropDownTextArea")) {
      if (nextRow.style.display === "none" || nextRow.style.display === "") {
        nextRow.style.display = "table-row";
        row.querySelector(".toggle-arrow").src = "up.png";
      } else {
        nextRow.style.display = "none";
        row.querySelector(".toggle-arrow").src = "down.png";
      }
    }
  }
});
