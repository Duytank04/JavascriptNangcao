/**
1. Xây dựng chức năng hiển thị (2 điểm)
Hiển thị danh sách sản phẩm theo dạng table
2. Xây dựng chức năng xóa (2 điểm)
Xóa sản phẩm: 1đ
Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate form: 0.5đ
4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
Cập nhật sản phẩm: 1đ
Hiển thị thông báo sau khi cập nhật: 0.5đ
Validate form: 0.5đ
5. Xây dựng chức năng đăng nhập (1 điểm) 
Đăng nhập thành công : 0.5đ
Thông báo sau khi đăng nhập thành công: 0.5đ
6. Xây dựng giao diện sử dụng bootstrap hoặc tailwindcss (1 điểm)
*/
const url = 'http://localhost:3000/products';
const tbody = document.querySelector('tbody') || document.createElement('div'); 
const btnAdd = document.querySelector('.btn-add') || document.createElement('div');
const content = document.querySelector('.content') || document.createElement('div');
const btnLogin = document.querySelector('.btn-login') || document.createElement('div');
// console.log(tbody);
// 1. Xây dựng chức năng hiển thị (2 điểm)
// Hiển thị danh sách sản phẩm theo dạng table
fetch(url).then(res => res.json()).then(data => {
    // console.log(data);
    const html = data.map(pro => {
    return /*html*/ `
    <tr>
        <td>${pro.id}</td> 
        <td>${pro.name}</td>
        <td>${pro.price}</td>
        <td> <button class ="btn-update" data-id="${pro.id}" >Sửa</button> | 
        <button class ="btn-del" data-id="${pro.id}">Xóa</button></td>
    </tr> `;
    }).join("");
    // console.log(html);
    tbody.innerHTML = html;

    // 2. Xây dựng chức năng xóa (2 điểm)
    // Xóa sản phẩm: 1đ
    const btnDel = document.querySelectorAll(`.btn-del`);
    console.log(btnDel);
    for (const btn of btnDel) {
        btn.addEventListener('click', function(){
            if(confirm ("Bạn có chắc muốn xóa không?")){
                // alert(btn.datasett.id);
                const id = btn.dataset.id;
                removePro(id);
            }
        });
    }
                // 4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
                // Cập nhật sản phẩm: 1đ
                // Hiển thị thông báo sau khi cập nhật: 0.5đ
                // Validate form: 0.5đ

                const btnUpdate = document.querySelectorAll(`.btn-update`);
                console.log(btnUpdate);
                for (const btn of btnUpdate) {
                    btn.addEventListener('click', function(){
                    const id = btn.dataset.id;
                    fetch(`${url}/${id}`).then(res => res.json()).then(data => {
                        content.innerHTML =  /*HTML*/`
                        <h1>Sửa sản phẩm</h1>
                        <form action="">
                            <input type="text" name="" id="pro_name" placeholder="Tên sản phẩm" value="${data.name}">
                            <input type="text" name="" id="pro_price" placeholder="Giá sản phẩm" value="${data.price}">
                            <input type="submit"  value="Sửa sản Phẩm"  class="btn-submit">
                        </form> 
                        `;
                        const btnSubmit = document.querySelector('.btn-submit');
                        const pro_name = document.querySelector('#pro_name');
                        const pro_price = document.querySelector('#pro_price'); 
                            btnSubmit.addEventListener('click', function(e){
                                e.preventDefault();
                                if(pro_name.value == ''){
                                    alert('Bạn chưa nhập tên sản phẩm');
                                    pro_name.focus();
                                    return false;
                                }else if(pro_price.value == ''){
                                    alert('Bạn chưa nhập giá sản phẩm');
                                    pro_price.focus();
                                    return false;
                                }else if (isNaN(Number(pro_price.value)) || Number(pro_price.value) <= 0) {
                                    alert('Giá sản phẩm phải > 0');
                                    pro_price.focus();
                                    return false;
                                }            
                                const new_pro = {
                                    id: id,
                                    name: pro_name.value,
                                    price: pro_price.value,
                                }
                                console.log(new_pro);
                                updatePro(id , new_pro);
                            });
                        }).catch(err => console.log(err));
                    });
                }

    }).catch(err => console.log(err));
    const removePro = function(id){
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        }).then(res => res.json()).then(() => {
            alert("Bạn đã xóa thành công");
        }).catch(err => console.log(err))
    }

// 3. Xây dựng chức năng thêm mới (2 điểm)
// Thêm sản phẩm : 1 đ
// Hiển thị thông báo sau khi thêm : 0.5đ
// Validate form: 0.5đ

btnAdd.addEventListener('click', function(){
content.innerHTML =  /*HTML*/`
    <h1>Thêm sản phẩm</h1>
    <form action="">
        <input type="text" name="" id="pro_name" placeholder="Tên sản phẩm">
        <input type="text" name="" id="pro_price" placeholder="Giá sản phẩm">
        <input type="submit"  value="Thêm sản Phẩm"  class="btn-submit">
    </form> 
    `;
const btnSubmit = document.querySelector('.btn-submit');
const pro_name = document.querySelector('#pro_name');
const pro_price = document.querySelector('#pro_price'); 
    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        if(pro_name.value == ''){
            alert('Bạn chưa nhập tên sản phẩm');
            pro_name.focus();
            return false;
        }else if(pro_price.value == ''){
            alert('Bạn chưa nhập giá sản phẩm');
            pro_price.focus();
            return false;
        }else if (isNaN(Number(pro_price.value)) || Number(pro_price.value) <= 0) {
            alert('Giá sản phẩm phải > 0');
            pro_price.focus();
            return false;
        }            
        const new_pro = {
            name: pro_name.value,
            price: pro_price.value,
        }
        console.log(new_pro);
        addPro(new_pro);
    });
});


const addPro = function(data){
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(() => {
    alert('Bạn đã thêm sản phẩm thành công');
    }).catch(err => console.log(err));
}

const updatePro = function(id,data){
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(() => {
    alert('Bạn đã sửa sản phẩm thành công');
    }).catch(err => console.log(err));
}

// 5. Xây dựng chức năng đăng nhập (1 điểm) 
// Đăng nhập thành công : 0.5đ
// Thông báo sau khi đăng nhập thành công: 0.5đ
const username = document.querySelector('#username');
const password = document.querySelector('#password');
btnLogin.addEventListener('click', function(e){
e.preventDefault();
        if(username.value == ''){
            alert('Bạn chưa nhập tài khoản');
            username.focus();
            return false;
        }else if(password.value == ''){
            alert('Bạn chưa nhập mật khẩu');
            password.focus();
            return false;
        }           
        fetch('http://localhost:3000/users').then(res => res.json()).then(data => {
            console.log(data);
            if(checkLogin(data, username.value,password.value)){
                alert('Bạn đã đăng nhập thành công');
                window.location.href = 'index.html';
            }else{
                alert('Tài khoản hoặc mật khẩu không chính xác');
            }
        }).catch(err => console.log(err));
    });
    const checkLogin = function(data ,user , pass){
        return data.some(data => {
        return data.username == user && data.password == pass;
        });
    };