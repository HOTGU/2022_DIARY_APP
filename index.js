const monthSelect = document.getElementById("js-month");
const filterMonthSelect = document.getElementById("js-filterMonth");
const daySelect = document.getElementById("js-day");
const titleInput = document.getElementById("js-title");
const descriptionTextarea = document.getElementById("js-description");
const form = document.getElementById("js-form");
const submitBtn = document.getElementById("js-submitBtn");
const fetchAllBtn = document.getElementById("js-fetchAllBtn");
const list = document.getElementById("js-plansList");

const plansArr = JSON.parse(localStorage.getItem("plans")) || [];

const removeAll = () => {
    list.innerHTML = "";
};

const paintDiary = (plan) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("plan-wrapper");
    const date = document.createElement("div");
    date.innerHTML = `${plan.month}월 ${plan.day}일`;
    date.classList.add("plan-date");
    const title = document.createElement("h2");
    title.classList.add("plan-title");
    title.innerHTML = plan.title;
    const description = document.createElement("p");
    description.classList.add("plan-description");
    description.innerHTML = plan.description;
    wrapper.append(date);
    wrapper.append(title);
    wrapper.append(description);
    list.appendChild(wrapper);
};

const paintFilterMonth = () => {
    for (let v = 1; v < 13; v++) {
        const option = document.createElement("option");
        if (v === 1) {
            option.innerHTML = "보고싶은 달을 선택해주세요";
        } else {
            option.value = v;
            option.innerHTML = `${v}월`;
        }
        filterMonthSelect.appendChild(option);
    }
};

const paintMonthDay = () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    for (let v = 1; v < 13; v++) {
        const option = document.createElement("option");
        option.value = v;
        option.innerHTML = `${v}월`;
        if (v === currentMonth) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }
    for (let v = 1; v < 33; v++) {
        const option = document.createElement("option");
        option.value = v;
        option.innerHTML = `${v}일`;
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
        return;
    }

    const planObj = {
        month,
        day,
        title,
        description,
    };

    savePlan(planObj);
    fetchAll();
    titleInput.value = "";
    descriptionTextarea.value = "";
};

const fetchAll = (e) => {
    removeAll();
    plansArr.sort((a, b) => {
        if (a.day < b.day) {
            return 1;
        }
        if (a.day > b.day) {
            return -1;
        }
        return 0;
    });
    plansArr.sort((a, b) => {
        if (a.month > b.month) {
            return 1;
        }
        if (a.month < b.month) {
            return -1;
        }
        return 0;
    });
    plansArr.forEach((plan) => {
        paintDiary(plan);
    });
};

const handleFilter = (e) => {
    e.preventDefault();
    const filterMonth = filterMonthSelect.value;
    const filteredArr = plansArr.filter((plan) => {
        if (filterMonth === plan.month) {
            return plan;
        }
    });
    removeAll();
    filteredArr.sort((a, b) => {
        if (a.day < b.day) {
            return 1;
        }
        if (a.day > b.day) {
            return -1;
        }
        return 0;
    });
    filteredArr.sort((a, b) => {
        if (a.month > b.month) {
            return 1;
        }
        if (a.month < b.month) {
            return -1;
        }
        return 0;
    });
    filteredArr.forEach((plan) => paintDiary(plan));
};

// localstorage

const savePlan = (planObj) => {
    plansArr.push(planObj);
    localStorage.setItem("plans", JSON.stringify(plansArr));
    alert("✅등록이 잘 됐습니다");
};

const init = () => {
    paintMonthDay();
    paintFilterMonth();
    form.addEventListener("submit", handleSubmit);
    filterMonthSelect.addEventListener("change", handleFilter);
    fetchAllBtn.addEventListener("click", fetchAll);
};

init();
