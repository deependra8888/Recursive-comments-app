import findCommentById from "./findCommentById";

export default function updateCommentById(comments, id, newComment) {

    for(let i = 0; i < comments.length; i++){
        if(comments[i].id === id){
            if(comments[i].replies){
                comments[i].replies.push(newComment)
                return comments
            }else{
                comments[i].replies = [newComment]
                return comments
            }
        }
        if(comments[i].replies){
            const foundComment = findCommentById(comments[i].replies, id)
            if(foundComment){
                if(foundComment.replies){
                    foundComment.replies.push(newComment)
                    return comments
                }else{
                    foundComment.replies = [newComment]
                   
                    return comments
                }
            }
        }
    }

    return null
}