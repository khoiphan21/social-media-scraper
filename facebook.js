/**
 * NOTES: MAKE SURE JQUERY IS PRESENT FIRST
 */

 MAX_NUM_POST = 50;

 function query(key) {
     const all = $(key);
     return getAllowedItems(all);
 }

 function getAllowedItems(allItems) {
     const allowedItems = [];
     let count = 0;
     for (item of allItems) {
         if (count >= MAX_NUM_POST) break;
         allowedItems.push(item);
         count += 1;
     } 
     return allowedItems;
 }

// To get the total number of likes
function getTotalLikes() {
    let likeElements = query('._4arz>span');
    let numLikes = 0;

    for (element of likeElements) {
        if (element.innerHTML.toLowerCase().indexOf('k') > 0) {
            let decimal = Number(element.innerHTML.slice(0, element.innerHTML.length - 1))
            numLikes += decimal * 1000;
        } else {
            numLikes += Number(element.innerHTML);
        }
    }
    return numLikes;
}

function getTotalComments(print=false) {
    let commentElements = query('a._ipm._-56');

    return getTotalFromString(commentElements, print);
}

function getTotalFromString(all, print=false) {
    let count = 0;
    for (part of all) {
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

function getTotalShares(print=false) {
    let shareElements = query('._ipm._2x0m');

    return getTotalFromString(shareElements, print);
}

function getTotalPosts() {
    return query('._4arz>span').length;
}

function getAllDates() {
    let rawTimeStamps = query('span.timestampContent');
    let timeStamps = []
    for (time of rawTimeStamps) {
        if (time.id !== "") {
            timeStamps.push(time.innerHTML);
        }
    }
    return timeStamps;
}

function getDaysFromNow(date) {
    const dateString = `${date.split(' ')[0]} ${date.split(' ')[1]} 2018`;
    return Math.round(((((Date.now() - new Date(dateString).getTime()) / 1000) / 60) / 60) / 24)
}

function main() {
    const totalLikes = `Total number of likes: ${getTotalLikes()}`;

    const totalComments = `Total number of comments: ${getTotalComments()}`;

    const totalShares = `Total number of shares: ${getTotalShares()}`;

    const totalPosts = `Total number of posts: ${getTotalPosts()}`;

    const allDates = getAllDates();
    const oldestDate = allDates[allDates.length - 1];
    const postData = `Most recent post: ${allDates[0]}. Oldest post retrieved: ${oldestDate}`;
    const timeFrame = `Oldest post was ${getDaysFromNow(oldestDate)} days from today (25/08)`;

    console.log(`${totalLikes}\n${totalComments}\n${totalShares}\n${totalPosts}\n${postData}\n${timeFrame}`);
}
main();
/**
 * NOTES: MAKE SURE JQUERY IS PRESENT FIRST
 */

MAX_NUM_POST = 50;

function query(key) {
    const all = $(key);
    return getAllowedItems(all);
}

function getAllowedItems(allItems) {
    const allowedItems = [];
    let count = 0;
    for (item of allItems) {
        if (count >= MAX_NUM_POST) break;
        allowedItems.push(item);
        count += 1;
    } 
    return allowedItems;
}

// To get the total number of likes
function getTotalLikes() {
   let likeElements = query('._4arz>span');
   let numLikes = 0;

   for (element of likeElements) {
       if (element.innerHTML.toLowerCase().indexOf('k') > 0) {
           let decimal = Number(element.innerHTML.slice(0, element.innerHTML.length - 1))
           numLikes += decimal * 1000;
       } else {
           numLikes += Number(element.innerHTML);
       }
   }
   return numLikes;
}

function getTotalComments(print=false) {
   let commentElements = query('a._ipm._-56');

   return getTotalFromString(commentElements, print);
}

function getTotalFromString(all, print=false) {
   let count = 0;
   for (part of all) {
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

function getTotalShares(print=false) {
   let shareElements = query('._ipm._2x0m');

   return getTotalFromString(shareElements, print);
}

function getTotalPosts() {
   return query('._4arz>span').length;
}

function getAllDates() {
   let rawTimeStamps = query('span.timestampContent');
   let timeStamps = []
   for (time of rawTimeStamps) {
       if (time.id !== "") {
           timeStamps.push(time.innerHTML);
       }
   }
   return timeStamps;
}

function getDaysFromNow(date) {
   const dateString = `${date.split(' ')[0]} ${date.split(' ')[1]} 2018`;
   return Math.round(((((Date.now() - new Date(dateString).getTime()) / 1000) / 60) / 60) / 24)
}

function main() {
   const totalLikes = `Total number of likes: ${getTotalLikes()}`;

   const totalComments = `Total number of comments: ${getTotalComments()}`;

   const totalShares = `Total number of shares: ${getTotalShares()}`;

   const totalPosts = `Total number of posts: ${getTotalPosts()}`;

   const allDates = getAllDates();
   const oldestDate = allDates[allDates.length - 1];
   const postData = `Most recent post: ${allDates[0]}. Oldest post retrieved: ${oldestDate}`;
   const timeFrame = `Oldest post was ${getDaysFromNow(oldestDate)} days from today (25/08)`;

   console.log(`${totalLikes}\n${totalComments}\n${totalShares}\n${totalPosts}\n${postData}\n${timeFrame}`);
}
main();