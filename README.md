# Node.js & Express.js Starter

Connor Smyth - [connorsmyth.com](https://connorsmyth.com)

I wanted a simple Node.js app starting place that had a familiar directory structure to Laravel and let you start working right away.

## Node Packages
### Dev Dependencies
- "dotenv": "^8.2.0"
    - `.env` file support
- "socket.io": "^2.3.0"
    - Socket.io enables real-time, bidirectional and event-based communication
- "winston": "^3.2.1"
    - A logger for just about everything.
### Dependencies
- "express": "^4.17.1"
    - Fast, unopinionated, minimalist web framework for node.
- "vue": "^2.6.11"
    - Vue (pronounced `/vjuː/`, like view) is a progressive framework for building user interfaces.
    
## Install instructions
1. Clone this repository onto your local machine.
2. `cd` into the project root.
3. Run `npm install`.
4. Copy the `.env.example` file to a new file just called `.env`.
5. Run `node scripts.js` and navigate your browser to `localhost:3000`.

## More info
It's been set up so that it recognizes `/public` as the web root directory.

To compile your Sass into CSS, simply run `npm run sass` which will watch for any Sass file changes and then compile them to CSS.

## Changes to expect in the future
- Gulpfile functionality to compile Sass and JavaScript.
- Further routing setup to allow for a default `/api/` web directory for example.
- MySQL database compatibility.
- Pusher Events integration for event based debugging.
- A directory structure that more closely mimics Laravel.