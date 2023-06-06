 //  var num = +prompt("what is your fav name?", 5);
  // if (num % 2 === 0) {
 //   console.log("This is an even number");
 //else{
  //  console.log("This is an odd");
 // var num = +prompt("what is your fav number?");
 //if(num % 2 === 0 && num % 4 === 0){
  //  console.log("Both 2 & 4");
// }else if(num % 2 === 0 ){ 
 //  console.log("Only 3");
// }else if (num % 4 === 0) {
 //  console.log("Only 4");
// }else if(num % 3 === 0){
 //  console.log("This is an odd");
// }
const budget_form = document.getElementById("budget_form");
const total_bdg = document.getElementById("total_bdg");
const from_date = document.getElementById("from_date");
const to_date = document.getElementById("to_date");


let cat_icon_class;
let cat_icon_color;

let expense = 0;
let bdg_value;
let balance;
let edit_id = null;
let bdg_var;

// Function to format the date 
function formatDate(gDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dt = new Date(gDate);
    let setDate = `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`
    return setDate;
}

// Function to show warning on empty input
function warning() {
    document.getElementById("warning").classList.add("warning_active");
    setTimeout(() => {
        document.getElementById("warning").classList.remove("warning_active");
    }, 3000);
}

// Function to show budget form
const setNewBudget = () => {
    budget_form.classList.add("budget_form_display");
}

// Function to close budget form and set input field as an empty
function closeBudgetForm() {
    budget_form.classList.remove("budget_form_display");
    total_bdg.value = "";
    from_date.value = "";
    to_date.value = "";
}

// Function to set and update "Expense" and "Balance" value
const setBdg = () => {
    balance = bdg_var - expense;
    document.getElementById("bdg_exp_value").innerHTML = `${expense}`;
    document.getElementById("bdg_bln_value").innerHTML = `${balance}`;

    // if expenses increase more than budget show messange in red
    document.getElementById("over_balace").style.display = "none";
    document.getElementById("bdg_bln_value").style.color = "white";
    if (expense > bdg_value) {
        document.getElementById("over_balace").style.display = "block";
        document.getElementById("bdg_bln_value").style.color = "red";
    }
}

// Function to get value from budget form and display in budget section
const setBdgValues = () => {
    if (total_bdg.value && from_date.value && to_date.value) {

        bdg_var = total_bdg.value;
        bdg_value = total_bdg.value;

        document.getElementById("bdg_value").innerHTML = `${bdg_value}`;
        document.getElementById("strt_date").innerHTML = formatDate(from_date.value);
        document.getElementById("end_date").innerHTML = formatDate(to_date.value);

        document.getElementById("bdg_section_display").classList.remove("bdg_section_display");
        document.getElementById("if_bdg_is_notSet").style.display = 'none';

        closeBudgetForm();
        setBdg();
    } else {
        warning();
    }
}

let btn_vale = document.getElementById("exp_btn_add").value;

// Function to display expense form
const expAddBtn = () => {
    document.getElementById("exp_form_container").classList.remove("exp_form_active");
    document.getElementById("exp_btn_add").value = btn_vale;
}

// Function to close expense form and set input field as an empty
function expCancelBtn() {
    document.getElementById("exp_form_container").classList.add("exp_form_active");

    cate_drop.value = "";
    exp_amount.value = "";
    exp_date.value = "";
    exp_desc.value = "";
}

// targeting input field in expense form
let cate_drop = document.getElementById("cate_drop");
let exp_amount = document.getElementById("exp_amount");
let exp_date = document.getElementById("exp_date");
let exp_desc = document.getElementById("exp_desc");

// creating empty array object to store expenses
let exp_list = [];

// Function to get value from Expense form and display in expense list
function expSavebtn() {
    if (cate_drop.value && exp_amount.value && exp_date.value && exp_desc.value) {

        // adding value in array as an object
        if (edit_id == null) {
            exp_list.push({ cate: cate_drop.value, amount: parseInt(exp_amount.value), date: exp_date.value, desc: exp_desc.value });
        } else {
            exp_list.splice(edit_id, 1, { cate: cate_drop.value, amount: parseInt(exp_amount.value), date: exp_date.value, desc: exp_desc.value });
            edit_id = null;
        }
        displayExpenses();
        expCancelBtn();
    } else {
        warning();
    }
}

// Function to display expense list
function displayExpenses() {
    let st = '';
    expense = 0;

    if (exp_list.length == 0) {
        document.getElementById("exp_list").innerHTML = st;
    } else {
        exp_list.map((list, i) => {


            // to display icons on the bases of category
            switch (list.cate) {
                case "Food":
                    cat_icon_class = "fa-solid fa-utensils";
                    cat_icon_color = "#E57C23"
                    break;

                case "Transport":
                    cat_icon_class = "fa-solid fa-van-shuttle";
                    cat_icon_color = "#19A7CE"
                    break;

                case "Education":
                    cat_icon_class = "fa-solid fa-book-open-reader";
                    cat_icon_color = "#643A6B"
                    break;

                case "Rent":
                    cat_icon_class = "fa-sharp fa-solid fa-house";
                    cat_icon_color = "#537188"
                    break;

                case "Shopping":
                    cat_icon_class = "fa-sharp fa-solid fa-cart-shopping";
                    cat_icon_color = "#393646"
                    break;

                case "Health":
                    cat_icon_class = "fa-solid fa-square-plus";
                    cat_icon_color = "#D21312"
                    break;

                case "Bills":
                    cat_icon_class = "fa-solid fa-file-invoice";
                    cat_icon_color = "#1B9C85"
                    break;

                case "Entertainment":
                    cat_icon_class = "fa-solid fa-photo-film";
                    cat_icon_color = "#B8621B"
                    break;

                default:
                    cat_icon_class = "fa-solid fa-bars-progress";
                    cat_icon_color = "#617A55"
                    break;
            }

            // to display expense list
            expense += list.amount;
            balance = bdg_value - expense;

            st += `<div class="expense_list_container">
    <div class="cat_icon" style="background-color: ${cat_icon_color};">
        <i class="${cat_icon_class}"></i>
    </div>
    <div class="cat_name">
        <h6>${list.cate}</h6>
        <p>${formatDate(list.date)}</p>
    </div>
    <div class="exp_desc">
                        <h4>Description</h4>
                        <p>${list.desc}</p>
                    </div>
    <div class="exp_price">
        <p>${list.amount}</p>
    </div>
    <div class="exp_icon" onclick="expEdit(${i})">
        <i class="fa-solid fa-pen-to-square exp_edit"></i>
    </div>
    <div class="exp_icon" onclick="expDelete(${i})">
        <i class="fa-solid fa-trash-can exp_delete"></i>
    </div>
</div>`;

            document.getElementById("exp_list").innerHTML = st;
        })
    }
    setBdg();
}

// Function to edit expense
const expEdit = (i) => {
    edit_id = i;
    expAddBtn();

    // getting value from array and storing in variable
    let edit_cate = exp_list[i].cate;
    let edit_amount = exp_list[i].amount;
    let edit_date = exp_list[i].date;
    let edit_desc = exp_list[i].desc;

    // set the variable values in input fields
    cate_drop.value = edit_cate;
    exp_amount.value = edit_amount;
    exp_date.value = edit_date;
    exp_desc.value = edit_desc;

    document.getElementById("exp_btn_add").value = "Save Changes";
}

// Function to delete expense
const expDelete = (i) => {
    exp_list.splice(i, 1);
    displayExpenses();
}

