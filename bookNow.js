document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookNowButton').addEventListener('click', function(event) {
      event.preventDefault();
      document.getElementById('overlayForm').style.display = 'flex';
      });
    
  
    document.querySelector('.closebtn').addEventListener('click', closeForm);
  
    function closeForm() {
      document.getElementById('overlayForm').style.display = 'none';
      window.location.href = 'index.html'; // Redirects to home page
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
      if (form.checkValidity()) {
        alert('Form submitted successfully!');
        closeForm();
      } else {
        alert('Please fill out all required fields.');
      }
    }
  
    // Attach event listeners to service checkboxes
    var serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    serviceCheckboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', toggleFoodMenu);
    });
  
    // Attach submitForm to the submit button
    document.querySelector('#bookingForm button[type="button"]').addEventListener('click', submitForm);
  });
  