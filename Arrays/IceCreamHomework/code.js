let products = [
    "Choo Choo Chocolate",
    "Icy Mint",
    "Cake Batter",
    "Bubblegum"];

let hasBubbleGum = [
    false,
    false,
    false,
    true];

/*
let i = 0;

function bubbleGum() {
    while (i < hasBubbleGum.length) {
        if (hasBubbleGum[i]) {
            document.write(products[i] +
                " contains bubble gum")
        }
        i = i + 1;
    }
}*/
function bubbleGum() {
    for (let i = 0; i < hasBubbleGum.length; i++) {
        if (hasBubbleGum[i]) {
            document.write(products[i] +
                " contains bubble gum")
        }
    }
}