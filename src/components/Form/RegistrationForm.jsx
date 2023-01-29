import { useForm } from 'react-hook-form';
import s from './index.module.css';


const RegistrationForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const onSubmit = (data) => {
        const user = data;
        
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
      
    };


    return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <h3>Регистрация</h3>
     <input
        className={s.input}
        type='text'
        placeholder='Имя'
        {...register('name',{ required: 'Обязательное поле', minLength: {value:4, message:'Минимум 4 буквы'}})}
      />
      <div>{errors?.name && <p className={s.errorText}>{errors?.name?.message}</p>}</div>
      <input
        className={s.input}
        type='number'
        placeholder='Номер телефона'
        {...register('phoneNumber',{ required: 'Обязательное поле', minLength: {value:10, message:'Минимум 10 цифр'}})}
      />
      <div>{errors?.phoneNumber && <p className={s.errorText}>{errors?.phoneNumber?.message}</p>}</div>
      <input
        className={s.input}
        type='password'
        placeholder='Пароль'
        {...register('password',{ required: 'Обязательное поле', 
        pattern: {
            value:  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: `Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру`
          }})}
      />
      <div>{errors?.password && <p className={s.errorText}>{errors?.password?.message}</p>}</div>
      <button className={s.button}> Зарегистрироваться </button>
   </form>
    )};


 export default RegistrationForm;