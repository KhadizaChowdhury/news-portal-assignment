function loadCatName(){
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(response => response.json())
        .then(data => displayCatname(data))
        .catch(error => console.error(error));
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
            <a class="nav-link" aria-current="page" href="/index.html" onclick="loadCat('${category.category_id}');return false;">${category.category_name}</a>
        </li>
        `;
        li_list.appendChild(li_items);
    }
};
loadCatName();