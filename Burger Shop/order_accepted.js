// Retrieve query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);

// Display user details on the page
const userNameElement = document.getElementById('userName');
const mobileNumberElement = document.getElementById('mobileNumber');
const addressElement = document.getElementById('address');

const userName = urlParams.get('name') || 'N/A';
const mobileNumber = urlParams.get('mobile') || 'N/A';
const address = urlParams.get('address') || 'N/A';

userNameElement.textContent = userName;
mobileNumberElement.textContent = mobileNumber;
addressElement.textContent = address;

// Add your celebratory animations or other scripts here
