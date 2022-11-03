function generateQRCode() {
  const link = document.getElementById('shortUrl');
  if (link) {
    const shorUrl = link.innerText;
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, shorUrl);
 
     document.getElementById("qrcode-container").style.display = "block";
  } 
}