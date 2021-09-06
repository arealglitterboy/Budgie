class Person {
    constructor(name = 'none', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi, my name is ${this.name}.`;
    }
    getDescription() {
        const years = 'year' + (this.age == 1 ? '' : 's');
        return `${this.name} is ${this.age + ' ' + years} old.`;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let desc = super.getDescription();
        
        if (this.hasMajor()) {
            desc += ` They are studying ${this.major}.`;
        }

        return desc;
    }
}

class Tourist extends Person {
    constructor(name, age, home) {
        super(name, age);
        this.home = home;
    }
    hasHome() {
        return !!this.home;
    }
    getGreeting() {
        let greeting = super.getGreeting();
        
        if (this.hasHome()) {
            greeting += ` I'm visiting from ${this.home}.`;
        }

        return greeting;
    }
}

window.onload = function() {
    const me = new Tourist('Ben', 20, 'Dublin');
    console.log(me);
    console.log(me.getDescription());
    console.log(me.getGreeting());

    const them = new Student('Not Ben');
    console.log(them);
    console.log(them.getDescription());
    console.log(them.getGreeting());
}