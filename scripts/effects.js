function countUntilFetch(fetchRequest, counterElement) {
    let count = 0;
    let target = Infinity;

    let counter = setInterval(() => {
        counterElement.textContent = count;
        count++;
        if (count > target) {
            clearInterval(counter);
        }
    }, 5);

    // fetch request
    fetch(fetchRequest).then(res => res.json()).then(data => {
        console.log(data);
        target = data.count;
    });
}

function cycleMessages(messageElement, messages) {
    let i = 0;
    let j = 0;

    let currentMessage = [];
    let isDeleting = false;
    let isEnd = false;

    function loop() {
        isEnd = false;
        messageElement.innerHTML = currentMessage.join('');

        if (i < messages.length) {
            if (!isDeleting && j <= messages[i].length) {
                currentMessage.push(messages[i][j]);
                j++;
                messageElement.innerHTML = currentMessage.join('');
            }

            if (isDeleting && j <= messages[i].length) {
                currentMessage.pop(messages[i][j]);
                j--;
                messageElement.innerHTML = currentMessage.join('');
            }

            if (j == messages[i].length) {
                isEnd = true;
                isDeleting = true;
            }

            if (isDeleting && j === 0) {
                currentMessage = [];
                isDeleting = false;
                i++;
                if (i === messages.length) {
                    i = 0;
                }
            }
        }
        const spedUp = Math.random() * (80 - 50) + 50;
        const normalSpeed = Math.random() * (300 - 200) + 50;
        const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
        setTimeout(loop, time);
    }
    loop();
}