// Function to generate a random token number
// Function to generate a 2-digit token based on the current date and time
function generateToken() {
    // Get the current date and time components
    // Get the current date and time components
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const date = String(new Date().getDate()).padStart(2, '0');
    const hour = String(new Date().getHours()).padStart(2, '0');
    const minute = String(new Date().getMinutes()).padStart(2, '0');
    const seconds = String(new Date().getSeconds()).padStart(2, '0');

    // Generate the base string using date and time
    const baseString = `${year}${month}${date}${hour}${minute}${seconds}`;

    // Add a random number to the base string for added randomness
    const randomValue = Math.floor(Math.random() * 10000); // Random number between 0 and 9999

    // Generate a token by combining the base string and the random value
    const longToken = `${baseString}${randomValue}`;

    // Reduce the token to 2 or 3 digits using modulo
    const tokenLength = 3; // Change to 2 for 2-digit token
    const token = parseInt(longToken.slice(-tokenLength), 10) % Math.pow(10, tokenLength);

    return token; // Return the 2-digit token
}

// Display the order details and set up form handling
document.addEventListener('DOMContentLoaded', () => {
    // Get the order details from sessionStorage
    const name = sessionStorage.getItem('orderName');
    const price = sessionStorage.getItem('orderPrice');
    const image = sessionStorage.getItem('orderImage');
    // Set the values in the order section
    document.getElementById('order-name').innerText = name;
    document.getElementById('order-price').innerText = price;
    document.getElementById('order-image').src = image;


    // Populate hidden fields
    document.getElementById('hidden-dishName').value = name;
    document.getElementById('hidden-price').value = price;

    var totalPrice = 1;
    // Update the price when quantity changes
    document.getElementById('quantity').addEventListener('input', (e) => {

        const quantity = parseInt(e.target.value, 10);
        if (quantity > 0) {
            totalPrice = price * quantity;
            // console.log(totalPrice, price, quantity)
            document.getElementById('order-price').innerText = `₹${totalPrice}`;
        }
        else {
            document.getElementById('order-price').innerText = `₹${price}`;
        }
        document.getElementById('hidden-totalPrice').value = totalPrice + 30;
    });


    // Handle form submission
    document.getElementById('order-form').addEventListener('submit',(e) => {
        e.preventDefault();  // Prevent form submission to avoid page reload
        // Get the user input values
        const userName = document.getElementById('name').value;
        const tableNumber = document.getElementById('table-number').value;


        // Generate a new token number every time the form is submitted
        const tokenNumber = generateToken();

        document.getElementById('hidden-tokenNumber').value = tokenNumber;

        // Display the new token number
        document.getElementById('token-number').innerText = tokenNumber;

        document.getElementById('token-info').style.display = 'block';

        // Log the order details for debugging (can be replaced by sending data to a server)
        // console.log('Order Details:', {
        //     userName,
        //     tableNumber,
        //     name,
        //     price,
        //     totalPrice,
        //     tokenNumber
        // });

        swal.fire({
            title: "Remember your id number. Wait for call verification!!!",
            html: `Your token number is: ${"upvandhaba"+tokenNumber} <br> Your total price is: ₹${totalPrice + 30}`,
            icon: "success",
            button: "OK",
        }).then(() => {
        document.getElementById('order-form').submit();
        document.getElementById('order-form').reset();
        });
    
    });
});
