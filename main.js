var saveButton = document.getElementById('save-button')
var titleInput = document.getElementById('title-box')
var bodyInput = document.getElementById('body-box')
var ideaContainer = document.getElementById('bottom-container')
var saveForm = document.getElementById('save-form')
var starredButton = document.getElementById('star-button')
var showAllButton = document.getElementsByClassName('show-all')
var searchBox = document.querySelector('.search-box')

var currentIdea
var savedIdeaList = []
var favoriteIdeas = []
var searchIdeas = []


searchBox.addEventListener('input', searchBar)
saveForm.addEventListener('mouseover', checkForValues);
saveButton.addEventListener('click', displayCard)
ideaContainer.addEventListener('click', updateIdea)
starredButton.addEventListener('click', saveStarred)





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
}

function displayCard(event) {
    event.preventDefault()
    createNewIdea()
    loadIdeas()
    titleInput.value = ''
    bodyInput.value = ''
    checkForValues(event)
}

function saveIdea(ideas) {
    ideaContainer.innerHTML = ""
    for (var i = 0; i < ideas.length;i++) {
        var updatedStar = ideas[i].updateIdea(); 
        ideaContainer.innerHTML = ideaContainer.innerHTML + `<article class="saved-idea">
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

function loadIdeas() {
    if (starredButton.innerText === 'Show Starred Ideas'){
        saveIdea(savedIdeaList);
    } else {
        saveIdea(favoriteIdeas);
    }
}

function deleteFavorite(event) {
    for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i].id === parseInt(event.target.id)) {
            favoriteIdeas.splice(i,1)
        }
    }
    loadIdeas();
}

function deleteIdea(event) {
    for (var i = 0;i < savedIdeaList.length;i++) {
        if (savedIdeaList[i].id === parseInt(event.target.id)) {
            savedIdeaList.splice(i,1)
        }
    }
    
    for (var i = 0; i < favoriteIdeas.length; i++) {
        if (favoriteIdeas[i].id === parseInt(event.target.id)) {
            favoriteIdeas.splice(i,1)
        }
    }
    loadIdeas();
}

function updateStar(event) {
    for(var i = 0; i < savedIdeaList.length;i++) {
        if (savedIdeaList[i].id === parseInt(event.target.id)) {
            if(savedIdeaList[i].star){
                savedIdeaList[i].star = !savedIdeaList[i].star
                deleteFavorite(event)
            } else {
                savedIdeaList[i].star = !savedIdeaList[i].star
                if (!favoriteIdeas.includes(savedIdeaList[i])){
                    favoriteIdeas.push(savedIdeaList[i])
                }
            }
        }
    }
    loadIdeas();
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
    searchBox.value = ""
    if (starredButton.innerText === 'Show Starred Ideas'){
        starredButton.innerText = 'Show All Ideas'
    } else {
        starredButton.innerText = 'Show Starred Ideas'
    }
    loadIdeas()
}

function searchBar(event) {
    event.preventDefault()
    var value = event.target.value.toLowerCase()
    searchIdeas = []
    var currentList = [];
    if (starredButton.innerText === 'Show Starred Ideas'){
        currentList = savedIdeaList;
    } else {
        currentList = favoriteIdeas;
    }
    
    for(var i = 0; i < currentList.length;i++) {
        var newTitle = currentList[i].title.toLowerCase()
        var newBody = currentList[i].body.toLowerCase()
        if(!searchIdeas.includes(currentList[i]) && searchBox.value){
            if (newTitle.includes(value) || newBody.includes(value)) {
                searchIdeas.push(currentList[i])
            }   
        }
    }
    
    if (searchBox.value && !searchIdeas.length) {
        saveIdea(searchIdeas)  
    } else if (searchIdeas.length > 0){
        saveIdea(searchIdeas)
    } else {
        loadIdeas()
    }
    
}
