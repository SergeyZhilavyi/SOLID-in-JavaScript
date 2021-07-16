// ------------- Single Responsibility Principle (рус. Принцип единственной ответственности) --------------------------
// Примеры представлены на языке программирования JavaScript

// 1. Когда мы говороим про Single Responsibility Principle это означает, что какой-либо класс (т.к мы работаем в ООП) 
// должен обладать только одной зоной ответственности 
// Однако стоит оговориться, что принципы SOLID характерны не только для ООП, но и в принципе для моделей данных,
// для функционального программирования и т.д. 
// То есть это настолько абстрактные вещи с точки зрения масштабируемых систем, что они не привязываются только к ООП,
// просто изначально и зачастую они шли от ООП.

// 2. Однако, теперь поподробнее поговорим про Single Responsibility Principle.
// Идея данного принципа заключается в том, что по мере роста вашего приложения вам требуется большее количество 
// функционала.
// И какому-то классу (допустим), вы должны добавлять новый функционал,который может смешивать его изначальное поведение
// И это будет не соответствовать данному принципу , т.к данный принцип говорит, что: если там есть уже какое-то
// другое поведение, то его нужно вывести в отдельный класс.

// Разберём пример:

class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;// По-умолчанию, когда создаём новую новость флаг modified = false.(Новость не изменялась)
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }
/* Мы не можем размещать эти методы в этом классе. Т.к это противоречит разбираемому принципу. News не отвечает за вывод
    toHTML() {
        return `
        <div class="news">
        <h1>${this.title}</h1>
        <p>${this.text}</p>
        </div>
        `;
    }

    toJSON() {
        return JSON.stringify({
            title: this.title,
            text: this.text,
            modified: this.modified
        }, null, 2);
    } 
    */
}

// Далее создаём класс для вывода данных 
class NewsPrinter {
    constructor(news) {
        this.news = news;
    }

    html() {
        return `
        <div class="news">
        <h1>${this.news.title}</h1>
        <p>${this.news.text}</p>
        </div>
        `;
    }

    json() {
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified
        }, null, 2);
    }

    xml() {
        return `
        <news>
            <title>${this.news.title}</title>
            <text>${this.news.text}</text>
            <modified>${this.news.modified}</modified>
        </news>
        `;
    }

}

const printer = new NewsPrinter(
    new News('Woodstock','В 1969 году мире музыки состоялось эпохальное событие — рок-фестиваль Вудсток')
);

// Так же можем вернуть данные ввиде HTML:
console.log(printer.html());
/* Результат:
<div class="news">
    <h1>Woodstock</h1>
    <p>В 1969 году мире музыки состоялось эпохальное событие — рок-фестиваль Вудсток</p>
    </div>

Получили вот такой шаблон в формате HTML
*/

// Так же может возникнуть необходмость преобразования в JSON формат:
console.log(printer.json());
/*
Результат: 
{
  "title": "Woodstock",
  "text": "В 1969 году мире музыки состоялось эпохальное событие — рок-фестиваль Вудсток",
  "modified": false
}
*/

// XML формат 
console.log(printer.xml());
/*
Результат:
    <news>
        <title>Woodstock</title>
        <text>В 1969 году мире музыки состоялось эпохальное событие — рок-фестиваль Вудсток</text>
        <modified>false</modified>
    </news>
*/

// То есть, мы декомпазировали нашу логику, согласно принципу Single Responsibility Principle. 
// Проще говоря: не мешали всё в одну кучу !