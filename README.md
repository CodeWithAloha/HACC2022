<h1 align="center">Menehune URL Shortener</h1>

<div align="center">
	:moyai:
</div>
<div align="center">
  <strong>Developed by Team CFH</strong>
</div>

<div align="center">
  <h3>
  	<a href="https://menehune-url.bobbynoodles.com/">
      Website
    </a>
  	<span> | </span>
    <a href="https://devpost.com/software/cfh">
      Devpost
    </a>
  </h3>
</div>

### Philosophy
URL shorteners are known to be used to send malicious links, malware, and other malicous activities. Menehune URL Shortener was created to increase trust and transparency when using a URL shortener.

### Overview Solution
Menehune is a URL shortening service with a focus on security and transparency. It provides transparency through open-sourcing the code and provides security through malware detection, blocking known bad IP addresses, and user accountability.

### Technical Details 
This web application was built using HTML, CSS, & JavaScript. The front-end uses Pug as our templating language and Bootstrap for our styling. We used NodeJS and Express to create our back-end and used MongoDB with Mongoose for our storage. Deployment is done with docker on a local server.

#### Prerequisites
* Install [Git](https://git-scm.com/downloads)
* Install [Node.js (with npm)](https://nodejs.org/en/download/).

#### Setup
* 
* Navigate to the folder where you would like to install the application
* Run `git clone https://github.com/CodeforHawaii/HACC2022.git`
* Navigate to the newly created HACC2022 folder
* Run the following at the root of your project

```bash

npm i # Install dependencies

npm start # Starts the server or 

npm run dev # To start the developement server
```

Go to `http://localhost:8080/` in your browser and create an account.
or
Login using these test credentials:
```
username: test@gmail.com
password: password
```

The `Shortener` page contains the url shortener along with options to set an expiration date and/or create a QR-code for the shortened link. 

The `Urls` page is a user dashboard where you can view, edit, and delete your URL's. 

The `Console` page is an admin only page where administrators can view and analyze data from users and the URL's that they have shortened. 