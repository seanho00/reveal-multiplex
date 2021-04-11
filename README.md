# DEPRECATED
The official [multiplex plugin](https://github.com/reveal/multiplex) does this now.

# Multiplex server for Reveal.js

[![Node dependencies](https://david-dm.org/seanho00/reveal-multiplex.svg)](https://david-dm.org/seanho00/reveal-multiplex)

Essentially, this is @hakimel's original 
[multiplex plugin](https://github.com/hakimel/reveal.js/tree/master/plugin/multiplex),
stripped down to just the pub/sub socket.io server,
without static hosting of the slides.

I point all my Reveal.js presentations to an [OpenShift](https://openshift.com/) VM
(free level) running this socket.io service.

Inspired by @ryanj [gist-reveal](http://gist-reveal.it/).

## Install on OpenShift:

+ [Sign up for a free OpenShift account](https://manage.openshift.com/)
+ Create a new project, e.g., `multiplex`
+ Add a new application: "Add to Project", and select "Browse Catalog"
+ Under "JavaScript", select "Node.js", latest version (6)
+ Fill in the app's Name (e.g., `multiplex`).
  + Git repo is `https://github.com/seanho00/reveal-multiplex`
+ Select "advanced options", and under "Routing", tick "Secure Route"
+ Select the "Create" button at the bottom
  + The webhook trigger doesn't apply since you don't have 
    control over the source repo in this case.

The route you created should have a long auto-generated hostname; e.g.,
`multiplex-multiplex.7e14.starter-us-west-2.openshiftapps.com`.
You can access the server from that URL.
In the following, replace `MULTIPLEX_HOST` with that hostname.

## Custom domains
You may want to use your own custom domain (e.g., `mp.seanho.com`),
instead of the long auto-generated hostname.

Create a CNAME (using your DNS provider's control panel)
pointing to the auto-generated hostname.

You will also need to create another route in the OpenShift control panel
(Applications &gt; Routes) using your custom domain.

The SSL cert on OpenShift's edge router won't know about your custom domain,
so you may want to consider using CloudFlare's SSL proxy.

## Get token for each presentation:
* `https://MULTIPLEX_HOST/token`
* Say, e.g., the secret is `000SECRET000`, and the SocketID is `000SOCKETID000`

## Reveal.js config:
Place the following in the presentation's index.html, near the bottom,
with the rest of the Reveal.js config:

```js
Reveal.initialize({
	multiplex: {
		url: 'https://MULTIPLEX_HOST/',
		id: '000SOCKETID000',
		secret: Reveal.getQueryHash().s || null
	},
	dependencies: [
        	{ src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js', async: true },
        	{ src: Reveal.getQueryHash().s ?
		  'plugin/multiplex/master.js' :
		  'plugin/multiplex/client.js', async: true }
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
* [Sample presentation](http://reveal-skel.seanho.com/)
  and [master view](http://reveal-skel.seanho.com/?s=45ba034647cea150)
* [socket.io server](https://mp.seanho.com/)

