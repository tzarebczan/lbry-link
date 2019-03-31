const urlRegex = /(lbry:\/\/)(@*[a-zA-Z0-9-]*)(#[a-zA-Z0-9]*)*/igm;
var anchors = document.querySelectorAll('[href^="lbry://"], [href^="LBRY://"]');
var objects = document.querySelectorAll('[src^="lbry://"], [src^="LBRY://"]');
var lbry_protocolHandler = 'lbry://';
var providers = [
	'https://beta.lbry.tv/',
];

var a, object, lbry_url;

for(a of anchors){
	lbry_url = a.getAttribute('href').substr(lbry_protocolHandler.length);
	if(!urlRegex.test(lbry_url)){continue};

	if(a.getAttribute('href').substr(0, lbry_protocolHandler.length).toLowerCase() == lbry_protocolHandler) {
		a.setAttribute('href', providers[Math.floor(Math.random()*providers.length)] + lbry_url);
	}
}

for(object of objects){
	lbry_url = object.getAttribute('src').substr(lbry_protocolHandler.length);
	if(!urlRegex.test(lbry_url)){continue};

	if(object.getAttribute('src').substr(0, lbry_protocolHandler.length).toLowerCase() == lbry_protocolHandler) {
		object.setAttribute('src', providers[Math.floor(Math.random()*providers.length)] + lbry_url);
	}
}

function searchAndInsert(node, x) {
  if (node.nodeName == "#text" && node.nodeValue.match(urlRegex)) {
    // Text with lbry address found
    // Wrap it in a span so we can alter the innerHTML and add a link
    const replacementNode = document.createElement('span');

    replacementNode.innerHTML = node.nodeValue.replace(urlRegex, function(str) {
      return `<a href="${str}">${str}</a>`;
    });

    node.parentNode.insertBefore(replacementNode, node);
    node.parentNode.removeChild(node);
  } else if (node.innerHTML && node.innerHTML.includes('lbry://')) {
    if (node.childNodes) {
      for (var i = 0; i < node.childNodes.length; i++) {
        const currentNode = node.childNodes[i];
        searchAndInsert(node.childNodes[i], true);
      }
    }
  }
}

function addLinks() {
  const htmlNodes = window.document.all;
  let body;

  for (var i = 0; i < htmlNodes.length; i ++) {
    const element = htmlNodes[i];
    if (element.nodeName === "BODY") {
      body = element;
      break;
    }
  }

  searchAndInsert(body);
}

setTimeout(() => {
  addLinks();
}, 2000);
