// This page is essentially useless now since the blog lives behind a password
var RSS = require('rss');

module.exports = function(req, res) {
    var feed = new RSS({
        'title': 'Keivaun Waugh\'s Blog',
        'feed_url': 'http://keivaunwaugh.com/feed',
        'site_url': 'http://keivaunwaugh.com',
        'managingEditor': 'Keivaun Waugh',
        'webMaster': 'Keivaun Waugh'
    });

    POSTS.find().limit(10).sort({date:-1}, function(error, docs){
        for (var i in docs) {
            feed.item({
                'title': docs[i].subject,
                'description': docs[i].content,
                'url': 'http://keivaunwaugh.com/' + docs[i]._id,
                'guid': docs[i]._id,
                'author': docs[i].name,
                'date': docs[i].date 
            });
        }
        var xml = feed.xml({indent: true});
        res.send(xml);
    });
};
