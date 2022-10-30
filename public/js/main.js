/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    $('#error-message').addClass('invisible');
    $('#error-message').addClass('d-none');
    $('#result').addClass('invisible');
    $('#result').addClass('d-none');

    const userLongURL = $('input[name="longUrl"]').val();
    const currentUserEmail = $('p#currentUserEmail').text();
    const userSlug = $('input[name="slug"]').val();

    const {
      error, message,
      slug, longUrl, shortUrl, clickCounter, date
    } = await getURL(userLongURL, currentUserEmail, userSlug);

    console.log(error);
    console.log(message);

    if (error) {
      $('#error-message').removeClass('invisible');
      $('#error-message').removeClass('d-none');
      $('#error-message').text("⚠️ " + message);
      return;
    }

    $('#result').removeClass('invisible');
    $('#result').removeClass('d-none');
    $('#copy-btn').removeClass('invisible');
    $('#copy-btn').removeClass('d-none');

    $('#shortUrl').text(shortUrl);
    // $("body").append(slugEl, shortURLEl, longURLEL, clickCounterEl, dateEl);

  });

  const newUrlCopyBtn = new ClipboardJS("#copy-btn")
  const urlsCopyBtns = new ClipboardJS("[id^=copyUrlBtn]")

  // Messages and make the button blink
  newUrlCopyBtn.on("success", function (e) {
    e.clearSelection();
  });
});

async function getURL(userURL, currentUserEmail, userSlug) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug: userSlug, longUrl: userURL, user: currentUserEmail, })
  }
  console.log(userSlug);
  const response = await fetch("/shorten", options)

  const json = await response.json();

  return json;
}