
const backend_base_url = 'http://127.0.0.1:8000/'


const filterId = localStorage.getItem('filter_id')
console.log(filterId)

window.onload = () => {
    getFilter();
}

async function getFilter(){
    const response = await fetch(`http://127.0.0.1:8000/store/${filterId}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    data = await response.json()
    console.log(data)

    let click_image = data['filter_image']
    console.log(data['filter_image'])

    let temp_html = `
    <div class="image-container">
            <img style="width: 500px;" id="previewImage" src="${backend_base_url}${click_image}">
    </div>
    `
    $('#filterImage').append(temp_html)

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
    const image=document.getElementById("InputImg").files[0]
    console.log(image)
    const formData = new FormData();
    console.log("52",formData)

    formData.append('input_img', image);
    console.log(formData.value)

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    const response = await fetch (`http://127.0.0.1:8000/store/${filterId}/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:"POST",
        body:formData
    })

    if (response.status ==200){
        alert("사진 변환중")
        window.location.replace('option.html');
    }else{
        alert(response.status)
    }
}