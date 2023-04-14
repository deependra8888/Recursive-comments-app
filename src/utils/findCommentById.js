export default function findCommentById(comments, id) {

    for(let i = 0; i < comments.length; i++){
        if(comments[i].id === id){
            return comments[i]
        }
        if(comments[i].replies){
            const foundComment = findCommentById(comments[i].replies, id)
            if(foundComment){
                return foundComment;
            }
        }
    }

    return null
}