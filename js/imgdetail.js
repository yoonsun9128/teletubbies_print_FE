
const backend_base_url = 'http://127.0.0.1:8000/'


const output_id = localStorage.getItem('output_id')
console.log(output_id)

window.onload = () => {
    getOutputImg();
}

async function getOutputImg(){
    console.log(output_id)
    const response = await fetch(`http://127.0.0.1:8000/store/${output_id}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    
    response_json = await response.json()
    console.log(response_json)

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

// 인풋이미지 미리보기
const fileInput = document.getElementById("InputImg")
const handleFiles = (e) => {
    const fileReader = new FileReader()
    const selectedFile = fileInput.files;
    fileReader.readAsDataURL(selectedFile[0])
    fileReader.onload = function(){
        document.getElementById("previewImage").src = fileReader.result
    }
}
fileInput.addEventListener("change", handleFiles)



async function transferML(){
    // 첫번째로 올라간 하나의 이미지 받아오기
    // const 명화이미지도 같이 불러와야할것같음
    const image=document.getElementById("InputImg").files[0]
    const FormData = new FormData();

    FormData.append("input_img", image)

    const response = await fetch ("${backend_base_url}store/${id}/", {
        method:"POST",
        body:FormData
    })
    if (response.status ==200){
        alert("사진 변환중")
        window.location.replace("${backend_base_url}store/${id}/order/");
    }else{
        alert(response.status)
    }
}