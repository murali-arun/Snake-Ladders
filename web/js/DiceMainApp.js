var app = angular.module("diceMain", []);
app.controller("diceController", function ($scope, $interval, dice, common, score, $log) {
    var imageNo = 0;
    var totalscore = 0;
    $scope.moveVertical = 900;
    $scope.moveHorizontal = 60;

    totalscore = score.getScore();
    var ladders = [{pos: "1", goToPos: "38"}, {pos: "4", goToPos: "14"}, {pos: "9", goToPos: "31"},{
        pos: "28", goToPos: "84"}, {pos: "21", goToPos: "42"},
        {pos: "51", goToPos: "67"}, {pos: "71", goToPos: "91"}, {pos: "80", goToPos: "100"}];

    var snakes = [{pos: "17", goToPos: "6"}, {pos: "62", goToPos: "19"}, {pos: "87", goToPos: "24"},
        {pos: "54", goToPos: "34"}, {pos: "95", goToPos: "75"},
        {pos: "93", goToPos: "73"}, {pos: "98", goToPos: "79"}, {pos: "64", goToPos: "60"}]

    $scope.imagePath = "/images/START.png";

    $scope.rollStart = function () {
        roller = $interval(function () {
            imageNo = Math.floor(Math.random() * 6 + 1);
            $scope.imagePath = "/images/face" + imageNo + ".png";
        }, 500);
    };

    $scope.rollStop = function () {
        $interval.cancel(roller);
        dice.setDice(imageNo);

        $log.info("score" + score.getScore());
        $log.info("X" + common.calculateX(score.getScore()));
        $log.info("Y" + common.calculateY(common.calculateX(score.getScore()),score.getScore()));
        $log.info("imageNo" + imageNo);
        score.setScore(score.getScore()+imageNo);
        common.check(score,snakes, imageNo);
        common.check(score,ladders, imageNo);
        $log.info("score" + score.getScore());
        $log.info("calculateX" + common.calculateX(score.getScore()));
        $log.info("calculateY" + common.calculateY(common.calculateX(score.getScore()),score.getScore()));
        $scope.moveVertical = common.moveX(common.calculateX(score.getScore()));
        $scope.moveHorizontal = common.moveY(common.calculateX(score.getScore()),common.calculateY(score.getScore()));
        var coin = angular.element(document.querySelector('#coin'));
        coin.css('top', $scope.moveVertical);
        coin.css('left', $scope.moveHorizontal);
        $log.info("Final score" + score.getScore());

    };

});

app.service("common", function ($log) {

    this.calculateX = function (x) {
        var tempx = 0;
        if (x > 10) {
            tempx = ((x / 10) % 10);
        }
        else
        {
            tempx=0;
        }
        return tempx;
    };

    this.calculateY = function (x,y) {
        var tempy = 0;
        if (x == 0) {
            tempy=y;
        }

        if (x > 1) {

            if ((x / 10) % 2 == 0) {
                tempy = y % 10;
            }
            else {
                tempy = (10 - y) % 10;
            }
        }


        return tempy;
    };

    this.check = function (score,x, y) {
        $log.info("SNAKESLADDERS      =============="+score.getScore());

        for (var index = 0; index < x.length; x++) {
            var path = x[index];
            $log.info("CHECK WITH"+y);
            if (x.pos == y) {
                $log.info("GOT SNAME OR LADDER ..going from "+score.getScore());

                score.setScore(x.goToPos);
                $log.info("GOT SNAME OR LADDER ..going to "+score.getScore());
            }
        }
    };

    this.moveX = function (x) {
        return 900 - (x * 96.4);
    };

    this.moveY = function (y) {
        return 60 + (y * 125);
    };

});

app.factory("score", function () {

    var score = 0;
    var addScore = function (tempScore) {
        score = score + tempScore;
    };

    return {
        setScore: function (x) {
            addScore(x);
        },
        getScore: function () {
            return score;
        }
    };
});

app.factory("dice", function () {

    var dice = 1;
    var addDice = function (tempdice) {
        dice = tempdice;
    };

    return {
        setDice: function (x) {
            addDice(x);
        },
        getDice: function () {
            return dice;
        }
    };
});
