# Multiplex server for Reveal.js

[![Node dependencies](https://david-dm.org/seanho00/reveal-multiplex.svg)](https://david-dm.org/seanho00/reveal-multiplex)

Essentially, @hakimel's original [multiplex plugin](), stripped down
to just the pub/sub Socket.io server, without static hosting
of the slides.

I point all my Reveal.js presentations to an OpenShift VM
(free level) running this Socket.io service.

Inspired by @ryanj [gist-reveal](http://gist-reveal.it/).

## Install on OpenShift:

[![Launch on OpenShift](http://launch-shifter.rhcloud.com/launch/LAUNCH ON.svg)](https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=https%3A%2F%2Fraw.githubusercontent.com%2Ficflorescu%2Fopenshift-cartridge-nodejs%2Fmaster%2Fmetadata%2Fmanifest.yml&initial_git_url=https%3A%2F%2Fgithub.com%2Fseanho00%2Freveal-multiplex.git&name=multiplex)

By default, the Socket.io server will be at
`http://multiplex-MYNAME.rhcloud.com:8080/`
and 
`https://multiplex-MYNAME.rhcloud.com:8443/`
where MYNAME is replaced by your OpenShift username.

The ports are 8080 for HTTP and 8443 for HTTPS because OpenShift can't (yet)
do the auto-upgrade to WebSockets on the normal ports.
The normal ports are fine if you're just getting a new token.

## Get token for each presentation:
* `http://multiplex-MYNAME.rhcloud.com/token`
* Say, e.g., the secret is `000SECRET000`, and the SocketID is `000SOCKETID000`

## Reveal.js config:
Place the following in the presentation's index.html, near the bottom,
with the rest of the Reveal.js config:

```js
Reveal.initialize({
	multiplex: {
		url: 'https://multiplex-MYNAME.rhcloud.com:8443/',
		id: '000SOCKETID000',
		secret: Reveal.getQueryHash().s || null
	},
	dependencies: [
        	{ src: '//cdn.socket.io/socket.io-1.4.5.js', async: true },
        	{ src: 'plugin/multiplex/client.js', async: true },
        	{ src: 'plugin/multiplex/master.js', async: true }
    ]
})
```

I prefer to host on GitHub pages, so the presentation URL is something like
`http://MYNAME.github.io/MYPRESENTATION/`

## Open master presentation:
`http://MYNAME.github.io/MYPRESENTATION/?s=000SECRET000`

The 's' argument in the query string gets parsed in the Reveal config into
the the multiplex plugin's 'secret' config option, and sent to the socket.io
server.

# Examples
* http://reveal-skel.seanho.com/
* http://mp-seanho00.rhcloud.com/
