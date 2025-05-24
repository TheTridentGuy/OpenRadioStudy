const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const exams = JSON.parse(await (await fetch("exams.json")).text());

var exam_option_0 = $("#exam-option-0");
var exam_option_1 = $("#exam-option-1");
var exam_option_2 = $("#exam-option-2");
var exam_option_3 = $("#exam-option-3");
var exam_question = $("#exam-question");
var review_question = $("#review-question");
var review_correct = $("#review-correct");
var review_incorrect_0 = $("#review-incorrect-0");
var review_incorrect_1 = $("#review-incorrect-1");
var review_incorrect_2 = $("#review-incorrect-2");
var review_explanation = $("#review-explanation");
var review_modal = $("#review-modal");
var history_col = $("#history-col");
var question_pool = null;
var question = null;



document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if(event.key == " "){
        review_modal.style.display = "block";
    }else if(event.key == "w"){
        exam_option_0.click();
    }else if(event.key == "a"){
        exam_option_1.click();
    }else if(event.key == "s"){
        exam_option_2.click();
    }else if(event.key == "d"){
        exam_option_3.click();
    }
});

document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if(event.key == " "){
        review_modal.style.display = "none";
    }
});

function start_exam(exam_key){
    question_pool = exams[exam_key];
    fill_question();
}

function fill_question(){
    question = question_pool[Math.floor(Math.random() * question_pool.length)];
    exam_question.innerHTML = question.text;
    let options = scramble([exam_option_0, exam_option_1, exam_option_2, exam_option_3]);
    let prepend = options[0].children[0];
    options[0].innerText = question.correct;
    options[0].prepend(prepend);
    options[0].onclick = () => {correct()};
    for (let i = 1; i < options.length; i++) {
        prepend = options[i].children[0];
        options[i].innerText = question.incorrect[i - 1];
        options[i].prepend(prepend);
        options[i].onclick = () => {incorrect()};
    }
}

function correct(){
    let history_item = document.createElement("div");
    history_item.classList.add("history-item");
    history_item.classList.add("correct");
    history_col.prepend(history_item);
    fill_review();
    fill_question(question);
}

function incorrect(){
    let history_item = document.createElement("div");
    history_item.classList.add("history-item");
    history_item.classList.add("incorrect");
    history_col.prepend(history_item);
    fill_review();
    fill_question(question);
}

function fill_review(){
    review_question.innerHTML = question.text;
    review_correct.innerHTML = question.correct;
    review_incorrect_0.innerHTML = question.incorrect[0];
    review_incorrect_1.innerHTML = question.incorrect[1];
    review_incorrect_2.innerHTML = question.incorrect[2];
    review_explanation.innerHTML = question.explanation || "Google it :P";
}

function scramble(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

exam_option_0.onclick = () => {start_exam("technician")};
exam_option_1.onclick = () => {start_exam("technician")};
exam_option_2.onclick = () => {start_exam("technician")};
exam_option_3.onclick = () => {start_exam("technician")};


console.log("Script loaded successfully");