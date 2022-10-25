import { configureStore } from '@reduxjs/toolkit'
import CollapsedReducer from './modules/collapsed'




const store = configureStore({
  reducer: {
    CollapsedReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store