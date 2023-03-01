import { useForm } from "react-hook-form";
import BaseButton from "../BaseButton/BaseButton";
import { Form } from "../Form/Form";
import './style.scss';
import { useNavigate } from "react-router-dom";
import authApi from "../../utils/authApi";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { emailRegister, passwordRegister, } from "../../utils/utils";

const Login = ()=> {
  const { register, handleSubmit, formState:{errors} } = useForm({mode: 'onBlur'});
  const navigate = useNavigate();
  const { setAuthentificated } = useContext(UserContext)


  const sendData = async (data) => {
    try {
    const result = await authApi.login(data);
    localStorage.setItem(`token`,result.token);
    setAuthentificated(true);
    navigate('/')
    } catch (error) {
      console.log(error);
    }};


return (<>
 <Form handleFormSubmit={handleSubmit(sendData)} title='Вход'>
 <div className="auth__controls">
  <input
   {...emailRegister(register)}
    className="auth__input"
    type='email'
    name="email"
    placeholder="Email"
    required
  />
  {errors.email && (<p className="auth__error">{errors?.email?.message}</p>)}

  <input
   {...passwordRegister(register)}
    className='auth__input'
    type='password'
    name="password"
    placeholder="Пароль"
    required
  />
  {errors.password && (<p className='auth__error'>{errors?.password?.message}</p>)}

  <p className="auth__info auth__link" onClick={()=>navigate('/reset-pass')}>Восстановить пароль</p>

   <div className="auth__actions">
    <BaseButton type='submit' color='yellow'>Войти</BaseButton>
    <BaseButton type="button" color='white' onClick={()=>navigate('/register')}>Регистрация</BaseButton>
   </div>
  </div>
 </Form>
</>)
};
export default Login ;