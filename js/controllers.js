var appControllers = angular.module('appControllers', []);


appControllers.controller('HomeController', function($http, $scope, $rootScope, $timeout) {

    // load some data

    $scope.data = {};
    $scope.final_transcript = '';
    $scope.animatorClass = "flash";
    $scope.top = 0;

    $scope.init = function() {
        $scope.loadData();
        $scope.setupKeys();
        $scope.fakeData = $scope.generateData(100);
        $scope.setupSpeech();
    }

    /** 
     * Load some data from data.json. Will be available under $scope.data
     **/

    $scope.loadData = function() {
        $http.get('data.json').success(function(data) {
            $scope.data = data;
        });
    }

    $scope.setupKeys = function() {
        key('space', function() {
            alert('Hello!')
        });
    }

    /**
     * Generates some fake data using Faker.js
     * Reference: https://github.com/marak/Faker.js/
     *
     * n: Number of data rows that will be generated
     **/

    $scope.generateData = function(n) {

        var fakeData = {
            "keys": [],
            "values": []
        };

        for (var i = 0; i < n; i++) {

            var data = {
                "First Name": Faker.Name.firstName(),
                "Last Name": Faker.Name.lastName(),
                "City": Faker.Address.city(),
                "Color": Faker.random.array_element(["Green", "Red", "Orange"])
            }

            fakeData.values.push(data);
        }

        // push keys
        for (var k in fakeData.values[0]) fakeData.keys.push(k);

        return fakeData;
    }

    $scope.setupSpeech = function() {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Webspeech not available. Use Chrome instead.");
        } else {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onstart = function() {}
            recognition.onresult = function(event) {
                var interim_transcript = '';

                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {

                    } else {
                        var term = event.results[i][0].transcript;
                        console.log(term)


                        console.log("yo")
                        $scope.animatorClass = term;

                        if (term == "move it up") {
                            $scope.top -= 10;
                        } else if (term == "down") {
                            $scope.top += 10;
                        }
                        $scope.$apply();

                    }
                }
            }
            recognition.onerror = function(event) {}
            recognition.onend = function() {}

            recognition.start();
        }
    }

    $scope.init();

});