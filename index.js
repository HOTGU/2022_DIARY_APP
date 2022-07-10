const monthSelect = document.getElementById("js-month");
const filterMonthSelect = document.getElementById("js-filterMonth");
const daySelect = document.getElementById("js-day");
const titleInput = document.getElementById("js-title");
const descriptionTextarea = document.getElementById("js-description");
const form = document.getElementById("js-form");
const submitBtn = document.getElementById("js-submitBtn");
const fetchAllBtn = document.getElementById("js-fetchAllBtn");
const list = document.getElementById("js-plansList");

let plansArr = JSON.parse(localStorage.getItem("plans")) || [];

const removeAll = () => {
    list.innerHTML = "";
};

const orderByLatest = (arr) => {
    arr.sort((a, b) => {
        if (a.day < b.day) {
            return 1;
        }
        if (a.day > b.day) {
            return -1;
        }
        return 0;
    });
    arr.sort((a, b) => {
        if (a.month < b.month) {
            return 1;
        }
        if (a.month > b.month) {
            return -1;
        }
        return 0;
    });
    arr.forEach((item) => {
        paintDiary(item);
    });
};

const paintDiary = (plan) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("plan-wrapper");
    wrapper.id = plan.id;
    const date = document.createElement("div");
    date.innerHTML = `${plan.month}월 ${plan.day}일`;
    date.classList.add("plan-date");
    const title = document.createElement("h2");
    title.classList.add("plan-title");
    title.innerHTML = plan.title;
    const description = document.createElement("p");
    description.classList.add("plan-description");
    description.innerHTML = plan.description;
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-wrapper");
    const updateBtn = document.createElement("div");
    updateBtn.innerText = "🔨";
    updateBtn.classList.add("circle-btn");
    updateBtn.addEventListener("click", clickUpdateBtn);
    const deleteBtn = document.createElement("div");
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("circle-btn");
    deleteBtn.addEventListener("click", clickDeleteBtn);
    btnWrapper.append(updateBtn);
    btnWrapper.append(deleteBtn);
    wrapper.append(date);
    wrapper.append(title);
    wrapper.append(description);
    wrapper.append(btnWrapper);
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

const fetchAll = (e) => {
    removeAll();
    orderByLatest(plansArr);
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
        id: Date.now().toString(),
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

const handleFilter = (e) => {
    e.preventDefault();
    const filterMonth = filterMonthSelect.value;
    const filteredArr = plansArr.filter((plan) => {
        if (filterMonth === plan.month) {
            return plan;
        }
    });
    removeAll();
    orderByLatest(filteredArr);
};

const clickUpdateBtn = (e) => {
    const btnWrapper = e.target.parentNode;
    const planWrapper = btnWrapper.parentNode;

    const { id } = getById(planWrapper.id);

    titleInput.value = plan.title;
    descriptionTextarea.value = plan.description;

    const button = document.createElement("button");
    button.innerText = "수정";
    button.addEventListener("click", (e) => {
        e.preventDefault();
        button.remove();
        planUpdate(id);
    });
    form.append(button);
};

const planUpdate = (id) => {
    const title = titleInput.value;
    const description = descriptionTextarea.value;

    if (!title || !description) {
        return alert("값을 입력하세요");
    }

    const data = {
        title,
        id,
        description,
    };

    updatePlan(data);

    alert("✅수정성공");

    removeAll();
    fetchAll();
    titleInput.value = "";
    descriptionTextarea.value = "";
};

const clickDeleteBtn = (e) => {
    const btnWrapper = e.target.parentNode;
    const planWrapper = btnWrapper.parentNode;

    removePlan(planWrapper.id);

    planWrapper.remove();
};

// localstorage

const savePlan = (planObj) => {
    plansArr.push(planObj);
    localStorage.setItem("plans", JSON.stringify(plansArr));
    alert("✅등록이 잘 됐습니다");
};
const removePlan = (id) => {
    const removedArr = plansArr.filter((plan) => {
        return plan.id !== id;
    });
    plansArr = removedArr;
    localStorage.setItem("plans", JSON.stringify(plansArr));
    alert("✅삭제가 성공했습니다");
};
const getById = (id) => {
    return plansArr.find((plan) => plan.id === id);
};
const updatePlan = ({ id, title, description }) => {
    const updatedArr = plansArr.map((plan) => {
        if (plan.id === id) {
            plan = { ...plan, title, description };
        }
        return plan;
    });
    plansArr = updatedArr;
    localStorage.setItem("plans", JSON.stringify(plansArr));
};

const init = () => {
    paintMonthDay();
    paintFilterMonth();
    form.addEventListener("submit", handleSubmit);
    filterMonthSelect.addEventListener("change", handleFilter);
    fetchAllBtn.addEventListener("click", fetchAll);
};

init();
