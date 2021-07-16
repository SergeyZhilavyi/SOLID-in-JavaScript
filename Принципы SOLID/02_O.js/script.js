// ---------------- Open Close Principle (рус. Принцип Открытости/Закрытости) -------------------------

// Этот принцип говорит нам о том, что какие-то классы, которые мы создаём должны быть открыты
// для расширения, но закрыты для модификаций.
// Это означает, что классы должны проектироваться таким образом, чтобы даже если у нас 
// появятся новые кейсы , даёт возможность нам не модефицировать старый код , а он уже был спроектирован
// таким образом, чтобы даже если вы приносите что-то новое, вы не меняете свой старый код.

// Пример:

class Shape {
    area() {
        // Если метод area не реализуется в дочерних элементах - пробрасываем ошибку
        throw new Error('Area method should be implemented'); 
    }
}

// Далее,  так как мы наследуемся от класса Shape - прописываем super()


class Square extends Shape {
    constructor(size) {
        super();
        this.size = size;
    }

    area() {
        return Math.round(this.size ** 2);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.round((this.radius ** 2) * Math.PI);
    }
}

class Rect extends Shape{
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return Math.round(this.width * this.height);
    }
}
// console.log(new Circle(10)); // Circle { radius: 10 } - Для проверки
// Теперь реализация высчитывания площади у нас делегирована каждому из классов

// Допустим, перед нами стоит задача: Посчитать суммарно площадь всех этих фигур.

class AreaCalculator {
    constructor(shapes = []) {
        this.shapes = shapes;
    }

    sum() {
        return this.shapes.reduce((acc, shape) => {
            acc += shape.area();
            return acc;
        }, 0); 
    }
}

// Далее создаём массив calc, и передаём в неё массив тех элементов, которые хотим посчитать
const calc = new AreaCalculator([
    new Square(10),
    new Circle(5),
    new Rect(15, 25)
]);

console.log(calc.sum()); // 554

// То есть мы открыли для расширений класс AreaCalculator,  и при этом мы закрыли его для модификаций
// т.е метод sum() у нас один раз создан, и больше мы к нему не возвращаемся.