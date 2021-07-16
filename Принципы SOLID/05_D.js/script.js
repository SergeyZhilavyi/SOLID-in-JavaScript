// ----------- Dependency Inversion Principle (рус. Принцип Инверсии Зависимостей) -----------------

// 1. Определение звучит таким образом: верхний уровень модулей не должен зависеть от абстракций
// нижнего уровня. И, что вообще любые уровни не должны зависеть именно от абстракций, а не от конкретики.
// Т.е мы как бы берём и инверсируем зависимости .

// Думаю примеры, внесут юольше ясности.

class Fetch {
    request(url) {
        // return fetch(url).then(r => r.json()); 
        return Promise.resolve('data from fetch');
    }
}

// Допустим возникла необходимость хранить данные не на сервере, а в локальном хранилище
class LocalSrorage {
    get() {
        //return localStorage.getItem('key'); // Этот код не запустится на Node.js
        const DataFromLocalStorage = 'data from local storage'; // поэтому сэмулируем его таким образом
        return DataFromLocalStorage;
    }
}

class FetchClient {
    constructor() {
        this.fetch = new Fetch();
    }

    // Теперь у нас будет общий метод для клиентов
    clientGet() {
        return this.fetch.request('vk.com');
    } 
}

class LocalStorageClient {
    constructor() {
        this.localStorage = new LocalSrorage();
    }

    clientGet() {
        return this.localStorage.get();
    }
}

class Database {
    constructor(client) {
        this.client = client;
    }

    getData() {
       return this.client.clientGet();
    }
}

//const db = new Database(new FetchClient());
//console.log(db.getData()); // Promise { 'data from fetch' }

// Если вдруг захотели получить данные из localStorage - не проблема !
const db = new Database(new LocalStorageClient());
console.log(db.getData()); // data from local storage


// Приложение работает, но получается, что наш класс зависит от неких конкретных реализаций
// и получается, что мы опять возвращаемся к его переписыванию, что в свою очередь неудобно.

// ---- Для того, чтобы наш код поддерживал Dependency Inversion Principle нужно :
// - создать некоторый класс, который будет являться некоторым интерфейсом для взаимодействия
// между всеми вышесозданными сущностями .
// выше (в нашем примере) создаём класс FetchClient, который позволит оборачивать функционал внутри Fetch
// Ту же  оболочку мы делаем и для LocalStorage , назовём её LocalStorageClient
// Внутри этих двух классов, есть метод clientGet(), название одно и тоже, но в каждом классе у них своя
// реализация в зависимости от того инструмента, который мы используем.

// ---- Dependency Inversion Principle, говорит нам о том, что мы изменяем управление зависимостями
// в том плане, что Database (в нашем примере) не зависит от абстракций низшего уровня. Она зависит только
// от тех абстракций, которые мы передали в этот класс 