const posts = [
  { title: "Post One", body: 'This is post one'},
  { title: "Post Two", body: 'This is post two'},
  { title: "Post Three", body: 'This is post three'}
]

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      console.log(post.title)
    })

  }, 1000)
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post)
      console.log('post created', posts)
      const error = false;
    }, 2000)
  })
}

getPosts();
createPost({ title: 'Post 3', body: "this is post 3" }, getPosts)