// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/templates/'

async function GotoOptionPage(){
    $.ajax({
        type: 'GET',
        url:`${backend_base_url}store/`,
        data: {},
        success: function(response) {
            let postings = response
            for (let i=0; i < postings.length; i++){
                append_temp_html(
                    postings[i].id,   
                    postings[i].filter_image,
                )
            }
            function append_temp_html(id, filter_image){
                temp_html = `
            <li>
                <div class="products">
                    <!-- 게시글 -->
                    <div class="filter" id="${id}" onclick="page2OrderSettingPage(this.id)">
                        <img src="${filter_image}">
                    </div>
                </div>
            </li>
            `
            $('#filter').append(temp_html)
            }
        }
    })
}; GotoOptionPage()

function page2OrderSettingPage(id){
    alert('잠시만 기다려주세요')
    sessionStorage.setItem("id", id)
    // window.location.replace(`${frontend_base_url}mypage.html?store=${id}`)
    window.location.href = "./OrderSettingPage.html"
    
}