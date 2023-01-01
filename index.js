const btncart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnclose = document.querySelector("#cart-close");

btncart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});
btnclose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadfood);

function loadfood() {
  loadcontent();
}

function loadcontent() {
  let btnremove = document.querySelectorAll(".cart-remove");
  btnremove.forEach((btn) => {
    btn.addEventListener("click", removeitem);
  });

  let qtyelement = document.querySelectorAll(".cart-qty");
  qtyelement.forEach((input) => {
    input.addEventListener("change", changeqty);
  });
  let cartbtn = document.querySelectorAll(".add-cart");
  cartbtn.forEach((btn) => {
    btn.addEventListener("click", addcart);
  });
  const search = document.querySelector(".searchclass");
  const foodbox = document.querySelectorAll(".foodbox");

  search.addEventListener("keyup", (e) => {
    text = e.target.value.toLowerCase().trim();
    console.log(text);
    foodbox.forEach((food) => {
      title = food.querySelector(".food-title").innerHTML.toLowerCase().trim();

      console.log(title);
      if (title.includes(text)) {
        food.style.display = "block";
      } else {
        food.style.display = "none";
      }
    });
  });

  updatetotal();
}

function removeitem() {
  if (confirm("Are you sure to Remove")) {
    let title = this.parentElement.querySelector(".cart-food-title").innerHTML;

    itemlist = itemlist.filter((el) => el.title != title);
    this.parentElement.remove();
    loadcontent();
  }
}

function changeqty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadcontent();
}

let itemlist = [];

function addcart() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let price = food.querySelector(".food-price").innerHTML;
  let img = food.querySelector(".food-img").src;

  let product = { title, price, img };
  if (itemlist.find((el) => el.title == product.title)) {
    alert("Product Already Exit");
    return;
  } else {
    itemlist.push(product);
  }

  let newproduct = createcartelement(title, price, img);
  let element = document.createElement("div");
  element.innerHTML = newproduct;
  let basket = document.querySelector(".cart-content");
  basket.append(element);
  loadcontent();
}

function createcartelement(title, price, img) {
  return `
              <div class="cart-box">
                <img src="${img}" class="cart-img">
                <div class="detail-box">
                  <div class="cart-food-title">${title}</div>
                  <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                  </div>
                  <input type="number" value="1" class="cart-qty">
                </div>
                <i class="fa fa-trash cart-remove"> </i>
              </div>
`;
}

function updatetotal() {
  const cartitem = document.querySelectorAll(".cart-box");
  const totalval = document.querySelector(".total-price");
  let total = 0;
  cartitem.forEach((product) => {
    let element = product.querySelector(".cart-price");
    let price = parseFloat(element.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector(".cart-qty").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
  });
  totalval.innerHTML = "Rs." + total;
  const cartcount = document.querySelector(".cart-count");
  let count = itemlist.length;
  cartcount.innerHTML = count;
  if (count == 0) {
    cartcount.style.display = "none";
  } else {
    cartcount.style.display = "block";
  }
}
