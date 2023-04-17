export default function editCommentById (id, content, comments, editscore) {
    console.log(content);
    for(let i = 0; i < comments.length; i++){
        if(comments[i].id === id && comments[i].user.username === 'juliusomo'){
            if(editscore === undefined){
                comments[i].content = content
                return 
            }
            if(editscore === true){
                comments[i].score += 1
                return 
            }
            if(editscore === false){
                comments[i].score -= 1;
                return;
            }
        }
        if(comments[i].replies){
           editCommentById(id, content, comments[i].replies, editscore)
        }
    }

    return;
}