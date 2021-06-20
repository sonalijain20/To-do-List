let addButton = document.getElementById("addButton");
let deleteAll = document.getElementById('deleteAllButton');
let searchBar = document.getElementById('searchBar');
displayTask();


//Function to add a task
addButton.addEventListener('click', function () {
    let addTask = document.getElementById('addTask');
    let warn = document.getElementById('warning');
    let tasks = localStorage.getItem("tasks");
    if ((addTask.value.trim()) != 0) {          //checks if input is empty
        if (tasks == null) {
            tasksObj = [];
        }
        else {
            tasksObj = JSON.parse(tasks);         //converts the string to array
        }
        let taskValue = addTask.value.trim();
        // console.log(taskValue)
        let myTask = {
            status: false,
            task: taskValue
        }
        // console.log(myTask)
        tasksObj.push(myTask);
        localStorage.setItem("tasks", JSON.stringify(tasksObj));
        addTask.value = "";                             //clears the teaxtarea to add new task
        warn.style.display = "none";
        deleteAll.style.display = "block";              //makes delete all button visible
        // console.log(tasksObj);
    }
    else {
        warn.style.display = "block";           //displays a warning if task is empty
    }
    displayTask();
})


//Fucntion to display tasks
function displayTask() {
    let tasks = localStorage.getItem("tasks");
    tasksObj = JSON.parse(tasks);         //converts the string to array
    // console.log(tasksObj);
    let html = "";
    tasksObj.forEach(function (element, index) {
        if(element.status == true){
            // taskCompleteValue = `<td class="completed" id="">${element.task}</td>`;
            statusVal = 'checked';
            style = 'checked';
        }else{
            // taskCompleteValue = `<td>${element.task}</td>`;
            statusVal = 'unchecked';
            style = "";
        }
        html += `<tr class="${style}">
                    <th>
                        
                        <div class="form-check">
                        <input onchange="completeTask(${index})" type="checkbox" value="" id="" ${statusVal}>
                        </div>
                        
                    </th>
                    <td class="note" id="${index}">${element.task}</td>
                    <td>
                        <button onclick="editTask(this.id)" id="${index}">
                            <i class="2x fa fa-edit" aria-hidden="true"></i>
                        </button>
                    </td>
                    <td>
                        <button onclick="deleteTask(this.id)" id="${index}">
                            <i class="2x fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`;
    });
    deleteAll.style.display = "block";          //makes delete all button visible
    let tasksElm = document.getElementById("tasksList");               //gets the table
    if (tasksObj.length != 0) {                         //checks if any task is added or not
        tasksElm.innerHTML = html;
    }
    else {
        tasksElm.innerHTML = `Nothing to show!`;
        deleteAll.style.display = "none";           //makes delete all button invisible
    }
}


//Function to delete all tasks
deleteAll.addEventListener('click', function () {
    let tasks = localStorage.getItem("tasks");
    tasksObj = JSON.parse(tasks);
    tasksObj = [];
    localStorage.setItem("tasks", JSON.stringify(tasksObj));
    // console.log(taskObject);
    deleteAll.style.display = "none";               //makes delete all button invisible
    displayTask();
})


//Function to delete Task
function deleteTask(index) {
    // console.log(index);
    let tasks = localStorage.getItem("tasks");
    tasksObj = JSON.parse(tasks);                           //converts the string to array
    tasksObj.splice(index, 1);                                  //deletes the task
    localStorage.setItem("tasks", JSON.stringify(tasksObj));            //updates the localstorage
    displayTask();
}


//Function for searching
searchBar.addEventListener('input', function(){
    let trList = document.querySelectorAll('tr');
    // console.log(trList)
    Array.from(trList).forEach(function(element){
        let searchedText = element.getElementsByTagName('td')[0].innerHTML;         //to get the first td of tr i.e. task name
        // let searchBarVal = searchBar.value;
        let re = new RegExp(searchBar.value, 'gi');
        console.log(re)
        if(searchedText.match(re)){
            element.style.display = "table-row";
        }
        else{
            element.style.display = "none";
        }
    })
})


//Function to edit a task
function editTask(index) {
    // console.log(index);
    element = document.getElementById(index);           //fetching the task information
    // console.log(element.innerHTML)
    let noTextAreas = document.getElementsByClassName('textarea').length;
    if (noTextAreas == 0) {
        let html = element.innerHTML;
        element.innerHTML = `<textarea class="textarea form-control" id="textarea" rows="2">${html}
                                </textarea>`;
    }
    let textarea = document.getElementById('textarea');

    textarea.addEventListener('blur', function () {
        let response = confirm("Do you want to save changes?")
        // console.log(response)
        if(response === true){
            let tasks = localStorage.getItem("tasks");
            tasksObj = JSON.parse(tasks); 
            if(textarea.value.trim() == ""){            //if the textarea is empty i.e. task information, then deletes that particular task
                tasksObj.splice(index, 1);  
            }
            else{
                tasksObj[index].task = textarea.value;      
            }
            localStorage.setItem("tasks", JSON.stringify(tasksObj));   
        }
        displayTask();
    })
}

//Function to mark and unmark a task complete
function completeTask(index){
    // console.log(index);
    let tasks = localStorage.getItem("tasks");
    tasksObj = JSON.parse(tasks); 
    currentStatus = tasksObj[index].status;
    // console.log(currentStatus);
    if(currentStatus === false)
    {
        tasksObj[index].status = true;
    }
    else{
        tasksObj[index].status = false;
    }
    // console.log(tasksObj[index].status)
    localStorage.setItem("tasks", JSON.stringify(tasksObj));  
    displayTask();
}