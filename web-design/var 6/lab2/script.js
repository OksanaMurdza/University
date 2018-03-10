const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];
const day = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const currentDate = new Date();
const DateDom = document.getElementById('currentDate');
const TodayDOM = document.getElementById('today');

class Calendar {
	constructor(div) {
		this.Month = months;
		this.Day = day;
		this.currMonth = currentDate.getMonth();
		this.currDay = currentDate.getDate();
		this.currYear = currentDate.getFullYear();
		this.calendarDOM = div;
		this.currentDateDOM = DateDom;
		// today button
		this.Today = TodayDOM;

		// save dom currentDAY
		this.TodayDay = '';
	}

	nextMonth() {
		const { currMonth, currYear } = this;
		if (currMonth === 11) {
			this.currMonth = 0;
			this.currYear = currYear + 1;
		} else this.currMonth = currMonth + 1;

		this.Today.classList.add('none');
		this.Today.classList.remove('scaleZero');
		this.showMonth();
	}

	prevMonth() {
		const { currMonth, currYear } = this;
		if (currMonth === 0) {
			this.currMonth = 11;
			this.currYear = currYear - 1;
		} else this.currMonth = currMonth - 1;

		this.Today.classList.add('none');
		this.Today.classList.remove('scaleZero');
		this.showMonth();
	}

	showDate() {
		const { currMonth, currYear, currDay, currentDateDOM, Month } = this;
		const bufferDom = `${currDay}  ${Month[currMonth]}  ${currYear}`;
		currentDateDOM.innerHTML = bufferDom;
	}

	showMonth() {
		const { currYear, currMonth, currDay } = this;
		const d = new Date();
		const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
		const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
		const lastDayOfLastMonth =
			currMonth == 0 ? new Date(currYear - 1, 11, 0).getDate() : new Date(currYear, currMonth, 0).getDate();

		this.showDate();

		let html = '<table cellpading="50">';
		html += '<tr class="days">';
		this.Day.forEach((day) => (html += `<td> ${day} </td>`));
		html += '</tr>';

		let i = 1;
		do {
			let dow = new Date(currYear, currMonth, i).getDay();

			// If Sunday, start new row
			if (dow == 0) {
				html += '<tr>';
			} else if (i == 1) {
				// If not Sunday but first day of the month
				// it will write the last days from the previous month
				html += '<tr>';
				let k = lastDayOfLastMonth - firstDayOfMonth + 1;
				for (let j = 0; j < firstDayOfMonth; j++) {
					html += '<td class="not-current"><div>' + k + '</div></td>';
					k++;
				}
			}

			// Write the current day in the loop
			const chk = new Date();
			const chkY = chk.getFullYear();
			const chkM = chk.getMonth();
			if (chkY == currYear && chkM == currMonth && i == currDay) {
				html += '<td class="today"><div class="chooseDay">' + i + '</div></td>';
			} else {
				html += '<td class="normal"><div class="chooseDay">' + i + '</div></td>';
			}
			// If Saturday, closes the row
			if (dow == 6) {
				html += '</tr>';
			} else if (i == lastDateOfMonth) {
				// If not Saturday, but last day of the selected month
				// it will write the next few days from the next month
				let k = 1;
				for (dow; dow < 6; dow++) {
					html += '<td class="not-current"><div>' + k + '</div></td>';
					k++;
				}
			}

			i++;
		} while (i <= lastDateOfMonth);

		// Closes table
		html += '</table>';
		this.calendarDOM.innerHTML = html;

		// Сохраняем настоящее текущее число
		if (!this.TodayDay) {
			const [ today ] = document.getElementsByClassName('today');
			this.TodayDay = today;
		}

		const DOMday = document.getElementsByClassName('chooseDay');
		Object.values(DOMday).forEach((item) =>
			item.addEventListener('click', (e) => {
				const { target } = e;
				this.currDay = target.innerText;
				this.Today.classList.add('none');
				this.Today.classList.remove('scaleZero');
				this.showDate();

				const parent = target.parentElement; //parent of "target"
				this.setNewTodayCell(parent);
			})
		);
	}

	setTodayDate() {
		this.currMonth = currentDate.getMonth();
		this.currDay = currentDate.getDate();
		this.currYear = currentDate.getFullYear();
		this.Today.classList.remove('none');
		this.Today.classList.add('scaleZero');
		this.showDate();
		this.setNewTodayCell(this.TodayDay);
		this.showMonth();
	}

	setNewTodayCell(newCell) {
		const [ today ] = document.getElementsByClassName('today');
		if (today) {
			today.classList.remove('today');
		}
		newCell.classList.add('today');
	}
}

window.onload = () => {
	const calendarDOM = document.getElementById('divCal');
	const prevButton = document.getElementById('btnPrev');
	const nextButton = document.getElementById('btnNext');

	const calendar = new Calendar(calendarDOM);
	calendar.showMonth();

	prevButton.addEventListener('click', () => calendar.prevMonth());
	nextButton.addEventListener('click', () => calendar.nextMonth());
	TodayDOM.addEventListener('click', () => calendar.setTodayDate());
};
