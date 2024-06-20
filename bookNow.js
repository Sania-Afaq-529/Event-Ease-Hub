document.addEventListener('DOMContentLoaded', function() {

   // User Check 

  function redirectUser (){
    const userToken = localStorage.getItem('userToken');

  if (userToken) {
    try {
      // Decode the token
      const decodedToken = jwt_decode(userToken);

      // Check if the token is valid
      if (!decodedToken) {
        throw new Error('Invalid token');
      }

      // Redirect to profile page if token is valid
      window.location.href = 'profile.html';
    } catch (error) {
      console.error('Token decoding failed:', error);
      // Clear localStorage and redirect to login page
      localStorage.removeItem('userToken');
      window.location.href = 'login.html';
    }
  } else {
    // Redirect to login page if token doesn't exist
    window.location.href = 'login.html';
  }
  }

 document.getElementById('profileIcon').addEventListener('click', function (event) {
  console.log("Yes clicked on user profile icon !!")
  event.preventDefault(); // Prevent default anchor behavior
  redirectUser();
});

document.getElementById('profileIcon1').addEventListener('click', function (event) {
  console.log("Yes clicked on user profile icon !!")
  event.preventDefault(); // Prevent default anchor behavior
  redirectUser();
});

  document.getElementById('bookNowButton1').addEventListener('click', function(event) {
      event.preventDefault();
      document.getElementById('overlayForm').style.display = 'flex';
  });
  document.getElementById('bookNowButton2').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('overlayForm').style.display = 'flex';
});
document.getElementById('bookNowButton3').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('overlayForm').style.display = 'flex';
});

  function closeForm() {
      document.getElementById('overlayForm').style.display = 'none';
  }

  function closeDealsPopup() {
      document.getElementById('popupModal').style.display = 'none';
  }

  function toggleFoodMenu() {
      var services = document.querySelectorAll('input[name="services"]:checked');
      var showFoodMenu = false;

      services.forEach(function(service) {
          if (service.value === 'food') {
              showFoodMenu = true;
          }
      });

      if (showFoodMenu) {
          document.getElementById('foodMenu').style.display = 'block';
      } else {
          document.getElementById('foodMenu').style.display = 'none';
      }
  }

  function submitForm() {
      var form = document.getElementById('bookingForm');
      if (!form.checkValidity()) {
          var invalidFields = [];
          
          form.querySelectorAll(':invalid').forEach(function(field) {
              invalidFields.push(field.previousElementSibling.innerText);
          });

          var message = 'Please fill out all required fields: ' + invalidFields.join(', ');

          Swal.fire({
              icon: 'warning',
              title: 'Validation Error',
              text: message
          });

          return;
      }

      var budget = document.getElementById('budget').value;
      var eventType = document.getElementById('eventType').value;
      var theme = document.getElementById('theme').value;
      var location = document.getElementById('location').value;
      var services = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);
      var foodMenu = Array.from(document.querySelectorAll('input[name="food"]:checked')).map(cb => cb.value);

      var payload = {
          budget: budget,
          event_type: eventType,
          theme: theme,
          location: location,
          services: services,
          food_menu: foodMenu
      };
      document.getElementById("submit_form").textContent = 'Loading...';
      fetch('http://localhost:8080/booking/check-available-deals', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
      document.getElementById("submit_form").textContent = 'Submit';

          showDealsPopup(data.available_deals, payload);
      })
      .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', 'There was an error processing your request.', 'error');
      document.getElementById("submit_form").textContent = 'Submit';

      });
  }

  function showDealsPopup(deals, bookingPayload) {
    const modal = document.getElementById('popupModal');
    const dealsContent = document.getElementById('dealsContent');
    dealsContent.innerHTML = '';
  
    if (deals.length === 0) {
      dealsContent.innerHTML = '<div class="content_non_deals"><p>No deals available for the selected budget.</p></div>';
    } else {
      deals.forEach(deal => {
        const dealElement = document.createElement('div');
        dealElement.classList.add('ag-courses_item');
        const services = JSON.parse(deal.services).join(', ');
        const foodMenu = JSON.parse(deal.food_menu).join(', ');
        dealElement.innerHTML = `
         
         
          <div class="ag-courses-item_link">
          <div class="ag-courses-item_bg"></div>
  
          <div class="ag-courses-item_title">
             <h3>${deal.name}</h3>
          </div>
   <p>Price: ${deal.budget}</p>
          <p>Event Type: ${deal.event_type}</p>
          <p>Location: ${deal.location}</p>
          <p>Services: ${services}</p>
          <p>Food Menu: ${foodMenu}</p>
          <button id="btn${deal._id}" onclick='subscribeToDeal("${deal._id}")'>Book Now</button>
        </div>
        `;
        dealsContent.appendChild(dealElement);
      });
    }
  
    const manualBookingButton = document.getElementById('manualBookingButton');
    manualBookingButton.onclick = () => manualBooking(bookingPayload);
  
    modal.style.display = 'block';
  }
  
  window.subscribeToDeal = function(dealId) {
    Swal.fire('Subscribed!', 'You have subscribed to the deal: ' + dealId, 'success');
 
    closeDealsPopup();
  }
  
  window.manualBooking = function(bookingPayload) {
    const userToken = localStorage.getItem('userToken');
    fetch('http://localhost:8080/booking/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(bookingPayload)
    })
    .then(response => response.json())
    .then(data => {
     
    })
    .catch(error => {
    });
  }

  window.subscribeToDeal = function(dealId) {
    const userToken = localStorage.getItem('userToken');
    document.getElementById(`btn${dealId}`).textContent = 'Loading...'

      fetch('http://localhost:8080/booking/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`

        },
        body: JSON.stringify({
          deal_id:dealId
        })
    })
    .then(response => response.json())
    .then(data => {
    document.getElementById(`btn${dealId}`).textContent = 'Book Now'

      console.log("Data ",data)
      sessionStorage.setItem('bookingId',data.id);
      window.location.href = data.url
    })
    .catch(error => {
    document.getElementById(`btn${dealId}`).textContent = 'Book Now'

       
    });
      
  }

  window.manualBooking = function(bookingPayload) {
    document.getElementById("manualBookingButton").textContent = 'Loading...';
    const userToken = localStorage.getItem("userToken");
      fetch('http://localhost:8080/booking/checkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`

          },
          body: JSON.stringify(bookingPayload)
      })
      .then(response => response.json())
      .then(data => {
          sessionStorage.setItem('bookingId',data.id);
          window.location.href = data.url
    document.getElementById("manualBookingButton").textContent = 'Manual Booking'
      
        })
        .catch(error => {
        document.getElementById("manualBookingButton").textContent = 'Manual Booking'
    
        });
  }

  var serviceCheckboxes = document.querySelectorAll('input[name="services"]');
  serviceCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', toggleFoodMenu);
  });

  document.querySelector('#bookingForm button[type="button"]').addEventListener('click', submitForm);

  window.closeForm = closeForm;
  window.closeDealsPopup = closeDealsPopup;
});




