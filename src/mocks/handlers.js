import {rest} from 'msw';
export const handlers=[
    rest.get('',(req,res,ctx)=>{
        return res(
            ctx.json([
                {
                    "body": "sdfsfdsfsdfsadf",
                    "postId": 5,
                    "user": {
                      "id": 1,
                      "firstName": "Navneet",
                      "lastName": "Kaur",
                      "userName": "nav11",
                      "email": "navneet@gmail.com",
                      "password": "Home@216",
                      "about": "I am a Software Engineer"
                    },
                    "creationDate": "2022-11-25T12:10:44.474Z",
                    "id": 1
                  },
                  {
                    "body": "dfsdfsadfsdf",
                    "postId": 5,
                    "user": {
                      "id": 1,
                      "firstName": "Navneet",
                      "lastName": "Kaur",
                      "userName": "nav11",
                      "email": "navneet@gmail.com",
                      "password": "Home@216",
                      "about": "I am a Software Engineer"
                    },
                    "creationDate": "2022-11-25T12:35:03.011Z",
                    "id": 2
                  },
                  {
                    "body": "new comment",
                    "postId": 5,
                    "user": {
                      "id": 1,
                      "firstName": "Navneet",
                      "lastName": "Kaur",
                      "userName": "nav11",
                      "email": "navneet@gmail.com",
                      "password": "Home@216",
                      "about": "I am a Software Engineer"
                    },
                    "creationDate": "2022-11-25T12:35:14.740Z",
                    "id": 3
                  },
                  {
                    "body": "My edited comment122",
                    "postId": 5,
                    "user": {
                      "id": 1,
                      "firstName": "Navneet",
                      "lastName": "Kaur",
                      "userName": "nav11",
                      "email": "navneet@gmail.com",
                      "password": "Home@216",
                      "about": "I am a Software Engineer"
                    },
                    "creationDate": "2022-11-25T12:43:28.642Z",
                    "id": 4
                  }
            ])
        )
    })
]