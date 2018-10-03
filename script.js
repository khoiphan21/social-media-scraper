(function () {
    // The below lines are needed to ensure console works
    var frame = document.createElement('iframe');
    document.body.appendChild(frame);
    console = frame.contentWindow.console

    /**
     * NOTES: MAKE SURE JQUERY IS PRESENT FIRST
     */

    MAX_NUM_POST = 50;

    class Scraper {

        constructor(platform = 'facebook') {
            this.platform = platform;

            if (platform === 'facebook') {
                this.likesQuery = '._4arz>span';
                this.commentsQuery = 'a._ipm._-56';
                this.sharesQuery = '._ipm._2x0m';
                this.postQuery = '._4arz>span';
                this.datesQuery = 'span.timestampContent';
            } else if (platform === 'twitter') {
                this.likesQuery = '.js-actionFavorite>span>span.ProfileTweet-actionCountForPresentation';
                this.commentsQuery = '.js-actionReply>span>span.ProfileTweet-actionCountForPresentation';
                this.sharesQuery = '.js-actionRetweet>span>span.ProfileTweet-actionCountForPresentation';
                this.postQuery = '.tweet.js-stream-tweet';
                this.datesQuery = '._timestamp';
            }
        }

        query(key) {
            const all = $(key);
            return this.getAllowedItems(all);
        }

        getAllowedItems(allItems) {
            const allowedItems = [];
            let count = 0;
            for (let item of allItems) {
                if (count >= MAX_NUM_POST) break;
                allowedItems.push(item);
                count += 1;
            }
            return allowedItems;
        }

        // To get the total number of likes
        getTotalLikes() {
            let likeElements = this.query(this.likesQuery);
            let numLikes = 0;

            for (let element of likeElements) {
                let amount = /[\d.kK]+/.exec(element.innerHTML)[0];
                if (amount.toLowerCase().indexOf('k') > 0) {
                    let decimal = Number(amount.slice(0, amount.length - 1))
                    numLikes += decimal * 1000;
                } else {
                    numLikes += Number(amount);
                }
            }
            return numLikes;
        }

        getTotalComments(print = false) {
            let commentElements = this.query(this.commentsQuery);

            return this.getTotalFromString(commentElements, print);
        }

        getTotalFromString(all, print = false) {
            let count = 0;
            for (let part of all) {
                let value = Number(part.innerHTML.split(' ')[0]);
                if (print) {
                    console.log(value);
                }
                if (!isNaN(value)) {
                    count += value;
                }
            }
            return count;
        }

        getTotalShares(print = false) {
            let shareElements = this.query(this.sharesQuery);

            return this.getTotalFromString(shareElements, print);
        }

        getTotalPosts() {
            return this.query(this.postQuery).length;
        }

        getAllDates() {
            let rawTimeStamps = this.query(this.datesQuery);
            let timeStamps = []
            for (let time of rawTimeStamps) {
                if (time.id !== "") {
                    timeStamps.push(time.innerHTML);
                }
            }
            return timeStamps;
        }
        
        getAllDatesTwitter() {
            let rawTimeStamps = this.query(this.datesQuery).map(date => {return date.innerHTML});
            return rawTimeStamps;

        }

        getDaysFromNow(date) {
            let daysFromNow = null;
            try {
                const dateStringParts = date.split(' ');
                if (this.platform === 'facebook') {
                    const dateString = `${dateStringParts[0]} ${dateStringParts[1]} 2018`;
                    daysFromNow = Math.round(((((Date.now() - new Date(dateString).getTime()) / 1000) / 60) / 60) / 24);
                } else if (this.platform === 'twitter') {
                    if (dateStringParts.length === 2) {
                        const dateString = `${dateStringParts[0]} ${dateStringParts[1]} 2018`;
                        daysFromNow = Math.round(((((Date.now() - new Date(dateString).getTime()) / 1000) / 60) / 60) / 24);
                    } else if (dateStringParts.length === 3 ) {
                        daysFromNow = Math.round(((((Date.now() - new Date(date).getTime()) / 1000) / 60) / 60) / 24);

                    }
                }
            } catch {
                console.log('error parsing date: ', date);
            }
            return daysFromNow;
        }

        main() {
           if (this.platform === 'facebook') {
                this.printForFacebook();
           } else if (this.platform === 'twitter') {
               this.printForTwitter();
           }
        }

        printForFacebook() {
            const totalLikes = `Total number of likes: ${this.getTotalLikes()}`;

            const totalComments = `Total number of comments: ${this.getTotalComments()}`;

            const totalShares = `Total number of shares: ${this.getTotalShares()}`;

            const totalPosts = `Total number of posts: ${this.getTotalPosts()}`;

            const allDates = this.getAllDates();
            const oldestDate = allDates[allDates.length - 1];
            const postData = `Most recent post: ${allDates[0]}. Oldest post retrieved: ${oldestDate}`;
            const timeFrame = `Oldest post was ${this.getDaysFromNow(oldestDate)} days from today`;

            console.log(`${totalLikes}\n${totalComments}\n${totalShares}\n${totalPosts}\n${postData}\n${timeFrame}`);
        }

        printForTwitter() {
            const totalLikes = `Total number of likes: ${this.getTotalLikes()}`;

            const totalComments = `Total number of replies: ${this.getTotalComments()}`;

            const totalShares = `Total number of retweets: ${this.getTotalShares()}`;

            const totalPosts = `Total number of posts: ${this.getTotalPosts()}`;

            const allDates = this.getAllDatesTwitter();
            const oldestDate = allDates[allDates.length - 1];
            const postData = `Most recent post: ${allDates[0]}. Oldest post retrieved: ${oldestDate}`;
            const timeFrame = `Oldest post was ${this.getDaysFromNow(oldestDate)} days from today`;

            console.log(`${totalLikes}\n${totalComments}\n${totalShares}\n${totalPosts}\n${postData}\n${timeFrame}`);
        }
    }

    new Scraper('facebook').main();
    // new Scraper('twitter').main();
})();