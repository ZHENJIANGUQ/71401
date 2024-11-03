document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("student_number", "s4794474");
    myHeaders.append("uqcloud_zone_id", "46bc7b3e");
  
    const formData = new FormData(document.getElementById('eventForm'));
  
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
    };
  
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById('submitResponse').textContent = "Event submitted successfully!";
            fetchEvents();
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('submitResponse').textContent = "Failed to submit event. Please try again.";
        });
  });
  
  function fetchEvents() {
    const myHeaders = new Headers();
    myHeaders.append("student_number", "s4794474");
    myHeaders.append("uqcloud_zone_id", "46bc7b3e");
  
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
  
    
    const filterDate = new Date("2024-11-02");
  
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/", requestOptions)
        .then(response => response.json())
        .then(data => {
            let output = "";
            data.forEach(event => {
                const eventDate = new Date(event.date_time); 
  
                
                if (eventDate > filterDate) {
                    output += `
                        <div class="event-item">
                            <h3>${event.event_name}</h3>
                            <p>Location: ${event.location}</p>
                            <p>Organiser: ${event.organiser}</p>
                            <p>Type: ${event.event_type}</p>
                            <p>Description: ${event.description}</p>
                            <p>Date and Time: ${eventDate.toLocaleString()}</p>
                            <img src="${event.genericevent_photo}" alt="Event Image">
                        </div>
                    `;
                }
            });
            document.getElementById('event-list').innerHTML = output;
        })
        .catch(error => console.error('Error:', error));
  }
  
  window.onload = fetchEvents;
  
  




  