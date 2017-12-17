
var feedData = null;
window.onload = function() {
  m.render(document.body, [
    m("main", [
        m("h1", "RSS Feeds"),
        m("div", {id: "inputDiv"}, [
          m("input", {id:"urlIn", value:"https://www.theatlantic.com/feed/author/ta-nehisi-coates/"}),
          m("button", {onclick:getFeed}, "Get Feed")
        ],
        m("div", {id:"feedList"}))
    ])
  ])

}
  function getFeed(){
    var feed = document.getElementById("urlIn").value;
    m.request({
      method: "GET",
      url: "/api/feed" + "?feedUrl=" + feed,
      feedUrl: feed
    })
    .then(function(data) {
      writeToPage(data);
    })
  }
  function writeToPage(feeds) {
    // console.log(feeds);
    feedData = feeds;
    var listDiv = document.getElementById("feedList");
    for (i = 0; i < feeds.length; i ++) {
       m.render(listDiv, m("h3", feeds[i]["atom:title"]["#"]));
    }
    m.render(listDiv,
      m("ul", feeds.map(function(f) {
      return m("li",
        m.trust(f["atom:title"]["#"]))
      }))
    )
  }
