/* eslint-disable jsx-a11y/control-has-associated-label */
// import { useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledEngineProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

import { AppRoute, CreateCourseData, ICreateCourseFormData } from '../../types';
import { createCourseSchema } from '../../validationSchemas/createCourseSchema';
import * as coursesActrions from '../../slices/coursesSlice';

import styles from './CreateCourse.module.scss';
import { useAppDispatch } from '../../app/hooks';

export const CreateCourse = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateCourseFormData>({
    resolver: yupResolver(createCourseSchema),
  });

  const onSubmit = async ({
    name,
    description = '',
    image = '',
    link = '',
  }: ICreateCourseFormData) => {
    const newCourse: CreateCourseData = {
      name,
      description,
      image,
      link,
    };

    try {
      await dispatch(coursesActrions.create(newCourse));
      navigate(AppRoute.MY_COURSES);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputsSection}>
            <input
              type="text"
              className={cn(styles.input, {
                [styles.inputWithError]: errors.name,
              })}
              placeholder="Course name"
              {...register('name')}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}

            <input
              type="text"
              className={cn(styles.input, {
                [styles.inputWithError]: errors.description,
              })}
              placeholder="Description"
              {...register('description')}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}

            <input
              type="text"
              className={styles.input}
              placeholder="Course link"
              {...register('link')}
            />

            <input
              type="text"
              className={styles.input}
              placeholder="Course image link"
              {...register('image')}
            />
          </div>

          <LoadingButton
            // loading={authRequestStatus === 'pending'}
            variant="contained"
            type="submit"
            className={styles.submitButton}
          >
            <span>Create course</span>
          </LoadingButton>
        </form>
      </div>
    </StyledEngineProvider>
  );
};