for (let i=0 ; i<10; i++){


let get_product = localStorage.getItem('product_to_card')
let list = []
list.push(get_product)
console.log(list.length)
let div = document.querySelector(".lol")


document.body.innerHTML += get_product;

}
