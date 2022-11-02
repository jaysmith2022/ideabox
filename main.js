var saveButton = document.getElementById('save-button')
var titleInput = document.getElementById('title-box')
var bodyInput = document.getElementById('body-box')
var ideaContainer = document.getElementById('bottom-container')
var saveForm = document.getElementById('save-form')
var starredButton = document.getElementById('star-button')
var showAllButton = document.getElementsByClassName('show-all')

var currentIdea;
var savedIdeaList = []
var favoriteIdeas = []



saveForm.addEventListener('mouseover', checkForValues);
saveButton.addEventListener('click', displayCard)
ideaContainer.addEventListener('click', updateIdea)
starredButton.addEventListener('click', saveStarred)
// starredButton.addEventListener('click', function (event) {
//     saveStarred(), showAll()
// })


function checkForValues(event) {
    if (event.target.className === 'save-form'){
        if(titleInput.value && bodyInput.value){
            saveButton.removeAttribute('disabled')
        } else {
            saveButton.setAttribute('disabled', '')
        }
    }
}

function createNewIdea() {
    var currentIdea = new Idea(titleInput.value, bodyInput.value);
    savedIdeaList.push(currentIdea)
    // return currentIdea
}

function displayCard(event) {
    event.preventDefault()
    createNewIdea()
    saveIdea(savedIdeaList)
    titleInput.value = ''
    bodyInput.value = ''
    checkForValues(event)
}

function saveIdea(ideas) {
    ideaContainer.innerHTML = ""
    for (var i = 0; i < ideas.length;i++) {
        var updatedStar = ideas[i].updateIdea();
    
        ideaContainer.innerHTML += `<article class="saved-idea">
        <header class="top-header">
        <button class='starred-button' ${ideas[i].star}'><img class="starred-button" id='${ideas[i].id}' src="${updatedStar}" /></button>
        <button class='delete-button' id='${ideas[i].id}'><img class='delete-button' id='${ideas[i].id}' src='assets/delete.svg' /></button>
        </header>
        <h2>${ideas[i].title}</h2>
        <p>${ideas[i].body}</p>
        <footer class="footer-container">
        <button class="comment-button"><img src="assets/comment.svg" /></button>
        <label class="label-text">Comment</label>
        </footer>
        </article><br>`
        saveButton.setAttribute('disabled', '')
    }
}

function deleteFavorite(event) {
    for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i].id === parseInt(event.target.id)) {
            favoriteIdeas.splice(i,1)
            saveIdea(savedIdeaList)
        }
    }
}

function deleteIdea(event) {
    for (var i = 0;i < savedIdeaList.length;i++) {
        if (savedIdeaList[i].id === parseInt(event.target.id)) {
            savedIdeaList.splice(i,1)
            saveIdea(savedIdeaList)
        }
    }

    for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i].id === parseInt(event.target.id)) {
            favoriteIdeas.splice(i,1)
            saveIdea(savedIdeaList)
        }
    }
}

// Two issues.  1 - Need to prevent duplicates  
//              2 - Need to be able to remove a favorite

function updateStar(event) {
    for(var i = 0; i < savedIdeaList.length;i++) {
        if (savedIdeaList[i].id === parseInt(event.target.id)) {
            if(savedIdeaList[i].star){
                savedIdeaList[i].star = !savedIdeaList[i].star
                deleteFavorite(event)
                saveIdea(savedIdeaList)
            } else {
                savedIdeaList[i].star = !savedIdeaList[i].star
                saveIdea(savedIdeaList)
                if (!favoriteIdeas.includes(savedIdeaList[i])){
                    favoriteIdeas.push(savedIdeaList[i])
                }
            }
        }
    }
}

function updateIdea(event) {
    if (event.target.classList.contains('starred-button')) {
        updateStar(event)
    }
    if (event.target.classList.contains('delete-button')) {
        deleteIdea(event)
    }
}


function saveStarred(event) {
    event.preventDefault()
    if (starredButton.innerText === 'Show Starred Ideas'){
        starredButton.innerText = 'Show All Ideas'
        // starredButton.className = " show-all" 
        saveIdea(favoriteIdeas);
    } else {
        starredButton.innerText = 'Show Starred Ideas'
        saveIdea(savedIdeaList);
    }
    
}

// function showAll() {
// }


{/* 
<article class="saved-idea">
<header class="top-header">
<button class='starred-button'><img class="starred-button" src="assets/star-active.svg" /></button>
<button class='delete-button'><img class='delete-button' src='assets/delete.svg' /></button>
</header>
<h2>Idea title</h2>
<p>This is what I was thinking. We just hang out all day and do nothing and just eat popcorn all freaking day and lay around. Its gonna be awesome!</p>
<footer class="footer-container">
<button class="comment-button"><img src="assets/comment.svg" /></button>
<label class="label-text">Comment</label>
</footer>
</article>
 */}