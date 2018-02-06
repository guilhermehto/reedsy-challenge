var app = angular.module('app');

app.controller('indexController', ($scope, filesService) => {

    $scope.sentFiles = [];

    /**
     * Uses the files service to post a file to the api
     * @param {string} type
     *  The type of file to be posted
     *
     */
    $scope.onSendFileClicked = (type) => {
        const file = {type: type};
        $scope.sentFiles.push(file);
        filesService.postFile(file)
            .then((res) => {
                console.log(res.data);
            }, (err) => {
                console.error('Error posting @ File Service', err);
            })
    };

    /**
     * Simply empties the sentFiles
     */
    $scope.onResetSentOrder = () => {
        $scope.sentFiles = [];
    }
});
