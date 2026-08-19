/* =========================================
   LUMIÈRE — JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MENU DATA
    ===================================== */

    const menuItems = [

        {
            name: "Truffle Pasta",
            category: "dinner",
            price: "$24",
            image: "assets/images/menu-truffle-pasta.jpg",
            description: "Creamy handmade pasta with black truffle and parmesan.",
            rating: "4.9"
        },

        {
            name: "Classic Pancakes",
            category: "breakfast",
            price: "$14",
            image: "assets/images/menu-pancakes.jpg",
            description: "Fluffy pancakes served with berries and maple syrup.",
            rating: "4.8"
        },

        {
            name: "Grilled Salmon",
            category: "lunch",
            price: "$28",
            image: "assets/images/menu-salmon.jpg",
            description: "Fresh Atlantic salmon with seasonal vegetables.",
            rating: "4.9"
        },

        {
            name: "Lumière Burger",
            category: "fast-food",
            price: "$19",
            image: "assets/images/menu-burger.jpg",
            description: "Premium beef, caramelized onions and signature sauce.",
            rating: "4.7"
        },

        {
            name: "Filet Mignon",
            category: "dinner",
            price: "$42",
            image: "assets/images/menu-steak.jpg",
            description: "Tender grilled filet with roasted vegetables and sauce.",
            rating: "5.0"
        },

        {
            name: "Chocolate Fondant",
            category: "desserts",
            price: "$12",
            image: "assets/images/menu-dessert.jpg",
            description: "Warm chocolate fondant with a rich molten center.",
            rating: "4.9"
        }

    ];


    /* =====================================
       MENU ELEMENT
    ===================================== */

    const menuGrid = document.getElementById("menuGrid");


    /* =====================================
       DISPLAY MENU
    ===================================== */

    function displayMenu(category = "all") {

        const filteredItems =
            category === "all"
                ? menuItems
                : menuItems.filter(item => item.category === category);


        menuGrid.innerHTML = "";


        filteredItems.forEach(item => {

            const card = document.createElement("article");

            card.className = "menu-card";

            card.innerHTML = `

                <div class="menu-card-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <span class="menu-category">
                        ${item.category.replace("-", " ")}
                    </span>

                </div>


                <div class="menu-card-content">

                    <div class="menu-card-top">

                        <h3>${item.name}</h3>

                        <span class="menu-price">
                            ${item.price}
                        </span>

                    </div>


                    <p class="menu-description">
                        ${item.description}
                    </p>


                    <div class="menu-rating">

                        <div>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>

                        <span>${item.rating}</span>

                    </div>

                </div>

            `;

            menuGrid.appendChild(card);

        });

    }


    /* =====================================
       CATEGORY FILTER
    ===================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const category =
                button.dataset.category;

            displayMenu(category);

        });

    });


    /* INITIAL MENU */

    displayMenu();

    /* =====================================
   COUNTDOWN TIMER
===================================== */

const countdownDate =
    new Date().getTime() + (3 * 24 * 60 * 60 * 1000);


function updateCountdown() {

    const now = new Date().getTime();

    const distance = countdownDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(updateCountdown, 1000);

/* =====================================
   GALLERY LIGHTBOX
===================================== */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const currentImage =
    document.getElementById("currentImage");

const totalImages =
    document.getElementById("totalImages");


const galleryImages =
    Array.from(galleryItems).map(item =>
        item.querySelector("img").src
    );


let currentIndex = 0;

totalImages.textContent = galleryImages.length;


/* OPEN LIGHTBOX */

function openLightbox(index) {

    currentIndex = index;

    lightboxImage.src =
        galleryImages[currentIndex];

    currentImage.textContent =
        currentIndex + 1;

    galleryLightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* CLOSE LIGHTBOX */

function closeLightbox() {

    galleryLightbox.classList.remove("active");

    document.body.style.overflow = "";
}


/* NEXT */

function nextImage() {

    currentIndex =
        (currentIndex + 1) % galleryImages.length;

    lightboxImage.src =
        galleryImages[currentIndex];

    currentImage.textContent =
        currentIndex + 1;
}


/* PREVIOUS */

function previousImage() {

    currentIndex =
        (currentIndex - 1 + galleryImages.length)
        % galleryImages.length;

    lightboxImage.src =
        galleryImages[currentIndex];

    currentImage.textContent =
        currentIndex + 1;
}


/* CLICK GALLERY */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* BUTTONS */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);

lightboxNext.addEventListener(
    "click",
    nextImage
);

lightboxPrev.addEventListener(
    "click",
    previousImage
);


/* CLICK OUTSIDE IMAGE */

galleryLightbox.addEventListener("click", (e) => {

    if (e.target === galleryLightbox) {
        closeLightbox();
    }

});


/* KEYBOARD CONTROLS */

document.addEventListener("keydown", (e) => {

    if (!galleryLightbox.classList.contains("active")) {
        return;
    }

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowRight") {
        nextImage();
    }

    if (e.key === "ArrowLeft") {
        previousImage();
    }

});

/* =====================================
   CUSTOMER REVIEWS SLIDER
===================================== */

const reviews = [

    {
        text: "Every dish was beautifully presented and absolutely delicious. The atmosphere was simply unforgettable.",
        name: "Sophia Williams",
        role: "Verified Guest"
    },

    {
        text: "Lumière exceeded every expectation. From the service to the food, everything felt truly special.",
        name: "Daniel Carter",
        role: "Food Enthusiast"
    },

    {
        text: "One of the finest dining experiences I have ever had. The flavors were incredible and the staff was amazing.",
        name: "Olivia Martin",
        role: "Regular Guest"
    },

    {
        text: "Elegant atmosphere, exceptional food and wonderful service. I would definitely come back again.",
        name: "James Anderson",
        role: "Verified Guest"
    }

];


const reviewTrack =
    document.getElementById("reviewTrack");

const reviewDots =
    document.getElementById("reviewDots");

const reviewPrev =
    document.getElementById("reviewPrev");

const reviewNext =
    document.getElementById("reviewNext");


let reviewIndex = 0;


/* CREATE REVIEWS */

reviews.forEach((review, index) => {

    const card =
        document.createElement("article");

    card.className =
        `review-card ${index === 0 ? "active" : ""}`;

    card.innerHTML = `

        <div class="review-stars">
            ★★★★★
        </div>

        <p class="review-text">
            "${review.text}"
        </p>

        <div class="review-name">
            ${review.name}
        </div>

        <div class="review-role">
            ${review.role}
        </div>

    `;

    reviewTrack.appendChild(card);


    const dot =
        document.createElement("button");

    dot.className =
        `review-dot ${index === 0 ? "active" : ""}`;

    dot.addEventListener("click", () => {
        showReview(index);
    });

    reviewDots.appendChild(dot);

});


const reviewCards =
    document.querySelectorAll(".review-card");

const reviewDotElements =
    document.querySelectorAll(".review-dot");


/* SHOW REVIEW */

function showReview(index) {

    reviewCards.forEach(card =>
        card.classList.remove("active")
    );

    reviewDotElements.forEach(dot =>
        dot.classList.remove("active")
    );


    reviewIndex = index;


    reviewCards[reviewIndex]
        .classList.add("active");

    reviewDotElements[reviewIndex]
        .classList.add("active");

}


/* NEXT */

reviewNext.addEventListener("click", () => {

    reviewIndex =
        (reviewIndex + 1) % reviews.length;

    showReview(reviewIndex);

});


/* PREVIOUS */

reviewPrev.addEventListener("click", () => {

    reviewIndex =
        (reviewIndex - 1 + reviews.length)
        % reviews.length;

    showReview(reviewIndex);

});


/* AUTO SLIDE */

setInterval(() => {

    reviewIndex =
        (reviewIndex + 1) % reviews.length;

    showReview(reviewIndex);

}, 5000);

/* =====================================
   RESERVATION FORM
===================================== */

const reservationForm =
    document.getElementById("reservationForm");

const reservationSuccess =
    document.getElementById("reservationSuccess");

const bookingDate =
    document.getElementById("bookingDate");


/* PREVENT PAST DATES */

const today =
    new Date().toISOString().split("T")[0];

bookingDate.min = today;


/* FORM SUBMIT */

reservationForm.addEventListener("submit", (e) => {

    e.preventDefault();


    const name =
        document.getElementById("bookingName");

    const email =
        document.getElementById("bookingEmail");

    const phone =
        document.getElementById("bookingPhone");

    const guests =
        document.getElementById("bookingGuests");

    const date =
        document.getElementById("bookingDate");

    const time =
        document.getElementById("bookingTime");


    let isValid = true;


    /* CLEAR ERRORS */

    document
        .querySelectorAll(".form-error")
        .forEach(error => {
            error.textContent = "";
        });


    /* NAME */

    if (name.value.trim().length < 3) {

        name
            .nextElementSibling
            .textContent =
            "Please enter your full name.";

        isValid = false;
    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        email
            .nextElementSibling
            .textContent =
            "Please enter a valid email address.";

        isValid = false;
    }


    /* PHONE */

    const phonePattern =
        /^[+]?[\d\s-]{10,15}$/;

    if (!phonePattern.test(phone.value.trim())) {

        phone
            .nextElementSibling
            .textContent =
            "Please enter a valid phone number.";

        isValid = false;
    }


    /* GUESTS */

    if (!guests.value) {

        guests
            .nextElementSibling
            .textContent =
            "Please select number of guests.";

        isValid = false;
    }


    /* DATE */

    if (!date.value) {

        date
            .nextElementSibling
            .textContent =
            "Please select a date.";

        isValid = false;
    }


    /* TIME */

    if (!time.value) {

        time
            .nextElementSibling
            .textContent =
            "Please select a time.";

        isValid = false;
    }


    /* SUCCESS */

    if (isValid) {

        reservationSuccess.classList.add("show");

        reservationForm.reset();

        bookingDate.min = today;

        setTimeout(() => {

            reservationSuccess
                .classList.remove("show");

        }, 7000);

    }

});

/* =====================================
   NEWSLETTER
===================================== */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterMessage =
    document.getElementById("newsletterMessage");


newsletterForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
        document.getElementById("newsletterEmail");


    if (!email.value.trim()) {

        newsletterMessage.textContent =
            "Please enter your email.";

        return;
    }


    newsletterMessage.textContent =
        "Thank you for subscribing!";

    email.value = "";

});

/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.querySelector(".nav-links");


menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navLinks.classList.toggle("active");

});


/* CLOSE MENU AFTER CLICK */

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navLinks.classList.remove("active");

    });

});
/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});

/* =====================================
   ACTIVE NAV LINK
===================================== */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});

/* =====================================
   BACK TO TOP
===================================== */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================
   PAGE LOADER
===================================== */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 700);

});
});