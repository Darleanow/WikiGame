export default function injectGlobals(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  return link;
}
