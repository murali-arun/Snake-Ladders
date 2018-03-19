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
        score.setScore(imageNo);
        $log.info("score" + score.getScore());

        $log.info("X" + common.calculateX(score.getScore()));
        $log.info("Y" + common.calculateY(common.calculateX(score.getScore()),score.getScore()));
        $log.info("imageNo" + imageNo);
        //score.setScore(imageNo);
        common.check(score,snakes, imageNo);
        common.check(score,ladders, imageNo);
        $log.info("score" + score.getScore());
        $log.info("calculateX" + common.calculateX(score.getScore()));
        $log.info("calculateY" + common.calculateY(common.calculateX(score.getScore()),score.getScore()));
        $scope.moveVertical = common.moveX(score.getScore(),common.calculateX(score.getScore()));
        $scope.moveHorizontal = common.moveY(score.getScore(),common.calculateY(common.calculateX(score.getScore()),score.getScore()));
        var coin = angular.element(document.querySelector('#coin'));
        coin.css('top', $scope.moveVertical);
        coin.css('left', $scope.moveHorizontal);
        $log.info("Final score" + score.getScore());

    };

});

app.service("common", function ($log) {

    this.calculateX = function (x) {
        var tempx = 0;
        tempx = ((x / 10) % 10);

        if(x%10==0){
            tempx=tempx-1;
        }

        $log.info("X ---------------------->"+parseInt(tempx));
        return parseInt(tempx);
    };

    this.calculateY = function (x,y) {
        var tempy = 0;
        if (x == 0) {
            tempy=y-1;
        }

        if (x > 0) {
            var tempx=0;
            if(y%10==0){
                tempx=x+1;
            }
            else{
                tempx=x;
            }

            if (tempx % 2 == 0) {
                tempy = Math.max(0,((y % 10)-1));
            }
            else {
                tempy = (10 - (y % 10));
            }
        }

        $log.info("Y ---------------------->"+tempy);

        return tempy;
    };

    this.check = function (score,x, y) {
        $log.info("SNAKESLADDERS      =============="+score.getScore());

        for (var index = 0; index < x.length; index++) {
            var path = x[index];
            if (path.pos == score.getScore()) {
                score.modifyScore(path.goToPos);
            }
        }
    };

    this.moveX = function (score,x) {
        var localX = 900 - (x * 96.4);
        if (score == 100) {
            localX = 38;
        }

        return localX;
    };

    this.moveY = function (score,y) {
        $log.info("MOVE YYY" + y);
        $log.info("MOVE YYssss" + (60 + ((y) * 125)));
        var localY = Math.min(1185, 60 + ((y) * 125));
        if (score == 100) {
            localY = 60;
        }
        return localY;

    };

});

app.factory("score", function () {

    var score = 0;
    var addScore = function (tempScore) {
        if (score < 100) {
            score = parseInt(score) + parseInt(tempScore);
            if(score > 100)
            {
                score=score-tempScore;
            }
        }
    };

    var changeScore=function(tempScore){
       score=tempScore;
    };

    return {
        setScore: function (x) {
            addScore(x);
        },
        getScore: function () {
            return score;
        }
        ,
        modifyScore: function (x) {
            return changeScore(x);
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
