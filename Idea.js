class Idea {
    constructor(title, body){
        this.id = Date.now()
        this.title = title
        this.body = body
        this.star = false
    }

    updateIdea() {
       if (this.star) {
            return "./assets/star-active.svg"
        } else {
            return "./assets/star.svg"
        } 
    }
}