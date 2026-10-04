/**
 * Portfolio contact form backend (Google Apps Script Web App).
 *
 * HOW TO DEPLOY (one-time, ~2 minutes):
 *   1. Go to https://script.google.com  →  "+ New project"
 *   2. Delete the default code, paste this whole file, click Save (💾).
 *   3. Deploy → New deployment → type "Web app":
 *        - Description: "Portfolio contact"
 *        - Execute as:  Me
 *        - Who has access:  Anyone          ← critical
 *   4. Click Deploy, authorize the script to send email (Gmail access).
 *   5. Copy the /exec URL (ends in /exec) and paste it into the site's
 *      js/config.js as CONTACT_ENDPOINT.
 *
 * The frontend POSTs JSON {name, email, message, hp} to this URL.
 * No credentials are ever exposed to the browser.
 */

// Where the contact messages are delivered.
var RECIPIENT = "danielle.annmari.crzld@gmail.com";

function doPost(e) {
  try {
    // Read the submitted fields, supporting BOTH formats:
    //  - FormData (form-encoded) -> e.parameter
    //  - JSON body               -> e.postData.contents
    var data = {};
    if (e.parameter && Object.keys(e.parameter).length) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) { data = {}; }
    }

    // Honeypot: bots fill this hidden field. Silently accept (pretend success).
    if (data.hp && String(data.hp).trim() !== "") {
      return json({ ok: true });
    }

    var name = String(data.name || "").trim();
    var email = String(data.email || "").trim();
    var message = String(data.message || "").trim();

    if (!name || !email || !message) {
      return json({ ok: false, error: "Please fill in all fields." });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: "Please enter a valid email address." });
    }

    MailApp.sendEmail({
      to: RECIPIENT,
      subject: "Portfolio contact from " + name,
      body: "Name: " + name + "\nEmail: " + email + "\n\n" + message
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err.message || err) });
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Portfolio contact backend is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
