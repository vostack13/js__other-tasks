window.Controller = {
    async friendsRoute() {
        const results = document.querySelector('#results');
        const friends = await Model.getFriends({ fields: 'photo_100' });
        results.innerHTML = View.render('friends', { list: friends.items });
    },
    async newsRoute() {
        const results = document.querySelector('#results');
        const news = await Model.getNews({ filters: 'post', count: 20 });
        results.innerHTML = View.render('news', { list: news.items });
    }
};

// задача - прослойка между model и view
 