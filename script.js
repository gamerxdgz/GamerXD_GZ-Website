/* =========================================================
   GAMERXD_GZ'S SERVER
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM
   ========================================================= */

const loader =
    document.getElementById("loader");

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.getElementById("navigation");

const yearElement =
    document.getElementById("year");


/* =========================================================
   YEAR
   ========================================================= */

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* =========================================================
   PAGE LOADER
   ========================================================= */

function hideLoader() {

    if (!loader) {
        return;
    }

    window.setTimeout(() => {

        loader.classList.add("loaded");

        window.setTimeout(() => {

            loader.remove();

        }, 550);

    }, 650);
}


if (document.readyState === "complete") {

    hideLoader();

} else {

    window.addEventListener(
        "load",
        hideLoader,
        {
            once: true
        }
    );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeMobileMenu() {

    document.body.classList.remove(
        "menu-open"
    );

    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


function toggleMobileMenu() {

    if (!mobileMenu) {
        return;
    }

    const isOpen =
        document.body.classList.toggle(
            "menu-open"
        );

    mobileMenu.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        toggleMobileMenu
    );

}


if (navigation) {

    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   RESIZE SAFETY
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 950 &&
            document.body.classList.contains(
                "menu-open"
            )
        ) {

            closeMobileMenu();

        }

    },
    {
        passive: true
    }
);