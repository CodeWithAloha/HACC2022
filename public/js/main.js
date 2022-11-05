/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    $('#error-message').addClass('invisible');
    $('#error-message').addClass('d-none');
    $('#result').addClass('invisible');
    $('#result').addClass('d-none');
    $('#qrcode').empty();

    const userLongURL = $('input[name="longUrl"]').val();
    const currentUserEmail = $('p#currentUserEmail').text();
    const userSlug = $('input[name="slug"]').val();
    const shortLinkEpirationDate = $('input[name="expirationDate"]').val();

    const {
      error, message,
      slug, longUrl, shortUrl, expirationDate, clickCounter, date
    } = await getURL(userLongURL, currentUserEmail, userSlug, shortLinkEpirationDate);

    console.log(error);
    console.log(message);

    if (error) {
      this.addError(message)
      return;
    }

    $("#urlInput").removeClass("border border-2 border-danger")
    $('#result').removeClass('invisible');
    $('#result').removeClass('d-none');
    $('#qr-btn').removeClass('invisible');
    $('#qr-btn').removeClass('d-none');
    $('#qrcode-container').removeClass('invisible');
    $('#qrcode-container').removeClass('d-none');
    $('#copy-btn').removeClass('invisible');
    $('#copy-btn').removeClass('d-none');
    $('#shortUrl').text(shortUrl);

  });

  const newUrlCopyBtn = new ClipboardJS("#copy-btn")
  const urlsCopyBtns = new ClipboardJS("[id^=copyUrlBtn]")
  const generateQRBtn = document.getElementById("qr-btn");

  // Messages and make the button blink
  newUrlCopyBtn.on("success", async function (e) {
    e.clearSelection();
    $("#copy-btn").prop("innerText", "Copied!");
    await delay(1000);
    $("#copy-btn").prop("innerText", "Copy to clipboard");
  });
  
  urlsCopyBtns.on("success", async function (e) {
    e.clearSelection();
    $(`#${e.trigger.id}`).children(".fa-clipboard").toggleClass("fa-clipboard").toggleClass("fa-solid fa-check");
    await delay(1000);
    $(`#${e.trigger.id}`).children(".fa-check").toggleClass("fa-solid fa-check").toggleClass("fa-clipboard");
  })

  $("#urlInput").on("input", async(e) => {
    const userURL = $('input[name="longUrl"]').val();
    const currentUserEmail = $('p#currentUserEmail').text();

    console.log(e.target.value)
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  longUrl: userURL, user: currentUserEmail })
    }
    const response = await fetch("/checkURL", options);

    const {error, message} = await response.json();
    if(error)
    {
      this.addInvalidURLError(message);
      return;
    }
    this.addSuccess(message);
  })

});

function addInvalidURLError()
{
  $('#success-message').addClass('invisible');
  $('#success-message').addClass('d-none');
  $("#urlInput").addClass("border border-2 border-danger")
}

function addError(message)
{
  $('#success-message').addClass('invisible');
  $('#success-message').addClass('d-none');
  $('#error-message').removeClass('invisible');
  $('#error-message').removeClass('d-none');
  $('#error-message').text("⚠️ " + message);
  return;
}

function addSuccess()
{
  $("#urlInput").removeClass("border border-2 border-danger")
  $('#error-message').addClass('invisible');
  $('#error-message').addClass('d-none');
  $('#success-message').removeClass('invisible');
  $('#success-message').removeClass('d-none');
  $('#success-message').text("✅" + "Valid URL!");
}

async function getURL(userURL, currentUserEmail, userSlug, shortLinkEpirationDate) { //* fixing param casing
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug: userSlug, longUrl: userURL, user: currentUserEmail, expirationDate: shortLinkEpirationDate }) //* fixing param casing
  }
  console.log(userSlug);
  const response = await fetch("/shorten", options)

  const json = await response.json();

  return json;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

