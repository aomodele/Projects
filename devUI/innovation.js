function fitTextToContainer(el) {
  const maxWidth = el.parentElement.clientWidth;
  let fontSize = parseFloat(getComputedStyle(el).fontSize);

  while (el.scrollWidth > maxWidth && fontSize > 8) {
    fontSize -= 0.5;
    el.style.fontSize = fontSize + "px";
  }
}

document.querySelectorAll(".details p").forEach(fitTextToContainer);