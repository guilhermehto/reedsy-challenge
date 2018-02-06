'use strict';

const FileType = require('./file-type');


//Private
let files = [];
let done = true;
let size = 0;
const preemptMaxSize = 5;


/**
 * Preempts a file (puts it on the index-2 position of the array)
 * @param {FileType} file
 *  File to be preempted
 */
function preemptFile(file) {
    files.splice(files.length - 2, 0, file);
}

/**
 * Adds a file to the current queue, preempting it if possible
 * @param {FileType} file
 *  The file that should be added to the queue
 */
function priorityFilePush(file) {
    //If we don't have anything on the queue or the processing time is the same as the last one, just push it
    if (size === 0 || file.processingTime >= files[files.length - 1].processingTime) {
        files.push(file);
        size++;
        return;
    }
    //If not, we check if the current added file takes less time to process than the last one
    if (file.processingTime < files[files.length - 1].processingTime) {
        //If it does, we verify that the queue's size is smaller than the max preempt size
        if (size <= preemptMaxSize) {
            preemptFile(file);
            size++;
            return;
        }

        //If not, we check if we have another pdf on the last 4 items (excluding the last one, as it is a pdf)
        for (let c = files.length - 2; c > files.length - preemptMaxSize - 1; c--) {
            //Is there a pdf? If so, we preempt the file and return
            if (files[c].processingTime === files[files.length - 1].processingTime) {
                preemptFile(file);
                size++;
                return;
            }
        }

        //Getting here means the file can't be preempted, so we just push it.
        files.push(file);
        size++;
    }
}

//Public
/**
 * Initializes a new File Queue
 * @constructor
 */
function FileQueue() {
    size = 0;
}

/**
 * Enqueues a new file and start the recursive conversion if it's not ongoing
 * @param {String} type
 *  The type of the file to be added to the queue (html or pdf)
 */
FileQueue.prototype.enqueue = function (type) {
    const file = new FileType(type);
    priorityFilePush(file);
    if (done) {
        done = false;
        this.convertFiles();
    }
};


/**
 * Removes a file from the queue
 * @return {FileType}
 *  The file that has ben dequeued
 */
FileQueue.prototype.dequeue = function () {
    const dequeued = files[0];
    files = files.slice(1, files.length);
    size--;
    return dequeued;
};

/**
 * Recursive method that simulates the time taken to convert a pdf or html file
 */
FileQueue.prototype.convertFiles = function () {
    if (size === 0) {
        console.log('------ PROCESSING FINISHED -----');
        done = true;
        return;
    }

    const currentFile = this.dequeue();
    setTimeout(() => {
        console.log(`Processing of ${currentFile.type} finished.`);
        this.convertFiles();
    }, currentFile.processingTime);
};


module.exports = FileQueue;
