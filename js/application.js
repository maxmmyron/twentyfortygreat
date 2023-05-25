animationDelay = 150;
minSearchTime = 100;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  window.manager = new GameManager(4, KeyboardInputManager, HTMLActuator);
});

/**
 * Updates an element's custom height property, which is used to cleanly animate the height of the element.
 *
 * @param {HTMLElement} el - The element to set the height of
 * @param {*} isOpen - Whether or not the element should be opened or closed
 */
const setDetailContainerHeight = (el, isOpen = false) => {
  el.style.setProperty("--height", (isOpen ? el.scrollHeight: 0) + "px");
}

function sectionClick(id) {
  let idBtn = id + "-button";

  //LOGIC
  // check if the element is already open ("active" class)
  if (document.getElementById(idBtn).classList.contains("active")) {
    // if it is, close it
    setDetailContainerHeight(document.getElementById(id), false);
    document.getElementById(idBtn).classList.remove("active");
    return;
  }

  // STYLE
  // remove other active classes
  document.querySelectorAll(".expand-button").forEach(function(el) {
    if (el.id == idBtn) {
      el.classList.add("active");
    }
    else {
      el.classList.remove("active");
    }
  });

  // FUNCTION
  // close all elements
  document.querySelectorAll(".detail-container").forEach(function(el) {
    // if el.id != id, close it
    setDetailContainerHeight(el, el.id == id);
  });

  const scrollInt = setInterval(function() {
    document.getElementById(id).scrollIntoView();

    // clear once element is open
    // (takes much longer than 0.2 seconds for whatever reason)
    setTimeout(function() {
      clearInterval(scrollInt);
    }, 800);

    // also cancel if element is closed
    if (!document.getElementById(idBtn).classList.contains("active")) {
      clearInterval(scrollInt);
    }

    // also cancel if user scrolls (otherwise user and script fight over scroll position, jerky, etc.)
    document.getElementById(id).addEventListener("wheel", function() {
      clearInterval(scrollInt);
    }, {passive: true});

    // cancel if user interacts with page (mobile?)
    document.getElementById(id).addEventListener("touchstart", function() {
      clearInterval(scrollInt);
    }, {passive: true});
  }, 10);

}

// when clicking on .expand-button, open the corresponding section (read id and split by -)
document.querySelectorAll(".expand-button").forEach(function(el) {
  el.addEventListener("click", function() {
    sectionClick(el.id.split("-")[0]);
  });
});
