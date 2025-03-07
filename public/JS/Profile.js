// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const periods = ["1", "2", "3", "4", "5"];
// const classes = JSON.parse(localStorage.getItem('classes')) || [];
// const globalStaff = JSON.parse(localStorage.getItem('globalStaff')) || {};
// const schedule = {};
// function saveData() {
//     localStorage.setItem('classes', JSON.stringify(classes));
//     localStorage.setItem('globalStaff', JSON.stringify(globalStaff));
// }
// document.addEventListener("DOMContentLoaded", function () {
//     updateClassList();
//     updateClassSelect();
//     updateStaffList();
// });
// function addClass() {
//     const className = document.getElementById('className').value.trim();
//     if (className) {
//         const newClass = { name: className, staffList: [] };
//         classes.push(newClass);
//         updateClassList();
//         updateClassSelect();
//         saveData(); 
//         document.getElementById('classForm').reset();
//     } else {
//         alert("Please enter a class name.");
//     }
//     document.getElementById('cls').style.display = 'block';
// }
// function removeClass(index) {
//     classes.splice(index, 1);
//     updateClassList();
//     updateClassSelect();
//     saveData();
// }
// function addStaff() {
//     const staffClassDropdown = document.getElementById('staffClass');
//     const classIndex = staffClassDropdown.value;
//     const staffName = document.getElementById('staffName').value.trim();
//     const maxClasses = parseInt(document.getElementById('maxClasses').value);
//     const subjects = document.getElementById('subjects').value.split(',').map(subject => subject.trim());
//     if (!classIndex || !staffName || maxClasses <= 0 || subjects.length === 0) {
//         alert("Please enter valid staff details.");
//         return;
//     }
//     if (!globalStaff[staffName]) {
//         globalStaff[staffName] = {
//             name: staffName,
//             assignedClasses: {},
//         };
//     }
//     const globalStaffEntry = globalStaff[staffName];
//     if (globalStaffEntry.assignedClasses[classIndex]) {
//         alert(`Staff member "${staffName}" is already assigned to this class.`);
//         return;
//     }
//     const staff = {
//         name: staffName,
//         maxClasses,
//         assignedClasses: 0,
//         subjects,
//     };
//     classes[classIndex].staffList.push(staff);
//     globalStaffEntry.assignedClasses[classIndex] = staff;
//     updateStaffList();
//     saveData(); // Save changes
//     document.getElementById('staffForm').reset();
// }
// function removeStaff(classIndex, staffIndex) {
//     const staff = classes[classIndex].staffList[staffIndex];
//     classes[classIndex].staffList.splice(staffIndex, 1);
//     delete globalStaff[staff.name].assignedClasses[classIndex];
//     updateStaffList();
//     saveData(); // Save changes
// }
// function updateClassList() {
//     const list = document.getElementById('classList');
//     list.innerHTML = classes.map((cls, index) =>
//         `<li>${cls.name} - <button onclick="removeClass(${index})">Remove Class</button></li>`
//     ).join('');
// }
// function updateClassSelect() {
//     const select = document.getElementById('staffClass');
//     select.innerHTML = classes.map((cls, index) => `<option value="${index}">${cls.name}</option>`).join('');
// }
// function updateStaffList() {
//     const list = document.getElementById('staffList');
//     list.innerHTML = classes.map((cls, classIndex) => {
//         const staffHTML = cls.staffList.length > 0
//             ? cls.staffList.map((staff, staffIndex) =>
//                 `<li>${staff.name} (Max Classes: ${staff.maxClasses}) - Subjects: ${staff.subjects.join(", ")}
//                 <button onclick="removeStaff(${classIndex}, ${staffIndex})">Remove Staff</button></li>`
//             ).join('')
//             : "<li>No staff added for this class yet.</li>";
//         return `<h3>${cls.name}</h3><ul>${staffHTML}</ul>`;
//     }).join('');
// }
// function generateTimetables() {
//     const timetableContainer = document.getElementById('timetableContainer');
//     timetableContainer.innerHTML = '';
//     classes.forEach(cls => {
//         const timetable = document.createElement('table');
//         const timetableTitle = document.createElement('h3');
//         timetableTitle.textContent = `${cls.name} Timetable`;
//         timetableContainer.appendChild(timetableTitle);
//         timetable.innerHTML = `
//             <thead>
//                 <tr>
//                     <th>Day</th>
//                     <th>1st Period</th>
//                     <th>2nd Period</th>
//                     <th>3rd Period</th>
//                     <th>4th Period</th>
//                     <th>5th Period</th>
//                 </tr>
//             </thead>
//             <tbody></tbody>
//         `;
//         const timetableBody = timetable.querySelector('tbody');
//         days.forEach((day, dayIndex) => {
//             const row = document.createElement('tr');
//             const dayCell = document.createElement('td');
//             dayCell.textContent = day;
//             row.appendChild(dayCell);
//             periods.forEach((_, periodIndex) => {
//                 const periodKey = `${dayIndex}-${periodIndex}`;
//                 if (!schedule[periodKey]) schedule[periodKey] = null;
//                 let subject = "No Subject Assigned";
//                 let staffAssigned = null;
//                 const availableStaff = cls.staffList.filter(staff =>
//                     staff.assignedClasses < staff.maxClasses &&
//                     (!schedule[periodKey] || schedule[periodKey] !== staff.name)
//                 );
//                 if (availableStaff.length > 0) {
//                     const selectedStaff = availableStaff[Math.floor(Math.random() * availableStaff.length)];
//                     const subjectIndex = Math.floor(Math.random() * selectedStaff.subjects.length);
//                     subject = selectedStaff.subjects[subjectIndex];
//                     staffAssigned = selectedStaff;
//                     staffAssigned.assignedClasses++;
//                     schedule[periodKey] = staffAssigned.name;
//                 }
//                 const cell = document.createElement('td');
//                 cell.innerHTML = staffAssigned ? `${subject}<br><small>${staffAssigned.name}</small>` : "No Staff Assigned";
//                 row.appendChild(cell);
//             });
//             timetableBody.appendChild(row);
//         });
//         timetableContainer.appendChild(timetable);
//     });
//     document.getElementById('downloadPdfButton').style.display = 'block';
//     document.getElementById('tt').style.display = 'block';
// }
// function downloadTimetablePDF() {
//     const element = document.getElementById('timetableContainer');
//     const fileName = prompt("Enter a filename for the PDF:", "timetable.pdf");
//     if (fileName === null) {
//         alert("Download cancelled.");
//         return;
//     }
//     html2pdf().from(element).save(fileName);
// }
// module.exports = { addClass, removeClass, addStaff, removeStaff, generateTimetables, classes, globalStaff };

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["1st Period", "2nd Period", "3rd Period", "4th Period", "5th Period"];
const classes = [];
const globalStaff = {}; 
const schedule = {}; 

function addClass() {
  const className = document.getElementById('className').value.trim();
  if (className) {
    const newClass = { name: className, staffList: [] };
    classes.push(newClass);
    updateClassList();
    updateClassSelect();
    document.getElementById('classForm').reset();
  } else {
    alert("Please enter a class name.");
  }
  document.getElementById('cls').style.display = 'block';
}

function updateClassList() {
  const list = document.getElementById('classList');
  list.innerHTML = classes
    .map((cls, index) =>
      `<li>${cls.name} - <button onclick="removeClass(${index})">Remove Class</button></li>`)
    .join('');
}
function removeClass(index) {
  classes.splice(index, 1);
  updateClassList();
  updateClassSelect();
}
function updateClassSelect() {
  const select = document.getElementById('staffClass');
  const currentSelection = select.value;
  select.innerHTML = classes
    .map((cls, index) => `<option value="${index}">${cls.name}</option>`)
    .join('');
  if (currentSelection && classes[currentSelection]) {
    select.value = currentSelection;
  } else if (classes.length > 0) {
    select.value = 0;
  }
}
function addStaff() {
  const staffClassDropdown = document.getElementById('staffClass');
  const classIndex = staffClassDropdown.value;
  const staffName = document.getElementById('staffName').value.trim();
  const maxClasses = parseInt(document.getElementById('maxClasses').value);
  const subjects = document.getElementById('subjects').value.split(',').map(subject => subject.trim());
  if (!classIndex || !staffName || maxClasses <= 0 || subjects.length === 0) {
    alert("Please enter valid staff details.");
    return;
  }
  if (!globalStaff[staffName]) {
    globalStaff[staffName] = {
      name: staffName,
      assignedClasses: {},
    };
  }
  const globalStaffEntry = globalStaff[staffName];
  if (globalStaffEntry.assignedClasses[classIndex]) {
    alert(`Staff member "${staffName}" is already assigned to this class.`);
    return;
  }
  const staff = {
    name: staffName,
    maxClasses,
    assignedClasses: 0,
    subjects,
  };
  classes[classIndex].staffList.push(staff);
  globalStaffEntry.assignedClasses[classIndex] = staff;
  updateStaffList(classIndex);
  const selectedValue = staffClassDropdown.value;
  document.getElementById('staffForm').reset();
  staffClassDropdown.value = selectedValue;
  document.getElementById('cls').style.display = 'block';
}
function updateStaffList() {
  const list = document.getElementById('staffList');
  list.innerHTML = classes
    .map((cls, classIndex) => {
      const staffForClass = cls.staffList;
      const staffHTML = staffForClass.length > 0
        ? staffForClass
          .map((staff, staffIndex) =>
            `<li>
           ${staff.name} (Max Classes: ${staff.maxClasses}) - Subjects: ${staff.subjects.join(", ")}
           <button onclick="removeStaff(${classIndex}, ${staffIndex})">Remove Staff</button>
         </li>`
          )
          .join('')
        : "<li>No staff added for this class yet.</li>";
      return `
   <h3>${cls.name}</h3>
   <ul>${staffHTML}</ul>
 `;
    })
    .join('');
}
function removeStaff(classIndex, staffIndex) {
  const staff = classes[classIndex].staffList[staffIndex];
  classes[classIndex].staffList.splice(staffIndex, 1);
  delete globalStaff[staff.name].assignedClasses[classIndex];
  updateStaffList();
}
function generateTimetables() {
  const timetableContainer = document.getElementById('timetableContainer');
  timetableContainer.innerHTML = '';
  classes.forEach(cls => {
    const timetable = document.createElement('table');
    const timetableTitle = document.createElement('h3');
    timetableTitle.textContent = `${cls.name} Timetable`;
    timetableContainer.appendChild(timetableTitle);
    timetable.innerHTML = `
     <thead>
       <tr>
         <th>Day</th>
         <th>1st Period</th>
         <th>2nd Period</th>
         <th>3rd Period</th>
         <th>4th Period</th>
         <th>5th Period</th>
       </tr>
     </thead>
     <tbody></tbody>
   `;
    const timetableBody = timetable.querySelector('tbody');

    days.forEach((day, dayIndex) => {
      const row = document.createElement('tr');
      const dayCell = document.createElement('td');
      dayCell.textContent = day;
      row.appendChild(dayCell);
      periods.forEach((_, periodIndex) => {
        const periodKey = `${dayIndex}-${periodIndex}`;
        if (!schedule[periodKey]) schedule[periodKey] = null;
        let subject = "No Subject Assigned";
        let staffAssigned = null;
        const availableStaff = cls.staffList.filter(staff =>
          staff.assignedClasses < staff.maxClasses &&
          (!schedule[periodKey] || schedule[periodKey] !== staff.name)
        );
        if (availableStaff.length > 0) {
          const selectedStaff = availableStaff[Math.floor(Math.random() * availableStaff.length)];
          const subjectIndex = Math.floor(Math.random() * selectedStaff.subjects.length);
          subject = selectedStaff.subjects[subjectIndex];
          staffAssigned = selectedStaff;
          staffAssigned.assignedClasses++;
          schedule[periodKey] = staffAssigned.name; 
        }
        const cell = document.createElement('td');
        cell.innerHTML = staffAssigned ? `${subject}<br><small>${staffAssigned.name}</small>` : "No Staff Assigned";
        row.appendChild(cell);
      });
      timetableBody.appendChild(row);
    });
    timetableContainer.appendChild(timetable);
  });
  classes.forEach(cls => cls.staffList.forEach(staff => staff.assignedClasses = 0));
  document.getElementById('downloadPdfButton').style.display = 'block';
  document.getElementById('tt').style.display = 'block';
}
function downloadTimetablePDF() {
  const element = document.getElementById('timetableContainer');
  const fileName = prompt("Enter a filename for the PDF:", "timetable.pdf");
  if (fileName === null) {
    alert("Download cancelled.");
    return; // Exit the function
  }
  html2pdf().from(element).save(fileName);
}