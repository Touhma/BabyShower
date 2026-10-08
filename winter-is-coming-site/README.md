# Winter Is Coming — Baby Shower RSVP

One page: the invitation card on top, the RSVP form below. Replies go to a Google Sheet.

## 1. Google Sheet for the replies (≈5 min)

1. Create a new Google Sheet (e.g. "Baby shower RSVPs").
2. **Extensions → Apps Script**. Delete what's there, paste the contents of `google-apps-script.js`, click **Save**.
3. **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, allow the permissions (Google warns because it's your own unverified script — choose *Advanced → Go to project*).
5. Copy the **Web app URL** (ends with `/exec`).

## 2. Fill in the two settings

Open `index.html`, find the block near the bottom:

```js
const APPS_SCRIPT_URL = ""; // paste the /exec URL here
const REGISTRY_URL = "";    // paste your registry link here
```

Until `APPS_SCRIPT_URL` is filled in, the form politely says RSVPs aren't open yet.

## 3. Put it on GitHub Pages

1. On github.com: **New repository** → name it e.g. `baby-shower` → Public → Create.
2. **Add file → Upload files** → drag in `index.html` (the other files are optional) → **Commit**.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → **Save**.
4. After ~1 minute the site is live at `https://<your-username>.github.io/baby-shower/`.

To make it the root address `https://<your-username>.github.io/`, name the repository exactly `<your-username>.github.io` instead.

## 4. Test

Open the live link on your phone, send a test RSVP, check that a row appears in the sheet, then delete the test row.

If you later change `google-apps-script.js`, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
