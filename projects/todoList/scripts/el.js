// element selector function using query selector
// select element and return as an element or a node list
export default function el(target) {
  // check whether the target is a nodelist
  return document.querySelectorAll(target).length !== undefined &&
    document.querySelectorAll(target).length > 1
    ? document.querySelectorAll(target)
    : document.querySelector(target);
}
