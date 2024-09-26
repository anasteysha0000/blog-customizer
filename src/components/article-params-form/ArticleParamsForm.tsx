import { ArrowButton } from 'src/components/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const [formState, setFormState] = useState({
		fontFamily:
			fontFamilyOptions.find(
				(option) => option.value === articleState.fontFamilyOption?.value
			) || fontFamilyOptions[0],
		fontSize: articleState.fontSizeOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
	});

	const formElementRef = useRef<HTMLFormElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsFormOpen((prevState) => !prevState);
	};

	const handleSelectChange = (name: string, selectedOption: OptionType) => {
		setFormState((prevState) => ({
			...prevState,
			[name]: selectedOption,
		}));
	};

	const formResetHandler = () => {
		const resetState: typeof formState = {
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		};

		setFormState(resetState);
		setArticleState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		const updatedState: Partial<ArticleStateType> = {
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		};

		setArticleState({
			...articleState,
			...updatedState,
		});

		setIsFormOpen(false);
	};

	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				formElementRef.current &&
				!formElementRef.current.contains(target) &&
				arrowButtonRef.current &&
				!arrowButtonRef.current.contains(target)
			) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton
				onClick={toggleForm}
				isFormOpen={isFormOpen}
				ref={arrowButtonRef}
			/>
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					ref={formElementRef}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							handleSelectChange('fontFamily', selectedOption)
						}
					/>

					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						onChange={(selectedOption) =>
							handleSelectChange('fontSize', selectedOption)
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selectedOption) =>
							handleSelectChange('fontColor', selectedOption)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selectedOption) =>
							handleSelectChange('backgroundColor', selectedOption)
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selectedOption) =>
							handleSelectChange('contentWidth', selectedOption)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
