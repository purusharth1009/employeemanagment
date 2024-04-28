const baseURL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
let currentPage = 1;
const limit = 10;

const departmentFilter =document.getElementById('department-filter');
const genderFilter = document.getElementById('gender-filter');
const sortOrder =document.getElementById('sort-order');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn =document.getElementById('next-page');
const employeeTable = document.getElementById('employee-data');

async function fetchEmployee(){
    const url = new URL(baseURL);
    url.searchParams.set('page', currentPage);
    url.searchParams.set('limit', limit);

    if (departmentFilter.value){
        url.searchParams.set('filterBy', 'Department');
        url.searchParams.set('filterValue', departmentFilter.value);
    }
    if (genderFilter.value){
        url.searchParams.set('filterBy', 'gender');
        url.searchParams.set('filterValue', genderFilter.value);
    }
    if (sortOrderFilter.value){
        url.searchParams.set('sort', 'salary');
        url.searchParams.set('order', sortOrder.value);
    }
    try{
        const response = await fetch(url);
        const data = await response.json();
        displayEmployees(data);

    }catch (error){
        console.error('Error fetching employees:' ,error);
    }
}
function displayEmployees(employees){
    employeeTable.innerHTML = '';

    employees.forEach((employee,index)=>{
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${index +1}</td>
        <td>${employee.name}</td>
        <td>${employee.gender}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        `;
        employeeTable.appendChild(row);
    });
}
function goToPreviousPage(){
    if (currentPage>1){
        currentPage--;
        fetchEmployee();
    }
}
function goToNextPage(){
    currentPage++;
    fetchEmployee();
}
prevPageBtn.addEventListener('click',goToPreviousPage);
nextPageBtn.addEventListener('click', goToNextPage);

departmentFilter.addEventListener('change',fetchEmployee);
genderFilter.addEventListener('change',fetchEmployee);
sortOrder.addEventListener('change',fetchEmployee);

fetchEmployee('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10&filterBy=department&filterValue=hr'
);


