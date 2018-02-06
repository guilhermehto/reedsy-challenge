angular.module('filesService', [])
    .service('filesService', function ($http) {

        //The port won't reflect changes on the app.js port, this can be improved
        //But as it's just a simple service I decided to leave it as it is
        const baseUrl = 'http://localhost:3000';
        const postFileUrl = '/upload';

        /**
         * Posts a file to the server and returns the server's response
         * @param {FileType} file
         *  The file to be posted for conversion
         * @return {HttpPromise}
         *  A promise with the response from the server
         */
        this.postFile = (file) => {
            console.log(file);
            return $http.post(baseUrl + postFileUrl, file);
        }
    });