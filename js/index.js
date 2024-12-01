// Start Golbal Variable 
var inputSiteName = document.getElementById("bookmarkName");
var inputSiteURL = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-error");
var bookmarks = [];


if (localStorage.getItem("bookMarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookMarksList"));
    for (var x = 0; x < bookmarks.length; x++) {
      displayBookmark(x);
    }
}

//Function to Display Data
function displayBookmark(indexOfWebsite) {
    var userUrl = bookmarks[indexOfWebsite].sitUrl;
    var httpsRegex = /^https?:\/\//g;
    if(httpsRegex.test(userUrl)) {
        validURL = userUrl;
        fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
    } else {
        var fixedURL = userUrl;
        validURL = `https://${userUrl}`;
    }

    var cartona = `
            <tr>
            <td>${indexOfWebsite + 1}</td>
            <td>${bookmarks[indexOfWebsite].siteName}</td>              
            <td>
            <button class="btn btn-visit" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
            </td>
            <td>
            <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>
    `;
    tableContent.innerHTML += cartona;

    deleteBtns = document.querySelectorAll(".btn-delete");
    if(deleteBtns) {
        for(var i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function(e) {
                deleteElement(e);
            })
        }
    }

    visitBtns = document.querySelectorAll(".btn-visit");
    if(visitBtns) {
        for(var i = 0; i < visitBtns.length; i++) {
            visitBtns[i].addEventListener("click", function (e) {
                visitWebsite(e);
            })
        }
    }
}

//Function To Clear Input
function clearInput() {
    inputSiteName.value = "";
    inputSiteURL.value = "";
}

//Function To Capitalizme
function capitalize (str) {
    var strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

// Function to Add Element
submitBtn.addEventListener('click', function() {

    if(
        inputSiteName.classList.contains("is-valid") &&
        inputSiteURL.classList.contains("is-valid")
    ) {

        var bookmark = {
            siteName: capitalize(inputSiteName.value),
            sitUrl: inputSiteURL.value,
    
        };

        bookmarks.push(bookmark);
        localStorage.setItem("bookMarksList", JSON.stringify(bookmarks));

        displayBookmark(bookmarks.length - 1);
        clearInput();

        inputSiteName.classList.remove("is-valid");
        inputSiteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove('d-none');
    }
    

})

//function Delet Element
function deleteElement(e) {
    tableContent.innerHTML = "";
    var deletIndex = e.target.dataset.index;
    bookmarks.splice(deletIndex, 1);
    for(var j = 0; j < bookmarks.length; j++) {
        displayBookmark(j);
    }
    localStorage.setItem("bookMarksList", JSON.stringify(bookmarks));
}

//Function To visit Website
function visitWebsite (e) {
    var index = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if(httpsRegex.test(bookmarks[index].sitUrl)) {
        open(bookmarks[index].sitUrl);
    } else {
        open(`https://${bookmarks[index].sitUrl}`);
    }
}

// Making a Validation For Data Input
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

inputSiteName.addEventListener('input', function(){
    validate(inputSiteName, nameRegex);
})

inputSiteURL.addEventListener('input', function(){
    validate(inputSiteURL, urlRegex);
})

function validate(element, regex) {
    var testRegex = regex;
    if(testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

//Function Close Box Error
function closeModal() {
    boxModal.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);