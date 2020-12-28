const filterByType = (type, ...values) => values.filter(value => typeof value === type), // ф-ция callback => фильтрация по типу данных

	hideAllResponseBlocks = () => { //ф-ция => проходится по всем блокам с сообщениями и делает их скрытыми
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //нашли все блоки с сообщениями
		responseBlocksArray.forEach(block => block.style.display = 'none'); // прошлись по всем блокам и сделали их скрытыми
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {//универсальная ф-ция, при вызове передается(селектор, сообщенрие, id)
		hideAllResponseBlocks(); //вызвали функцию => нашли блоки и сделали невидимыми
		document.querySelector(blockSelector).style.display = 'block' //нашли элемент на странице по селектору и сделали блок видимым
		if (spanSelector) { //если id=true, проверили передали ли при вызове ф-ции 
			document.querySelector(spanSelector).textContent = msgText; //нашли элемент на странице по id и в него поместили сообщение
		}
	},

	
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //ф-ции showError при вызове передали текст и она вызывает вторую ф-цию и передала ей (class, текст, id)
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //ф-ции showError при вызове передали текст и она вызывает вторую ф-цию и передала ей (class, текст, id)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),//ф-ции showError при вызове передали текст и она вызывает вторую ф-цию и передала ей (class, текст)

	tryFilterByType = (type, values) => {//в ф-цию передаем input Тип данные и input Данные. Фильтрует, формирует сообщение и проверяет на ошибки
		try { //выполняется при успешном результате ф-ции
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");// вызвали ф-цию и передали данные input, отфильтровали по type и объединили все элементы массива в строку. 
			const alertMsg = (valuesArray.length) ? //если массив заполнен 
				`Данные с типом ${type}: ${valuesArray}` : //то будет текущее сообщение
				`Отсутствуют данные типа ${type}`;// если массив пуст, то будет данное сообщение
			showResults(alertMsg);//вызываем ф-цию и передаем сообщение 
		} catch (e) { //выполняется, если ошибка
			showError(`Ошибка: ${e}`);//вызывает ф-цию и передает сообщение об ошибке
		}
	};

const filterButton = document.querySelector('#filter-btn');//нашли кнопку на странице по селектору

filterButton.addEventListener('click', e => { //навесили событие click на кнопку
	const typeInput = document.querySelector('#type'); //находим input Тип данные по id
	const dataInput = document.querySelector('#data'); //находим input Данные по id

	if (dataInput.value === '') {//проверяем input Данные на пустую строку
		dataInput.setCustomValidity('Поле не должно быть пустым!');// валидация на пустую строку с сообщением
		showNoResults();//вызываем ф-цию, которая по селектору дулает блок видимым
	} else {
		dataInput.setCustomValidity('');// валидация на пустую строку, удаляем сообщение => input Данные заполнены
		e.preventDefault();//действие события по умолчанию кнопки не будет выполнено
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызываем ф-цию, передаем input Тип данные и input Данные, убираем пробелы
	}
});

