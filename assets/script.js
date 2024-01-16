// Get the DOM elements for time blocks and the updated date/time
const timeBlocks = document.getElementById("timeBlocks");
const updatedDateTimeElement = document.getElementById("updatedDateTime");

// Function to update the displayed date and time
function updateDateTime() {
  const date = new Date();
  // Format date and time using Intl.DateTimeFormat
  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/New_York",
  }).format(date);

  // Update the text content of the date element in the header
  updatedDateTimeElement.textContent = formattedDateTime;
}

// Call the function to update date and time immediately
updateDateTime();

// Update the date and time every second using setInterval
setInterval(updateDateTime, 1000);

// Function to update time blocks dynamically
function updateTimeBlocks() {
  // Loop through hours from 9 to 22 (10 PM)
  for (let hour = 9; hour <= 17; hour++) {
    // Create a new section element for each time block
    const timeBlock = document.createElement("section");

    // Add the "time-block" class to the new section
    timeBlock.classList.add("time-block");

    // Check if the hour is in the past, present, or future
    if (hour < new Date().getHours()) {
      timeBlock.classList.add("past");
    } else if (hour === new Date().getHours()) {
      timeBlock.classList.add("present");
    } else {
      timeBlock.classList.add("future");
    }
    timeBlock.style.borderRadius = "10px";
    timeBlock.style.padding = "20px";
    
    // Create HTML content for the time block
    let formattedHour = hour < 10 ? "0" + hour : hour;
    const storedEventText = localStorage.getItem(`event-${formattedHour}`);
    timeBlock.innerHTML = `
      <section class="timeDisplay">${formattedHour}:00</section>
      <input id="event-${formattedHour}" value="${storedEventText || ''}">
      </input>
      <button class="save-button">Save</button>
    `;
    // Append the time block to the "timeBlocks" section
    timeBlocks.appendChild(timeBlock);
  }
}

// Call the function to update time blocks
updateTimeBlocks();

// Function to save an event to local storage based on the hour
function saveEvent(hour) {
  // Get the text from the textarea for the corresponding hour
  const eventText = document.getElementById(`event-${hour}`).value;

  // Save the event text to local storage with a unique key
  localStorage.setItem(`event-${hour}`, eventText);
}

// Event delegation for Save button clicks within the "timeBlocks" section
timeBlocks.addEventListener("click", function (event) {
  // Check if the clicked element has the class "save-button"
  if (event.target.classList.contains("save-button")) {
    // Extract the hour from the text content of the previous sibling of the button
    const hour =
      event.target.previousElementSibling.previousElementSibling.textContent.split(
        ":"
      )[0];

    // Call the saveEvent function with the extracted hour
    saveEvent(hour);
  }
});
