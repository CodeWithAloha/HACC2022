function generateQRCode() {
  const link = document.getElementById('shortUrl');
  if (link) {
    const shortUrl = link.innerText;
    let qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, {
      text: `${shortUrl}`,
      width: 128,
      height: 128,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
 
     document.getElementById("qrcode-container").style.display = "block";
  } 
}