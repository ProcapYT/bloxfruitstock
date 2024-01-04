let bloxStock = null;
let previousFruitsJson = null;
let currentCountdown = null;

const $ = (element) => {
    return document.querySelector(element);
};

const stockContainer = $('#stock');
const countdownContainer = $('#countdownContainer');

const fetchDataAndRender = () => {
    fetch('https://blox-fruits-api.onrender.com/api/bloxfruits/stock')
        .then(response => response.json())
        .then((data) => {
            try {
                const cleanFruitsJson = JSON.stringify(data.stock, (key, value) => key !== 'countdown' ? value : undefined);

                if (cleanFruitsJson !== previousFruitsJson) {
                    previousFruitsJson = cleanFruitsJson;

                    bloxStock = data;
                    updateFruits();
                }

                const localCountdown = data.stock.countdown;

                if (localCountdown !== currentCountdown) {
                  currentCountdown = localCountdown;
                  updateCountdown(currentCountdown);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(fetchDataAndRender, 1000);
            }
        });
};

const updateFruits = () => {
    stockContainer.textContent = '';

    for (const [key, value] of Object.entries(bloxStock.stock)) {
        if (key !== 'countdown') {
            const fruitContainer = document.createElement('div');
            const fruitImage = document.createElement('img');
            const fruitName = document.createElement('h2');
            const fruitPrices = document.createElement('div');
            const fruitPrice = document.createElement('p');
            const fruitRobux = document.createElement('p');
            fruitPrice.classList.add('price');
            fruitPrice.textContent = '$' + value.price;
            fruitRobux.classList.add('robux');
            fruitRobux.textContent = 'R$' + value.robux;
            fruitName.classList.add('name');
            fruitName.textContent = value.name;
            fruitImage.src = value.imageURL;
            fruitContainer.classList.add('fruitContainer');
            fruitImage.classList.add('fruitImage');
            fruitContainer.appendChild(fruitImage);
            fruitContainer.appendChild(fruitName);
            fruitPrices.appendChild(fruitPrice);
            fruitPrices.appendChild(fruitRobux);
            fruitContainer.appendChild(fruitPrices);

            stockContainer.appendChild(fruitContainer);
        }
    }

    fetch('https://blox-fruits-api.onrender.com/api/bloxfruits/')
        .then(response => response.json())
        .then((data) => {
            const keys = Object.keys(data)

            for (let i = 1; i >= 0; i--) {
                const key = keys[i]
                const value = data[keys[i]]

                const fruitContainer = document.createElement('div');
                const fruitImage = document.createElement('img');
                const fruitName = document.createElement('h2');
                const fruitPrices = document.createElement('div');
                const fruitPrice = document.createElement('p');
                const fruitRobux = document.createElement('p');
                fruitPrice.classList.add('price');
                fruitPrice.textContent = '$' + value.price;
                fruitRobux.classList.add('robux');
                fruitRobux.textContent = 'R$' + value.robux;
                fruitName.classList.add('name');
                fruitName.textContent = key.toUpperCase();
                fruitImage.src = value.imageURL;
                fruitContainer.classList.add('fruitContainer');
                fruitImage.classList.add('fruitImage');
                fruitContainer.appendChild(fruitImage);
                fruitContainer.appendChild(fruitName);
                fruitPrices.appendChild(fruitPrice);
                fruitPrices.appendChild(fruitRobux);
                fruitContainer.appendChild(fruitPrices);
    
                stockContainer.appendChild(fruitContainer);

                if (i === 0) {
                    break
                }
            }


        })
};

const updateCountdown = (countdown) => {
    countdownContainer.textContent = '';

    const countdownParagraph = document.createElement('h1');
    const countdownBoldElement = document.createElement('b');

    countdownParagraph.style.fontWeight = 'normal';
    countdownContainer.style.margin = '20px';

    countdownBoldElement.textContent = countdown;
    countdownParagraph.appendChild(document.createTextNode('Next stock in: '));
    countdownParagraph.appendChild(countdownBoldElement);

    countdownContainer.appendChild(countdownParagraph);
};

fetchDataAndRender();
