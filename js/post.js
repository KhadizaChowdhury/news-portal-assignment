function loadCat(cat_id){
    // Start Loader
    toggleSpinner(true);

    const cat_url = `https://openapi.programming-hero.com/api/news/category/${cat_id}`;
    // console.log(cat_url);
    fetch(cat_url)
        .then(response => response.json())
        .then(data => displayPosts(data))
        .catch(error => console.error(error));
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
    // const showAllPosts = document.getElementById('show_all');
    // if(posts.length > 5){
    //     const postShow = posts.slice(0,5);
    //     showAllPosts.classList.remove('d-none');
    // }
    // else{
    //     const postShow = posts;
    //     showAllPosts.classList.add('d-none');
    // }

    const noPost = document.getElementById('post-not-found');
    // if    if(posts.length < 0){}
    if(posts.length === 0){
        noPost.classList.remove('d-none');
    }
    else{
        noPost.classList.add('d-none');

        const post_count = document.createElement("div");
        post_count.innerHTML =`<div class="p-3 my-5 bg-white fw-semibold text-dark">${posts.length} posts found</div>`;
        li_list.appendChild(post_count);
    }
    // const postShow = posts.slice(0,5);

    for (const post of posts)
    {
        // console.log(post.title);
        const li_items = document.createElement("div");
        li_items.innerHTML =`
            <div class="card mb-4 p-3 border border-0">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${post.thumbnail_url}" class="me-3 rounded thumbnail-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.details.length > 500 ? post.details.slice(0, 500) + ' ...' : post.details}</p>
                        <div class="row gy-2 gx-3 align-items-center justify-content-between">
                            <div class="col-auto others-info">
                                <div class="row g-0 align-items-center">
                                    <div class="col-md-4 pe-2">
                                        <img src="${post.author.img}" class="img-fluid rounded-circle author-img" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <p class="card-text m-0"><small class="author-mame">${post.author.name} </small></p>
                                        <p class="card-text"><small class="text-muted">${post.author.published_date}</small></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <p class="card-text"><i class="fa-regular fa-eye"></i><small class="view"> ${post.total_view}</small></p>
                            </div>
                            <div class="col-auto">

                            <!-- Button trigger modal -->
                            <button type="button" onclick="postDetails('${post._id}')" class="btn btn-primary see-details" data-bs-toggle="modal" data-bs-target="#postDetails">
                                See Details
                            </button>
                            
                            <!-- Modal -->
                                <div class="modal fade" id="postDetails" tabindex="-1" aria-labelledby="postDetailsLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-fullscreen-md-down">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <p class="modal-title" id="postDetailsLabel">Title</p>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="author-details text-bg-light">
                                                <p id="postAuthor" class="author">Author: </p>
                                                <span id="view">View</span>
                                            </div>
                                            <div id="modal-body" class="modal-body">
                                                <p></p>
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
        .then(data => newsDetails(data))
        .catch(error => console.error(error));
}

const newsDetails = (post) =>{
    console.log(post.data[0])
    const news  = document.getElementById('postDetails');
    const newsDetails = post.data[0];
    // post.innerHTML ="";
    toggleSpinner(false);
    const postLabel  = document.getElementById('postDetailsLabel');
    postLabel.innerHTML = `<h6>${newsDetails.title}</h6>
    <p>Published: ${newsDetails.author.published_date ? newsDetails.author.published_date : 'No published Date Found </p>'}
    `;

    const postAuthor  = document.getElementById('postAuthor');
    postAuthor.innerHTML = `Author: ${newsDetails.author.name ? newsDetails.author.name : 'Author not Found'}`;

    const view  = document.getElementById('view');
    view.innerHTML = `Total View: ${newsDetails.total_view ? newsDetails.total_view : 'No release Date Found'}`;

    const body  = document.getElementById('modal-body');
    body.innerHTML = `Others_info:
        <br><p class="p-2 my-1 bg-info text-dark">Is_trending: ${newsDetails.others_info ? newsDetails.others_info.is_trending
            : 'Not Found</p>'}
            <div class="m-3 ms-0">
            Details: ${newsDetails.details ? newsDetails.details
                : 'Not Found'}
            </div>`;
};
loadCat('08');