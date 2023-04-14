import { useState } from 'react'
import './App.css'
import fakeData from './data.json'
import './index.css'
import plusIcon from '../public/images/icon-plus.svg'
import minusIcon from '../public/images/icon-minus.svg'
import replyicon from '../public/images/icon-reply.svg'
import DeleteIcon from '../public/images/icon-delete.svg'
import EditIcon from '../public/images/icon-edit.svg'
import findCommentById from './utils/findCommentById'
import { nanoid } from 'nanoid'
import updateCommentById from './utils/updateCommentById'

function App() {
  const [data, setData] = useState(fakeData)
  const [showCommentAt, setshowCommentAt] = useState()
  return (
    <>
      <main className='flex flex-col  mx-5 my-7'>
        <CardList setData={setData} data={data} showCommentAt={showCommentAt} setshowCommentAt={setshowCommentAt} />
      </main>
    </>
  )
}

export default App

const CardList = ({ data, setshowCommentAt, showCommentAt , setData }) => {

  return (
    <>
      {
        data.comments.map((comment) => {
          return (
            <Card setData={setData} key={comment.id} currentUser={data.currentUser} data={data} comment={comment} showCommentAt={showCommentAt} setshowCommentAt={setshowCommentAt} />
          )
        })
      }
    </>
  )
}

const Card = ({ setData, data, currentUser, comment, setshowCommentAt, showCommentAt }) => {

  const [userComment, setuserComment] = useState('')

  return (
    <>
      <div className='bg-white flex my-4  flex-col gap-6 py-4 px-4 rounded-xl'>
        <div className='flex items-center gap-4'>
          <img width={'40'} src={comment.user.image.png} alt="" />
          <p>{comment.user.username}</p>
          <p>{comment.createdAt}</p>
        </div>
        <p>{comment.content}</p>
        <div className='flex justify-between'>
          <div className='flex gap-3 bg-blue-100 py-1 px-2 rounded-md'>
            <button>
              <img src={plusIcon} alt="" />
            </button>
            <span className='text-blue-800'>{comment.score}</span>
            <button>
              <img src={minusIcon} alt="" />
            </button>
          </div>
          <button onClick={() => { showCommentAt === comment.id ? setshowCommentAt() : setshowCommentAt(comment.id) }} className='flex gap-2 items-center cursor-pointer'>
            <img src={replyicon} alt="" />
            <p className='text-blue-800'>Reply</p>
          </button>
        </div>
      </div>
      {showCommentAt === comment.id &&
        <div className='bg-white py-4 px-4 rounded-xl'>
          <div className='flex  flex-col gap-4 bg-white rounded-md'>
            <textarea value={userComment} onChange={(e) => setuserComment(e.target.value)} placeholder='Add a show CommentAt' className="resize-none w-6/3 px-3 pb-14 pt-2 my-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            <div className=' flex justify-between'>
              <img width={'40px'} src="./images/avatars/image-juliusomo.png" alt="" />
              <button onClick={() => {
                let allComments = JSON.parse(JSON.stringify(data.comments))
                let newComment = {
                  
                    "id": nanoid(),
                    "content": userComment,
                    "createdAt": "right now",
                    "score": 12,
                    "user": {
                      "image": { 
                        "png": "./images/avatars/image-juliusomo.png",
                        "webp": "./images/avatars/image-amyrobson.webp"
                      },
                      "username": "juliusomo"
                    },
                    "replies": []
      
                }
                let updatedComments = updateCommentById
                (allComments, comment.id, newComment)
                console.log(updatedComments);
                setData({...data, comments : updatedComments})
                setshowCommentAt(null)
              }} className='bg-blue-800 text-white px-5 rounded-md' >
                Reply
              </button>
            </div>
          </div>
        </div>
      }
      <ReplyList setData={setData} data={data} replies={comment.replies} currentUser={currentUser} showCommentAt={showCommentAt} setshowCommentAt={setshowCommentAt} />
    </>
  )
}


const ReplyList = ({  setData, data, currentUser, replies, setshowCommentAt, showCommentAt }) => {

  return (
    <div className='border-l-2 ps-4'>
      {
        replies?.map((reply) => {
          return (
            <Card setData={setData} key={reply.id} data={data} comment={reply} showCommentAt={showCommentAt} setshowCommentAt={setshowCommentAt} />
          )
        })
      }
    </div>
  )
}





