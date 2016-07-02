# Multiplex server for Reveal.js

[![Node dependencies](https://david-dm.org/seanho00/reveal-multiplex.svg)](https://david-dm.org/seanho00/reveal-multiplex)

Essentially, @hakimel's original [multiplex plugin](), stripped down
to just the pub/sub Socket.io server, without static hosting
of the slides.

I point all my Reveal.js presentations to an OpenShift VM
(free level) running this Socket.io service.

Inspired by @ryanj [gist-reveal](http://gist-reveal.it/).

## Install on OpenShift:

[![Launch on OpenShift](http://launch-shifter.rhcloud.com/launch/LAUNCH ON.svg)](https://openshift.redhat.com/app/console/application_type/custom?&cartridges[]=nodejs-0.10&initial_git_url=https://github.com/seanho00/reveal-multiplex.git&name=multiplex)

By default, the Socket.io server will be at
`http(s)://multiplex-MYNAME.rhcloud.com/`
where MYNAME is replaced by your OpenShift username.

## Get token for each presentation:
* `http://multiplex-MYNAME.rhcloud.com/token`
* Say, e.g., the secret is `000SECRET000`, and the SocketID is `000SOCKETID000`

## Reveal.js config:
Client config, I host on GitHub Pages:

```js
Reveal.initialize({
	multiplex: [
		{ url: '//multiplex-MYNAME.rhcloud.com/' },
		{ id: '000SOCKETID000' },
		{ secret: null }
	],
	dependencies: [
        	{ src: '//cdn.socket.io/socket.io-1.4.8.js', async: true },
        	{ src: 'plugin/multiplex/client.js', async: true },
        	{ src: 'plugin/multiplex/master.js', async: true }
    ]
})
```

## Setting up master:
`http://MYNAME.github.io/MYSLIDES/?secret=000SECRET000`

# Examples
* http://seanho00.github.io/reveal-multiplex/
* http://mp-seanho00.rhcloud.com/
