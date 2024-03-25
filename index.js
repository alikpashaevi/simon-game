var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggler = false;


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4); 
  var randomChosenColour = buttonColours[randomNumber];
  $('h1').text("Level " + level);
  level++;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$('.btn').click(function() {
  var userChosencolour = this.id;
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour);
  animatePress(userChosencolour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
  $("#" + currentColor).removeClass('pressed');
  }, 100);
};

$(document).keydown(function() {
  if (!toggler) {
    $("#level-title").text("Level " + level);
    nextSequence();
    toggler = true;
  };
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
   if(userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}};

function startOver() {
 level = 0;
 gamePattern = [];
 toggler = false;
}