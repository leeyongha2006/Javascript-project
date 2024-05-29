const inputField = document.querySelector(".input-field textarea"),
todoLists = document.querySelector(".todoLists"),
pendingNum = document.querySelector(".pending-num"),
clearButton = document.querySelector(".clear-button");

function allTasks() {
    let tasks = document.querySelectorAll(".pending");

    pendingNum.textContent = tasks.length == 0 ? "no" : tasks.length;

    let allLists = document.querySelectorAll(".list");
    if(allLists.length > 0) {
        todoLists.style.marginTop = "20px"
        clearButton.style.pointerEvents = "auto";
        return;
    }
    todoLists.style.marginTop = "0px"
    clearButton.style.pointerEvents = "none";
}
inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();

    if(e.key == "Enter" && inputVal.length > 0) {
        let liTag = `<li class = "list pending" onclick="handleStatus(this)">
        <input type = "checkbox"/>
        <span class = "task">${inputVal}</span>
        <i class = "uil-trash" onclick="deleteTask(this)"></i>
        </li>`;
    }
})