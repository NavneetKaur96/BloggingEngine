import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { commentsReducer } from "./reducer/comments.reducer";
import { postsReducer} from "./reducer/posts.reducer";
import { usersReducer } from "./reducer/users.reducer";



const rootReducer = combineReducers({
  
    posts: postsReducer,
    users:usersReducer,
    comments:commentsReducer
});

const store = createStore(
    rootReducer, {}, composeWithDevTools(applyMiddleware(thunk))
)


export default store;