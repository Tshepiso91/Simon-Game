// Array holding the button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Creating the game pattern
var gamePattern = [];

// Creating the clicked pattern
var userClickedPattern = [];


// Starting Game
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// storing the id of the button that got clicked and linking the contents of the variable userChosenColour to userClickedPattern
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

// Checking the user's answers agaisnt game sequence

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
  playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }

}


// Linking the numbers with the color buttonColours
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('level-title').text("Level" + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  // Creating the flash effect for the buttons
  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

// Adding Animation to User Clicks
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Adding sounds to the buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Restarting game
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
