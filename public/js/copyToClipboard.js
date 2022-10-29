//* Copy to clipboard function for /shortener page

document.querySelector('#copy-btn').addEventListener('click', copyToClipboard);

async function copyToClipboard() {
  const link = document.getElementById("shortUrl").innerText;
  
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link);
      console.log(`Copied to clipboard: ${link}`);
      alert(`Copied to clipboard: ${link}`)
    } else {
      console.log("Clipboard API not supported, please copy manually");
    }
  } catch (err) {
    console.error(`Failed to copy: ${link}`);
  }
}

//TODO Copy to clipboard function for /urls page







