gameStart = function() {
$("#start").on('click', function(){
    $("#start").remove();
    gameSet.loadQuestions();
})}


$(document).on('click', '.answer-button', function(e){
    gameSet.clicked(e);
})

$(document).on('click', '#reset', function(){
    gameSet.reset();
})

var questions = [{
    question: "Name the largest freshwater lake in the world?",
    answers: ["Lake Superior", "Lake Tahoe", "Lake Michigan", "Lake Erie"],
    correctAnswer: "Lake Superior",
    image: "assets/images/lake-superior.gif"
}, {
    question: "Where would you find the Sea of Tranquility?",
    answers: ["Jupiter", "Mars", "Mercury", "The Moon"],
    correctAnswer: "The Moon",
    image: "assets/images/the-moon.gif"
}, {
    question: "What is the captial city of Spain?",
    answers: ["San Juan", "Barcelona", "Madrid", "Seville"],
    correctAnswer: "Madrid",
    image: "assets/images/madrid.gif"
}, {
    question: "Who directed the movie trilogy 'The Lord of the Rings'?",
    answers: ["George Lucas", "Peter Jackson", "Steven Spielberg", "Ryan Coogler"],
    correctAnswer: "Peter Jackson",
    image: "assets/images/peter-jackson.gif"
}, {
    question: "What actor plays the iconic character 'John Wick'?",
    answers: ["Kevin Hart", "Brad Pitt", "Chris Evans", "Keanu Reeves"],
    correctAnswer: "Keanu Reeves",
    image: "assets/images/john-wick.gif"
}];

var gameSet = {
    questions:questions,
    currentQuestions:0,
    counter:15,
    correct:0,
    incorrect:0,
    unanswered:0,

    countdown: function(){
        gameSet.counter--;
        $("#counter").html(gameSet.counter);
        if(gameSet.counter <= 0) {
            console.log("Time's Up!");
            gameSet.timesUp();
        }
    },

    loadQuestions: function(){
        timer = setInterval(gameSet.countdown, 1000);
        $('#subcontainer').html("<h2>Time Left: <span id='counter'>15</span> seconds.</h2>");
        $("#subcontainer").append('<h2>'+questions[gameSet.currentQuestions].question+'</h2>');
        for(var i=0; i < questions[gameSet.currentQuestions].answers.length; i++) {
            $("#subcontainer").append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[gameSet.currentQuestions].answers[i]+'">'+questions[gameSet.currentQuestions].answers[i]+'</button>');

        }
    },

    nextQuestions: function(){
        gameSet.counter = 15;
        $('#counter').html(gameSet.counter);
        gameSet.currentQuestions++;
        gameSet.loadQuestions();
    },

    timesUp: function(){
        clearInterval(timer);
        gameSet.unanswered++;
        $('#subcontainer').html("<h2>Time's Up!");
        $('#subcontainer').append("<h3>The answer you're looking for is: "+questions[gameSet.currentQuestions].correctAnswer+"</h3>");
        if (gameSet.currentQuestions==questions.length-1){
            setTimeout(gameSet.results,3*1000);
        }
        else {
            setTimeout(gameSet.nextQuestions,3*1000);
        }

    },

    results: function(){
        clearInterval(timer);
        $('#subcontainer').html("<h2>That's all, folks!</h2>");
        $('#subcontainer').append("<h3>Correct Answers: "+gameSet.correct+"</h3>");
        $('#subcontainer').append("<h3>Incorrect Answers: "+gameSet.incorrect+"</h3>");
        $('#subcontainer').append("<h3>Unanswered Answers: "+gameSet.unanswered+"</h3>");
        $('#subcontainer').append("<button id='reset'>Play Again!</button");
    },

    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[gameSet.currentQuestions].correctAnswer){
            gameSet.answerCorrect();
        }
        else {
            gameSet.answerIncorrect();
        }
    },

    answerCorrect: function(){
        console.log("You answered correctly.. this time..");
        clearInterval(timer);
        gameSet.correct++;
        $("#subcontainer").html("<h2>You answered correctly... this time..</h2>");
        if (gameSet.currentQuestions==questions.length-1){
            setTimeout(gameSet.results,3*1000);
        }
        else {
            setTimeout(gameSet.nextQuestions,3*1000);
        }

    },

    answerIncorrect: function(){
        console.log("You suck, go read a book or google more.");
        clearInterval(timer);
        gameSet.incorrect++;
        $("#subcontainer").html("<h2>Nope! Go read a book or google more.</h2>");
        if (gameSet.currentQuestions==questions.length-1){
            setTimeout(gameSet.results,3*1000);
        }
        else {
            setTimeout(gameSet.nextQuestions,3*1000);
        }
    },

    reset: function(){
        clearInterval(timer); 
        gameSet.currentQuestions = 0;
        gameSet.counter = 15;
        gameSet.correct = 0;
        gameSet.incorrect = 0;
        gameSet.unanswered = 0;
        gameSet.loadQuestions();
    }
}

gameStart();