/*==================== MENU SHOW & HIDDEN ====================*/

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
	const toggle = document.getElementById(toggleId);
	const nav = document.getElementById(navId);

	/* Validate if constant exists */
	if (toggle && nav) {
		toggle.addEventListener("click", () => {
			// Add show-menu class to the div wich nav-menu ID
			nav.classList.toggle("show-menu");
		});
	}
};

showMenu("nav-toggle", "nav-menu");

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = Array.from(document.querySelectorAll("section[id]"));
console.log(sections);
function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute("id");
		console.log(sectionId);

		if (sectionId === "gallery") return;

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
		} else {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
	const header = document.getElementById("header");
	if (this.scrollY >= 100) header.classList.add("scroll-header");
	else header.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

/*==================== SWITCH PRICING  DELAI ====================*/
const switchPlan = (switchButton, switchPrice, switchDelay) => {
	const switchButtons = document.querySelectorAll(`.${switchButton}`);
	const switchPrices = document.querySelectorAll(`.${switchPrice}`);
	const switchDelays = document.querySelectorAll(`.${switchDelay}`);
	let currentPrice = [];

	/* Validate if constant exists */
	if (switchButtons && switchPrice && switchDelay) {
		switchPrices.forEach((p) => {
			currentPrice.push(p.innerHTML);
		});

		switchButtons.forEach((current) => {
			current.addEventListener("click", switchButtonState);
		});
	}

	function switchButtonState() {
		/* Remove default active button state */
		this.parentNode.querySelector(".switch__button-active").classList.remove("switch__button-active");

		/* Add and remove switch__button-active class to the current button */
		if (!this.classList.contains(".switch__button-active")) {
			this.classList.add("switch__button-active");
		}

		/* Very if is yealy or monthly period */
		if (this.innerHTML == "Yearly") {
			switchDelayText("/ year");

			/* Change price amount */
			switchPriceAmount(currentPrice);
		} else if (this.innerHTML == "Monthly") {
			switchDelayText("/ month");

			/* Reset the price amount to the default amount value */
			switchPrices.forEach((p, index) => {
				p.innerHTML = currentPrice[index];
			});
		}
	}

	function switchPriceAmount(priceArray) {
		switchPrices.forEach((p, index) => {
			p.innerHTML = priceArray[index] * 2;
		});
	}

	function switchDelayText(period) {
		switchDelays.forEach((el) => {
			el.innerHTML = period;
		});
	}
};

switchPlan("switch__button", "pricing__amount-value", "pricing__delai");

/*==================== GALLERY SLIDE ====================*/
const swiperGallery = new Swiper(".gallery__container", {
	grabCusor: true,
	spaceBetween: 32,

	// If we need pagination
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	//Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		568: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});

/*==================== ACCORDION ====================*/
const showAccordionContent = (collapse, button, icon) => {
	const accordionButon = document.querySelectorAll(`.${button}`);

	/* Valide if constant exist  */
	if (accordionButon) {
		accordionButon.forEach((el) => el.addEventListener("click", showAccordionContent));
	}

	function showAccordionContent() {
		/* Ative state to accordion-items */
		let parentItem = this.parentNode.parentNode;
		if (!parentItem.classList.contains("accordion-active")) {
			parentItem.classList.add("accordion-active");
		} else {
			parentItem.classList.remove("accordion-active");
		}

		/* to accordion-body toggle class 'show-accordion' */
		parentItem.querySelector(`.${collapse}`).classList.toggle("show-accordion");

		/* Change icon */
		let icons = parentItem.querySelector(`.${icon}`);
		if (icons && !icons.classList.contains("uil-minus")) {
			icons.classList.remove("uil-plus");
			icons.classList.add("uil-minus");
		} else {
			icons.classList.remove("uil-minus");
			icons.classList.add("uil-plus");
		}
	}
};
showAccordionContent("accordion__collapse", "accordion__button", "accordion__items-icon");

/*==================== COPY ELEMENT TO CLIPBOARD ====================*/
/**
 * Copy element to clipboard
 * @param {string} copyContainer - the selector of the element when we click text is copy
 * @param {string} copyElement - the selector of the text to copy
 * @param {string} alertBox - the selector of the text to copy
 * @param {string} delay - the delay to hide copied alert box
 */
const copyTextToClipBoard = (copyContainer, copyElement, alertBox, delay) => {
	const copyItem = document.querySelectorAll(`.${copyContainer}`);
	const copiedAlert = document.getElementById(alertBox);
	const hideDelay = delay;

	/* Valide if constant exist */
	if (copyItem.length > 0 && copiedAlert && hideDelay) {
		copyItem.forEach((el) => {
			el.addEventListener("click", copyText);
		});
	} else {
		console.error("one of the arguments returns an error: check if they are written correctly");
	}

	function copyText() {
		let textToCopy = this.querySelector(`.${copyElement}`).innerHTML;

		/* Copy the text to the clipboard */
		navigator.clipboard.writeText(textToCopy);

		/* Show copied text alert box*/
		if (!copiedAlert.classList.contains("show-copied")) copiedAlert.classList.add("show-copied");

		/* Hide copied text alert box after hideDelay value */
		setTimeout(() => {
			copiedAlert.classList.remove("show-copied");
		}, hideDelay);
	}
};

copyTextToClipBoard("copy-items", "copy-element", "copied-alert", 3000);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
	const scrollup = document.getElementById("scroll-up");
	if (this.scrollY >= 100) scrollup.classList.add("show-scroll");
	else scrollup.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
