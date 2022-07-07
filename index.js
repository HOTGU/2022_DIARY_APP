const monthSelect = document.getElementById("js-month");
const daySelect = document.getElementById("js-day");
const titleInput = document.getElementById("js-title");
const descriptionTextarea = document.getElementById("js-description");
const form = document.getElementById("js-form");
const submitBtn = document.getElementById("js-submitBtn");
const fetchAllBtn = document.getElementById("js-fetchAllBtn");
const list = document.getElementById("js-plansList");

const plansArr = JSON.parse(localStorage.getItem("plans")) || [];

const paintMonthDay = () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    for (let v = 1; v < 13; v++) {
        const option = document.createElement("option");
        option.value = v;
        option.innerHTML = v;
        if (v === currentMonth) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
    for (let v = 1; v < 33; v++) {
        const option = document.createElement("option");
        option.value = v;
        option.innerHTML = v;
        if (v === currentDay) {
            option.selected = true;
        }
        daySelect.appendChild(option);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    const month = monthSelect.value;
    const day = daySelect.value;
    const title = titleInput.value;
    const description = descriptionTextarea.value;

    if (!month || !day || !title || !description) {
        alert("항목을 작성해주세요");
    }

    const planObj = {
        month,
        day,
        title,
        description,
    };

    savePlan(planObj);

    titleInput.value = "";
    descriptionTextarea.value = "";
};

const handleFetchAll = (e) => {
    e.preventDefault();
    plansArr.forEach((p) => {
        const wrapper = document.createElement("div");
        const month = document.createElement("div");
        month.innerHTML = p.month;
        const day = document.createElement("div");
        day.innerHTML = p.day;
        const title = document.createElement("h2");
        title.innerHTML = p.title;
        const description = document.createElement("p");
        description.innerHTML = p.description;
        wrapper.append(month);
        wrapper.append(day);
        wrapper.append(title);
        wrapper.append(description);
        list.appendChild(wrapper);
    });
};

// localstorage

const savePlan = (planObj) => {
    plansArr.push(planObj);
    localStorage.setItem("plans", JSON.stringify(plansArr));
    alert("✅등록이 잘 됐습니다");
};

const init = () => {
    paintMonthDay();
    form.addEventListener("submit", handleSubmit);
    fetchAllBtn.addEventListener("click", handleFetchAll);
};

init();
