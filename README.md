# Multiplex server for Reveal.js

Essentially, Hakim's original multiplex plugin, stripped down
to just the pub/sub Socket.io server, without static hosting
of the slides.

I point all my Reveal.js presentations to an OpenShift VM
(free level) running this Socket.io service.

Inspired by @ryanj [gist-reveal](http://gist-reveal.it/).

## Install on Openshift:

## Get token for each presentation:
* `http://multiplex-MYNAME.rhcloud.com/token`
* Say, e.g., the id is 000SOCKETID000 and the secret is 000SECRET000

## Reveal.js config:
Client config, I host on GitHub Pages:

```js
Reveal.initialize({
	multiplex: [
		{ url: 'http://multiplex-MYNAME.rhcloud.com/' },
		{ id: '000SOCKETID000' }
	]
})
```

## Setting up master:
`http://MYNAME.github.io/MYSLIDES/?secret=000SECRET000`

# Examples
http://seanho00.github.io/
