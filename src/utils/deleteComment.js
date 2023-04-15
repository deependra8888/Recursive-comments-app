import findCommentById from "./findCommentById";

export default function deleteComment(comments, id) {
   
    for(let i = 0; i < comments.length; i++){
        if(comments[i].id === id){
           comments.splice(i,1)
           return;
        }
        if(comments[i].replies){
           deleteComment(comments[i].replies, id)
        }
    }

    return;
}

