angular.module('operations')
    .component('rcOperations', {
        templateUrl: './src/js/app/operations/operations.html',
        controller: ($scope, Operation) => {

            $scope.onInit = () => {
                setDefaultValues();

                $scope.editTypes = [
                    { type: 'move', label: 'Move' },
                    { type: 'insert', label: 'Insert' },
                    { type: 'delete', label: 'Delete' },
                ];

                //Initialize with the move edit
                $scope.edit = 'move';
            };

            /**
             * Applies the operation the the inputted string
             * @param {number} op
             *  Which operation should be applied to the string, 0 being the primary, 1 the secondary
             *  and 2 the composed
             */
            $scope.onApplyClicked = (op) => {
                switch(op) {
                    case 0:
                        $scope.resultText = removeCaretFromString($scope.resultText);
                        $scope.resultText = $scope.primaryOperation.apply($scope.string);
                        break;
                    case 1:
                        $scope.resultText = removeCaretFromString($scope.resultText);
                        $scope.resultText = $scope.secondaryOperation.apply($scope.string);
                        break;
                    case 2:
                        $scope.resultText = removeCaretFromString($scope.resultText);
                        $scope.resultText = $scope.composedOperation.apply($scope.string);
                        break;
                }
            };

            /**
             * Sets the composedOperation with the resulting composition of the primary and secondary ones
             * using the static method from Operation
             */
            $scope.onComposeClicked = () => {
                $scope.composedOperation = Operation.compose($scope.primaryOperation, $scope.secondaryOperation);
            };

            /**
             * Resets everything to the default values
             */
            $scope.onResetClicked = () => {
                setDefaultValues();
            };

            /**
             * Ads a new edit object to the correct operation
             * @param {number} opIndex
             *  The operation that the edit should be added to, 0 being the primary and 1 the secondary
             */
            $scope.onAddEditClicked = (opIndex) => {
                switch(opIndex){
                    case 0:
                        $scope.primaryOperation.addEdit(getSelectedEdit());
                        break;

                    case 1:
                        $scope.secondaryOperation.addEdit(getSelectedEdit());
                        break;
                }
            };

            /**
             * Used for initializing the objects and form values with default ones
             */
            function setDefaultValues() {
                $scope.textInput = 'Some random text';
                $scope.number = 1;
                $scope.string = 'The brown dog jumps over the lazy dog';
                $scope.resultText = '';
                $scope.primaryOperation = Operation.build([]);
                $scope.secondaryOperation = Operation.build([]);
                $scope.composedOperation = Operation.build([]);
            }

            /**
             * Returns a new edit object based on the current selected edit operation
             *
             * @return
             *  An edit object
             */
            function getSelectedEdit() {
                let returnValue;
                switch($scope.edit) {
                    case 'move':
                        returnValue = { move: $scope.number };
                        $scope.number = 1;
                        break;
                    case 'insert':
                        returnValue = { insert: $scope.textInput };
                        $scope.textInput = '';
                        break;
                    case 'delete':
                        returnValue = { delete: $scope.number };
                        $scope.number = 1;
                        break;
                }
                return returnValue;
            }

            /**
             * Returns a new string that does not contain any pipes (|)
             *
             * @return
             *  A new string without pipes
             */
            function removeCaretFromString(string) {
                return string.replace('|', '');
            }


        }
    });