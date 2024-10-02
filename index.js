
document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;   

  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;   


  // Validate email format
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Validate age range
  if (!isValidAge(dob)) {
    alert('You must be between 18 and 55 years old.');
    return;
  }

  // Create new entry
  const newEntry = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptTerms: acceptTerms ? 'Yes' : 'No'
  };

  // Save entry to localStorage
  saveToLocalStorage(newEntry);

  // Add entry to table
  appendEntryToTable(newEntry);

  // Clear the form
  this.reset();

  // Update table headers
  updateTableHeaders();
});

// Validate email format
function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Validate age range
function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();   

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return   
 age >= 18 && age <= 55;
}

// Save data to localStorage
function saveToLocalStorage(entry) {
  const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
  entries.push(entry);
  localStorage.setItem('formEntries', JSON.stringify(entries));
}

// Load data from localStorage and display in table
function loadFromLocalStorage() {
  const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
  entries.forEach(entry => appendEntryToTable(entry));
  updateTableHeaders(); // Update table headers on page load
}

// Add a new entry to the table
function appendEntryToTable(entry) {
  const tableBody = document.getElementById('tableBody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.acceptTerms}</td>   

  `;
  tableBody.appendChild(row);
}

// Update table headers
function updateTableHeaders() {
  const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
  if (entries.length > 0) {
    const tableHead = document.getElementById('tableHead');
    const headers = tableHead.getElementsByTagName('th');
    headers[0].textContent = 'Name';
    headers[1].textContent = 'Email';
    headers[2].textContent = 'Password';
    headers[3].textContent = 'Date of Birth';
    headers[4].textContent = 'Accepted terms?';
  }
}

// Load entries from localStorage on page load
window.onload = loadFromLocalStorage;
