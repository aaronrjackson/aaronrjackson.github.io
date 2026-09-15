# Decision log

Your methods section. About one page total.

Answer these as you go, not the night before it is due.
Specifics beat polish - a short honest answer is worth more than a long vague one.

Delete these instructions when you are done, or leave them. It does not matter.

---

## 1. What did you set out to build, and what changed?

What you wanted at the start, and what is actually live now.
Name one thing you dropped or added along the way, and why.

My goal for this was to build a personal website that is primarily professional-facing,
but also includes some personal, non-professional stuff. What exists now is a two-page
site, where `index.html` contains anything "professional", and `life.html` (which I
called "off the clock") contains some extra personal stuff about me for those curious.
The biggest change along the way was splitting into two pages instead of one; I go into
why and what it cost in question 2.

---

## 2. A fork in the road

Name one real choice where you could have gone two ways.
Plain HTML or a framework. One page or several. Your own CSS or someone's template.
What goes on the front page and what does not.

Say which you picked, what the alternative was, and what you gave up by not taking it.

"There was no alternative" is not an answer. Find the fork.

One fork in the road was deciding between one page or two pages. Originally, this site
was just one long scrolling page containing my personal-life section after all my
professional career-oriented stuff. Instead, I chose to split this personal section
off to become a separate page under `life.html` which is linked from the spine as "off
the clock". I picked the split because it keeps the front page purely professional,
which is what a recruiter or professor would see first. What I gave up: this is
plain HTML with no templating, so the spine header (name, nav, theme toggle, contact
links) is now duplicated across both files and has to be kept in sync by hand every
time I change it, instead of living in one place.

---

## 3. Where you overruled the agent

One time Claude suggested, wrote, or claimed something and you did not take it.

What did it do? How did you notice? What did you do instead?

If it genuinely never happened, say so plainly, and then say what you would have had to
check in order to notice. Being honest here costs you far less than a story you cannot
defend when you record your video.

Sections on my website are labeled like "// about" or "// projects" like code
comments. Originally, these were hard to read since they were small and used gray
text on a gray background. I asked Claude to fix the legibility, and its choice was
to make them bigger, bolder, and utilize the orange accent color of the webpage.
However, this orange accent is used on this website primarily on clickable links.
As a result, these section headers read as something that's clickable to me even
though they're not. As such, I pushed back on this to Claude, and this resulted
in the state that they're currently in now where the "//" is a more muted gray, but
keeping the size and weight so that the label reads clearly but no longer looks like
a link.

---

## 4. How you know it works

What check did you run, and what did it tell you?

Then the real question: **what would have made this check fail?**
A check that could not have failed is not a check.

Link to your `verification/` folder.

Link: [`verification/`](verification/), containing `website.png`, `fetch.txt`, `README.md`.

During development I checked every change against a local server
(`python3 -m http.server 8000`) instead of the live URL, to avoid waiting on GitHub
Pages for every small edit. After each push I verified the live site separately: a
`curl` of the live URL and a check that new assets (fonts, images, the PDF writeup)
returned HTTP 200 with the right content-type, not just that the page loaded.

For final verification, `fetch.txt` is `curl -i https://aaronrjackson.github.io`,
which came back `HTTP/2 200` served directly by GitHub.com with the real page body.
`website.png` is the live site in a browser with the URL bar visible. What would have
made this fail: a leading-slash path on `style.css`, `app.js`, or the fonts/images
(`/style.css` instead of `style.css`) would have 404'd on GitHub Pages, and the page
would have rendered as unstyled black-on-white text with no sidebar, no dark mode,
and no theme toggle. That is the specific failure mode this check rules out.

---

## 5. What is still wrong

One thing on your own site that is not right, not finished, or that you do not
fully understand.

What would you do next, and how would you find out?

The spine header (name, nav, theme toggle, contact links) is duplicated between
`index.html` and `life.html` because this is plain HTML with no build step or
templating. Right now I keep the two copies in sync by hand, with a comment in each
file pointing at the other. It has already drifted once (the theme-toggle button was
added to one page before the other). If I added a third page this would get worse.
Next step would be either a small static-site build step that shares one header
partial, or a tiny script that checks the two spines haven't diverged. I'd notice a
regression by comparing the two files directly since they're small enough. But this is
not a real check, just something I remember to do whenever I edit the spine.
