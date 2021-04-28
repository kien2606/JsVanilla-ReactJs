const search = document.querySelector(".filter");
const postsContainer = document.querySelector(".posts-container");
const loader = document.querySelector(".loader");
let limit = 6;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

async function showPosts() {
  let data = await getPosts();
  return data.map((item) => {
    return `  
            <div class="card-body">
                <p class="text-each-item content-title">${item.title}</p>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="text-each-item content-body">${item.body}</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        `;
  });
}
function showDatas(value) {
  let data = value ?  value : showPosts();
  if(value){
    data.forEach((item) => {
      const postEl = document.createElement("div");
      postEl.classList.add("card", "col-md-3", "card-control");
      postEl.innerHTML = item;
      postsContainer.appendChild(postEl);
  })}
  else{
  data
    .then((data) => {
      // const value = data.join("");
      // console.log(data);
      data.forEach((item) => {
        const postEl = document.createElement("div");
        postEl.classList.add("card", "col-md-3", "card-control");
        postEl.innerHTML = item;
        postsContainer.appendChild(postEl);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
showDatas();

function loadingData() {
  const timeLoading = setTimeout(() => {
    loader.classList.add("show");
    const showNext = setTimeout(() => {
      loader.classList.remove("show");
      page++;
      showDatas();
    }, 500);
  }, 1000);
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadingData();
  }
});
//searching//////////
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.card-control');

  posts.forEach(post => {
    const title = post.querySelector('.content-title').innerText.toUpperCase();
    const body = post.querySelector('.content-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = '';
    } else {
      post.style.display = 'none';
    }
  });
}

search.addEventListener('input', filterPosts);