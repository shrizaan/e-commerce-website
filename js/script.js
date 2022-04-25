// parallax

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  // Bagian Logo dan Nama Perusahaan
  $(".main img").css({
    transform: "translate(0px, " + wScroll / 8 + "%)",
  });

  $(".m-text h1").css({
    transform: "translate(0px, " + wScroll / 6 + "%)",
  });

  $(".m-text h2").css({
    transform: "translate(0px, " + wScroll / 5 + "%)",
  });

  $(".m-text a.m-btn").css({
    transform: "translate(0px, " + wScroll / 4 + "%)",
  });

  // bag trendy arrivals
  if (wScroll > $("#trendy-arrivals").offset().top - 300) {
    $(".p-box img.tas").each(function (i) {
      setTimeout(function () {
        $(".p-box img.tas").eq(i).addClass("muncul");
      }, 300 * (i + 1));
    });
  }

  // Watches showcase
  if (wScroll > $("#watches-showcase").offset().top - 300) {
    $(".p-box img.jam").each(function (i) {
      setTimeout(function () {
        $(".p-box img.jam").eq(i).addClass("muncul");
      }, 300 * i);
    });
  }

  // Our-brands
  if (wScroll > $("#our-brands").offset().top - 250) {
    $(".brand-img img.branding").each(function (i) {
      setTimeout(function () {
        $(".brand-img img.branding").eq(i).addClass("tampil");
      }, 300);
    });
  }

  // Our-teams
  if (wScroll > $("#our-teams").offset().top - 300) {
    $(".author img.myteam").each(function (i) {
      setTimeout(function () {
        $(".author img.myteam").eq(i).addClass("hadir");
      }, 300 * (i + 1));
    });
  }
});

// Untuk social media
$(window).on("load", function () {
  $(".social").addClass("keluar");
});

// script for shop page (dont touch)
const productBtn = document.querySelectorAll(".btn-product");
productBtn.forEach((item) =>
  item.addEventListener("click", async function () {
    const result = item.getAttribute("data-category").toString();
    document.querySelector(".text-heading").innerHTML =
      updateHeadingCard(result);
    try {
      if (result === "all products") {
        const items = await getProducts();
        updateUI(items);
      } else {
        const items = await getProducts();
        const filteredProductsByCategory = items.filter(
          (item) => item.category === result
        );
        updateUI(filteredProductsByCategory);
      }
    } catch (error) {
      console.log(error);
    }
  })
);

// event listener body on load
document.body.addEventListener("load", showCardsOnLoad());

function getProducts() {
  // return fetch("https://fakestoreapi.com/products")
  return fetch("../product.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error(response.Error);
      }
      return response;
    });
}

function updateUI(items) {
  let cards = "";
  items.forEach((item) => (cards += showCards(item)));
  document.getElementById("product-cards-container").innerHTML = cards;
}

function updateHeadingCard(result) {
  return `
  <span class="highlight fw-bolder">${result}</span>
  `;
}

function showCardsOnLoad() {
  const result = productBtn[0].getAttribute("data-category");
  document.querySelector(".text-heading").innerHTML = updateHeadingCard(result);
  getProducts(result).then((items) => updateUI(items));
}

function showCards(item) {
  return `
  <div class="col-lg-4 col-style d-flex">
            <div class="card m-3 shadow d-flex ">
              <div class="w-50 mx-auto d-flex flex-fill">
                <img
                  src="${item.image}"
                  class="mx-auto p-3 d-block img-fluid"
                  alt="..."
                />
              </div>
              <div class="card-body flex-fill">
                <small class="d-block text-end fw-lighter"><em>${item.category}</em></small>
                <h5
                  class="card-title text-start text-capitalize fs-6 my-2 fw-normal"
                >
                ${item.title}
                </h5>
                <!-- price -->
                <p class="text-black fs-6 mb-1 fw-bolder">$${item.price}</p>
                <p class="card-text fs-6">
                ${item.description}
                </p>
              </div>
            </div>
          </div>
  `;
}
