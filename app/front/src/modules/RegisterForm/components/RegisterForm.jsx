import React from "react";
import { Form, Icon } from "antd";
import { Link } from "react-router-dom";

import { Button, Block, FormField } from "components";

const success = false;

const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props;
  return (
    <div>
      <div className="auth__top">
        <h2>Реєстрація</h2>
      </div>
      <Block>
        {!success ? (
          <Form onSubmit={handleSubmit} className="login-form">
            <FormField
              name="email"
              icon="mail"
              placeholder="E-Mail"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="fullname"
              icon="user"
              placeholder="Ваше ім'я та прізвище"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password"
              icon="lock"
              placeholder="Пароль"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password_2"
              icon="lock"
              placeholder="Повторіть пароль"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <Form.Item>
              {isSubmitting && !isValid && <span>Помилка!</span>}
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                type="primary"
                size="large"
              >
                Зареєструватись
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signin">
              Увійти
            </Link>
          </Form>
        ) : (
          <div className="auth__success-block">
            <div>
              <Icon type="info-circle" theme="twoTone" />
            </div>
            <h2>Підтвердіть свій акаунт</h2>
            <p>
              На вашу пошту було відправлено лист з посиланям на підтвердження акаунту.
            </p>
          </div>
        )}
      </Block>
    </div>
  );
};

export default RegisterForm;
