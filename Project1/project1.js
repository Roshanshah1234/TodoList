var MYTODO = {};


MYTODO.ButtonAdd = function () {
    document.querySelector('#btnAdd').addEventListener('click', MYTODO.addItems);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            MYTODO.addItems();
        }
    });
}
MYTODO.addItems = function () {
    var textValue, newListItem;
    textValue = document.getElementById("text").value;
    document.getElementById("text").value = "";
    newListItem = document.querySelector(".display-none").cloneNode(true);
    newListItem.querySelector(`[data-name="para"]`).textContent = textValue;
    newListItem.classList.remove("display-none");
    newListItem.classList.add("list-item");

    if (textValue.length < 1) {
        window.alert('This field cant be left empty')
    }
   else {
        document.getElementById("list-container").appendChild(newListItem);
    }

    MYTODO.Save();

}
MYTODO.ButtonDelete = function () {
    document.querySelector('#btnRemove').addEventListener('click', function deleteItem(event) {
        var firstItem = document.getElementById("list-container").firstElementChild;
        var temp;
        while (firstItem) {
            temp = firstItem.nextElementSibling;
            if (firstItem.querySelector(`[data-name="check-box"]`).checked) {
                firstItem.remove();
            }
            firstItem = temp;
        }

    MYTODO.Save();
    });
    document.getElementById('list-container').addEventListener('click' , function deleteIcon(){
        if(event.target.id === "close-icon") {

            event.target.parentElement.remove();
        }

    MYTODO.Save();
    });

}
MYTODO.selectAll = function ()
{
     document.querySelector('#btnSelectALL').addEventListener('click',function selectDeselect(){
         var select_deselect, firstItem;
         firstItem = document.getElementById("list-container").firstElementChild;
        if(firstItem.querySelector(`[data-name="check-box"]`).checked) {
            select_deselect = false;
        } else {
            select_deselect = true;
        }
        while (firstItem) {
            firstItem.querySelector(`[data-name="check-box"]`).checked = select_deselect;
            firstItem = firstItem.nextElementSibling;
        }

    MYTODO.Save();
    });
}
MYTODO.Save = function() {
    var listContainer = document.getElementById("list-container").innerHTML;
    localStorage.setItem("listContainerInnerHtml", listContainer);
};
MYTODO.Reload  = function () {
    var listContainer = document.getElementById("list-container");
    listContainer.innerHTML = localStorage.getItem("listContainerInnerHtml");
};
MYTODO.Reload();
MYTODO.ButtonAdd();
MYTODO.ButtonDelete();
MYTODO.selectAll();