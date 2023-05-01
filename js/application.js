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

document.getElementById("tutorial-button").addEventListener("click", function() {
  setDetailContainerHeight(document.getElementById("tutorial"), true);
  setDetailContainerHeight(document.getElementById("explanation"), false);
  setDetailContainerHeight(document.getElementById("about"), false);
});

document.getElementById("explanation-button").addEventListener("click", function() {
  setDetailContainerHeight(document.getElementById("tutorial"), false);
  setDetailContainerHeight(document.getElementById("explanation"), true);
  setDetailContainerHeight(document.getElementById("about"), false);
});

document.getElementById("about-button").addEventListener("click", function() {
  setDetailContainerHeight(document.getElementById("tutorial"), false);
  setDetailContainerHeight(document.getElementById("explanation"), false);
  setDetailContainerHeight(document.getElementById("about"), true);
});







