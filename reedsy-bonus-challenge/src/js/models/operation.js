'use strict';
const app = angular.module('app');

app.factory('Operation', () => {


    function Operation(edits) {
        this.editsArray = edits;
    }


    /**
     * Composes the current operation with a second one
     *
     * @param {object} operation
     *  The operation that should be 'added' to the current one
     *
     */
    Operation.prototype.compose = function (operation) {
        this.editsArray = composeEdits(this.editsArray, operation.getEdits());
    };

    /**
     * Static method that composes two operations, returning a new third one
     *
     * @param {object} op1
     *  The first operation
     * @param {object} op2
     *  The second operation
     *
     * @return
     *   A new instance of Operation composed by the other two
     */
    Operation.compose = function (op1, op2) {
        return new Operation(composeEdits(op1.getEdits(), op2.getEdits()));
    };


    /**
     * Returns a new string after applying all the operations
     *
     * @param {string} string
     *  The string in which the operations will be applied
     *
     * @return
     *   The new 'operated' string
     */
    Operation.prototype.apply = function (string) {
        let carretPosition = 0;
        this.editsArray.forEach(edit => {
            if(typeof edit.move !== 'undefined') {
                carretPosition += edit.move;
                if(carretPosition >= string.length) {
                    console.log('Moved to invalid position');
                    return;
                }
            } else if (typeof edit.delete !== 'undefined') {
                if(carretPosition + edit.delete >= string.length) {
                    console.warn('Trying to delete more characters than possible, everything from the caret will be deleted.');
                }
                string = string.slice(0, carretPosition) + string.slice(carretPosition + edit.delete, string.length);

            } else {
                string = string.slice(0, carretPosition) + edit.insert + string.slice(carretPosition);
            }
        });

        string = string.slice(0, carretPosition) + '|' + string.slice(carretPosition);
        return string;
    };

    /**
     * Adds a new edit to the edits array of the current operation
     *
     * @param {object} edit
     *  The new edit that should be added to the operation's edits
     */
    Operation.prototype.addEdit = function (edit) {
        this.editsArray.push(edit);
    };


    /**
     * Returns all the edits from the current operation
     *
     * @return
     *  A copy of this operation's edits array
     */
    Operation.prototype.getEdits = function() {
        return this.editsArray.slice(0);
    };

    /**
     * Instantiates a new Operation
     * @param{Array} edits
     *  An array of edits
     * @return
     *  A new instance of Operation
     */
    Operation.build = function (edits) {
        return new Operation(edits);
    };

    /**
     * Creates a new array of edits based on two other edit arrays
     * @param{Array} edits1
     *  An array of edits
     * @param{Array} edits2
     *  An array of edits
     * @return
     *  A new instance of Operation
     */
    function composeEdits(edits1, edits2) {
        let newEdits = [];
        let movesum = 0;
        let justSum = false;
        //
        edits1.forEach(edit => {
            if(typeof edit.move !== 'undefined') {
                movesum += edit.move;
            }
            newEdits.push(edit);
        });

        edits2.forEach(edit => {
            let newEdit = Object.assign({}, edit);
            if(typeof edit.move !== 'undefined') {
                if(!justSum) {
                    newEdit.move -= movesum;
                    justSum = newEdit.move <= 0;
                }
            }
            newEdits.push(newEdit);
        });

        return newEdits;
    }

    return Operation;
});


