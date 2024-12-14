
    window.addEventListener('load', function () {
        const loadingOverlay = document.getElementById('loading-overlay');
        const content = document.querySelector('.content');
        const body = document.querySelector('body');
        const blurOverlay = document.getElementById('blur-overlay');

        // Set a delay (e.g., 3 seconds) before removing the loading overlay
        setTimeout(function () {
            // Hide the loading screen
            loadingOverlay.style.display = 'none';

            // Show the main content
            content.style.display = 'block';

            // Add blur effect to the body content
            body.classList.add('blurred');

            // Show the rotating loader during the blur effect
            blurOverlay.style.display = 'flex';

            // Remove the blur effect and hide the loader after 2 seconds
            setTimeout(function () {
                body.classList.remove('blurred');
                blurOverlay.style.display = 'none';
            }, 1000); // 2 seconds delay for the blur effect
        }, 1000); // 3000 milliseconds = 3 seconds delay
    });

// seach items by the user 

document.getElementById('search-btn').addEventListener('click', handleSearch);
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleSearchIsEmpty();
    }
});


function handleSearchIsEmpty() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();

    // Check if the input is empty
    if (query === '') {
        alert('Please enter a search items.');
        return; // Stop further execution if input is empty
    }
    else {
        handleSearch();
    }
}

function handleSearch() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    document.getElementById('search-input').value = '';

    // Check if the input is empty
    if (query === '') {
        alert('Please enter a search item.');
        return; // Stop further execution if input is empty
    }

    const containers = document.querySelectorAll('.container');
    const menuItems = document.querySelectorAll('.menu-item');

    // Reset previous highlights and red color
    menuItems.forEach(item => {
        const h3 = item.querySelector('h3');
        h3.classList.remove('highlight');
        h3.style.color = ''; // Reset color to original state
    });

    let matchedContainer = null;

    // Highlight matching items and identify the matching container
    menuItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            const h3 = item.querySelector('h3');
            h3.classList.add('highlight');
            h3.style.color = 'red'; // Make the matching <h3> red
            matchedContainer = item.closest('.container'); // Get the container (veg/non-veg)
        }
    });

    // Move the matched container to the top
    if (matchedContainer) {
        const parent = matchedContainer.parentElement;
        parent.prepend(matchedContainer); // Move the matched container to the top
    } else {
        alert('No matching items found.');
    }
}

// search icon
const searchIcon = document.getElementById('search-icon');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Toggle search input, button, and icon
searchIcon.addEventListener('click', function () {
    if (searchIcon.classList.contains('fa-search')) {
        // Show the search input and button
        searchInput.style.display = 'inline-block';
        searchBtn.style.display = 'inline-block';

        // Switch icon to close
        searchIcon.classList.remove('fa-search');
        searchIcon.classList.add('fa-times');
    } else {
        // Hide the search input and button
        searchInput.style.display = 'none';
        searchBtn.style.display = 'none';

        // Switch icon back to search
        searchIcon.classList.remove('fa-times');
        searchIcon.classList.add('fa-search');
    }
});



// Select all order buttons

const orderButtons = document.querySelectorAll('.order-button');

// Add click event listener to each order button
orderButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Prevent the click from triggering events on parent elements
        event.stopPropagation();

        // Find the parent `.menu-item` of the button
        const item = button.closest('.menu-item');

        // Extract data from the menu item
        const name = item.querySelector('h3').innerText; // Get the name
        const priceText = item.querySelector('p').innerText; // Get the price text
        const pricevalue = priceText.replace('₹', '').trim(); // Remove ₹ and whitespace
        const price = pricevalue.replace('Price:', '').trim(); // Clean up "Price:" text
        const image = item.querySelector('img').src; // Get the image URL

        // Redirect to the order page
        redirectToOrder(name, price, image);
    });
});



// Function to handle the redirect without query parameters
function redirectToOrder(name, price, image) {
    // Store the order details in session storage
    sessionStorage.setItem('orderName', name);
    sessionStorage.setItem('orderPrice', price);
    sessionStorage.setItem('orderImage', image);

    // Redirect to the order page
    window.location.href = 'choiceMode.html';
}




// Show or hide the button based on scroll position
window.onscroll = function () {
    const button = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 100) {
        button.classList.add("show");
        button.classList.remove("hide");
    } else {
        button.classList.add("hide");
        button.classList.remove("show");
    }
};
// Gradual scroll to top function
function scrollToTop() {
    let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let scrollStep = currentPosition / 50;  // Adjust the step for smoother and slower scroll
    let scrollInterval = setInterval(function () {
        if (currentPosition > 0) {
            currentPosition -= scrollStep;  // Move up gradually
            window.scrollTo(0, currentPosition);
        } else {
            clearInterval(scrollInterval);  // Stop when we reach the top
        }
    }, 6);  // Adjust interval for speed, lower value = faster scroll
}