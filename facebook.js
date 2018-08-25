(function () {
    /**
     * NOTES: MAKE SURE JQUERY IS PRESENT FIRST
     */

    MAX_NUM_POST = 50;

    delete Scraper;

    class Scraper {

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
            let likeElements = this.query('._4arz>span');
            let numLikes = 0;

            for (let element of likeElements) {
                if (element.innerHTML.toLowerCase().indexOf('k') > 0) {
                    let decimal = Number(element.innerHTML.slice(0, element.innerHTML.length - 1))
                    numLikes += decimal * 1000;
                } else {
                    numLikes += Number(element.innerHTML);
                }
            }
            return numLikes;
        }

        getTotalComments(print = false) {
            let commentElements = this.query('a._ipm._-56');

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
            let shareElements = this.query('._ipm._2x0m');

            return this.getTotalFromString(shareElements, print);
        }

        getTotalPosts() {
            return this.query('._4arz>span').length;
        }

        getAllDates() {
            let rawTimeStamps = this.query('span.timestampContent');
            let timeStamps = []
            for (let time of rawTimeStamps) {
                if (time.id !== "") {
                    timeStamps.push(time.innerHTML);
                }
            }
            return timeStamps;
        }

        getDaysFromNow(date) {
            const dateString = `${date.split(' ')[0]} ${date.split(' ')[1]} 2018`;
            return Math.round(((((Date.now() - new Date(dateString).getTime()) / 1000) / 60) / 60) / 24)
        }

        main() {
            const totalLikes = `Total number of likes: ${this.getTotalLikes()}`;

            const totalComments = `Total number of comments: ${this.getTotalComments()}`;

            const totalShares = `Total number of shares: ${this.getTotalShares()}`;

            const totalPosts = `Total number of posts: ${this.getTotalPosts()}`;

            const allDates = this.getAllDates();
            const oldestDate = allDates[allDates.length - 1];
            const postData = `Most recent post: ${allDates[0]}. Oldest post retrieved: ${oldestDate}`;
            const timeFrame = `Oldest post was ${this.getDaysFromNow(oldestDate)} days from today (25/08)`;

            console.log(`${totalLikes}\n${totalComments}\n${totalShares}\n${totalPosts}\n${postData}\n${timeFrame}`);
        }
    }

    new Scraper().main();
})();