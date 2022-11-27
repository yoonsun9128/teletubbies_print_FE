// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

window.onload = async function GotoOptionPage(){
    const filterData = async () => {
        const response = await fetch(`${backend_base_url}store/`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem("access")
            },
        })
        return response.json();
    }
    filterData().then((data) => {
        filter = data
        console.log(filter)
        for (let i=0; i < filter.length; i++){
            let id = filter[i]['id']
            let filter_image = filter[i]['filter_image']
            console.log(filter[i]['id'])
            console.log(filter[i]['filter_image'])

            let temp_html = `
            <li>
                <div class="products">
                    <!-- 게시글 -->
                    <div class="filter" id="${id}" onclick="location.href='${frontend_base_url}/templates/ordersetting.html?id=${filter_id}'">
                        <img src="${filter_image}">
                    </div>
                </div>
            </li>
            `
        }
    })
            $('#filter-box').append(temp_html)
            console.log(filter)
}
