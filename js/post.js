function loadCatName(){
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCatname(data));
}

// const displayCatname = (catName) =>{
//     const categories = catName.data.news_category;

//     for (const category of categories)
//     {
//         console.log(category.category_name)
//     }
// };

const displayCatname = (catName) =>{
    const categories = catName.data.news_category;

    const li_list  = document.getElementById('categoryName');
    li_list.innerHTML ="";

    for (const category of categories)
    {
        const cat_url = 'https://openapi.programming-hero.com/api/news/category';
        const li_items = document.createElement("li");

        li_items.innerHTML =`
        <li class="nav-item">
            <a class="nav-link" aria-current="page" onclick="loadCat('${category.category_id}')">${category.category_name}</a>
        </li>
        `;
        li_list.appendChild(li_items);
    }
};

function loadCat(cat_id){
    // Start Loader
    toggleSpinner(true);

    const cat_url = `https://openapi.programming-hero.com/api/news/category/${cat_id}`;
    // console.log(cat_url);
    fetch(cat_url)
        .then(response => response.json())
        .then(data => displayPosts(data));
}
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById("loader")
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const displayPosts = (catN) =>{
    // console.log(catN.data)
    const posts = catN.data;

    const li_list  = document.getElementById('displayCat');
    li_list.innerHTML ="";
    toggleSpinner(false);

    const noPost = document.getElementById('post-not-found')
    if(posts.length ===0){
        noPost.classList.remove('d-none');
    }
    else{
        noPost.classList.add('d-none');

        const post_count = document.createElement("div");
        post_count.innerHTML =`<div class="p-3 my-5 bg-info text-dark">${posts.length} posts found</div>`;
        li_list.appendChild(post_count);
    }
    for (const post of posts)
    {
        // console.log(post.title);
        const li_items = document.createElement("div");
        li_items.innerHTML =`
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${post.thumbnail_url}" class="img-fluid rounded-start thumbnail-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.details}</p>
                        <div class="row gy-2 gx-3 align-items-center justify-content-between">
                            <div class="col-auto">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${post.author.img}" class="img-fluid rounded-circle" style="width: 100px;" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <p class="card-text"><small class="text-muted">${post.author.name} </small></p>
                                        <p class="card-text"><small class="text-muted">${post.author.published_date}</small></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <p class="card-text"><small class="text-muted">View: ${post.total_view}</small></p>
                            </div>
                            <div class="col-auto">

                            <!-- Button trigger modal -->
                            <button type="button" onclick="postDetails('${post._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postDetails">
                                See Details
                            </button>
                            
                            <!-- Modal -->
                                <div class="modal fade" id="postDetails" tabindex="-1" aria-labelledby="postDetailsLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen-md-down">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <div>
                                                    <h6 class="modal-title" id="postDetailsLabel">Title</h6>
                                                    <p id="postAuthor" class="author">Author: </p>
                                                    <span id="view">View</span>
                                                </div>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Body
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- Modal End -->
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `;
        li_list.appendChild(li_items);
    }
    
};

const postDetails = (post_id) =>{
    const news_url = `https://openapi.programming-hero.com/api/news/${post_id}`;
    // console.log(news_url);
    fetch(news_url)
        .then(response => response.json())
        .then(data => newsDetails(data));
}

const newsDetails = (post) =>{
    console.log(post.data[0])
    const news  = document.getElementById('postDetails');
    const newsDetails = post.data[0];
    // post.innerHTML ="";
    toggleSpinner(false);
    const postLabel  = document.getElementById('postDetailsLabel');
    postLabel.innerHTML = newsDetails.title;

    const postAuthor  = document.getElementById('postAuthor');
    postAuthor.innerHTML = `Author: ${newsDetails.author.name ? newsDetails.author.name : `Author not Found`}`;

    const view  = document.getElementById('view');
    view.innerHTML = `Total View: ${newsDetails.total_view ? newsDetails.total_view : `No release Date Found`}`;
};

loadCatName();
