var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* ------------------------------------------------------------------
   Helpers: use my real photos / video if they exist in /public,
   otherwise fall back to the default avatar.
------------------------------------------------------------------- */
var publicDir = path.join(__dirname, '..', 'public');
function asset(file, fallback) {
  return fs.existsSync(path.join(publicDir, file)) ? '/' + file : fallback;
}

/* ------------------------------------------------------------------
   Portfolio data (passed to the views as locals)
------------------------------------------------------------------- */
var profile = {
  name: 'Isaiah Olokude',
  role: 'Networking & IT Security Student · Ontario Tech University',
  location: 'Ontario, Canada',
  email: 'isaiah.olokude@ontariotechu.net',
  github: 'https://github.com/isaiaholokude',
  linkedin: 'https://www.linkedin.com/in/isaiah-olokude-8b0294298/',
  summary:
    'I am a Networking and IT Security student at Ontario Tech University with an interest in ' +
    'cybersecurity, digital forensics and web hacking. This portfolio showcases some of the ' +
    'projects and skills I have developed through my studies.'
};

/* The six "notes" from my About page — each opens a popup (Bootstrap modal) */
var aboutNotes = [
  {
    id: 'education', icon: 'fa-solid fa-graduation-cap', title: 'Education',
    text: 'I study Networking and IT Security at Ontario Tech University. I am building my skills in ' +
          'networking, web development and IT security, and I use what I learn in labs and real projects.'
  },
  {
    id: 'cybersecurity', icon: 'fa-solid fa-shield-halved', title: 'Cybersecurity',
    text: 'I first realized that hacking like in the movies can be a real job through modding in games ' +
          'and watching hackers in films. That moment turned a hobby into something I could actually ' +
          'build a career around.'
  },
  {
    id: 'tech', icon: 'fa-solid fa-globe', title: 'Luv for tech',
    text: 'My love for tech comes from always being in front of a screen (maybe that’s why my eyesight ' +
          'is so bad). I love how ping works in video games, and I’m always the one trying to fix the ' +
          'Wi-Fi when it goes down.'
  },
  {
    id: 'family', icon: 'fa-solid fa-people-roof', title: 'Family',
    text: 'I grew up in Brampton as the oldest of three, with a Canadian mom and a Nigerian dad. ' +
          'Growing up, I made a lot of friends and loved playing sports.'
  },
  {
    id: 'gaming', icon: 'fa-solid fa-gamepad', title: 'Gaming',
    text: 'I began playing video games with my dad when I was quite little. My fascination with ' +
          'technology began with those games, which I later played with my brother and friends.'
  },
  {
    id: 'goals', icon: 'fa-solid fa-magnifying-glass', title: 'My goals',
    text: 'I want to become a police officer and join the cybercrime unit, or work as a digital forensic ' +
          'investigator alongside the police. My goal is to help solve cybercrime and protect people from it.'
  }
];

var projects = [
  {
    title: 'Networking Labs',
    category: 'Networking',
    icon: 'fa-solid fa-network-wired',
    tags: ['Subnetting', 'Packet Tracer', 'Wireshark'],
    description: 'Subnetting, routing and switching labs where I design and configure small networks from ' +
                 'scratch. I then test that every device can reach the others and fix whatever breaks.'
  },
  {
    title: 'IT Security Labs',
    category: 'Security',
    icon: 'fa-solid fa-shield-halved',
    tags: ['Secure Config', 'Vuln Scanning'],
    description: 'Hands-on labs about how systems get attacked and how to defend them, including secure ' +
                 'configuration and vulnerability scanning. Each lab ends with what I found and how I fixed it.'
  },
  {
    title: 'Local Business Websites',
    category: 'Web design',
    icon: 'fa-solid fa-store',
    tags: ['HTML', 'CSS', 'Responsive'],
    description: 'I build websites for local businesses with HTML and CSS, using AI tools to speed up ' +
                 'drafting. I then review and fix the code myself and test each page on a phone, tablet and laptop.'
  },
  {
    title: 'Robotics Class Project',
    category: 'Robotics',
    icon: 'fa-solid fa-robot',
    tags: ['Hardware', 'Code', 'Teamwork'],
    description: 'With my team, I built and tested a robot. We combined hardware, code and teamwork, and the ' +
                 'first attempt rarely worked, so most of the learning came from troubleshooting.'
  },
  {
    title: 'School Tech Support',
    category: 'IT support',
    icon: 'fa-solid fa-headset',
    tags: ['Troubleshooting', 'Hardware', 'Wi-Fi'],
    description: 'I helped my school fix technical problems with computers, printers, projectors and Wi-Fi. ' +
                 'I learned to find the cause step by step and to explain the fix in plain language.'
  }
];

/* Images / video: real files if present in /public, otherwise the avatar */
function media() {
  return {
    heroImage: asset('images/hero.png', '/images/avatar.svg'),
    aboutImage: asset('images/about.jpg', '/images/avatar.svg'),
    video: fs.existsSync(path.join(publicDir, 'videos/intro.mp4')) ? '/videos/intro.mp4' : null,
    videoPoster: asset('images/poster.jpeg', '')
  };
}

/* ------------------------------------------------------------------
   Routes — one per page, each using
   router.get(path, function (req, res, next) { res.render(view, locals) })
------------------------------------------------------------------- */

/* GET Home page */
router.get('/', function (req, res, next) {
  res.render('pages/home', {
    title: 'Home',
    profile: profile,
    media: media()
  });
});

/* GET About Me page */
router.get('/about', function (req, res, next) {
  res.render('pages/about', {
    title: 'About Me',
    profile: profile,
    media: media(),
    aboutNotes: aboutNotes
  });
});

/* GET Projects page */
router.get('/projects', function (req, res, next) {
  res.render('pages/projects', {
    title: 'Projects',
    profile: profile,
    projects: projects
  });
});

/* GET Contact Me page */
router.get('/contact', function (req, res, next) {
  res.render('pages/contact', {
    title: 'Contact Me',
    profile: profile,
    sent: false,
    errors: [],
    form: {}
  });
});

/* POST Contact form — validates on the server, then shows a confirmation */
router.post('/contact', function (req, res, next) {
  var form = {
    name: (req.body.name || '').trim(),
    email: (req.body.email || '').trim(),
    phone: (req.body.phone || '').trim(),
    message: (req.body.message || '').trim(),
    robot: (req.body.robot || '').trim()
  };

  var errors = [];
  if (form.name.length < 2) errors.push('Please enter your name (at least 2 characters).');
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.push('Please enter a valid email address.');
  if (!/^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/.test(form.phone)) errors.push('Enter a 10-digit phone number, like 905-555-1234.');
  if (form.message.length < 10) errors.push('Your message should be at least 10 characters.');
  if (form.robot !== '2') errors.push('Robot check failed: 1 + 1 = 2.');

  if (errors.length === 0) {
    console.log('New contact message:', form);
  }

  res.render('pages/contact', {
    title: 'Contact Me',
    profile: profile,
    sent: errors.length === 0,
    errors: errors,
    form: errors.length ? form : {}
  });
});

module.exports = router;
