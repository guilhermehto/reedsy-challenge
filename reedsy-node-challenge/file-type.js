'use strict';

//Private
const htmlProcessingTime = 1000;
const pdfProcessingTime = 5000;

/**
 *
 * @param {String} type
 *  The type of file to be instantiated (pdf or html)
 * @constructor
 */
function FileType(type) {
    this.type = type;
    this.processingTime = this.type === 'html' ? htmlProcessingTime : pdfProcessingTime;
}

module.exports = FileType;

