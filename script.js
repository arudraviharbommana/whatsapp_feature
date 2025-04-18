document.addEventListener("DOMContentLoaded", () => {
    loadMessages("user1");
    loadMessages("user2");
    setupEmojiPicker("emojiPickerUser1", "messageInputUser1");
    setupEmojiPicker("emojiPickerUser2", "messageInputUser2");
});

function toggleEmojiPicker(pickerId, button) {
    const picker = document.getElementById(pickerId);
    
    // Position the emoji picker near the button
    picker.style.display = picker.style.display === "flex" ? "none" : "flex";
    picker.style.position = "absolute";
    picker.style.left = `${button.offsetLeft}px`;
    picker.style.top = `${button.offsetTop + button.offsetHeight}px`;
}

function setupEmojiPicker(pickerId, inputId) {
    const emojis = [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
        "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
        "😋", "😜", "😝", "😛", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐",
        "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌",
        "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
        "😵", "🤯", "🤠", "🥳", "😎", "🤓", "🧐", "😕", "😟", "🙁",
        "☹️", "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰",
        "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫",
        "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩",
        "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "🎃", "😺", "😸",
        "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "💯", "💢",
        "💥", "💫", "💦", "💨", "🕳️", "💬", "🗨️", "🗯️", "💭", "💤",
        "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤏", "✌️", "🤞", "🤟",
        "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎",
        "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏",
        "💅", "🤳", "💪", "🦵", "🦶", "👂", "👃", "🧠", "🫀", "🫁",
        "🦷", "🦴", "👀", "👁️", "👅", "👄", "🫦", "👶", "🧒", "👦",
        "👧", "🧑", "👩", "👨", "🧔", "🧔‍♂️", "🧔‍♀️", "👱", "👱‍♂️", "👱‍♀️",
        "🧓", "👴", "👵", "🙍", "🙍‍♂️", "🙍‍♀️", "🙎", "🙎‍♂️", "🙎‍♀️", "🙅",
        "🙅‍♂️", "🙅‍♀️", "🙆", "🙆‍♂️", "🙆‍♀️", "💁", "💁‍♂️", "💁‍♀️", "🙋", "🙋‍♂️",
        "🙋‍♀️", "🧏", "🧏‍♂️", "🧏‍♀️", "🤦", "🤦‍♂️", "🤦‍♀️", "🤷", "🤷‍♂️", "🤷‍♀️",
        "🙇", "🙇‍♂️", "🙇‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫",
        "👨‍🏫", "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳",
        "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼",
        "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨",
        "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒",
        "👩‍🚒", "👮", "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", "💂", "💂‍♂️", "💂‍♀️",
        "👷", "👷‍♂️", "👷‍♀️", "🤴", "👸", "👳", "👳‍♂️", "👳‍♀️", "👲", "🧕",
        "🤵", "🤵‍♂️", "🤵‍♀️", "👰", "👰‍♂️", "👰‍♀️", "🤰", "🫄", "🫃", "🤱",
        "👩‍🍼", "👨‍🍼", "🧑‍🍼", "🧑‍🎄", "🎅", "🤶", "🧑‍🎄", "🦸", "🦸‍♂️", "🦸‍♀️",
        "🦹", "🦹‍♂️", "🦹‍♀️", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧛",
        "🧛‍♂️", "🧛‍♀️", "🧜", "🧜‍♂️", "🧜‍♀️", "🧝", "🧝‍♂️", "🧝‍♀️", "🧞", "🧞‍♂️",
        "🧞‍♀️", "🧟", "🧟‍♂️", "🧟‍♀️", "🦄", "🐶", "🐱", "🐭", "🐹", "🐰"
      ];
      
    const picker = document.getElementById(pickerId);
    picker.innerHTML = "";
    picker.style.display = "none";
    picker.style.position = "absolute";
    picker.style.background = "#fff";
    picker.style.border = "1px solid #ccc";
    picker.style.borderRadius = "5px";
    picker.style.padding = "10px";
    picker.style.width = "200px";
    picker.style.flexWrap = "wrap";
    picker.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
    
    emojis.forEach(emoji => {
        let span = document.createElement("span");
        span.innerText = emoji;
        span.style.fontSize = "1.5rem";
        span.style.cursor = "pointer";
        span.style.padding = "5px";
        span.style.display = "inline-block";
        span.style.transition = "background 0.2s";
        
        span.onclick = () => {
            document.getElementById(inputId).value += emoji;
            picker.style.display = "none"; // Hide picker after selecting emoji
        };

        span.onmouseover = () => (span.style.background = "#ddd");
        span.onmouseout = () => (span.style.background = "transparent");

        picker.appendChild(span);
    });
}

function handleEnter(event, user) {
    if (event.key === "Enter") {
        sendMessage(user);
    }
}

function sendMessage(user) {
    const input = document.getElementById(`messageInput${capitalize(user)}`);
    const messageText = input.value.trim();
    if (messageText === "") return;

    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const messageObj = {
        text: messageText,
        time: timeStamp,
        sender: user
    };

    let messages = JSON.parse(localStorage.getItem(`messages_${user}`)) || [];
    messages.push(messageObj);
    localStorage.setItem(`messages_${user}`, JSON.stringify(messages));

    displayMessage(user, messageObj);
    input.value = "";

    // Add received message to the other chat box
    const otherUser = user === "user1" ? "user2" : "user1";
    const receivedMessage = { ...messageObj, sender: user };
    let otherMessages = JSON.parse(localStorage.getItem(`messages_${otherUser}`)) || [];
    otherMessages.push(receivedMessage);
    localStorage.setItem(`messages_${otherUser}`, JSON.stringify(otherMessages));
    displayMessage(otherUser, receivedMessage);
}

function displayMessage(user, messageObj) {
    const chat = document.getElementById(`chat${capitalize(user)}`);
    const messageDiv = document.createElement("div");

    messageDiv.className = `message ${messageObj.sender === user ? "sent" : "received"}`;
    
    messageDiv.innerHTML = `
        <span class="text">${messageObj.text}</span> 
        <span class="time">${messageObj.time}</span>
    `;

    messageDiv.addEventListener("dblclick", () => confirmDeleteSingleMessage(user, messageObj));
    chat.appendChild(messageDiv);
}

function loadMessages(user) {
    const chat = document.getElementById(`chat${capitalize(user)}`);
    chat.innerHTML = "";
    const messages = JSON.parse(localStorage.getItem(`messages_${user}`)) || [];
    messages.forEach(msg => displayMessage(user, msg));
}

function confirmDeleteSingleMessage(user, messageObj) {
    const confirmDelete = confirm("Do you want to delete this message?");
    if (!confirmDelete) return;
    
    let messages = JSON.parse(localStorage.getItem(`messages_${user}`)) || [];
    let newMessages = messages.filter(msg => !(msg.text === messageObj.text && msg.time === messageObj.time));
    
    localStorage.setItem(`messages_${user}`, JSON.stringify(newMessages));
    loadMessages(user);
}

// Function to delete messages with deselection feature
function deleteMessage(user) {
    const timeToDeleteFrom = prompt("Enter the time from when you want to delete messages (e.g., 12:50 PM)");
    if (!timeToDeleteFrom) return;

    let messages = JSON.parse(localStorage.getItem(`messages_${user}`)) || [];
    const matchingMessages = messages.filter(msg => msg.time === timeToDeleteFrom);

    if (matchingMessages.length === 0) {
        alert("No messages found at this time.");
        return;
    }

    let selectionText = "Select the message index to delete from:\n";
    matchingMessages.forEach((msg, index) => {
        selectionText += `${index + 1}) ${msg.text}\n`;
    });

    const selectedIndex = parseInt(prompt(selectionText)) - 1;
    if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= matchingMessages.length) {
        alert("Invalid selection.");
        return;
    }

    const selectedMessage = matchingMessages[selectedIndex];
    const deleteIndex = messages.findIndex(msg => msg.text === selectedMessage.text && msg.time === selectedMessage.time);

    if (deleteIndex !== -1) {
        const deleteOption = prompt("Choose an option: \n1) Delete for both users \n2) Delete for only selected user \n3) Cancel");
        if (deleteOption === "3") return;

        // Ask if the user wants to deselect messages (for self only)
        let deselectedIndexes = [];
        if (confirm("Do you want to deselect any messages?")) {
            let allMessagesText = "Messages from the selected time onward:\n";
            for (let i = deleteIndex; i < messages.length; i++) {
                allMessagesText += `${i - deleteIndex + 1}) ${messages[i].text}\n`;
            }

            let deselectInput = prompt(`${allMessagesText}\nEnter the message indexes to keep (comma-separated, e.g., 2,4):`);
            if (deselectInput) {
                deselectedIndexes = deselectInput.split(",").map(num => parseInt(num.trim()) - 1);
            }
        }

        // Apply deselection for self
        messages = messages.filter((msg, index) => {
            return index < deleteIndex || deselectedIndexes.includes(index - deleteIndex);
        });

        localStorage.setItem(`messages_${user}`, JSON.stringify(messages));
        loadMessages(user);
        
        // If deleting for both users, apply the same deselection logic
        if (deleteOption === "1") {
            const otherUser = user === "user1" ? "user2" : "user1";
            let otherMessages = JSON.parse(localStorage.getItem(`messages_${otherUser}`)) || [];
            const otherDeleteIndex = otherMessages.findIndex(msg => msg.text === selectedMessage.text && msg.time === selectedMessage.time);

            if (otherDeleteIndex !== -1) {
                // Apply the same deselection logic for the other user
                otherMessages = otherMessages.filter((msg, index) => {
                    return index < otherDeleteIndex || deselectedIndexes.includes(index - otherDeleteIndex);
                });

                localStorage.setItem(`messages_${otherUser}`, JSON.stringify(otherMessages));
                loadMessages(otherUser);
            }
        }
    }
}


function clearChat(user) {
    const confirmClear = confirm("Do you want to clear the whole chat?");
    if (!confirmClear) return;
    
    localStorage.removeItem(`messages_${user}`);
    loadMessages(user);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}






