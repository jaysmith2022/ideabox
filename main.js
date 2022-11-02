var saveButton = document.getElementById('save-button');
var titleInput = document.getElementById('title-box');
var bodyInput = document.getElementById('body-box');
var ideaContainer = document.getElementById('bottom-container');
var saveForm = document.getElementById('save-form');

var currentIdea;
var savedIdeaList = [];


saveForm.addEventListener('mouseover', checkForValues);
saveButton.addEventListener('click', function(event){
    event.preventDefault();
    saveIdea(titleInput.value, bodyInput.value);
})

function checkForValues(evt) {
    if (evt.target.className === 'save-form'){
        if(titleInput.value && bodyInput.value){
            saveButton.removeAttribute('disabled');
        } else {
            saveButton.setAttribute('disabled', '');
        }
    }
}

function saveIdea(title, body) {
        currentIdea = new Idea(title, body);
        ideaContainer.innerHTML += `<article class="saved-idea">
        <header class="top-header">
        <button class='starred-button'><img class="starred-button" src="assets/star-active.svg" /></button>
        <button class='delete-button'><img class='delete-button' src='assets/delete.svg' /></button>
        </header>
        <h2>${currentIdea.title}</h2>
        <p>${currentIdea.body}</p>
        <footer class="footer-container">
        <button class="comment-button"><img src="assets/comment.svg" /></button>
        <label class="label-text">Comment</label>
        </footer>
        </article>`;
        savedIdeaList.push(currentIdea);
        titleInput.value = '';
        bodyInput.value = '';
        saveButton.setAttribute('disabled', '');
}



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