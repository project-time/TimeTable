import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './Profile.css';

const Profile = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = ["1st Period", "2nd Period", "3rd Period", "4th Period", "5th Period"];
  const [classes, setClasses] = useState([]);
  const [schedule, setSchedule] = useState({});
  const globalStaff = {}; // Tracks globally unique staff

  const addClass = () => {
    const className = document.getElementById('className').value.trim();
    if (className) {
      const newClass = { name: className, staffList: [] };
      setClasses(prevClasses => [...prevClasses, newClass]);
      document.getElementById('classForm').reset();
      document.getElementById('cls').style.display = 'block';
    } else {
      alert("Please enter a class name.");
    }
  };

  const removeClass = (index) => {
    const updatedClasses = [...classes];
    updatedClasses.splice(index, 1);
    setClasses(updatedClasses);
  };

  const addStaff = () => {
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
    const updatedClasses = [...classes];
    updatedClasses[classIndex].staffList.push(staff);
    globalStaffEntry.assignedClasses[classIndex] = staff;
    setClasses(updatedClasses);

    document.getElementById('staffForm').reset();
    staffClassDropdown.value = staffClassDropdown.value;
  };

  const removeStaff = (classIndex, staffIndex) => {
    const updatedClasses = [...classes];
    const staff = updatedClasses[classIndex].staffList[staffIndex];
    updatedClasses[classIndex].staffList.splice(staffIndex, 1);
    delete globalStaff[staff.name].assignedClasses[classIndex];
    setClasses(updatedClasses);
  };

  const generateTimetables = () => {
    const timetableContainer = document.getElementById('timetableContainer');
    timetableContainer.innerHTML = '';
    let timetableGenerated = false; // To track if timetable has any valid data

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
        let rowHasData = false; // Track if this row has any assigned data
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
            rowHasData = true; // Mark this row as having data
          }
          const cell = document.createElement('td');
          cell.innerHTML = staffAssigned ? `${subject}<br><small>${staffAssigned.name}</small>` : "No Staff Assigned";
          row.appendChild(cell);
        });
        if (rowHasData) {
          timetableBody.appendChild(row);
          timetableGenerated = true;
        }
      });
      if (timetableGenerated) {
        timetableContainer.appendChild(timetable);
      }
    });

    classes.forEach(cls => cls.staffList.forEach(staff => staff.assignedClasses = 0));
    if (timetableGenerated) {
      document.getElementById('downloadPdfButton').style.display = 'block';
      document.getElementById('tt').style.display = 'block';
    } else {
      alert('No timetable could be generated. Ensure you have staff assigned.');
    }
  };

  const downloadTimetablePDF = () => {
    const element = document.getElementById('timetableContainer');
    const fileName = prompt("Enter a filename for the PDF:", "timetable.pdf");

    if (fileName === null) {
      alert("Download cancelled.");
      return;
    }

    html2pdf().from(element).save(fileName);
  };

  return (
    <body>
        
    
    <div className="bodyprofile">
      <h1 className="profile-heading">Smart Time Table Scheduler</h1>

      <h2 className="section-heading">Create New Class</h2>
      <form id="classForm" className="form-container">
        <label htmlFor="className" className="form-label">Class Name: </label>
        <input type="text" id="className" className="form-input" required />
        <button type="button" className="form-button" onClick={addClass}>Create Class</button>
      </form>

      <h2 id="cls" className="section-heading">Classes</h2>
      <ul className="class-list">
        {classes.map((cls, index) => (
          <li key={index} className="class-item">
            {cls.name} - <button className="remove-button" onClick={() => removeClass(index)}>Remove Class</button>
          </li>
        ))}
      </ul>

      <h2 className="section-heading">Add Staff to Class</h2>
      <form id="staffForm" className="form-container">
        <label htmlFor="staffClass" className="form-label">Select Class: </label>
        <select id="staffClass" className="form-input" required>
          {classes.map((cls, index) => (
            <option key={index} value={index}>{cls.name}</option>
          ))}
        </select>
        <label htmlFor="staffName" className="form-label">Staff Name: </label>
        <input type="text" id="staffName" className="form-input" required />
        <label htmlFor="maxClasses" className="form-label">Max Classes per Week: </label>
        <input type="number" id="maxClasses" className="form-input" min="1" required />
        <label htmlFor="subjects" className="form-label">Subjects (comma-separated): </label>
        <input type="text" id="subjects" className="form-input" placeholder="E.g., Math, Science" required />
        <button type="button" className="form-button" onClick={addStaff}>Add Staff</button>
      </form>

      <h2 className="section-heading">Staff List by Class</h2>
      {classes.map((cls, classIndex) => (
        <div key={classIndex}>
          <h3 className="class-name">{cls.name}</h3>
          <ul className="staff-list">
            {cls.staffList.length === 0 ? (
              <li className="no-staff">No staff added for this class yet.</li>
            ) : (
              cls.staffList.map((staff, staffIndex) => (
                <li key={staffIndex} className="staff-item">
                  {staff.name} (Max Classes: {staff.maxClasses}) - Subjects: {staff.subjects.join(", ")}
                  <button className="remove-button" onClick={() => removeStaff(classIndex, staffIndex)}>Remove Staff</button>
                </li>
              ))
            )}
          </ul>
        </div>
      ))}

      <button className="generate-button" onClick={generateTimetables}>Generate Timetables</button><br />
      <h2 id="tt" className="section-heading" style={{ display: 'none' }}>Timetables</h2>
      <div id="timetableContainer" className="timetable-container"></div>
      <button id="downloadPdfButton" className="download-button" onClick={downloadTimetablePDF} style={{ display: 'none' }}>Download PDF</button>
    </div>
    </body>
  );
};

export default Profile;
