<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>ROLLING_DICE</title>
    <script src="/js/AngularJSMin.js"></script>
    <script src="/js/DiceMainApp.js"></script>
    <link rel="stylesheet" href="/style/rollingDiceStyles.css" type="text/css"/>
</head>
<body>
<div class="mainBoard">
    <div id="title">Snake and Ladder</div>

    <div id="tabs" data-ng-app="diceMain" data-ng-controller="diceController">
        <div id="tab1">
            <div id="contacts">

            </div>
            <div id="diceRolls">
                <button style="float:left; width:50%; height: 25%; " ng-click="rollStart()">ROLL</button>
                <button style="float:right; width:50%; height: 25%; " ng-click="rollStop()">STOP</button>

                <img id="diceBoard" ng-src="{{imagePath}}"></div>


            <div id="playerDetails">

            </div>
        </div>
        <div id="tab2">
            <img id="snakeladderBoard" ng-src="/images/Snake_Ladder.gif">
            <div id="coin" >
                <img id="coinImage" ng-src="/images/coin.GIF">
            </div>
        </div>

    </div>
</div>
</div>

</div>
</body>
</html>
