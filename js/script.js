const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  displayCategories(data.data);
};

const displayCategories = (categories) => {
  const tabsContainer = document.getElementById("tabs-container");
  categories.forEach((singleCategory) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a id=${singleCategory.category_id} onclick=tabsHandler(${singleCategory.category_id}) class="tab bg-[#25252526] rounded-md font-medium text-[#252525b3]">${singleCategory.category}</a>`;
    tabsContainer.appendChild(div);
  });
};

let newArray = [];

const tabsHandler = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  newArray = data.data;
  displayCards(newArray);
  document
    .querySelectorAll(".active")
    ?.forEach((element) => element.classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

const displayCards = (cards) => {
  const noData = document.getElementById("no-data");
  if (cards.length === 0) {
    noData.classList.remove("hidden");
  } else {
    noData.classList.add("hidden");
  }
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.textContent = "";
  cards.forEach((card) => {
    // Time Calculation
    const givenSeconds = card.others.posted_date;
    const hours = Math.floor(givenSeconds / 3600);
    const mins = Math.floor((givenSeconds % 3600) / 60);

    const newDiv = document.createElement("div");
    newDiv.classList = `card bg-base-100 shadow-xl relative`;
    newDiv.innerHTML = `
    <figure>
    <img class=h-[200px] src=${card.thumbnail} alt="Shoes" />
  </figure>
  <div class="py-4 px-2">
    <div class="flex items-start gap-3">
      <img
        class="w-10 rounded-full"
        src=${card.authors[0].profile_picture}
        alt="" />
      <div>
        <h2 class="font-bold">
          ${card.title}
        </h2>
        <div class="my-2 flex items-center gap-2">
          <p class="text-sm">${card.authors[0].profile_name}</p>
            ${
              card.authors[0].verified ? `<img src="../images/verify.png">` : ""
            }
        </div>
        <p class="text-sm">${card.others.views} Views</p>
      </div>
    </div>
  </div>
  <div class="w-[120px] absolute right-10 md:right-2 bottom-[40%]">
  ${
    card.others.posted_date
      ? `<p
  class="text-[10px] bg-[#171717] text-white p-2 rounded-xl text-center">${hours}hrs ${mins}mins ago
</p>`
      : ""
  }
    
  </div>
    `;
    cardsContainer.appendChild(newDiv);
  });
};

const compareViews = (a, b) => {
  const viewA = a.others.views.slice(0, -1);
  const viewB = b.others.views.slice(0, -1);
  return viewA - viewB;
};

const sortHandler = () => {
  console.log("ehh");
  const sorted = newArray.sort(compareViews);
  displayCards(sorted);
};

const blogHandler = () => {
  window.location.href = "blog.html";
};

loadCategories();
tabsHandler(1000);
