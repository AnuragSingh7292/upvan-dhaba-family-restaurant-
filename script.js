
// When the page is fully loaded
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






document.addEventListener("DOMContentLoaded", () => {
    const menuList = document.getElementById("menu-list");
    const menuLinks = menuList.querySelectorAll("a"); // Select all links inside the menu
    const checkbox = document.getElementById("click"); // The checkbox for toggling the menu

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            checkbox.checked = false; // Uncheck the checkbox to close the menu
        });
    });
});


// items selection
// Select all menu items (category items like Veg, Non-Veg, etc.)
// Select all menu items (category items like Veg, Non-Veg, etc.)
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');

    // Add click event listener to each menu item
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get the category name from the h3 tag (e.g., "Veg", "Non-Veg")
            const categoryName = item.querySelector('h3').textContent.trim().toLowerCase(); // "veg", "non-veg", etc.
            console.log(categoryName);
            // Redirect to menu.html with the category in the URL
            window.location.href = `menu.html#${categoryName}`;
        });
    });
});


// Get all anchor tags
const links = document.querySelectorAll('nav ul li a');

// Function to remove 'active' class from all links
function removeActiveClass() {
    links.forEach(link => {
        link.classList.remove('active');
    });
}

// Function to add active class to Home link if at the top of the page
function checkScrollPosition() {
    if (window.scrollY === 0) {
        removeActiveClass();  // Remove active class from all links
        document.getElementById('home').classList.add('active');  // Add active class to Home link
    }
}

// Add event listener for each link
links.forEach(link => {
    link.addEventListener('click', function () {
        removeActiveClass();  // Remove active class from all links
        this.classList.add('active');  // Add active class to the clicked link
    });
});



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



function clearForm() {
    // Delay clearing to allow submission to Formspree
    setTimeout(() => {
        document.getElementById('feedback-form').reset();
    }, 100); // Slight delay to allow form submission
}



// Add event listener to detect scroll
window.addEventListener('scroll', checkScrollPosition);
