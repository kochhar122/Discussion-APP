const ELEMENTS = {
  HEAD1: "h1",
  HEAD4: "h4",
  BUTTON: "button",
  INPUT: "input",
  TEXTAREA: "textarea",
  PARA: "p",
  SPAN: "span",
  DIV: "div",
  LABEL: "label",
  ICONTAG:"i",
  ICONTAGG:"ii",
  ICONTAGGG:"iii"
};
const addQuestionBtn = document.querySelector("#new");
const rightSection = document.getElementById("right");
let listQuestionsSection = document.getElementById("two");

// 1. Fetch List of Questions and create list.
CreateListOfQuestions();

function CreateListOfQuestions() {
  const existingQuestions = getQuestionsFromLocalStorage();
    
  console.log(existingQuestions)

  existingQuestions.forEach((arrayItem, index, fullArray) => {
    console.log("this is index",index)
    AddToQuestionsList(arrayItem,index);
  });
}

addQuestionBtn.addEventListener("click", AddQuestion);

function AddQuestion() {
  rightSection.innerHTML = ""; //clear whole div with single line
  addQuestionBtn.disabled = true;
  let h1 = document.createElement(ELEMENTS.HEAD1);
  let h4 = document.createElement(ELEMENTS.HEAD4);
  let input1 = document.createElement(ELEMENTS.INPUT);
  let input2 = document.createElement(ELEMENTS.TEXTAREA);
  var submitBtn = document.createElement(ELEMENTS.BUTTON);

  submitBtn.id = "back";
  input1.id = "in3";
  input2.id = "in5";
  h1.innerText = "Welcome to Discussion Portal !";
  h4.innerText = "Enter a subject and question to get started";
  submitBtn.innerText = "Submit";
  input2.placeholder = "Question";
  input1.placeholder = "Subject";

  rightSection.appendChild(h1);
  rightSection.appendChild(h4);
  rightSection.appendChild(input1);
  rightSection.appendChild(input2);
  rightSection.appendChild(submitBtn);
  
  let back = document.getElementById("back");

  submitBtn.addEventListener("click", function () {
    if (input1.value != "") {
      let a = input1.value;
      let b = input2.value;
      rightSection.innerHTML = ""; //clear whole div with single line
      addQuestionBtn.disabled = false;
      back.remove(back);

      let record = {
        subject: a,
        question: b,
        questionId: new Date().valueOf(), // will add question with a unique id
      };
      SubmitQuestionToLocalStorage(record);
      AddToQuestionsList(record);
      // Retrieve
    } else {
      h4.innerText = "Enter Response First";
      h4.style.color = "red";
    }
  });
}

function SubmitQuestionToLocalStorage(record) {
  let existingQuestions = getQuestionsFromLocalStorage();
  // add question to the list
  existingQuestions.push(record);
  localStorage.setItem("questions", JSON.stringify(existingQuestions));
}

function getQuestionsFromLocalStorage() {
  let existingQuestions = localStorage.getItem("questions");
  if (JSON.parse(existingQuestions)) {
    existingQuestions = JSON.parse(existingQuestions);
  } else {
    existingQuestions = [];
  }
  return existingQuestions;
}

function AddToQuestionsList(record,index) {
  if (record) {
    let x = document.createElement(ELEMENTS.PARA);
    x.innerText = record.subject;
    let y = document.createElement(ELEMENTS.SPAN);
    y.id = "sp";
    y.innerText = record.question ;
    let question = document.createElement(ELEMENTS.DIV);
    question.id = record.questionId;
    question.setAttribute("class", `resove`);
    question.setAttribute("onclick", `DiscussQuestion(${record.questionId})`);
    question.appendChild(x);
    question.appendChild(y);
    let icontag = document.createElement(ELEMENTS.ICONTAG);
    let icontagg=document.createElement(ELEMENTS.ICONTAGG);
    let icontaggg=document.createElement(ELEMENTS.ICONTAGGG);
    question.appendChild(icontag);
    question.appendChild(icontagg);
    question.appendChild(icontaggg);
    icontag.setAttribute("class",'fa-regular fa-star')
    icontagg.setAttribute("class",'fa-regular fa-thumbs-up')
    icontaggg.setAttribute("class",'fa-regular fa-thumbs-down')
    listQuestionsSection.appendChild(question);
  }
}

function DiscussQuestion(questionId,index) {
  //clear the right section first
  rightSection.innerHTML = "";
  let existingQuestions = getQuestionsFromLocalStorage();
  let questionObj = existingQuestions.find(
    (question) => question.questionId === questionId
  );

  let qh4 = document.createElement(ELEMENTS.HEAD4);
  qh4.innerText = "Question";
  qh4.className = "qh4";
  let qdiv = document.createElement(ELEMENTS.DIV);
  qdiv.id = questionId + "-questionDiv";
  qdiv.className = "qdiv";
  let qp = document.createElement(ELEMENTS.PARA);
  qp.className = "qp";
  let qp2 = document.createElement(ELEMENTS.PARA);
  let addCommentsBtn = document.createElement(ELEMENTS.BUTTON);
  let resolveQuestionBtn = document.createElement(ELEMENTS.BUTTON);
  let resove = document.createElement(ELEMENTS.DIV);
  let qlabel = document.createElement(ELEMENTS.LABEL);
  addCommentsBtn.className = "qbutton";
  resolveQuestionBtn.className = "button1";
  qlabel.innerText = "Response";

  resove.setAttribute("id", `resove`);

  qp2.innerText = questionObj.question;
  qp.innerText = questionObj.subject;
  addCommentsBtn.innerText = "ADD";
  resolveQuestionBtn.innerText = "Resolve";
  resove.appendChild(qlabel);
  qdiv.appendChild(qp);
  qdiv.appendChild(qp2);
  addCommentsBtn.setAttribute(
    "onclick",
    `OpenCommentsSection(${questionObj.questionId})`
  );
  resolveQuestionBtn.setAttribute(
    "onclick",
    `deletePrQuestion(${questionObj.questionId},${index})`
  );


  rightSection.appendChild(qh4);
  rightSection.appendChild(qdiv);
  rightSection.appendChild(addCommentsBtn);
  rightSection.appendChild(resolveQuestionBtn);
  rightSection.appendChild(resove);
  ShowListOfComments(questionId);
  }
  function deletePrQuestion(questionId,index)
  {
  
    let questionDiv = document.getElementById(questionId);
    questionDiv.innerHTML="";
   // const existingQuestions = getQuestionsFromLocalStorage();

    let existingQuestions = localStorage.getItem("questions");
    document.querySelector("#right").style.display = "none";
    document.querySelector("#comments-section").style.display = "none";
    // localStorage.removeItem(index);

  }
function OpenCommentsSection(questionId) {
  let commentsSection = document.getElementById(`comments-section`);
  let a = document.createElement("h5");
  let qin1 = document.createElement(ELEMENTS.INPUT);
  qin1.id = "name-comments-section";
  let qin2 = document.createElement(ELEMENTS.TEXTAREA);
  qin2.id = "comment-text-comments-section";
  var submitComment = document.createElement(ELEMENTS.BUTTON);
  submitComment.setAttribute("onclick", `AddComment(${questionId})`);

  a.innerText = "ADD Response";
  qin1.placeholder = "Enter name";
  qin2.placeholder = "Enter Comment";
  submitComment.innerText = "Submit";

  commentsSection.appendChild(a);
  commentsSection.appendChild(qin1);
  commentsSection.appendChild(qin2);
  commentsSection.appendChild(submitComment);
}

//in order to add comment we should have connection between comment-id and a question-id
function AddComment(questionId) {
  const name = document.getElementById("name-comments-section").value;
  const comment = document.getElementById(
    "comment-text-comments-section"
  ).value;
  if (name && comment) {
    const commentObj = {
      questionId: questionId,
      commentId: new Date().valueOf(),
      name: name,
      comment: comment,
      time: new Date(),
    };
    AddCommentToStorage(commentObj);
    ShowListOfComments(questionId);
  }
}

function AddCommentToStorage(commentObject) {
  const existingComments = getCommentsFromStorage();
  existingComments.push(commentObject);
  localStorage.setItem("comments", JSON.stringify(existingComments));
}

function getCommentsFromStorage() {
  let existingComments = localStorage.getItem("comments");
  if (JSON.parse(existingComments)) {
    existingComments = JSON.parse(existingComments);
  } else {
    existingComments = [];
  }
  return existingComments;
}

function ShowListOfComments(questionId) {
  const commentsSection = document.getElementById("comments-section");
  commentsSection.innerHTML = "";
  const comments = getCommentsFromStorage();

  //filter comments for a particular question
  const commentsByQuestion = comments.filter(
    (comment) => comment.questionId === questionId
  );

  const tableFragment = document.createDocumentFragment();

  commentsByQuestion.forEach((commentObj) => {
  
    const div = document.createElement(ELEMENTS.DIV);
    div.innerHTML = `<p> ${commentObj.name}</p><p>${
      commentObj.comment
    } </p><p>  ${commentObj.time.toString()}</p>`;
    tableFragment.appendChild(div);
  });
  commentsSection.appendChild(tableFragment);
}
  
  //Search function
  function search_animal() {
    let input = document.getElementById('find').value
    input = input.toLowerCase();
    let x = document.getElementsByTagName('p');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";

        }

    }
}