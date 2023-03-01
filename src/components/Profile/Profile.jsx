import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { VALIDATE_CONFIG } from '../../constants/constants';
import { UserContext } from '../../context/userContext';
import api from '../../utils/api';
import BaseButton from '../BaseButton/BaseButton';
import { Form } from '../Form/Form';
import { openNotification } from '../Notification/Notification';
import './style.scss'

export const Profile = () => {

const navigate = useNavigate();
const {currentUser} = useContext(UserContext);
const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  const required = {
    required: {
      value: true,
      message: VALIDATE_CONFIG.requiredMessage,
    },
  };  

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
;}  


 

  const sendData = async (data) => {
    try {
      await api.setUserInfo(data);
      openNotification("success", "Success", "Данные успешно изменены");
    } catch (error) {
      openNotification("error", "Error", "Что-то пошло не так");
    }
  };

    return (<>
    <div className='profile'>
            <span className='profile__back' onClick={()=>{navigate(-1)}}>
                {'< Назад'}
            </span>
            <h1 className='profile__title'>Мои данные</h1>
        {currentUser ? (
         <Form className='' handleFormSubmit={handleSubmit(sendData)} >  
          <div className='profile__info'>
          <div>
                <input
                  {...register("name", required)}
                  className="auth__input"
                  type="text"
                  name="name"
                  placeholder="Имя"
                  defaultValue={currentUser.name}
                />
                {errors.name && (
                  <p className="auth__error">{errors?.name?.message}</p>
                )}
              </div>
            <div> 
              <input
                {...register("about", required)}
                className="auth__input"
                type="text"
                name="about"
                placeholder="Обо мне"
                defaultValue={currentUser.about}
              />
              {errors.about && (
                <p className="auth__error">{errors?.about?.message}</p>
              )}
            </div>   
          <input
            className='auth__input'
            type='email'
            name='email'
            placeholder='Email'
            defaultValue={currentUser.email}
          />
          <input
            className='auth__input'
            type='text'
            name='id'
            placeholder='id'
            defaultValue={currentUser._id}
          />
          </div> 
          <BaseButton type='submit' color={'yellow'}>
              Сохранить
            </BaseButton>
         </Form> 
        ) : ( 
            <></>
        )}
        <div className='profile__logout'>
          <BaseButton onClick={handleLogout} color={'yellow'}>
            Выйти
          </BaseButton>
        </div>
    </div>
 </>)
};