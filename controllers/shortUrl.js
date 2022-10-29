const Url = require('../models/Url')
Url.collection.createIndex({ slug: 1 }, { unique: true })
const { validateUrl } = require('../utils/utils')
const dns = require('dns');
const fetch = require('node-fetch');


async function lookupPromise(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address, family) => {
      if (err) reject(err);
      resolve(address);
    });
  });
};


const urlNotDenylisted = (url) => {
  const denylist = [
    "menehune.azurewebsites.net", // Prevent recursive shortening
    "4chan.org", // Hackers known as 4chan
    "localhost" // Prevent self destruction
  ];

  let urlObj = {};
  try {
    urlObj = new URL(url);
  } catch (err) {
    return 'Invalid URL';
  }

  if (denylist.includes(urlObj.hostname) || denylist.includes(urlObj.host)) {
    return "That URL domain is banned";
  }

  return true;
}

const validators = [
  urlNotDenylisted
];

//* @route   POST /shorten
//* @desc    Create short URL
//* @access  Private

exports.postShortUrl = async (req, res) => {
  const base = process.env.BASE_URL
  const { nanoid } = await import('nanoid');
  let { slug, longUrl, user } = req.body

  
  if (validateUrl(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl, user, slug  })
      if (url) {
        res.json(url)
      } else {
        const id = nanoid(7)
        const shortUrl = `${base}/${slug || id}`

        url = new Url({
          slug: slug || id,
          longUrl,
          shortUrl,
          date: new Date(),
          user,
        })

        await url.save()
        res.json(url)
      }
    } catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(401).json('Invalid Url')
  }
}

//*@ route   GET /:slug
//*@ desc    Redirect to long/original URL
//*@ access  Private

exports.getShortUrl = async (req, res) => {
  const { slug } = req.params
  try {
    const url = await Url.findOne({ slug })
    if (url) {
      url.clickCounter++
      await url.save()
      return res.redirect(url.longUrl)
    } else {
      return res.status(404).json({ message: 'Url not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
