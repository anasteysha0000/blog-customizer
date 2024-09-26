import { forwardRef } from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

interface Props {
	onClick?: () => void;
	isFormOpen?: boolean;
}

export const ArrowButton = forwardRef<HTMLDivElement, Props>(
	({ onClick, isFormOpen = false }, ref) => {
		const handleToggleForm = () => {
			if (onClick) {
				onClick();
			}
		};

		return (
			<div
				ref={ref}
				role='button'
				aria-label={
					isFormOpen
						? 'Закрыть форму параметров статьи'
						: 'Открыть форму параметров статьи'
				}
				tabIndex={0}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				onClick={handleToggleForm}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isFormOpen })}
				/>
			</div>
		);
	}
);
ArrowButton.displayName = 'ArrowButton';
