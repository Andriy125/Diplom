export default ({ isAuth, values, errors }) => {
  const rules = {
    email: value => {
      if (!value) {
        errors.email = "Введіть E-Mail";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Невірний E-Mail";
      }
    },
    password: value => {
      if (!value) {
        errors.password = "Введіть пароль";
      } else if (
        !isAuth &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ) {
        errors.password = "Занадто легкий пароль";
      }
    },
    password_2: value => {
      if (!isAuth && value !== values.password) {
        errors.password_2 = "Паролі не співпадають";
      }
    },
    fullname: value => {
      if (!isAuth && !value) {
        errors.fullname = "Вкажіть ваше ім'я та фамалію";
      }
    }
  };

  Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};
