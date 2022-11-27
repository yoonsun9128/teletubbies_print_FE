const backend_base_url = 'http://127.0.0.1:8000/'

async function getFilter(){
    const response = await fetch('${backend_base_url}/store/1/',{
        method:"GET",
    })
    response_json = await response.json()
    console.log(response_json)
    return response_json
}


window.onload = async function loadFilter(){
    console.log("페이지")
    filter = await getFilter()
    console.log(filter)
    const filter_img = document.getElementById("filterImage")

    filter.forEach(filter_detail =>{
        const filterPlace = document.createElement("idv")
        const filterPicture = document.createElement("img")
        filterPicture.setAttribute("src", "${backend_base_url}${data['filter_image']}")
        filterPlace.appendChild(filterPicture)
        filter_img.appendChild(filterPlace)
    });
}

 // 이미지 미리 보이게 하기
 function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if(input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("preview-image")
            previewImage.src = e.target.result
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}
// input file에 change 이벤트 부여
const inputImage = document.getElementById("input-image")
inputImage.addEventListener("change", e => {
     readImage(e.target)
})


async function transferML(){
    // 첫번째로 올라간 하나의 이미지 받아오기
    // const 명화이미지도 같이 불러와야할것같음
    const image=document.getElementById("InputImg").files[0]
    const FormData = new FormData();

    FormData.append("input_img", image)

    const response = await fetch ('${backend_base_url}/store/<int:filter_id>/', {
        method:"POST",
        body:FormData
    })
    if (response.status ==200){
        alert("사진 변환중")
        window.location.replace('${backend_base_url}/store/<int:filter_id>/</int:filter_id>/order/');
    }else{
        alert(response.status)
    }
}