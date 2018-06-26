// Get the open graph meta description content and return an object with it's content for the "descrption", or an empty object
Array.from(
  document.querySelectorAll('head > meta[property="og:description"]') || []
).reduce((acc, n) => ((acc.description = n.getAttribute('content')), acc), {})
