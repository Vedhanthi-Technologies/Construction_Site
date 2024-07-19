const localhost = `http://localhost:3005`;

const contact_name1 = document.getElementById(`contact_name1`);
const contact_name2 = document.getElementById(`contact_name2`);
const contact_email = document.getElementById(`contact_email`);
const contact_phone = document.getElementById(`contact_phone`);
const contact_product = document.getElementById(`contact_product`);
const contact_message = document.getElementById(`contact_message`);
const hidden_contact = document.getElementById(`hidden_contact`);
const contact_btn = document.getElementById(`contact_btn`);

// Show Notification
const showNotification = (message, className) => {
  const notification = document.createElement("div");
  notification.className = `notification ${className}`;

  notification.innerHTML = message;

  const notificationContainer = document.getElementById(
    "notification-container"
  );
  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const contact_admin = () => {
  const fields = [
    contact_name1,
    contact_name2,
    contact_email,
    contact_phone,
    contact_message,
    contact_product,
  ];

  let missing_field = false;

  fields.forEach((element) => {
    if (element.value === ``) {
      missing_field = true;
      element.style.borderBottom = "1px solid #e93c39d0";
    } else {
      element.style.borderBottom = "1px solid #e6e7e9";
    }
  });

  if (missing_field) {
    showNotification(" Please Fill All the Fields !", "success");
    return;
  }

  hidden_contact.style.display = "block";
  contact_btn.innerHTML = ` SENDING MESSAGE ...`;

  // Send to Database
  fetch(`${localhost}/api/contact`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${contact_name1.value} ${contact_name2.value}`,
      email: contact_email.value,
      phone: contact_phone.value,
      message: contact_message.value,
      product: contact_product.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showNotification("Message Sent Successfully !", "success");
        contact_btn.innerHTML = "Get a Quote";
        setTimeout(function () {
          window.location.href = "/index.html";
        }, 2000);
      } else {
        showNotification("Failed to Send Message, Try Again !", "success");
        hidden_contact.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the carousel
  var myCarousel = document.getElementById("carouselExample");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 5000, // Adjusts the speed of the carousel, in milliseconds (5 seconds in this example)
    wrap: true, // Optional - enable wrapping of slides
  });
});
