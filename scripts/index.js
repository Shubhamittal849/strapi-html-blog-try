function fetchArticles() {
    const articlesReq = new Request('http://localhost:1337/articles');

    fetch(articlesReq)
        .then(response => response.json())
        .then(articles => {
            let articleList = document.getElementById("article-list");

            articles.forEach(article => {
                articleList.appendChild(createArticleCard(article));
            });
        });
}

function createArticleCard(article) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.onclick = () => {
        window.location.replace(`/pages/article.html?id=${article.id}`)
    };

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img");
    cardImage.src = `http://localhost:1337${article.cover_image.formats.thumbnail.url}`;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let articleTitle = document.createElement("p");
    articleTitle.classList.add("card-title");
    articleTitle.innerHTML = article.title;

    let articleDescription = document.createElement("div");
    articleDescription.classList.add("card-description");
    articleDescription.innerHTML = article.description;

    let articleTags = document.createElement("div");
    articleTags.classList.add("article-tag-cont");

    let tag;

    article.tags.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            tag.classList.add("article-tag");
            tag.innerHTML = tg.name;

            articleTags.appendChild(tag);
        }
    });

    cardBody.append(articleTitle, articleDescription, articleTags);

    card.append(cardImage, cardBody);

    return card;
}

fetchArticles();