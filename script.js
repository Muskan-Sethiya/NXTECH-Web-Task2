const questions=[
    {
        question:"Javascript is an _______ language?",
        answers:[
            {text:"Object-Oriented",correct:true},
            {text:"Object-Based",correct:false},
            {text:"Procedural",correct:false},
            {text:"None of the Above",correct:false}
        ]
    },
    {
        question:"Which of the following keywords is used to define a variable in Javascript?",
        answers:[
            {text:"var",correct:false},
            {text:"let",correct:false},
            {text:"Both A and B",correct:true},
            {text:"None of the Above",correct:false}
        ]
    },
    {
        question:"Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers:[
            {text:"Throws an error",correct:false},
            {text:"Ignores the statements",correct:true},
            {text:"Gives a warning",correct:false},
            {text:"None of the Above",correct:false}
        ]
    },
    {
        question:"Which of the following methods can be used to display data in some form using Javascript?",
        answers:[
            {text:"document.write()",correct:false},
            {text:"console.log()",correct:false},
            {text:"window.alert()",correct:false},
            {text:"All of the Above",correct:true}
        ]
    },
    {
        question:"What keyword is used to check whether a given property is valid or not?",
        answers:[
            {text:"in",correct:true},
            {text:"is in",correct:false},
            {text:"exists",correct:false},
            {text:"lies",correct:false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currenQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currenQuestion.question;

    currenQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
      if(currentQuestionIndex<questions.length){
        handleNextButton();
      }else{
        startQuiz();
      }
});

startQuiz();
