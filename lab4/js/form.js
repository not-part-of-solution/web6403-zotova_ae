class UserData {
    constructor(login, password, email, agreement) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.agreement = agreement;
    }

    print() {
        const maskedPassword = '*'.repeat(this.password.length);
        console.log('Данные пользователя');
        console.log('Логин:   ', this.login);
        console.log('Пароль:  ', maskedPassword);
        console.log('Email:   ', this.email);
        console.log('Согласие:', this.agreement ? 'да' : 'нет');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth');
    const msgElement = document.getElementById('form-msg'); // Наш блок для сообщений

    function showMessage(text, isError) {
        msgElement.textContent = text;
        msgElement.hidden = false;
        
        if (isError) {
            msgElement.className = 'auth__msg auth__msg--error';
        } else {
            msgElement.className = 'auth__msg auth__msg--success';
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        msgElement.hidden = true;

        const login = document.getElementById('login').value.trim();
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value.trim();
        const agreement = document.getElementById('agreement').checked;

        if (!login || !password || !email) {
            console.warn("Заполните логин, пароль и email.");
            showMessage("Вы не можете стать манулом: Заполните логин, пароль и email!", true); // true = ошибка
            return;
        }
        
        if (!agreement) {
            console.warn("Нет согласия на обработку персональных данных");
            showMessage("Вы не можете стать манулом: Необходимо согласие на обработку данных.", true);
            return;
        }

        const user = new UserData(login, password, email, agreement);
        user.print();

        showMessage("Успешно! Вы манул!", false); 

        form.reset();
        
    
        setTimeout(() => {
            msgElement.hidden = true;
        }, 4000);
    });
});