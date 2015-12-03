var RSS = require('rss');

module.exports = function(req, res) {
    var feed = new RSS({
        'title': 'Keivaun Waugh\'s Blog',
        'feed_url': 'keivaunwaugh.com/feed',
        'site_url': 'keivaunwaugh.com',
        'managingEditor': 'Keivaun Waugh',
        'webMaster': 'Keivaun Waugh'
    });

    POSTS.find().limit(10).sort({date:-1}, function(error, docs){
        for (var i in docs) {
            feed.item({
                'title': docs[i].subject,
                'description': docs[i].content,
                'url': 'keivaunwaugh.com/' + docs[i]._id,
                'guid': docs[i]._id,
                'author': docs[i].name,
                'date': docs[i].date 
            });
        }
        render(req, res, feed);
    });
};

function render(req, res, feed) {
    var xml = feed.xml();
    res.send(xml);
}
