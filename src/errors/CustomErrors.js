Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateEmailError = exports.DuplicateUsernameError = exports.IncorrectPasswordError = exports.UserNotFoundError = void 0;
// "../errors/CustomErrors";
class UserNotFoundError extends Error {
    constructor(username) {
        super(`User with this username '${username}' not found.`);
        this.name = 'UserNotFoundError';
    }
}
exports.UserNotFoundError = UserNotFoundError;
class IncorrectPasswordError extends Error {
    constructor() {
        super('Incorrect password. Please try again.');
        this.name = 'IncorrectPasswordError';
    }
}
exports.IncorrectPasswordError = IncorrectPasswordError;
class DuplicateUsernameError extends Error {
    constructor() {
        super(`User with the same username already exists. Please choose a different username.`);
        this.name = 'DuplicateUsernameError';
    }
}
exports.DuplicateUsernameError = DuplicateUsernameError;
class DuplicateEmailError extends Error {
    constructor() {
        super(`User with the same email already exists. Please choose a different email.`);
        this.name = 'DuplicateEmailError';
    }
}
exports.DuplicateEmailError = DuplicateEmailError;
