const UserModel = require("../models/users");

function MyError(message) {
    this.errStatus = 400;
    this.errMessage = message;
    this.stack = new Error().stack;
}

module.exports.register = async ({ email, password, firstName, lastName }) => {
    if (!email) {
        throw new MyError("Вы забыли заполнить Email!");
    }

    if (!password) {
        throw new MyError("Вы забыли заполнить пороль!");
    }

    if (password.length <= 7) {
        throw new MyError("Пороль не должен быть меньше 7-символов");
    }

    if (!firstName) {
        throw new MyError("Вы забыли заполнить Имя!");
    }

    if (firstName.length <= 2) {
        throw new MyError("Имя не должна быть меньше 2-букв");
    }

    if (!lastName) {
        throw new MyError("Вы забыли заполнить Фамилию!");
    }

    const candidateUser = await UserModel.findOne({ email });

    if (candidateUser) {
        throw new MyError(
            "Такой пользователь существует, пожалуйста попробуйте ещё!"
        );
    }
};

module.exports.login = async ({ email, password }) => {
    if (!email) {
        throw new MyError("Вы забыли заполнить Email!");
    }

    if (!password) {
        throw new MyError("Вы забыли заполнить пороль!");
    }

    const user = await UserModel.findOne({ email });
    const isPasswordMatch = await user.comparePassword(password);

    if (!user || !isPasswordMatch) {
        throw new MyError("Неверный email или пороль");
    }

    return user;
};
