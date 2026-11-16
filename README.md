ISAIAH'S PORTFOLIO (INFR3120 ASSIGNMENT 2)
==========================================

This is my portfolio from Assignment 1, rebuilt as an Express app with EJS templates. It's hosted on Render.

Live site: https://isaiahportfolioa2.onrender.com           
Repository: https://github.com/isaiaholokude/IsaiahPortfolioA2
video link : https://go.screenpal.com/watch/cOXDeBn4TJx 


PAGES
-----
Every page has its own route in controllers/index.js, and each route calls res.render() on its EJS view.

/          - Home page with my intro and photo
/about     - Poster style About Me with clickable notes that open popups, plus my intro video
/projects  - My five projects as a list
/contact   - Contact form (POST /contact checks the fields on the server and shows a thank you message)

All the pages share one layout (views/layout.ejs) that pulls in the header and footer partials. The footer has my GitHub and LinkedIn links.


FOLDER STRUCTURE
----------------
    app.js                  view engine, layout, static folder, routes, error pages
    bin/www                 starts the server (uses the PORT Render gives it)
    controllers/index.js    all my routes and the content for each page
    public/                 stylesheets/, javascripts/, images/, videos/
    views/
      layout.ejs            shared page with Bootstrap and Font Awesome
      partials/             header.ejs, footer.ejs, project-card.ejs
      pages/                home.ejs, about.ejs, projects.ejs, contact.ejs
      error.ejs             404 and error page


HOW I BUILT IT
--------------
I made the project with Express Generator using the EJS option. The assignment says --views=ejs but the actual flag is --view=ejs (the other one just gives you Jade files).

    npx express-generator --view=ejs portfolio
    npm install
    npm install express-ejs-layouts

Then I renamed routes/ to controllers/, deleted the users route, set up express-ejs-layouts in app.js and wrote the layout, partials and pages. The About popups use Bootstrap modals now instead of the radio button trick from Assignment 1. The colours (Future Blue #003C71 and Tech Tangerine #E75D2A) and fonts are the same as Assignment 1.

To run it locally:

    npm install
    npm start

then open http://localhost:3000


DEPLOYING
---------
On Render I made a new Web Service from this repo. Build command is npm install, start command is npm start, free instance. Render redeploys every time I push. The free plan sleeps after 15 minutes so the first load can be slow.


AI USE
------
I used Claude to help with this assignment. It helped me debug a lot of the code and styling, and move my some Assignment 1 content into EJS. 


CREDITS AND SOURCES
-------------------
  - Express Generator: https://expressjs.com/en/starter/generator.html
  - MDN, Express Tutorial Part 4: Routes and controllers: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
  - EJS docs: https://ejs.co
  - express-ejs-layouts: https://www.npmjs.com/package/express-ejs-layouts
  - Bootstrap 5 (CSS framework, modals, form validation): https://getbootstrap.com/docs/5.3
  - Font Awesome 6 (icons): https://fontawesome.com
  - Fonts: Poppins, Caveat and Playfair Display from Google Fonts (https://fonts.google.com)
  - Render, Deploy a Node Express App: https://render.com/docs/deploy-node-express-app
  - The photos and the intro video are mine.
  - Code from the lectures.
