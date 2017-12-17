var myProductName = "feedParserDemo"; myVersion = "0.4.2";

const request = require ("request");
const FeedParser = require ("feedparser");

const urlTestFeed = "https://www.theatlantic.com/feed/author/ta-nehisi-coates/";

function getFeed (urlfeed, callback) {
	var req = request(urlfeed);
	var feedparser = new FeedParser ();
	var feedItems = new Array ();
	req.on ("response", function (res) {
		var stream = this;
		if (res.statusCode == 200) {
			stream.pipe (feedparser);
			}
		});
	req.on ("error", function (res) {
		console.log ("getFeed: Error reading feed.");
		});
	feedparser.on ("readable", function () {
		try {
			var item = this.read (), flnew;
			if (item !== null) { //2/9/17 by DW
				feedItems.push (item);
				}
			}
		catch (err) {
			console.log ("getFeed: err.message == " + err.message);
			}
		});
	feedparser.on ("end", function () {
		callback (undefined, feedItems);
		});
	feedparser.on ("error", function (err) {
		console.log ("getFeed: Error reading feed.");
		callback (err);
		});
	}

console.log ("\n" + myProductName + " v" + myVersion + ".\n");

// function refreshFeed () {
//   var feedUrl = document.getElementById("feedUrl").value();
//   getFeed (feedUrl, function (err, feedItems) {
//   	if (!err) {
//   		function pad (num) {
//   			var s = num.toString (), ctplaces = 3;
//   			while (s.length < ctplaces) {
//   				s = "0" + s;
//   				}
//   			return (s);
//   			}
//   		console.log ("There are " + feedItems.length + " items in the feed.\n");
//   		for (var i = 0; i < feedItems.length; i++) {
//   			console.log ("Item #" + pad (i) + ": " + feedItems [i].title + ".\n");
//   			}
//   		}
//   });
// }

module.exports = {
  getFeed: getFeed
}
