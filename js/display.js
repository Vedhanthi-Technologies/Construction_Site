const bookings_body = document.getElementById(`bookings_body`);

function formatDate(dateStr) {
  // Parse the input date string into a Date object
  const date = new Date(dateStr);

  // Array of month names for conversion
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dev",
  ];

  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth(); // 0-based index
  const year = date.getFullYear();

  // Format the date as "day month year"
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
}

const make_table_ready = () => {
  fetch(`http://localhost:3005/api/get_contacts`)
    .then((response) => response.json())
    .then((data) => {
      let temp = ``;

      if (data.length > 0) {
        data.forEach((booking) => {
          let tda = `<tr>`;
          tda += `<td>${booking.name}</td>`;
          tda += `<td>${booking.email}</td>`;
          tda += `<td>${booking.phone}</td>`;
          tda += `<td>${booking.product}</td>`;
          tda += `<td>${formatDate(booking.date.slice(0, 10))}</td>`;
          tda += `<td>${booking.message}</td>`;
          tda += `</tr>`;
          temp = tda + temp;
        });

        bookings_body.innerHTML = temp;
      }
    })
    .catch((error) => {
      console.error(`Error :`, error);
    });
};

make_table_ready();
// JavaScript code to sort table rows in ascending order based on clicked column header
function sortTable(columnIndex) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;

  // Set the sorting direction to ascending initially:
  var direction = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      // Get the two elements you want to compare, one from current row and one from the next:
      x = rows[i].getElementsByTagName("td")[columnIndex];
      y = rows[i + 1].getElementsByTagName("td")[columnIndex];

      // Check if the two rows should switch place, based on the direction:
      if (direction == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (direction == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      // If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }

  // Toggle the direction for next sorting:
  if (direction == "asc") {
    direction = "desc";
  } else {
    direction = "asc";
  }
}

/////////////////////////////
