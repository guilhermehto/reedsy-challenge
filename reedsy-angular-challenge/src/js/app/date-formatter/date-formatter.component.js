angular.module('dateFormatter')
    .component('rcDateFormatter', {
        templateUrl: './src/js/app/date-formatter/date-formatter.html',
        controller: ($scope, $timeout) => {

            //Hooks
            $scope.onInit = () =>{
                //Set the months
                $scope.months = getMonths();
                //Set the inputs based on the timestamp's default value
                $scope.timestamp = 1402974000000;
                //Initialize the date
                $scope.selectedDate = new Date($scope.timestamp);
                //Set the inputs values correctly based on the default timestamp
                updateInputs();
            };

            //Public

            $scope.isDayInvalid = false;

            /**
             * An event that's fired when the timestamp is changed
             * Updates the inputs and the selected date
             */
            $scope.timestampChanged = () => {
                $scope.selectedDate = new Date($scope.timestamp);
                updateInputs();
            };


            /**
             * An event that is fired when the form inputs have changed
             * It's used to validate the inputs and update the timestamp and the selected date
             */
            $scope.formChanged = () => {
                //If we changed the month it's possible that we have an invalid day
                //Example: Changed Jul 31st 2014 to Feb 31st 2014
                //In this case, we change the current selected day
                const tempDate = new Date(`${$scope.month}/1/${$scope.year}`);
                const tempDateDays = getDays(tempDate);
                const tempDateLastDay = tempDateDays[tempDateDays.length-1];
                if(tempDateLastDay < $scope.day) {
                    showInvalidDayAlert();
                    $scope.selectedDate = new Date(`${$scope.month}/${tempDateLastDay}/${$scope.year}`);
                    $scope.day = tempDateLastDay;
                } else {
                    $scope.selectedDate = new Date(`${$scope.month}/${$scope.day}/${$scope.year}`);
                }
                $scope.days = tempDateDays;
                updateTimestamp();
            };

            //Private

            const alertDuration = 4000;

            /**
             * Returns an array that contains all the days of a a selected month
             * Used to populate the select
             * @param {Date} date
             *  The date to retrive the days from
             * @return {Array} days
             *  An array containing all the days from the desired month
             */
            function getDays(date) {
                const tempDate = new Date(date.getFullYear(), date.getMonth() + 1,0);
                let days = [];
                for (let d = 1; d <= tempDate.getDate(); d++) {
                    days.push(d);
                }
                return days;
            }

            /**
             * Returns an array which contains all they months of the year with its abbreviated name and
             * its number
             * @return {Array} months
             *  Months of the year, ex: { name: 'Jan', value: 1 }
             */
            function getMonths() {
                let months = [];
                for (let m = 1; m <= 12; m++) {
                    const date = new Date(`${m}/01/01`);
                    months.push({
                        name: date.toLocaleString('en-us', {month: 'short'}),
                        value: m
                    });
                }
                return months;
            }


            /**
             * Updates the inputs, making them reflect the timestamp
             */
            function updateInputs() {
                $scope.days = getDays($scope.selectedDate);
                $scope.day = $scope.selectedDate.getDate();
                $scope.month = $scope.selectedDate.getMonth() + 1;
                $scope.year = $scope.selectedDate.getFullYear();
            }

            /**
             * Updates the timestamp, making it reflect the changes on the inputs
             */
            function updateTimestamp() {
                $scope.timestamp = $scope.selectedDate.getTime();
            }

            /**
             * Makes the warning alert visible for a short period of time
             */
            function showInvalidDayAlert() {
                $scope.isDayInvalid = true;
                $timeout(() => {
                    $scope.isDayInvalid = false;
                }, alertDuration);
            }
        }
    });