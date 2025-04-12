const accessKey='j5TvGqTyJAdyRALblIxXqt9X7JPtj1BNFiCbwwpHeo4'

const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search-box')
const searchResult = document.getElementById('search-result')
const showMoreBtn = document.getElementById('show-more-btn')

let keyword = ""
let page = 1

async function searchImages() {
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data);

    if(page === 1){
        searchResult.innerHTML = ""
    }
    const results = data.results

    results.map((result) =>{
        const image = document.createElement("img")
        image.src=result.urls.small
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"

        imageLink.appendChild(image)
        searchResult.appendChild(imageLink)
        
        /*
            We get this after the operation :

            <div id="searchResult">
                <a href="https://example.com/full-image" target="_blank">
                    <img src="https://example.com/image.jpg">
                </a>
            </div>
            
            This ensures:
            1. Images are displayed inside #searchResult.
            2. Clicking an image opens the full image page in a new tab.
        */
    })
    showMoreBtn.style.display = 'block'
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    page = 1
    searchImages()
})

showMoreBtn.addEventListener("click", ()=>{
    page++
    searchImages()
})