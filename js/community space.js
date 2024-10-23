// Constants
const studentNumber = "s4794474";
const uqcloudZoneId = "46bc7b3e";

// 定义 headers 变量
const headers = new Headers();
headers.append("Content-Type", "application/json");
// 其他代码...



// Fetch request function for creating a new event
function submitEventForm(formData, headers, handleSuccess, handleError) {
    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          console.error('Server error response:', err); // for debugging
          throw new Error(err.detail || 'Something went wrong');
        });
      }
      return response.json(); // If success, return the response as JSON
    })
    .then(result => {
      console.log('Event created:', result);
      handleSuccess(result); // Call the success handler
    })
    .catch(error => {
      console.error('Error:', error.message); // Log detailed error
      handleError(error); // Call the error handler
    });
  }
  
 
  

 

  



  // Form Submit Success handler
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = `Thanks! ${result.event_name} was posted!`;
    messageDiv.style.color = "green";
  
    // Reset the form after success
    document.getElementById('eventForm').reset();
  }
  
  // Form Submit Error handler
  function handleError(error) {
    console.log(error); // for debugging
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = "There was a problem. Please try again.";
    messageDiv.style.color = "red";
  }

  



  // Select the form and listen for the submit event
document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Create a new FormData object to hold the form data
    const formData = new FormData(event.target);
  
    // Get the date and time from the form and reformat it
    const dateTimeInput = document.getElementById('dateTime').value;
  
    // Manually extract year, month, day, hour, minute to ensure consistency
    const date = new Date(dateTimeInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const hours = String(date.getHours()).padStart(2, '0'); // Ensure two digits
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
  
    // Format the date to 'YYYY-MM-DD HH:MM' (removing seconds and timezone)
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
  
    // Append the formatted date to the FormData
    formData.set('date_time', formattedDateTime);
  
    // Call the submitEventForm function and pass in the handlers
    submitEventForm(formData, headers, handleSuccess, handleError);
  });
  