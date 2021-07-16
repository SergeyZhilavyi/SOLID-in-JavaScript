// --------------------- Liskov Substitution Principle (рус. Принцип замещения Лискова) --------------------

// 1. Определение данного принципа можно сформулировать следующим образом: функции, которые используют базовый тип,
// они должны уметь с ним взаимодействовать , плюс взамодействовать с подтипами данного базового типа, при этом не зная
// ничего про это.

// Звучит так себе. Куда более понятней разобрать это на примерах.

// Пример 1
// Рассмотрим компанию, в которой у сотрудников есть доступ к различным дверям 

class Person {
    //access() {
    //    console.log('У тебя есть доступ !');
   // }
}

class Member extends Person {
    access() {
        console.log('У тебя есть доступ !');
    }
}

class Guest extends Person {
    constructor(isGuest) {
        this.isGuest = isGuest;
    }
    
    isGuest() {
        this.isGuest = true;
    }
    
}

// Далее создаём специалистов работающих в этой компании

class Frontend extends Member {
    canCreateFrontend() {}
}

class Backend extends Member {
    canCreateBackend() {}
}

class PersonFromDifferentCompany extends Guest {
    access() {
        throw new Error('У тебя нет доступа !');
    }
}

// Далее предположим, что у нас есть  функция позволяющая открыть секретную дверь

function openSecretDoor(member) {
    member.access();
}

// Далее мы можем открыть секретную дверь, например с помощью фронтендера

openSecretDoor(new Frontend()); // Получили: У тебя есть доступ !
openSecretDoor(new Backend());  // Получили: У тебя есть доступ !
// openSecretDoor(new PersonFromDifferentCompany()); // There should be member ! 

// Казалось бы - всё замечательно! Можно дальше работать. 
// Однако, проблема здесь в том, что если например у нас есть другой класс (PersonFromDifferentCompany)
// То есть это человек, который работает в другой компании, это тоже человек, но у него нет доступа к секретной двери.

// То есть, у нас получается такая картина: есть класс (PersonFromDifferentCompany) наследующийся от Person, и по логике
// нашего приложения на текущий момент вот эта функция(openSecretDoor(person)), которая открывает секретные двери - она
// должна работать со всеми классами, которые наследуются от Person. 
// Однако, получаем ошибку у PersonFromDifferentCompany()

// И как раз такой код нарушает третий принцип.
// Дело в том, чтобы функция openSecretDoor() у нас работала: 
// нам нужно прописать в ней различные "if() {}" или "try/catch" и т.д
// Однако, в таком случае она будет работать некорректно  с базовым классом Person.

// Чтобы исправить ситуацию и привести её к принципу Liskov Substitution Principle, нам нужно пересмотреть
// абстрактный уровень тех зависимостей и базовых классов, которые у нас присутствуют. 
// Т.е просто наследоваться от Person не есть корректно. 
// По-простому говоря: Person - это человек, просто наследоваться от человека некорректно, потому как:
// Frontend - это человек и PersonFromDifferentCompany тоже человек, но у этих людей как бы разная логика.

// Поэтому, мы можем добавить ещё один уровень абстракции в виде базовых классов (Member, Guest)
// Member - это то же человек, но который является работником этой компании
// Guest - это тоже человек, но не относится к вышеупомянутой компании

// То есть здесь присутсвует чисто идеологическая составляющая этого принципа, что нам нужно правильно 
// выбирать так называемые слои, или абстракции, которые мы используем.


// ------- Пример 2

class Component {
    constructor(isComponent) {
        this.isComponent = isComponent;
    }
    isComponent() {
        this.isComponent = true;
    }

   
}

class ComponentWithTemplate extends Component {
    render() {
        return `<div>Component</div>`;
    }
}

class HigherOrderComponent extends Component {
    // Здесь может быть какой-то функционал
}

class HeaderComponent extends ComponentWithTemplate {
    onInit() {}
}

class FooterComponent extends ComponentWithTemplate {
    afterInit() {}
}

class HOC extends HigherOrderComponent {
    render() {
        throw new Error('Ты не рендеришь, приятель !');
    }
    // Но, у него есть метод, который принимает значение и модифицирует его
    wrapComponent(component) {
        component.wrapped = true;
        return component;
    }
}

function renderComponent(component) {
    console.log(component.render());
}

renderComponent(new HeaderComponent()); // <div>Component</div>
renderComponent(new FooterComponent()); // <div>Component</div>

// Всё здорово ! Однако, понятие компонента шире, чем какие-то обычные компоненты 
// Я имею ввиду, что у нас есть другой класс , который является Higher-Order Components (HOC)
// Дело в том, что HOC сами по себе не имеют метода рендера, т.е они принимают на вход другой компонент
// и возвращают нам другой компонент(т.е они принимают на вход один компонент и 
//возвращают другой уже модифицированный класс)
// Получается, что в HOC - метода render() быть не должно.

// Для справки: Higher-Order Components (HOC) - это компоненты высокого порядка.